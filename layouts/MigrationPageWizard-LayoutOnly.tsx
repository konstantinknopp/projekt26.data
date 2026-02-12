import { useState } from 'react';
import { ArrowRight, Database, Play, Check, ChevronLeft, ChevronRight, TestTube2 } from 'lucide-react';

type Step = 'source' | 'target' | 'mapping' | 'review';

export default function MigrationPageWizard() {
  const [currentStep, setCurrentStep] = useState<Step>('source');

  const steps: { id: Step; label: string; number: number }[] = [
    { id: 'source', label: 'Quelle', number: 1 },
    { id: 'target', label: 'Ziel', number: 2 },
    { id: 'mapping', label: 'Feld-Mapping', number: 3 },
    { id: 'review', label: 'Überprüfung', number: 4 },
  ];

  const nextStep = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const prevStep = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  // Dummy data for layout demonstration
  const sourceFields = ['id', 'name', 'email', 'created_at', 'status'];
  const targetFields = ['user_id', 'full_name', 'email_address', 'registration_date', 'account_status'];

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

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-2">
            Neue Migration
          </h1>
          <p className="text-sm uppercase tracking-widest text-gray-500">
            Schritt für Schritt einrichten
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200" style={{ zIndex: 0 }}>
              <div 
                className="h-full bg-black transition-all duration-500"
                style={{ 
                  width: `${(steps.findIndex(s => s.id === currentStep) / (steps.length - 1)) * 100}%` 
                }}
              ></div>
            </div>

            {/* Steps */}
            {steps.map((step, idx) => (
              <div key={step.id} className="relative flex flex-col items-center" style={{ zIndex: 1 }}>
                <button
                  onClick={() => {
                    // Allow going back to any step for layout demo
                    setCurrentStep(step.id);
                  }}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold transition-all ${
                    currentStep === step.id
                      ? 'border-black bg-black text-white'
                      : idx < steps.findIndex(s => s.id === currentStep)
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 bg-white text-gray-400'
                  }`}
                >
                  {idx < steps.findIndex(s => s.id === currentStep) ? (
                    <Check size={20} strokeWidth={3} />
                  ) : (
                    step.number
                  )}
                </button>
                <span className={`mt-2 text-xs font-bold uppercase tracking-wider ${
                  currentStep === step.id ? 'text-black' : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-50 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mb-8 min-h-[500px]">
          
          {/* Step 1: Source */}
          {currentStep === 'source' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-black flex items-center justify-center">
                  <Database size={18} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-black">Quelle auswählen</h2>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Quell-Verbindung
                </label>
                <select
                  className="w-full px-4 py-4 border-2 border-black bg-white text-black font-medium text-lg focus:outline-none focus:border-gray-600 transition-colors"
                >
                  <option value="">-- Verbindung auswählen --</option>
                  <option value="1">Production Database (database)</option>
                  <option value="2">Customer Excel File (excel)</option>
                  <option value="3">Sales API (api)</option>
                </select>
              </div>

              <div className="bg-white border-2 border-black p-6 mt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-4">
                  Verbindungsdetails
                </h3>
                <div className="space-y-2 mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Typ:</span>
                    <span className="text-black font-bold">database</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="text-black font-bold">Production Database</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Verfügbare Felder:</span>
                    <span className="text-black font-bold">{sourceFields.length}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Target */}
          {currentStep === 'target' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-black flex items-center justify-center">
                  <Database size={18} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-black">Ziel auswählen</h2>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Ziel-Verbindung
                </label>
                <select
                  className="w-full px-4 py-4 border-2 border-black bg-white text-black font-medium text-lg focus:outline-none focus:border-gray-600 transition-colors"
                >
                  <option value="">-- Verbindung auswählen --</option>
                  <option value="2">Target Database (database)</option>
                  <option value="3">Export Excel (excel)</option>
                  <option value="4">Analytics System (api)</option>
                </select>
              </div>

              <div className="bg-white border-2 border-black p-6 mt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-4">
                  Verbindungsdetails
                </h3>
                <div className="space-y-2 mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Typ:</span>
                    <span className="text-black font-bold">database</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="text-black font-bold">Target Database</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Verfügbare Felder:</span>
                    <span className="text-black font-bold">{targetFields.length}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Field Mapping */}
          {currentStep === 'mapping' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black"></div>
                  <h2 className="text-2xl font-bold text-black">Feld-Zuordnung</h2>
                </div>
                <div className="text-sm font-bold">
                  <span className="text-black">0</span>
                  <span className="text-gray-500"> / {Math.min(sourceFields.length, targetFields.length)} zugeordnet</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8">
                {/* Source Fields */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                    Quellfelder
                  </h3>
                  <div className="space-y-2">
                    {sourceFields.map((field, idx) => (
                      <div
                        key={idx}
                        className="w-full px-4 py-3 border-2 border-gray-300 bg-white text-black hover:border-black cursor-pointer hover:translate-x-1 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="mono text-sm font-medium">{field}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mapping Arrows */}
                <div className="flex flex-col justify-center min-w-[100px]">
                  <div className="text-center py-8 text-gray-300 font-medium text-sm">
                    Keine Zuordnungen
                  </div>
                </div>

                {/* Target Fields */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                    Zielfelder
                  </h3>
                  <div className="space-y-2">
                    {targetFields.map((field, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-3 border-2 border-gray-300 bg-white text-black transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="mono text-sm font-medium">{field}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t-2 border-gray-200">
                <button
                  className="px-6 py-3 border-2 border-black bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all"
                >
                  Alle Zuordnungen löschen
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 'review' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-black"></div>
                <h2 className="text-2xl font-bold text-black">Überprüfung & Start</h2>
              </div>

              {/* Migration Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Migrations-Name *
                </label>
                <input
                  type="text"
                  placeholder="z.B. Kunden DB → Excel Export"
                  className="w-full px-4 py-4 border-2 border-black bg-white text-black placeholder-gray-400 font-medium text-lg focus:outline-none focus:border-gray-600 transition-colors"
                />
              </div>

              {/* Summary */}
              <div className="bg-white border-2 border-black p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-4">
                  Zusammenfassung
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-sm font-medium text-gray-600">Quelle:</span>
                    <span className="text-sm font-bold text-black mono">Production Database</span>
                  </div>

                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-sm font-medium text-gray-600">Ziel:</span>
                    <span className="text-sm font-bold text-black mono">Target Database</span>
                  </div>

                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-sm font-medium text-gray-600">Feld-Zuordnungen:</span>
                    <span className="text-sm font-bold text-black">0</span>
                  </div>

                  <div className="pt-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Zugeordnete Felder:
                    </p>
                    <div className="text-center py-4 text-gray-400 text-sm">
                      Keine Zuordnungen vorhanden
                    </div>
                  </div>
                </div>
              </div>

              {/* Test Mode Toggle */}
              <div className="bg-yellow-50 border-2 border-yellow-400 p-6">
                <label className="flex items-start cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 mt-0.5 border-2 border-black bg-white checked:bg-black transition-colors cursor-pointer flex-shrink-0"
                  />
                  <div className="ml-3">
                    <div className="flex items-center gap-2">
                      <TestTube2 size={18} className="text-yellow-700" />
                      <span className="text-sm font-bold text-black">Test-Modus aktivieren</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Im Test-Modus werden nur die ersten 100 Datensätze migriert. Die Migration wird als "[TEST]" markiert.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 'source'}
            className="px-6 py-3 border-2 border-black bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black flex items-center gap-2"
          >
            <ChevronLeft size={18} />
            Zurück
          </button>

          <div className="flex gap-3">
            {currentStep === 'review' ? (
              <>
                <button
                  className="px-6 py-3 border-2 border-black bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                >
                  <TestTube2 size={18} />
                  Test starten
                </button>
                <button
                  className="px-6 py-3 bg-black text-white font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2"
                >
                  <Play size={18} fill="white" />
                  Migration starten
                </button>
              </>
            ) : (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-black text-white font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2"
              >
                Weiter
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
