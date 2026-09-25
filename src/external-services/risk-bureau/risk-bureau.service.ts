import { Injectable, Logger } from '@nestjs/common';

export interface RiskBureauRequest {
  documentNumber: string;
  firstName?: string;
  lastName?: string;
}

export interface RiskBureauResponse {
  hasDebt: boolean;
  debtAmount?: number;
  riskLevel: 'low' | 'medium' | 'high';
  bureauScore?: number;
  lastUpdated?: Date;
  queryId?: string;
}

@Injectable()
export class RiskBureauService {
  private readonly logger = new Logger(RiskBureauService.name);
  
  private readonly mockDebtRecords: Map<string, number> = new Map([
    ['44444444444', 5000],
    ['55555555555', 15000],
    ['66666666666', 35000],
    ['77777777777', 8000],
    ['88888888888', 22000],
  ]);
  
  private readonly mockRiskLevels: Record<string, 'low' | 'medium' | 'high'> = {
    '77777777777': 'high',
    '88888888888': 'medium',
    '99999999999': 'high',
  };
  
  private readonly mockBureauScores: Record<string, number> = {
    '77777777777': 450,
    '88888888888': 620,
    '99999999999': 380,
  };

  async checkRisk(request: RiskBureauRequest): Promise<RiskBureauResponse> {
    this.logger.log(
      `Checking risk bureau for document: ${request.documentNumber}`
    );
    
    const debtAmount = this.mockDebtRecords.get(request.documentNumber);
    const riskLevel = this.mockRiskLevels[request.documentNumber] || 'low';
    const bureauScore = this.mockBureauScores[request.documentNumber];
    
    const hasDebt = debtAmount !== undefined;
    
    if (hasDebt) {
      this.logger.warn(
        `Debt found for document ${request.documentNumber}: amount=${debtAmount}, riskLevel=${riskLevel}`
      );
    } else {
      this.logger.log(
        `No debt found for document ${request.documentNumber}, riskLevel=${riskLevel}`
      );
    }
    
    const queryId = `RB-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    return {
      hasDebt,
      debtAmount,
      riskLevel,
      bureauScore,
      lastUpdated: new Date(),
      queryId,
    };
  }
  
  async getHistoricalRisk(documentNumber: string): Promise<{
    score: number;
    trend: 'improving' | 'stable' | 'declining';
    lastThreeMonths: number[];
  }> {
    this.logger.log(`Getting historical risk for document: ${documentNumber}`);
    
    const baseScore = this.mockBureauScores[documentNumber] || 700;
    
    return {
      score: baseScore,
      trend: 'stable',
      lastThreeMonths: [baseScore - 10, baseScore + 5, baseScore],
    };
  }
  
  async validateDocumentFormat(documentNumber: string): Promise<{
    valid: boolean;
    format: string;
  }> {
    const cleaned = documentNumber.replace(/\D/g, '');
    const valid = cleaned.length >= 8 && cleaned.length <= 11;
    
    return {
      valid,
      format: cleaned.length === 11 ? 'CPF' : cleaned.length === 8 ? 'DNI' : 'UNKNOWN',
    };
  }
}