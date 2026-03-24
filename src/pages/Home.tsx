import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Plane, MapPin, Calendar, Wallet, ArrowRight } from "lucide-react";

const CITIES = ["Hyderabad", "Chennai", "Bangalore", "Tirupati", "Goa", "Mumbai", "Delhi", "Kolkata", "Jaipur", "Agra"];
const BUDGETS = ["Low", "Medium", "High"];

export default function Home() {
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState("Medium");
  const [loading, setLoading] = useState(false);

  const handlePlanTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!source || !destination || !days || !budget) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/plan-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source, destination, days, budget }),
      });
      const data = await res.json();
      navigate("/dashboard", { state: { plan: data, params: { source, destination, days, budget } } });
    } catch (error) {
      console.error("Failed to plan trip", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden flex flex-col items-center justify-between">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950"></div>
        
        {/* Glowing Stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Rotating Globe (CSS Animation) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] opacity-15 pointer-events-none z-0">
        <motion.div
          className="relative w-full h-full rounded-full border-[1px] border-indigo-500/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {/* Latitude lines */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-indigo-500/20 -translate-y-1/2"></div>
          <div className="absolute top-1/4 left-[10%] w-[80%] h-[1px] bg-indigo-500/20 -translate-y-1/2 rounded-[100%]"></div>
          <div className="absolute bottom-1/4 left-[10%] w-[80%] h-[1px] bg-indigo-500/20 translate-y-1/2 rounded-[100%]"></div>
          
          {/* Longitude lines */}
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-indigo-500/20 -translate-x-1/2"></div>
          <div className="absolute top-0 left-1/2 w-[50%] h-full border-[1px] border-indigo-500/20 rounded-[100%] -translate-x-1/2"></div>
          
          {/* Orbiting dots */}
          <div className="absolute top-0 left-1/2 w-4 h-4 bg-indigo-500 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.8)] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)] -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-0 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.8)] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 right-0 w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.8)] translate-x-1/2 -translate-y-1/2"></div>
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh] pt-20 pb-10">
        {/* Left Column: Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            India Edition
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            AI Smart <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Travel Planner
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-lg leading-relaxed">
            Plan your trip with budget, weather, and smart insights. Experience a curated journey powered by AI.
          </p>

          {/* Moving Arrow Animation */}
          <motion.div
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden lg:flex items-center gap-4 text-indigo-400 font-medium"
          >
            Start Planning <ArrowRight className="w-5 h-5" />
          </motion.div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl"
        >
          <form onSubmit={handlePlanTrip} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Source */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-400" /> Source City
                </label>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                  required
                >
                  <option value="" disabled>Select Source</option>
                  {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
              </div>

              {/* Destination */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" /> Destination City
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all appearance-none"
                  required
                >
                  <option value="" disabled>Select Destination</option>
                  {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Days */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" /> Number of Days
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-emerald-400" /> Budget Type
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none"
                  required
                >
                  {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold text-lg shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Plan Trip <Plane className="w-5 h-5" /></>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Footer / Extra Info */}
      <div className="relative z-10 w-full bg-slate-950/80 border-t border-slate-800/50 backdrop-blur-md py-12 px-6 mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-400 text-sm">
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">🍽️ What We Offer</h3>
            <ul className="space-y-2">
              <li>✔ Smart Budget Planning 💰</li>
              <li>✔ Real-Time Weather Updates 🌦️</li>
              <li>✔ Nearby Attractions & Hidden Gems 📍</li>
              <li>✔ Personalized Food Recommendations 🍔</li>
              <li>✔ Transport Comparison 🚆✈️🚌</li>
              <li>✔ Day-wise Travel Itinerary 📅</li>
              <li>✔ Interactive Charts & Insights 📊</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">🚀 Why Choose Us?</h3>
            <ul className="space-y-2">
              <li>⭐ AI-powered intelligent recommendations</li>
              <li>⭐ Smooth, modern, and animated UI</li>
              <li>⭐ Fast, accurate, and reliable planning</li>
              <li>⭐ All travel essentials in one platform</li>
            </ul>
            <div className="mt-6">
              <h4 className="text-white font-medium mb-2">✨ Sample Plan</h4>
              <a href="https://www.buildai.space/app/trip-planner-ai/item/1-day-goa-cultural-historical-trip" target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 underline block mb-2">
                1-Day Goa Itinerary
              </a>
              <a href="https://share.google/6P2yxlBn9G7qGCVd9" target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 underline block">
                Book Train Tickets (IRCTC)
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">📞 Need Help?</h3>
            <p className="mb-2">We're Here for You</p>
            <p className="font-medium text-slate-300 mb-1">Helpline Numbers:</p>
            <p className="text-indigo-400">+91 7671000584</p>
            <p className="text-indigo-400 mb-4">+91 7675888451</p>
            <p className="font-medium text-slate-300 mb-1">Support Available For:</p>
            <ul className="space-y-1">
              <li>• Trip planning assistance</li>
              <li>• Ticket booking guidance</li>
              <li>• General travel queries</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-800/50 text-center text-slate-500">
          <p>🌟 Start Your Journey Today! Explore India smarter with AI and make every trip unforgettable.</p>
        </div>
      </div>
    </div>
  );
}
