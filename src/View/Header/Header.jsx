import React from 'react'
import './Header.css'
import { auth } from 'firebase';

export default function Header() {
    
    const handleSignOut=async ()=>{
        auth().signOut();
        console.log('signOut')
    }
    return (
        <div className= 'header'>
          <a href='/'>Home</a>
        <a href='/About'>About</a> 
        <button onClick ={handleSignOut}>SignOut</button> 
        </div>
    )
}
