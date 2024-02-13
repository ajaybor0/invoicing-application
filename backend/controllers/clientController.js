const Client = require('../models/clientModel');

// @desc     Create client
// @method   POST
// @endpoint /api/clients
// @access   Private
const createClient = async (req, res, next) => {
  try {
    const { name, email, phone, picture } = req.body;

    const clientExists = await Client.findOne({ email });

    if (clientExists) {
      res.statusCode = 409;
      throw new Error('Client already exists.');
    }

    const client = new Client({
      userId: req.user._id,
      name,
      email,
      phone,
      picture
    });
    const createdClient = await client.save();

    res.status(201).json({ message: 'client created', createdClient });
  } catch (error) {
    next(error);
  }
};

// @desc     Get clients
// @method   GET
// @endpoint /api/clients
// @access   Private
const getClients = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const clients = await Client.find({ userId });

    if (!clients || clients.length === 0) {
      res.statusCode = 404;
      throw new Error('No clients found!');
    }
    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
};

module.exports = { createClient, getClients };
