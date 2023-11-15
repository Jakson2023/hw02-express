import * as contactService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import {
  contactsAddSchema,
  contactsUpdateSchema,
} from "../schemas/contacts-schema.js";

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
      throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const result = await contactService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { error } = contactsUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    console.log(req.body);
    const result = await contactService.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found?`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactService.removeContact(id);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found?`);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};


export default {
  getAllContacts,
  getContactById,
  add,
  updateById,
  deleteById,
};
