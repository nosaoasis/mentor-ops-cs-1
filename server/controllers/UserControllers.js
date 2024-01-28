/*
  * The behaviour of the code does not match what is expected. DEBUG
==========================================================================================
  * It fails to verify the Email passed in the request
  * It does not encrypt the password
  * It is unable to register a new user
  * It does not insert the user confirmation details not delete user details when required.
*/

const {
  verifyEmailModel,
  regsiterNewUserModel,
  enterUserEmailConfirmDetails,
  deleteUserDetailsModel,
} = require("../models/UserModels");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const registerUserController = async (req, res) => {
  let emailTrim = req.body.email.trim();
  req.body = { ...req.body, email: emailTrim };
  let { gen_id, email, password } = req.body;

  const verifyEmail = verifyEmailModel(email);
  if (verifyEmail.length > 0) {
    return res.status(422).json({ message: "Unable to register user" });
  }

  const encryptPasswordSalt = bcrypt.genSalt(10);
  req.body.password = bcrypt.hash(password, encryptPasswordSalt);

  const registerUser = regsiterNewUserModel(req.body);
  if (registerUser.length < 1) {
    return res.status(406).json({ message: "Unable to register user" });
  }

  const pnUserConfirmEmailID = gen_id;
  const userUUID = crypto.randomBytes(23).toString("hex");
  const q = crypto.randomBytes(23).toString("hex");
  const c = crypto.randomBytes(23).toString("hex");

  const enterEmailConfirmDetails = enterUserEmailConfirmDetails(
    pnUserConfirmEmailID,
    userUUID,
    q,
    c
  );
  if (enterEmailConfirmDetails.length < 1) {
    const deleteUserDetails = deleteUserDetailsModel(email);
    if (deleteUserDetails === undefined) {
      return res.status(500).json({ message: "Server Error" });
    }
    return res.status(406).json({ message: "Unable to register user" });
  }

  res.status(200).json({
    message: "User successfully registered",
    data: { user: null, token: null },
  });
};

module.exports = {
  registerUserController,
};
