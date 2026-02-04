import React, { useState } from 'react';
import { ClockIcon, UsersIcon, ChevronRightIcon, ArrowLeftIcon, AlertCircleIcon } from 'lucide-react';
import { QueueTicket } from './MobileApp';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Input } from './ui/input';

interface QueueModuleProps {
  onJoinQueue: (ticket: QueueTicket) => void;
}

interface Department {
  id: string;
  name: string;
  estimatedWait: number;
  peopleInLine: number;
  icon: string;
  color: string;
}

type ViewType = 'departments' | 'service-selection' | 'form';

const departments: Department[] = [
  {
    id: 'registrar',
    name: 'Registrar',
    estimatedWait: 15,
    peopleInLine: 7,
    icon: '📝',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'admission',
    name: 'Admission',
    estimatedWait: 12,
    peopleInLine: 4,
    icon: '🎓',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'treasury',
    name: 'Treasury',
    estimatedWait: 20,
    peopleInLine: 9,
    icon: '💰',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    id: 'itso',
    name: 'ITSO',
    estimatedWait: 10,
    peopleInLine: 3,
    icon: '💻',
    color: 'from-blue-500 to-blue-600',
  },
];

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

export function QueueModule({ onJoinQueue }: QueueModuleProps) {
  const [currentView, setCurrentView] = useState<ViewType>('departments');
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [selectedService, setSelectedService] = useState<string>('');
  
  // ITSO form state
  const [itsoFormData, setItsoFormData] = useState({
    department: '',
    contactMethod: '',
    issue: '',
    issueDescription: '',
  });

  const handleDepartmentSelect = (dept: Department) => {
    setSelectedDept(dept);
    
    // Admission goes straight to queue
    if (dept.id === 'admission') {
      generateTicket(dept, 'Inquiry');
    } else {
      setCurrentView('service-selection');
    }
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    
    // Check if ITSO service requires form
    if (selectedDept?.id === 'itso') {
      const service = itsoServices.find(s => s.id === serviceId);
      if (service?.requiresForm) {
        setCurrentView('form');
        return;
      }
    }
    
    // Generate ticket for other services
    generateTicketWithService(serviceId);
  };

  const handleFormSubmit = () => {
    // Validate form
    if (!itsoFormData.department || !itsoFormData.contactMethod || 
        !itsoFormData.issue || !itsoFormData.issueDescription) {
      alert('Please fill in all required fields');
      return;
    }
    
    generateTicketWithService(selectedService);
  };

  const generateTicket = (dept: Department, serviceName: string) => {
    const ticketNumber = Math.floor(Math.random() * 100) + 1;
    const ticketCode = dept.id === 'admission' ? 'ADM' : dept.id.toUpperCase().slice(0, 3);
    
    const ticket: QueueTicket = {
      department: dept.name,
      ticketNumber: `${ticketCode}-${String(ticketNumber).padStart(3, '0')}`,
      position: dept.peopleInLine + 1,
      estimatedWait: dept.estimatedWait,
      status: 'waiting',
      serviceType: serviceName,
    };
    onJoinQueue(ticket);
  };

  const generateTicketWithService = (serviceId: string) => {
    if (!selectedDept) return;
    
    let serviceName = '';
    let ticketCode = '';
    
    if (selectedDept.id === 'treasury') {
      const service = treasuryServices.find(s => s.id === serviceId);
      serviceName = service?.name || '';
      ticketCode = service?.code || 'T';
    } else if (selectedDept.id === 'registrar') {
      const window = registrarWindows.find(w => w.id === serviceId);
      serviceName = window?.name || '';
      ticketCode = window?.code || 'R';
    } else if (selectedDept.id === 'itso') {
      const service = itsoServices.find(s => s.id === serviceId);
      serviceName = service?.name || '';
      ticketCode = service?.code || 'IT';
    }
    
    // Generate ticket with service-specific code
    const ticketNumber = Math.floor(Math.random() * 100) + 1;
    const ticket: QueueTicket = {
      department: selectedDept.name,
      ticketNumber: `${ticketCode}-${String(ticketNumber).padStart(3, '0')}`,
      position: selectedDept.peopleInLine + 1,
      estimatedWait: selectedDept.estimatedWait,
      status: 'waiting',
      serviceType: serviceName,
    };
    onJoinQueue(ticket);
  };

  const handleBack = () => {
    if (currentView === 'form') {
      setCurrentView('service-selection');
    } else if (currentView === 'service-selection') {
      setCurrentView('departments');
      setSelectedDept(null);
      setSelectedService('');
      setItsoFormData({
        department: '',
        contactMethod: '',
        issue: '',
        issueDescription: '',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          {currentView !== 'departments' && (
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-900">Virtual Queue</h1>
            <p className="text-sm text-gray-500 mt-1">
              {currentView === 'departments' && 'Join a queue and wait from anywhere'}
              {currentView === 'service-selection' && `Select ${selectedDept?.name} service`}
              {currentView === 'form' && 'Complete the form'}
            </p>
          </div>
        </div>
      </header>

      <div className="px-6 py-6">
        {/* Departments List */}
        {currentView === 'departments' && (
          <div className="space-y-4">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className={`bg-gradient-to-r ${dept.color} p-4`}>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{dept.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-lg">{dept.name}</h3>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <ClockIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Estimated Wait</p>
                        <p className="font-semibold text-gray-900">{dept.estimatedWait} mins</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <UsersIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">People in Line</p>
                        <p className="font-semibold text-gray-900">{dept.peopleInLine}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDepartmentSelect(dept)}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    {dept.id === 'admission' ? 'Join Queue' : 'Continue'}
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Service Selection */}
        {currentView === 'service-selection' && selectedDept && (
          <div className="space-y-4">
            {/* Treasury Services */}
            {selectedDept.id === 'treasury' && treasuryServices.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceSelect(service.id)}
                className="w-full bg-white rounded-xl border border-gray-200 p-5 text-left hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{service.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{service.window}</p>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))}

            {/* Registrar Windows */}
            {selectedDept.id === 'registrar' && registrarWindows.map((window) => (
              <button
                key={window.id}
                onClick={() => handleServiceSelect(window.id)}
                className="w-full bg-white rounded-xl border border-gray-200 p-5 text-left hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{window.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{window.programs}</p>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))}

            {/* ITSO Services */}
            {selectedDept.id === 'itso' && itsoServices.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceSelect(service.id)}
                className="w-full bg-white rounded-xl border border-gray-200 p-5 text-left hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{service.name}</h3>
                    {service.requiresForm && (
                      <p className="text-sm text-blue-600 mt-1 flex items-center gap-1">
                        <AlertCircleIcon className="w-4 h-4" />
                        Form required
                      </p>
                    )}
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ITSO Form */}
        {currentView === 'form' && selectedDept?.id === 'itso' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                Please provide the requested information below to help us address your concerns immediately.
              </p>
            </div>

            {/* Department */}
            <div className="space-y-2">
              <Label htmlFor="department" className="text-base font-semibold">
                Department <span className="text-red-500">*</span>
              </Label>
              <Select value={itsoFormData.department} onValueChange={(val) => setItsoFormData({...itsoFormData, department: val})}>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select your answer" />
                </SelectTrigger>
                <SelectContent>
                  {departmentOptions.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Preferred Contact Method */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">
                Preferred Contact Method <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-gray-600">
                NUD IT will work directly with contacts listed to resolve this service request.
              </p>
              <RadioGroup value={itsoFormData.contactMethod} onValueChange={(val) => setItsoFormData({...itsoFormData, contactMethod: val})}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" />
                  <Label htmlFor="email" className="font-normal">Email (Outlook)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="chat" id="chat" />
                  <Label htmlFor="chat" className="font-normal">Chat (Teams)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="person" id="person" />
                  <Label htmlFor="person" className="font-normal">In Person</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Issue */}
            <div className="space-y-2">
              <Label htmlFor="issue" className="text-base font-semibold">
                Issue <span className="text-red-500">*</span>
              </Label>
              <Select value={itsoFormData.issue} onValueChange={(val) => setItsoFormData({...itsoFormData, issue: val})}>
                <SelectTrigger id="issue">
                  <SelectValue placeholder="Select your answer" />
                </SelectTrigger>
                <SelectContent>
                  {issueTypes.map((issue) => (
                    <SelectItem key={issue} value={issue}>{issue}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Issue Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-semibold">
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
                className="resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleFormSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              Submit & Get Ticket
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Info Card - shown on departments view */}
        {currentView === 'departments' && (
          <div className="mt-6">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <h4 className="font-semibold text-blue-900 mb-2">How it works</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Join a queue and receive a virtual ticket</li>
                <li>• Wait from anywhere on campus</li>
                <li>• Get notified when it's almost your turn</li>
                <li>• Show your ticket when called</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}