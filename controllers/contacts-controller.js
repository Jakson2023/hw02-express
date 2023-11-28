import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import {
  contactsAddSchema,
  contactsUpdateSchema,
  contactsFavoriteSchema,
} from "../models/Contact.js";

const getAllContacts = async (req, res, next) => {
  try {
    const {_id: owner} = req.user;
    const result = await Contact.find({owner});
  
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {_id: owner} = req.user;
    const result = await Contact.findById({_id:id, owner});
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
    const {_id:owner} = req.user;
    const result = await Contact.create({...req.body, owner});
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
    const {_id: owner} = req.user;
    const result = await Contact.findOneAndUpdate({_id:id, owner}, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found?`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = contactsFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);
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
    const {_id: owner} = req.user;
    const result = await Contact.findOneAndDelete({_id: id, owner});
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
  updateStatusContact,
  deleteById,
};
