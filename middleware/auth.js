import jwt from "jsonwebtoken";
import prisma from "../lib/db";

const isAuth = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.auth) {
    token = req.cookies.auth;
  }

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Not authorized to access this route",
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "The user belonging to this token no longer exist.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: error.message,
    });
  }
};

export default isAuth;
