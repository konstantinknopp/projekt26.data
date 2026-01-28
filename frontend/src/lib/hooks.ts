import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { connectionApi, migrationApi, userApi } from './api';

// Users
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await userApi.getAll();
      return response.data;
    },
  });
};

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
      const response = await userApi.getById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

// Connections
export const useConnections = (userId?: number) => {
  return useQuery({
    queryKey: ['connections', userId],
    queryFn: async () => {
      const response = await connectionApi.getAll(userId);
      return response.data;
    },
  });
};

export const useConnection = (id: number) => {
  return useQuery({
    queryKey: ['connections', id],
    queryFn: async () => {
      const response = await connectionApi.getById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateConnection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: connectionApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connections'] });
    },
  });
};

export const useDeleteConnection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => connectionApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connections'] });
    },
  });
};

// Migrations
export const useMigrations = (userId?: number) => {
  return useQuery({
    queryKey: ['migrations', userId],
    queryFn: async () => {
      const response = await migrationApi.getAll(userId);
      return response.data;
    },
    // refetchInterval: 5000, // Refetch every 5 seconds to get updates
  });
};

export const useMigration = (id: number) => {
  return useQuery({
    queryKey: ['migrations', id],
    queryFn: async () => {
      const response = await migrationApi.getById(id);
      return response.data;
    },
    enabled: !!id,
    refetchInterval: (data) => {
      // Only refetch if migration is running
      return data?.status === 'running' ? 2000 : false;
    },
  });
};

export const useCreateMigration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: migrationApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['migrations'] });
    },
  });
};

export const useStartMigration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => migrationApi.start(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['migrations'] });
    },
  });
};

export const useCancelMigration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => migrationApi.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['migrations'] });
    },
  });
};

export const useMigrationStats = (id: number) => {
  return useQuery({
    queryKey: ['migrations', id, 'stats'],
    queryFn: async () => {
      const response = await migrationApi.getStats(id);
      return response.data;
    },
    enabled: !!id,
    refetchInterval: 2000, // Refetch every 2 seconds for live progress
  });
};

export const useQueueStats = () => {
  return useQuery({
    queryKey: ['queue-stats'],
    queryFn: async () => {
      const response = await migrationApi.getQueueStats();
      return response.data;
    },
    refetchInterval: 5000,
  });
};
