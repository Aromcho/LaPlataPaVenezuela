import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import usersManager from "../data/mongo/managers/UserManager.mongo.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/jwt.util.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        if (!email || !password) return done(new Error("Email y contraseña requeridos"));
        const userExist = await usersManager.readByEmail(email);
        if (userExist) return done(new Error("Ya existe un usuario con ese email"));

        const hashPassword = createHash(password);
        req.body.password = hashPassword;
        const user = await usersManager.create(req.body);
        const token = createToken({ id: user._id, role: user.role });
        return done(null, { user, token });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await usersManager.readByEmail(email);
        if (!user || !verifyHash(password, user.password)) {
          return done(new Error("Credenciales inválidas"));
        }
        const token = createToken({ id: user._id, role: user.role });
        return done(null, { user, token });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use("google", new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || "https://laplatapavenezuela.com/api/sessions/google/callback",
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value;
      if (!email) return done(new Error("No se encontró email en el perfil"), null);

      let user = await usersManager.readByEmail(email);
      if (!user) {
        user = await usersManager.create({
          email,
          name: profile.displayName,
          password: createHash(profile.id),
          photo: profile.photos?.[0]?.value || ''
        });
      }

      const token = createToken({ id: user._id, role: user.role });
      return done(null, { user, token });
    } catch (error) {
      return done(error);
    }
  }
));

export default passport;
