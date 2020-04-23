import React from 'react'
import './Home.css';
export default function Home() {
    return (
            <div className ='Home'>
                <div className = 'leftWrapper'>
                    <div>
                    <h1>Chemazu</h1>
                    <h3>Lorem ipsum dolor sit amet,
                    <br></br>tempor incididunt ut dolore magna aliqua.</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
                    <p>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    <p>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                        <div className='buttonWrapper'>
                            <a href='/Signup'><div className= 'button buttonOne' >Get Started</div></a>
                            <a href='/signin'><div className= 'button buttonTwo'>Sign in <hr></hr></div></a>
                        </div>
                    </div>
                </div>
                <div className='signIn'>
                <a href='/Signup'><div className= 'button buttonOne' >Get Started</div></a>
                </div>
            </div>
    )
}
