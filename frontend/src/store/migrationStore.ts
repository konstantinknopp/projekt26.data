import { create } from 'zustand';

interface Mapping {
  source: string;
  target: string;
}

interface MigrationStore {
  // Source & Target
  sourceType: string;
  targetType: string;
  sourceConnectionId: number | null;
  targetConnectionId: number | null;
  
  // Mappings
  mappings: Mapping[];
  
  // Actions
  setSourceType: (type: string) => void;
  setTargetType: (type: string) => void;
  setSourceConnectionId: (id: number | null) => void;
  setTargetConnectionId: (id: number | null) => void;
  addMapping: (mapping: Mapping) => void;
  removeMapping: (index: number) => void;
  clearMappings: () => void;
  reset: () => void;
}

export const useMigrationStore = create<MigrationStore>((set) => ({
  // Initial state
  sourceType: 'database',
  targetType: 'database',
  sourceConnectionId: null,
  targetConnectionId: null,
  mappings: [],
  
  // Actions
  setSourceType: (type) => set({ sourceType: type }),
  setTargetType: (type) => set({ targetType: type }),
  setSourceConnectionId: (id) => set({ sourceConnectionId: id }),
  setTargetConnectionId: (id) => set({ targetConnectionId: id }),
  
  addMapping: (mapping) =>
    set((state) => ({
      mappings: [...state.mappings, mapping],
    })),
  
  removeMapping: (index) =>
    set((state) => ({
      mappings: state.mappings.filter((_, i) => i !== index),
    })),
  
  clearMappings: () => set({ mappings: [] }),
  
  reset: () =>
    set({
      sourceType: 'database',
      targetType: 'database',
      sourceConnectionId: null,
      targetConnectionId: null,
      mappings: [],
    }),
}));
