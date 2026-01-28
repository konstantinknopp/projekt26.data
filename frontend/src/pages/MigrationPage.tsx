import { useState } from 'react';
import { ArrowRight, Database, Play } from 'lucide-react';
import { useMigrationStore } from '../store/migrationStore';
import { useConnections, useCreateMigration, useStartMigration } from '../lib/hooks';

export default function MigrationPage() {
  const {
    sourceType,
    targetType,
    sourceConnectionId,
    targetConnectionId,
    mappings,
    setSourceType,
    setTargetType,
    setSourceConnectionId,
    setTargetConnectionId,
    addMapping,
    removeMapping,
    clearMappings,
  } = useMigrationStore();

  const [migrationName, setMigrationName] = useState('');
  const [sourceFields] = useState(['id', 'name', 'email', 'created_at', 'status']);
  const [targetFields] = useState(['user_id', 'full_name', 'email_address', 'registration_date', 'account_status']);

  const { data: connections } = useConnections();
  const createMigration = useCreateMigration();
  const startMigration = useStartMigration();

  const getUsedFields = (type: 'source' | 'target') => {
    return mappings.map(m => type === 'source' ? m.source : m.target);
  };

  const handleCreateAndStart = async () => {
    if (!migrationName || !sourceConnectionId || !targetConnectionId || mappings.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // Create migration
      const result = await createMigration.mutateAsync({
        name: migrationName,
        sourceId: sourceConnectionId,
        targetId: targetConnectionId,
        mappings: JSON.stringify(mappings),
        userId: 1, // TODO: Get from auth
      });

      // Start migration
      await startMigration.mutateAsync(result.data.id);
      
      alert('Migration started successfully!');
    } catch (error) {
      console.error('Error creating migration:', error);
      alert('Error creating migration');
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-2">
            Data Migration Tool
          </h1>
          <div className="flex items-center justify-center gap-3 text-gray-400">
            <div className="w-12 h-px bg-black"></div>
            <p className="text-sm uppercase tracking-widest font-medium">
              Source → Mapping → Target
            </p>
            <div className="w-12 h-px bg-black"></div>
          </div>
        </div>

        {/* Migration Name */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Migration Name"
            value={migrationName}
            onChange={(e) => setMigrationName(e.target.value)}
            className="w-full px-4 py-3 border-2 border-black bg-white text-black placeholder-gray-400 font-bold text-lg focus:outline-none focus:ring-0"
          />
        </div>

        {/* Source and Target Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 mb-12 items-center">
          {/* Source Panel */}
          <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-black flex items-center justify-center">
                <Database size={18} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-black">Quelle</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Connection
                </label>
                <select
                  value={sourceConnectionId || ''}
                  onChange={(e) => setSourceConnectionId(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-black bg-white text-black font-medium focus:outline-none"
                >
                  <option value="">Select connection</option>
                  {connections?.map((conn) => (
                    <option key={conn.id} value={conn.id}>
                      {conn.name} ({conn.type})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <ArrowRight size={40} className="text-black" strokeWidth={2.5} />
          </div>

          {/* Target Panel */}
          <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-black flex items-center justify-center">
                <Database size={18} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-black">Ziel</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Connection
                </label>
                <select
                  value={targetConnectionId || ''}
                  onChange={(e) => setTargetConnectionId(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-black bg-white text-black font-medium focus:outline-none"
                >
                  <option value="">Select connection</option>
                  {connections?.map((conn) => (
                    <option key={conn.id} value={conn.id}>
                      {conn.name} ({conn.type})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Field Mapping */}
        <div className="bg-gray-50 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
          <h2 className="text-2xl font-bold text-black mb-6">Feld-Mapping</h2>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                Quellfelder
              </h3>
              <div className="space-y-2">
                {sourceFields.map((field, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const unusedTarget = targetFields.find(
                        (tf) => !getUsedFields('target').includes(tf)
                      );
                      if (unusedTarget && !getUsedFields('source').includes(field)) {
                        addMapping({ source: field, target: unusedTarget });
                      }
                    }}
                    className={`w-full px-4 py-3 border-2 transition-all ${
                      getUsedFields('source').includes(field)
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 bg-white text-black hover:border-black'
                    }`}
                  >
                    <span className="mono text-sm font-medium">{field}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center min-w-[120px]">
              {mappings.length === 0 ? (
                <div className="text-center py-8 text-gray-300 font-medium text-sm">
                  Keine Zuordnungen
                </div>
              ) : (
                <div className="space-y-2">
                  {mappings.map((mapping, idx) => (
                    <button
                      key={idx}
                      onClick={() => removeMapping(idx)}
                      className="w-full px-3 py-2 border-2 border-gray-300 bg-white hover:border-black hover:bg-black transition-all group"
                    >
                      <ArrowRight
                        size={16}
                        className="text-black group-hover:text-white transition-colors mx-auto"
                        strokeWidth={2.5}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                Zielfelder
              </h3>
              <div className="space-y-2">
                {targetFields.map((field, idx) => (
                  <div
                    key={idx}
                    className={`px-4 py-3 border-2 transition-all ${
                      getUsedFields('target').includes(field)
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 bg-white text-black'
                    }`}
                  >
                    <span className="mono text-sm font-medium">{field}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t-2 border-gray-200 flex gap-3 justify-center">
            <button
              onClick={clearMappings}
              className="px-6 py-3 border-2 border-black bg-black text-white font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all"
            >
              Alle löschen
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleCreateAndStart}
            disabled={createMigration.isPending || startMigration.isPending}
            className="px-8 py-4 bg-black text-white font-bold text-base uppercase tracking-wider transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 flex items-center gap-3 disabled:opacity-50"
          >
            <Play size={20} fill="white" />
            Migration starten
          </button>
        </div>
      </div>
    </div>
  );
}
