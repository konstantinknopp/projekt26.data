import { useState } from 'react';
import { useConnections, useCreateConnection, useDeleteConnection } from '../lib/hooks';
import { Database, Trash2, Plus } from 'lucide-react';

export default function ConnectionsPage() {
  const { data: connections, isLoading } = useConnections();
  const createConnection = useCreateConnection();
  const deleteConnection = useDeleteConnection();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'database',
    host: '',
    port: '',
    database: '',
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const config = {
      host: formData.host,
      port: formData.port,
      database: formData.database,
      username: formData.username,
      password: formData.password,
    };

    try {
      await createConnection.mutateAsync({
        name: formData.name,
        type: formData.type,
        config: JSON.stringify(config),
        userId: 1, // TODO: Get from auth
      });

      setShowForm(false);
      setFormData({
        name: '',
        type: 'database',
        host: '',
        port: '',
        database: '',
        username: '',
        password: '',
      });
    } catch (error) {
      console.error('Error creating connection:', error);
      alert('Error creating connection');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this connection?')) {
      try {
        await deleteConnection.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting connection:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-black">Connections</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-black text-white font-bold text-sm uppercase tracking-wider transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center gap-2"
          >
            <Plus size={18} />
            New Connection
          </button>
        </div>

        {/* Create Form */}
        {showForm && (
          <div className="bg-gray-50 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
            <h2 className="text-2xl font-bold text-black mb-6">Create Connection</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-black bg-white text-black font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-black bg-white text-black font-medium focus:outline-none"
                  >
                    <option value="database">Database</option>
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                    <option value="api">API</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Host
                  </label>
                  <input
                    type="text"
                    value={formData.host}
                    onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-black bg-white text-black mono text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Port
                  </label>
                  <input
                    type="text"
                    value={formData.port}
                    onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-black bg-white text-black mono text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Database
                </label>
                <input
                  type="text"
                  value={formData.database}
                  onChange={(e) => setFormData({ ...formData, database: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-black bg-white text-black mono text-sm focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-black bg-white text-black mono text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-black bg-white text-black mono text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={createConnection.isPending}
                  className="px-6 py-3 bg-black text-white font-bold text-sm uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border-2 border-black bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Connections List */}
        <div className="space-y-4">
          {connections?.map((connection) => (
            <div
              key={connection.id}
              className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black flex items-center justify-center">
                    <Database size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black">{connection.name}</h3>
                    <p className="text-sm text-gray-600 uppercase tracking-wider">
                      {connection.type}
                    </p>
                    {connection.lastUsed && (
                      <p className="text-xs text-gray-500 mono mt-1">
                        Last used: {new Date(connection.lastUsed).toLocaleString('de-DE')}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(connection.id)}
                  className="px-4 py-2 border-2 border-black bg-black text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all flex items-center gap-2"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}

          {!connections || connections.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-gray-300">
              <p className="text-gray-400 mb-4">No connections yet</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-black text-white font-bold text-sm uppercase tracking-wider"
              >
                Create your first connection
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
