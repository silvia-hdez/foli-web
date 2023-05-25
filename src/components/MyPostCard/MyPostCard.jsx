import React from 'react';
import './MyPostCard.css';
import { Link } from 'react-router-dom';

const MyPostCard = ({ post }) => {
  // Ordenar las imágenes por fecha en orden descendente
  const sortedImages = post.image.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });

  // Obtener la imagen más reciente
  const latestImage = sortedImages[0];

  return (
    <Link to={`/posts/${post._id}`}>
      <div className="MyPostCard">
        <p className="PlantNamePost">{post.name}</p>
        {latestImage && <img src={latestImage.url} alt="Post Image" />}
      </div>
    </Link>
  );
};

export default MyPostCard;
