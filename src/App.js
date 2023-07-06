
import Header from './components/Header';
import './App.scss';
import TableUser from './components/TableUser';
import ModalsAddNew from './components/ModalsAddNew';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
function App() {

  const [isShowModals, setShowModals] = useState(false)

  const handleClose = () =>{
    setShowModals(false)
  }
  return (
    <div className='container'>
        
        <Header />
        <Container>
          <div className='my-4 add-new'>
            <span className='List-user'>List Users</span>
            <button className='btn btn-success' onClick={()=>{setShowModals(true)}}>Add User</button>
          </div>
        <TableUser />
        </Container>
        <ModalsAddNew
        show = {isShowModals}
        handleClose = {handleClose}
        />
    

    </div>
  );
}

export default App;
