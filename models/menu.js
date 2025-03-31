const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    text: { type: String, required: true },
    url: { type: String, required: true, default: '/' },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'menu', default: null }
});

module.exports = mongoose.model('menu', menuSchema);
