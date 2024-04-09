import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch,useSelector } from 'react-redux'
import { login as authLogin, } from '../store/authSlice'
import { Input } from './ui/input';
import { Button } from './ui/button'
import axios from 'axios'

function LoginComponent() {
  
  const url = import.meta.env.VITE_URL

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {register,handleSubmit} = useForm()
  const [error,setError] = useState("")

  const submitHandler = async(data)=>{
    console.log(data);

    const formData = new FormData();

    // formData.append("username",data.username)
    // formData.append("fullName",data.fullName)
    formData.append("email",data.email)
    formData.append("password",data.password)
    // formData.append("avatar",data.avatar[0])
    // formData.append("coverImage",data.coverImage[0])

    console.log(formData);

    const res = await axios.post(`${url}/users/login`,{
        email: data.email,
        password: data.password
    },{
      withCredentials: true
    })

    // const resp = await res.json();
    console.log(res.data.data.user);
    const userData = res.data.data.user;
    const token = {
      _id: userData._id,
      username: userData.username,
      email: userData.email,
      fullName: userData.fullName,
      avatar: userData.avatar,
      coverImage: userData.coverImage,
    }

    localStorage.setItem('token',JSON.stringify(token));
    localStorage.setItem('status',true);

    dispatch(authLogin({userData: res.data.data.user}))

    // const authStatus = useSelector(state=>state.auth.status)
    // console.log(authStatus);

    navigate('/')

    // console.log(resp);



  }

  return (
    <div className=' w-[100%] border-2 border-zinc-400 p-8 rounded-md'>
        <div className=' flex flex-col gap-2'>

          <div className=' mt-4 mb-2'>
            <span>
              {/* <Logo/> */}
            </span>
          </div>

          <h2 className=' font-bold  text-[1.7rem]'>
            Log in to your Account
          </h2>
          

          <form onSubmit={handleSubmit(submitHandler)} >
            <div className=" flex flex-wrap flex-col items-center m-2 p-2">
              <Input
                label="Email: "
                placeholder = "Enter your Email"
                type = "email"
                {...register("email",{
                  required: true,
                  validate: {
                    matchPattern: (value) =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                  }
                })}
              />
              <Input
                label= "Password: "
                type= "password"
                placeholder="Enter your password"
                {...register("password",{
                  required:true,
                })}
              />

              <Button
                type="submit"
                className=' mt-4 hover:scale-[110%] hover:shadow-lg hover:shadow-zinc-500/30 duration-300 '
              >Log in</Button>

            </div>
          </form>

          {error && <p className=' text-red-400 duration-500'>{error}</p>}

          {/* <SocialSignin/> */}


          <p>
            Don&apos;t have any Account?&nbsp;
            <Link
              className=' text-blue-500 hover:underline duration-300'
              to="/signup"
            >
              Sign up
            </Link>
          </p>

        </div>
    </div>
  )
}

export default LoginComponent