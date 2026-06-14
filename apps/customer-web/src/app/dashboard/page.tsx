import React from 'react';
import { Calendar, Clock, MapPin, CheckCircle, ChevronRight, User, Settings, LogOut } from 'lucide-react';

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-80 space-y-4">
             <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 text-center">
                <div className="w-24 h-24 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center text-primary text-3xl font-bold">
                   KM
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Kritagya Madaan</h2>
                <p className="text-gray-500">+91 9876543210</p>
             </div>

             <nav className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 space-y-2">
                {[
                  { name: 'My Bookings', icon: Calendar, active: true },
                  { name: 'Saved Pandits', icon: HeartIcon },
                  { name: 'Profile Settings', icon: Settings },
                  { name: 'Support', icon: User },
                  { name: 'Logout', icon: LogOut, danger: true },
                ].map((item, i) => (
                  <button 
                    key={i} 
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                      item.active 
                        ? 'bg-primary text-white shadow-lg shadow-orange-100' 
                        : item.danger 
                          ? 'text-red-500 hover:bg-red-50' 
                          : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon size={20} />
                    {item.name}
                  </button>
                ))}
             </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">
             <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold text-gray-900">My Bookings</h1>
                <div className="flex gap-2">
                   <button className="px-6 py-2 bg-white rounded-full border border-gray-200 text-sm font-bold text-gray-600 hover:border-primary transition-all">Upcoming</button>
                   <button className="px-6 py-2 bg-transparent text-sm font-bold text-gray-400 hover:text-primary transition-all">Past</button>
                </div>
             </div>

             {/* Booking Card */}
             <div className="space-y-6">
                {[1].map((_, i) => (
                  <div key={i} className="bg-white rounded-[40px] p-8 shadow-sm border border-orange-100 flex flex-col md:flex-row gap-8 items-center group hover:shadow-xl hover:shadow-orange-50/50 transition-all">
                     <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                        🏠
                     </div>
                     
                     <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                           <span className="bg-orange-100 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase">Pending Confirmation</span>
                           <span className="text-gray-300">|</span>
                           <span className="text-gray-500 text-sm font-medium">Booking ID: #BP-82719</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">Griha Pravesh Puja</h3>
                        <p className="text-gray-500 font-medium flex items-center gap-2">
                           <Calendar size={16} className="text-primary" /> 24 Oct, 2024
                           <span className="w-1 h-1 bg-gray-300 rounded-full" />
                           <Clock size={16} className="text-primary" /> 09:00 AM
                        </p>
                     </div>

                     <div className="shrink-0 flex flex-col items-end gap-2 text-right">
                        <p className="text-2xl font-bold text-gray-900">₹5,100</p>
                        <p className="text-green-600 text-sm font-bold">₹500 Deposit Paid</p>
                        <button className="flex items-center gap-1 text-primary font-bold hover:underline mt-2 group-hover:translate-x-1 transition-transform">
                           View Details <ChevronRight size={16} />
                        </button>
                     </div>
                  </div>
                ))}

                {/* Empty State Mockup (if needed) */}
                {/* 
                <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-gray-100">
                    <Calendar size={64} className="mx-auto text-gray-200 mb-4" />
                    <h3 className="text-xl font-bold text-gray-400">No bookings yet</h3>
                    <button className="mt-4 text-primary font-bold hover:underline">Book your first puja →</button>
                </div>
                */}
             </div>

             {/* Recommended Section */}
             <section className="pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Need spiritual help?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden group cursor-pointer">
                      <div className="relative z-10">
                         <h4 className="text-2xl font-bold mb-2">Ask an Astrologer</h4>
                         <p className="text-white/80">Get guidance on marriage, career, and life.</p>
                      </div>
                      <div className="absolute -right-4 -bottom-4 text-8xl opacity-20 group-hover:scale-120 transition-all duration-500">🔮</div>
                   </div>
                   <div className="bg-accent rounded-3xl p-8 text-white relative overflow-hidden group cursor-pointer">
                      <div className="relative z-10">
                         <h4 className="text-2xl font-bold mb-2">Vedic Remedies</h4>
                         <p className="text-white/80">Personalized rituals for your problems.</p>
                      </div>
                      <div className="absolute -right-4 -bottom-4 text-8xl opacity-20 group-hover:scale-120 transition-all duration-500">✨</div>
                   </div>
                </div>
             </section>
          </main>
        </div>
      </div>
    </div>
  );
}

function HeartIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
