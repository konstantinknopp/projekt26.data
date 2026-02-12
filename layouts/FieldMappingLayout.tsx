import { useState } from 'react';
import { ArrowRight, Check, Trash2, Plus, X } from 'lucide-react';

export default function FieldMappingLayout() {
  const [showNewFieldForm, setShowNewFieldForm] = useState(false);

  // Dummy data for layout
  const sourceFields = [
    { name: 'id', type: 'integer' },
    { name: 'name', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'created_at', type: 'datetime' },
    { name: 'status', type: 'string' },
    { name: 'phone', type: 'string' },
    { name: 'address', type: 'string' },
  ];

  const targetFields = [
    { name: 'user_id', type: 'integer' },
    { name: 'full_name', type: 'string' },
    { name: 'email_address', type: 'string' },
    { name: 'registration_date', type: 'datetime' },
    { name: 'account_status', type: 'string' },
  ];

  // Example mapped fields (for layout demo)
  const mappedFields = [
    { source: 'id', target: 'user_id', sourceType: 'integer', targetType: 'integer' },
    { source: 'name', target: 'full_name', sourceType: 'string', targetType: 'string' },
    { source: 'email', target: 'email_address', sourceType: 'string', targetType: 'string' },
  ];

  const usedSourceFields = mappedFields.map(m => m.source);
  const usedTargetFields = mappedFields.map(m => m.target);

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
      `}</style>

      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Feld-Mapping</h1>
          <p className="text-sm text-gray-600">
            Ordne die Quellfelder den Zielfeldern zu oder erstelle neue Zielfelder
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border-2 border-black p-4">
            <div className="text-2xl font-bold text-black">{sourceFields.length}</div>
            <div className="text-xs uppercase tracking-wider text-gray-500 font-bold">Quellfelder</div>
          </div>
          <div className="bg-white border-2 border-black p-4">
            <div className="text-2xl font-bold text-black">{targetFields.length}</div>
            <div className="text-xs uppercase tracking-wider text-gray-500 font-bold">Zielfelder</div>
          </div>
          <div className="bg-black p-4">
            <div className="text-2xl font-bold text-white">{mappedFields.length}</div>
            <div className="text-xs uppercase tracking-wider text-gray-400 font-bold">Zugeordnet</div>
          </div>
        </div>

        {/* Main Layout: 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-8">
          {/* Left: Source and Target Fields Side by Side */}
          <div>
            <div className="bg-gray-50 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
              <h2 className="text-xl font-bold text-black mb-6">Verfügbare Felder</h2>

              <div className="grid grid-cols-2 gap-6">
                {/* Source Fields Column */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-600">
                      Quellfelder
                    </h3>
                    <span className="text-xs text-gray-500 mono">
                      {sourceFields.length - usedSourceFields.length} verfügbar
                    </span>
                  </div>

                  <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                    {sourceFields.map((field, idx) => (
                      <div
                        key={idx}
                        className={`p-3 border-2 transition-all cursor-pointer ${
                          usedSourceFields.includes(field.name)
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 bg-white text-black hover:border-black hover:translate-x-1'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="mono text-sm font-bold">{field.name}</span>
                          {usedSourceFields.includes(field.name) && (
                            <Check size={14} className="text-white" strokeWidth={3} />
                          )}
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">
                          {field.type}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Target Fields Column */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-600">
                      Zielfelder
                    </h3>
                    <button
                      onClick={() => setShowNewFieldForm(!showNewFieldForm)}
                      className="px-3 py-1 border-2 border-black bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all flex items-center gap-1"
                    >
                      <Plus size={12} />
                      Neu
                    </button>
                  </div>

                  {/* New Field Form */}
                  {showNewFieldForm && (
                    <div className="mb-4 p-4 border-2 border-black bg-yellow-50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-black">
                          Neues Feld erstellen
                        </h4>
                        <button
                          onClick={() => setShowNewFieldForm(false)}
                          className="text-gray-600 hover:text-black"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Feldname"
                          className="w-full px-3 py-2 border-2 border-black bg-white text-black placeholder-gray-400 text-sm mono focus:outline-none"
                        />
                        <select className="w-full px-3 py-2 border-2 border-black bg-white text-black text-sm focus:outline-none">
                          <option value="">Typ auswählen</option>
                          <option value="string">String</option>
                          <option value="integer">Integer</option>
                          <option value="datetime">DateTime</option>
                          <option value="boolean">Boolean</option>
                          <option value="decimal">Decimal</option>
                        </select>
                        <button className="w-full px-3 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-all">
                          Feld hinzufügen
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                    {targetFields.map((field, idx) => (
                      <div
                        key={idx}
                        className={`p-3 border-2 transition-all cursor-pointer ${
                          usedTargetFields.includes(field.name)
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 bg-white text-black hover:border-black hover:-translate-x-1'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="mono text-sm font-bold">{field.name}</span>
                          {usedTargetFields.includes(field.name) && (
                            <Check size={14} className="text-white" strokeWidth={3} />
                          )}
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">
                          {field.type}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 border-2 border-gray-300 bg-gray-50">
              <h3 className="text-xs font-bold uppercase tracking-wider text-black mb-2">
                Anleitung
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Klicke auf ein Quellfeld und dann auf ein Zielfeld um eine Zuordnung zu erstellen</li>
                <li>• Nutze den "Neu"-Button um ein neues Zielfeld anzulegen</li>
                <li>• Bereits zugeordnete Felder sind schwarz markiert</li>
              </ul>
            </div>
          </div>

          {/* Right: Assigned Mappings Panel */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              {/* Header */}
              <div className="p-6 border-b-2 border-black bg-black">
                <h2 className="text-xl font-bold text-white">Zugeordnete Felder</h2>
                <p className="text-sm text-gray-400 mt-1">
                  {mappedFields.length} {mappedFields.length === 1 ? 'Zuordnung' : 'Zuordnungen'}
                </p>
              </div>

              {/* Mappings List */}
              <div className="p-6 max-h-[700px] overflow-y-auto">
                {mappedFields.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <div className="text-4xl mb-4">→</div>
                    <p className="text-sm">Noch keine Zuordnungen</p>
                    <p className="text-xs mt-2">Wähle Felder aus um zu beginnen</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {mappedFields.map((mapping, idx) => (
                      <div
                        key={idx}
                        className="group border-2 border-gray-300 bg-white hover:border-black transition-all"
                      >
                        {/* Mapping Header */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                              Zuordnung #{idx + 1}
                            </span>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 border-2 border-black bg-black text-white hover:bg-white hover:text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                              <Trash2 size={12} />
                              Löschen
                            </button>
                          </div>

                          {/* Source Field */}
                          <div className="mb-2">
                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                              Quelle
                            </div>
                            <div className="px-3 py-2 bg-gray-100 border border-gray-300">
                              <div className="mono text-sm font-bold text-black">
                                {mapping.source}
                              </div>
                              <div className="text-xs text-gray-500 uppercase tracking-wider">
                                {mapping.sourceType}
                              </div>
                            </div>
                          </div>

                          {/* Arrow */}
                          <div className="flex justify-center my-2">
                            <ArrowRight size={20} className="text-black" strokeWidth={2.5} />
                          </div>

                          {/* Target Field */}
                          <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                              Ziel
                            </div>
                            <div className="px-3 py-2 bg-black border-2 border-black">
                              <div className="mono text-sm font-bold text-white">
                                {mapping.target}
                              </div>
                              <div className="text-xs text-gray-400 uppercase tracking-wider">
                                {mapping.targetType}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Type Compatibility Check */}
                        <div className="px-4 pb-4">
                          {mapping.sourceType === mapping.targetType ? (
                            <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 px-3 py-2 border border-green-300">
                              <Check size={12} strokeWidth={3} />
                              <span className="font-bold uppercase tracking-wider">Typen kompatibel</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-xs text-yellow-700 bg-yellow-50 px-3 py-2 border border-yellow-300">
                              <span className="font-bold">⚠</span>
                              <span className="font-bold uppercase tracking-wider">Typkonvertierung erforderlich</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              {mappedFields.length > 0 && (
                <div className="p-4 border-t-2 border-gray-200 bg-gray-50">
                  <button className="w-full px-4 py-3 border-2 border-black bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2">
                    <Trash2 size={16} />
                    Alle Zuordnungen löschen
                  </button>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="p-3 border-2 border-gray-300 bg-white">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Nicht zugeordnet
                </div>
                <div className="text-2xl font-bold text-black">
                  {sourceFields.length - usedSourceFields.length}
                </div>
              </div>
              <div className="p-3 border-2 border-gray-300 bg-white">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Fortschritt
                </div>
                <div className="text-2xl font-bold text-black">
                  {Math.round((mappedFields.length / sourceFields.length) * 100)}%
                </div>
              </div>
            </div>

            {/* Auto-Map Suggestion */}
            <div className="mt-6 p-4 border-2 border-black bg-white">
              <h3 className="text-sm font-bold text-black mb-2">Automatische Zuordnung</h3>
              <p className="text-xs text-gray-600 mb-3">
                Felder mit ähnlichen Namen automatisch zuordnen?
              </p>
              <button className="w-full px-4 py-3 bg-black text-white font-bold text-sm uppercase tracking-wider hover:bg-gray-800 transition-all">
                Auto-Mapping starten
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
