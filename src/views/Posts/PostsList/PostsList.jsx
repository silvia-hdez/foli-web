import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../../components/misc/NavBar/NavBar';
import { getAllMyPosts, getAllPosts } from '../../../services/PostService';
import PostCard from '../../../components/PostCard/PostCard';
import './PostsList.css'

const PostsList = ({all}) => {

    const [posts, setPosts] = useState([null])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if(all) {
            getAllPosts()
            .then((posts)=> {
    
                setLoading(false)
                setPosts(posts)
            })
            .catch((err) => console.log(err))
        } else {
            getAllMyPosts()
            .then((posts)=> {
    
                setLoading(false)
                setPosts(posts)
            })
            .catch((err) => console.log(err))
        }
  
    }, [])

    return (
        <div>
            {all && <Navbar />}
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