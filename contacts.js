const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const filter = contacts.filter((contact) => contact.id === contactId);
  return filter;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const filterContactsId = contacts.filter(
    (contact) => contact.id !== contactId
  );
  if (contacts.length === filterContactsId.length) {
    console.log(`Id${contactId} is not found`);
    return;
  }
  await fs.writeFile(contactsPath, JSON.stringify(filterContactsId), "utf-8");
  console.log(`Contact with id${contactId} removed`);
  return filterContactsId;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newId = contacts.length + 1;
  const newContact = { id: newId, name, email, phone };

  if (contacts.id !== newId) {
    switch (undefined) {
      case name:
        console.log(`Please enter a name`);
        break;

      case email:
        console.log(`Please enter a email`);
        break;
      case phone:
        console.log(`Please enter a phone`);
        break;
      default:
        await fs.writeFile(
          contactsPath,
          JSON.stringify([...contacts, newContact]),
          "utf8"
        );
        console.log("New contact added");
        return newContact;
    }
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
