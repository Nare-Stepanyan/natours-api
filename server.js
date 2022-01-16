import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import mongoose from 'mongoose';
import app from './app.js';

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true
  })
  .then(con => console.log('DB connection successful'));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
