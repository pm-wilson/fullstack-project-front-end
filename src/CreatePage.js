import React from 'react';
import { createDestination } from './fetchFunctions.js';

class CreatePage extends React.Component {
    state = {
      country: '',
      city: '',
      flight_hours: 0,
      need_passport: '',
    }

    handleCountryChange = e => {
      this.setState({ country: e.target.value });
    }

    handleCityChange = e => {
      this.setState({ city: e.target.value });
    }

    handleFlightChange = e => {
      this.setState({ flight_hours: Number(e.target.value) });
    }

    handlePassportChange = e => {
      this.setState({ need_passport: e.target.value === 'yes' ? true : false });
    }

    handleSubmit = async (e) => {
      e.preventDefault();

      if(this.state.country !== '' && this.state.city !== '' && !isNaN(this.state.flight_hours) && this.state.flight_hours > 0 && this.state.need_passport !=='') {

        await createDestination({
          country: this.state.country,
          city: this.state.city,
          flight_hours: this.state.flight_hours,
          need_passport: this.state.need_passport
        });
  
        alert(`Updated ${this.state.city}, ${this.state.country}!`)
  
        this.setState({
          country: '',
          city: '',
          flight_hours: 0,
          need_passport: ''
        });
      } else {
        alert('Please complete all form fields to create a new city')
      }
    }

    render() {
      return (
        <div className='create-area'>
          <h2 className='center-this'>
            Admin Page
          </h2>
          <h3 className='center-this'>New Destination</h3>
            <form onSubmit={this.handleSubmit}>
              <label>City
                <input onChange={this.handleCityChange}/>
              </label>
              <label>Country
                <input  onChange={this.handleCountryChange}/>
              </label>
              <label>Flight Hours
                <input onChange={this.handleFlightChange} type='number'/>
              </label>
              <label> 
                <input onChange={this.handlePassportChange} type='radio' name='passport' value='yes'/>
                Passport is Required
              </label>
              <label>
                <input onChange={this.handlePassportChange} type='radio' name='passport' value='no'/>
                Passport not Required
              </label>
              <button>Create Destination</button>
            </form>
        </div>
      );
    }
  }
  
  export default CreatePage;