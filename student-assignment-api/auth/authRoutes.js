import express from "express";
import passport from "./passport.js";

const router = express.Router();

// Start GitHub OAuth login
router.get(
    "/github",
    passport.authenticate("github", {
        scope: ["user:email"]
    })
);

// GitHub OAuth callback
router.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/auth/login-failed"
    }),
    (req, res) => {
        res.status(200).json({
            message: "Authentication successful.",
            user: req.user
        });
    }
);

// Check current authentication status
router.get("/status", (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({
            authenticated: true,
            user: req.user
        });
    }

    res.status(401).json({
        authenticated: false,
        message: "User is not authenticated."
    });
});

// Logout
router.get("/logout", (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error);
        }

        req.session.destroy((sessionError) => {
            if (sessionError) {
                return next(sessionError);
            }

            res.status(200).json({
                message: "Logout successful."
            });
        });
    });
});

// OAuth failure
router.get("/login-failed", (req, res) => {
    res.status(401).json({
        message: "GitHub authentication failed."
    });
});

export default router;