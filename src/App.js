import React from 'react';
import DestinationHeader from './DestinationHeader.js';
import DestinationFooter from './DestinationFooter.js';
import './App.css';
import { fetchDestinations } from './FetchFunctions.js'

class App extends React.Component {
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
          <DestinationHeader />
          <div>
            <h2 className='body-container'>Destinations:</h2>
            <div className='destination-container'>
            {
              this.state.destinations.map((destination, i) => {
              return <div className='destination-option' key={i}>Destination: {destination.city}, {destination.country} takes {destination.flight_hours} hours to fly from Portland and passports are {destination.need_passport && 'not '}required.</div>
              })
            }
            </div>
          </div>
          <DestinationFooter />
        </div>
      );
    }
  }
  
  export default App;