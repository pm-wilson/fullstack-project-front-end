import React from 'react';
import { fetchDestination, updateDestination, fetchAgents, deleteDestination } from './FetchFunctions.js';
import { Link } from 'react-router-dom';

class DetailPage extends React.Component {
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
    const data = await fetchDestination(this.props.match.params.id);
    const agentId = agentsData.body.filter((agent) => {
      if (agent.agent_name === data.body.agent_name) {
        return true;
      }
      return false;
    });
    
    this.setState({
      agents: agentsData.body,
      destination: data.body,    
      country: data.body.country,
      city: data.body.city,
      flight_hours: data.body.flight_hours,
      need_passport: data.body.need_passport,
      map_img: data.body.map_img,
      agent_id: agentId[0].id,
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
    this.setState({ agent_id: e.target.value });
  }

  handleDeleteDestination = async () => {
    await deleteDestination(Number(this.props.match.params.id));
    alert("This destination has been deleted");
    
    this.props.history.push('/');
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    if(this.state.map_img !== '' && this.state.country !== '' && this.state.city !== '' && !isNaN(this.state.flight_hours) && this.state.flight_hours > 0 && this.state.need_passport !=='') {

      await updateDestination(
        Number(this.props.match.params.id),
        {
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
        destination: {},
      });

      this.props.history.push('/');
      
    } else {
      alert('Please complete all form fields to create a new city')
    }
  }

  render() {
    return (
      <div className='create-area detail-container'>
        <h3 className='center-this'>Destination Details</h3>
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
            <input onChange={this.handlePassportChange} type='radio' name='passport' value='yes' checked={this.state.need_passport}/>
            Passport is Required
          </label>
          <label>
            <input onChange={this.handlePassportChange} type='radio' name='passport' value='no' checked={!this.state.need_passport}/>
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
          <button>Update Destination</button>
        </form>
        <div className='map-container'>
          <img src={this.state.map_img} alt={this.state.country + ' Map'}/>
        </div>
        <Link to='/'>Return to List Page</Link>
        <button onClick={this.handleDeleteDestination}>Remove Destination</button>
      </div>
    );
  }
}

export default DetailPage;