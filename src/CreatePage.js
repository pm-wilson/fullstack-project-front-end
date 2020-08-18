import React from 'react';
import { createDestination, fetchAgents } from './FetchFunctions.js';

class CreatePage extends React.Component {
    state = {
      country: '',
      city: '',
      flight_hours: 0,
      need_passport: '',
      map_img: '',
      agent_id: 1,
      agents: [],
    }

    componentDidMount = async () => {
      const agentsData = await fetchAgents();

      this.setState({
        agents: agentsData.body,
      })
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

    handleMapChange = e => {
      this.setState({ map_img: e.target.value });
    }

    handleAgentChange = e => {
      this.setState({ agent_id: Number(e.target.value) });
    }

    handleSubmit = async (e) => {
      e.preventDefault();

      if(this.state.map_img !== '' && this.state.country !== '' && this.state.city !== '' && !isNaN(this.state.flight_hours) && this.state.flight_hours > 0 && this.state.need_passport !=='') {

        await createDestination({
          country: this.state.country,
          city: this.state.city,
          flight_hours: this.state.flight_hours,
          need_passport: this.state.need_passport,
          map_img: this.state.map_img,
          agent_id: this.state.agent_id,
          user_id: 1,
        });
  
        alert(`Updated ${this.state.city}, ${this.state.country}!`)
  
        this.setState({
          country: '',
          city: '',
          flight_hours: 0,
          need_passport: '',
          map_img: '',
          agent_id: 1,
        });

        this.props.history.push('/');
        
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
                <input onChange={this.handleCityChange} value={this.state.city}/>
              </label>
              <label>Country
                <input  onChange={this.handleCountryChange} value={this.state.country}/>
              </label>
              <label>Flight Hours
                <input onChange={this.handleFlightChange} type='number' value={this.state.flight_hours}/>
              </label>
              <label> 
                <input onChange={this.handlePassportChange} type='radio' name='passport' value='yes'/>
                Passport is Required
                <input onChange={this.handlePassportChange} type='radio' name='passport' value='no'/>
                Passport not Required
              </label>
              <label>
                Map Image URL
                <input onChange={this.handleMapChange} value={this.state.map_img}/>
              </label>
              <label>
                Agent:
                <select onChange={this.handleAgentChange} value={this.state.agent_id}>
                  {
                    this.state.agents.map((agent, i) => <option key={'agent-' + i} value={agent.id}>{agent.agent_name}</option>)
                  }
                </select>
              </label>
              <button>Create Destination</button>
            </form>
        </div>
      );
    }
  }
  
  export default CreatePage;