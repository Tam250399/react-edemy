import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../service/userService";
import ReactPaginate from "react-paginate";
import ModalsAddNew from "./ModalsAddNew";
import ModalEditUser from "./ModalsEditUser";
import ModalsConfirm from "./ModalsConfirm";
import _ from "lodash";
const TableUser = (props) => {
  const [listUsers, setListUsers] = useState([]);
  //const [totalUsers , setTotalUsers] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [isShowModals, setShowModals] = useState(false);
  const [isShowEditModals, setShowEditModal] = useState(false);

  const [dataUserEdit, setDataUserEdit] = useState({});

  const [isShowModalDelete, setShowModalDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});

  const handleClose = () => {
    setShowModals(false);
    setShowEditModal(false);
    setShowModalDelete(false);
  };

  const handUpadateUser = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handleUpdateTable = (user) => {
    let cloneListUser = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUser[index].first_name = user.first_name;
    cloneListUser[index].last_name = user.last_name;

    console.log("====================================");
    console.log(user);
    console.log("====================================");
    setListUsers(cloneListUser);
  };

  useEffect(() => {
    getUser(1);
  }, []);

  const getUser = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      console.log(res);
      // setTotalUsers(res.total)
      setTotalPage(res.total_pages);
      setListUsers(res.data);
    }
  };
  console.log(totalPage);
  const handlePageClick = (event) => {
    getUser(+event.selected + 1);
  };

  const handleEditUser = (user) => {
    setShowEditModal(true);
    setDataUserEdit(user);
  };

  const handleDeleteUser = (user) => {
    setShowModalDelete(true);
    setDataUserDelete(user);
  };

  const handleDeleteModal = (user) => {
    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser = cloneListUser.filter((item) => item.id !== user.id);

    setListUsers(cloneListUser);
  };

  return (
    <>
      <div className="my-4 add-new">
        <span className="List-user">Thông tin người dùng</span>
        <button
          className="btn btn-success"
          onClick={() => {
            setShowModals(true);
          }}
        >
          Thêm mới
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          {/* "id": 1,
      "email": "george.bluth@reqres.in",
      "first_name": "George",
      "last_name": "Bluth",
      "avatar": "https://reqres.in/img/faces/1-image.jpg" */}
          <tr className="style-header">
            <th>STT</th>
            <th>Email</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => handleEditUser(item)}
                    >
                      Sửa
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger mx-4"
                      onClick={() => handleDeleteUser(item)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Trước >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPage}
        previousLabel={
          <div>
            <i class="fa fa-arrow-left" aria-hidden="true" />
            Sau
          </div>
        }
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalsAddNew
        show={isShowModals}
        handleClose={handleClose}
        handUpadateUser={handUpadateUser}
      />
      <ModalEditUser
        show={isShowEditModals}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalsConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteModal={handleDeleteModal}
      />
    </>
  );
};

export default TableUser;
