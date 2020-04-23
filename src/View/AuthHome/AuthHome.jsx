import React, { Component } from 'react';
import {auth} from 'firebase'
import {storage, firestore} from '../../Firebase/firebase.utils';
import './AuthHome.css'
import profile from './profile.png'
import Header from '../Header/Header';

export class AuthHome extends Component {
    constructor(){
        super()
        this.state={
          userData:'',
          image:''
        }
      }

    componentDidMount(){
        auth().onAuthStateChanged(async (userAuth)=>{
            if(userAuth){
                const docRef=firestore.collection('users').doc(userAuth.uid)
                docRef.get().then(doc=>{
                    if(doc.exists){
                        console.log("Document data:", doc.data())
                        const userData= doc.data()
                        this.setState({userData},()=>{console.log(this.state.userData)})
                    }
                    else {
                        console.log("No such document!");
                    }
                }).catch(err=>{console.log('the  error is', err)})
            }
            else{
                console.log("no on is signed in")
            }
        })
        
    }
    // handleRedirect = async () =>{
    //     auth().onAuthStateChanged(async (userAuth) => {
    //         const { history } = this.props;
    //         if (!userAuth) {
    //             history.push('/Signin');
    //         }
    //     })
    //}
    
    handleUpload=(e)=>{
        const image = e.target.files[0]//the actual image file
        this.setState({image},()=>{console.log(this.state.image)})
    }

    handleUploadSubmit = (e)=>{
        e.preventDefault() 
        const {image} = this.state
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed', 
        (snapshot) => {
            // progrss function ....
            //console.log(snapshot)
            //USE THIS FUNCTION TO CREATE A PROGRESS BAR
        }, 
        (error) => {
             // error function ....
          console.log(error);
        }, 
      () => {
          // complete function ....
          storage.ref('images').child(image.name).getDownloadURL().then(url => {
              auth().onAuthStateChanged( async (userAuth)=>{
                const imageRef = firestore.doc(`users/${userAuth.uid}`)
                try {
                    await imageRef.update({photoUrl:url})
                } catch (error) {
                    console.log('the error in image upload is',error.message);
                }
              })
          })
      });
    }
    
    handleSignOut=async ()=>{
        auth().signOut();
    }    
    render() {
        const {displayName, photoUrl} = this.state.userData
        return (
            <div>
                <Header/>
                <p>{displayName}</p>
                <img src={photoUrl || profile} alt='profil' className='profileImage'/>
                <h1>I AM LOGGED IN</h1> 
                <form>
                    <input type='file'
                        name='image'
                        onChange ={this.handleUpload}
                    />
                <button type='submit' onClick={this.handleUploadSubmit}>Upload</button>
                </form>
                <button onClick ={this.handleSignOut}>SignOut</button>
            </div>
        )
    }
}

export default AuthHome