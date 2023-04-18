import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../../components/misc/NavBar/NavBar";
import {
  deletePost,
  getPostDetail,
  editPost,
} from "../../../services/PostService";
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
  const [commentsList, setCommentsList] = useState([]);
  const [comment, setComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const { postId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!post) {
      getPostDetail(postId)
        .then((p) => {
          setLoading(false);

          setPost(p);
          console.log("p.comments", p);
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
        commentsList.push(comment);
        setCommentsList(commentsList);

        const editedPost = {
          ...post,
          comments: commentsList,
        };

        const { image, ...editedPostToDb } = editedPost;
        console.log("POST TO EDIT: ", { postId, post: editedPostToDb });
        editPost({ postId, post: editedPostToDb })
          .then(() => setPost(editedPost))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteComment = (commentId) => {
    console.log(commentId);
    deleteComment(commentId)
      .then(() => {
        const updatedComments = commentsList.filter(
          (comment) => comment._id !== commentId
        );
        setCommentsList(updatedComments);
      })
      .catch((err) => console.log(err));
  };

  const handleEditComment = ({ commentId, content }) => {
    editComment({ commentId, content })
      .then((updatedComment) => {
        const updatedComments = commentsList.map((comment) => {
          if (comment._id === updatedComment._id) {
            return updatedComment;
          } else {
            return comment;
          }
        });
        setCommentsList(updatedComments);
        setEditingComment(null);
      })
      .catch((err) => console.log(err));
  };

  const handleEditButtonClick = (commentId, content) => {
    setEditingComment({ id: commentId, content });
  };

  if (!post) {
    return <p> ... fetching post</p>;
  }
  return (
    <div className="PostDetail">
      <h3>Instaplant</h3>
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
          <img src={post.user.image} style={{ width: "30px" }} />
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

            <div>
              <label htmlFor="comments" className="form-label">
                Commentarios
              </label>
              <div className="Comments">
                {commentsList &&
                  commentsList.map((comment) => {
                    const { _id, user, content } = comment;
                    const isEditing =
                      editingComment && editingComment.id === _id;
                    const text = isEditing ? editingComment.content : content;

                    return (
                      <div key={comment._id}>
                        {/* {currentUser ? 
                       
                          ( <>
                              <img style={{width:'20px'}} src={currentUser.image}/>
                              <p>{currentUser.userName}</p>
                            </>
                          ) 
                          : 
                          ( <>
                              <img src={user.image}/>
                              <p>{user.userName}</p>
                            </>
                          )
                          } */}

                        {(currentUser.id === comment.user ) ? (
                          <>
                            <img style={{width:'20px'}} src={currentUser.image}/>
                            <p>{currentUser.userName}</p>
                          </>
                        ) : (
                          <>
                            <img style={{width:'20px'}} src={user.image}/>
                            <p>{user.userName}</p>
                          </>
                        )}

                        <p style={{ border: "1px solid blue", width: "300px" }}>
                          {text}
                        </p>
                        {currentUser.id === comment.user.id && (
                          <div>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleDeleteComment(comment._id)}
                            >
                              <i className="bi bi-x-lg"></i>
                            </button>

                            {!isEditing && (
                              <button
                                onClick={() =>
                                  handleEditButtonClick(_id, content)
                                }
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                            )}
                            {isEditing && (
                              <>
                                <input
                                  type="text"
                                  value={editingComment.content}
                                  onChange={(e) =>
                                    setEditingComment({
                                      id: editingComment.id,
                                      content: e.target.value,
                                    })
                                  }
                                />
                                <button
                                  onClick={() =>
                                    handleEditComment({
                                      commentId: editingComment.id,
                                      content: editingComment.content,
                                    })
                                  }
                                >
                                  <i className="bi bi-check-lg"></i>
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    );
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
              <button className="btn btn-primary" onClick={handleSubmitComment}>
                New Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
