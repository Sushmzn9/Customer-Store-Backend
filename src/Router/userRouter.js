import express from "express";
import { comparePassword, hashPassword } from "../helper/bcrypt.js";
import {
  getUserByEmail,
  getUserDisplay,
  insertUser,
  updateUser,
  updateUserById,
} from "../Modal/User/userModel.js";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import {
  accountVerificationEmail,
  accountVerifiedNotification,
} from "../helper/nodemailer.js";
import { createAcessJWT, createRefreshJWT } from "../helper/jwt.js";
import { auth, refreshAuth } from "../authMiddleware/auth.js";
import { deleteSession } from "../Session/SessionModel.js";

router.get("/", auth, async (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "here is the user info",
      user: req.userInfo,
    });
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = hashPassword(password);

    req.body.verificationCode = uuidv4();
    const result = await insertUser(req.body);

    if (result?._id) {
      res.json({
        status: "success",
        message: "user created",
      });
      const link = `${process.env.WEB_DOMAIN}/user-verification?c=${result.verificationCode}&e=${result.email}`;
      await accountVerificationEmail({
        fName: result.fName,
        email: result.email,
        link,
      });
      return;
    }
    res.json({
      status: "error",
      message: "Unable to add new admin, Please try agian later",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      //   error.statusCode = 401;
      error.message =
        " This email is already used by Another Admin, Use different email or reset your password";
    }
    next(error);
  }
});

router.post("/user-verification", async (req, res, next) => {
  try {
    const { c, e } = req.body;
    const filter = {
      email: e,
      verificationCode: c,
    };
    const updateObj = {
      isVerified: true,
      verificationCode: "",
    };
    const result = await updateUser(filter, updateObj);

    if (result?._id) {
      await accountVerifiedNotification(result);
      res.json({
        status: "success",
        message: "Your account has been verified, you may login now!",
      });

      return;
    }
    res.json({
      status: "error",
      message: "Link is expired or invalid!",
    });
  } catch (error) {
    next(error);
  }
});
router.post("/sign-in", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //find the user by email

    const user = await getUserByEmail({ email });
    if (user?._id) {
      //check the password
      const isMatched = comparePassword(password, user.password);

      if (isMatched) {
        //create 2 jwts:

        const accessJWT = await createAcessJWT(email);
        const refreshJWT = await createRefreshJWT(email);
        console.log(accessJWT);
        // create accessJWT and store in session table: short live 15m
        ///create refreshJWT and store with user data in user table: long live 30d

        return res.json({
          status: "success",
          message: "logined successfully",
          token: { accessJWT, refreshJWT },
        });
      }
    }

    // return the jwts
    res.json({
      status: "error",
      message: "Invalid login details",
    });
  } catch (error) {
    next(error);
  }

  // return the refreshJWT
  router.get("/get-accessjwt", refreshAuth);

  //logout
  router.post("/logout", async (req, res, next) => {
    try {
      const { accessJWT, refreshJWT, _id } = req.body;

      accessJWT && deleteSession(accessJWT);

      if (refreshJWT && _id) {
        const dt = await updateUserById({ _id, refreshJWT: "" });
      }

      res.json({
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  });
});

export default router;
