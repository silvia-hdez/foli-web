import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/misc/Header/Header';
import './Followers.css'
import { getFollowers } from '../../services/UserService';
import AuthContext from '../../contexts/AuthContext';
import FollowCard from '../../components/FollowCard/FollowCard';
import Navbar from '../../components/misc/NavBar/NavBar';

const Followers = () => {
    
    const [followers, setFollowers]= useState([])
    const {currentUser} = useContext(AuthContext)

    useEffect(() => {
        getFollowers(currentUser.id)
            .then((followers) => {
                setFollowers(followers);
                
            })
            .catch((err) => console.log(err));
    }, [currentUser.id]);

    return (
        <div className='Follows'>
            <Header />
            <Navbar />
            <div className='FollowsList'>
                {followers.length > 0 
                ? (followers.map((follow) => {
                    return <FollowCard follow={follow} key={follow.id}/>
                }))
                : 'No Tienes seguidores'}
            </div>
        </div>
    );
};

export default Followers;