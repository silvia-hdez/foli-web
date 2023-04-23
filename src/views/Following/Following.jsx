import React, { useContext, useEffect, useState } from 'react';
import { getFollowings } from '../../services/UserService';
import FollowCard from '../../components/FollowCard/FollowCard';
import Header from '../../components/misc/Header/Header';
import Navbar from '../../components/misc/NavBar/NavBar';
import AuthContext from '../../contexts/AuthContext';

const Following = () => {

    const [followings, setFollowings]= useState([])
    const {currentUser} = useContext(AuthContext)

    useEffect(() => {
        getFollowings(currentUser.id)
            .then((followings) => {
                setFollowings(followings);
            })
            .catch((err) => console.log(err));
    }, [currentUser.id]);

    return (
        <div className='Follows'>
           <Header />
        <Navbar />
            <div className='FollowsList'>
                {followings.length > 0 
                ? (followings.map((follow) => {
                    return <FollowCard follow={follow} key={follow.id}/>
                }))
                : 'No Sigues a Nadie'}
            </div>
        </div>
    );
};

export default Following;