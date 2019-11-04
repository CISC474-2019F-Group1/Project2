import bcrypt from "bcryptjs";
import crypto from "crypto";
import express from "express";
import {STATUS_CODES} from "http";
import jwt from "jsonwebtoken";
import mongodb from "mongodb";
import {Config} from "./config";
import {IUser} from "./user";

function generateToken(userInfo: any) {
    return jwt.sign(userInfo, Config.secret, {
        expiresIn: 10000 // Seconds
    });
}

function comparePassword(userPassword: string, candidatePassword: string, cb: (err: Error, isMatch?: boolean) => void) {
    if (userPassword === "*") {
        cb(null, false);
        return;
    }
    bcrypt.compare(candidatePassword, userPassword, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
}

function extractUserInfo(user: any) {
    // TODO
    return {
        email: user.email,
        user: user.name
    };
}

function hashPassword(password: string, cb: (err: Error, hashedPassword?: string) => any) {
    const SALT_FACTOR = 5;

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
<<<<<<< HEAD
        if (err) { return cb(err); }

        bcrypt.hash(password, salt, function(err, hash) {
            if (err) { return cb(err); }
=======
        if (err) { return err; }

        bcrypt.hash(password, salt, function(err, hash) {
            if (err) { return err; }
>>>>>>> b43fb8d6dca0d8fa633eb54d6b0112626888660d
            cb(null, hash);
        });
    });
}

export class AuthenticationController {

    public register(req: express.Request, res: express.Response, next: express.NextFunction) {
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;

        if (!email) {
            return res.status(422).send({ error: "You must enter an email address." });
        }
        if (!name) {
            return res.status(422).send({ error: "You must enter your full name." });
        }
        if (!password) {
            return res.status(422).send({ error: "You must enter a password." });
        }

        mongodb.connect(Config.database, function(err, db) {
            if (err) {throw err; }
            const Users = db.db("trainsDB").collection("Users");
            Users.findOne({ email: req.body.email }, function(err, existingUser) {
                if (err) {
                    db.close();
                    return next(err);
                }
                if (existingUser) {
                    db.close();
                    return res.status(422).send({ error: "That email address is already in use." });
                } else {
                    hashPassword(password, function(err, hashedPassword) {
                        if (err) { throw err; }
                        const user = {
                            email,
                            password: hashedPassword,
                            name
                        };
                        console.log(user);
                        Users.insertOne(user, function(err, dbres) {
                            if (err) { throw err; }
                            console.log(dbres.ops[0]);
                            const userInfo = extractUserInfo(dbres.ops[0]);
                            res.status(201).json({
                                token: "JWT " + generateToken(userInfo),
                                user: userInfo
                            });
                            db.close();
                        });
                    });
                }
            });
        });
    }

    public login(req: express.Request, res: express.Response, next: express.NextFunction) {
        mongodb.connect(Config.database, function(err, db) {
            if (err) { throw err; }
            const Users = db.db("trainsDB").collection("Users");
            Users.findOne({ email: req.body.email }, function(err, user) {
                if (err) {
                    db.close();
                    return res.status(400).json({ error: "bad data" });
                }
                if (!user) {
                    db.close();
                    return res.status(400).json({ 
                        error: "Your login details could not be verified. Please try again."
                    });
                }
                comparePassword(user.password, req.body.password, function(err, isMatch) {
                    if (err) { return res.status(400).json({ error: "bad data" }); }
                    if (!isMatch) { return res.status(400).json({ error: "Your login details could not be verified. Please try again." }); }

                    const userInfo = extractUserInfo(user);
                    res.status(200).json({
                        token: "Bearer " + generateToken(userInfo),
                        user: userInfo
                    });
                });
                db.close();
            });
        });
    }

    public authorize(req: express.Request, res: express.Response, next: express.NextFunction) {
        return res.status(200).json({
            validated: true
        });
    }

}
