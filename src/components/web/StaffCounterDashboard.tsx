import React, { useState } from 'react';
import { BellIcon, ArrowRightIcon, RefreshCwIcon, XCircleIcon, ArrowRightLeftIcon, RepeatIcon, AlertCircleIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Ticket {
  number: string;
  serviceType: string;
  waitTime: string;
  transferredFrom?: string;
}

type DepartmentType = 'treasury' | 'registrar' | 'itso' | 'admission';

interface StaffCounterDashboardProps {
  department?: DepartmentType;
}

// Service types by department
const serviceTypesByDept = {
  treasury: [
    { id: 'concerns-inquiry', name: 'Concerns & Inquiry', window: 'Window 1', color: 'text-blue-600' },
    { id: 'disbursements', name: 'Disbursements', window: 'Window 2', color: 'text-green-600' },
    { id: 'payment', name: 'Payment', window: 'Windows 3-5', color: 'text-yellow-600' },
  ],
  registrar: [
    { id: 'window-1', name: 'Window 1 (BSCE, BSCPE, BSBA)', color: 'text-blue-600' },
    { id: 'window-2', name: 'Window 2 (BSMA, BSPSY, BPED)', color: 'text-green-600' },
    { id: 'window-3', name: 'Window 3 (Senior High School)', color: 'text-yellow-600' },
    { id: 'window-4', name: 'Window 4 (BSARCH, ABCOMM, BSCS-ML, BSIT-MWA)', color: 'text-purple-600' },
    { id: 'window-5', name: 'Window 5 (BSTM, BSA, BSHM)', color: 'text-red-600' },
  ],
  itso: [
    { id: 'it-concern', name: 'IT Concern', color: 'text-blue-600' },
    { id: 'locked-account', name: 'Locked Account', color: 'text-red-600' },
    { id: 'general-inquiry', name: 'General Inquiry', color: 'text-green-600' },
  ],
  admission: [
    { id: 'inquiry', name: 'Inquiry', color: 'text-blue-600' },
  ],
};

export function StaffCounterDashboard({ department = 'treasury' }: StaffCounterDashboardProps) {
  const [currentTicket, setCurrentTicket] = useState<Ticket>({
    number: 'P-005',
    serviceType: 'Payment',
    waitTime: '12 mins',
  });

  const [currentService, setCurrentService] = useState<string>('payment');
  const [showServiceSwitch, setShowServiceSwitch] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showRecallModal, setShowRecallModal] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [serviceNotes, setServiceNotes] = useState('');

  // Mock queue by service type
  const [queueByService] = useState<Record<string, Ticket[]>>({
    'concerns-inquiry': [
      { number: 'CI-006', serviceType: 'Concerns & Inquiry', waitTime: '2 mins' },
      { number: 'CI-010', serviceType: 'Concerns & Inquiry', waitTime: '9 mins' },
    ],
    'disbursements': [
      { number: 'D-007', serviceType: 'Disbursements', waitTime: '5 mins', transferredFrom: 'Payment' },
      { number: 'D-011', serviceType: 'Disbursements', waitTime: '12 mins' },
      { number: 'D-014', serviceType: 'Disbursements', waitTime: '19 mins' },
      { number: 'D-015', serviceType: 'Disbursements', waitTime: '26 mins' },
      { number: 'D-016', serviceType: 'Disbursements', waitTime: '33 mins' },
    ],
    'payment': [
      { number: 'P-008', serviceType: 'Payment', waitTime: '3 mins' },
      { number: 'P-009', serviceType: 'Payment', waitTime: '6 mins' },
    ],
  });

  // Get current queue based on selected service
  const currentQueue = queueByService[currentService] || [];

  // Skipped tickets - people who didn't show up when called
  const [skippedTickets] = useState([
    { number: 'TRE-001', serviceType: 'Payment', skippedAt: '9:15 AM', reason: 'No show' },
    { number: 'TRE-003', serviceType: 'Concerns & Inquiry', skippedAt: '9:42 AM', reason: 'No show' },
    { number: 'TRE-004', serviceType: 'Disbursements', skippedAt: '10:05 AM', reason: 'No show' },
  ]);

  const availableServices = serviceTypesByDept[department];

  const handleNext = () => {
    alert('Next caller loaded!');
  };

  const handleRecall = () => {
    setShowRecallModal(true);
  };

  const handleRecallSkippedTicket = (ticketNumber: string) => {
    alert(`🔔 Recalling skipped ticket ${ticketNumber}\nNotification sent to user's phone`);
    setShowRecallModal(false);
  };

  const handleTransfer = (targetServiceId: string) => {
    const targetService = availableServices.find(s => s.id === targetServiceId);
    alert(`Ticket ${currentTicket.number} transferred to ${targetService?.name}\nUser will receive push notification about the transfer`);
    setShowTransferModal(false);
  };

  const handleServiceSwitch = (newServiceId: string) => {
    const newService = availableServices.find(s => s.id === newServiceId);
    setCurrentService(newServiceId);
    alert(`✅ Service switched to ${newService?.name}\n\nYou will now serve customers from this queue. This helps resolve bottlenecks when one service has too many people waiting.`);
    setShowServiceSwitch(false);
  };

  const handleResolved = () => {
    if (serviceNotes.trim()) {
      alert(`Ticket resolved with notes: ${serviceNotes}`);
    } else {
      alert('Ticket resolved!');
    }
  };

  const currentServiceInfo = availableServices.find(s => s.id === currentService);

  // Check for bottleneck (more than 3 people in queue)
  const hasBottleneck = currentQueue.length > 3;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Bar */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">
              {department === 'treasury' && 'Treasury'}
              {department === 'registrar' && 'Registrar'}
              {department === 'itso' && 'ITSO'}
              {department === 'admission' && 'Admission'}
              {' - Counter '}
              {department === 'treasury' && '3'}
              {department === 'registrar' && '1'}
              {department === 'itso' && '1'}
              {department === 'admission' && '1'}
            </h1>
            <p className="text-sm text-gray-400">Staff: Maria Santos</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
              ● Active
            </div>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <BellIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Serving Panel */}
          <div className="lg:col-span-2">
            {/* Current Service Selector */}
            <div className="bg-gray-800 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-gray-300">Current Service:</label>
                <button
                  onClick={() => setShowServiceSwitch(true)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <RepeatIcon className="w-4 h-4" />
                  Switch Service
                </button>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-lg">{currentServiceInfo?.name}</p>
                    {department === 'treasury' && 'window' in currentServiceInfo! && (
                      <p className="text-sm text-gray-400">{currentServiceInfo.window}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{currentQueue.length}</p>
                    <p className="text-xs text-gray-400">in queue</p>
                  </div>
                </div>
              </div>
              
              {hasBottleneck && (
                <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-3 mt-3">
                  <div className="flex items-start gap-2">
                    <AlertCircleIcon className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-red-200">Queue Bottleneck</p>
                      <p className="text-xs text-red-300 mt-1">
                        High queue volume detected. Consider switching to help other services if available.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-12 text-center shadow-2xl mb-6">
              <p className="text-sm opacity-80 mb-2 uppercase tracking-wide">Now Serving</p>
              <div className="text-8xl font-bold mb-6 tracking-tight">{currentTicket.number}</div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-2">
                <p className="text-lg font-medium">{currentTicket.serviceType}</p>
              </div>
              {currentTicket.transferredFrom && (
                <div className="mt-3 flex items-center justify-center gap-2 text-sm bg-yellow-500/20 text-yellow-200 px-4 py-2 rounded-lg">
                  <ArrowRightLeftIcon className="w-4 h-4" />
                  Transferred from {currentTicket.transferredFrom}
                </div>
              )}
              <p className="text-sm opacity-80 mt-2">Wait Time: {currentTicket.waitTime}</p>
            </div>

            {/* Service Notes */}
            <div className="bg-gray-800 rounded-xl p-4 mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Service Notes (Optional)</label>
              <textarea
                value={serviceNotes}
                onChange={(e) => setServiceNotes(e.target.value)}
                placeholder="Add any notes about this service interaction..."
                rows={3}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Control Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleNext}
                className="bg-green-600 hover:bg-green-700 text-white py-6 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <ArrowRightIcon className="w-6 h-6" />
                NEXT CALLER
              </button>
              <button
                onClick={handleRecall}
                className="bg-yellow-600 hover:bg-yellow-700 text-white py-6 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <BellIcon className="w-6 h-6" />
                RECALL
              </button>
              <button
                onClick={() => setShowTransferModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <ArrowRightLeftIcon className="w-6 h-6" />
                TRANSFER
              </button>
              <button
                onClick={handleResolved}
                className="bg-gray-600 hover:bg-gray-700 text-white py-6 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <XCircleIcon className="w-6 h-6" />
                RESOLVED
              </button>
            </div>
          </div>

          {/* Queue Sidebar */}
          <div className="bg-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Upcoming Queue</h3>
            <p className="text-xs text-gray-400 mb-4">
              Showing queue for: <span className="text-white font-semibold">{currentServiceInfo?.name}</span>
            </p>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {currentQueue.length > 0 ? currentQueue.map((ticket, idx) => (
                <div key={idx} className="bg-gray-700 rounded-xl p-4 hover:bg-gray-600 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold text-lg">{ticket.number}</div>
                    <div className="text-xs text-gray-400">{ticket.waitTime}</div>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{ticket.serviceType}</p>
                  {ticket.transferredFrom && (
                    <div className="flex items-center gap-1 text-xs text-yellow-400">
                      <ArrowRightLeftIcon className="w-3 h-3" />
                      From {ticket.transferredFrom}
                    </div>
                  )}
                </div>
              )) : (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-sm">No queue for this service</p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Today's Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Served:</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">In Queue:</span>
                  <span className="font-semibold">{currentQueue.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Transferred:</span>
                  <span className="font-semibold text-blue-400">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg. Time:</span>
                  <span className="font-semibold">7 mins</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Switch Modal */}
      {showServiceSwitch && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold mb-1">Switch Service Type</h3>
                <p className="text-sm text-gray-400">Help reduce bottlenecks by switching to busier services</p>
              </div>
              <button
                onClick={() => setShowServiceSwitch(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <XCircleIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-4 mb-6">
              <p className="text-sm text-blue-200">
                <span className="font-semibold">💡 Bottleneck Management:</span> If one service type has too many people waiting, you can temporarily switch your window to help serve that queue. This flexibility helps reduce overall wait times.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {availableServices.map((service) => {
                const queue = queueByService[service.id] || [];
                const isCurrentService = service.id === currentService;
                const isBottleneck = queue.length > 3;
                
                return (
                  <button
                    key={service.id}
                    onClick={() => !isCurrentService && handleServiceSwitch(service.id)}
                    disabled={isCurrentService}
                    className={`p-5 rounded-xl transition-all text-left ${
                      isCurrentService
                        ? 'bg-gray-700 border-2 border-blue-500 cursor-not-allowed'
                        : isBottleneck
                        ? 'bg-red-900/30 border-2 border-red-500 hover:bg-red-900/50'
                        : 'bg-gray-700 border-2 border-gray-600 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-white mb-1">{service.name}</h4>
                        {department === 'treasury' && 'window' in service && (
                          <p className="text-xs text-gray-400">{service.window}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {isBottleneck && <AlertCircleIcon className="w-5 h-5 text-red-400" />}
                        <div className={`text-right ${isBottleneck ? 'text-red-400' : 'text-white'}`}>
                          <p className="text-2xl font-bold">{queue.length}</p>
                          <p className="text-xs text-gray-400">in queue</p>
                        </div>
                      </div>
                    </div>
                    {isCurrentService && (
                      <div className="bg-blue-600/20 text-blue-300 px-3 py-1.5 rounded-lg text-xs font-semibold">
                        Current Service
                      </div>
                    )}
                    {!isCurrentService && isBottleneck && (
                      <div className="bg-red-600/20 text-red-300 px-3 py-1.5 rounded-lg text-xs font-semibold">
                        ⚠️ Needs Help
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowServiceSwitch(false)}
              className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold mb-1">Transfer Ticket</h3>
                <p className="text-sm text-gray-400">Select target service for {currentTicket.number}</p>
              </div>
              <button
                onClick={() => setShowTransferModal(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <XCircleIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-4 mb-6">
              <p className="text-sm text-blue-200">
                <span className="font-semibold">Within-Department Transfer:</span> This will move the customer to a different service window. They'll receive a push notification about the transfer.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Transfer to:</label>
              {availableServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleTransfer(service.id)}
                  className="w-full flex items-center justify-between p-4 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ArrowRightLeftIcon className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold">{service.name}</span>
                  </div>
                  <ArrowRightIcon className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowTransferModal(false)}
              className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Recall Modal */}
      {showRecallModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold mb-1">Recall Skipped Tickets</h3>
                <p className="text-sm text-gray-400">People who didn't show up when called</p>
              </div>
              <button
                onClick={() => setShowRecallModal(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <XCircleIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-xl p-4 mb-6">
              <p className="text-sm text-yellow-200">
                <span className="font-semibold">⚠️ No-Show Queue:</span> These tickets were called but the customer didn't come to the window. Select one to send a recall notification.
              </p>
            </div>

            {skippedTickets.length > 0 ? (
              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                {skippedTickets.map((ticket) => (
                  <button
                    key={ticket.number}
                    onClick={() => handleRecallSkippedTicket(ticket.number)}
                    className="w-full p-4 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors text-left"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <BellIcon className="w-5 h-5 text-yellow-400" />
                        <span className="font-bold text-lg">{ticket.number}</span>
                      </div>
                      <div className="text-xs text-gray-400">Skipped at {ticket.skippedAt}</div>
                    </div>
                    <p className="text-sm text-gray-300 mb-1">{ticket.serviceType}</p>
                    <div className="flex items-center gap-2 text-xs text-red-400">
                      <XCircleIcon className="w-3 h-3" />
                      {ticket.reason}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BellIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No skipped tickets</p>
              </div>
            )}

            <button
              onClick={() => setShowRecallModal(false)}
              className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}