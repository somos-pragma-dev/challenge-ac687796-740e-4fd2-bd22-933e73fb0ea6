import { Test, TestingModule } from '@nestjs/testing';
import { LoanRequestsController } from '../../src/loan-requests/controllers/loan-requests.controller';
import { LoanRequestsService } from '../../src/loan-requests/services/loan-requests.service';
import { CreateLoanRequestDto } from '../../src/loan-requests/dto/create-loan-request.dto';
import { UpdateLoanRequestDto } from '../../src/loan-requests/dto/update-loan-request.dto';
import { LoanRequest, LoanRequestStatus } from '../../src/loan-requests/entities/loan-request.entity';

describe('LoanRequestsController', () => {
  let controller: LoanRequestsController;
  let service: LoanRequestsService;

  const mockLoanRequest: LoanRequest = {
    id: '1',
    name: 'Préstamo Personal',
    amount: 10000,
    status: LoanRequestStatus.PENDING,
    idempotencyKey: 'idem-123',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockLoanRequestsService = {
    create: jest.fn().mockResolvedValue(mockLoanRequest),
    findAll: jest.fn().mockResolvedValue([mockLoanRequest]),
    findOne: jest.fn().mockResolvedValue(mockLoanRequest),
    update: jest.fn().mockResolvedValue({ ...mockLoanRequest, amount: 15000 }),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanRequestsController],
      providers: [
        {
          provide: LoanRequestsService,
          useValue: mockLoanRequestsService,
        },
      ],
    }).compile();

    controller = module.get<LoanRequestsController>(LoanRequestsController);
    service = module.get<LoanRequestsService>(LoanRequestsService);
  });

  describe('create', () => {
    it('debería crear una solicitud de préstamo', async () => {
      const createDto: CreateLoanRequestDto = {
        name: 'Préstamo Personal',
        amount: 10000,
      };

      const result = await controller.create(createDto, 'idem-123');

      expect(result).toEqual(mockLoanRequest);
      expect(service.create).toHaveBeenCalledWith(createDto, 'idem-123');
    });

    it('debería manejar error de nombre duplicado', async () => {
      const createDto: CreateLoanRequestDto = {
        name: 'Préstamo Duplicado',
        amount: 5000,
      };

      mockLoanRequestsService.create.mockRejectedValueOnce(
        new Error('Ya existe una solicitud con este nombre'),
      );

      await expect(controller.create(createDto, 'idem-456')).rejects.toThrow(
        'Ya existe una solicitud con este nombre',
      );
    });

    it('debería rechazar monto negativo', async () => {
      const createDto: CreateLoanRequestDto = {
        name: 'Préstamo Negativo',
        amount: -1000,
      };

      mockLoanRequestsService.create.mockRejectedValueOnce(
        new Error('El monto debe ser positivo'),
      );

      await expect(controller.create(createDto, 'idem-789')).rejects.toThrow(
        'El monto debe ser positivo',
      );
    });
  });

  describe('findAll', () => {
    it('debería retornar todas las solicitudes de préstamo', async () => {
      const result = await controller.findAll();

      expect(result).toEqual([mockLoanRequest]);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('debería retornar lista vacía cuando no hay solicitudes', async () => {
      mockLoanRequestsService.findAll.mockResolvedValueOnce([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('debería retornar una solicitud por ID', async () => {
      const result = await controller.findOne('1');

      expect(result).toEqual(mockLoanRequest);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('debería manejar error cuando no existe la solicitud', async () => {
      mockLoanRequestsService.findOne.mockRejectedValueOnce(
        new Error('Solicitud no encontrada'),
      );

      await expect(controller.findOne('999')).rejects.toThrow(
        'Solicitud no encontrada',
      );
    });
  });

  describe('update', () => {
    it('debería actualizar una solicitud de préstamo', async () => {
      const updateDto: UpdateLoanRequestDto = {
        amount: 15000,
      };

      const result = await controller.update('1', updateDto);

      expect(result.amount).toBe(15000);
      expect(service.update).toHaveBeenCalledWith('1', updateDto);
    });

    it('debería manejar error de nombre duplicado en actualización', async () => {
      const updateDto: UpdateLoanRequestDto = {
        name: 'Préstamo Existente',
      };

      mockLoanRequestsService.update.mockRejectedValueOnce(
        new Error('Ya existe una solicitud con este nombre'),
      );

      await expect(controller.update('1', updateDto)).rejects.toThrow(
        'Ya existe una solicitud con este nombre',
      );
    });
  });

  describe('remove', () => {
    it('debería eliminar una solicitud de préstamo', async () => {
      await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith('1');
    });

    it('debería manejar error cuando no existe la solicitud a eliminar', async () => {
      mockLoanRequestsService.remove.mockRejectedValueOnce(
        new Error('Solicitud no encontrada'),
      );

      await expect(controller.remove('999')).rejects.toThrow(
        'Solicitud no encontrada',
      );
    });
  });
});