
import Home from './pages/Home';
import ChangeForm from './pages/ChangeForm';
import Form from './pages/PostForm';
import { Route, Routes } from 'react-router-dom';
import Detail from './pages/Detail';
import Scroll from './components/main/Scroll';

function App() {
  return (
    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/changeform/:id' element={<ChangeForm />} />
      <Route path='/write' element={<Form />} />
      <Route path='/detail/:id' element={<Detail />} />
      <Route path='/scroll' element={<Scroll />} />
    </Routes>
  );
}

export default App;
