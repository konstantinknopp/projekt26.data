import React, { useState } from 'react';
import { Database, TrendingUp, Clock, CheckCircle, AlertCircle, ArrowRight, Activity, Calendar, User } from 'lucide-react';

export default function DashboardPage() {
  const [recentMigrations] = useState([
    { id: 1, name: 'Customer DB → Excel Export', status: 'completed', date: '28.01.2026 14:30', records: 15420 },
    { id: 2, name: 'Sales API → PostgreSQL', status: 'running', date: '28.01.2026 15:45', records: 8234 },
    { id: 3, name: 'Legacy CSV → Modern DB', status: 'failed', date: '27.01.2026 09:15', records: 3421 },
    { id: 4, name: 'User Data Migration', status: 'completed', date: '26.01.2026 16:20', records: 24567 },
  ]);

  const stats = [
    { label: 'Gesamt Migrationen', value: '247', icon: Database, trend: '+12%' },
    { label: 'Erfolgsrate', value: '94.3%', icon: TrendingUp, trend: '+2.1%' },
    { label: 'Datensätze heute', value: '45.2K', icon: Activity, trend: '+8.4%' },
    { label: 'Aktive Jobs', value: '3', icon: Clock, trend: '+1' },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * {
          font-family: 'DM Sans', sans-serif;
        }
        
        .mono {
          font-family: 'JetBrains Mono', monospace;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">
              Dashboard
            </h1>
            <div className="flex items-center gap-3 text-gray-400">
              <div className="w-12 h-px bg-black"></div>
              <p className="text-sm uppercase tracking-widest font-medium">
                Übersicht
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} />
              <span className="mono">28.01.2026</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 border-2 border-black bg-white">
              <div className="w-8 h-8 bg-black flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-black">Max Mustermann</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all animate-slide-in"
                style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'backwards' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-black flex items-center justify-center">
                    <Icon size={20} className="text-white" />
                  </div>
                  <span className="text-xs font-bold text-black px-2 py-1 bg-gray-100 border border-gray-300">
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-black mb-1">{stat.value}</h3>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Migrations */}
          <div className="lg:col-span-2 bg-gray-50 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black"></div>
                <h2 className="text-2xl font-bold text-black">Letzte Migrationen</h2>
              </div>
              <button className="px-4 py-2 border-2 border-black bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-all">
                Alle anzeigen
              </button>
            </div>

            <div className="space-y-3">
              {recentMigrations.map((migration) => (
                <div
                  key={migration.id}
                  className="bg-white border-2 border-gray-300 p-4 hover:border-black transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-sm text-black mono">{migration.name}</h3>
                    {migration.status === 'completed' && (
                      <div className="flex items-center gap-1 text-xs font-bold text-black px-2 py-1 bg-white border-2 border-black">
                        <CheckCircle size={12} />
                        ERFOLG
                      </div>
                    )}
                    {migration.status === 'running' && (
                      <div className="flex items-center gap-1 text-xs font-bold text-black px-2 py-1 bg-white border-2 border-black">
                        <Activity size={12} />
                        LÄUFT
                      </div>
                    )}
                    {migration.status === 'failed' && (
                      <div className="flex items-center gap-1 text-xs font-bold text-white px-2 py-1 bg-black border-2 border-black">
                        <AlertCircle size={12} />
                        FEHLER
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span className="mono">{migration.date}</span>
                    <span className="font-medium">{migration.records.toLocaleString('de-DE')} Datensätze</span>
                  </div>
                  {migration.status === 'running' && (
                    <div className="mt-3">
                      <div className="h-2 bg-gray-200 border border-black">
                        <div className="h-full bg-black w-2/3"></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 mono">67% abgeschlossen</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-black"></div>
              <h2 className="text-xl font-bold text-black">Quick Actions</h2>
            </div>

            <div className="space-y-3">
              <button className="w-full px-4 py-4 bg-black text-white font-bold text-sm uppercase tracking-wider transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center justify-between group">
                <span>Neue Migration</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="w-full px-4 py-4 border-2 border-black bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center justify-between group">
                <span>Template laden</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="w-full px-4 py-4 border-2 border-black bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center justify-between group">
                <span>Verbindungen</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="w-full px-4 py-4 border-2 border-black bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center justify-between group">
                <span>Reports</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* System Status */}
            <div className="mt-8 pt-6 border-t-2 border-gray-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
                System Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">API Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <span className="font-bold text-black">ONLINE</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Datenbank</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <span className="font-bold text-black">VERBUNDEN</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Queue</span>
                  <span className="font-bold text-black mono">3 Jobs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Chart Placeholder */}
        <div className="mt-8 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-black"></div>
            <h2 className="text-2xl font-bold text-black">Aktivität (Letzte 7 Tage)</h2>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 45, 80, 55, 90, 70, 85].map((height, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gray-200 border-2 border-black hover:bg-black transition-all group relative">
                  <div 
                    className="bg-black group-hover:bg-white transition-all"
                    style={{ height: `${height * 2.5}px` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 font-bold mono">
                  {['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'][idx]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
