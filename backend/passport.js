import passportGithub from "passport-github2"
import passport from "passport";
const GithubStrategy = passportGithub.Strategy;

const GITHUB_CLIENT_ID = "Ov23liEu6uW2IVkI2GEb";
const GITHUB_CLIENT_SECRET = "04a59e9ac1bd81592edb50575dd06ac4d1d4c40a";

passport.use(
    new GithubStrategy(
        {
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: "/api/Auth/github/callback",
        },
        function (accessToken, refreshToken, profile, done) {

            done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});