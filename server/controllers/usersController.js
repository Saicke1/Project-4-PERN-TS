import bcrypt from "bcrypt";
import client from '../dbConfig.js';
import jwt from "jsonwebtoken";

//GET ALL USERS
export const getAllUsers = async (req, res) => {
    try {
      const users = await client.query(`SELECT nickname, email FROM users`); //Checking if user already exists
      console.log('users', users)
      res.status(200).json(
        users.rows,
      );
    } catch (error) {
      res.status(500).json({
        error: error,
        success: false
      });
    }
  }

  //GET ONE USER BY ID
  export const getUserById = async (req, res) => {
    try {
      const { id } = req.params
      console.log('id', id)
      const user = await client.query(`SELECT * FROM users WHERE user_id = $1;`, [id]); //Checking if user already exists
      console.log('user', user)
      res.status(200).json({
        user: user.rows[0],
        success: true
      });
    } catch (error) {
      res.status(500).json({
        error: error,
        success: false
      });
    }
  }

    //REGISTER A NEW USER
  export const signUp = async (req, res) => {
    console.log('req.body', req.body)
    //1. destructure the req.body (nickname, email, password)
    const { nickname, email, password } = req.body;
    try {
    //2. check if user exist
      const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [email]); //Checking if email already exists
      const arr = data.rows;
    //3. if user exist, then throw an error
      if (arr.length != 0) {
        return res.status(401).json({
          error: "Email already there, No need to register again.",
          success: false
        });
      }
      else {
    //4. Bcrypt the user password (verschlüssel das Passwort)
        bcrypt.hash(password, 10, (err, hash) => {
          if (err)
            res.status(err).json({
              error: "Error encrypting pwd",
              success: false
            });
          const user = { nickname, email, password: hash, };
  
    //5. insert the new user and his data into the database
          client
            .query(`INSERT INTO users (nickname, email, password, profiletext) VALUES ($1,$2,$3,$4)`, [user.nickname, user.email, user.password, 'Here could stand your welcome text.'], (err) => {
    //6. if insert is failing, throw error
              if (err) {
                console.error(err);
                return res.status(500).json({
                  error: "Database error",
                  success: false
                })
              }
    //7. generate a jwt token with the mail address and show the success
              else {
                const token = jwt.sign( //Signing a jwt token
                  {
                    email: user.email,
                  },
                  process.env.SECRET_KEY
                );
                res.status(200).send({
                  success: true,
                  name: user.nickname,
                  jwt: token,
                });
              }
            })
  
  
  
        });
      }
    }
    catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Database error while registering user!", //Database connection error
        success: false,
  
      });
    };
  };

  //LOGIN ONE USER
  export const login = async (req, res) => {
    //1. destructure req.body
    const { email, password } = req.body;
    try {
      const data = await client.query(`SELECT * FROM users WHERE email = $1;`, [email]) //Verifying if the user exists in the database
      const user = data.rows;
      console.log('user', user);
    //2. check if user exist, if not, then throw error
      if (user.length === 0) {
        res.status(400).json({
          error: "User is not registered, Sign Up first",
          success: false,
        });
      }
    //3. if user exist, then bycrypt and compare password
      else {
        bcrypt.compare(password, user[0].password, (err, result) => { //Comparing the hashed password
    //4. if password doesn't match, then throw error
          if (err) {
            res.status(500).json({
              error: "Server error",
            });
    //5. if password match, then create token and show success
          } else if (result === true) { //Checking if credentials match
            const token = jwt.sign(
              {
                email: email,
                userid: user[0].user_id
              },
              process.env.SECRET_KEY
            );
            res.status(200).json({
              success: true,
              name: user[0].nickname,
  
              token: token,
            });
          }
          else {
            //Declaring the errors
            if (result != true)
              res.status(400).json({
                error: "Enter correct password!",
                success: false,
  
              });
          }
        })
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Database error occurred while signing in!", //Database connection error
        success: false,
  
      });
    };
  };

//CHECK IF USER IS VERIFIED
export const checkVerify = async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error.");
  }
};

export const getProfile = async (req, res) => {
  try {
    /* Wenn du authMiddleware bentutzt:
    console.log("req.payload >>>>", req.payload); */
    /* const data = req.payload.email;
    console.log('data', data);
    console.log('typeof data', typeof data);
    string von der mail */
    /* const data = res.json(req.payload.email);
    console.log('data', data); 
    data shows the mail which is saved inside the token. */


    /* const user = await client.query(`SELECT user_id, email, nickname, picture, profiletext FROM users WHERE email = $1;`, [req.payload.email]); */
    /* console.log('user', user); alle user werden angezeigt */
    /* res.json(user.rows[0]); */

    console.log('req.email', req.email);
    /* shows as an example: req.email katia@mail.de */

    const user = await client.query(`SELECT user_id, email, nickname, picture, profiletext FROM users WHERE email = $1;`, [req.email]);
    res.json(user.rows[0]); 

  } catch (error) {
    console.log('error.message', error.message);
    res.status(500).send("Server Error.");
  }
};

//UPDATE A USER PROFILE
export const updateUser = async (req, res) => {
  try {
    const { nickname, picture, profiletext } = req.body;
    const updateUser = await client.query(`UPDATE users
                                          SET nickname = $1, picture = $2, profiletext = $3
                                          WHERE user_id = $4 RETURNING *`, [nickname, picture, profiletext, req.user.user_id]);
    if(updateUser.rows.length === 0){
      return res.json("This user isn't your profile or the update wasn't successful.");
    }
    res.json("Your profile was updatet.");
  } catch (error) {
    console.log('error.message', error.message);
    res.status(500).send("Server Error. The profile wasn't updatet.");
  }
}