import { create } from 'zustand';
import {
  BorrowerInfo,
  TransactionInfo,
  DocumentContext,
  CustomAgent,
  AgentResult,
  SystemConfig,
} from '@/app/types';

interface AppState {
  // 系统配置
  config: SystemConfig;
  setConfig: (config: Partial<SystemConfig>) => void;

  // 表单数据
  borrower: BorrowerInfo;
  transaction: TransactionInfo;
  context: DocumentContext;
  
  setBorrower: (borrower: Partial<BorrowerInfo>) => void;
  setTransaction: (transaction: Partial<TransactionInfo>) => void;
  setContext: (context: Partial<DocumentContext>) => void;

  // 自定义智能体
  customAgents: CustomAgent[];
  addCustomAgent: (agent: Omit<CustomAgent, 'id'>) => void;
  updateCustomAgent: (id: string, agent: Partial<CustomAgent>) => void;
  deleteCustomAgent: (id: string) => void;
  toggleCustomAgent: (id: string) => void;

  // 评估结果
  results: AgentResult[];
  setResults: (results: AgentResult[]) => void;
  clearResults: () => void;

  // UI 状态
  isAssessing: boolean;
  setIsAssessing: (isAssessing: boolean) => void;
  
  activeTab: 'borrower' | 'transaction' | 'context';
  setActiveTab: (tab: 'borrower' | 'transaction' | 'context') => void;
}

export const useStore = create<AppState>((set) => ({
  // 初始配置
  config: {
    perplexityApiKey: undefined,
    model: 'gpt-5-mini',
    coreAnalystPrompt: undefined,
  },
  setConfig: (config) =>
    set((state) => ({
      config: { ...state.config, ...config },
    })),

  // 初始借款方信息
  borrower: {
    companyName: '',
    operatingYears: 5,
    annualRevenue: 10,
    grossProfitMargin: 15,
    netProfitMargin: 5,
    currentRatio: 1.5,
    quickRatio: 1.0,
    debtToAssetRatio: 50,
    businessType: '机电工程',
    legalStatus: '有限公司',
    hasLitigation: false,
  },
  setBorrower: (borrower) =>
    set((state) => ({
      borrower: { ...state.borrower, ...borrower },
    })),

  // 初始交易信息
  transaction: {
    financingAmount: 5,
    financingType: 'factoring',
    invoiceAmount: 10,
    counterpartyName: '',
    counterpartyType: 'other',
    paymentTerm: 60,
  },
  setTransaction: (transaction) =>
    set((state) => ({
      transaction: { ...state.transaction, ...transaction },
    })),

  // 初始文档上下文
  context: {
    rawText: '',
  },
  setContext: (context) =>
    set((state) => ({
      context: { ...state.context, ...context },
    })),

  // 自定义智能体
  customAgents: [],
  addCustomAgent: (agent) =>
    set((state) => ({
      customAgents: [
        ...state.customAgents,
        {
          ...agent,
          id: `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        },
      ],
    })),
  updateCustomAgent: (id, agent) =>
    set((state) => ({
      customAgents: state.customAgents.map((a) =>
        a.id === id ? { ...a, ...agent } : a
      ),
    })),
  deleteCustomAgent: (id) =>
    set((state) => ({
      customAgents: state.customAgents.filter((a) => a.id !== id),
    })),
  toggleCustomAgent: (id) =>
    set((state) => ({
      customAgents: state.customAgents.map((a) =>
        a.id === id ? { ...a, enabled: !a.enabled } : a
      ),
    })),

  // 评估结果
  results: [],
  setResults: (results) => set({ results }),
  clearResults: () => set({ results: [] }),

  // UI 状态
  isAssessing: false,
  setIsAssessing: (isAssessing) => set({ isAssessing }),
  
  activeTab: 'borrower',
  setActiveTab: (activeTab) => set({ activeTab }),
}));
