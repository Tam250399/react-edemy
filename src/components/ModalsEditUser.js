import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { putUpdateUser } from "../service/userService";
import { toast } from "react-toastify";
const ModalEditUser = (props) => {
  const { show, handleClose, dataUserEdit, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const handleEditUser = async () => {
    let res = await putUpdateUser(name, job);

    if (res && res.updatedAt) {
      handleUpdateTable({
        first_name: name,
        last_name: job,
        id: dataUserEdit.id,
      });

      handleClose();
      toast.success("Sửa thành công");
    }
  };

  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name);
      setJob(dataUserEdit.last_name);
    }
  }, [dataUserEdit]);

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sửa người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <div className="mb-3">
              <label className="form-label">Tên người dùng</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên "
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Biệt danh </label>
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
            Hủy
          </Button>
          <Button variant="primary" onClick={() => handleEditUser()}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalEditUser;
