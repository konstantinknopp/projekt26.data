import { Queue, Worker, Job } from 'bullmq';
import Redis from 'ioredis';
import { prisma } from './server.js';

// Redis connection
const connection = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  maxRetriesPerRequest: null,
});

// Create migration queue
export const migrationQueue = new Queue('migrations', { connection });

// Define job data interface
interface MigrationJobData {
  migrationId: number;
  sourceConfig: any;
  targetConfig: any;
  mappings: any[];
  transformations?: any[];
}

// Worker to process migration jobs
const worker = new Worker<MigrationJobData>(
  'migrations',
  async (job: Job<MigrationJobData>) => {
    const { migrationId, sourceConfig, targetConfig, mappings } = job.data;

    console.log(`🚀 Starting migration job ${job.id} for migration ${migrationId}`);

    try {
      // Update migration status to running
      await prisma.migration.update({
        where: { id: migrationId },
        data: {
          status: 'running',
          jobId: job.id,
          startedAt: new Date(),
        },
      });

      // Simulate migration process
      const totalRecords = 1000; // In real app, get from source
      await prisma.migration.update({
        where: { id: migrationId },
        data: { recordsTotal: totalRecords },
      });

      // Process in batches
      for (let i = 0; i < totalRecords; i += 100) {
        // Simulate batch processing
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Update progress
        const processed = Math.min(i + 100, totalRecords);
        await prisma.migration.update({
          where: { id: migrationId },
          data: { recordsProcessed: processed },
        });

        // Update job progress
        await job.updateProgress((processed / totalRecords) * 100);

        console.log(`📊 Migration ${migrationId}: ${processed}/${totalRecords} records processed`);
      }

      // Mark as completed
      await prisma.migration.update({
        where: { id: migrationId },
        data: {
          status: 'completed',
          completedAt: new Date(),
        },
      });

      console.log(`✅ Migration ${migrationId} completed successfully`);
      return { success: true, recordsProcessed: totalRecords };
    } catch (error: any) {
      console.error(`❌ Migration ${migrationId} failed:`, error);

      // Mark as failed
      await prisma.migration.update({
        where: { id: migrationId },
        data: {
          status: 'failed',
          errorLog: error.message,
          completedAt: new Date(),
        },
      });

      throw error;
    }
  },
  { connection }
);

// Event listeners
worker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err.message);
});

worker.on('progress', (job, progress) => {
  console.log(`📈 Job ${job.id} progress: ${progress}%`);
});

export { worker };
