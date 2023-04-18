import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../../components/misc/NavBar/NavBar';
import { deletePost, getAllMyPosts, getAllPosts } from '../../../services/PostService';
import PostCard from '../../../components/PostCard/PostCard ';
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


    

    posts.sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });

      

    return (
        <div className='PostList'>
        
            {all && (
                <>
                <Navbar />
                <h3>Instaplant</h3>
                </>
                )}
            <div className='allPosts'>
                {loading
                    ? "Loading..."
                    : posts.map((post)=> {
                        return <PostCard key={post._id} post={post} 
                        viewType={all ? 'all' : 'mine'}
                        />
                    })}
            </div>
        </div>
    );
};

export default PostsList;