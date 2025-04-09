import { generate } from "otp-generator";
import twilio from "twilio";
import redisClient from "./redisController.js";
import jwt from "jsonwebtoken";
import COOKIE_OPTIONS from "../utils/cookieOptions.js";
export const getOtp = async (req, res, next) => {
  const client = twilio(process.env.T_SID, process.env.T_AUTH_TOKEN);
  const otpCode = generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  if (!otpCode || !client) {
    return res.status(400).json({
      message: "Error when generating otpCode, try again later!",
    });
  }
  client.messages
    .create({
      body: `TrackError Application: your OTP code is ${otpCode}.`,
      from: process.env.T_DEPARTURE,
      to: process.env.T_DESTINATION,
    })
    .then(() => {
      redisClient.set("otp", otpCode, "EX", 1);
      return res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(400);
    });
  redisClient.set("otp", otpCode, {
    EX: 60,
  });
  return res.status(201);
};
export const checkOtp = async (req, res) => {
  const checker = await redisClient.get("otp");
  if (checker === null) {
    return res.status(498).json({
      message: "OTP expired",
    });
  }
  if (checker !== req.body.otp) {
    return res.status(401).json({
      message: "Incorrect OTP",
    });
  }
  const token = jwt.sign(process.env.T_DESTINATION, process.env.JWT_SECRET);
  if (!token) {
    return res.status(400).json({
      message: "Proble while creating token",
    });
  }
  res.cookie("auth_token", token, COOKIE_OPTIONS);
  return res.status(200).json({
    otp: checker,
  });
};

export const verifyJwt = async (req, res, next) => {
  const token = req.cookies.auth_token;
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken === process.env.T_DESTINATION) {
      return res.sendStatus(401);
    }
    next();
  } catch (e) {
    return res.sendStatus(401);
  }
};

export const positiveJwtResponse = async (req, res, next) => {
  return res.sendStatus(200);
};
