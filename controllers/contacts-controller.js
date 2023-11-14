import * as contactService from '../models/contacts.js';

const getAllContacts = async (req, res, next) => {

    try {
        const result = await contactService.listContacts();
    res.json(result)
    } catch (error) {
       res.status(500).json({message: error.message}) 
    }
    
  }

  export default {
    getAllContacts,

  }