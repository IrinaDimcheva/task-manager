import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  return (
    <>
      <Header />
      <Container className='my-4'>
        <Routes>
          <Route path='/' element={<h1>Home</h1>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/tasks' element={<h1>All Tasks</h1>} />
          <Route path='/tasks/new' element={<h1>New Task</h1>} />
          <Route path='/tasks/:id'>
            <Route index element={<h1>Show</h1>} />
            <Route path='edit' element={<h1>Edit</h1>} />
          </Route>
          <Route path='*' element={<Navigate to={'/'} />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
