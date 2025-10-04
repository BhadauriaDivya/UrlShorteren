import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import {LogOut, LinkIcon} from "lucide-react";
import {BarLoader} from 'react-spinners'
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UrlState } from "@/context";
import useFetch from "@/hooks/useFetch";
import { logout } from "@/db/apiAuth";

const Header = () => {
  const navigate = useNavigate();
  const{user,fetchUser}=UrlState()
  const{loading, fn:fnLogout}=useFetch(logout);
  return (
    <>
    
    <nav className="ps-10 pt-4 pe-7 flex justify-between items-center">
      <Link to="/">
        <img src={logo} className="w-50 py-2" alt="TrimURL" />
      </Link>
      <div>
        {!user ? (
          <Button
          onClick={() => navigate("/auth")}
          className="bg-blue-500 text-black hover:bg-blue-600"
        >
          Login
        </Button>
        
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={user?.user_metadata?.profile_pic}
                />
                <AvatarFallback>DB</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-46 text-center">
              <DropdownMenuLabel >{user?.user_metadata?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex">
                    <LinkIcon className="me-2"/>
                  My Links
                  </Link>
                </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400">
                <LogOut/>
                <span onClick={()=>{
                  fnLogout().then(()=>{
                    fetchUser();
                    navigate("/");

                  })
                }}>
                     Log out
                    </span>
              </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>}
    </>
  );
};

export default Header;
