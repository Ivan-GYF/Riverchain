'use client';

import { useState } from 'react';
import { useStore } from '@/app/store/useStore';
import { Plus, Trash2, Edit2, Check, X, Users, ToggleLeft, ToggleRight } from 'lucide-react';
import { MODEL_CONFIGS } from '@/app/utils/ai';
import { AIModel } from '@/app/types';

export default function CustomAgentConfig() {
  const { customAgents, addCustomAgent, updateCustomAgent, deleteCustomAgent, toggleCustomAgent } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    contextKnowledge: '',
    model: 'gpt-5-mini' as AIModel,
  });

  const handleAdd = () => {
    if (!formData.name || !formData.role) {
      alert('请至少填写智能体名称和角色设定');
      return;
    }
    
    addCustomAgent({
      name: formData.name,
      role: formData.role,
      contextKnowledge: formData.contextKnowledge,
      model: formData.model,
      enabled: true,
    });
    
    setFormData({ name: '', role: '', contextKnowledge: '', model: 'gpt-5-mini' });
    setIsAdding(false);
  };

  const handleEdit = (id: string) => {
    const agent = customAgents.find((a) => a.id === id);
    if (agent) {
      setFormData({
        name: agent.name,
        role: agent.role,
        contextKnowledge: agent.contextKnowledge,
        model: agent.model || 'gpt-5-mini',
      });
      setEditingId(id);
    }
  };

  const handleUpdate = () => {
    if (!editingId) return;
    
    updateCustomAgent(editingId, {
      name: formData.name,
      role: formData.role,
      contextKnowledge: formData.contextKnowledge,
      model: formData.model,
    });
    
    setFormData({ name: '', role: '', contextKnowledge: '', model: 'gpt-5-mini' });
    setEditingId(null);
  };

  const handleCancel = () => {
    setFormData({ name: '', role: '', contextKnowledge: '', model: 'gpt-5-mini' });
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">自定义智能体</h3>
            <p className="text-sm text-gray-500">配置额外的专家视角进行评估</p>
          </div>
        </div>
        
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            新增智能体
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              智能体名称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="例如: 宏观经济专家"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              角色设定 (System Prompt) <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="例如: 你是一位宏观经济分析师，专注于评估香港建筑行业的市场周期和宏观风险。请基于当前经济环境评估该贷款申请的风险..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              补充知识库 (可选)
            </label>
            <textarea
              value={formData.contextKnowledge}
              onChange={(e) => setFormData({ ...formData, contextKnowledge: e.target.value })}
              placeholder="提供额外的背景知识、数据或参考资料，帮助智能体做出更准确的判断..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              使用模型
            </label>
            <select
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value as AIModel })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            >
              <optgroup label="🆓 免费模型">
                {MODEL_CONFIGS.filter(m => !m.requiresApiKey).map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </optgroup>
              <optgroup label="Perplexity">
                {MODEL_CONFIGS.filter(m => m.provider === 'perplexity').map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </optgroup>
              <optgroup label="Google Gemini">
                {MODEL_CONFIGS.filter(m => m.provider === 'google').map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </optgroup>
              <optgroup label="DeepSeek">
                {MODEL_CONFIGS.filter(m => m.provider === 'deepseek').map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </optgroup>
            </select>
            <p className="text-xs text-gray-500">
              选择该智能体使用的 AI 模型（默认使用免费模型）
            </p>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X className="w-4 h-4" />
              取消
            </button>
            <button
              onClick={editingId ? handleUpdate : handleAdd}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Check className="w-4 h-4" />
              {editingId ? '更新' : '添加'}
            </button>
          </div>
        </div>
      )}

      {/* Agent List */}
      <div className="space-y-3">
        {customAgents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-sm">暂无自定义智能体</p>
            <p className="text-xs mt-1">点击"新增智能体"按钮添加</p>
          </div>
        ) : (
          customAgents.map((agent) => (
            <div
              key={agent.id}
              className={`p-4 border rounded-lg transition-all ${
                agent.enabled
                  ? 'border-purple-200 bg-purple-50'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-800">{agent.name}</h4>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        agent.enabled
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {agent.enabled ? '已启用' : '已禁用'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{agent.role}</p>
                  {agent.contextKnowledge && (
                    <p className="text-xs text-gray-500 mt-2 line-clamp-1">
                      📚 知识库: {agent.contextKnowledge}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => toggleCustomAgent(agent.id)}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                    title={agent.enabled ? '禁用' : '启用'}
                  >
                    {agent.enabled ? (
                      <ToggleRight className="w-5 h-5 text-green-600" />
                    ) : (
                      <ToggleLeft className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEdit(agent.id)}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                    title="编辑"
                  >
                    <Edit2 className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`确定删除智能体"${agent.name}"吗？`)) {
                        deleteCustomAgent(agent.id);
                      }
                    }}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                    title="删除"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
