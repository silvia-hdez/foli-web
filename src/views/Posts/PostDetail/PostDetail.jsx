import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../../components/misc/NavBar/NavBar";
import { deletePost, getPostDetail, editPost } from "../../../services/PostService";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./PostDetail.css";
import AuthContext from "../../../contexts/AuthContext";
import { beautifyDate } from "../../../utils/dateHelpers";
import {
  deleteComment,
  editComment,
  getComments,
  postComment,
} from "../../../services/CommentService";
import EditPost from "../EditPost/EditPost";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { postId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [commentsList, setCommentsList] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!post) {
      getPostDetail(postId)
        .then((p) => {
          setLoading(false);
          
          setPost(p);
          console.log('p.comments',p)
            setCommentsList(p.comments);        
        })
        .catch((err) => console.log(err));

    }

  }, [commentsList]);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleEdit = () => {
    navigate(`/posts/${post._id}/edit`, { state: { post } });
  };

  const handleDeletePost = () => {
    deletePost(post._id)
      .then(() => {
        navigate("/profile");
      })
      .catch((err) => console.log(err));
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    const newComment = {
      content: comment,
      user: currentUser,
      postId: post._id,
    };
    postComment(newComment)
      .then((comment) => {
        setComment("");
        commentsList.push(comment)
        setCommentsList(commentsList); 

        const editedPost = {
          ...post,
          comments: commentsList,
        }

        const {image, ...editedPostToDb} = editedPost
        console.log('POST TO EDIT: ', {postId, post:editedPostToDb})
        editPost({postId, post:editedPostToDb})
        
         .then(() => setPost(editedPost))
         .catch((err) => console.log(err))

      })
      .catch((err) => console.log(err));
  };

  // const handleDeleteComment = (commentId) => {
  //   deleteComment(commentId)
  //     .then(() => {
  //       const updatedComments = comments.filter(
  //         (comment) => comment._id !== commentId
  //       );
  //       setComments(updatedComments);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const handleEditComment = (commentId, newContent) => {
  //   editComment(commentId, newContent)
  //     .then((updatedComment) => {
  //       const updatedComments = comments.map((comment) => {
  //         if (comment._id === updatedComment._id) {
  //           return updatedComment;
  //         } else {
  //           return comment;
  //         }
  //       });
  //       setComments(updatedComments);
  //     })
  //     .catch((err) => console.log(err));
  // };

  if (!post) {
    return <p> ... fetching post</p>;
  }
  return (
    <div className="PostDetail">
      <Navbar />

      {currentUser.id === post.user.id && (
        <div>
          <button className="btn btn-primary" onClick={handleEdit}>
            Editar
          </button>
          <button className="btn btn-primary" onClick={handleDeletePost}>
            Eliminar
          </button>
        </div>
      )}

      <div>
      <Link to={`/profile/${post.user.id}`}>
        <img src={post.user.image} style={{width:'30px'}}/>
        <p>User: {post.user.userName}</p>
      </Link>
      
      </div>

      {loading ? (
        "Loading..."
      ) : (
        <div className="PostDetail">
          <div className="Images">
            <div className="CarouselImages">
              {post.image.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  onClick={() => handleImageClick(index)}
                  className={selectedImageIndex === index ? "selected" : ""}
                />
              ))}
            </div>

            <div className="ComparativeImages">
              <div className="ImageOne">
                <img src={post.image[0].url} />
                <p>{beautifyDate(post.image[0].date)}</p>
              </div>

              <div className="ImageTwo">
                <img src={post.image[selectedImageIndex].url} />
                <p>{beautifyDate(post.image[selectedImageIndex].date)}</p>
              </div>
            </div>
          </div>

          <div>
            {/* <p>Nombre de la planta: {post.name}</p>
            <p>Descripción</p>
            <div className="Description">
              <p> {post.description} </p>
            </div> */}

            {/* <p>Comentarios</p>
            {commentsList.map((comment) => {
              return (
                <div key={comment._id}>
                  <p>{comment.content}</p>
                  {currentUser.id === comment.user && (
                    <div>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        Eliminar
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          handleEditComment(comment._id, comment.content)
                        }
                      >
                        Editar
                      </button>
                    </div>
                  )}
                </div>
              );
            })} */}

            <div>
              <label htmlFor="comments" className="form-label">
                Commentarios
              </label>
              <div>
              {commentsList && commentsList.map((comment) => {
                return (
                  <div key={comment._id}>
                    <p>{comment.content}</p>
                  </div>
                  )
                })}
              </div>
              <input
                type="textarea"
                placeholder="Write your comment here..."
                name="comments"
                id="comments"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              ></input>
            </div>
            <button className="btn btn-primary" onClick={handleSubmitComment}>
              New Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
