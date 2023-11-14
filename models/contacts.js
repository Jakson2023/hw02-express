// const fs = require('fs/promises')
import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve ('models', 'contacts.json');


export const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

export const getContactById = async (id) => {

  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  console.log(contacts);
  return result || null;


}

// const removeContact = async (contactId) => {}

export const addContact = async ({ name, email, phone }) => {


  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;

  
}
 


// const updateContact = async (contactId, body) => {}

// export default {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
