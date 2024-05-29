import { Button } from 'react-bootstrap';
import { TProduct } from '../interface/TProduct'
import { Link } from 'react-router-dom';

type Props = {
  products: TProduct[];
  onDel: (id:number) => void
}

const Shop = ({products, onDel}: Props) => {
  return (
    <div>
      <table className="table table-bordered table-stripped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th><Link to={`/Add`} className='btn btn-outline-info '>Add</Link></th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td><Button variant='outline-danger' onClick={() => onDel(Number(item.id))}>Delete</Button>
              <Link to={`/Edit/${item.id}`} className='btn btn-outline-danger'>Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Shop