import express, { Express, Request, Response } from 'express';
const authService = require('../services/authService');

const getAuth = async (req: Request, res: Response) => {
  try {
    const response = await authService.authTest();
    console.log(response)

    res.status(200).send(response)
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  getAuth,
} 