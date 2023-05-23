import { Request } from "express";
const AuthUserSchema = require("../models/AuthUserSchema");

const signUpService = async (req: Request) => {
  try {
    const user = new AuthUserSchema({
      userEmail: req.body.signupEmail,
      userPassword: req.body.signupPassword,
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