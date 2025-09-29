import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

export default function FunctionVisualizer() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(null);
  const [selectedFunction, setSelectedFunction] = useState('double');
  const [history, setHistory] = useState([]);

  const functions = {
    double: { name: 'Double It', formula: 'x × 2', fn: (x) => x * 2, emoji: '×2' },
    square: { name: 'Square It', formula: 'x²', fn: (x) => x * x, emoji: '²' },
    addFive: { name: 'Add 5', formula: 'x + 5', fn: (x) => x + 5, emoji: '+5' },
    halfIt: { name: 'Half It', formula: 'x ÷ 2', fn: (x) => x / 2, emoji: '÷2' },
  };

  const processInput = () => {
    const num = parseFloat(input);
    if (isNaN(num)) {
      setOutput('Please enter a number!');
      return;
    }
    
    const result = functions[selectedFunction].fn(num);
    setOutput(result);
    setHistory([...history, { input: num, output: result, func: selectedFunction }]);
  };

  const reset = () => {
    setInput('');
    setOutput(null);
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          🎪 Function Magic Machine 🎪
        </h1>
        <p className="text-white text-center mb-8">
          Pick a function, drop in a number, watch the magic happen!
        </p>

        {/* Function Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(functions).map(([key, func]) => (
            <button
              key={key}
              onClick={() => setSelectedFunction(key)}
              className={`p-4 rounded-lg font-bold transition-all transform hover:scale-105 ${
                selectedFunction === key
                  ? 'bg-yellow-400 text-purple-900 shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-yellow-100'
              }`}
            >
              <div className="text-3xl mb-1">{func.emoji}</div>
              <div className="text-sm">{func.name}</div>
            </button>
          ))}
        </div>

        {/* The Machine */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <label className="block text-gray-700 font-bold mb-2">
                📥 Drop Your Number In:
              </label>
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && processInput()}
                placeholder="Try any number..."
                className="w-full p-4 text-2xl border-4 border-purple-300 rounded-xl focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="mx-8">
              <button
                onClick={processInput}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all"
              >
                <Play size={32} fill="white" />
              </button>
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 font-bold mb-2">
                📤 Result Comes Out:
              </label>
              <div className="w-full p-4 text-2xl bg-green-100 border-4 border-green-300 rounded-xl h-16 flex items-center justify-center font-bold text-green-700">
                {output !== null ? output : '???'}
              </div>
            </div>
          </div>

          <div className="bg-purple-100 rounded-xl p-4 text-center">
            <p className="text-purple-800 font-bold text-lg">
              Current Rule: <span className="text-2xl">{functions[selectedFunction].formula}</span>
            </p>
            <p className="text-purple-600 mt-1">
              This is your function! It transforms every input the same way.
            </p>
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">📊 Your History</h2>
              <button
                onClick={reset}
                className="flex items-center gap-2 bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-all"
              >
                <RotateCcw size={20} />
                Reset
              </button>
            </div>
            <div className="grid gap-2">
              {history.slice(-5).reverse().map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg"
                >
                  <span className="font-bold text-blue-600 text-xl">{item.input}</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-purple-600 font-mono">{functions[item.func].formula}</span>
                  <span className="text-gray-400">→</span>
                  <span className="font-bold text-green-600 text-xl">{item.output}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-600 mt-4 text-sm">
              💡 <strong>Key Insight:</strong> Same input always gives same output. That's what makes it a function!
            </p>
          </div>
        )}

        {/* Learning Tips */}
        <div className="mt-8 bg-yellow-100 rounded-2xl p-6 border-4 border-yellow-300">
          <h3 className="text-xl font-bold text-yellow-900 mb-3">🎓 Try This:</h3>
          <ul className="space-y-2 text-yellow-900">
            <li>• Put in the same number twice with the same function - see how you always get the same answer?</li>
            <li>• Try negative numbers! Functions work with all numbers.</li>
            <li>• Put in 0 and see what happens with each function.</li>
            <li>• Notice how each function has its own "personality" - its rule!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}