'use client';

import React from 'react';
import { useApi } from '@/hooks/useApi';
import { 
  Users, 
  CalendarCheck, 
  TrendingUp, 
  AlertCircle,
  ChevronRight,
  UserCheck,
  Loader2
} from 'lucide-react';

export default function AdminDashboard() {
  const { data: bookings, loading: bookingsLoading } = useApi<any[]>('/bookings/all');
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back, here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Bookings', value: '1,284', grow: '+12.5%', icon: CalendarCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'New Pandits', value: '48', grow: '+8.2%', icon: UserCheck, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Total Revenue', value: '₹ 8,42,000', grow: '+15.3%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Active Issues', value: '12', grow: '-2', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-xs font-bold ${stat.grow.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.grow}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Verification Queue Preview */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-lg">Verification Queue</h3>
            <button className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Pandit${i+10}`} alt="Pandit" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Pandit Rajesh Kumar</h4>
                    <p className="text-xs text-gray-500">Varanasi • 12 Yrs Exp • Hindi, Sanskrit</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-bold hover:bg-primary/20 transition-all">Review Docs</button>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-bold hover:bg-green-600 transition-all shadow-sm">Verify</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Bookings Feed */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-lg">Live Bookings</h3>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <div className="p-6 space-y-6">
            {bookingsLoading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="animate-spin text-primary" size={32} />
              </div>
            ) : bookings?.length === 0 ? (
               <p className="text-sm text-gray-400 text-center py-10">No live bookings</p>
            ) : (
              bookings?.slice(0, 5).map((booking, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-1 h-12 bg-orange-100 rounded-full grow-0 shrink-0 overflow-hidden">
                    <div className="h-1/2 bg-primary w-full" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Booking #{booking.id.slice(0, 8)}</p>
                    <p className="text-xs text-gray-500 mb-1">{booking.status} • ₹{booking.amount}</p>
                    <div className={`px-2 py-0.5 rounded text-[10px] font-bold w-fit uppercase ${
                      booking.paymentStatus === 'paid' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {booking.paymentStatus}
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-[10px] font-bold text-gray-400">New</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
