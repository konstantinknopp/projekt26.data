import React, { useState } from 'react';
import { User, Lock, Bell, Database, Globe, Trash2, Save, X } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: 'Max',
    lastName: 'Mustermann',
    email: 'max@example.com',
    company: 'Firma GmbH',
    notifications: {
      email: true,
      migration: true,
      errors: true
    },
    language: 'de',
    theme: 'light'
  });

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Sicherheit', icon: Lock },
    { id: 'notifications', label: 'Benachrichtigungen', icon: Bell },
    { id: 'connections', label: 'Verbindungen', icon: Database },
    { id: 'preferences', label: 'Präferenzen', icon: Globe },
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
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-black mb-2">
            Einstellungen
          </h1>
          <div className="flex items-center gap-3 text-gray-400">
            <div className="w-12 h-px bg-black"></div>
            <p className="text-sm uppercase tracking-widest font-medium">
              Konfiguration
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar Navigation */}
          <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 border-2 transition-all ${
                      activeTab === tab.id
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 bg-white text-black hover:border-black'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-bold text-sm uppercase tracking-wider">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content Area */}
          <div className="bg-gray-50 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-black"></div>
                  <h2 className="text-2xl font-bold text-black">Profil</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Vorname
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      className="w-full px-4 py-3 border-2 border-black bg-white text-black font-medium mono text-sm focus:outline-none focus:ring-0 focus:border-gray-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Nachname
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      className="w-full px-4 py-3 border-2 border-black bg-white text-black font-medium mono text-sm focus:outline-none focus:ring-0 focus:border-gray-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    className="w-full px-4 py-3 border-2 border-black bg-white text-black font-medium mono text-sm focus:outline-none focus:ring-0 focus:border-gray-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Unternehmen
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    className="w-full px-4 py-3 border-2 border-black bg-white text-black font-medium mono text-sm focus:outline-none focus:ring-0 focus:border-gray-600 transition-colors"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="px-6 py-3 bg-black text-white font-bold text-sm uppercase tracking-wider transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center gap-2">
                    <Save size={16} />
                    Speichern
                  </button>
                  <button className="px-6 py-3 border-2 border-black bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center gap-2">
                    <X size={16} />
                    Abbrechen
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-black"></div>
                  <h2 className="text-2xl font-bold text-black">Sicherheit</h2>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Aktuelles Passwort
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border-2 border-black bg-white text-black placeholder-gray-400 font-medium mono text-sm focus:outline-none focus:ring-0 focus:border-gray-600 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Neues Passwort
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border-2 border-black bg-white text-black placeholder-gray-400 font-medium mono text-sm focus:outline-none focus:ring-0 focus:border-gray-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Passwort bestätigen
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border-2 border-black bg-white text-black placeholder-gray-400 font-medium mono text-sm focus:outline-none focus:ring-0 focus:border-gray-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="bg-white border-2 border-black p-6 mt-8">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-4">
                    Zwei-Faktor-Authentifizierung
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Erhöhen Sie die Sicherheit Ihres Kontos durch 2FA
                  </p>
                  <button className="px-6 py-3 border-2 border-black bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                    2FA Aktivieren
                  </button>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="px-6 py-3 bg-black text-white font-bold text-sm uppercase tracking-wider transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center gap-2">
                    <Save size={16} />
                    Passwort ändern
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-black"></div>
                  <h2 className="text-2xl font-bold text-black">Benachrichtigungen</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white border-2 border-gray-300">
                    <div>
                      <h3 className="font-bold text-sm text-black mb-1">E-Mail Benachrichtigungen</h3>
                      <p className="text-xs text-gray-600">Erhalten Sie Updates per E-Mail</p>
                    </div>
                    <label className="relative inline-block w-12 h-6 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.notifications.email}
                        onChange={(e) => setFormData({
                          ...formData,
                          notifications: { ...formData.notifications, email: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-gray-300 peer-checked:bg-black border-2 border-black transition-all"></div>
                      <div className="absolute left-0.5 top-0.5 bg-white w-4 h-4 border-2 border-black transition-all peer-checked:translate-x-6"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white border-2 border-gray-300">
                    <div>
                      <h3 className="font-bold text-sm text-black mb-1">Migrations-Updates</h3>
                      <p className="text-xs text-gray-600">Benachrichtigung bei Migrations-Abschluss</p>
                    </div>
                    <label className="relative inline-block w-12 h-6 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.notifications.migration}
                        onChange={(e) => setFormData({
                          ...formData,
                          notifications: { ...formData.notifications, migration: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-gray-300 peer-checked:bg-black border-2 border-black transition-all"></div>
                      <div className="absolute left-0.5 top-0.5 bg-white w-4 h-4 border-2 border-black transition-all peer-checked:translate-x-6"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white border-2 border-gray-300">
                    <div>
                      <h3 className="font-bold text-sm text-black mb-1">Fehler-Benachrichtigungen</h3>
                      <p className="text-xs text-gray-600">Sofortige Benachrichtigung bei Fehlern</p>
                    </div>
                    <label className="relative inline-block w-12 h-6 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.notifications.errors}
                        onChange={(e) => setFormData({
                          ...formData,
                          notifications: { ...formData.notifications, errors: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-gray-300 peer-checked:bg-black border-2 border-black transition-all"></div>
                      <div className="absolute left-0.5 top-0.5 bg-white w-4 h-4 border-2 border-black transition-all peer-checked:translate-x-6"></div>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="px-6 py-3 bg-black text-white font-bold text-sm uppercase tracking-wider transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center gap-2">
                    <Save size={16} />
                    Speichern
                  </button>
                </div>
              </div>
            )}

            {/* Connections Tab */}
            {activeTab === 'connections' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-black"></div>
                  <h2 className="text-2xl font-bold text-black">Gespeicherte Verbindungen</h2>
                </div>

                <div className="space-y-4">
                  {['Production DB', 'Development DB', 'Analytics API'].map((conn, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white border-2 border-black">
                      <div>
                        <h3 className="font-bold text-sm text-black mb-1 mono">{conn}</h3>
                        <p className="text-xs text-gray-600 mono">Letzte Verbindung: 28.01.2026</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 border-2 border-black bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-all">
                          Bearbeiten
                        </button>
                        <button className="px-4 py-2 border-2 border-black bg-black text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all flex items-center gap-1">
                          <Trash2 size={14} />
                          Löschen
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full px-6 py-4 border-2 border-gray-300 bg-white text-black font-bold text-sm uppercase tracking-wider hover:border-black transition-all">
                  + Neue Verbindung hinzufügen
                </button>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-black"></div>
                  <h2 className="text-2xl font-bold text-black">Präferenzen</h2>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Sprache
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-black bg-white text-black font-medium focus:outline-none focus:ring-0 focus:border-gray-600 transition-colors"
                  >
                    <option value="de">Deutsch</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Theme
                  </label>
                  <select
                    value={formData.theme}
                    onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-black bg-white text-black font-medium focus:outline-none focus:ring-0 focus:border-gray-600 transition-colors"
                  >
                    <option value="light">Hell</option>
                    <option value="dark">Dunkel</option>
                    <option value="auto">Automatisch</option>
                  </select>
                </div>

                <div className="bg-white border-2 border-black p-6 mt-8">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-4">
                    Danger Zone
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Diese Aktion kann nicht rückgängig gemacht werden
                  </p>
                  <button className="px-6 py-3 border-2 border-black bg-black text-white font-bold text-sm uppercase tracking-wider hover:bg-red-600 hover:border-red-600 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center gap-2">
                    <Trash2 size={16} />
                    Konto löschen
                  </button>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="px-6 py-3 bg-black text-white font-bold text-sm uppercase tracking-wider transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center gap-2">
                    <Save size={16} />
                    Speichern
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
