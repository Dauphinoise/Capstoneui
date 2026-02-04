import React from 'react';

export function HallwayMonitor() {
  const departments = [
    {
      department: 'Registrar',
      icon: '📝',
      color: 'from-green-500 to-green-600',
      nowServing: [
        { window: 1, ticket: 'REG-025', status: 'serving' },
        { window: 2, ticket: 'REG-026', status: 'serving' },
        { window: 3, ticket: 'REG-027', status: 'serving' },
        { window: 4, ticket: 'REG-028', status: 'serving' },
      ],
      waiting: ['REG-029', 'REG-030', 'REG-031', 'REG-032', 'REG-033', 'REG-034'],
    },
    {
      department: 'Treasury',
      icon: '💰',
      color: 'from-yellow-500 to-yellow-600',
      nowServing: [
        { window: 1, ticket: 'TRS-042', status: 'serving' },
        { window: 2, ticket: 'TRS-043', status: 'serving' },
        { window: 3, ticket: 'TRS-044', status: 'serving' },
      ],
      waiting: ['TRS-045', 'TRS-046', 'TRS-047', 'TRS-048', 'TRS-049'],
    },
    {
      department: 'ITSO',
      icon: '💻',
      color: 'from-blue-500 to-blue-600',
      nowServing: [
        { window: 1, ticket: 'ITS-015', status: 'serving' },
        { window: 2, ticket: 'ITS-016', status: 'serving' },
        { window: 3, ticket: 'ITS-017', status: 'serving' },
      ],
      waiting: ['ITS-018', 'ITS-019', 'ITS-020', 'ITS-021'],
    },
    {
      department: 'Admission',
      icon: '🎓',
      color: 'from-blue-500 to-blue-600',
      nowServing: [
        { window: 1, ticket: 'ADM-008', status: 'serving' },
        { window: 2, ticket: 'ADM-009', status: 'serving' },
      ],
      waiting: ['ADM-010', 'ADM-011', 'ADM-012'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4">Queue Status Monitor</h1>
        <p className="text-2xl text-gray-300">Real-time Queue Updates</p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <p className="text-xl text-gray-400">Live Updates</p>
        </div>
      </header>

      {/* Queue Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {departments.map((dept, idx) => (
          <div key={idx} className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 shadow-2xl">
            {/* Department Header */}
            <div className={`bg-gradient-to-r ${dept.color} rounded-2xl p-6 mb-6`}>
              <div className="flex items-center gap-4">
                <div className="text-6xl">{dept.icon}</div>
                <div>
                  <h2 className="text-4xl font-bold">{dept.department}</h2>
                  <p className="text-xl text-white/80">Service Department</p>
                </div>
              </div>
            </div>

            {/* Now Serving */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4 text-green-400">🟢 Now Serving</h3>
              <div className="grid grid-cols-2 gap-4">
                {dept.nowServing.map((serving, sidx) => (
                  <div key={sidx} className="bg-green-900/30 border-2 border-green-500 rounded-xl p-4">
                    <p className="text-sm text-green-300 mb-1">Window {serving.window}</p>
                    <p className="text-3xl font-bold text-green-400">{serving.ticket}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Waiting Queue */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">⏳ Waiting in Queue</h3>
              <div className="flex flex-wrap gap-3">
                {dept.waiting.map((ticket, widx) => (
                  <div key={widx} className="bg-gray-700 rounded-lg px-4 py-2">
                    <p className="text-xl font-bold text-gray-200">{ticket}</p>
                  </div>
                ))}
              </div>
              {dept.waiting.length === 0 && (
                <p className="text-gray-500 text-center py-4">No one waiting</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center mt-12 text-gray-500">
        <p className="text-xl">Please wait for your number to be called</p>
        <p className="text-lg mt-2">Check the window number assigned to your ticket</p>
      </footer>
    </div>
  );
}