import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";

const sessionsRouter = Router();

// Ruta de registro con Passport
sessionsRouter.post(
  "/register",
  passport.authenticate("register", { session: false }),
  async (req, res, next) => {
    try {
      return res.json({ statusCode: 201, message: "Registered!" });
    } catch (error) {
      return next(error);
    }
  }
);

// Ruta de login con Passport
sessionsRouter.post(
  "/login",
  passport.authenticate("login", { session: false }),
  async (req, res, next) => {
    try {
      const { user, token } = req.user;
      const redirectUrl = user.role === "admin" ? "/admin" : "/";

      res
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "lax",
          maxAge: 1000 * 60 * 60 * 24, // 1 día
        })
        .json({
          statusCode: 200,
          message: "Logged in!",
          redirectUrl,
        });
    } catch (error) {
      return next(error);
    }
  }
);

// Verificar si el usuario está en línea (basado en token de cookie)
import jwt from "jsonwebtoken";
sessionsRouter.get("/online", async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token", online: false });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Invalid token", online: false });

      return res.status(200).json({
        message: "Is online!",
        user_id: decoded.id,
        role: decoded.role,
        online: true,
      });
    });
  } catch (error) {
    return next(error);
  }
});

// Cerrar sesión
sessionsRouter.post("/signout", (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Signed out!" });
  } catch (error) {
    return next(error);
  }
});

// Login con Google
sessionsRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

sessionsRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    try {
      const { user, token } = req.user;
      res
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "lax",
          maxAge: 1000 * 60 * 60 * 24,
        })
        .redirect("/"); // o redirigí a donde quieras
    } catch (error) {
      return next(error);
    }
  }
);

export default sessionsRouter;
