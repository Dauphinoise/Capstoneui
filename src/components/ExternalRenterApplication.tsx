import React, { useState } from 'react';
import { ArrowLeftIcon, BuildingIcon, MailIcon, PhoneIcon, FileTextIcon, UploadIcon, AlertCircleIcon, CheckCircleIcon, UserIcon, MapPinIcon } from 'lucide-react';

interface ExternalRenterApplicationProps {
  onBack: () => void;
  onSubmit: (data: ApplicationData) => void;
}

export interface ApplicationData {
  organizationName: string;
  organizationType: 'corporate' | 'government' | 'ngo' | 'individual' | 'other';
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  purpose: string;
  documents: File[];
}

export function ExternalRenterApplication({ onBack, onSubmit }: ExternalRenterApplicationProps) {
  const [formData, setFormData] = useState<ApplicationData>({
    organizationName: '',
    organizationType: 'corporate',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    purpose: '',
    documents: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const organizationTypes = [
    { value: 'corporate' as const, label: 'Corporate/Business', icon: '🏢' },
    { value: 'government' as const, label: 'Government Agency', icon: '🏛️' },
    { value: 'ngo' as const, label: 'NGO/Non-Profit', icon: '🤝' },
    { value: 'individual' as const, label: 'Individual', icon: '👤' },
    { value: 'other' as const, label: 'Other', icon: '📋' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = 'Organization name is required';
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Purpose of rental is required';
    } else if (formData.purpose.length < 50) {
      newErrors.purpose = 'Please provide more details (minimum 50 characters)';
    }

    if (formData.documents.length === 0) {
      newErrors.documents = 'Please upload at least one supporting document';
    }

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData({ ...formData, documents: [...formData.documents, ...files] });
    }
  };

  const removeFile = (index: number) => {
    const newDocs = formData.documents.filter((_, i) => i !== index);
    setFormData({ ...formData, documents: newDocs });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-6">
      <div className="w-full max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Portal Selection</span>
        </button>

        {/* Application Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-600 to-gray-700 px-8 py-6 text-white">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">🏢</span>
              </div>
              <h2 className="text-2xl font-bold mb-1">External Renter Application</h2>
              <p className="text-gray-100 text-sm">Apply for venue rental access</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">Application Review Process</p>
                  <p className="text-xs text-blue-700">
                    Your application will be reviewed by Facility Admin and Super Admin. You'll receive an email notification once approved. Processing typically takes 2-3 business days.
                  </p>
                </div>
              </div>
            </div>

            {/* Organization Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Organization Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {organizationTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, organizationType: type.value })}
                    className={`p-4 border-2 rounded-xl transition-all text-left ${
                      formData.organizationType === type.value
                        ? 'border-gray-600 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{type.icon}</div>
                    <div className="text-sm font-medium text-gray-900">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Organization Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization/Company Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <BuildingIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  placeholder="ABC Corporation"
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.organizationName ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-600'
                  }`}
                />
              </div>
              {errors.organizationName && (
                <p className="text-xs text-red-600 mt-1">{errors.organizationName}</p>
              )}
            </div>

            {/* Contact Person */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Person <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="Juan Dela Cruz"
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.contactPerson ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-600'
                  }`}
                />
              </div>
              {errors.contactPerson && (
                <p className="text-xs text-red-600 mt-1">{errors.contactPerson}</p>
              )}
            </div>

            {/* Email and Phone */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@example.com"
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-600'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+63 912 345 6789"
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      errors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-600'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complete Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street, City, Province, Postal Code"
                  rows={3}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors resize-none ${
                    errors.address ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-600'
                  }`}
                />
              </div>
              {errors.address && (
                <p className="text-xs text-red-600 mt-1">{errors.address}</p>
              )}
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purpose of Rental <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FileTextIcon className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  placeholder="Please describe the purpose and nature of your rental request (minimum 50 characters)"
                  rows={4}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors resize-none ${
                    errors.purpose ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-600'
                  }`}
                />
              </div>
              <div className="flex justify-between items-center mt-1">
                {errors.purpose ? (
                  <p className="text-xs text-red-600">{errors.purpose}</p>
                ) : (
                  <p className="text-xs text-gray-500">{formData.purpose.length} / 50 characters minimum</p>
                )}
              </div>
            </div>

            {/* Document Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supporting Documents <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Upload valid ID, business permit, or registration documents (PDF, JPG, PNG)
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-500 transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-900 mb-1">Click to upload files</p>
                  <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB each</p>
                </label>
              </div>

              {/* Uploaded Files List */}
              {formData.documents.length > 0 && (
                <div className="mt-3 space-y-2">
                  {formData.documents.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <FileTextIcon className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {errors.documents && (
                <p className="text-xs text-red-600 mt-1">{errors.documents}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 mt-1 text-gray-600 border-gray-300 rounded focus:ring-2 focus:ring-gray-500"
                />
                <span className="text-sm text-gray-700">
                  I declare that all information provided is accurate and agree to the{' '}
                  <a href="#" className="text-gray-700 hover:text-gray-900 font-medium underline">
                    rental terms and conditions
                  </a>
                  . I understand that false information may result in application rejection.
                </span>
              </label>
              {errors.terms && (
                <p className="text-xs text-red-600 mt-1">{errors.terms}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all shadow-lg hover:shadow-xl"
            >
              Submit Application for Review
            </button>
          </form>

          {/* Footer Info */}
          <div className="px-8 pb-8">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircleIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-gray-900 mb-1">What happens next?</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Your application will be reviewed by administrators</li>
                    <li>• You'll receive email updates on your application status</li>
                    <li>• Once approved, you can login using Student/Faculty portal</li>
                    <li>• Processing time: 2-3 business days</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}