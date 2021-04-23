import bcrypt from "bcrypt";
import getHandler from "../../lib/handlers";
import prisma from "../../lib/db";
import { registerSchema, validation } from "../../utils/validator";

export default getHandler().post(async (req, res, next) => {
  const { username, email, password } = req.body;

  //error validation
  const { errors } = await validation(registerSchema, req.body);
  if (errors) {
    res.status(400).json({ status: "error", message: errors[0] });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      res.status(400).json({
        status: "error",
        message: "User already exists. Please create a new account!",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Account successfully created!",
    });
  } catch (error) {
    next(error);
  }
});
