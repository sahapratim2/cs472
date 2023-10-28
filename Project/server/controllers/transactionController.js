let Transaction = require('../models/transaction')
let controller = {
    getTransactions: function (req, res, next) {
        const token = req.get("Authorization");
        if (token) {
            let accountNumber = parseInt(req.params.accountNumber);
            let transaction = Transaction.getTransactions(accountNumber)
            if (transaction) {
                res.status(200).json(transaction);
            }
            else {
                res.status(404).json({ message: "There are  no Transactions" });
            }
        }
        else {
            res.status(401).json({ message: "Unauthorized Access" });
        }
    },
    createTransaction: function (req, res, next) {
        const token = req.get("Authorization");
        if (token) {
            let { accountNumber, transactionDate, amount, remark, type, toAccount } = req.body;
            if (accountNumber && transactionDate && amount && type) {
                let newTransaction;
                let balance = 0;
                amount = parseFloat(amount);
                if (amount == 0) {
                    res.status(406).json({ message: "invalid Amount" });
                    return;
                }
                else if (type == 'withdraw') {
                    balance = Transaction.getBalance(accountNumber);
                    if (parseFloat(balance) - amount < 0) {
                        res.status(406).json({ message: "You have not suffcient Balance!!!" });
                        return;
                    }
                    else {
                        amount = parseFloat(amount) * (-1);
                    }

                }
                else if (type == 'transfer') {
                    if (toAccount) {
                        balance = Transaction.getBalance(accountNumber);
                        if (parseFloat(balance) - amount < 0) {
                            res.status(406).json({ message: "You have not suffcient Balance!!!" });
                            return;
                        }

                        newTransaction = new Transaction(toAccount, transactionDate, amount, remark);
                        amount = parseFloat(amount) * (-1);
                        newTransaction.create();
                    }
                    else {
                        res.status(406).json({ message: "invalid Banificiary" });
                        return;
                    }
                }
                newTransaction = new Transaction(accountNumber, transactionDate, amount, remark);
                balance = newTransaction.create();
                res.status(201).json({ message: balance });
            }
            else {
                res.status(400).json({ message: "Please Provide All Data" });
            }
        }
        else {
            res.status(401).json({ message: "Unauthorized Access" });
        }
    },


}

module.exports = controller;