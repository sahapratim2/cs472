let transactions = [];

class Transaction {
    constructor(accountNumber, transactionDate, amount, remark) {
        this.id=0;
        this.accountNumber = accountNumber;
        this.transactionDate = transactionDate;
        this.amount = parseFloat(amount);
        this.remark = remark;
    }
    create() {
            this.id=transactions.length+1;
            transactions.push(this);
            return getBalanceAmount(this.accountNumber);
    }
    static getTransactions(accountNumber) {
        return transactions.filter(trn => trn.accountNumber == accountNumber);
    }
    static getBalance(accountNumber) {
        return getBalanceAmount(accountNumber);
    } 
    static getMyAccountBalance(accounts) {
       return accounts.map((ac) => {
            let balance=getBalanceAmount(ac.accountNumber);
            return {"accountNumber":ac.accountNumber, "accountType":ac.accountType, "balance":balance } ;
        });
    } 
}
 function getBalanceAmount(accountNumber) {
    return transactions.filter(trn => trn.accountNumber == accountNumber).reduce((s,ac)=> s+parseFloat(ac.amount),0);
} 

module.exports=Transaction;