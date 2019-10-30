import passport from "passport";
import mongodb from "mongodb";
import {Config} from "./config";
import {User} from "./user";
import {Strategy as JwtStrategy, ExtractJwt} from "passport-jwt";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Config.secret
};

// Setting up JWT login strategy
const JWTLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    mongodb.connect(Config.database, function(err, db) {
        if (err) { throw err; }
        const Users = db.db("trainsDB").collection("Users");
        console.log(payload);
        Users.findOne({ email: payload.email }, function(err, user) {
            if (err) { 
                db.close();
                return done(err, false);
            }
            
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
            db.close();
        });
    });

});

passport.use(JWTLogin);

export namespace PassportService {
    export const requireAuth = passport.authenticate('jwt', { session: false });
}