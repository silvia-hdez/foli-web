import React, { useEffect, useState } from "react";
import Navbar from "../../components/misc/NavBar/NavBar";
import { getPostDetail } from "../../services/PostService";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostDetail()
      .then((post) => {
        setLoading(false);
        setPost(post);
      })
      .catch((err) => console.log(err));
  });

  return (
    <div>
      <Navbar />
      <p>Hola</p>
      {/* {loading
        ? "Loading..."
        : <div>Adios</div>
          } */}
    </div>
  );
};

export default PostDetail;
