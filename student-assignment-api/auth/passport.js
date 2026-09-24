import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { connectToDatabase } from "../config/db.js";

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const db = await connectToDatabase();
                const users = db.collection("users");

                const existingUser = await users.findOne({
                    githubId: profile.id
                });

                if (existingUser) {
                    return done(null, existingUser);
                }

                const newUser = {
                    githubId: profile.id,
                    username: profile.username,
                    displayName: profile.displayName,
                    email:
                        profile.emails && profile.emails.length > 0
                            ? profile.emails[0].value
                            : null,
                    avatar:
                        profile.photos && profile.photos.length > 0
                            ? profile.photos[0].value
                            : null,
                    createdAt: new Date()
                };

                const result = await users.insertOne(newUser);

                newUser._id = result.insertedId;

                return done(null, newUser);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
    try {
        const db = await connectToDatabase();
        const users = db.collection("users");

        const user = await users.findOne({
            _id: new (await import("mongodb")).ObjectId(id)
        });

        if (!user) {
            return done(null, false);
        }

        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;