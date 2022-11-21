import bcrypt from "bcrypt";

//salt and hash the password via bcrypt to make the password secure
const encryptPassword = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
  } catch (error) {
    console.log("error hashing password", error);
  }
};

//check if the password insert from the user match with the crypted password from Database
const verifyPassword = async (password, hashedPassord) => {
  const verified = bcrypt.compare(password, hashedPassord);
  console.log("verified :>> ", verified);

  return verified;
};

export { encryptPassword, verifyPassword };