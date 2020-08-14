import React from 'react';
import './App.css';
import { fetchDestinations } from './FetchFunctions.js';
import { Link } from 'react-router-dom';

class ListPage extends React.Component {
  state = {
    destinations: [],
  }

  componentDidMount = async () => {
    const data = await fetchDestinations();

    this.setState({
      destinations: data.body,
    })
  }
    render() {
      return (
        <div>
          <div>
            <h2 className='body-container'>Destinations:</h2>
            <div className='destination-container'>
              {
                this.state.destinations.map((destination, i) => {
                  return <Link to={`/detail/${destination.id}`} className='destination-option' key={'dest' + i}>{destination.city}, {destination.country}</Link>
                })
              }
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default ListPage;