import { generate } from "otp-generator";
import twilio from "twilio";
import redisClient from "./redisController.js";

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
  // client.messages
  //   .create({
  //     body: `TrackError Application: your OTP code is ${otpCode}.`,
  //     from: process.env.T_DEPARTURE,
  //     to: process.env.T_DESTINATION,
  //   })
  //   .then(() => {
  //     redisClient.set("otp", otpCode, "EX", 1);
  //     return res.sendStatus(201);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     return res.sendStatus(400);
  //   });
    redisClient.set("otp", otpCode, {
      EX: 1
    });
    return res.status(201).json({
      otp: otpCode
    });

};
export const checkOtp = async(req, res) => {
    const checker = await redisClient.get("otp");
    if(checker === null){
      return res.status(498).json({
        message: "OTP expired"
      })
    }
    if(checker !== req.body.otp){
      return res.status(401).json({
        message: "Incorrect OTP"
      })
    }
    
    return res.status(200).json({
        otp: checker
    })
}

