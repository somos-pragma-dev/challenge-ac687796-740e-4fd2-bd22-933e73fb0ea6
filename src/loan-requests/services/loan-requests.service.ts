import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { Validator } from 'class-validator';
import { LoanRequest, LoanRequestStatus } from '../entities/loan-request.entity';
import { CreateLoanRequestDto } from '../dto/create-loan-request.dto';
import { UpdateLoanRequestDto } from '../dto/update-loan-request.dto';
import { AntifraudService } from '../../external-services/antifraud/antifraud.service';
import { RiskBureauService } from '../../external-services/risk-bureau/risk-bureau.service';

interface FindAllOptions {
  page: number;
  limit: number;
  status?: LoanRequestStatus;
}

interface PaginationResult {
  data: LoanRequest[];
  total: number;
  page: number;
  limit: number;
}

@Injectable()
export class LoanRequestsService {
  private readonly validator: Validator;

  constructor(
    @InjectRepository(LoanRequest)
    private readonly loanRequestRepository: Repository<LoanRequest>,
    @Inject(forwardRef(() => AntifraudService))
    private readonly antifraudService: AntifraudService,
    @Inject(forwardRef(() => RiskBureauService))
    private readonly riskBureauService: RiskBureauService,
  ) {
    this.validator = new Validator();
  }

  async create(
    createDto: CreateLoanRequestDto,
    idempotencyKey: string,
  ): Promise<LoanRequest> {
    createDto.validate();

    if (createDto.amount <= 0) {
      throw new BadRequestException(
        'El monto del préstamo debe ser mayor que cero',
      );
    }

    const existingByName = await this.loanRequestRepository.findOne({
      where: { loanName: createDto.loanName } as FindOptionsWhere<LoanRequest>,
    });

    if (existingByName) {
      throw new ConflictException(
        `Ya existe una solicitud de préstamo con el nombre: ${createDto.loanName}`,
      );
    }

    const existingByIdempotency =
      await this.loanRequestRepository.findOne({
        where: { idempotencyKey } as FindOptionsWhere<LoanRequest>,
      });

    if (existingByIdempotency) {
      return existingByIdempotency;
    }

    const antifraudResult = await this.antifraudService.evaluate(
      createDto.applicantDocument,
      createDto.applicantEmail,
      createDto.amount,
    );

    if (!antifraudResult.approved) {
      const loanRequest = this.loanRequestRepository.create({
        loanName: createDto.loanName,
        amount: createDto.amount,
        applicantName: createDto.applicantName,
        applicantEmail: createDto.applicantEmail,
        applicantDocument: createDto.applicantDocument,
        status: LoanRequestStatus.REJECTED,
        rejectionReason: antifraudResult.reason,
        idempotencyKey,
      });

      return this.loanRequestRepository.save(loanRequest);
    }

    const riskScore = await this.riskBureauService.calculateRiskScore(
      createDto.applicantDocument,
      createDto.amount,
    );

    const status =
      riskScore.highRisk || riskScore.score > 700
        ? LoanRequestStatus.PENDING_REVIEW
        : LoanRequestStatus.APPROVED;

    const loanRequest = this.loanRequestRepository.create({
      loanName: createDto.loanName,
      amount: createDto.amount,
      applicantName: createDto.applicantName,
      applicantEmail: createDto.applicantEmail,
      applicantDocument: createDto.applicantDocument,
      status,
      idempotencyKey,
      riskScore: riskScore.score,
      riskLevel: riskScore.level,
    });

    return this.loanRequestRepository.save(loanRequest);
  }

  async findAll(options: FindAllOptions): Promise<PaginationResult> {
    const { page, limit, status } = options;
    const skip = (page - 1) * limit;

    const whereCondition: FindOptionsWhere<LoanRequest> = {};
    if (status) {
      whereCondition.status = status;
    }

    const [data, total] = await this.loanRequestRepository.findAndCount({
      where: whereCondition,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<LoanRequest> {
    const loanRequest = await this.loanRequestRepository.findOne({
      where: { id } as FindOptionsWhere<LoanRequest>,
    });

    if (!loanRequest) {
      throw new NotFoundException(
        `No se encontró la solicitud de préstamo con ID: ${id}`,
      );
    }

    return loanRequest;
  }

  async update(id: string, updateDto: UpdateLoanRequestDto): Promise<LoanRequest> {
    const loanRequest = await this.findOne(id);

    if (updateDto.loanName && updateDto.loanName !== loanRequest.loanName) {
      const existingByName = await this.loanRequestRepository.findOne({
        where: { loanName: updateDto.loanName } as FindOptionsWhere<LoanRequest>,
      });

      if (existingByName && existingByName.id !== id) {
        throw new ConflictException(
          `Ya existe otra solicitud de préstamo con el nombre: ${updateDto.loanName}`,
        );
      }
    }

    if (updateDto.amount !== undefined && updateDto.amount <= 0) {
      throw new BadRequestException(
        'El monto del préstamo debe ser mayor que cero',
      );
    }

    Object.assign(loanRequest, updateDto);

    return this.loanRequestRepository.save(loanRequest);
  }

  async remove(id: string): Promise<void> {
    const loanRequest = await this.findOne(id);
    await this.loanRequestRepository.remove(loanRequest);
  }

  async findByIdempotencyKey(key: string): Promise<LoanRequest | null> {
    return this.loanRequestRepository.findOne({
      where: { idempotencyKey: key } as FindOptionsWhere<LoanRequest>,
    });
  }
}