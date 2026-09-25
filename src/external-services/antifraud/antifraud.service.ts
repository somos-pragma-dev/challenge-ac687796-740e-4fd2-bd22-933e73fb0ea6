import { Injectable, Logger } from '@nestjs/common';

export interface AntifraudRequest {
  documentNumber: string;
  amount: number;
  loanName: string;
  applicantName: string;
  email: string;
}

export interface AntifraudResponse {
  approved: boolean;
  riskScore: number;
  reasons?: string[];
  transactionId?: string;
}

@Injectable()
export class AntifraudService {
  private readonly logger = new Logger(AntifraudService.name);
  
  private readonly mockRules = {
    maxAmount: 50000,
    minAmount: 1000,
    highRiskDocuments: ['11111111111', '22222222222', '33333333333'],
    highRiskAmount: 40000,
    maxRiskScore: 50,
  };

  async evaluate(request: AntifraudRequest): Promise<AntifraudResponse> {
    this.logger.log(
      `Evaluating antifraud for document: ${request.documentNumber}, amount: ${request.amount}`
    );
    
    const reasons: string[] = [];
    let riskScore = 0;
    
    if (request.amount > this.mockRules.maxAmount) {
      const message = `Monto excede el maximo permitido de ${this.mockRules.maxAmount}`;
      reasons.push(message);
      riskScore += 50;
      this.logger.warn(message);
    }
    
    if (request.amount < this.mockRules.minAmount) {
      const message = `Monto menor al minimo permitido de ${this.mockRules.minAmount}`;
      reasons.push(message);
      riskScore += 30;
      this.logger.warn(message);
    }
    
    if (this.mockRules.highRiskDocuments.includes(request.documentNumber)) {
      const message = 'Documento en lista de alto riesgo';
      reasons.push(message);
      riskScore += 70;
      this.logger.warn(`${message} - Documento: ${request.documentNumber}`);
    }
    
    if (request.amount >= this.mockRules.highRiskAmount) {
      const message = 'Monto requiere revision adicional por monto alto';
      reasons.push(message);
      riskScore += 20;
      this.logger.warn(message);
    }
    
    if (!request.documentNumber || request.documentNumber.length < 8) {
      const message = 'Numero de documento invalido';
      reasons.push(message);
      riskScore += 40;
      this.logger.warn(message);
    }
    
    if (!request.applicantName || request.applicantName.trim().length === 0) {
      const message = 'Nombre del solicitante es requerido';
      reasons.push(message);
      riskScore += 25;
      this.logger.warn(message);
    }
    
    const approved = riskScore < this.mockRules.maxRiskScore;
    const transactionId = `AF-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    this.logger.log(
      `Antifraud result: approved=${approved}, riskScore=${riskScore}, transactionId=${transactionId}`
    );
    
    return {
      approved,
      riskScore,
      reasons: reasons.length > 0 ? reasons : undefined,
      transactionId,
    };
  }
  
  async getTransactionStatus(transactionId: string): Promise<{ status: string; completedAt?: Date }> {
    this.logger.log(`Checking status for transaction: ${transactionId}`);
    
    return {
      status: 'COMPLETED',
      completedAt: new Date(),
    };
  }
}