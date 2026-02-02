export interface Vulnerability {
    type: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    line: number;
    description: string;
    recommendation: string;
    confidence?: string;
    detector?: string;
}

export interface AuditResult {
    vulnerabilities: Vulnerability[];
    summary: {
        total: number;
        critical: number;
        high: number;
        medium: number;
        low: number;
    };
    defiChecks?: DeFiCheck[];
    riskScore?: number;
}

export interface DeFiCheck {
    type: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    description: string;
    recommendation: string;
}

export interface AuditRequest {
    code: string;
    contractName?: string;
    analyzeDefi?: boolean;
}