const express = require('express');
const router = express.Router();
const Menu = require('../models/menu');

// Create a new menu
router.post('/', async (req, res) => {
    console.log('POST /menu called with body:', req.body);
    try {
        const menu = new Menu(req.body);
        await menu.save();
        res.status(201).send(menu);
    } catch (error) {
        console.error('Error in POST /menu:', error);
        res.status(400).send(error);
    }
});

// Read all menus (hierarchical structure)
router.get('/', async (req, res) => {
    console.log('GET /menu called');
    try {
        const menus = await Menu.find();
        const buildHierarchy = (parentId = null) => {
            return menus
                .filter(menu => String(menu.parent) === String(parentId))
                .map(menu => ({
                    ...menu.toObject(),
                    children: buildHierarchy(menu._id)
                }));
        };
        res.send(buildHierarchy());
    } catch (error) {
        console.error('Error in GET /menu:', error);
        res.status(500).send(error);
    }
});

// Update a menu
router.put('/:id', async (req, res) => {
    console.log(`PUT /menu/${req.params.id} called with body:`, req.body);
    try {
        const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!menu) {
            console.log(`Menu with ID ${req.params.id} not found`);
            return res.status(404).send();
        }
        res.send(menu);
    } catch (error) {
        console.error(`Error in PUT /menu/${req.params.id}:`, error);
        res.status(400).send(error);
    }
});

// Delete a menu
router.delete('/:id', async (req, res) => {
    console.log(`DELETE /menu/${req.params.id} called`);
    try {
        const menu = await Menu.findByIdAndDelete(req.params.id);
        if (!menu) {
            console.log(`Menu with ID ${req.params.id} not found`);
            return res.status(404).send();
        }
        res.send(menu);
    } catch (error) {
        console.error(`Error in DELETE /menu/${req.params.id}:`, error);
        res.status(500).send(error);
    }
});

module.exports = router;
