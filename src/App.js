
import Main from './pages/Main';
import Detail from './pages/Detail';
import Form from './pages/Form';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/detail/:id' element={<Detail />} />
      <Route path='/write' element={<Form />} />
    </Routes>

  );
}

export default App;
