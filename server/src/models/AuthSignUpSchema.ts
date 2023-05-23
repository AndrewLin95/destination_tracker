import mongoose from "mongoose";

const authSignUpSchema = new mongoose.Schema({
  loginEmail: {
    type: String,
    required: true,
  },
  loginPassword: {
    type: String,
    required: true,
  },
  joinDate: {
    type: Date,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
}, { versionKey: false })

const AuthSignUpSchema = mongoose.model('AuthSignUpSchema', authSignUpSchema);

module.exports = AuthSignUpSchema;
