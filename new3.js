const tester =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function isAllLetters(char) {
  if (typeof char !== "string") {
    return false;
  }

  return /^[a-zA-Z]+$/.test(char);
}

const user = {
  firstName: "John",
  lastName: "Doe",
  username: "johndoe",
  age: 42,
  email: "john@doe.com",
};

const obj = new Proxy(user, {
  get: (target, prop) => {
    return `${new Date()} | The value of ${prop} is ${target[prop]}`;
  },
  set: (target, prop, value) => {
    if (prop == "username") {
      if (value.length > 2 && isAllLetters(value)) {
        return (target[prop] = value);
      }
    }
    if (prop == "email" && tester.test(value)) {
      target[prop] = value;
      console.log("yop");
      return true;
    }
    if (prop == "age" && age >= 18) {
      target[prop] = value;
      return;
    }
    return false;
  },
});

obj.remember = "Wo are you";
delete obj.firstName;
console.log(obj);
console.log(user);
