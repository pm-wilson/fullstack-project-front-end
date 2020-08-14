import React from 'react';
import { Link } from 'react-router-dom';

class DestinationHeader extends React.Component {

    render() {
      return (
        <header>
            <h1>Destinations From Portland, Oregon</h1>
            <p>Where could you be in a few hours?</p>
            <Link to='create'>Admin</Link>
        </header>
      );
    }
  }
  
  export default DestinationHeader;