require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── MIDDLEWARE ───
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── MONGODB CONNECTION ───
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// ─── SCHEMAS ───

// Contact Message Schema
const contactSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, trim: true },
  subject:   { type: String, trim: true },
  message:   { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  read:      { type: Boolean, default: false }
});

// Visitor Schema
const visitorSchema = new mongoose.Schema({
  count:     { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);
const Visitor = mongoose.model('Visitor', visitorSchema);

// ─── ROUTES ───

// POST /api/contact — Save contact form message
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
    }

    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    console.log(`📩 New message from: ${name} <${email}>`);
    res.status(201).json({ success: true, message: 'Message received! I will get back to you soon.' });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// GET /api/visitors — Increment and return visitor count
app.get('/api/visitors', async (req, res) => {
  try {
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = new Visitor({ count: 1 });
    } else {
      visitor.count += 1;
      visitor.updatedAt = new Date();
    }
    await visitor.save();
    res.json({ success: true, count: visitor.count });
  } catch (err) {
    console.error('Visitor error:', err);
    res.status(500).json({ success: false, count: 0 });
  }
});

// GET /api/messages — View all messages (simple admin)
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching messages.' });
  }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── START SERVER ───
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
