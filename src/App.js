
import Home from './pages/Home';
import Detail from './pages/Detail';
import Form from './pages/Form';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/detail/:id' element={<Detail />} />
      <Route path='/write' element={<Form />} />
    </Routes>

  );
}

export default App;
