import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../../components/misc/NavBar/NavBar";
import { getPostDetail } from "../../../services/PostService";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./PostDetail.css";
import AuthContext from "../../../contexts/AuthContext";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { id } = useParams();
  const {currentUser} = useContext(AuthContext)
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

  const handleEdit = () => {
    navigate(`/posts/${post._id}/edit`, { state: { post } });
  };

console.log(post)


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
            <div className="ImageOne">
            <img src={post.image[0]}/>
            <p>{post.date}</p>
            </div>
             <div className="ImageTwo">
             <img src={post.image[selectedImageIndex]} /> 
             <p>{post.date}</p>
            </div>
            
             
            
            </div>
          </div>
          <p>Nombre de la planta: {post.name}</p>
          <p>Descripción {post.description}</p>
         
        
           {(currentUser.id === post.user) && (
            <button className="btn btn-primary" onClick={handleEdit}>
              Editar
            </button>
            )}   
          
        </div>
      )}


    </div>
  );
};

export default PostDetail;
