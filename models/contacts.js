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

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {}

// export default {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
