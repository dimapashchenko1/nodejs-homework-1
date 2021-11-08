const {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const data = await listContacts();
      console.table(data);
      break;

    case "get":
      const contact = await getContactById(parseInt(id));
      console.table(contact);
      break;

    case "add":
      const addResult = await addContact(name, email, phone);
      addResult && console.table(addResult);
      break;

    case "remove":
      const removeResult = await removeContact(parseInt(id));
      removeResult && console.table(removeResult);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
