import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../service/userService";
import ReactPaginate from "react-paginate";
import ModalsAddNew from "./ModalsAddNew";
import ModalEditUser from "./ModalsEditUser";
import ModalsConfirm from "./ModalsConfirm";
import { CSVLink, CSVDownload } from "react-csv";

import "./TableUser.scss";
import _, { debounce } from "lodash";
const TableUser = (props) => {
  const [listUsers, setListUsers] = useState([]);
  //const [totalUsers , setTotalUsers] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [isShowModals, setShowModals] = useState(false);
  const [isShowEditModals, setShowEditModal] = useState(false);

  const [dataUserEdit, setDataUserEdit] = useState({});

  const [isShowModalDelete, setShowModalDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});

  const [sortBy, setSortBy] = useState("");
  const [fieldSortBy, setFieldSortBy] = useState("id");

  const [dataExport, setDataExport] = useState([]);

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

  const handleSort = (sortBy, fieldSortBy) => {
    setSortBy(sortBy);
    setFieldSortBy(fieldSortBy);
    let cloneListUser = _.cloneDeep(listUsers);
    cloneListUser = _.orderBy(cloneListUser, [fieldSortBy], [sortBy]);
    setListUsers(cloneListUser);
  };

  const handleSearch = debounce((event) => {
    let search = event.target.value;
    if (search) {
      let cloneListUser = _.cloneDeep(listUsers);
      cloneListUser = cloneListUser.filter((item) =>
        item.email.includes(search)
      );
      setListUsers(cloneListUser);
    } else {
      getUser(1);
    }
  }, 500);

  const getUsersExport = (event, done) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(["Id", "Email", "First Name", "Last Name"]);
      listUsers.map((item) => {
        let arr = [];

        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;

        result.push(arr);
      });

      setDataExport(result);
      done();
    }
  };

  return (
    <>
      <div className="my-4 add-new">
        <span className="List-user">Thông tin người dùng</span>
        <div className="group-btns">
          <label htmlFor="Import" className="btn btn-primary">
            <i class="fa-sharp fa-solid fa-upload"></i> Import
          </label>
          <input type="file" id="Import" hidden />
          <CSVLink
            data={dataExport}
            filename={"my-file.csv"}
            asyncOnClick={true}
            onClick={getUsersExport}
            className="btn btn-warning"
          >
            <i className="fa-solid fa-file-export"></i> Export
          </CSVLink>
          <button
            className="btn btn-success"
            onClick={() => {
              setShowModals(true);
            }}
          >
            <i class="fa-solid fa-circle-plus"></i> Thêm mới
          </button>
        </div>
      </div>
      <div className="my-3 ">
        <input
          className="searchControl col-4"
          placeholder="Nhập Email..."
          onChange={(event) => handleSearch(event)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          {/* "id": 1,
      "email": "george.bluth@reqres.in",
      "first_name": "George",
      "last_name": "Bluth",
      "avatar": "https://reqres.in/img/faces/1-image.jpg" */}
          <tr className="style-header">
            <th>
              <div className="sort-header">
                <span>STT</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className="sort-header">
                <span>FirstName</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSort("desc", "first_name")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSort("asc", "first_name")}
                  ></i>
                </span>
              </div>
            </th>
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
            <i className="fa fa-arrow-left" aria-hidden="true" />
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
