// models/Coffee.js
import mongoose from "mongoose";

const coffeeSchema = new mongoose.Schema({
  month: String,
  data: [
    {
      date: [String],
      salary: Number,
      expenses: Number,
      cashCollection: Number,
      paid: Number,
      comment: [
        {
          // _id: String,
          operation: String,
          amount: Number,
          text: String,
          date: String,
        },
      ],
      accrued: Number,
      remaining: Number,
    },
  ],
});

const Coffee = mongoose.model("Coffee", coffeeSchema);

export default Coffee;
