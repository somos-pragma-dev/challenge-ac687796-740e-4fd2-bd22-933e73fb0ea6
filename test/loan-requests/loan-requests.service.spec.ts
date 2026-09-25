import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoanRequestsService } from '../../src/loan-requests/services/loan-requests.service';
import { LoanRequest, LoanRequestStatus } from '../../src/loan-requests/entities/loan-request.entity';
import { CreateLoanRequestDto } from '../../src/loan-requests/dto/create-loan-request.dto';
import { UpdateLoanRequestDto } from '../../src/loan-requests/dto/update-loan-request.dto';
import { AntifraudService } from '../../src/external-services/antifraud/antifraud.service';
import { RiskBureauService } from '../../src/external-services/risk-bureau/risk-bureau.service';

describe('LoanRequestsService', () => {
  let service: LoanRequestsService;
  let repository: Repository<LoanRequest>;
  let antifraudService: AntifraudService;
  let riskBureauService: RiskBureauService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockAntifraudService = {
    evaluate: jest.fn(),
  };

  const mockRiskBureauService = {
    checkRisk: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanRequestsService,
        {
          provide: getRepositoryToken(LoanRequest),
          useValue: mockRepository,
        },
        {
          provide: AntifraudService,
          useValue: mockAntifraudService,
        },
        {
          provide: RiskBureauService,
          useValue: mockRiskBureauService,
        },
      ],
    }).compile();

    service = module.get<LoanRequestsService>(LoanRequestsService);
    repository = module.get<Repository<LoanRequest>>(getRepositoryToken(LoanRequest));
    antifraudService = module.get<AntifraudService>(AntifraudService);
    riskBureauService = module.get<RiskBureauService>(RiskBureauService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createDto: CreateLoanRequestDto = {
      name: 'Préstamo Personal',
      amount: 10000,
    };

    it('debería crear una solicitud de préstamo exitosamente', async () => {
      const mockLoanRequest = {
        id: '1',
        ...createDto,
        status: LoanRequestStatus.PENDING,
        idempotencyKey: 'idem-123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.create.mockReturnValue(mockLoanRequest);
      mockRepository.save.mockResolvedValue(mockLoanRequest);
      mockAntifraudService.evaluate.mockResolvedValue({ approved: true });
      mockRiskBureauService.checkRisk.mockResolvedValue({ riskLevel: 'low' });

      const result = await service.create(createDto, 'idem-123');

      expect(result).toEqual(mockLoanRequest);
      expect(mockRepository.create).toHaveBeenCalledWith(expect.objectContaining(createDto));
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('debería rechazar nombre duplicado', async () => {
      mockRepository.findOne.mockResolvedValue({
        id: 'existing',
        name: 'Préstamo Personal',
      });

      await expect(service.create(createDto, 'idem-123')).rejects.toThrow(
        'Ya existe una solicitud con este nombre',
      );
    });

    it('debería rechazar monto negativo', async () => {
      const invalidDto: CreateLoanRequestDto = {
        name: 'Préstamo Negativo',
        amount: -1000,
      };

      await expect(service.create(invalidDto, 'idem-123')).rejects.toThrow(
        'El monto debe ser positivo',
      );
    });

    it('debería rechazar solicitud duplicada por clave de idempotencia', async () => {
      mockRepository.findOne.mockResolvedValue({
        id: 'existing-idempotency',
        idempotencyKey: 'idem-123',
      });

      const result = await service.create(createDto, 'idem-123');

      expect(result).toBeDefined();
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    it('debería rechazar si el motor antifraude no aprueba', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue({ ...createDto, idempotencyKey: 'idem-123' });
      mockRepository.save.mockResolvedValue({ id: '1', ...createDto });
      mockAntifraudService.evaluate.mockResolvedValue({ approved: false, reason: 'Riesgo detectado' });

      await expect(service.create(createDto, 'idem-123')).rejects.toThrow(
        'Solicitud rechazada por motor antifraude',
      );
    });

    it('debería rechazar si el buró de riesgos indica alto riesgo', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue({ ...createDto, idempotencyKey: 'idem-123' });
      mockRepository.save.mockResolvedValue({ id: '1', ...createDto });
      mockAntifraudService.evaluate.mockResolvedValue({ approved: true });
      mockRiskBureauService.checkRisk.mockResolvedValue({ riskLevel: 'high' });

      await expect(service.create(createDto, 'idem-123')).rejects.toThrow(
        'Solicitud rechazada por bureau de riesgos',
      );
    });
  });

  describe('findAll', () => {
    it('debería retornar todas las solicitudes', async () => {
      const mockRequests = [
        { id: '1', name: 'Préstamo 1', amount: 1000 },
        { id: '2', name: 'Préstamo 2', amount: 2000 },
      ];

      mockRepository.find.mockResolvedValue(mockRequests);

      const result = await service.findAll();

      expect(result).toEqual(mockRequests);
      expect(mockRepository.find).toHaveBeenCalled();
    });

    it('debería retornar lista vacía cuando no hay solicitudes', async () => {
      mockRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('debería retornar una solicitud por ID', async () => {
      const mockRequest = { id: '1', name: 'Préstamo 1', amount: 1000 };

      mockRepository.findOne.mockResolvedValue(mockRequest);

      const result = await service.findOne('1');

      expect(result).toEqual(mockRequest);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('debería lanzar error cuando no encuentra la solicitud', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(
        'Solicitud no encontrada',
      );
    });
  });

  describe('update', () => {
    it('debería actualizar una solicitud exitosamente', async () => {
      const existingRequest = { id: '1', name: 'Préstamo 1', amount: 1000 };
      const updateDto: UpdateLoanRequestDto = { amount: 2000 };

      mockRepository.findOne.mockResolvedValue(existingRequest);
      mockRepository.update.mockResolvedValue({ affected: 1 });
      mockRepository.findOne.mockResolvedValueOnce(existingRequest).mockResolvedValueOnce({
        ...existingRequest,
        ...updateDto,
      });

      const result = await service.update('1', updateDto);

      expect(result.amount).toBe(2000);
      expect(mockRepository.update).toHaveBeenCalledWith('1', updateDto);
    });

    it('debería rechazar nombre duplicado en actualización', async () => {
      const existingRequest = { id: '1', name: 'Préstamo 1', amount: 1000 };
      const updateDto: UpdateLoanRequestDto = { name: 'Préstamo 2' };

      mockRepository.findOne
        .mockResolvedValueOnce(existingRequest)
        .mockResolvedValueOnce({ id: '2', name: 'Préstamo 2' });

      await expect(service.update('1', updateDto)).rejects.toThrow(
        'Ya existe una solicitud con este nombre',
      );
    });

    it('debería rechazar monto negativo en actualización', async () => {
      const existingRequest = { id: '1', name: 'Préstamo 1', amount: 1000 };
      const updateDto: UpdateLoanRequestDto = { amount: -500 };

      mockRepository.findOne.mockResolvedValue(existingRequest);

      await expect(service.update('1', updateDto)).rejects.toThrow(
        'El monto debe ser positivo',
      );
    });
  });

  describe('remove', () => {
    it('debería eliminar una solicitud exitosamente', async () => {
      const mockRequest = { id: '1', name: 'Préstamo 1', amount: 1000 };

      mockRepository.findOne.mockResolvedValue(mockRequest);
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove('1');

      expect(mockRepository.delete).toHaveBeenCalledWith('1');
    });

    it('debería lanzar error cuando no existe la solicitud a eliminar', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('999')).rejects.toThrow(
        'Solicitud no encontrada',
      );
    });
  });
});