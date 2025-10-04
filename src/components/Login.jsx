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
import { login } from '@/db/apiAuth'  
import { UrlState } from '@/context';

const Login = () => {
    const [errors, setErrors] = useState({})
    const [formData, setformData] = useState({
        email:"",
        password:"",
    })
    const navigate = useNavigate();
    let [searchParams]=useSearchParams();
    const longLink = searchParams.get("createNew");

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setformData((prevState) => ({
            ...prevState,
            [name]:value,
        }));
    };

    const {data, error,loading, fn:fnLogin} =useFetch(login,formData);
    const {fetchUser}=UrlState();

    useEffect(() => {
      if(error==null && data){
        navigate(`/dashboard?${longLink? `createNew=${longLink}`:""}`)
        fetchUser();
      }
    }, [data, error]);
    
    
    const handleLogin=async (e)=>{
      e.preventDefault(); 
        setErrors({})
        try{
            const schema=Yup.object().shape({
                email: Yup.string()
                    .email("Invalid Email")
                    .required("Email is required"),
                password: Yup.string()
                    .min(8,"Password must be at least 8 characters")
                    .required("Password is required")
            })

            await schema.validate(formData,{abortEarly:false});
            await fnLogin()
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
      <form onSubmit={handleLogin} autoComplete="off">
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
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
        </div>
        <CardFooter className="flex-col mt-4 gap-2">
      <Button  type="submit" className="w-full">
        {loading?
        <BeatLoader size={10} color='#36d7b7'/>:"Login"}
      </Button>
    </CardFooter>
        </form>
        </CardContent>

  </Card>
  </div>
  )
}

export default Login