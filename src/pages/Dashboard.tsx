import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ArrowLeft, CloudSun, MapPin, Utensils, Train, Plane, Bus, CalendarDays, Wallet, Share2, Save } from "lucide-react";

// Animated Counter Component
const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const increment = end / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>₹{count.toLocaleString("en-IN")}</span>;
};

const COLORS = ["#6366f1", "#a855f7", "#ec4899", "#14b8a6"];

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.plan;
  const params = location.state?.params;

  if (!data || !params) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">No Trip Data Found</h2>
          <button onClick={() => navigate("/")} className="px-6 py-2 bg-indigo-500 rounded-full hover:bg-indigo-600 transition">
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const { budget, weather, places, food, transport, itinerary, tips } = data;
  const cheapestTransport = transport.reduce((prev: any, curr: any) => (prev.cost < curr.cost ? prev : curr));

  const handleSave = async () => {
    try {
      await fetch("/api/save-trip", { method: "POST" });
      alert("Trip saved successfully! (Mock)");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12"
      >
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/")} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              {params.source} <Plane className="w-5 h-5 text-indigo-400" /> {params.destination}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {params.days} Days • {params.budget} Budget
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors text-sm font-medium">
            <Save className="w-4 h-4" /> Save
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all text-sm font-medium text-white">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Top Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Budget Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
              <div className="flex items-center gap-3 mb-4 text-indigo-400">
                <Wallet className="w-5 h-5" />
                <h3 className="font-semibold uppercase tracking-wider text-xs">Estimated Budget</h3>
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter value={budget.total} />
              </div>
              <p className="text-sm text-slate-400">Total cost for {params.days} days</p>
            </motion.div>

            {/* Weather Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-cyan-900/20 to-slate-900/50 border border-slate-800 p-6 rounded-3xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 text-cyan-400">
                  <CloudSun className="w-5 h-5" />
                  <h3 className="font-semibold uppercase tracking-wider text-xs">Current Weather</h3>
                </div>
                <span className="text-3xl font-light text-white">{weather.temp}°C</span>
              </div>
              <p className="text-lg font-medium text-slate-200 mb-1">{weather.condition}</p>
              <p className="text-sm text-slate-400 line-clamp-2">{weather.recommendation}</p>
            </motion.div>
          </div>

          {/* Charts Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl"
          >
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-400" /> Expense Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-72">
              {/* Pie Chart */}
              <div className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budget.breakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {budget.breakdown.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px" }}
                      itemStyle={{ color: "#e2e8f0" }}
                      formatter={(value: number) => `₹${value.toLocaleString()}`}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Bar Chart */}
              <div className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={budget.dailyExpenses} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="day" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                    <Tooltip
                      cursor={{ fill: "#1e293b" }}
                      contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px" }}
                      formatter={(value: number) => `₹${value.toLocaleString()}`}
                    />
                    <Bar dataKey="cost" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.section>

          {/* Itinerary Timeline */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl"
          >
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-emerald-400" /> Day-wise Itinerary
            </h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
              {itinerary.map((day: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  {/* Timeline dot */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-950 bg-emerald-500 text-slate-950 font-bold text-sm shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    {day.day}
                  </div>
                  
                  {/* Content Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 hover:border-emerald-500/30 transition-colors">
                    <h4 className="font-bold text-white mb-2">{day.title}</h4>
                    <ul className="space-y-2">
                      {day.activities.map((act: string, i: number) => (
                        <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mt-1.5 shrink-0" />
                          {act}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Transport */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Train className="w-5 h-5 text-blue-400" /> Transport Options
            </h3>
            <div className="space-y-3">
              {transport.map((t: any, i: number) => {
                const isCheapest = t.mode === cheapestTransport.mode;
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-4 rounded-2xl border ${
                      isCheapest ? "bg-blue-500/10 border-blue-500/30" : "bg-slate-800/30 border-slate-700/50"
                    } hover:bg-slate-800/50 transition-colors`}
                  >
                    <div className="flex items-center gap-3">
                      {t.mode === "Flight" ? <Plane className="w-5 h-5 text-slate-400" /> :
                       t.mode === "Train" ? <Train className="w-5 h-5 text-slate-400" /> :
                       <Bus className="w-5 h-5 text-slate-400" />}
                      <div>
                        <p className="font-medium text-white">{t.mode}</p>
                        <p className="text-xs text-slate-400">{t.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">₹{t.cost.toLocaleString()}</p>
                      {isCheapest && <span className="text-[10px] uppercase tracking-wider text-blue-400 font-semibold">Cheapest</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* Nearby Places */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-pink-400" /> Must Visit Places
            </h3>
            <div className="space-y-4">
              {places.map((place: any, i: number) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[2/1] cursor-pointer">
                  <img src={place.image} alt={place.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <span className="text-[10px] uppercase tracking-wider text-pink-400 font-semibold mb-1 block">{place.category}</span>
                    <h4 className="font-bold text-white text-lg leading-tight">{place.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Food */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-orange-400" /> Food Suggestions
            </h3>
            <div className="space-y-3">
              {food.map((f: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-orange-500/30 transition-colors">
                  <div>
                    <p className="font-medium text-white text-sm">{f.name}</p>
                    <span className={`text-[10px] uppercase tracking-wider font-semibold ${f.type === "Veg" ? "text-green-400" : "text-red-400"}`}>
                      {f.type}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-slate-300">~₹{f.price}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* AI Tips */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 p-6 rounded-3xl"
          >
            <h3 className="text-sm font-semibold text-indigo-300 mb-3 uppercase tracking-wider flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              AI Insights
            </h3>
            <ul className="space-y-3">
              {tips.map((tip: string, i: number) => (
                <li key={i} className="text-sm text-indigo-100/80 leading-relaxed">
                  • {tip}
                </li>
              ))}
            </ul>
          </motion.section>

        </div>
      </main>
    </div>
  );
}
