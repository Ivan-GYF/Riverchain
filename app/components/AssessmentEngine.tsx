'use client';

import { useState } from 'react';
import { useStore } from '@/app/store/useStore';
import { runCoreAnalyst, runCustomAgent, getApiKey } from '@/app/utils/perplexity';
import { Play, Loader2, AlertCircle } from 'lucide-react';
import { AgentResult } from '@/app/types';

export default function AssessmentEngine() {
  const {
    borrower,
    transaction,
    context,
    customAgents,
    setResults,
    clearResults,
    isAssessing,
    setIsAssessing,
  } = useStore();

  const [error, setError] = useState<string | null>(null);

  const handleStartAssessment = async () => {
    // 验证 API Key
    const apiKey = getApiKey();
    if (!apiKey) {
      alert('请先在设置中配置 Perplexity API Key！');
      return;
    }

    // 验证必填字段
    if (!borrower.companyName) {
      alert('请填写公司名称');
      return;
    }
    if (!transaction.counterpartyName) {
      alert('请填写对手方名称');
      return;
    }

    setIsAssessing(true);
    setError(null);
    clearResults();

    const results: AgentResult[] = [];
    const request = {
      borrower,
      transaction,
      context,
    };

    try {
      // 运行核心分析师
      const coreStartTime = Date.now();
      try {
        const coreAssessment = await runCoreAnalyst(request, apiKey);
        const coreEndTime = Date.now();
        
        results.push({
          agentName: 'Riverchain 核心分析师',
          agentType: 'core',
          assessment: coreAssessment,
          processingTime: coreEndTime - coreStartTime,
        });
      } catch (err: any) {
        console.error('核心分析师评估失败:', err);
        setError(`核心分析师评估失败: ${err.message}`);
      }

      // 运行自定义智能体 (并行)
      const enabledAgents = customAgents.filter((a) => a.enabled);
      
      if (enabledAgents.length > 0) {
        const customAgentPromises = enabledAgents.map(async (agent) => {
          const startTime = Date.now();
          try {
            const assessment = await runCustomAgent(
              agent.name,
              agent.role,
              request,
              agent.contextKnowledge,
              apiKey
            );
            const endTime = Date.now();
            
            return {
              agentName: agent.name,
              agentType: 'custom' as const,
              assessment,
              processingTime: endTime - startTime,
            };
          } catch (err: any) {
            console.error(`${agent.name} 评估失败:`, err);
            return null;
          }
        });

        const customResults = await Promise.all(customAgentPromises);
        results.push(...customResults.filter((r) => r !== null) as AgentResult[]);
      }

      setResults(results);
    } catch (err: any) {
      console.error('评估过程出错:', err);
      setError(`评估失败: ${err.message}`);
    } finally {
      setIsAssessing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            智能评估引擎
          </h3>
          <p className="text-sm text-gray-600">
            {isAssessing
              ? '正在运行多智能体评估...'
              : `准备运行评估 (核心分析师 + ${customAgents.filter((a) => a.enabled).length} 个自定义智能体)`}
          </p>
        </div>

        <button
          onClick={handleStartAssessment}
          disabled={isAssessing}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            isAssessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {isAssessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              思考中...
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              开始评估
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-800">评估错误</p>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        </div>
      )}

      {isAssessing && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            <span className="text-sm text-blue-800">正在运行 Riverchain 核心分析师...</span>
          </div>
          
          {customAgents.filter((a) => a.enabled).map((agent) => (
            <div
              key={agent.id}
              className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg"
            >
              <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
              <span className="text-sm text-purple-800">正在运行 {agent.name}...</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
