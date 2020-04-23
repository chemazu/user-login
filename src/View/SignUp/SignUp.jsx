import React, { Component } from 'react';
import { auth , createUserProfile} from '../../Firebase/firebase.utils';

export class SignUp extends Component {
    constructor(){
        super();
        this.state={
            displayName:'',
            email:'',
            password:'',
            confirmPassword:'',
            url:'',
        }
    }
    handleChange = (e)=>{
        const {name, value} = e.target
        this.setState({[name]:value}) //very important part

    }
    handleSubmit= async (e)=>{
        e.preventDefault()
        const { displayName, email, password, confirmPassword,url } = this.state;
        if(!(password===confirmPassword)){
            alert('Password Mismatch')
            return
        }
        try {
            const {user} = await auth.createUserWithEmailAndPassword(email ,password)
            await createUserProfile(user,{displayName,url})
            
            this.setState({
                displayName:'',
                email:'',
                password:'',
                confirmPassword:'',
                image:'',
                url:''
            })
        }
        catch(err){
            console.log('the error in profile doc creation is',err)
        }
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div>
              <form onSubmit={this.handleSubmit}>
                  <input type="text"
                  name='displayName'
                  value= {displayName}
                  onChange ={this.handleChange}
                  />
                  <input type="email"
                  name='email'
                  value= {email}
                  onChange ={this.handleChange}
                  />
                  <input type="password"
                  name='password'
                  value= {password}
                  onChange ={this.handleChange}
                  />
                  <input type="password"
                  name='confirmPassword'
                  value= {confirmPassword}
                  onChange ={this.handleChange}
                  />
                  <input type='file'
                  name='image'
                  onChange ={this.handleUpload}
                  />
                  <button type='submit'>Sign Up</button>
              </form> 
            </div>
        )
    }
}
export default SignUp