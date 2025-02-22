// pages/post/[id].tsx
"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PostDetail = () => {
  const { query } = useRouter();
  const [post, setPost] = useState(null);

  const createUser = async () =>{
    try{
      const response = await fetch('http://localhost:')
    }catch(err){
      console.log("Error while creating user",err)
    }
  }
  const getPostById = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:6969/post/${id}`);
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    if (query.id) {
      getPostById(query.id as string);
    }
  }, [query.id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
};

export default PostDetail;
