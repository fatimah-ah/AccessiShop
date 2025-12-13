import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,     // no duplicate emails
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "user"   // "admin" for product management
  }
}, {
  timestamps: true     // auto-createdAt & updatedAt
});

const User = mongoose.model("User", userSchema);
export default User;
