import getHandler from "../../../lib/handlers";
import nc from "next-connect";
import isAuth from "../../../middleware/auth";

const auth = nc().get("/api/user/me", isAuth);

export default getHandler()
  .use(auth)
  .get(async (req, res, next) => {
    try {
      const user = req.user;
      if (!user) {
        res.status(401).json({
          status: "error",
          message: "Please Log in first!",
        });
      }

      res.status(200).json({
        status: "success",
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  });
