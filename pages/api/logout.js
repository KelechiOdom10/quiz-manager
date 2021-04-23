import cookie from "cookie";
import getHandler from "../../lib/handlers";

const isProduction = process.env.NODE_ENV === "production";

export default getHandler().post(async (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth", "", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "strict",
      expires: new Date(0),
      path: "/",
    })
  );
  res
    .status(200)
    .json({ status: "success", message: "Logged out successfully!" });
});
