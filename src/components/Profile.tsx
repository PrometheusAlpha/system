import React from 'react';
import { auth } from '../firebase';
import dummy_avatar from '../assets/dummy-avatar.jpg';
import { Typography } from '@mui/material';
export default function Profile() {
  const user = auth.currentUser;

  return (
    <>
      <Typography variant="h1">Profile</Typography>
      <img src={user?.photoURL !== null ? user?.photoURL : dummy_avatar} alt="Avatar" id="profilePic" />
    </>
  )
}
