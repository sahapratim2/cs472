
function askPassword(ok, fail){
  let password =prompt("Password?",'');
  if(password=="rockstar") ok();
  else fail();
}
let user={
  name: 'john',
  loginOk(){
    alert(`${this.name} logged in`);
    //console.log(`Hello, ${this.name}!`)
  },
  loginFail(){
    alert(`${this.name} failed to log in`);
  },
};

askPassword(user.loginOk.bind(user),user.loginFail.bind(user));
//askPassword(()=>user.loginOk.call(user),()=>user.loginFail.call(user));
//askPassword(()=>user.loginOk.apply(user),()=>user.loginFail.apply(user));
//askPassword(function() {user.loginOk();} ,function() {user.loginFail()});

let group = { 
              title: "Our Group", 
              students: ["John", "Pete", "Alice"], 
              showList: function() { 
                this.students.forEach(function(student) { console.log(this.title + ": " + student); }.bind(this)); 
              } 
            }; 
group.showList();

