import React, { useEffect, useState } from "react";
import Navbar from "../../../components/misc/NavBar/NavBar";
import { getPostDetail } from "../../../services/PostService";
import { useNavigate, useParams } from "react-router-dom";
import "./PostDetail.css";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    getPostDetail(id)
      .then((post) => {
        setLoading(false);
        setPost(post);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleEditClick = () => {
    navigate(`/edit-post/${id}`)
  }

  if (!post) {
    return <p> ... fetching post</p>;
  }
  return (
    <div>
      <Navbar />
      {loading ? (
        "Loading..."
      ) : (
        <div className="PostDetail">
          <div className="Images">
            <div className="CarouselImages">
             {post.image.map((image, index) => (
                <img key={index} src={image}
                  onClick={() => handleImageClick(index)}
                  className={selectedImageIndex === index ? "selected" : ""}
                />
              ))}
            </div>
            <div className="ComparativeImages">
            <img src={post.image[0]}/>
              <img src={post.image[selectedImageIndex]} />  
            
            </div>
          </div>
          <p>Nombre de la planta: {post.name}</p>

          <button onClick={handleEditClick}>Editar</button>
        </div>
      )}


    </div>
  );
};

export default PostDetail;
