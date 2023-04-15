import React, { useContext } from "react";
import "./PostCard.css";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import './PostCard.css'

const PostCard = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  console.log('Post-----:', post)
  return (
    <div className="postCard">
    
      <img src={post.image[0].url} />
      <h3>{post.name}</h3>

      {(currentUser && post.user)  && post.user.id !== currentUser.id ? (
        <p>user: {post.user.userName}</p>
      ):''}

      <Link to={`/posts/${post._id}`}>Details</Link>
    </div>
  );
};

export default PostCard;
