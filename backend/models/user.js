const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  role: { type: String, default: "user", enum: ["user", "admin"] },
  results: [{ type: mongoose.Schema.Types.ObjectId, ref: 'result' }],
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model("user",userSchema);
