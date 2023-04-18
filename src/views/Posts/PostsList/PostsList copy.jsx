import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../../components/misc/NavBar/NavBar';
import { deletePost, getAllMyPosts, getAllPosts } from '../../../services/PostService';
import PostCard from '../../../components/PostCard/PostCard';
import './PostsList.css'
import { useParams } from 'react-router-dom';
import { deleteSavePost, getSavePosts, postSavePost } from '../../../services/SaveService';
import AuthContext from '../../../contexts/AuthContext';

const PostsList = ({all}) => {
    const [initialize, setInitialize] = useState(false);
    const [posts, setPosts] = useState([null])
    const [loading, setLoading] = useState(true)
    const [savedPosts, setSavedPosts] = useState([])
    const [postCopy, setPostCopy] = useState([])
    const {currentUser} = useContext(AuthContext)

    useEffect(() => {
        if (!initialize) {
        
            getSavePosts(currentUser._id)
            .then((savedPosts) => {
                setSavedPosts(savedPosts)
                if(!all) {
                    const posts = savedPosts.map((savedPost) => {
                        return {...savedPost.post, saved: true}
                    })
                setLoading(false)
                setPosts(posts)
                setPostCopy(
                    posts.map((a) => {
                        return {...a}
                    })
                )
                setInitialize(true)
                }else {
                    getAllPosts()
                    .then((getAllPosts) => {
                        const posts = allPosts.map((post) => {
                            const isPostSaved = savedPosts.some(
                                (savedPost) => savedPost.post._id === post._id
                            )
                            return {...post, saved: isPostSaved}
                        })
                        setLoading(false)
                        setPosts(posts)
                        setPostCopy( posts.map((a) => {
                            return { ...a}
                        })
                        )
                        setInitialize(true)
                    })
                    .catch((err) => console.log(err))
                }
            })
                .catch((err) => console.log(err))
        }
    
    }, [posts])


    //         getAllPosts()
    //         .then((posts)=> {
    
    //             setLoading(false)
    //             setPosts(posts)
    //         })
    //         .catch((err) => console.log(err))
    //     } else {
    //         getAllMyPosts()
    //         .then((posts)=> {
    
    //             setLoading(false)
    //             setPosts(posts)
    //         })
    //         .catch((err) => console.log(err))
    //     }
    
    // }, [])

    const handleBookmark = (post) => {
        const postSavedList = savedPosts.filter((x) => x.post_id == post._id)

        if(postSavedList.length > 0) {
            deleteSavePost(postSavedList[0]._id)
            .then(() => {
                setSavedPosts(
                    savedPosts(
                        savedPosts.filter((savedPost) => savedPost.post._id !== post._id)
                    )
                )
                setPosts(
                    posts.map((p) => {
                        if(p._id === post._id) {
                            return { ...p, saved: false}
                        }
                        return p
                    })
                )
                setPostCopy(
                    postCopy.map((x) => x._id === post._id ? { ...x, saved: false} : x)
                )

                if(!all) {
                    window.location.reload()
                }
            })
            .catch((err) => console.log(err))
        } else {
            postSavePost(post._id)
            .then((newSavedPost) => {
                newSavedPost['post'] = post
                savedPosts.push(newSavedPost)
                setSavedPosts(savedPosts)

                setPosts(
                    posts.map((p) => {
                        if(p._id === post._id) {
                            return {...p, saved: true }
                        }
                        return p
                    })
                )
                setPostCopy(
                    postCopy.map((x) => x._id === post._id ? { ...x, saved: true} : x)
                )
            })
            .catch((err) => console.log(err))
        }
    }



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
                        clickHandler={() => handleBookmark(post)}
                        isSaved={post.saved}
                        />
                    })}
            </div>
        </div>
    );
};

export default PostsList;