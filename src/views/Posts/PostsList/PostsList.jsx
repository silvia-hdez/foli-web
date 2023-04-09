import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../../components/misc/NavBar/NavBar';
import { getAllPosts } from '../../../services/PostService';
import PostCard from '../../../components/PostCard/PostCard';
import './PostsList.css'

const PostsList = () => {

    const [posts, setPosts] = useState([null])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAllPosts()
        .then((posts)=> {
            setLoading(false)
            setPosts(posts)
        })
        .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <Navbar />
            AllPosts
            <div className='allPosts'>
                {loading
                    ? "Loading..."
                    : posts.map((post)=> {
                        return <PostCard key={post._id} post={post} />
                    })}
            </div>
        </div>
    );
};

export default PostsList;