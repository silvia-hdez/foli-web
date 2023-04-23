import React, { useContext } from "react";
import "./PostCard.css";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import './PostCard.css'

const PostCard = ({ post, viewType, clickHandler, isSaved  }) => {
  const { currentUser } = useContext(AuthContext);

  let postCardClass = "postCard";
  if (viewType === "all") {
    postCardClass += " allPostCard";
  } else if (viewType === "mine") {
    postCardClass += " myPost";
  }

  return (
    <>
   
    <div className={postCardClass}>
    
      <Link to={`/posts/${post._id}`}>
        <img className="ImagePostList" src={post.image[0].url} />
      </Link>
      
      {(currentUser && post.user)  && post.user.id !== currentUser.id ? (
        <Link to={`/profile/${post.user.id}`}><div className="UserPostCard">
          <img src={post.user.image} />
          <p>{post.user.userName}</p>
          
          </div> </Link>
        ):''}
       
        <div className="PostResume">
        {viewType === 'all' && <h4>{post.name}</h4>}

        

        <button onClick={clickHandler} style={{backgroundColor:'transparent', border:'none'}}
            id={post._id} className="ButtonBookmarkPost">
                  {isSaved ? (
                    <i
                      className="bi bi-bookmark-fill"
                      style={{ fontSize: "20px", color: "#27AE60", borderColor:'#50FA97'}}
                    ></i>
                  ) : (
                    <i
                      className="bi bi-bookmark"
                      style={{ fontSize: "20px", color: "#27AE60", borderColor:'#50FA97' }}
                    ></i>
                  )}
            </button>
        </div>
        
        
      </div>
      
    </>
  );
};

export default PostCard;
