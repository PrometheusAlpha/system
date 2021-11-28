import React from 'react';
import { useAuth } from '../context/AuthContext';
import dummy_avatar from '../assets/dummy-avatar.png';
export default function Profile() {

  const auth = useAuth();
  const user = auth.currentUser;

  return (
    <>
      <h1>Profile</h1>
      <img src={user.photoURL ? user.photoURL : dummy_avatar} alt="Avatar" />
    </>
  )
}
