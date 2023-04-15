import React, { useContext } from "react";
import "./PostCard.css";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import './PostCard.css'

const PostCard = ({ post, clickHandler, viewType }) => {
  const { currentUser } = useContext(AuthContext);

  let postCardClass = "postCard";
  if (viewType === "all") {
    postCardClass += " allPosts";
  } else if (viewType === "mine") {
    postCardClass += " myPost";
  }

  return (
    <div className={postCardClass}>
    
    <Link to={`/posts/${post._id}`}><img src={post.image[0].url} /></Link>
      {viewType === 'all' && <h3>{post.name}</h3>}

      {(currentUser && post.user)  && post.user.id !== currentUser.id ? (
        <p>user: {post.user.userName}</p>
      ):''}

      {/* {viewType === 'mine' && (
        <button onClick={clickHandler}>
           <i className="bi bi-x-lg"></i> 
        </button>)} */}
      
    </div>
  );
};

export default PostCard;
