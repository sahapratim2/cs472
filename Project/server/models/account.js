let accounts = [];

class Account {
    constructor(accountNumber, accountType, userId) {
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.userId = userId;
       }
    create() {
        let account = getAccount(this.accountNumber);
        if (!account) {
            accounts.push(this);
            return this;
        }
    }
    update() {
        let account = getAccount(this.accountNumber);
        if (account) {
            account.accountType = this.accountType;
            account.userId = this.userId;
            return account;
        }
    }
    static delete(accountNumber) {
        let index = accounts.findIndex(acc=>acc.accountNumber==accountNumber);
        if (index>=0) {
            let account=accounts[index];
            accounts.splice(index,1);
            return account;
        }
    }
    static getAll() {
        return accounts;
    }
    static getAccountByAccountNumber(accountNumber) {
        return getAccount(accountNumber);
    }

    static getAccountByUserId(userId) {
        return accounts.filter(acc => acc.userId == userId);
    }
    static getOtherUserAccount(userId) {
        return accounts.filter(acc => acc.userId != userId);
    }

}
function getAccount(accountNumber) {
    return accounts.find(acc => acc.accountNumber == accountNumber);
}

module.exports=Account;