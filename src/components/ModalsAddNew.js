import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../service/userService";
import { toast } from "react-toastify";
const Modals = (props) => {
  const { show, handleClose, handUpadateUser } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);
    // if (name === "" || job === "") {
    //   handleClose();
    //   setName("");
    //   setJob("");
    //   return toast.error("Chưa nhập user và job ");
    // }

    if (res && res.id) {
      handleClose();
      setName("");
      setJob("");
      toast.success("Lưu thành công");
      handUpadateUser({
        email: job,
        first_name: name,
        id: res.id,
      });
    } else {
      handleClose();
      toast.error("Lưu không thành công");
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <div className="mb-3">
              <label className="form-label">User</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên "
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Job</label>
              <input
                type="text"
                placeholder="job"
                className="form-control"
                value={job}
                onChange={(event) => setJob(event.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Modals;
