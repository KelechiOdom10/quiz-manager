import bcrypt from "bcrypt";
import cookie from "cookie";
import getHandler from "../../lib/handlers";
import prisma from "../../lib/db";
import { loginSchema, validation } from "../../utils/validator";
import generateToken from "../../utils/jwtGenerator";

const isProduction = process.env.NODE_ENV === "production";

export default getHandler().post(async (req, res, next) => {
  const { email, password } = req.body;

  const { errors } = await validation(loginSchema, req.body);
  if (errors) {
    const message = errors[0];
    res.status(400).json({ status: "error", message });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({
        status: "error",
        message: "User doesn't exist. Please create a new account!",
      });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      res.status(400).json({
        status: "error",
        message: "Invalid credentials",
      });
      return;
    }

    const token = generateToken({ id: user.id });
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "strict",
        maxAge: 604800, // 7 days
        path: "/",
      })
    );

    res.status(200).json({
      status: "success",
      message: "Logged in successfully!",
      data: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    next(error);
  }
});
