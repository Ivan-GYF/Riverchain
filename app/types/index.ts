// 借款方信息
export interface BorrowerInfo {
  companyName: string;
  operatingYears: number;
  annualRevenue: number; // 单位：HK$ Million
  grossProfitMargin: number; // 百分比
  netProfitMargin: number; // 百分比
  currentRatio: number; // 流动比率
  quickRatio: number; // 速动比率
  debtToAssetRatio: number; // 资产负债率
  businessType: string; // 业务类型
  legalStatus: string; // 法律地位
  hasLitigation: boolean; // 是否有诉讼记录
}

// 交易结构信息
export interface TransactionInfo {
  financingAmount: number; // 申请融资金额 HK$ Million
  financingType: 'factoring' | 'invoice_financing' | 'loan'; // 融资类型
  invoiceAmount: number; // 发票金额 HK$ Million
  counterpartyName: string; // 对手方名称（买方）
  counterpartyType: 'government' | 'mtr' | 'major_developer' | 'other'; // 对手方类型
  paymentTerm: number; // 账期（天数）
  ltv?: number; // Loan-to-Value ratio (自动计算)
}

// 文档上下文
export interface DocumentContext {
  rawText: string; // OCR 提取的原始文本
  financialStatements?: string; // 财务报表
  companyProfile?: string; // 公司简介
}

// 完整的评估请求
export interface AssessmentRequest {
  borrower: BorrowerInfo;
  transaction: TransactionInfo;
  context: DocumentContext;
}

// 风险评估结果
export interface RiskAssessment {
  decision: 'APPROVE' | 'REJECT' | 'CONDITIONAL';
  score: number; // 0-100
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  redFlagsFound: string[];
  rationaleMarkdown: string;
  stage1Score?: number; // Stage 1 得分 (40%)
  stage2Score?: number; // Stage 2 得分 (60%)
  recommendations?: string[];
}

// 自定义智能体配置
export interface CustomAgent {
  id: string;
  name: string;
  role: string; // System Prompt
  contextKnowledge: string; // 补充知识库
  enabled: boolean;
}

// 智能体评估结果
export interface AgentResult {
  agentName: string;
  agentType: 'core' | 'custom';
  assessment: RiskAssessment;
  processingTime: number; // 处理时间（毫秒）
}

// 系统配置
export interface SystemConfig {
  perplexityApiKey: string;
  model: 'sonar-pro' | 'sonar-reasoning';
}

// Perplexity API 请求
export interface PerplexityMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface PerplexityRequest {
  model: string;
  messages: PerplexityMessage[];
  temperature?: number;
  max_tokens?: number;
  return_citations?: boolean;
  return_images?: boolean;
}

export interface PerplexityResponse {
  id: string;
  model: string;
  object: string;
  created: number;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
