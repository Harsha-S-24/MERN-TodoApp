require('dotenv').config();
const mongoose = require('mongoose');

console.log('Database URL:', process.env.DATABASE_URL); // This should print the URL from your .env file

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Database connected!'))
.catch(err => console.log('Database connection error:', err));
