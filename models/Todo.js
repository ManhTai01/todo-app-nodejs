const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required:true,
  }
});

module.exports = new mongoose.model("Todo", TodoSchema);
