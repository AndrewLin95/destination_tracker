import { Request } from "express";
const AuthSignUpSchema = require("../models/AuthSignUpSchema");

const signUpService = async (req: Request) => {
  try {
    const user = new AuthSignUpSchema({
      loginEmail: req.body.signupEmail,
      loginPassword: req.body.signupPassword,
      joinDate: new Date(),
      firstName: req.body.signupFirstName,
      lastName: req.body.signupLastName,
    })

    const result = await user.save();
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  signUpService,
}