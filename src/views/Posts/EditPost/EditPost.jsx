import React, { useEffect, useState } from "react";
import Navbar from "../../../components/misc/NavBar/NavBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { editPost } from "../../../services/PostService";
import { beautifyDate } from "../../../utils/dateHelpers";
import "./EditPost.css";
import Header from "../../../components/misc/Header/Header";

const EditPost = () => {
  const location = useLocation();
  const post = location.state.post;
  const [postData, setPostData] = useState({});
  const [images, setImages] = useState(post.image);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imagesCopy, setImagesCopy] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setPostData({
      name: post.name,
      description: post.description,
    });
  }, [post, images]);

  const handleOnChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setImages([...images, files[0]]);
    } else {
      setPostData({ ...postData, [name]: value });
    }
  };

  const handleImageRemove = (index) => {
    const newImages = images.filter((_, i) => i !== index);

    setImages(newImages);
    setImagesCopy([]);
    setSelectedImageIndex(0);
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleChangeDate = (e) => {
    const newDate = e.target.value;
    const newImages = [...images];
    newImages[selectedImageIndex] = {
      ...newImages[selectedImageIndex],
      date: new Date(newDate).toISOString(),
    };
  
    setImages(newImages);
  };

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
        oldImages.unshift(modifyImage);
      } else if (!modifyImage && image.date) {
        oldImages.unshift(image);
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
      <Header />
      <div style={{display:'flex', justifyContent:'center'}}>
                <input
                  className="InputEditPost"
                  type="text"
                  defaultValue={postData.name}
                  name="name"
                  id="name"
                  onChange={handleOnChange}
                ></input>
              </div>
      <>
        <form onSubmit={handleOnSubmit} className="FormEditPost">
          <div className="ImagesEdit">
            <div className="LeftSideImages">
              
              <div className="MultipleImages">
                {images &&
                  images.map((image, index) => (
                    <div key={index}>
                      <img
                        style={{ width: "50px", height: "50px" }}
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
                style={{width:'330px', marginBottom:'12px', marginTop:'20px'}}
              />
            </div>
            <div className="RightSideImages">
              <div className="ImageOne">
                <img src={post.image[selectedImageIndex].url} />
                <input
                  type="date"
                  value={beautifyDate(images[selectedImageIndex].date)}
                  //value="2022-01-01"
                  name="date"
                  id="date"
                  onChange={handleChangeDate}
                ></input>
                <button onClick={handleSaveDate} className="SubmitCreatePost">Guardar fecha</button>
              </div>
            </div>
          </div>

          <button className="SubmitCreatePost" type="submit">
            Aplicar Cambios
          </button>
        </form>
      </>
    </div>
  );
};

export default EditPost;
