import { Note } from "../models/note.js";
import { User } from "../models/user.js";
import mongoose from "mongoose";

const create = async (req, res) => {
  try {
    const { title, content } = req.body;
    const user = req.user;

    let note = await Note.findOne({ title, createdBy: user._id });
    if (note) {
      return res.send({
        success: false,
        message: "Note already present",
      });
    }
    note = new Note({
      title,
      content,
      createdBy: user._id,
      collaborators: [
        {
          userId: user._id,
          permission: "write",
        },
      ],
    });
    await note.save();
    res.send({
      success: true,
      message: "Note saved",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const allNotes = async (req, res) => {
  try {
    const allNotes = await Note.find({
      $or: [
        { createdBy: req.user._id },
        { collaborators: { $elemMatch: { userId: req.user._id } } },
      ],
    });
    res.send({
      success: true,
      message: "All accessible notes retrieved",
      notes: allNotes,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const noteId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.send({
        success: false,
        message: "Invalid note Id",
      });
    }

    let note = await Note.findById(noteId);
    if (!note) {
      return res.send({
        success: false,
        message: "Note not found",
      });
    }

    const isOwner = note.createdBy.toString() === req.user._id.toString();
    const isCollaborator = note.collaborators.some(
      (collabUser) =>
        collabUser.userId.toString() === req.user._id.toString() &&
        collabUser.permission === "write"
    );

    if (!isOwner && !isCollaborator) {
      return res.send({
        success: false,
        message: "You don't have permission to edit this note",
      });
    }

    note.title = title;
    note.content = content;
    note.lastUpdated = new Date();

    await note.save();

    res.send({
      success: true,
      message: "Note updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    
    let note = await Note.findById(noteId);
    if (!note) {
      return res.send({
        success: false,
        message: "Note not found",
      });
    }
    if (note.createdBy.toString() !== req.user._id.toString()) {
      return res.send({
        success: false,
        message: "Only owner of the note can delete",
      });
    }
    await Note.findByIdAndDelete(noteId);
    res.send({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const shareNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { email, permission } = req.body;
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.send({
        success: false,
        message: "Invalid note ID",
      });
    }
    if (!["read", "write"].includes(permission)) {
      return res.send({
        success: false,
        message: "Invalid permission",
      });
    }
    let note = await Note.findById(noteId);
    if (!note) {
      return res.send({
        success: false,
        message: "Note not found",
      });
    }
    if (note.createdBy.toString() !== req.user._id.toString()) {
      return res.send({
        success: false,
        message: "Only owner of the note can share",
      });
    }
    let collabUser = await User.findOne({ email });
    if (!collabUser) {
      return res.send({
        success: false,
        message: "User to share not found",
      });
    }
    const alreadyShared = note.collaborators.find(
      (collab) => collab.userId.toString() === collabUser._id.toString()
    );
    if (alreadyShared) {
      return res.send({
        success: false,
        message: "User already has permission",
      });
    }
    note.collaborators.push({ userId: collabUser._id, permission });
    await note.save();
    res.send({
      success: true,
      message: `Shared permission with ${email} as ${permission}`,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

export { create, allNotes, updateNote, deleteNote, shareNote };
