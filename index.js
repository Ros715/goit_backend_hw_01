const argv = require("yargs").argv;
const dbOperations = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  try {
    var contacts;
    switch (action) {
      case "list":
        contacts = await dbOperations.listContacts();
        console.table(contacts);
        break;

      case "get":
        const selectedContact = await dbOperations.getContactById(id);
        console.table(selectedContact);
        break;

      case "add":
        const addedContact = await dbOperations.addContact(name, email, phone);
        console.log("added contact:");
        console.table(addedContact);
        contacts = await dbOperations.listContacts();
        console.log("list after adding:");
        console.table(contacts);
        break;

      case "remove":
        const removedContact = await dbOperations.removeContact(id);
        console.log("removed contact:");
        console.table(removedContact);
        contacts = await dbOperations.listContacts();
        console.log("list after removal:");
        console.table(contacts);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log(error.message);
  }
}

invokeAction(argv);
