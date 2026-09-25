import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { LoanRequestStatus } from '../entities/loan-request.entity';
import { CreateLoanRequestDto } from './create-loan-request.dto';

export class UpdateLoanRequestDto extends PartialType(CreateLoanRequestDto) {
  @ApiProperty({
    description: 'Nuevo nombre del solicitante (opcional)',
    example: 'Juan Pérez Actualizado',
    required: false
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @ApiProperty({
    description: 'Nuevo monto del préstamo (opcional)',
    example: 7000,
    required: false
  })
  @IsPositive({
    message: 'El monto debe ser un número positivo'
  })
  @IsOptional()
  amount?: number;

  @ApiProperty({
    description: 'Nuevo estado de la solicitud (opcional)',
    enum: LoanRequestStatus,
    example: LoanRequestStatus.IN_REVIEW,
    required: false
  })
  @IsEnum(LoanRequestStatus)
  @IsOptional()
  status?: LoanRequestStatus;

  @ApiProperty({
    description: 'Motivo de rechazo (opcional, solo para estado REJECTED)',
    example: 'Score de riesgo insuficiente',
    required: false
  })
  @IsString()
  @IsOptional()
  rejectionReason?: string;

  constructor(partial: Partial<UpdateLoanRequestDto> = {}) {
    super();
    Object.assign(this, partial);
  }

  validate(): void {
    if (this.status === LoanRequestStatus.REJECTED && !this.rejectionReason) {
      throw new Error('Debe proporcionar un motivo de rechazo para el estado REJECTED');
    }
    if (this.amount !== undefined && this.amount <= 0) {
      throw new Error('El monto debe ser mayor que cero');
    }
    if (this.name !== undefined && (!this.name || this.name.trim() === '')) {
      throw new Error('El nombre no puede estar vacío');
    }
  }
}