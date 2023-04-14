import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/misc/NavBar/NavBar';
import { useLocation } from 'react-router-dom';

const EditPost = () => {
   const location = useLocation()
   const post = location.state.post
    const [postData, setPostData] = useState({});
    const [editing, setEditing] = useState (true)

console.log(post)

    return (
        <div>
        <Navbar />
            Editar Post
            <p>Nombre: {post.name}</p>
        </div>
    );
};

export default EditPost;