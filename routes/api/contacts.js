// const express = require('express')
import express from 'express';
import contactsController from '../../controllers/contacts-controller.js';

const contactsRouter = express.Router()

contactsRouter.get('/',contactsController.getAllContacts)

// contactsRouter.get('/:id', async (req, res, next) => {

//   const result = await contactService.getContactById()
//   res.json(result)

// })

contactsRouter.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

contactsRouter.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

contactsRouter.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

export default contactsRouter
