import express from 'express';
import { prisma } from '../server.js';
import { migrationQueue } from '../queue.js';

const router = express.Router();

// Get all migrations
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
    
    const migrations = await prisma.migration.findMany({
      where: userId ? { userId } : {},
      include: {
        source: true,
        target: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    
    res.json(migrations);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get migration by ID
router.get('/:id', async (req, res) => {
  try {
    const migration = await prisma.migration.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        source: true,
        target: true,
        user: true,
      },
    });

    if (!migration) {
      return res.status(404).json({ error: 'Migration not found' });
    }

    // Get job status if job exists
    let jobStatus = null;
    if (migration.jobId) {
      const job = await migrationQueue.getJob(migration.jobId);
      if (job) {
        jobStatus = {
          id: job.id,
          progress: await job.progress,
          state: await job.getState(),
        };
      }
    }

    res.json({
      ...migration,
      jobStatus,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create migration
router.post('/', async (req, res) => {
  try {
    const { name, sourceId, targetId, mappings, transformations, userId } = req.body;

    const migration = await prisma.migration.create({
      data: {
        name,
        sourceId,
        targetId,
        mappings: JSON.stringify(mappings),
        transformations: transformations ? JSON.stringify(transformations) : null,
        userId,
        status: 'pending',
      },
      include: {
        source: true,
        target: true,
      },
    });

    res.status(201).json(migration);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Start migration (add to queue)
router.post('/:id/start', async (req, res) => {
  try {
    const migration = await prisma.migration.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        source: true,
        target: true,
      },
    });

    if (!migration) {
      return res.status(404).json({ error: 'Migration not found' });
    }

    if (migration.status === 'running') {
      return res.status(400).json({ error: 'Migration is already running' });
    }

    // Add job to queue
    const job = await migrationQueue.add(
      `migration-${migration.id}`,
      {
        migrationId: migration.id,
        sourceConfig: JSON.parse(migration.source.config),
        targetConfig: JSON.parse(migration.target.config),
        mappings: JSON.parse(migration.mappings),
        transformations: migration.transformations
          ? JSON.parse(migration.transformations)
          : undefined,
      },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
      }
    );

    // Update migration with job ID
    await prisma.migration.update({
      where: { id: migration.id },
      data: {
        jobId: job.id as string,
        status: 'pending',
      },
    });

    res.json({
      message: 'Migration queued successfully',
      jobId: job.id,
      migration,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get migration statistics
router.get('/:id/stats', async (req, res) => {
  try {
    const migration = await prisma.migration.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!migration) {
      return res.status(404).json({ error: 'Migration not found' });
    }

    const stats = {
      status: migration.status,
      recordsTotal: migration.recordsTotal,
      recordsProcessed: migration.recordsProcessed,
      progress:
        migration.recordsTotal > 0
          ? (migration.recordsProcessed / migration.recordsTotal) * 100
          : 0,
      startedAt: migration.startedAt,
      completedAt: migration.completedAt,
      duration: migration.startedAt && migration.completedAt
        ? migration.completedAt.getTime() - migration.startedAt.getTime()
        : null,
    };

    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel migration
router.post('/:id/cancel', async (req, res) => {
  try {
    const migration = await prisma.migration.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!migration) {
      return res.status(404).json({ error: 'Migration not found' });
    }

    if (migration.jobId) {
      const job = await migrationQueue.getJob(migration.jobId);
      if (job) {
        await job.remove();
      }
    }

    await prisma.migration.update({
      where: { id: migration.id },
      data: {
        status: 'failed',
        errorLog: 'Cancelled by user',
        completedAt: new Date(),
      },
    });

    res.json({ message: 'Migration cancelled' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get queue statistics
router.get('/queue/stats', async (req, res) => {
  try {
    const [waiting, active, completed, failed] = await Promise.all([
      migrationQueue.getWaitingCount(),
      migrationQueue.getActiveCount(),
      migrationQueue.getCompletedCount(),
      migrationQueue.getFailedCount(),
    ]);

    res.json({
      waiting,
      active,
      completed,
      failed,
      total: waiting + active + completed + failed,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
