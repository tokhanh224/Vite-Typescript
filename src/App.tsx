import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { useEffect, useState } from 'react'
import { TProduct } from './interface/TProduct'
import instance from './api/instance'
import Addproduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import Header from './components/Header'
import Register from './pages/Register'
import Login from './pages/Login'
import Shop from './pages/Shop'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
function App() {
  const navigate = useNavigate()
  const [products, setProducts] = useState<TProduct[]>([]);
  useEffect(() =>{
    (async() =>{
      const {data} = await instance.get(`products`)
      setProducts(data)
    }) ()
  }, [])
const DeleteProduct= (id: number) =>{
  (async() =>{
    const confirmDel = confirm("Xoa san pham?")
    if(confirmDel) {
      await instance.delete(`products/${id}`)
      setProducts(products.filter((item) => item.id !== id && item))
      navigate("/")
    }
  }) ()
}
const AddProduct = (product: TProduct) =>{
  (async() =>{
    const {data} = await instance.post(`products`, product)
    setProducts([...products, data])
    navigate("/")
  }) ()
}
const Editproduct = (product: TProduct) =>{
  (async() =>{
    const {data} = await instance.put(`products/${product.id}`, product)
    setProducts(products.map((item) => item.id === data.id ? data: item))
    navigate("/")
  }) ()
}
return (
    <>
    <Routes>
      <Route>
        <Route index element={<><Header/><Shop onDel={DeleteProduct} products={products}/></>}/>
        <Route path='/Add' element={<Addproduct onSubmit={AddProduct}/>}/>
        <Route path='/Edit/:id' element={<EditProduct onSubmit={Editproduct}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>
      </Route>
    </Routes>

    </>
  )
}

export default App
