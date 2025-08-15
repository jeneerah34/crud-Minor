// routes/items.js
const router = require('express').Router();
const Item = require('../models/Item');

// CREATE
router.post('/', async (req, res) => {
  try {
    const { title, description, done } = req.body;
    const item = await Item.create({ title, description, done });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ ALL (with simple search & sort)
router.get('/', async (req, res) => {
  try {
    const { q, sort = '-createdAt' } = req.query;
    const filter = q ? { title: { $regex: q, $options: 'i' } } : {};
    const items = await Item.find(filter).sort(sort);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const { title, description, done } = req.body;
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { title, description, done },
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted', id: req.params.id });
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

module.exports = router;
