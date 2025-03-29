import { validationResult } from "express-validator"

function errorHandler(req, res, next){  
    if(!validationResult(req).isEmpty()){
        return res.status(400).json({
            success: false,
            message: validationResult(req).errors[0].msg
        })
    }
    next();
}
export default errorHandler