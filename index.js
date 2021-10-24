/*
npm install --save yargs
npm init -y   (creates package.json)
  "scripts": {
    "start": "node index",
    "start:dev": "nodemon index"
  "dependencies": {
    "uuid": "^8.3.2"
  }
yarn add nodemon -D  //or  npm install --save-dev nodemon
BogdanLyamzin/32-nodejs
yarn      (or npm i)

node index.js --action list
node index.js --action get --id 5
node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22
node index.js --action remove --id=3

https://imgbb.com/    (MariiaRos / rosm0099@gmail.com / 123456)
https://ibb.co/pzn4cVM   (list,get)
https://ibb.co/Df547dm   (add)
https://ibb.co/3WR05f9   (remove)

https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax
*/

const dbOperations = require("./db/contacts");
const argv = require("yargs").argv;

//async function testStep3() {
//   console.log("\ntest of the function listContacts");
//   const contacts = await dbOperations.listContacts();
//   console.table(contacts);
//
//   console.log('\ntest of the function getContactById("5")');
//   const selectedContact = await dbOperations.getContactById("5");
//   console.table(selectedContact);
//
//   console.log('\ntest of the function removeContact("5")');
//   const removedContact = await dbOperations.removeContact("5");
//   console.log("removed contact:");
//   console.table(removedContact);
//   const contacts = await dbOperations.listContacts();
//   console.log("list after removal:");
//   console.table(contacts);
//
//   console.log(
//     '\ntest of the function addContact("John Brown","johnbrown@mail.com","(123) 456 789")'
//   );
//   const addedContact = await dbOperations.addContact(
//     "John Brown",
//     "johnbrown@mail.com",
//     "(123) 456 789"
//   );
//   console.log("added contact:");
//   console.table(addedContact);
//   const contacts = await dbOperations.listContacts();
//   console.log("list after adding:");
//   console.table(contacts);
//}
//testStep3();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      (async () => {
        const contacts = await dbOperations.listContacts();
        console.table(contacts);
      })();
      break;

    case "get":
      (async () => {
        const selectedContact = await dbOperations.getContactById(id);
        console.table(selectedContact);
      })();
      break;

    case "add":
      (async () => {
        const addedContact = await dbOperations.addContact(name, email, phone);
        console.log("added contact:");
        console.table(addedContact);
        const contacts = await dbOperations.listContacts();
        console.log("list after adding:");
        console.table(contacts);
      })();
      break;

    case "remove":
      (async () => {
        const removedContact = await dbOperations.removeContact(id);
        console.log("removed contact:");
        console.table(removedContact);
        const contacts = await dbOperations.listContacts();
        console.log("list after removal:");
        console.table(contacts);
      })();
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
