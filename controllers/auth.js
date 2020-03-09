const User = require('../models/user');
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');

exports.signUp = (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;

        bcrypt.hash(password, 10)
            .then(hashedPw => {
                const user = new User(email, hashedPw, name);
                user.signUp()
                    .then(response => {
                        res.status(200).json({ message: "User Signed Up Successfully", user: response.ops[0] })
                    })
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            })
    }
    /************************************************************************************************* */
exports.Login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findUserByEmail(email)
        .then(user => {
            if (!user) {
                const error = new Error("Email Cannot Be Found, Check Your Input");
                error.stausCode = 401;
                throw error;
            }

            bcrypt.compare(password, user.password)
                .then(Equal => {
                    if (!Equal) {
                        const error = new Error("Wrong Password");
                        error.stausCode = 401;
                        throw error;
                    }
                    const token = Jwt.sign({ email: email, userId: user._id.toString(), creatorName: user.name }
                        , "ManyPostsManyPostsManyPosts", {
                            expiresIn: "1h"
                        })

                    res.status(201).json({ message: "User Signed In Successfully", token: token });
                })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}