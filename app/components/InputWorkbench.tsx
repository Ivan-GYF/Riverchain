'use client';

import { useStore } from '@/app/store/useStore';
import { Building2, FileText, DollarSign } from 'lucide-react';

export default function InputWorkbench() {
  const {
    borrower,
    transaction,
    context,
    activeTab,
    setActiveTab,
    setBorrower,
    setTransaction,
    setContext,
  } = useStore();

  const tabs = [
    { id: 'borrower' as const, label: '借款方信息', icon: Building2 },
    { id: 'transaction' as const, label: '交易结构', icon: DollarSign },
    { id: 'context' as const, label: '文档上下文', icon: FileText },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Tab Headers */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600 bg-primary-50'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'borrower' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              借款方基本信息
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  公司名称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={borrower.companyName}
                  onChange={(e) => setBorrower({ companyName: e.target.value })}
                  placeholder="例如: 香港建筑工程有限公司"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  业务类型
                </label>
                <input
                  type="text"
                  value={borrower.businessType}
                  onChange={(e) => setBorrower({ businessType: e.target.value })}
                  placeholder="例如: 机电工程"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  运营年限 (年) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={borrower.operatingYears}
                  onChange={(e) => setBorrower({ operatingYears: Number(e.target.value) })}
                  min="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500">⚠️ 必须 ≥ 5年</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  年收入 (HK$ Million) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={borrower.annualRevenue}
                  onChange={(e) => setBorrower({ annualRevenue: Number(e.target.value) })}
                  min="0"
                  step="0.1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500">⚠️ 必须 ≥ HK$ 10M</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  毛利率 (%)
                </label>
                <input
                  type="number"
                  value={borrower.grossProfitMargin}
                  onChange={(e) => setBorrower({ grossProfitMargin: Number(e.target.value) })}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  净利润率 (%)
                </label>
                <input
                  type="number"
                  value={borrower.netProfitMargin}
                  onChange={(e) => setBorrower({ netProfitMargin: Number(e.target.value) })}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  流动比率
                </label>
                <input
                  type="number"
                  value={borrower.currentRatio}
                  onChange={(e) => setBorrower({ currentRatio: Number(e.target.value) })}
                  min="0"
                  step="0.1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500">建议 ≥ 1.5</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  速动比率
                </label>
                <input
                  type="number"
                  value={borrower.quickRatio}
                  onChange={(e) => setBorrower({ quickRatio: Number(e.target.value) })}
                  min="0"
                  step="0.1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500">建议 ≥ 1.0</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  资产负债率 (%)
                </label>
                <input
                  type="number"
                  value={borrower.debtToAssetRatio}
                  onChange={(e) => setBorrower({ debtToAssetRatio: Number(e.target.value) })}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500">建议 ≤ 70%</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  法律地位
                </label>
                <input
                  type="text"
                  value={borrower.legalStatus}
                  onChange={(e) => setBorrower({ legalStatus: e.target.value })}
                  placeholder="例如: 有限公司"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={borrower.hasLitigation}
                    onChange={(e) => setBorrower({ hasLitigation: e.target.checked })}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    存在诉讼记录或法律纠纷
                  </span>
                  <span className="text-xs text-red-500">(勾选将触发红旗警示)</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transaction' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              交易结构信息
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  申请融资金额 (HK$ Million) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={transaction.financingAmount}
                  onChange={(e) => setTransaction({ financingAmount: Number(e.target.value) })}
                  min="0"
                  step="0.1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  融资类型 <span className="text-red-500">*</span>
                </label>
                <select
                  value={transaction.financingType}
                  onChange={(e) => setTransaction({ financingType: e.target.value as any })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="factoring">保理业务 (Factoring - LTV ≤ 90%)</option>
                  <option value="invoice_financing">发票融资 (Invoice Financing - LTV ≤ 70%)</option>
                  <option value="loan">贷款 (Loan)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  发票金额 (HK$ Million) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={transaction.invoiceAmount}
                  onChange={(e) => setTransaction({ invoiceAmount: Number(e.target.value) })}
                  min="0"
                  step="0.1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  LTV 比率
                </label>
                <div className="px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 font-semibold">
                  {transaction.invoiceAmount > 0
                    ? `${((transaction.financingAmount / transaction.invoiceAmount) * 100).toFixed(2)}%`
                    : '0%'}
                </div>
                <p className="text-xs text-gray-500">
                  {transaction.financingType === 'factoring' && '⚠️ 保理业务 LTV 上限: 90%'}
                  {transaction.financingType === 'invoice_financing' && '⚠️ 发票融资 LTV 上限: 70%'}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  对手方名称 (买方) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={transaction.counterpartyName}
                  onChange={(e) => setTransaction({ counterpartyName: e.target.value })}
                  placeholder="例如: 港铁公司 MTR"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  对手方类型
                </label>
                <select
                  value={transaction.counterpartyType}
                  onChange={(e) => setTransaction({ counterpartyType: e.target.value as any })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="government">港府机构 (A 级优质)</option>
                  <option value="mtr">港铁 MTR (A 级优质)</option>
                  <option value="major_developer">大型地产商 (A 级优质)</option>
                  <option value="other">其他 (需评估)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  账期 (天数)
                </label>
                <input
                  type="number"
                  value={transaction.paymentTerm}
                  onChange={(e) => setTransaction({ paymentTerm: Number(e.target.value) })}
                  min="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'context' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              文档上下文 (OCR 提取文本)
            </h3>
            <p className="text-sm text-gray-600">
              请粘贴从财务报表、公司简介或其他相关文档中提取的文本内容。
              这些信息将帮助 AI 进行更准确的评估。
            </p>
            <textarea
              value={context.rawText}
              onChange={(e) => setContext({ rawText: e.target.value })}
              placeholder="例如：&#10;公司成立于 2010 年，专注于香港地区的机电工程承包...&#10;&#10;2023 年财务数据：&#10;- 营业收入：HK$ 50M&#10;- 毛利润：HK$ 8M&#10;- 净利润：HK$ 2.5M&#10;...&#10;&#10;主要客户包括港铁、新鸿基地产等..."
              rows={15}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
            />
            <p className="text-xs text-gray-500">
              提示: 提供更详细的背景信息可以提高评估的准确性
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
