import React, { useState } from 'react';
import { PlusIcon, SearchIcon, MailIcon, PhoneIcon, BuildingIcon, UserIcon, XIcon, CheckCircleIcon, XCircleIcon, EditIcon } from 'lucide-react';

interface Affiliate {
  id: string;
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  createdDate: string;
  endorsementLetter: string;
  totalBookings: number;
}

export function AffiliateManagement() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const mockAffiliates: Affiliate[] = [
    {
      id: '1',
      organizationName: 'ABC Corporation',
      contactPerson: 'John Doe',
      email: 'john.doe@abccorp.com',
      phone: '+63 912 345 6789',
      status: 'active',
      createdDate: 'January 15, 2026',
      endorsementLetter: 'endorsement-abc-001.pdf',
      totalBookings: 5,
    },
    {
      id: '2',
      organizationName: 'XYZ Foundation',
      contactPerson: 'Jane Smith',
      email: 'jane.smith@xyzfoundation.org',
      phone: '+63 917 654 3210',
      status: 'active',
      createdDate: 'January 20, 2026',
      endorsementLetter: 'endorsement-xyz-002.pdf',
      totalBookings: 3,
    },
    {
      id: '3',
      organizationName: 'Tech Innovations Inc.',
      contactPerson: 'Mike Johnson',
      email: 'mike@techinnovations.com',
      phone: '+63 920 111 2222',
      status: 'pending',
      createdDate: 'February 5, 2026',
      endorsementLetter: 'endorsement-tech-003.pdf',
      totalBookings: 0,
    },
  ];

  const getStatusBadge = (status: Affiliate['status']) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">✓ Active</span>;
      case 'inactive':
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">○ Inactive</span>;
      case 'pending':
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">⏳ Pending</span>;
    }
  };

  const filteredAffiliates = mockAffiliates.filter(aff =>
    aff.organizationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    aff.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
    aff.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Affiliate Management</h2>
          <p className="text-sm text-gray-600">Manage affiliate organizations and their access</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Create Affiliate Account
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by organization name, contact person, or email..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {mockAffiliates.filter(a => a.status === 'active').length}
              </p>
              <p className="text-sm text-gray-600">Active Affiliates</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">⏳</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {mockAffiliates.filter(a => a.status === 'pending').length}
              </p>
              <p className="text-sm text-gray-600">Pending Approval</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BuildingIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{mockAffiliates.length}</p>
              <p className="text-sm text-gray-600">Total Affiliates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Affiliates Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Organization</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Contact Person</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Bookings</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAffiliates.map((affiliate) => (
                <tr key={affiliate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BuildingIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{affiliate.organizationName}</p>
                        <p className="text-xs text-gray-500">Since {affiliate.createdDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{affiliate.contactPerson}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MailIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{affiliate.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{affiliate.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(affiliate.status)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900">{affiliate.totalBookings}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedAffiliate(affiliate);
                          setShowViewModal(true);
                        }}
                        className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        View
                      </button>
                      {affiliate.status === 'pending' && (
                        <>
                          <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            Approve
                          </button>
                          <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            Reject
                          </button>
                        </>
                      )}
                      {affiliate.status === 'active' && (
                        <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          Deactivate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Affiliate Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Create Affiliate Account</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter organization name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter contact person name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  placeholder="contact@organization.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+63 XXX XXX XXXX"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endorsement Letter <span className="text-red-600">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" id="endorsement-upload" />
                  <label htmlFor="endorsement-upload" className="cursor-pointer">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <BuildingIcon className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">Upload Endorsement Letter</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX format</p>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Create a secure password"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Password will be sent to the affiliate's email
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Affiliate account created! Credentials sent to email.');
                    setShowCreateModal(false);
                  }}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Affiliate Modal */}
      {showViewModal && selectedAffiliate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">{selectedAffiliate.organizationName}</h2>
              <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Contact Person</p>
                  <p className="font-semibold text-gray-900">{selectedAffiliate.contactPerson}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  {getStatusBadge(selectedAffiliate.status)}
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-semibold text-gray-900">{selectedAffiliate.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <p className="font-semibold text-gray-900">{selectedAffiliate.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Created Date</p>
                  <p className="font-semibold text-gray-900">{selectedAffiliate.createdDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Bookings</p>
                  <p className="font-semibold text-gray-900">{selectedAffiliate.totalBookings}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Endorsement Letter</p>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BuildingIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{selectedAffiliate.endorsementLetter}</p>
                    <p className="text-xs text-gray-500">PDF Document</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Download
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                {selectedAffiliate.status === 'active' && (
                  <button className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors">
                    Deactivate Account
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
