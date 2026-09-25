import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum LoanRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  IN_REVIEW = 'IN_REVIEW'
}

@Entity('loan_requests')
export class LoanRequest {
  @ApiProperty({
    description: 'Identificador único de la solicitud de préstamo',
    example: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre del solicitante del préstamo',
    example: 'Juan Pérez'
  })
  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @ApiProperty({
    description: 'Monto solicitado para el préstamo',
    example: 5000
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ApiProperty({
    description: 'Estado actual de la solicitud de préstamo',
    enum: LoanRequestStatus,
    example: LoanRequestStatus.PENDING
  })
  @Column({
    type: 'enum',
    enum: LoanRequestStatus,
    default: LoanRequestStatus.PENDING
  })
  status: LoanRequestStatus;

  @ApiProperty({
    description: 'Fecha y hora de creación de la solicitud',
    example: '2023-11-15T10:00:00.000Z'
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha y hora de la última actualización de la solicitud',
    example: '2023-11-15T10:30:00.000Z'
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'Motivo de rechazo en caso de ser rechazada',
    example: 'Score de riesgo insuficiente',
    required: false
  })
  @Column({ type: 'text', nullable: true })
  rejectionReason?: string;

  @ApiProperty({
    description: 'Identificador de la transacción para idempotencia',
    example: 'req_abc123xyz'
  })
  @Column({ type: 'varchar', length: 50, unique: true })
  idempotencyKey: string;

  constructor(partial: Partial<LoanRequest> = {}) {
    Object.assign(this, partial);
  }
}