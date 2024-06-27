import Signup from './pages/signup';
import './App.css'
import Login from './pages/login';
import Home from './pages/home';
import ForgotPassword from './pages/forgotPassword';
import MyProducts from './pages/myProduct';
import Product from './pages/product';
import NewProduct from './pages/newProduct';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Home />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/my-products/:user' element={<MyProducts />} />
      <Route path='/product/:id' element={<Product />} />
      <Route path='/new-product/:user' element={<NewProduct />} />
    </Routes>
  )
}

export default App;
