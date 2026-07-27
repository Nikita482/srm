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
          type: {
            type: String,
          },
          amount: {
            type: Number,
          },
          text: {
            type: String,
          },
        },
      ],
      accrued: Number,
      remaining: Number,
    },
  ],
});

const Coffee = mongoose.model("Coffee", coffeeSchema);

export default Coffee;
