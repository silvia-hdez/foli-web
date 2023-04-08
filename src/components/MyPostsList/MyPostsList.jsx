import React, { useEffect, useState } from 'react';
import { getAllMyPosts } from '../../services/PostService';
import PostCard from '../PostCard/PostCard';
import './MyPostsList.css'

const MyPostsList = () => {
    
    const [posts, setPosts] = useState([null])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAllMyPosts()
        .then((posts)=> {
            setLoading(false)
            setPosts(posts)
        })
        .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            All My Posts
            <div className='MyPostsList'>
                {loading
                    ? "Loading..."
                    : posts.map((post)=> {
                        return <PostCard key={post._id} post={post}/>
                    })}
            </div>
        </div>
    );
};

export default MyPostsList;