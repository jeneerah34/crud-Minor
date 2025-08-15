// models/Item.js
const { Schema, model } = require('mongoose');

const ItemSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters']
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    done: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = model('Item', ItemSchema);
