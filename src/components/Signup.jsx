import React, { useEffect, useState } from 'react'
import { useNavigate,useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BeatLoader } from "react-spinners";
import Error from './Error'
import * as Yup from 'yup'
import useFetch from '@/hooks/useFetch'
import { signup } from '@/db/apiAuth'  
import { UrlState } from '@/context';

const Signup = () => {
    const [errors, setErrors] = useState({})
    const [formData, setformData] = useState({
        name:"",
        email:"",
        password:"",
        profile_pic:null,
    })
    const navigate = useNavigate();
    let [searchParams]=useSearchParams();
    const longLink = searchParams.get("createNew");

    const handleInputChange=(e)=>{
        const {name,value, files}=e.target;
        setformData((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));
    };

    const {data, error,loading, fn:fnSignup} =useFetch(signup,formData);
    const {fetchUser}=UrlState();

    useEffect(() => {
      if(error==null && data){
        navigate(`/dashboard?${longLink? `createNew=${longLink}`:""}`)
        fetchUser();
      }
    }, [error, loading]);
    
    const handleSignup=async (e)=>{
      e.preventDefault(); 
        setErrors({})
        try{
            const schema=Yup.object().shape({
                name: Yup.string()
                    .required("Name is required"),
                email: Yup.string()
                    .email("Invalid Email")
                    .required("Email is required"),
                password: Yup.string()
                    .min(8,"Password must be at least 8 characters")
                    .required("Password is required"),
                profile_pic: Yup.mixed()
                    .required("Profile Picture is required"),
            })

            await schema.validate(formData,{abortEarly:false});
            await fnSignup()
        }catch(e){
            const newErrors={};

            e?.inner?.forEach((err)=>{
                newErrors[err.path]=err.message;
            });

            setErrors(newErrors);
        }   
    }
  return (
    <div><Card className="w-full max-w-sm">
      <div className='text-center'>
        {error && <Error message={error.message}/>}

      </div>
    <CardContent>
      <form onSubmit={handleSignup} autoComplete="off">
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="name"
              name="name"
              placeholder="Enter Your Name"
              autoComplete="off"
              onChange={handleInputChange}
              required
            />
            {errors.name && <Error message={errors.name} />}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter Your Email"
              autoComplete="off"
              onChange={handleInputChange}
              required
            />
            {errors.email && <Error message={errors.email} />}
          </div>
          
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" name="password" autoComplete="new-password" type="password" 
              onChange={handleInputChange} required />
           {errors.password && <Error message={errors.password} />}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="file">Profile Pic</Label>
            <Input
              id="file"
              type="file"
              name="profile_pic"
              placeholder="Enter Your Profile Pic"
              accept="image/*"
              autoComplete="off"
              onChange={handleInputChange}
              required
            />
            {errors.name && <Error message={errors.name} />}
          </div>
        </div>
        <CardFooter className="flex-col mt-4 gap-2">
      <Button  type="submit" className="w-full">
        {loading?
        <BeatLoader size={10} color='#36d7b7'/>:"Create Account"}
      </Button>
    </CardFooter>
        </form>
        </CardContent>

  </Card>
  </div>
  )
}

export default Signup