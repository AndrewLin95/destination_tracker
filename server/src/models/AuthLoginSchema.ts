import mongoose from "mongoose";

const authLoginSchema = new mongoose.Schema({
  loginEmail: {
    type: String,
    required: true,
  },
  loginPassword: {
    type: String,
    required: true,
  }
}, { versionKey: false })

export const AuthLoginSchema = mongoose.model('AuthLoginSchema', authLoginSchema);

