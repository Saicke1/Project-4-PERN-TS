import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

//In its compact form, JSON Web Tokens consist of three parts separated by dots (.), which are:
// Header, Payload, Signature
const issueToken = (user_id) => {
  const options = {
    expiresIn: "1h",
  };

  const payload = {
    sub: user_id,
  };

  /* oder?
  const payload = {
    user: {
      id: user_id
    }
  }
   */

  /* ANDERE SCHREIBWEISE
  return jwt.sign(payload, process.env.SECRET_KEY, options);
  
  ANDERE SCHREIBWEISE OHNE OPTIONS
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "5d" });*/

  //wieso OR key? (version von Lucas)
  //const jwt = jsonwebtoken.sign(payload, process.env.SECRET_KEY, options);
  const jwt = jsonwebtoken.sign(payload, process.env.SECRET_KEY, options);
  return jwt;
};

export { issueToken };