import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

dotenv.config();
const app: Express = express();
const port: string = process.env.PORT || "8080";

// MongoConnection
const mongoDBUriKey: string = process.env.MONGO_ATLAS_URI || "";
mongoose.connect(mongoDBUriKey);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once("open", () => console.log("Connected to DB!"));

// PassportJs
const AuthUserSchema = require("./src/models/AuthUserSchema")

passport.use(
  new LocalStrategy(async(username: any, password: any, done: any) => {
    try {
      const user = await AuthUserSchema.findOne({ userEmail: username });
      console.log(user);
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      };
      
      bcrypt.compare(password, user.userPassword, (err: any, res: any) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password"});
        }
      })
    } catch(err) {
      return done(err);
    };
  })
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await AuthUserSchema.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
})

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/log-in", 
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/"
  })
)

app.get("/home", (req, res) => {
  res.status(200).send(JSON.stringify("success"));
})

app.get("/", (req, res) => {
  res.status(200).send(JSON.stringify("login-failed"));
})

app.get("/log-out", (req: Request, res: Response, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
})

// Routes
import authRoutes from './src/routes/authRoutes';
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});