import React from 'react';
import Image from 'next/image';
import { Star, MapPin, Languages, CheckCircle, Calendar, Share2, Heart, Award } from 'lucide-react';

export default function PanditProfile({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Profile Header */}
      <section className="bg-orange-50 border-b border-orange-100 py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-10 items-center">
          <div className="w-48 h-48 relative rounded-full overflow-hidden border-4 border-white shadow-xl shrink-0 bg-white">
             <Image 
               src={`https://api.dicebear.com/7.x/avataaars/svg?seed=PanditRamesh`}
               alt="Pandit Photo"
               fill
               sizes="192px"
               className="object-cover"
             />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <h1 className="text-4xl font-bold text-gray-900">Pandit Ramesh Shastri</h1>
              <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1 w-fit mx-auto md:mx-0">
                <CheckCircle size={14} /> Verified Pandit
              </span>
            </div>
            
            <p className="text-xl text-gray-600 mb-6">Vedic & Ritual Specialist | 15+ years of divine service</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-gray-500 font-medium">
              <span className="flex items-center gap-2"><Star size={20} className="fill-accent text-accent" /> 4.9 (124 Reviews)</span>
              <span className="flex items-center gap-2"><MapPin size={20} className="text-primary" /> Varanasi & Nearby Areas</span>
              <span className="flex items-center gap-2"><Languages size={20} className="text-primary" /> Hindi, Sanskrit, English</span>
            </div>
          </div>
          
          <div className="shrink-0 flex gap-4">
             <button className="p-3 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-primary transition-all shadow-sm">
                <Share2 size={24} />
             </button>
             <button className="p-3 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-red-500 transition-all shadow-sm">
                <Heart size={24} />
             </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1 space-y-12">
          {/* Bio */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Award className="text-primary" /> About Pandit Ji
            </h2>
            <div className="prose prose-orange max-w-none text-gray-600 leading-relaxed text-lg">
              <p>
                Pandit Ramesh Shastri is a highly revered Vedic scholar based in the holy city of Varanasi. With over 15 years of experience, he has performed countless sacred rituals including Griha Pravesh, Rudrabhishek, and Marriage ceremonies across India.
              </p>
              <p className="mt-4">
                He completed his master's degree in Vedic Studies from Sampurnanand Sanskrit Vishwavidyalaya and follows the strictly prescribed Vedic traditions to ensure the maximum spiritual benefit for his devotees.
              </p>
            </div>
          </div>

          {/* Specializations */}
          <div>
             <h2 className="text-2xl font-bold mb-6">Ceremonies Offered</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Griha Pravesh', price: '₹5,100', time: '2-3 hrs' },
                  { name: 'Marriage Puja', price: '₹21,000', time: '5-6 hrs' },
                  { name: 'Satyanarayan Katha', price: '₹2,100', time: '1.5 hrs' },
                  { name: 'Rudrabhishek', price: '₹3,500', time: '2 hrs' },
                  { name: 'Mundan Sanskar', price: '₹3,100', time: '1.5 hrs' },
                  { name: 'Navgraha Shanti', price: '₹4,500', time: '3 hrs' },
                ].map((service, i) => (
                  <div key={i} className="flex justify-between items-center p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-orange-50 transition-all group">
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-primary">{service.name}</h4>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <Calendar size={14} /> Approx {service.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-900">{service.price}</p>
                      <button className="text-primary text-xs font-bold hover:underline">Select Service</button>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Sticky Booking Card */}
        <aside className="lg:w-[400px]">
          <div className="sticky top-32 bg-white rounded-[40px] border-2 border-orange-100 p-8 shadow-2xl shadow-orange-100">
             <div className="mb-6">
                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-1">Total Booking Value</p>
                <p className="text-4xl font-bold text-gray-900">₹5,100</p>
             </div>
             
             <div className="space-y-4 mb-8">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                   <p className="text-xs text-gray-400 font-bold mb-1">SELECTED SERVICE</p>
                   <p className="font-bold text-gray-800">Griha Pravesh Ritual</p>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex justify-between">
                   <div>
                      <p className="text-xs text-gray-400 font-bold mb-1">DATE</p>
                      <p className="font-bold text-gray-800">24 Oct, 2024</p>
                   </div>
                   <div className="text-right">
                      <p className="text-xs text-gray-400 font-bold mb-1">TIME</p>
                      <p className="font-bold text-gray-800">09:00 AM</p>
                   </div>
                </div>
             </div>

             <button className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-orange-100 active:scale-95 mb-4">
                Confirm & Pay Deposit
             </button>
             <p className="text-center text-xs text-gray-400">
                You will only be charged ₹500 today to confirm the booking. Rest of the dakshina can be paid directly to Pandit Ji.
             </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
