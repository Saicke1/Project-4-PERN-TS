//FROM THE TUTORIAL VIDEO

import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const authorizationToken = async (req, res, next) =>{

try {

    const jwtToken = await req.header("token");

    if(!jwtToken){
        return res.status(403).json("No Token to be Authorized.");
    }

    const payload = jwt.verify(jwtToken, process.env.SECRET_KEY);

    req.email = await payload.email;

    next();

} catch (error) {
    console.log('error.message', error.message);
    return res.status(403).json("Not Authorizate to see this.");
}
};