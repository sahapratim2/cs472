let Account = require('../models/account')
let User = require('../models/user')
let Transaction = require('../models/transaction')
let controller = {
    getAccountByAccountNumber: function (req, res, next) {
        const token = req.get("Authorization");
        if (token) {
            let accountNumber = parseInt(req.params.accountNumber);
            let account = Account.getAccountByAccountNumber(accountNumber)
            if (account) {
                res.status(200).json(account);
            }
            else {
                res.status(404).json({ message: "Account not Found" });
            }
        }
        else {
            res.status(401).json({ message: "Unauthorized Access" });
        }
    },
    getAccountByUserId: function (req, res, next) {
        const token = req.get("Authorization");
        if (token) {
            let userId = parseInt(req.params.userId);
            let account = Account.getAccountByUserId(userId)
            if (account) {
                res.status(200).json(account);
            }
            else {
                res.status(404).json({ message: "Account not Found" });
            }
        }
        else {
            res.status(401).json({ message: "Unauthorized Access" });
        }
    },
    getBanificiary: function (req, res, next) {
        const token = req.get("Authorization");
        if (token) {
            let userId = parseInt(req.params.userId);
            let account = Account.getOtherUserAccount(userId);
            let user = User.getSelectedUsers(account.map(a => a.userId));
            let accounts = account.map((ac, index, array) => {
                let fullName = user.find(u => u.userId == ac.userId).fullName;
                return { "accountNumber": ac.accountNumber, "accountType": ac.accountType, "fullName": fullName };
            });
            if (accounts) {
                res.status(200).json(accounts);
            }
            else {
                res.status(404).json({ message: "Account not Found" });
            }
        }
        else {
            res.status(401).json({ message: "Unauthorized Access" });
        }
    },
    getAll: function (req, res, next) {
        const token = req.get("Authorization");
        if (token) {
            let account = Account.getAll();
            let user = User.getAllUsers();
            let accounts = account.map((ac, index, array) => {
                let fullName = user.find(u => u.userId == ac.userId).fullName;
                return { "accountNumber": ac.accountNumber, "accountType": ac.accountType, "fullName": fullName };
            });
            if (accounts) {
                res.status(200).json(accounts);
            }
            else {
                res.status(404).json({ message: "Account not Found" });
            }
        }
        else {
            res.status(401).json({ message: "Unauthorized Access" });
        }
    },
    getMyBalance: function (req, res, next) {
        const token = req.get("Authorization");
        if (token) {
            let userId = parseInt(req.params.userId);
            let accounts = Account.getAccountByUserId(userId)
            if (accounts != null && accounts.length > 0) {
                let accountbalance = Transaction.getMyAccountBalance(accounts);
                if (accountbalance) {
                    res.status(200).json(accountbalance);
                }
            }
        }
        else {
            res.status(401).json({ message: "Unauthorized Access" });
        }
    },
    createAccount: function (req, res, next) {
        const token = req.get("Authorization");
        if (token) {
            let { accountNumber, accountType, userId } = req.body;
            if (accountNumber && accountType && userId) {
                let newAccount = new Account(accountNumber, accountType, userId);
                let account = newAccount.create();
                     if (account) {
                    res.status(201).json(account);
                }
                else {
                    res.status(400).json({ message: "Account already Exists!!" });
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

    deleteAccount: function (req, res, next) {
        const token = req.get("Authorization");
        if (token) {
            let accountNumber = parseInt(req.params.accountNumber);
            let account = Account.delete(accountNumber)
            if (account) {
                res.status(200).json(account);
            }
            else {
                res.status(404).json({ message: "Account not Found" });
            }
        }
        else {
            res.status(401).json({ message: "Unauthorized Access" });
        }
    },
    updateAccount: function (req, res, next) {
        const token = req.get("Authorization");
        if (token) {
            let accNo = req.params.accountNumber;
            let { accountNumber, accountType, userId } = req.body;
            if (accountNumber && accountType && userId) {
                let account = new Account(accNo, accountType, userId);
                res.status(201).json(account.update());
            }
            else {
                res.status(400).json({ message: "No such Account Found" });
            }
        }
        else {
            res.status(401).json({ message: "Unauthorized Access" });
        }
    }

}

module.exports = controller;