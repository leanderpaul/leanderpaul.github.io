import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbarNav, MDBNavItem } from 'mdbreact';

class Navbar extends Component {
	state = {
		isOpen: false
	};

	constructor(props) {
		super();
		this.state.position = props.cursorLocation;
	}

	toggleCollapse = () => this.setState({ isOpen: !this.state.isOpen });

	render() {
		let cursorPosition = this.state.position;
		console.log(cursorPosition);
		return (
			<MDBNavbar color='elegant-color-dark' dark expand='sm' fixed='top' scrolling transparent>
				<MDBNavbarBrand>
					<strong className='white-text h3 name-title'>Leander Paul</strong>
				</MDBNavbarBrand>
				<MDBNavbarToggler onClick={this.toggleCollapse} />
				<MDBCollapse id='navbar' isOpen={this.state.isOpen} navbar>
					<MDBNavbarNav className='white-text' right>
						<MDBNavItem className='mx-3' active={cursorPosition === 1}>
							<div>Home</div>
						</MDBNavItem>
						<MDBNavItem className='mx-3' active={cursorPosition === 2}>
							<div>About Me</div>
						</MDBNavItem>
						<MDBNavItem className='mx-3' active={cursorPosition === 3}>
							<div>Skills</div>
						</MDBNavItem>
						<MDBNavItem className='mx-3' active={cursorPosition === 4}>
							<div>Portfolio</div>
						</MDBNavItem>
						<MDBNavItem className='mx-3' active={cursorPosition === 5}>
							<div>Contact Me</div>
						</MDBNavItem>
					</MDBNavbarNav>
				</MDBCollapse>
			</MDBNavbar>
		);
	}
}

export default Navbar;
