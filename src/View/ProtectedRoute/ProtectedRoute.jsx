import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function ProtectedRoute({component:Component, currentUser, ...rest}) {
    
    return (
        <Route {...rest} render={
            (props)=>{
                if(currentUser)
                {return (<Component {...props}/>)}
                else{
                    return <Redirect to={
                        {
                            pathname:"/Signin",
                            state:{
                                from:props.location
                            }
                        }
                    }/>
                }
            }
        }
        />
    )
}

// import React from 'react'

// export default function ProtectedRoute({currentUser}) {
//     return (
//         <div>
//             {currentUser?<p>logged in </p>:<p>logged out state is empty</p>}
//         </div>
//     )
// }

// import React, { Component } from 'react'
// import { auth } from '../../Firebase/firebase.utils'
// // import {BrowserRouter as Router, Route , Redirect} from 'react-router-dom'
// import AuthHome from '../AuthHome/AuthHome'


// export class ProtectedRoute extends Component {
//     constructor(){
//         super()
//         this.state={
//             userAuth:'',
//             currentUser:''
//         }
//     }
//     componentDidMount(){

//         auth.onAuthStateChanged (async userAuth => {
//             if(userAuth){
//                 this.setState({userAuth},()=>{console.log(this.state.userAuth)})
//             }
//         })

//     }
//     render() {
//         const {userAuth}=this.state
//         return (
//             <div>
//                 {userAuth?<AuthHome currentUser={userAuth}/>:<p>Not logged in <a href='Signin'><div>SIGN IN /SIGN UP</div></a></p>}

//             </div>
//             // <Router>
//             //     <Route>
//             //     {userAuth?<AuthHome/>:<p>Not logged in <a href='sign in'><div>SIGN IN /SIGN UP</div></a></p>}
//             //     </Route>
//             // </Router>
//         )
//     }
// }

// export default ProtectedRoute











// import React, { Component } from 'react'
// import { auth } from '../../Firebase/firebase.utils'
// import { Route, Redirect } from 'react-router-dom'

// export class ProtectedRoute extends Component {
//     constructor(){
//         super()
//         this.state={
//             userAuth:''
//         }
//     }

//     componentDidMount(){
        // auth.onAuthStateChanged (async userAuth => {
        //     if(userAuth){
        //         this.setState({userAuth},()=>{console.log(this.state.userAuth)})
        //     }
        // })
//     }
    
//     render() {
//         const {Component, ...rest} = this.props
//         const {userAuth}= this.state
//         return (
//             <Route {...rest} render={
//                 (props)=>{
//                     if(userAuth)
//                     {return (<Component {...props}/>)}
//                     else{
//                         return <Redirect to={
//                             {
//                                 pathname:"/Signin",
//                                 state:{
//                                     from:props.location
//                                 }
//                             }
//                         }/>
//                     }
//                 }
//             }
//             />
//         )
//     }
// }

// export default ProtectedRoute

