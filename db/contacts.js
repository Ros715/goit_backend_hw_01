const fs = require("fs/promises"); //or ("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

/*
Function: listContacts
Parameters: none
Return: a list of contacts [{id,name,email,phone},...]
*/
async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

/*
Function: getContactById
Parameters: id (string or number)
Return: selected contact {id,name,email,phone} or null
*/
async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(
    (item) => item.id.toString() === contactId.toString()
  );
  if (!result) return null;
  return result;
}

/*
Function: removeContact
Parameters: id (string or number)
Return: removed contact {id,name,email,phone} or null
Removes the selected contact from data base.
*/
async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(
    (item) => item.id.toString() === contactId.toString()
  );
  if (idx < 0) return null;
  const removedContact = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
}

/*
Function: addContact
Parameters: name,email,phone  (strings)
Return: added contact {id,name,email,phone} or null
Generates a unique id for the added contact.
Adds the selected contact to data base.
*/
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: v4() };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
