import React from 'react';
import { MDBView, MDBMask } from 'mdbreact';

function Home() {
	return (
		<div>
			<MDBView>
				<img src={require('./../resources/images/landing.jpg')} alt='Landing page image' className='landing-img' width='100%' />
				<MDBMask overlay='black-strong' className='landing-mask'>
					<h2 className='white-text text-center'>&lt;/&gt;</h2>
					<h1 className='text-center my-2 name'>I'm Leander Paul</h1>
					<h2 className='white-text text-center my-2'>A MERN Stack Developer</h2>
					<h2 className='white-text text-center'>&lt;/&gt;</h2>
				</MDBMask>
			</MDBView>
		</div>
	);
}

export default Home;

// script tag, special characters,
