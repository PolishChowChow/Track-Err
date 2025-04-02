import { generate } from "otp-generator"
import twilio from "twilio"

const getOtp = (req, res, next) => {
    console.log(process.env.T_SID);
    
    const client = twilio(process.env.T_SID, process.env.T_AUTH_TOKEN);
    const optCode = generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    })
    if(!optCode || !client){
        return res.status(400).json({
            message: "Error when generating otpCode, try again later!"
        })
    }
    client.messages.create({
        body: `TrackError Application: your OTP code is ${optCode}.`,
        from: process.env.T_DEPARTURE,
        to: process.env.T_DESTINATION,
    })
    .then(() => {
        return res.sendStatus(201)
    })
    .catch((err)=>{
        console.error(err)
        return res.sendStatus(400)
    })
}

export default getOtp;