import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  collaborators: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      permission: {
        type: String,
        unum: ["read", "write"],
        defaul: "read",
      },
    },
  ],
  lastUpdated: { type: Date, default: Date.now },
});

export const Note = mongoose.model("Note", noteSchema);
