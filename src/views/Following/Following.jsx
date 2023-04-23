import React, { useContext, useEffect, useState } from 'react';
import { getFollowings } from '../../services/UserService';
import FollowCard from '../../components/FollowCard/FollowCard';
import Header from '../../components/misc/Header/Header';
import Navbar from '../../components/misc/NavBar/NavBar';
import { useParams } from 'react-router-dom';

const Following = () => {

    const [followings, setFollowings]= useState([])
    const { userId } = useParams()

    useEffect(() => {
        getFollowings(userId)
            .then((followings) => {
                setFollowings(followings);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className='Follows'>
           <Header />
        <Navbar />
            <div className='FollowsList'>
            <h4>Followings</h4>
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