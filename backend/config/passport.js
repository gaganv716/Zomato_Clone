    import passport from "passport";
    import { Strategy as GoogleStrategy } from "passport-google-oauth20";
    import dotenv from "dotenv";
    import User from "../models/userModel.js";

    // IMPORTANT: Only call dotenv.config() if not in a production environment like Render.
    // Render automatically injects environment variables into process.env.
    // Running dotenv.config() in production might cause issues if a .env file isn't present.
    if (process.env.NODE_ENV !== 'production') {
      dotenv.config();
    }

    // Define the backend base URL.
    // It will use process.env.BACKEND_URL if available (from Render's environment variables or local .env),
    // otherwise, it defaults to http://localhost:5000 for local development.
    const BACKEND_BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

    // Construct the full Google OAuth callback URL using the defined base URL.
    const googleCallbackURL = `${BACKEND_BASE_URL}/api/auth/google/callback`;

    // Log the constructed URL for debugging. This message will appear in Render's logs.
    console.log(`Google OAuth Callback URL being used: ${googleCallbackURL}`);

    // Use Google OAuth Strategy
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: googleCallbackURL, // Use the dynamically constructed URL
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails[0].value;

            let user = await User.findOne({ email });

            // If user not found, create a new one
            if (!user) {
              user = await User.create({
                email,
                password: "google-oauth", // dummy password or null
              });
            }

            return done(null, user);
          } catch (err) {
            return done(err, null);
          }
        }
      )
    );

    // Optional: serialize/deserialize if using sessions (not needed for JWT-based auth)
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
      const user = await User.findById(id);
      done(null, user);
    });
    