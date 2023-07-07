import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../service/userService";
import ReactPaginate from "react-paginate";
import ModalsAddNew from "./ModalsAddNew";
const TableUser = (props) => {
  const [listUsers, setListUsers] = useState([]);
  // const [totalUsers , setTotalUsers] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  const [isShowModals, setShowModals] = useState(false);

  const handleClose = () => {
    setShowModals(false);
  };

  const handUpadateUser = (user) => {
    setListUsers([user, ...listUsers]);
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

  return (
    <>
      <div className="my-4 add-new">
        <span className="List-user">List Users</span>
        <button
          className="btn btn-success"
          onClick={() => {
            setShowModals(true);
          }}
        >
          Add User
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
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPage}
        previousLabel="< previous"
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
    </>
  );
};

export default TableUser;
