//FROM THE TUTORIAL VIDEO

const validInfo = (req, res, next) => {
    const { email, nickname, password } = req.body;
    console.log("validInfo req.body", req.body);
    function validEmail(userEmail) {
      // This is RegExp aka Regular expressions aka language of the forgotten gods^^ 
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/signup") {
      console.log(!email.length);
      if (![email, nickname, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }

      
    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }
    }
  
    next();
  };
  export default validInfo;