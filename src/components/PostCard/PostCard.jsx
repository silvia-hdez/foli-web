import React, { useContext } from "react";
import "./PostCard.css";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const PostCard = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  console.log(post.user);
  return (
    <div className="postCard">
      <img src={post.image[0]} />
      <h3>{post.name}</h3>

      {post.user
        ? post.user._id !== currentUser.id && <p>user: {post.user.userName}</p>
        : null}

      <Link to={`/posts/${post._id}`}>Details</Link>
    </div>
  );
};

export default PostCard;
