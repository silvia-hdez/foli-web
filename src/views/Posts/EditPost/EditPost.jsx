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
  const [imagesCopy, setImagesCopy] = useState([])
  const navigate = useNavigate();
  

  useEffect(() => {
    setPostData({
      name: post.name,
      description: post.description,
    });
  }, [post]);

  const handleOnChange = (e) => {
    const { name, value, type, files} = e.target;

    if (type === "file") {
      setImages([...images, files[0]]);
    } else {
      setPostData({ ...postData, [name]: value });
    }
  };

  const handleImageRemove = (index) => {
    const newImages = images.filter((_, i) => i !== index);

    setImages(newImages);
    setImagesCopy([])
    setSelectedImageIndex(0)
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);

  };

  const handleChangeData = (e) => {
    const newDate = e.target.value;
    const newImages = [...images];
    newImages[selectedImageIndex] = {
      ...newImages[selectedImageIndex],
      date: newDate,
    };
    setImagesCopy(newImages);
  }

  const handleSaveDate = () => {
    const newImages = [...images];
    newImages[selectedImageIndex] = {
      ...newImages[selectedImageIndex],
      date: document.getElementById("date").value,
    };
    setImages(newImages);
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
      const modifyImage = imagesCopy[i];
      if (modifyImage && modifyImage.date) {
        oldImages.push(modifyImage);
      } else if (!modifyImage && image.date) {
        oldImages.push(image);
      } else if (!modifyImage && !image.date) {
        formData.append("newImage", image);
      }
    }

    formData.append("image", JSON.stringify(oldImages));

    editPost({ postId: post._id, post: formData })
      .then((res) => {
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
                    type="date"
                    defaultValue={beautifyDate(post.image[selectedImageIndex].date)}
                    name="date"
                    id="date"
                    onChange={handleChangeData}
                  ></input>
                  <button onClick={handleSaveDate}>Guardar fecha</button>
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