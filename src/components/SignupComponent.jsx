import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch,useSelector } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import { Input } from './ui/input';
import { Button } from './ui/button'
import axios from "axios"

function SignupComponent() {

  const url = import.meta.env.VITE_URL
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {register,handleSubmit} = useForm()
  const [error,setError] = useState("")
  const avatarRef = useRef(null);

//   const login = async(data)=>{
//     setError("");
//     try {
      
//     } catch (error) {
//       setError(error.message);
//     }
//   }

const submitHandler = async(data)=>{

  console.log(data);

  const formData = new FormData();

  formData.append("username",data.username)
  formData.append("fullName",data.fullName)
  formData.append("email",data.email)
  formData.append("password",data.password)
  formData.append("avatar",data.avatar[0])
  formData.append("coverImage",data.coverImage[0])




  const res = await fetch(`${url}/users/register`,{
    method: "POST",
    body: formData,
    credentials: 'include'
  },{
    headers: {
      "Content-Type": 'multipart/form-data',
    }
  })

  const resp = await res.json();

  console.log(res);
  console.log(resp);



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
            Create your own Account
          </h2>
          

          <form onSubmit={handleSubmit(submitHandler)} encType='multipart/form-data'>
            <div className=" flex flex-row flex-wrap justify-center items-center">
              <div className='flex flex-wrap flex-col items-center m-2 p-2'>
              <Input
                label="Username: "
                placeholder = "Enter your Username"
                type = "text"
                {...register("username",{
                  required: true,
                })}
              />
              <Input
                label="FullName: "
                placeholder = "Enter your FullName"
                type = "text"
                {...register("fullName",{
                  required: true,
                })}
              />
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

              </div>

              <div className='flex flex-wrap flex-col items-center m-2 p-2 gap-2'>
                <Input
                  label="Avatar: "
                  placeholder = "Avatar"
                  type = "file"
                  accept="image/*"
                  onChangeCapture = {(e)=>{
                      console.log(e);
                      let input = e.target
                      if (input.files && input.files[0]) {
                          var reader = new FileReader();
                          reader.onload = function (eve) {
                            const im=document.getElementById('avt');
                            
                              im.setAttribute("src",eve.target.result);
                              im.setAttribute("width","150px");
                          };
                          reader.readAsDataURL(input.files[0]);
                      //     console.log(reader.readAsDataURL(input.files[0]));
                        }
                      // console.log(input.files);
                  }}
                  ref={avatarRef}
                  {...register("avatar",{
                    required: true,
                  })}
                />
                <img id='avt' className=' rounded-full object-cover aspect-square' />
                <Input
                  label="Cover Image: "
                  placeholder = "Cover Image"
                  type = "file"
                  accept="image/*"
                  onChangeCapture = {(e)=>{
                      console.log(e);
                      let input = e.target
                      if (input.files && input.files[0]) {
                          var reader = new FileReader();
                          reader.onload = function (eve) {
                            const im=document.getElementById('covImg');
                            
                              im.setAttribute("src",eve.target.result);
                              im.setAttribute("width","250px")
                          };
                          reader.readAsDataURL(input.files[0]);
                      //     console.log(reader.readAsDataURL(input.files[0]));
                        }
                      // console.log(input.files);
                  }}
                  ref={avatarRef}
                  {...register("coverImage",{
                    
                  })}
                />
                <img id='covImg' className=' rounded-xl object-cover h-[100px]' />
              </div>

            </div>
            <Button
                type="submit"
                className=' mt-4 hover:scale-[110%] hover:shadow-lg hover:shadow-zinc-500/30 duration-300 '
              >Sign Up</Button>
          </form>

          {error && <p className=' text-red-400 duration-500'>{error}</p>}

          {/* <SocialSignin/> */}

            
          <p>
            Already have an account?&nbsp;
            <Link
              className=' text-blue-500 hover:underline duration-300'
              to="/login"
            >
              Log in
            </Link>
          </p>

        </div>
    </div>
  )
}

export default SignupComponent