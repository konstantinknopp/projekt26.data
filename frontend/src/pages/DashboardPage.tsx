import { useMigrations, useQueueStats } from '../lib/hooks';
import { Database, TrendingUp, Activity, Clock } from 'lucide-react';

export default function DashboardPage() {
  const { data: migrations, isLoading } = useMigrations();
  const { data: queueStats } = useQueueStats();

  const stats = [
    { 
      label: 'Total Migrations', 
      value: migrations?.length || 0, 
      icon: Database 
    },
    { 
      label: 'Success Rate', 
      value: migrations 
        ? `${((migrations.filter(m => m.status === 'completed').length / migrations.length) * 100).toFixed(1)}%`
        : '0%',
      icon: TrendingUp 
    },
    { 
      label: 'Active Jobs', 
      value: queueStats?.active || 0, 
      icon: Activity 
    },
    { 
      label: 'Queue Waiting', 
      value: queueStats?.waiting || 0, 
      icon: Clock 
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-black flex items-center justify-center">
                    <Icon size={20} className="text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-black mb-1">{stat.value}</h3>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Recent Migrations */}
        <div className="bg-gray-50 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
          <h2 className="text-2xl font-bold text-black mb-6">Recent Migrations</h2>
          
          <div className="space-y-3">
            {migrations?.slice(0, 5).map((migration) => (
              <div
                key={migration.id}
                className="bg-white border-2 border-gray-300 p-4 hover:border-black transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm text-black mono">{migration.name}</h3>
                  <span
                    className={`text-xs font-bold px-2 py-1 border-2 ${
                      migration.status === 'completed'
                        ? 'border-black bg-black text-white'
                        : migration.status === 'running'
                        ? 'border-black bg-white text-black'
                        : 'border-black bg-black text-white'
                    }`}
                  >
                    {migration.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span className="mono">
                    {new Date(migration.createdAt).toLocaleString('de-DE')}
                  </span>
                  <span className="font-medium">
                    {migration.recordsProcessed} / {migration.recordsTotal} records
                  </span>
                </div>
                {migration.status === 'running' && (
                  <div className="mt-3">
                    <div className="h-2 bg-gray-200 border border-black">
                      <div
                        className="h-full bg-black"
                        style={{
                          width: `${
                            migration.recordsTotal > 0
                              ? (migration.recordsProcessed / migration.recordsTotal) * 100
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {!migrations || migrations.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No migrations yet. Create your first migration!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
