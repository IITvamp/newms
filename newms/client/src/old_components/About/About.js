import React from 'react';
import Footer from '../Homepage/Footer/Footer';
import './About.css';
import Team1 from './Assets/Atul1.png';
import Team2 from './Assets/Abhishek.png';
import Team3 from './Assets/Akshat.png';
import NavbarNew from '../Homepage/Navbar/NavbarNew';
import Github from './Assets/github.png';
import Li from './Assets/linkedin.png';

function About() {
    return (
        <>
            <NavbarNew id='navbar3'/>
            <div className='containerAbt'>
               <h1>About Our Product</h1>               
               <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
               <h2>Meet the Builders and Creators</h2>
            </div>
            <div id='containerAbt' className='ui container'>
                   <div id='T1'>
                        <img id='imgA1' src={Team1}/>
                        <p className='Aname1'>Atul Singh</p>
                        <p className='Apos'>Web Developer</p>
                        <p className='Apos'>IIT Roorkee</p>
                        <p className='Social'> 
                           <a href='https://www.linkedin.com/in/atul-singh-a034ab19b'><img id='Li' src={Li}/></a> 
                           <a href='https://github.com/AtulSingh717'><img id='Github' src={Github}/></a>
                        </p>
                   </div>
                   <div id='T2'>
                        <img id='imgA2' src={Team2}/>
                        <p className='Aname2'>Abhishek</p>
                        <p className='Apos'>Web Developer</p>
                        <p className='Apos'>IIT Roorkee</p>
                        <p className='Social'> 
                           <a href='/'><img id='Li' src={Li}/></a> 
                           <a href='/'><img id='Github' src={Github}/></a>
                        </p>
                   </div>
                   <div id='T3'>
                        <img id='imgA3' src={Team3}/>
                        <p className='Aname3'>Akshat</p>
                        <p className='Apos'>Designer</p>
                        <p className='Apos'>IIT Roorkee</p>
                        <p className='Social'> 
                           <a href='/'><img id='Li' src={Li}/></a> 
                           <a href='/'><img id='Github' src={Github}/></a>
                        </p>
                   </div>                                              
            </div>
            <Footer/>
        </>
    )
}

export default About;
