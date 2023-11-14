// const express = require('express')
import express from 'express';
import contactsController from '../../controllers/contacts-controller.js';

const contactsRouter = express.Router()

contactsRouter.get('/',contactsController.getAllContacts)

contactsRouter.get('/:id', contactsController.getContactById)

contactsRouter.post('/', contactsController.add)

contactsRouter.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

contactsRouter.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

export default contactsRouter
