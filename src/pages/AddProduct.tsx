import React from 'react'
import { useForm } from 'react-hook-form'
import { TProduct } from '../interface/TProduct'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'

type Props = {
  onSubmit: (product : TProduct) => void
}
const ProductSchema = Joi.object({
  title : Joi.string().required(),
  price: Joi.number().required().min(0),
  description: Joi.string().required()
})
const Addproduct = ({onSubmit}: Props) => {
  const {register, handleSubmit, formState: {errors}} = useForm<TProduct>({
    resolver: joiResolver(ProductSchema)
  })
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" {...register("title", {required: true})}/>
          {errors.title && (<div className='text-danger'>{errors.title.message}</div>)}
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="number" {...register("price", {required: true, min: 0})}/>
          {errors.price && (<div className='text-danger'>{errors.price.message}</div>)}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" {...register("description", {required: true})}/>
          {errors.description && (<div className='text-danger'>{errors.description.message}</div>)}
        </div>
      </form>
    </div>
  )
}

export default Addproduct