import express from 'express';
import { prisma } from '../server.js';

const router = express.Router();

// Get all connections for a user
router.get('/', async (req, res) => {
  try {
    const userId = parseInt(req.query.userId as string);
    
    const connections = await prisma.connection.findMany({
      where: userId ? { userId } : {},
      orderBy: { lastUsed: 'desc' },
    });
    
    res.json(connections);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get connection by ID
router.get('/:id', async (req, res) => {
  try {
    const connection = await prisma.connection.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!connection) {
      return res.status(404).json({ error: 'Connection not found' });
    }

    res.json(connection);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create connection
router.post('/', async (req, res) => {
  try {
    const { name, type, config, userId } = req.body;

    const connection = await prisma.connection.create({
      data: {
        name,
        type,
        config: JSON.stringify(config),
        userId,
      },
    });

    res.status(201).json(connection);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Update connection
router.put('/:id', async (req, res) => {
  try {
    const { name, type, config } = req.body;

    const connection = await prisma.connection.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        type,
        config: JSON.stringify(config),
        lastUsed: new Date(),
      },
    });

    res.json(connection);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete connection
router.delete('/:id', async (req, res) => {
  try {
    await prisma.connection.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Test connection
router.post('/:id/test', async (req, res) => {
  try {
    const connection = await prisma.connection.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!connection) {
      return res.status(404).json({ error: 'Connection not found' });
    }

    // TODO: Implement actual connection testing based on type
    // For now, simulate a test
    const success = Math.random() > 0.2; // 80% success rate

    await prisma.connection.update({
      where: { id: parseInt(req.params.id) },
      data: { lastUsed: new Date() },
    });

    res.json({
      success,
      message: success ? 'Connection successful' : 'Connection failed',
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
