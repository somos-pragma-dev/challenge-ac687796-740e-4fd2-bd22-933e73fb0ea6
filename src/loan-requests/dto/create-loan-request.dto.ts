import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString, MaxLength } from 'class-validator';
import { IsUnique } from '../../common/validators/is-unique.decorator';

export class CreateLoanRequestDto {
  @ApiProperty({
    description: 'Nombre del solicitante del préstamo',
    example: 'Juan Pérez',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsUnique({
    message: 'Ya existe una solicitud con este nombre',
    entity: 'LoanRequest',
    field: 'name'
  })
  name: string;

  @ApiProperty({
    description: 'Monto solicitado para el préstamo',
    example: 5000,
    minimum: 0.01
  })
  @IsPositive({
    message: 'El monto debe ser un número positivo'
  })
  amount: number;

  @ApiProperty({
    description: 'Identificador de la transacción para idempotencia',
    example: 'req_abc123xyz',
    required: false
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  idempotencyKey: string;

  constructor(partial: Partial<CreateLoanRequestDto> = {}) {
    Object.assign(this, partial);
  }

  validate(): void {
    if (this.amount <= 0) {
      throw new Error('El monto debe ser mayor que cero');
    }
    if (!this.name || this.name.trim() === '') {
      throw new Error('El nombre no puede estar vacío');
    }
    if (!this.idempotencyKey || this.idempotencyKey.trim() === '') {
      throw new Error('La clave de idempotencia es obligatoria');
    }
  }
}