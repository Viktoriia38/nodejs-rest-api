const contacts = require("../models/index");

const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  //   try {
  const result = await contacts.listContacts();
  res.json(result);
  //   } catch (error) {
  //     next(error);
  //     // res.status(500).json({
  //     //   message: "Server error",
  //     // });
  //   }
};

const getContactById = async (req, res, next) => {
  //   try {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpError(404, "Not found");
    // return res.status(404).json({
    //   message: "Not found",
    // });
  }
  res.json(result);
  //   } catch (error) {
  //     next(error);
  //     // res.status(500).json({
  //     //   messthrowge: "Server error",
  //     // });
  //   }
};

const addContact = async (req, res, next) => {
  //   try {

  const result = await contacts.addContact(req.body);
  console.log(req.body);
  res.status(201).json(result);
  //   } catch (error) {
  //     next(error);
  //   }
};

const removeContact = async (req, res, next) => {
  //   try {
  const { id } = res.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "Contact deleted",
  });
  //   } catch (error) {
  //     next(error);
  //   }
};

const updateContact = async (req, res, next) => {
  //   try {

  const { id } = res.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
  //   } catch (error) {
  //     next(error);
  //     // res.status(500).json({
  //     //   message: "Server error",
  //     // });
  //   }
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
};
