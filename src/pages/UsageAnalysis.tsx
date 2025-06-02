import React from 'react';
import { useContentContext } from '../context/ContentContext';
import { tools } from '../config/tools';
import { BarChart, Clock, Coins, TrendingDown } from 'lucide-react';

const UsageAnalysis: React.FC = () => {
  const { history } = useContentContext();

  // Calculate tool usage statistics
  const toolUsage = tools.map(tool => ({
    id: tool.id,
    name: tool.name,
    count: history.filter(item => item.toolid === tool.id).length,
    category: Object.entries(categories).find(([_, ids]) => 
      ids.includes(tool.id)
    )?.[0] || 'Other'
  })).sort((a, b) => b.count - a.count);

  // Calculate category usage
  const categoryUsage = Object.entries(categories).map(([category, ids]) => ({
    name: category,
    count: history.filter(item => ids.includes(item.toolid)).length
  })).sort((a, b) => b.count - a.count);

  // Token calculations (assuming 1 token per generation)
  const totalTokensUsed = history.length;
  const monthlyAllocation = 100; // Based on your schema default
  const tokenEfficiency = Math.round((totalTokensUsed / monthlyAllocation) * 100);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-indigo-900 mb-8">Usage Analysis</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-md border border-indigo-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BarChart className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Total Generations</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">{totalTokensUsed}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-indigo-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <Coins className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Token Balance</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">
            {monthlyAllocation - totalTokensUsed}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-indigo-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Usage Rate</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600">{tokenEfficiency}%</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-indigo-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-50 rounded-lg">
              <TrendingDown className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Most Used Category</h3>
          </div>
          <p className="text-xl font-bold text-orange-600">
            {categoryUsage[0]?.name || 'N/A'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-6">Tool Usage Breakdown</h2>
          <div className="space-y-4">
            {toolUsage.map(tool => (
              <div key={tool.id} className="flex items-center gap-4">
                <div className="w-32 truncate">{tool.name}</div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ 
                        width: `${(tool.count / totalTokensUsed) * 100}%` 
                      }}
                    />
                  </div>
                </div>
                <div className="w-16 text-right font-medium">
                  {tool.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-6">Optimization Recommendations</h2>
          <div className="space-y-4">
            {toolUsage.length > 0 ? (
              <>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-medium text-yellow-800 mb-2">
                    High Usage Pattern Detected
                  </h3>
                  <p className="text-yellow-700 text-sm">
                    You're using {toolUsage[0].name} frequently. Consider:
                  </p>
                  <ul className="list-disc list-inside text-sm text-yellow-700 mt-2">
                    <li>Batching similar content generations</li>
                    <li>Using templates for common patterns</li>
                    <li>Saving frequently used prompts</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">
                    Token Efficiency Tips
                  </h3>
                  <ul className="list-disc list-inside text-sm text-green-700">
                    <li>Review and reuse successful prompts</li>
                    <li>Use specific, focused prompts</li>
                    <li>Save and modify previous generations</li>
                  </ul>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Start using tools to get personalized recommendations
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageAnalysis;