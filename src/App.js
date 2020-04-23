import React, { Component } from 'react';
import {BrowserRouter as Router , Switch , Route }from'react-router-dom';
import { auth, createUserProfile } from './Firebase/firebase.utils'
import './App.css';
import Sign from './View/Sign/Sign';
import Home from './View/Home/Home';
import About from './View/About/About';
import SignUp from './View/SignUp/SignUp';
import AuthHome from './View/AuthHome/AuthHome';
import ProtectedRoute from './View/ProtectedRoute/ProtectedRoute';
// import products from './products.json' IMPORTED JSON FILE "YOU CAN CONSOLE LOG IT "

export class App extends Component {
  constructor(){
    super()
    this.state={
      currentUser:'',
      products:''
    }
  }

  componentDidMount(){
      auth.onAuthStateChanged (async userAuth => {
      createUserProfile(userAuth)
      console.log(userAuth)
      this.setState({currentUser:userAuth})
      console.log('this is outside setState REFACTOR', this.state.currentUser);
    })

    //  AN API CALL
    // const url ='https://jsonplaceholder.typicode.com/posts';
    // fetch(url)
    // .then(res=> res.json())
    // .then( products=> this.setState({products}, ()=>{console.log(this.state.products)}))

  }
  
  render() {
    return (
      <div className="App">
       <Router>
        <Switch>
          <ProtectedRoute
            exact
            path='/Dashboard'
            currentUser = {this.state.currentUser}
            component={AuthHome}
          />
          <Route 
          exact 
          path = "/"  render={(props)=><Home {... props} currentUser = {this.state.currentUser}/>}>
          </Route>
          <Route exact path ="/SignUp"  component={SignUp}></Route>
          <Route exact path ="/SignIn"  component= {Sign}></Route>
          <Route exact path ="/About"  render ={(props)=> <About {... props}currentUser = {this.state.currentUser}/>}></Route>
       </Switch>
       </Router>
      </div>
    );
  }
}

export default App

