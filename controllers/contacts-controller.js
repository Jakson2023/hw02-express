import * as contactService from "../models/contacts.js";
import {HttpError} from "../helpers/index.js"

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactService.getContactById(id);
    if (!result) {
      
      throw HttpError (404, `Contact with id=${id} not found`);
      
    }
    res.json(result);
  } catch (error) {
   next(error);
  }
};

const add = async (req, res, next) => {
  try {
    
    const result = await contactService.addContact(req.body);
    res.status (201).json (result);
    }
  
   catch (error) {
   next(error);
  }
};

export default {
  getAllContacts,
  getContactById,
  add,
};
