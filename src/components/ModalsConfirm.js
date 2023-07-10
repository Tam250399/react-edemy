import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../service/userService";
import { toast } from "react-toastify";
const Modals = (props) => {
  const { show, handleClose, dataUserDelete, handleDeleteModal } = props;

  const ModalConfirmDelete = async () => {
    let res = await deleteUser(dataUserDelete.id);
    if (res && +res.statusCode === 204) {
      handleDeleteModal(dataUserDelete);
      toast.success("Xóa thành công");
      handleClose();
    } else {
      toast.error("xóa thất bại");
      handleClose();
    }
    console.log(res);
  };

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
          <Modal.Title> Xóa người dùng </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            Email cần xóa : {dataUserDelete.email}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={() => ModalConfirmDelete()}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Modals;
