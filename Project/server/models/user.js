let users = [
    {
        userId: 1,
        firstName: 'Partha',
        middleName: 'Pratim',
        lastName: 'Saha',
        fullName: 'Partha Pratim Saha',
        ssn: '0000',
        phoneNumber: '1234567890',
        email: 'psaha@miu.edu.org',
        address: '100 Nth Street',
        userName: 'admin',
        password: 'miu',
        isAdmin: true
    }
];

class User {
    constructor(firstName, middleName, lastName, ssn, phoneNumber, email, address, userName, password,isAdmin) {
        this.userId = '';
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.fullName = (this.firstName + " " + this.middleName + " " + this.lastName).replace("  ", " "),
        this.ssn = ssn;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
        this.userName = userName;
        this.password = password;
        this.isAdmin=isAdmin;
    }
    create() {
        let user = getUserByUserName(this.userName);
        if (!user) {
            this.userId = users.length + 1;
            users.push(this);
            return this;
        }
    }
    update(userId) {
        let user = getUser(userId);
        if (user) {
            let tmpUser = users.find(u => user.userName != '' && u.userName == user.userName && u.userId != user.userId);
            if (!tmpUser) {
                user.firstName = this.firstName;
                user.middleName = this.middleName;
                user.lastName = this.lastName;
                user.ssn = this.ssn;
                user.phoneNumber = this.phoneNumber;
                user.email = this.email;
                user.address = this.address;
                user.userName = this.userName;
                user.password = this.password;
                user.isAdmin=this.isAdmin;
                return user;
            }
        }
    }
    static delete(userId) {
        let index = users.findIndex(acc => acc.userId == userId && acc.isAdmin!=true);
        if (index >= 0) {
            let user = users[index];
            users.splice(index, 1);
            return user;
        }
    }
    static getAllUsers() {
        return users;
    }
    static getSelectedUsers(userArray) {
        return users.filter(u => userArray.includes("" + u.userId));
    }
    static getUserByUserId(userId) {
        return getUser(userId);
    }
    static getUserByParameter(param, value) {
        return users.find(usr => {
            switch (param) {
                case 'Name':
                    return usr.fullName.toLowerCase().includes(value.toLowerCase())
                case 'Phone':
                    return usr.phoneNumber.includes(value)
                case 'Email':
                    return usr.email.toLowerCase().includes(value.toLowerCase())
                case 'User':
                    return usr.userName.toLowerCase().includes(value.toLowerCase())
            }
        });
    }
    static login(userName, password) {
        let user = users.find(u => u.userName === userName && u.password === password);
        if (user) {
            let authUser = [
                {
                    userId: user.userId,
                    fullName: user.fullName,
                    userName: user.userName,
                    isAdmin: user.isAdmin
                }
            ]
            delete authUser.password;
            let message = {
                token: new Date().getTime(),
                user: authUser
            }
            return message;
        }
        return false;
    }
}
function getUser(userId,) {
    return users.find(usr => usr.userId == userId);
}
function getUserByUserName(userName) {
    return users.find(usr => usr.userName == userName);
}

module.exports = User;