import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TProduct } from '../interface/TProduct'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { useParams } from 'react-router-dom'
import instance from '../api/instance'

type Props = {
  onSubmit: (product : TProduct) => void
}
const ProductSchema = Joi.object({
  title : Joi.string().required(),
  price: Joi.number().required().min(0),
  description: Joi.string().required()
})
const EditProduct = ({onSubmit}: Props) => {
  const {id} = useParams()
  const [product, setProduct] = useState<TProduct | null >(null)
  useEffect(() =>{
    (async() => {
      const {data} = await instance.get(`products/${id}`)
      setProduct(data)
    }) ()
  }, [])
  const {register, handleSubmit, formState: {errors}} = useForm<TProduct>({
    resolver: joiResolver(ProductSchema)
  })
  const onEdit = (product: TProduct) =>{
    onSubmit({...product, id})
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onEdit)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" {...register("title", {required: true})}
          defaultValue={product?.title}
          />
          {errors.title && (<div className='text-danger'>{errors.title.message}</div>)}
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="number" {...register("price", {required: true, min: 0})}
          defaultValue={product?.price}
          />
          {errors.price && (<div className='text-danger'>{errors.price.message}</div>)}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" {...register("description", {required: true})}
          defaultValue={product?.description}          
          />
          {errors.description && (<div className='text-danger'>{errors.description.message}</div>)}
        </div>
      </form>
    </div>
  )
}

export default EditProduct