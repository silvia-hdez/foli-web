import React, { useEffect, useState } from "react";
import Navbar from "../../../components/misc/NavBar/NavBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { editPost } from "../../../services/PostService";
import { beautifyDate } from "../../../utils/dateHelpers";
import './EditPost.css'

const EditPost = () => {
  const location = useLocation();
  const post = location.state.post;
  const [postData, setPostData] = useState({});
  const [images, setImages] = useState(post.image);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const navigate = useNavigate();
  

  //New funciont cambiar fecha
  //copiar arr imag
  //select por el index en ese array la que quiero cambiar
  //ese objeto.date ---> event.targe.value
  //array imag modificado --> setiImages con nueva copia

  //al input la función nueva

  useEffect(() => {
    setPostData({
      name: post.name,
      description: post.description,
    });
  }, [post]);

  const handleOnChange = (e) => {
    const { name, value, type, files, images } = e.target;

    if (type === "file") {
      setImages([...images, files[0]]);
    } else {
      setPostData({ ...postData, [name]: value });
    }
  };

  const handleImageRemove = (index) => {
    const newImages = images.filter((_, i) => i !== index);

    setImages(newImages);
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (let data in postData) {
      if (data !== "image") {
        formData.append(data, postData[data]);
      }
    }

    const oldImages = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image.date) {
        oldImages.push(image);
      } else {
        formData.append("newImage", image);
      }
    }

    formData.append("image", JSON.stringify(oldImages));

    editPost({ postId: post._id, post: formData })
      .then((res) => {
        console.log("editado: ", res);
        setPostData(res.data);
        navigate(`/posts/${post._id}`);
      })
      .catch((err) => {
        err?.response?.data.message;
      });
  };

  return (
    <div className="EditPost">
     <>
    <Navbar />
    </>
     <h3>Instaplant</h3>
      
      Editar Post
      <>
        <form onSubmit={handleOnSubmit}>
          <div className="ImagesEdit">
            <div className="LeftSideImages">
              
              <div className="MultipleImages">
                {images &&
                  images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image.url}
                        onClick={() => handleImageClick(index)}
                        className={
                          selectedImageIndex === index ? "selected" : ""
                        }
                      />
                      <button
                        type="button"
                        onClick={() => handleImageRemove(index)}
                      >
                        <i className="bi bi-x"></i>
                      </button>
                    </div>
                  ))}
              </div>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleOnChange}
                className="form-control"
              />

            </div>

            <div className="RightSideImages">
                <div className="ImageOne">
                  <img src={post.image[selectedImageIndex].url} />
                  <input
                    type="string"
                    defaultValue={beautifyDate(post.image[selectedImageIndex].date)}
                    name="date"
                    id="date"
                    onChange={handleOnChange}
                  ></input>
                </div>
              </div>
          </div>
         
           
       

          <div>
            <label htmlFor="name" className="form-label">
              Nombre de la planta
            </label>
            <input
              type="text"
              defaultValue={postData.name}
              name="name"
              id="name"
              onChange={handleOnChange}
            ></input>
          </div>

          <div>
            <label htmlFor="description" className="form-label">
              Descripción
            </label>
            <input
              type="textarea"
              defaultValue={postData.description}
              name="description"
              id="description"
              onChange={handleOnChange}
            ></input>
          </div>

          <button className="btn btn-primary" type="submit">
            Aplicar Cambios
          </button>
        </form>
       
</>
    </div>
  );
};

export default EditPost;