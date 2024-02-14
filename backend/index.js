const path = require('path');
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const uploadRoutes = require('./routes/uploadeRoutes');

const port = process.env.PORT || 5000;
// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/uploads', uploadRoutes);
app.use('/api/v1/clients', clientRoutes);
app.use('/api/v1/invoices', invoiceRoutes);

//-------------------------------------
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
