import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Star, ShieldCheck, CalendarCheck, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-primary/5">
          {/* Spiritual Pattern Placeholder */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #FF6B00 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Book a Pandit in <br />
            <span className="text-primary italic">Just 3 Clicks</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Experience peace with our hand-picked, background-verified Pandits for all your spiritual and Vedic rituals.
          </p>
          
          {/* Search Box */}
          <div className="bg-white p-2 rounded-3xl shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-2 border border-orange-100">
            <div className="flex-1 flex items-center px-6 border-b md:border-b-0 md:border-r border-gray-100 py-2">
              <MapPin className="text-primary mr-3" size={24} />
              <input 
                type="text" 
                placeholder="Where? (e.g. Varanasi)" 
                className="w-full py-4 focus:outline-none text-gray-800 font-bold text-lg"
              />
            </div>
            <div className="flex-[1.5] flex items-center px-6 py-2">
              <Search className="text-gray-400 mr-3" size={24} />
              <input 
                type="text" 
                placeholder="What service? (e.g. Griha Pravesh)" 
                className="w-full py-4 focus:outline-none text-gray-800 text-lg"
              />
            </div>
            <Link href="/search" className="bg-primary hover:bg-orange-600 px-12 py-5 rounded-2xl font-bold text-white transition-all shadow-xl shadow-orange-100 flex items-center justify-center">
              Find Pandit
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Spiritual Services</h2>
              <p className="text-gray-600">Choose from a wide range of Vedic rituals and ceremonies</p>
            </div>
            <button className="text-primary font-bold hover:underline">View All Services</button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Griha Pravesh", icon: "🏠", color: "bg-orange-50" },
              { name: "Satyanarayan Katha", icon: "📖", color: "bg-amber-50" },
              { name: "Rudrabhishek", icon: "🕉️", color: "bg-red-50" },
              { name: "Marriage Ceremony", icon: "💑", color: "bg-pink-50" },
              { name: "Navgraha Puja", icon: "✨", color: "bg-blue-50" },
              { name: "Mundan Sanskar", icon: "👶", color: "bg-green-50" },
              { name: "Astrology Consultation", icon: "🔮", color: "bg-purple-50" },
              { name: "Vastu Shanti", icon: "📐", color: "bg-yellow-50" },
            ].map((service, i) => (
              <div key={i} className={`${service.color} p-8 rounded-3xl text-center border border-transparent hover:border-accent transition-all cursor-pointer group shadow-sm hover:shadow-md`}>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="font-bold text-gray-800">{service.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-around gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="text-primary" size={40} />
              <span className="font-bold text-gray-800">Verified Pandits</span>
              <span className="text-sm text-gray-500">Rigorous background checks</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CalendarCheck className="text-primary" size={40} />
              <span className="font-bold text-gray-800">Instant Booking</span>
              <span className="text-sm text-gray-500">Confirm seat in 3 clicks</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Users className="text-primary" size={40} />
              <span className="font-bold text-gray-800">10,000+ Bookings</span>
              <span className="text-sm text-gray-500">Trusted by families across India</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Star className="text-primary" size={40} />
              <span className="font-bold text-gray-800">Transparent Pricing</span>
              <span className="text-sm text-gray-500">No hidden dakshina costs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pandits */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Top Rated Pandits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
                <div className="h-48 bg-gray-200 relative">
                   <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-primary shadow-sm flex items-center">
                      <Star size={14} className="mr-1 fill-primary" /> 4.9
                   </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Pandit Ramesh Shastri</h3>
                  <p className="text-sm text-gray-500 mb-4">Vedic Specialist | 15+ Yrs Exp</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">Hindi</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">Sanskrit</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">Bhojpuri</span>
                  </div>
                  <button className="w-full bg-orange-50 text-primary font-bold py-3 rounded-xl hover:bg-primary hover:text-white transition-all">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">BookPanditJi</h2>
              <p className="text-gray-400 leading-relaxed">
                India's premier spiritual marketplace connecting you with verified Pandits and Astrologers for all your religious needs.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Find a Pandit</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Special Services</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Astrology</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Become a Pandit</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Our Cities</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Varanasi</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Haridwar</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Prayagraj</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Delhi NCR</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Contact Us</h4>
              <p className="text-gray-400 mb-4">Support: support@bookpanditji.in</p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary cursor-pointer transition-all">FB</div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary cursor-pointer transition-all">IG</div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary cursor-pointer transition-all">TW</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            © 2024 BookPanditJi Technologies Pvt Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
