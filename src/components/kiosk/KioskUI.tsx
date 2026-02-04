import React, { useState } from 'react';
import { MonitorIcon, CheckCircleIcon, ArrowLeftIcon, AlertCircleIcon } from 'lucide-react';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

type KioskScreen = 'attract' | 'menu' | 'service-selection' | 'form' | 'input' | 'ticket';

interface SelectedService {
  id: string;
  name: string;
  icon: string;
  color: string;
}

// Treasury service types with window assignments
const treasuryServices = [
  { id: 'concerns-inquiry', name: 'Concerns and Inquiry', window: 'Window 1', code: 'CI' },
  { id: 'disbursements', name: 'Disbursements', window: 'Window 2', code: 'D' },
  { id: 'payment', name: 'Payment', window: 'Windows 3-5', code: 'P' },
];

// Registrar windows by program/department
const registrarWindows = [
  { id: 'window-1', name: 'Window 1', programs: 'BSCE, BSCPE, BSBA', code: 'W1' },
  { id: 'window-2', name: 'Window 2', programs: 'BSMA, BSPSY, BPED', code: 'W2' },
  { id: 'window-3', name: 'Window 3', programs: 'Senior High School', code: 'W3' },
  { id: 'window-4', name: 'Window 4', programs: 'BSARCH, ABCOMM, BSCS-ML, BSIT-MWA', code: 'W4' },
  { id: 'window-5', name: 'Window 5', programs: 'BSTM, BSA, BSHM', code: 'W5' },
];

// ITSO service types
const itsoServices = [
  { id: 'it-concern', name: 'IT Concern', requiresForm: true, code: 'ITC' },
  { id: 'locked-account', name: 'Locked Account', requiresForm: true, code: 'LA' },
  { id: 'general-inquiry', name: 'General Inquiry', requiresForm: false, code: 'GI' },
];

// Issue types for ITSO form
const issueTypes = [
  'Microsoft 365',
  'NUIS',
  'Network Problem',
  'GL Server',
  'Printer',
  'Technical Problem',
  'Other',
];

// Department options (same as registrar windows)
const departmentOptions = [
  'BSCE', 'BSCPE', 'BSBA',
  'BSMA', 'BSPSY', 'BPED',
  'Senior High School',
  'BSARCH', 'ABCOMM', 'BSCS-ML', 'BSIT-MWA',
  'BSTM', 'BSA', 'BSHM',
];

export function KioskUI() {
  const [screen, setScreen] = useState<KioskScreen>('attract');
  const [selectedService, setSelectedService] = useState<SelectedService | null>(null);
  const [selectedSubService, setSelectedSubService] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');
  const [smsEnabled, setSmsEnabled] = useState(false);
  
  // ITSO form state
  const [itsoFormData, setItsoFormData] = useState({
    department: '',
    contactMethod: '',
    issue: '',
    issueDescription: '',
  });

  const services = [
    { id: 'registrar', name: 'Registrar', icon: '📝', color: 'from-green-500 to-green-600' },
    { id: 'itso', name: 'ITSO', icon: '💻', color: 'from-blue-500 to-blue-600' },
    { id: 'treasury', name: 'Treasury', icon: '💰', color: 'from-yellow-500 to-yellow-600' },
    { id: 'admission', name: 'Admission', icon: '🎓', color: 'from-blue-500 to-blue-600' },
  ];

  const handleServiceSelect = (service: SelectedService) => {
    setSelectedService(service);
    
    // Admission goes straight to phone input (walk-in guest)
    if (service.id === 'admission') {
      setScreen('input');
    } else {
      setScreen('service-selection');
    }
  };

  const handleSubServiceSelect = (subServiceId: string) => {
    setSelectedSubService(subServiceId);
    
    // Check if ITSO service requires form
    if (selectedService?.id === 'itso') {
      const itsoService = itsoServices.find(s => s.id === subServiceId);
      if (itsoService?.requiresForm) {
        setScreen('form');
        return;
      }
    }
    
    // Go to phone input for other services
    setScreen('input');
  };

  const handleFormSubmit = () => {
    // Validate form
    if (!itsoFormData.department || !itsoFormData.contactMethod || 
        !itsoFormData.issue || !itsoFormData.issueDescription) {
      alert('Please fill in all required fields');
      return;
    }
    
    setScreen('input');
  };

  const handleGetTicket = () => {
    // Generate ticket number with service-specific code
    const number = Math.floor(Math.random() * 100) + 1;
    let ticketCode = '';
    
    if (selectedService?.id === 'admission') {
      ticketCode = 'ADM';
    } else if (selectedService?.id === 'treasury') {
      const service = treasuryServices.find(s => s.id === selectedSubService);
      ticketCode = service?.code || 'T';
    } else if (selectedService?.id === 'registrar') {
      const window = registrarWindows.find(w => w.id === selectedSubService);
      ticketCode = window?.code || 'R';
    } else if (selectedService?.id === 'itso') {
      const service = itsoServices.find(s => s.id === selectedSubService);
      ticketCode = service?.code || 'IT';
    } else {
      ticketCode = selectedService?.id.toUpperCase().slice(0, 3) || 'XXX';
    }
    
    setTicketNumber(`${ticketCode}-${String(number).padStart(3, '0')}`);
    
    // If SMS enabled, simulate sending SMS
    if (phoneNumber.trim()) {
      setSmsEnabled(true);
    }
    
    setScreen('ticket');
  };

  const handleReset = () => {
    setScreen('attract');
    setSelectedService(null);
    setSelectedSubService('');
    setPhoneNumber('');
    setTicketNumber('');
    setSmsEnabled(false);
    setItsoFormData({
      department: '',
      contactMethod: '',
      issue: '',
      issueDescription: '',
    });
  };

  const handleBack = () => {
    if (screen === 'ticket') {
      handleReset();
    } else if (screen === 'input') {
      if (selectedService?.id === 'admission') {
        setScreen('menu');
        setSelectedService(null);
      } else {
        setScreen('service-selection');
      }
    } else if (screen === 'form') {
      setScreen('service-selection');
    } else if (screen === 'service-selection') {
      setScreen('menu');
      setSelectedService(null);
      setSelectedSubService('');
    } else if (screen === 'menu') {
      setScreen('attract');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Attract Screen */}
        {screen === 'attract' && (
          <div className="p-16 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <MonitorIcon className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome</h1>
            <p className="text-xl text-gray-600 mb-12">Get your queue ticket here</p>
            <button
              onClick={() => setScreen('menu')}
              className="px-12 py-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-2xl font-bold rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
            >
              TAP TO START
            </button>
          </div>
        )}

        {/* Service Menu */}
        {screen === 'menu' && (
          <div className="p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Select a Service</h2>
            <div className="grid grid-cols-2 gap-6">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className={`bg-gradient-to-br ${service.color} p-8 rounded-2xl text-white hover:scale-105 transition-transform shadow-lg`}
                >
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <div className="text-2xl font-bold">{service.name}</div>
                </button>
              ))}
            </div>
            <button
              onClick={handleReset}
              className="w-full mt-8 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Service Selection (Treasury, Registrar, ITSO) */}
        {screen === 'service-selection' && selectedService && (
          <div className="p-12">
            <div className={`bg-gradient-to-r ${selectedService.color} p-6 rounded-2xl text-white mb-8`}>
              <div className="text-5xl mb-2">{selectedService.icon}</div>
              <h2 className="text-2xl font-bold">{selectedService.name}</h2>
              <p className="text-white/90 mt-2">Select service type</p>
            </div>

            <div className="space-y-4 mb-8">
              {/* Treasury Services */}
              {selectedService.id === 'treasury' && treasuryServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleSubServiceSelect(service.id)}
                  className="w-full bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-xl p-5 text-left transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-xl">{service.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{service.window}</p>
                    </div>
                    <div className="text-2xl">→</div>
                  </div>
                </button>
              ))}

              {/* Registrar Windows */}
              {selectedService.id === 'registrar' && registrarWindows.map((window) => (
                <button
                  key={window.id}
                  onClick={() => handleSubServiceSelect(window.id)}
                  className="w-full bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-xl p-5 text-left transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-xl">{window.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{window.programs}</p>
                    </div>
                    <div className="text-2xl">→</div>
                  </div>
                </button>
              ))}

              {/* ITSO Services */}
              {selectedService.id === 'itso' && itsoServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleSubServiceSelect(service.id)}
                  className="w-full bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-xl p-5 text-left transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-xl">{service.name}</h3>
                      {service.requiresForm && (
                        <p className="text-sm text-blue-600 mt-1 flex items-center gap-1">
                          <AlertCircleIcon className="w-4 h-4" />
                          Form required
                        </p>
                      )}
                    </div>
                    <div className="text-2xl">→</div>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleBack}
              className="w-full py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors text-lg"
            >
              Back
            </button>
          </div>
        )}

        {/* ITSO Form */}
        {screen === 'form' && selectedService?.id === 'itso' && (
          <div className="p-12 max-h-[90vh] overflow-y-auto">
            <div className={`bg-gradient-to-r ${selectedService.color} p-6 rounded-2xl text-white mb-6`}>
              <div className="text-4xl mb-2">{selectedService.icon}</div>
              <h2 className="text-xl font-bold">ITSO Support Request</h2>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-900">
                Please provide the requested information below to help us address your concerns immediately.
              </p>
            </div>

            <div className="space-y-5">
              {/* Department */}
              <div className="space-y-2">
                <Label htmlFor="department" className="text-base font-bold">
                  Department <span className="text-red-500">*</span>
                </Label>
                <Select value={itsoFormData.department} onValueChange={(val) => setItsoFormData({...itsoFormData, department: val})}>
                  <SelectTrigger id="department" className="text-lg py-6">
                    <SelectValue placeholder="Select your answer" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentOptions.map((dept) => (
                      <SelectItem key={dept} value={dept} className="text-lg">{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Preferred Contact Method */}
              <div className="space-y-2">
                <Label className="text-base font-bold">
                  Preferred Contact Method <span className="text-red-500">*</span>
                </Label>
                <p className="text-sm text-gray-600">
                  NUD IT will work directly with contacts listed to resolve this service request.
                </p>
                <RadioGroup value={itsoFormData.contactMethod} onValueChange={(val) => setItsoFormData({...itsoFormData, contactMethod: val})}>
                  <div className="flex items-center space-x-3 py-2">
                    <RadioGroupItem value="email" id="kiosk-email" />
                    <Label htmlFor="kiosk-email" className="font-normal text-lg cursor-pointer">Email (Outlook)</Label>
                  </div>
                  <div className="flex items-center space-x-3 py-2">
                    <RadioGroupItem value="chat" id="kiosk-chat" />
                    <Label htmlFor="kiosk-chat" className="font-normal text-lg cursor-pointer">Chat (Teams)</Label>
                  </div>
                  <div className="flex items-center space-x-3 py-2">
                    <RadioGroupItem value="person" id="kiosk-person" />
                    <Label htmlFor="kiosk-person" className="font-normal text-lg cursor-pointer">In Person</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Issue */}
              <div className="space-y-2">
                <Label htmlFor="issue" className="text-base font-bold">
                  Issue <span className="text-red-500">*</span>
                </Label>
                <Select value={itsoFormData.issue} onValueChange={(val) => setItsoFormData({...itsoFormData, issue: val})}>
                  <SelectTrigger id="issue" className="text-lg py-6">
                    <SelectValue placeholder="Select your answer" />
                  </SelectTrigger>
                  <SelectContent>
                    {issueTypes.map((issue) => (
                      <SelectItem key={issue} value={issue} className="text-lg">{issue}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Issue Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-bold">
                  Issue Description <span className="text-red-500">*</span>
                </Label>
                <p className="text-sm text-gray-600">
                  Provide detailed technical requirements. Clearer and more comprehensive descriptions help achieve faster and more effective solutions
                </p>
                <Textarea
                  id="description"
                  placeholder="Enter your answer"
                  value={itsoFormData.issueDescription}
                  onChange={(e) => setItsoFormData({...itsoFormData, issueDescription: e.target.value})}
                  rows={4}
                  className="resize-none text-lg"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleBack}
                className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors text-lg"
              >
                Back
              </button>
              <button
                onClick={handleFormSubmit}
                className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-colors text-lg"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Input Screen - SMS Notification */}
        {screen === 'input' && selectedService && (
          <div className="p-12">
            <div className={`bg-gradient-to-r ${selectedService.color} p-6 rounded-2xl text-white mb-8`}>
              <div className="text-5xl mb-2">{selectedService.icon}</div>
              <h2 className="text-2xl font-bold">{selectedService.name}</h2>
            </div>

            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                📱 Mobile Number (Optional - For SMS Alerts)
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+63 XXX XXX XXXX"
                className="w-full px-6 py-4 text-2xl border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-900">
                  <strong>💬 SMS Notifications:</strong> If you provide your mobile number, you'll receive real-time SMS updates:
                </p>
                <ul className="text-sm text-blue-800 mt-2 ml-4 space-y-1">
                  <li>• Ticket confirmation</li>
                  <li>• "You're next in line" alert</li>
                  <li>• Counter assignment notification</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors text-lg"
              >
                Back
              </button>
              <button
                onClick={handleGetTicket}
                className="flex-1 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-colors text-lg"
              >
                Get Ticket
              </button>
            </div>
          </div>
        )}

        {/* Ticket Display */}
        {screen === 'ticket' && selectedService && (
          <div className="p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Your Queue Number</h2>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-12 mb-8">
              <div className="text-8xl font-bold text-blue-600 mb-4">{ticketNumber}</div>
              <div className="text-xl text-gray-600">{selectedService.name}</div>
            </div>

            {/* SMS Confirmation */}
            {smsEnabled && phoneNumber && (
              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                  <p className="text-lg font-semibold text-green-900">SMS Alert Enabled!</p>
                </div>
                <p className="text-sm text-green-800">
                  We've sent a confirmation to <strong>{phoneNumber}</strong>
                </p>
                <p className="text-xs text-green-700 mt-2">
                  You'll receive updates when it's almost your turn
                </p>
              </div>
            )}

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-8">
              <p className="text-lg font-semibold text-yellow-900">
                📸 Please take a photo of this screen
              </p>
              <p className="text-sm text-yellow-800 mt-2">
                Keep this number to track your queue status on the hallway monitors
              </p>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors text-lg"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}