import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  },
  price: {
    type: Number,
    default: 4.5
  },
  rating: {
    type: Number,
    required: [true, 'A tour must have a rating']
  }
});

const Tour = mongoose.model('Tour', tourSchema);

export default Tour;
