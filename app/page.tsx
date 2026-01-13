'use client';

import { useState } from 'react';
import { Settings, BarChart3 } from 'lucide-react';
import SettingsModal from './components/SettingsModal';
import InputWorkbench from './components/InputWorkbench';
import CustomAgentConfig from './components/CustomAgentConfig';
import AssessmentEngine from './components/AssessmentEngine';
import ResultsDashboard from './components/ResultsDashboard';

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gradient-to-br from-primary-600 to-blue-600 rounded-lg shadow-lg">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Riverchain 智能投资决策系统
                </h1>
                <p className="text-sm text-gray-600">
                  基于 AI 的信贷风控评估系统
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">设置</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Info Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  🎯 欢迎使用 Riverchain 智能投资决策系统
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  本系统采用多智能体评估框架，结合 <strong>Riverchain 核心分析师</strong> 和 <strong>自定义专家视角</strong>，
                  为您提供全面、专业的信贷风控评估服务。系统会严格执行 Stage 1 (商业实体评级) 和 Stage 2 (交易评分) 的双阶段评估，
                  并自动检测红旗警示、LTV 合规性和集中度风险。
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white text-blue-700 text-xs font-medium rounded-full border border-blue-200">
                    ✅ 双阶段评估
                  </span>
                  <span className="px-3 py-1 bg-white text-blue-700 text-xs font-medium rounded-full border border-blue-200">
                    ⚠️ 红旗自动检测
                  </span>
                  <span className="px-3 py-1 bg-white text-blue-700 text-xs font-medium rounded-full border border-blue-200">
                    📊 LTV 合规检查
                  </span>
                  <span className="px-3 py-1 bg-white text-blue-700 text-xs font-medium rounded-full border border-blue-200">
                    🤖 多智能体分析
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Input Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              📝 资料录入
            </h2>
            <InputWorkbench />
          </section>

          {/* Custom Agents Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              🤖 自定义智能体配置
            </h2>
            <CustomAgentConfig />
          </section>

          {/* Assessment Engine */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              🚀 评估控制
            </h2>
            <AssessmentEngine />
          </section>

          {/* Results Dashboard */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              📊 评估结果
            </h2>
            <ResultsDashboard />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>
              Riverchain 智能投资决策系统 © 2024 | 
              基于 <a href="https://www.perplexity.ai" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Perplexity AI</a> 提供技术支持
            </p>
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}
