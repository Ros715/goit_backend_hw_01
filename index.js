/*
node index.js --action list
node index.js --action get --id 5
node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22
node index.js --action remove --id=3
*/

const dbOperations = require("./db/contacts");
const argv = require("yargs").argv;

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
