import { ShieldCheck, Upload, CheckCircle2 } from "lucide-react";

export default function VerificationPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <ShieldCheck className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 tracking-tight">Pandit Verification</h1>
          <p className="mt-2 text-lg text-gray-600">Complete your profile to start receiving bookings.</p>
        </div>

        <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
          <div className="px-8 py-10">
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold">1</div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">Personal Details</h3>
                  <p className="text-gray-500 mb-4">Provide your legal name and contact info.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name" className="p-3 border border-gray-200 rounded-xl focus:ring-primary focus:border-primary outline-none" />
                    <input type="text" placeholder="Phone Number" className="p-3 border border-gray-200 rounded-xl focus:ring-primary focus:border-primary outline-none" />
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold">2</div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">Aadhaar Verification</h3>
                  <p className="text-gray-500 mb-4">Upload a clear photo of your Aadhaar card for trust.</p>
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-primary transition-colors cursor-pointer bg-gray-50">
                    <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                    <span className="block text-sm font-medium text-gray-600">Click to upload or drag and drop</span>
                    <span className="block text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold">3</div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">Specializations</h3>
                  <p className="text-gray-500 mb-4">Select the services you are expert in.</p>
                  <div className="flex flex-wrap gap-2">
                    {['Marriage', 'Puja', 'Katha', 'Astrology', 'Vastu', 'Remedies'].map((spec) => (
                      <button key={spec} className="px-4 py-2 border border-gray-200 rounded-full text-sm font-medium hover:bg-orange-50 hover:border-primary hover:text-primary transition-all">
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <button className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-orange-200 hover:bg-orange-600 transition-all flex items-center justify-center">
                Submit for Verification <CheckCircle2 className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
