const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
      // return res.status(404).json({
      //   message: "Not found",
      // });
    }
    res.json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({
      message,
    });
    // res.status(500).json({
    //   message: "",
    // });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      const error = new Error("Data has wrong format");
      error.status = 400;
      throw error;
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
    res.json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({
      message,
    });
    // res.status(500).json({
    //   message: "",
    // });
  }
});

router.delete("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
      // return res.status(404).json({
      //   message: "Not found",
      // });
    }
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({
      message,
    });
    // res.status(500).json({
    //   message: "",
    // });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      const error = new Error("Data has wrong format");
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
      // return res.status(404).json({
      //   message: "Not found",
      // });
    }
    res.json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({
      message,
    });
    // res.status(500).json({
    //   message: "",
    // });
  }
});

module.exports = router;
