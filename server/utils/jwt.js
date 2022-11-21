import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

//In its compact form, JSON Web Tokens consist of three parts separated by dots (.), which are:
// Header, Payload, Signature
const issueToken = (user_id) => {
  const options = {
    expiresIn: "5d",
  };

  const payload = {
    sub: user_id,
  };

  //wieso OR key?
  const jwt = jsonwebtoken.sign(payload, process.env.SECRET_OR_KEY, options);

  return jwt;
};

export { issueToken };