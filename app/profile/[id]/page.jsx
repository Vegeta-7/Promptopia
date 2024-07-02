"use client";

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react";

import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";

const UserProfile = ({ params }) => {
    const searchParams = useSearchParams();    
    const username = searchParams.get("name")

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${params?.id}/posts`);
          const data = await response.json();            
          setPosts(data);
        }    
        if(params?.id){
            fetchPosts();    
        }
    },[params?.id])         

    return (
        <Profile 
            name={username}
            desc="Welcome to your personalized profile page"
            data={posts}            
        />
    )
}

export default UserProfile;