import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  NotFoundException,
  ConflictException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateLoanRequestDto } from '../dto/create-loan-request.dto';
import { UpdateLoanRequestDto } from '../dto/update-loan-request.dto';
import { LoanRequestsService } from '../services/loan-requests.service';
import { LoanRequest, LoanRequestStatus } from '../entities/loan-request.entity';
import { IdempotencyKey } from '../../common/decorators/idempotency-key.decorator';

@ApiTags('loan-requests')
@Controller('loan-requests')
export class LoanRequestsController {
  constructor(
    @Inject(forwardRef(() => LoanRequestsService))
    private readonly loanRequestsService: LoanRequestsService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear una nueva solicitud de préstamo',
    description:
      'Registra una nueva solicitud de préstamo en el sistema. Requiere un identificador único para garantizar idempotencia.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Solicitud de préstamo creada exitosamente',
    type: LoanRequest,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Ya existe una solicitud con el mismo nombre',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de solicitud inválidos',
  })
  async create(
    @Body() createDto: CreateLoanRequestDto,
    @IdempotencyKey() idempotencyKey: string,
  ): Promise<LoanRequest> {
    return this.loanRequestsService.create(createDto, idempotencyKey);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las solicitudes de préstamos',
    description: 'Retorna una lista paginada de todas las solicitudes registradas en el sistema.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de solicitudes de préstamos',
    type: [LoanRequest],
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Cantidad de elementos por página' })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: LoanRequestStatus,
    description: 'Filtrar por estado de la solicitud',
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status?: LoanRequestStatus,
  ): Promise<{ data: LoanRequest[]; total: number; page: number; limit: number }> {
    return this.loanRequestsService.findAll({ page, limit, status });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una solicitud de préstamo por ID',
    description: 'Retorna los detalles de una solicitud de préstamo específica.',
  })
  @ApiParam({ name: 'id', description: 'Identificador único de la solicitud', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Solicitud de préstamo encontrada',
    type: LoanRequest,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Solicitud de préstamo no encontrada',
  })
  async findOne(@Param('id') id: string): Promise<LoanRequest> {
    return this.loanRequestsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar una solicitud de préstamo',
    description: 'Actualiza los datos de una solicitud de préstamo existente.',
  })
  @ApiParam({ name: 'id', description: 'Identificador único de la solicitud', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Solicitud de préstamo actualizada exitosamente',
    type: LoanRequest,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Solicitud de préstamo no encontrada',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Ya existe otra solicitud con el mismo nombre',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateLoanRequestDto,
  ): Promise<LoanRequest> {
    return this.loanRequestsService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar una solicitud de préstamo',
    description: 'Elimina permanentemente una solicitud de préstamo del sistema.',
  })
  @ApiParam({ name: 'id', description: 'Identificador único de la solicitud', type: String })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Solicitud de préstamo eliminada exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Solicitud de préstamo no encontrada',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.loanRequestsService.remove(id);
  }
}