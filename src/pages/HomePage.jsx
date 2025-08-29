import React from "react";
import { Wrench, FileText, Car, Settings, ArrowRight } from "lucide-react";

const HomePage = () => {
  const handleGenerateInvoice = () => {
    // In a real app, this would use React Router
    window.location.href = "/invoice";
  };

  const colors = {
    primary: "#FFC900",
    secondary: "#EA2F14",
    dark: "#343a40",
    light: "#fff",
    tertiary: "#73777B",
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.dark }}>
      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                }}
              >
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.secondary }}
              >
                <Settings className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ color: colors.light }}
              >
                Ruiru Auto Garage
              </h1>
              <p className="text-sm" style={{ color: colors.tertiary }}>
                Ride with Pride
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
            <div
              className="absolute top-20 left-10 w-20 h-20 rounded-full blur-xl opacity-20"
              style={{ backgroundColor: colors.primary }}
            ></div>
            <div
              className="absolute top-40 right-20 w-32 h-32 rounded-full blur-xl opacity-20"
              style={{ backgroundColor: colors.secondary }}
            ></div>
            <div
              className="absolute bottom-40 left-1/4 w-24 h-24 rounded-full blur-xl opacity-20"
              style={{ backgroundColor: colors.primary }}
            ></div>
          </div>

          {/* Main Content */}
          <div className="relative">
            {/* Logo */}
            <div className="mb-8">
              <div
                className="inline-flex items-center justify-center w-32 h-32 rounded-3xl shadow-2xl mb-8 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                }}
              >
                <Car className="w-16 h-16 text-white relative z-10" />
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${colors.light} 0%, transparent 50%)`,
                  }}
                ></div>
              </div>

              <h2
                className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
                style={{ color: colors.light }}
              >
                Welcome to
                <span
                  className="block font-extrabold"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Ruiru Auto Garage
                </span>
              </h2>

              <div className="mb-6">
                <p
                  className="text-2xl md:text-3xl font-semibold mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  "Ride with Pride"
                </p>
              </div>

              <p
                className="text-xl max-w-2xl mx-auto leading-relaxed"
                style={{ color: colors.tertiary }}
              >
                Your trusted partner for professional automotive services,
                repairs, and maintenance in Ruiru. Quality service you can rely
                on.
              </p>
            </div>

            {/* CTA Button */}
            <div className="relative mt-12">
              <button
                onClick={handleGenerateInvoice}
                className="group relative inline-flex items-center px-10 py-5 text-white font-semibold text-xl rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`;
                }}
              >
                <FileText className="w-6 h-6 mr-4" />
                Generate Invoice
                <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Button glow effect */}
              <div
                className="absolute inset-0 rounded-2xl blur-xl opacity-30 -z-10"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                }}
              ></div>
            </div>

            <p className="mt-8 text-lg" style={{ color: colors.tertiary }}>
              Click above to create professional invoices for your automotive
              services
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 mt-20 px-6 py-8 border-t border-opacity-20"
        style={{ borderColor: colors.tertiary }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              }}
            >
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold" style={{ color: colors.light }}>
              Ruiru Auto Garage
            </span>
          </div>
          <p className="text-sm" style={{ color: colors.tertiary }}>
            © 2024 Ruiru Auto Garage • Professional automotive services in
            Ruiru, Kiambu County • Ride with Pride
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
