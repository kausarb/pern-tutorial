import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditTodo = ({ todo }) => {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState(todo.description);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await axios.put(
        `http://localhost:5000/update-todo/${todo.todo_id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("response", response);
        setShowModal(false);
        toast.success(response?.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={toggleModal}>
        Edit
      </button>

      {showModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Item</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={toggleModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={(e) => updateDescription(e)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTodo;
