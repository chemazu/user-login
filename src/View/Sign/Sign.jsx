import React, { Component } from 'react';
import {signInWithGoogle, auth} from '../../Firebase/firebase.utils';
import './Sign'

export class Sign extends Component {
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            signInError:''
        }
    }
    handleRedirect = async () =>{
            await auth.onAuthStateChanged (async userAuth => {
            const {history} = this.props;
            if(userAuth){
                history.push('/Dashboard')
            }
          })
    }
    handleChange = (e)=>{
        const {name, value} = e.target
        this.setState({[name]:value}) //very important part
    }
    handleSubmit = async (e)=>{
        e.preventDefault();
        const {email , password}=this.state;
        try{
            await auth.signInWithEmailAndPassword(email, password);
            this.handleRedirect()
            this.setState({
                email:'',
                password:''
            })
        }
        catch(error){
            console.log('the error in sign up is', error.message,error)
                const signInError  = error.message;
                this.setState({signInError}, ()=>{console.log(this.state.signInError)})
                console.log(signInError)
        }

    }
    handleGoogleSignIn = async () => {
        signInWithGoogle();
        this.handleRedirect()
    }
    render() {
        const {email , password, signInError} = this.state
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    <input 
                    type="email"
                    name = 'email'
                    value={email}
                    onChange={this.handleChange}/>

                    <input 
                    type='password'
                    name='password'
                    value={password}
                    onChange={this.handleChange}/>

                    <button type = 'submit'>Sign In</button>

                </form>
                <button onClick ={this.handleGoogleSignIn} >Sign In with Google</button>
                <p>{signInError}</p>
            </div>
        )
    }
}
export default Sign
