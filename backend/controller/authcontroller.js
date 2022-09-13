const jwt = require("jsonwebtoken");
const User = require("../model/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
const ServiceSID = process.env.ServiceSID;
const AccountSID = process.env.AccountSID;
const authToken = process.env.authToken;
const client = require("twilio")(AccountSID, authToken);
const register = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(404).json("this email is already taken");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });
    const user = await newUser.save();
    if (user) {
      res.status(200).json({
        _id: user.id,
        name: user.username,
        email: user.email,
        role: user.role,
        phone: user.phone,
        token: generateToken(user._id),
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("user not found");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong password");
    res.status(200).json({
      _id: user.id,
      name: user.username,
      email: user.email,
      role: user.role,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const checkEmail = async (req, res) => {
  try {
    // check exsting user
    console.log(req.body);

    const exstingMail = await User.findOne({ email: req.body.email });
    const exstingName = await User.findOne({ username: req.body.name });
    if (exstingMail) {
      console.log("exist email");
      res.status(200).json("emailExist");
    } else if (exstingName) {
      console.log("exist name");
      res.status(200).json("nameExist");
    } else {
      res.status(200).json("noUser");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
const otpValidation = async (req, res) => {
  try {
    client.verify.services(ServiceSID).verifications.create({
      to: `+91${req.body.phone}`,
      channel: "sms",
    });
    console.log("otp send");

    res.status(200).json("success");
  } catch (err) {
    console.log("eroor");
    res.status(500).json(err);
  }
};
const otpConfirmation = async (req, res) => {
  try {
    console.log("confirm");
    // console.log(req.body);
    console.log(req.body.phone, req.body.otp);
    client.verify
      .services(ServiceSID)
      .verificationChecks.create({
        to: `+91${req.body.phone}`,
        code: req.body.otp,
      })
      .then((response) => {
        console.log(response);
        if (response.valid) {
          console.log("otp validated");
          res.status(200).json("otpConfirmed");
        } else {
          console.log("otp failed");
          res.status(500).json("confirmation failed");
        }
      });
  } catch (err) {
    console.log("error");
    res.status(500).json(err);
  }
};
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = {
  register,
  otpValidation,
  checkEmail,
  login,
  otpConfirmation,
};
