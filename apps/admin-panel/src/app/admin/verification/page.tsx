'use client';

import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Download, 
  ExternalLink,
  ShieldAlert,
  Search,
  Filter
} from 'lucide-react';

export default function VerificationQueue() {
  const [pandits, setPandits] = useState([
    { id: 1, name: 'Pandit Satish Mishra', location: 'Varanasi', exp: '15+ Years', specialties: 'Vedic Rituals, Marriage' },
    { id: 2, name: 'Pandit Ramesh Shastri', location: 'Haridwar', exp: '10+ Years', specialties: 'Rudrabhishek, Vastu' },
    { id: 3, name: 'Pandit Alok Tiwari', location: 'Prayagraj', exp: '8+ Years', specialties: 'Satyanarayan Katha' },
  ]);

  const handleApprove = (id: number) => {
    setPandits(prev => prev.filter(p => p.id !== id));
    alert('Pandit profile approved and listed on the platform!');
  };

  const handleReject = (id: number) => {
    if (confirm('Are you sure you want to reject this application?')) {
      setPandits(prev => prev.filter(p => p.id !== id));
    }
  };
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pandit Verification Queue</h1>
          <p className="text-gray-500">Review documents and approve new pandit profiles.</p>
        </div>
        <div className="flex gap-4">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Filter by name..." className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg outline-none" />
           </div>
           <button className="flex items-center gap-2 bg-white px-4 py-2 border border-gray-200 rounded-lg text-gray-600 font-bold hover:border-primary transition-all">
              <Filter size={18} /> All Regions
           </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Pandit Details</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Documents</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Experience</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pandits.map((pandit) => (
              <tr key={pandit.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${pandit.id}`} alt="Pandit" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{pandit.name}</p>
                      <p className="text-xs text-gray-500">{pandit.location}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex gap-2">
                    <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all">
                      <Download size={18} />
                    </button>
                    <button className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-6">
                   <p className="font-bold text-gray-900">{pandit.exp}</p>
                   <p className="text-xs text-gray-500">{pandit.specialties}</p>
                </td>
                <td className="px-6 py-6">
                  <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold border border-amber-100">
                    Pending Review
                  </span>
                </td>
                <td className="px-6 py-6 border-l border-transparent">
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => handleApprove(pandit.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-bold hover:bg-green-600 transition-all shadow-sm shadow-green-100"
                    >
                      <CheckCircle size={16} /> Approve
                    </button>
                    <button 
                      onClick={() => handleReject(pandit.id)}
                      className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
         <p className="text-sm text-gray-500">Showing 5 of 24 pandits needing verification.</p>
         <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-400 cursor-not-allowed">Previous</button>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-900 hover:border-primary transition-all">Next</button>
         </div>
      </div>
    </div>
  );
}
