import React from "react";
import { Wrench, FileText, Car, Settings, ArrowRight } from "lucide-react";

const HomePage = () => {
  const handleGenerateInvoice = () => {
    // In a real app, this would use React Router
    window.location.href = "/invoice";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <Settings className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Ruiru Auto Garage
              </h1>
              <p className="text-slate-400 text-sm">
                Professional Auto Services
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-20 h-20 bg-orange-500/10 rounded-full blur-xl"></div>
            <div className="absolute top-40 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-red-500/10 rounded-full blur-xl"></div>
          </div>

          {/* Main Content */}
          <div className="relative">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-2xl mb-6">
                <Car className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                Welcome to
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  Ruiru Auto Garage
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Your trusted partner for professional automotive services,
                repairs, and maintenance in Ruiru. Quality service you can rely
                on.
              </p>
            </div>

            {/* Service Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <Wrench className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">
                  Expert Repairs
                </h3>
                <p className="text-slate-400 text-sm">
                  Professional automotive repair services
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <Settings className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Maintenance</h3>
                <p className="text-slate-400 text-sm">
                  Regular maintenance and tune-ups
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <FileText className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Easy Billing</h3>
                <p className="text-slate-400 text-sm">
                  Quick and professional invoicing
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="relative">
              <button
                onClick={handleGenerateInvoice}
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out"
              >
                <FileText className="w-5 h-5 mr-3" />
                Generate Invoice
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </button>

              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl blur-xl opacity-25 -z-20"></div>
            </div>

            <p className="text-slate-400 mt-6 text-sm">
              Click above to create professional invoices for your automotive
              services
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 px-6 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400 text-sm">
            © 2025 Ruiru Auto Garage. Professional automotive services in Ruiru,
            Kiambu County.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
