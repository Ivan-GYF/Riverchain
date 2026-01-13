'use client';

import { useState, useEffect } from 'react';
import { X, Save, Key, Settings as SettingsIcon } from 'lucide-react';
import { getApiKey, saveApiKey, getModel, saveModel } from '@/app/utils/perplexity';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('sonar-pro');
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const savedKey = getApiKey() || '';
      const savedModel = getModel();
      setApiKey(savedKey);
      setModel(savedModel);
    }
  }, [isOpen]);

  const handleSave = () => {
    saveApiKey(apiKey);
    saveModel(model);
    alert('设置已保存！');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* API Key 配置 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-gray-600" />
              <label className="text-sm font-semibold text-gray-700">
                Perplexity API Key
              </label>
              <span className="text-xs text-red-500">*必填</span>
            </div>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="请输入你的 Perplexity API Key"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                {showKey ? '隐藏' : '显示'}
              </button>
            </div>
            <p className="text-xs text-gray-500">
              API Key 将安全保存在浏览器本地存储中。
              如需获取 API Key，请访问{' '}
              <a
                href="https://www.perplexity.ai/settings/api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                Perplexity 设置页面
              </a>
            </p>
          </div>

          {/* 模型选择 */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">
              AI 模型选择
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            >
              <option value="sonar-pro">Sonar Pro (推荐 - 平衡性能)</option>
              <option value="sonar-reasoning">Sonar Reasoning (深度推理)</option>
            </select>
            <div className="space-y-2">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <strong>Sonar Pro:</strong> 适合快速评估，性能稳定，响应速度快。
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <p className="text-xs text-purple-800">
                  <strong>Sonar Reasoning:</strong> 适合复杂案例，推理能力更强，分析更深入。
                </p>
              </div>
            </div>
          </div>

          {/* 使用说明 */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              💡 使用说明
            </h3>
            <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
              <li>API Key 必须配置后才能使用评估功能</li>
              <li>配置信息会保存在浏览器 LocalStorage 中</li>
              <li>刷新页面不会丢失配置</li>
              <li>建议使用 Sonar Pro 模型以获得最佳性能</li>
            </ul>
          </div>
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
