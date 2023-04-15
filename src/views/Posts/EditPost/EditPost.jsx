import React, { useEffect, useState } from "react";
import Navbar from "../../../components/misc/NavBar/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { editPost } from "../../../services/PostService";

const EditPost = () => {
  const location = useLocation();
  const post = location.state.post;
  const [postData, setPostData] = useState({});
  const [images, setImages] = useState(post.image);
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
    <div>
      <Navbar />
      Editar Post
      <div>
        <form onSubmit={handleOnSubmit}>
          <div>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleOnChange}
              className="form-control"
            />

            <div className="Images">
              <div className="CarouselImages">
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
                        Eliminar
                      </button>
                    </div>
                  ))}
              </div>

              <div className="ComparativeImages">
                <div className="ImageOne">
                  <img src={post.image[selectedImageIndex].url} />
                  <input
                    type="string"
                    defaultValue={post.image[selectedImageIndex].date}
                    name="date"
                    id="date"
                    onChange={handleOnChange}
                  ></input>
                </div>
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
      </div>
    </div>
  );
};

export default EditPost;
