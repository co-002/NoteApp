import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaShareAlt } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

function Notes() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isCreatingNewNote: true,
    noteId: "",
  });
  const [shareData, setShareData] = useState({
    noteId: "",
    email: "",
    permission: "read",
  });
  const {
    isLoggedIn,
    allNotes,
    isLoading,
    deleteNote,
    createNote,
    updateNote,
    shareNote,
  } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/login");
    }
  }, [isLoading, isLoggedIn, allNotes]);

  const onChangeHandler = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formData.isCreatingNewNote) {
      await createNote(formData);
    } else {
      await updateNote(formData);
    }
    setFormData({
      title: "",
      content: "",
      isCreatingNewNote: true,
    });
  };
  const handleShareSubmit = async (e) => {
    e.preventDefault();
    await shareNote(shareData);
    setShareData({ noteId: "", email: "", permission: "read" });
  };

  const editForm = (note) => {
    setFormData({
      title: note.title,
      content: note.content,
      isCreatingNewNote: false,
      noteId: note._id,
    });
  };

  return (
    <div className="container mt-4 ">
      <div className="row">
        {allNotes &&
          allNotes.map((note, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="note-card card p-3">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.content}</p>
                <div className="d-flex justify-content-end gap-3 mt-3">
                  <FaEdit
                    role="button"
                    title="Edit note"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => editForm(note)}
                  />
                  <FaTrash
                    role="button"
                    title="Delete"
                    onClick={() => deleteNote(note._id)}
                  />
                  <FaShareAlt
                    role="button"
                    title="Share"
                    data-bs-toggle="modal"
                    data-bs-target="#shareModal"
                    onClick={() =>
                      setShareData({ ...shareData, noteId: note._id })
                    }
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      <CiCirclePlus
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "100px",
          height: "100px",
          padding: "10px",
          cursor: "pointer",
        }}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        role="button"
        title="Add Note"
      />

      {/* Modal for adding new note */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="login-page">
                <form className="login-form" onSubmit={submitHandler}>
                  <h2 className="heading-text">Add Note</h2>

                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={onChangeHandler}
                      className="form-control"
                      placeholder="Enter name"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Content
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      rows={5}
                      value={formData.content}
                      onChange={onChangeHandler}
                      className="form-control"
                      placeholder="Content"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Add Note
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal For Sharing note */}
      <div
        className="modal fade"
        id="shareModal"
        tabIndex="-1"
        aria-labelledby="shareModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Share Note</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleShareSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={shareData.email}
                    onChange={(e) =>
                      setShareData({ ...shareData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Permission</label>
                  <select
                    className="form-select"
                    value={shareData.permission}
                    onChange={(e) =>
                      setShareData({ ...shareData, permission: e.target.value })
                    }
                  >
                    <option value="read">Read</option>
                    <option value="write">Write</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Share
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;
