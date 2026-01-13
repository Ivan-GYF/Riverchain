import {
  PerplexityRequest,
  PerplexityResponse,
  PerplexityMessage,
  RiskAssessment,
  AssessmentRequest,
} from '@/app/types';

const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

/**
 * 从 LocalStorage 获取 API Key
 */
export function getApiKey(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('perplexity_api_key');
}

/**
 * 保存 API Key 到 LocalStorage
 */
export function saveApiKey(apiKey: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('perplexity_api_key', apiKey);
}

/**
 * 获取模型配置
 */
export function getModel(): string {
  if (typeof window === 'undefined') return 'sonar-pro';
  return localStorage.getItem('perplexity_model') || 'sonar-pro';
}

/**
 * 保存模型配置
 */
export function saveModel(model: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('perplexity_model', model);
}

/**
 * 调用 Perplexity API
 */
export async function callPerplexityAPI(
  messages: PerplexityMessage[],
  apiKey?: string
): Promise<string> {
  const key = apiKey || getApiKey();
  
  if (!key) {
    throw new Error('未配置 Perplexity API Key，请前往设置页面配置。');
  }

  const model = getModel();
  
  const request: PerplexityRequest = {
    model,
    messages,
    temperature: 0.2,
    max_tokens: 4000,
    return_citations: false,
    return_images: false,
  };

  try {
    const response = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API 请求失败: ${response.status} - ${errorText}`);
    }

    const data: PerplexityResponse = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('API 返回结果为空');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('Perplexity API 调用失败:', error);
    throw error;
  }
}

/**
 * 生成核心分析师的 System Prompt
 */
export function generateCoreAnalystPrompt(): string {
  return `你是由 Riverchain 开发的信贷风控 AI 分析师。你必须基于严格的规则评估贷款申请。

## 风控框架标准

### Stage 1: 商业实体评级 (40% 权重)

**红旗警示 (Red Flags - 自动拒绝):**
1. 运营年限 < 5年
2. 年收入 < HK$ 10M
3. 存在诉讼记录或文件造假
4. 财务造假或重大违规

**评估维度:**
- 商业资质与信誉 (20%)
- 财务健康度 (40%):
  * 盈利能力: 毛利率、净利润率
  * 流动性: 流动比率 ≥ 1.5, 速动比率 ≥ 1.0
  * 偿债能力: 资产负债率 ≤ 70%
- 管理能力与履约记录 (20%)
- 行业地位与竞争力 (20%)

### Stage 2: 交易评分 (60% 权重)

**硬性限制条款:**
1. **保理业务 (Factoring)**: LTV 上限 90%
2. **发票融资 (Invoice Financing)**: LTV 上限 70%
3. **集中度风险**:
   - 单一借款人敞口 > 18% → 需要预警
   - 单一雇主敞口 > 27% → 需要预警

**对手方评级 (买方质量):**
- A 级 (优质): 港府机构、MTR、大型地产商 (信和、新鸿基、恒基等)
- B 级 (良好): 上市公司、知名企业
- C 级 (一般): 中小企业、非上市公司

**评估维度:**
- 对手方信用质量 (30%)
- LTV 合规性 (25%)
- 账期合理性 (20%)
- 担保措施 (15%)
- 集中度风险 (10%)

## 评估流程

### 第一步: 红旗检查
仔细检查所有红旗警示条件。如果触发任何一项，立即建议 "REJECT"，并在 red_flags_found 中列出。

### 第二步: 计算 Stage 1 得分
基于商业实体评级标准打分 (0-100)。

### 第三步: 计算 Stage 2 得分
基于交易质量标准打分 (0-100)。

### 第四步: 综合评分
总分 = Stage1 × 0.4 + Stage2 × 0.6

### 第五步: 风险等级判定
- 80-100: LOW RISK → APPROVE
- 60-79: MEDIUM RISK → CONDITIONAL (需要额外担保或条件)
- 0-59: HIGH RISK → REJECT

### 第六步: 生成分析报告
使用 Markdown 格式，结构化输出完整的分析过程。

## 输出格式要求

你必须严格返回 JSON 格式，结构如下:

\`\`\`json
{
  "decision": "APPROVE" | "REJECT" | "CONDITIONAL",
  "score": 85,
  "risk_level": "LOW" | "MEDIUM" | "HIGH",
  "red_flags_found": ["触发的红旗清单"],
  "stage1_score": 88,
  "stage2_score": 83,
  "rationale_markdown": "# Riverchain 信贷风险评估报告\\n\\n## 1. 红旗检查\\n...完整的 Markdown 分析报告...",
  "recommendations": ["具体建议"]
}
\`\`\`

## 重要提示

1. 必须严格遵守 LTV 限制
2. 任何红旗警示都应导致拒绝或严格的附加条件
3. 分析必须基于数据和逻辑，不做主观臆测
4. 报告必须专业、清晰、可执行

现在开始评估。`;
}

/**
 * 核心分析师评估
 */
export async function runCoreAnalyst(
  request: AssessmentRequest,
  apiKey?: string
): Promise<RiskAssessment> {
  const systemPrompt = generateCoreAnalystPrompt();
  
  const userMessage = `请评估以下贷款申请:

## 借款方信息
- 公司名称: ${request.borrower.companyName}
- 运营年限: ${request.borrower.operatingYears} 年
- 年收入: HK$ ${request.borrower.annualRevenue}M
- 毛利率: ${request.borrower.grossProfitMargin}%
- 净利润率: ${request.borrower.netProfitMargin}%
- 流动比率: ${request.borrower.currentRatio}
- 速动比率: ${request.borrower.quickRatio}
- 资产负债率: ${request.borrower.debtToAssetRatio}%
- 业务类型: ${request.borrower.businessType}
- 法律地位: ${request.borrower.legalStatus}
- 诉讼记录: ${request.borrower.hasLitigation ? '是' : '否'}

## 交易结构
- 融资金额: HK$ ${request.transaction.financingAmount}M
- 融资类型: ${request.transaction.financingType}
- 发票金额: HK$ ${request.transaction.invoiceAmount}M
- 对手方: ${request.transaction.counterpartyName}
- 对手方类型: ${request.transaction.counterpartyType}
- 账期: ${request.transaction.paymentTerm} 天
- LTV: ${((request.transaction.financingAmount / request.transaction.invoiceAmount) * 100).toFixed(2)}%

## 文档背景
${request.context.rawText || '无额外文档'}

请严格按照 JSON 格式返回评估结果。`;

  const messages: PerplexityMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userMessage },
  ];

  const response = await callPerplexityAPI(messages, apiKey);
  
  // 尝试解析 JSON
  try {
    // 提取 JSON (可能被包裹在 ```json ``` 中)
    let jsonText = response;
    const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }
    
    const parsed = JSON.parse(jsonText);
    
    return {
      decision: parsed.decision,
      score: parsed.score,
      riskLevel: parsed.risk_level,
      redFlagsFound: parsed.red_flags_found || [],
      rationaleMarkdown: parsed.rationale_markdown,
      stage1Score: parsed.stage1_score,
      stage2Score: parsed.stage2_score,
      recommendations: parsed.recommendations,
    };
  } catch (error) {
    console.error('解析 JSON 失败，原始响应:', response);
    // 如果解析失败，返回一个错误结果
    return {
      decision: 'REJECT',
      score: 0,
      riskLevel: 'HIGH',
      redFlagsFound: ['AI 响应格式错误'],
      rationaleMarkdown: `# 错误\n\nAI 返回的响应无法解析:\n\n\`\`\`\n${response}\n\`\`\``,
    };
  }
}

/**
 * 自定义智能体评估
 */
export async function runCustomAgent(
  agentName: string,
  systemPrompt: string,
  request: AssessmentRequest,
  contextKnowledge: string,
  apiKey?: string
): Promise<RiskAssessment> {
  const fullSystemPrompt = `${systemPrompt}

${contextKnowledge ? `\n## 补充知识库\n${contextKnowledge}\n` : ''}

## 输出格式要求

请以 JSON 格式返回你的评估结果:

\`\`\`json
{
  "decision": "APPROVE" | "REJECT" | "CONDITIONAL",
  "score": 0-100,
  "risk_level": "LOW" | "MEDIUM" | "HIGH",
  "red_flags_found": ["发现的风险点"],
  "rationale_markdown": "你的详细分析 (Markdown 格式)"
}
\`\`\``;

  const userMessage = `请基于你的专业视角评估以下贷款申请:

## 借款方信息
公司: ${request.borrower.companyName}
运营: ${request.borrower.operatingYears}年
收入: HK$ ${request.borrower.annualRevenue}M

## 交易
融资: HK$ ${request.transaction.financingAmount}M
类型: ${request.transaction.financingType}
对手方: ${request.transaction.counterpartyName}

## 完整数据
${JSON.stringify(request, null, 2)}`;

  const messages: PerplexityMessage[] = [
    { role: 'system', content: fullSystemPrompt },
    { role: 'user', content: userMessage },
  ];

  const response = await callPerplexityAPI(messages, apiKey);
  
  try {
    let jsonText = response;
    const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }
    
    const parsed = JSON.parse(jsonText);
    
    return {
      decision: parsed.decision,
      score: parsed.score,
      riskLevel: parsed.risk_level,
      redFlagsFound: parsed.red_flags_found || [],
      rationaleMarkdown: parsed.rationale_markdown,
    };
  } catch (error) {
    console.error('解析自定义智能体响应失败:', response);
    return {
      decision: 'REJECT',
      score: 0,
      riskLevel: 'HIGH',
      redFlagsFound: ['AI 响应格式错误'],
      rationaleMarkdown: `# ${agentName} - 错误\n\n响应无法解析:\n\n\`\`\`\n${response}\n\`\`\``,
    };
  }
}
