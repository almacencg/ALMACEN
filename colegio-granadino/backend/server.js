// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// --- AUTH ENDPOINTS ---

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'User not found' });
    
    // In a real app we'd use bcrypt, but we'll check plain text if needed
    const isValid = await bcrypt.compare(password, user.password).catch(() => password === user.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid password' });

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ITEMS ENDPOINTS ---

app.get('/api/items', async (req, res) => {
  try {
    const items = await prisma.item.findMany({ include: { category: true }, orderBy: { name: 'asc' } });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/items', async (req, res) => {
  try {
    const item = await prisma.item.create({ data: req.body });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    const item = await prisma.item.update({ where: { id: req.params.id }, data: req.body });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    await prisma.item.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- MOVEMENTS ---

app.post('/api/inputs', async (req, res) => {
  const { itemId, quantity, supplier } = req.body;
  try {
    const result = await prisma.$transaction([
      prisma.input.create({ data: { itemId, quantity: Number(quantity), source: supplier, price: 0 } }),
      prisma.item.update({ where: { id: itemId }, data: { stock: { increment: Number(quantity) } } })
    ]);
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/outputs', async (req, res) => {
  const { itemId, quantity, recipient, reason } = req.body;
  try {
    const result = await prisma.$transaction([
      prisma.output.create({ data: { itemId, quantity: Number(quantity), createdBy: recipient, section: reason, price: 0 } }),
      prisma.item.update({ where: { id: itemId }, data: { stock: { decrement: Number(quantity) } } })
    ]);
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/history/inputs', async (req, res) => {
  try {
    const history = await prisma.input.findMany({ include: { item: true }, orderBy: { date: 'desc' } });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/history/outputs', async (req, res) => {
  try {
    const history = await prisma.output.findMany({ include: { item: true }, orderBy: { date: 'desc' } });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- REQUISITIONS ---

app.get('/api/requisitions', async (req, res) => {
  const { userId } = req.query;
  try {
    const where = userId ? { userId } : {};
    const requisitions = await prisma.requisition.findMany({
      where,
      include: { items: true, user: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(requisitions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/requisitions', async (req, res) => {
  const { userId, activity, section, budget, items } = req.body;
  try {
    const requisition = await prisma.requisition.create({
      data: {
        userId,
        activity,
        section,
        budget: Number(budget),
        items: {
          create: items.map(i => ({
            itemId: i.id,
            itemName: i.name,
            quantity: i.quantity
          }))
        }
      }
    });
    res.json(requisition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/requisitions/:id', async (req, res) => {
  try {
    const requisition = await prisma.requisition.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(requisition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- USERS ---
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({ orderBy: { name: 'asc' } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
