const express = require('express');
const Item = require('../models/Item');
const verifyToken = require('../middleware/auth');
const router = express.Router();

// Get All Items
router.get('/', verifyToken, async (req, res) => {
  try {
    console.log(`Fetching items for user: ${req.userId}`); // Debugging log
    const items = await Item.find({ userId: req.userId });
    res.json(items);
  } catch (err) {
    console.error('Error fetching items:', err.message); // Debugging log
    res.status(500).json({ message: 'Error fetching items', error: err.message });
  }
});

// Create Item
router.post('/', verifyToken, async (req, res) => {
  try {
    console.log('Request Body for Create Item:', req.body); // Debugging log
    const { title, genre, watchDate, lastEpisode, status, note } = req.body;
    if (!title || !genre || !watchDate || !lastEpisode || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newItem = new Item({
      title,
      genre,
      watchDate,
      lastEpisode,
      status,
      note,
      userId: req.userId,
    });

    await newItem.save();
    console.log('Item created:', newItem); // Debugging log
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Error creating item:', err.message); // Debugging log
    res.status(500).json({ message: 'Error creating item', error: err.message });
  }
});

// Update Item
router.put('/:id', verifyToken, async (req, res) => {
  try {
    console.log(`Updating item ${req.params.id} for user: ${req.userId}`); // Debugging log
    const updatedItem = await Item.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { ...req.body },
      { new: true } // Return updated document
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found or unauthorized' });
    }

    console.log('Item updated:', updatedItem); // Debugging log
    res.json(updatedItem);
  } catch (err) {
    console.error('Error updating item:', err.message); // Debugging log
    res.status(500).json({ message: 'Error updating item', error: err.message });
  }
});

// Delete Item
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    console.log(`Deleting item ${req.params.id} for user: ${req.userId}`); // Debugging log
    const deletedItem = await Item.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found or unauthorized' });
    }

    console.log('Item deleted:', deletedItem); // Debugging log
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Error deleting item:', err.message); // Debugging log
    res.status(500).json({ message: 'Error deleting item', error: err.message });
  }
});

module.exports = router;
