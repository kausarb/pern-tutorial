import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DeleteTodoConfirm = ({ item, handleTodoDeleted }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const deleteItem = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/delete-todo/${item.todo_id}`
      );
      if (response.status === 200) {
        handleTodoDeleted(item.todo_id);
        toast.success(response?.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <button className="btn btn-danger" onClick={toggleModal}>
        Delete
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
                <h5 className="modal-title">Delete Item</h5>
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
                <p>Are you sure you want to delete?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={(e) => deleteItem(e)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
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

export default DeleteTodoConfirm;
