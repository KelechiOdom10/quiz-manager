import getHandler from "../../../lib/handlers";
import isAuth from "../../../middleware/auth";
import prisma from "../../../lib/db";
import nc from "next-connect";

const auth = nc()
  .put("/api/questions/:id", isAuth)
  .delete("/api/questions/:id", isAuth);

export default getHandler()
  .use(auth)
  .get(async (req, res, next) => {
    const { id } = req.query;
    try {
      const question = await prisma.question.findUnique({
        where: { id: Number(id) },
        select: {
          question: true,
          userId: true,
          answers: { select: { id: true, answer: true, isCorrect: true } },
        },
      });
      res.status(200).json({ status: "success", data: question });
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    const { id } = req.query;
    try {
      const result = await prisma.$executeRaw`DELETE FROM public."Question" WHERE id=${Number(
        id
      )} AND "userId" = ${Number(req.user.id)}`;

      if (result !== 1) {
        res.status(403).json({
          status: "error",
          message: "Not authorized to delete this question",
        });
        return;
      }

      res.status(200).json({
        status: "success",
        data: {},
      });
    } catch (error) {
      next(error);
    }
  });
