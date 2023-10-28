let User = require('../models/user')
let Account = require('../models/account')
let controller = {
    getAllUsers: function (req, res, next) {
        const token = req.get("Authorization");
        if (token) {
            res.status(200).json(User.getAllUsers());
        }
        else {
            res.status(401).json({ message: "Unauthorized Access" });
        }

    },
    getUserByUserId: function (req, res, next) {
        const token = req.get("Authorization");
        if (token) {
            let userId = parseInt(req.params.userId);
            let user = User.getUserByUserId(userId)
            if (user) {
                res.status(200).json(user);
            }
            else {
                res.status(404).json({ message: "User not Found" });
            }
        }
        else {
            res.status(401).json({ message: "Unauthorized Access" });
        }
    },
    getUser: function (req, res, next) {

        let { userName, password } = req.body;
        let user = User.login(userName, password)
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(403).json({ message: "Invalid username or password!" });
        }

    },
    getUserByParameter: function (req, res, next) {
        const token = req.get("Authorization");
        if (token) {
            let param = req.query.param;
            let value = req.query.value;
            let user = User.getUserByParameter(param, value);
            if (user) {
                res.status(200).json(user);
            }
            else {
                res.status(404).json({ message: "User not Found" });
            }
        }
        else {
            res.status(401).json({ message: "Unauthorized Access" });
        }
    },
    createUser: function (req, res, next) {

        const token = req.get("Authorization");
        if (token) {
            let { firstName, middleName, lastName, ssn, phoneNumber, email, address, userName, password, isAdmin } = req.body;
            if (firstName && phoneNumber && email) {
                let newUser = new User(firstName, middleName, lastName, ssn, phoneNumber, email, address, userName, password, isAdmin);
                let user = newUser.create();
                if (user) {
                    res.status(201).json(user);
                }
                else {
                    res.status(400).json({ message: "User Name already Exists!!" });
                }

            }
            else {
                res.status(400).json({ message: "Please Provide All Data" });
            }
        }
        else {
            res.status(401).json({ message: "Unauthorized Access" });
        }
    },

    updateUser: function (req, res, next) {
        const token = req.get("Authorization");
        if (token) {
            let userId = req.params.userId;
            let { firstName, middleName, lastName, ssn, phoneNumber, email, address, userName, password, isAdmin } = req.body;
            if (userId && firstName && phoneNumber && email) {
                let updateUser = new User(firstName, middleName, lastName, ssn, phoneNumber, email, address, userName, password, isAdmin);
                let user = updateUser.update(userId)

                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(400).json({ message: "User Name already Exists!!" });
                }



            }
        }
        else {
            res.status(401).json({ message: "Unauthorized Access" });
        }
    },
    deleteUser: function (req, res, next) {
        const token = req.get("Authorization");
        if (token) {
            let userId = parseInt(req.params.userId);
            let accounts = Account.getAccountByUserId(userId);
            if (!accounts || accounts.length == 0) {
                let user = User.delete(userId)
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(404).json({ message: "You can Not delete Admin user!!!" });
                }
            }
            else {
                res.status(400).json({ message: "The User has Bank Account(s)!" });
            }
        }
        else {
            res.status(401).json({ message: "Unauthorized Access" });
        }
    }

}

module.exports = controller;