
import Header from './components/Header';
import './App.scss';
import TableUser from './components/TableUser';
import { Container } from 'react-bootstrap';
function App() {
  return (
    <div className='container'>
   
        <Header />
        <Container>
        <TableUser />
        </Container>
     
    

    </div>
  );
}

export default App;
