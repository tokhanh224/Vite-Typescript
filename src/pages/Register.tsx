import { useForm } from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import { User } from '../interface/User'
import instance from '../api/instance'
import { useNavigate } from 'react-router-dom'


const UserChema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().required().email({tlds: false})
})
const Register = () => {
  const navigate = useNavigate()
  const {register, handleSubmit, formState:{errors}} = useForm<User>({
    resolver: joiResolver(UserChema)
  })
const onSubmit = (user : User) =>{
(async() =>{
  const {data} = await instance.post(`/register`, user);
  if(data.user){
    const confirmReg = confirm("dang ky thanh cong")
    if(confirmReg){
      navigate("/")
    }
  }
}) ()  
}
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <div className="form-group">
          <label htmlFor="email" className="form-label">email</label>
          <input type="text" className='form-control' {...register("email", {required: true})} />
          {errors.email && (<div className='text-danger'>email is required</div>)}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className='form-control' {...register("password", {required: true, minLength: 6})} />
          {errors.password && (<div className='text-danger'>Password must be greater than or equal to 0</div>)}
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
export default Register