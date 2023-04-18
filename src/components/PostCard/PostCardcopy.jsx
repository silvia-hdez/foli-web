import React, { useContext } from "react";
import "./PostCard.css";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import "./PostCard.css";

const PostCard = ({ post, viewType, clickHandler, isSaved }) => {
  const { currentUser } = useContext(AuthContext);

  let postCardClass = "postCard";
  if (viewType === "all") {
    postCardClass += " allPosts";
  } else if (viewType === "mine") {
    postCardClass += " myPost";
  }

  console.log('post',post)
  console.log('view',viewType)
  console.log('isSave',isSaved)
  return (
    <div className={postCardClass}>
      <Link to={`/posts/${post._id}`}>
        <img src={post.image[0].url} />
      </Link>
      {viewType === "all" && <h3>{post.name}</h3>}

      {currentUser && post.user && post.user.id !== currentUser.id ? (
        <p>user: {post.user.userName}</p>
      ) : (
        ""
      )}

      <button onClick={clickHandler} id={post._id}>
        {isSaved ? (
          <i
            className="bi bi-bookmark-fill"
            style={{ fontSize: "20px", color: "rgb(109, 101, 101)" }}
          ></i>
        ) : (
          <i
            className="bi bi-bookmark"
            style={{ fontSize: "20px", color: "rgb(109, 101, 101)" }}
          ></i>
        )}
      </button>
    </div>
  );
};

export default PostCard;
