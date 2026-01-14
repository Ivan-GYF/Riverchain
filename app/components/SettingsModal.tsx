'use client';

import { useState, useEffect } from 'react';
import { X, Save, Key, Settings as SettingsIcon, Edit3, RotateCcw } from 'lucide-react';
import { 
  getApiKey, 
  saveApiKey, 
  getModel, 
  saveModel,
  getCoreAnalystPrompt,
  saveCoreAnalystPrompt,
  resetCoreAnalystPrompt,
  getDefaultCoreAnalystPrompt,
  MODEL_CONFIGS,
} from '@/app/utils/ai';
import { AIModel } from '@/app/types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [apiKeys, setApiKeys] = useState({
    perplexity: '',
    google: '',
    deepseek: '',
  });
  const [model, setModel] = useState<AIModel>('gpt-5-mini');
  const [showKeys, setShowKeys] = useState({
    perplexity: false,
    google: false,
    deepseek: false,
  });
  const [activeTab, setActiveTab] = useState<'models' | 'prompt'>('models');
  const [corePrompt, setCorePrompt] = useState('');
  const [isCustomPrompt, setIsCustomPrompt] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 加载 API Keys
      setApiKeys({
        perplexity: getApiKey('perplexity') || '',
        google: getApiKey('google') || '',
        deepseek: getApiKey('deepseek') || '',
      });
      
      // 加载模型
      const savedModel = getModel();
      setModel(savedModel);

      // 加载核心 Prompt
      const savedPrompt = getCoreAnalystPrompt();
      const defaultPrompt = getDefaultCoreAnalystPrompt();
      setCorePrompt(savedPrompt);
      setIsCustomPrompt(savedPrompt !== defaultPrompt);
    }
  }, [isOpen]);

  const handleSave = () => {
    // 保存 API Keys
    Object.entries(apiKeys).forEach(([provider, key]) => {
      if (key) saveApiKey(provider, key);
    });
    
    // 保存模型
    saveModel(model);

    // 保存核心 Prompt
    saveCoreAnalystPrompt(corePrompt);
    
    alert('设置已保存！');
    onClose();
  };

  const handleResetPrompt = () => {
    if (confirm('确定要重置核心分析师 Prompt 到默认值吗？')) {
      const defaultPrompt = getDefaultCoreAnalystPrompt();
      setCorePrompt(defaultPrompt);
      setIsCustomPrompt(false);
      resetCoreAnalystPrompt();
    }
  };

  if (!isOpen) return null;

  const selectedModelConfig = MODEL_CONFIGS.find(m => m.id === model);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <SettingsIcon className="w-6 h-6 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">系统设置</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('models')}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-all border-b-2 ${
                activeTab === 'models'
                  ? 'border-primary-600 text-primary-600 bg-primary-50'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              模型与 API 配置
            </button>
            <button
              onClick={() => setActiveTab('prompt')}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-all border-b-2 ${
                activeTab === 'prompt'
                  ? 'border-primary-600 text-primary-600 bg-primary-50'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              核心分析师 Prompt
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {activeTab === 'models' && (
            <>
              {/* 模型选择 */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">
                  AI 模型选择
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value as AIModel)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
                  <optgroup label="🆓 免费模型（无需 API Key）">
                    {MODEL_CONFIGS.filter(m => !m.requiresApiKey).map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name} - {m.description}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Perplexity 模型">
                    {MODEL_CONFIGS.filter(m => m.provider === 'perplexity').map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name} - {m.description}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Google Gemini">
                    {MODEL_CONFIGS.filter(m => m.provider === 'google').map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name} - {m.description}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="DeepSeek">
                    {MODEL_CONFIGS.filter(m => m.provider === 'deepseek').map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name} - {m.description}
                      </option>
                    ))}
                  </optgroup>
                </select>
                {selectedModelConfig && (
                  <div className={`p-3 rounded-lg border ${
                    selectedModelConfig.requiresApiKey 
                      ? 'bg-yellow-50 border-yellow-200' 
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <p className="text-xs text-gray-700">
                      <strong>{selectedModelConfig.name}</strong>: {selectedModelConfig.description}
                      {selectedModelConfig.requiresApiKey && (
                        <span className="ml-2 text-yellow-700">⚠️ 需要配置 API Key</span>
                      )}
                      {!selectedModelConfig.requiresApiKey && (
                        <span className="ml-2 text-green-700">✅ 免费使用，无需配置</span>
                      )}
                    </p>
                  </div>
                )}
              </div>

              {/* API Keys */}
              {selectedModelConfig?.requiresApiKey && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-800">API Key 配置</h3>
                  
                  {/* Perplexity API Key */}
                  {selectedModelConfig.provider === 'perplexity' && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Key className="w-5 h-5 text-gray-600" />
                        <label className="text-sm font-semibold text-gray-700">
                          Perplexity API Key
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type={showKeys.perplexity ? 'text' : 'password'}
                          value={apiKeys.perplexity}
                          onChange={(e) => setApiKeys({ ...apiKeys, perplexity: e.target.value })}
                          placeholder="pplx-..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowKeys({ ...showKeys, perplexity: !showKeys.perplexity })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                          {showKeys.perplexity ? '隐藏' : '显示'}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">
                        获取: <a href="https://www.perplexity.ai/settings/api" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Perplexity API</a>
                      </p>
                    </div>
                  )}

                  {/* Google API Key */}
                  {selectedModelConfig.provider === 'google' && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Key className="w-5 h-5 text-gray-600" />
                        <label className="text-sm font-semibold text-gray-700">
                          Google API Key
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type={showKeys.google ? 'text' : 'password'}
                          value={apiKeys.google}
                          onChange={(e) => setApiKeys({ ...apiKeys, google: e.target.value })}
                          placeholder="AIza..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowKeys({ ...showKeys, google: !showKeys.google })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                          {showKeys.google ? '隐藏' : '显示'}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">
                        获取: <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Google AI Studio</a>
                      </p>
                    </div>
                  )}

                  {/* DeepSeek API Key */}
                  {selectedModelConfig.provider === 'deepseek' && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Key className="w-5 h-5 text-gray-600" />
                        <label className="text-sm font-semibold text-gray-700">
                          DeepSeek API Key
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type={showKeys.deepseek ? 'text' : 'password'}
                          value={apiKeys.deepseek}
                          onChange={(e) => setApiKeys({ ...apiKeys, deepseek: e.target.value })}
                          placeholder="sk-..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowKeys({ ...showKeys, deepseek: !showKeys.deepseek })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                          {showKeys.deepseek ? '隐藏' : '显示'}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">
                        获取: <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">DeepSeek Platform</a>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* 使用说明 */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  💡 使用说明
                </h3>
                <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                  <li>免费模型（Genspark）无需配置，可直接使用</li>
                  <li>API Key 会保存在浏览器 LocalStorage 中</li>
                  <li>刷新页面不会丢失配置</li>
                  <li>每个模型需要配置对应的 API Key</li>
                </ul>
              </div>
            </>
          )}

          {activeTab === 'prompt' && (
            <>
              {/* 核心 Prompt 编辑 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-gray-600" />
                    <label className="text-sm font-semibold text-gray-700">
                      核心分析师 System Prompt
                    </label>
                    {isCustomPrompt && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        已自定义
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleResetPrompt}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    重置为默认
                  </button>
                </div>
                <textarea
                  value={corePrompt}
                  onChange={(e) => {
                    setCorePrompt(e.target.value);
                    setIsCustomPrompt(e.target.value !== getDefaultCoreAnalystPrompt());
                  }}
                  rows={20}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
                  placeholder="编辑核心分析师的 System Prompt..."
                />
                <p className="text-xs text-gray-500">
                  💡 这里可以修改评审标准、评分逻辑、输出格式等。修改后会影响核心分析师的评估行为。
                </p>
              </div>

              {/* Prompt 说明 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">
                  📝 Prompt 编辑指南
                </h3>
                <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                  <li>可以修改红旗警示条件（如运营年限、年收入要求）</li>
                  <li>可以调整 Stage 1 和 Stage 2 的权重比例</li>
                  <li>可以修改 LTV 上限（保理、发票融资）</li>
                  <li>可以添加新的评估维度和标准</li>
                  <li>可以调整风险等级的评分区间</li>
                  <li>建议保留 JSON 输出格式要求，确保系统能正确解析</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            保存设置
          </button>
        </div>
      </div>
    </div>
  );
}
