import prisma from "../../../lib/db";
import getHandler from "../../../lib/handlers";
import nc from "next-connect";
import isAuth from "../../../middleware/auth";
import { questionSchema, validation } from "../../../utils/validator";

const auth = nc().post("/api/questions", isAuth);

export default getHandler()
  .use(auth)
  .get(async (req, res, next) => {
    try {
      const questions = await prisma.question.findMany({
        select: {
          id: true,
          question: true,
          user: { select: { username: true } },
          userId: true,
          answers: { select: { id: true, answer: true, isCorrect: true } },
        },
      });
      res.status(200).json({ status: "success", data: questions });
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    const { errors } = await validation(questionSchema, req.body);

    if (errors) {
      res.status(400).json({ status: "error", message: errors[0] });
      return;
    }

    try {
      const { question, answers } = req.body;
      const newQuestion = await prisma.question.create({
        data: {
          question,
          answers: { create: answers },
          user: {
            connect: { email: req.user.email },
          },
        },
      });

      res.status(200).json({ status: "success", data: newQuestion });
    } catch (error) {
      next(error);
    }
  });
