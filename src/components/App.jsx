import React from 'react';

import '../resources/css/App.css';
import Navbar from './Navbar';
import Home from './Home';

class App extends React.Component {
	state = {
		position: 1
	};

	render() {
		return (
			<div className='App'>
				<link href='https://fonts.googleapis.com/css?family=Sigmar+One&display=swap' rel='stylesheet' />
				<link href='https://fonts.googleapis.com/css?family=Varela+Round&display=swap' rel='stylesheet' />
				<Navbar cursorLocation={this.state.position} />
				<Home />
			</div>
		);
	}
}

export default App;
