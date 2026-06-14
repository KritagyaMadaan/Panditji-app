import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, Star, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Search Bar Secondary */}
      <div className="bg-white border-b border-gray-100 sticky top-20 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full bg-gray-100 rounded-full flex items-center px-6 py-3 border border-transparent focus-within:border-primary focus-within:bg-white transition-all">
            <Search size={20} className="text-gray-400 mr-3" />
            <input 
              type="text" 
              defaultValue="Griha Pravesh"
              className="bg-transparent focus:outline-none w-full font-medium"
            />
          </div>
          <div className="flex-1 w-full bg-gray-100 rounded-full flex items-center px-6 py-3 border border-transparent focus-within:border-primary focus-within:bg-white transition-all">
            <MapPin size={20} className="text-primary mr-3" />
            <input 
              type="text" 
              defaultValue="Varanasi, Uttar Pradesh"
              className="bg-transparent focus:outline-none w-full font-medium"
            />
          </div>
          <button className="bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-orange-600 transition-all shadow-lg shadow-orange-100">
            Search
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-80 space-y-8 hidden lg:block">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Filter size={20} /> Filters
            </h3>
            
            <div className="space-y-6">
              {/* Category */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="font-bold mb-4 flex justify-between items-center text-gray-800">
                  Category <ChevronDown size={16} />
                </h4>
                <div className="space-y-3">
                  {['Puja', 'Wedding', 'Astrology', 'Remedy'].map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-5 h-5 accent-primary rounded-md" />
                      <span className="text-gray-600 group-hover:text-primary transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="font-bold mb-4 flex justify-between items-center text-gray-800">
                   Languages <ChevronDown size={16} />
                </h4>
                <div className="space-y-3">
                  {['Hindi', 'Sanskrit', 'English', 'Bhojpuri', 'Bengali'].map(lang => (
                    <label key={lang} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-5 h-5 accent-primary rounded-md" />
                      <span className="text-gray-600 group-hover:text-primary transition-colors">{lang}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="font-bold mb-4 text-gray-800">Experience</h4>
                <input type="range" className="w-full accent-primary" min="0" max="30" />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>Any</span>
                  <span>30+ Years</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Results Section */}
        <section className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              12 Pandits found in <span className="text-primary italic">Varanasi</span>
            </h2>
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 text-gray-600 font-medium hover:border-primary transition-all">
              <SlidersHorizontal size={18} /> Sort: Popularity
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-xl hover:border-accent/20 transition-all flex flex-col md:flex-row gap-8 group">
                {/* Photo */}
                <div className="w-full md:w-64 h-64 relative rounded-3xl overflow-hidden bg-gray-100 shrink-0">
                   <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1 shadow-sm">
                      <ShieldCheckIcon size={14} /> Verified
                   </div>
                   <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500">
                      <Image 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Pandit${i}`}
                        alt="Pandit Photo"
                        fill
                        sizes="(max-width: 768px) 100vw, 256px"
                        className="object-cover"
                      />
                   </div>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">Pandit Rajesh Dwivedi</h3>
                      <p className="text-gray-500 font-medium flex items-center gap-2">
                         <span className="flex items-center gap-1"><Star size={16} className="fill-accent text-accent" /> 4.9</span>
                         <span className="w-1 h-1 bg-gray-300 rounded-full" />
                         <span>12+ Years Experience</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Starts from</p>
                      <p className="text-3xl font-bold text-gray-900">₹2,100</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mt-4 line-clamp-2">
                    Specialized in Vedic Griha Pravesh, Satyanarayan Katha, and Rudrabhishek. Learned from Sampurnanand Sanskrit Vishwavidyalaya.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-6">
                     {['Griha Pravesh', 'Marriage', 'Katha', 'Sudhikaran'].map(tag => (
                       <span key={tag} className="bg-orange-50 text-primary text-xs font-bold px-3 py-1 rounded-full border border-orange-100">
                         {tag}
                       </span>
                     ))}
                  </div>

                  <div className="mt-auto pt-8 flex gap-4">
                    <button className="flex-1 bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-orange-50 active:scale-95">
                      Book Now
                    </button>
                    <button className="flex-1 border-2 border-primary text-primary font-bold py-4 rounded-2xl hover:bg-orange-50 transition-all active:scale-95">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ShieldCheckIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
