'use client';

import { useStore } from '@/app/store/useStore';
import { CheckCircle2, XCircle, AlertTriangle, Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ResultsDashboard() {
  const { results } = useStore();

  if (results.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
            <TrendingUp className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            等待评估结果
          </h3>
          <p className="text-sm text-gray-600">
            完成表单填写后，点击"开始评估"按钮，AI 将为您生成详细的风险分析报告。
          </p>
        </div>
      </div>
    );
  }

  const getDecisionIcon = (decision: string) => {
    switch (decision) {
      case 'APPROVE':
        return <CheckCircle2 className="w-6 h-6 text-green-600" />;
      case 'REJECT':
        return <XCircle className="w-6 h-6 text-red-600" />;
      case 'CONDITIONAL':
        return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
      default:
        return <Minus className="w-6 h-6 text-gray-600" />;
    }
  };

  const getDecisionBadge = (decision: string) => {
    switch (decision) {
      case 'APPROVE':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECT':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'CONDITIONAL':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDecisionText = (decision: string) => {
    switch (decision) {
      case 'APPROVE':
        return '批准';
      case 'REJECT':
        return '拒绝';
      case 'CONDITIONAL':
        return '有条件批准';
      default:
        return '未知';
    }
  };

  const getRiskLevelBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'LOW':
        return 'bg-green-100 text-green-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'HIGH':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskLevelText = (riskLevel: string) => {
    switch (riskLevel) {
      case 'LOW':
        return '低风险';
      case 'MEDIUM':
        return '中等风险';
      case 'HIGH':
        return '高风险';
      default:
        return '未知';
    }
  };

  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
        >
          {/* Header */}
          <div className={`p-6 border-b ${
            result.agentType === 'core'
              ? 'bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200'
              : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getDecisionIcon(result.assessment.decision)}
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {result.agentName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-600">
                      {result.agentType === 'core' ? '核心分析师' : '自定义专家'}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Clock className="w-3 h-3" />
                      {(result.processingTime / 1000).toFixed(1)}s
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-semibold ${getDecisionBadge(result.assessment.decision)}`}>
                  {getDecisionText(result.assessment.decision)}
                </div>
              </div>
            </div>
          </div>

          {/* Score and Risk Cards */}
          <div className="p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Score */}
              <div className="bg-white rounded-lg p-4 shadow border border-gray-200">
                <div className="text-sm text-gray-600 mb-2">综合评分</div>
                <div className="flex items-end gap-2">
                  <div className="text-4xl font-bold text-gray-800">
                    {result.assessment.score}
                  </div>
                  <div className="text-lg text-gray-500 mb-1">/100</div>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      result.assessment.score >= 80
                        ? 'bg-green-500'
                        : result.assessment.score >= 60
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${result.assessment.score}%` }}
                  />
                </div>
              </div>

              {/* Risk Level */}
              <div className="bg-white rounded-lg p-4 shadow border border-gray-200">
                <div className="text-sm text-gray-600 mb-2">风险等级</div>
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getRiskLevelBadge(result.assessment.riskLevel)}`}>
                  {getRiskLevelText(result.assessment.riskLevel)}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {result.assessment.riskLevel === 'LOW' && '风险可控，建议批准'}
                  {result.assessment.riskLevel === 'MEDIUM' && '需要额外审查'}
                  {result.assessment.riskLevel === 'HIGH' && '风险较高，建议谨慎'}
                </div>
              </div>

              {/* Stage Scores (if available) */}
              {result.assessment.stage1Score && result.assessment.stage2Score && (
                <div className="bg-white rounded-lg p-4 shadow border border-gray-200">
                  <div className="text-sm text-gray-600 mb-2">阶段评分</div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Stage 1 (主体):</span>
                      <span className="font-semibold text-gray-800">
                        {result.assessment.stage1Score}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Stage 2 (交易):</span>
                      <span className="font-semibold text-gray-800">
                        {result.assessment.stage2Score}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Red Flags */}
          {result.assessment.redFlagsFound && result.assessment.redFlagsFound.length > 0 && (
            <div className="p-6 bg-red-50 border-t border-red-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-red-800 mb-2">
                    ⚠️ 红旗警示
                  </h4>
                  <ul className="space-y-1">
                    {result.assessment.redFlagsFound.map((flag, idx) => (
                      <li key={idx} className="text-sm text-red-700">
                        • {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Recommendations */}
          {result.assessment.recommendations && result.assessment.recommendations.length > 0 && (
            <div className="p-6 bg-blue-50 border-t border-blue-200">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">
                📋 建议措施
              </h4>
              <ul className="space-y-1">
                {result.assessment.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-sm text-blue-700">
                    • {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Detailed Analysis */}
          <div className="p-6 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-800 mb-4">
              📊 详细分析报告
            </h4>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-2xl font-bold text-gray-800 mb-3">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-4">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-semibold text-gray-700 mb-2 mt-3">{children}</h3>,
                  p: ({ children }) => <p className="text-gray-700 mb-2">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-3">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-3">{children}</ol>,
                  li: ({ children }) => <li className="text-gray-700">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold text-gray-800">{children}</strong>,
                  code: ({ children }) => <code className="px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded text-xs font-mono">{children}</code>,
                  pre: ({ children }) => <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto mb-3">{children}</pre>,
                }}
              >
                {result.assessment.rationaleMarkdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
