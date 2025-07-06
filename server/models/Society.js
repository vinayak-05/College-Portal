import mongoose from "mongoose";

const societySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  type: String, // tech, cultural, etc.
  members: [String], // optional
  joinLink: String,  // ← new field: Google Form link
});


export default mongoose.model("Society", societySchema);
