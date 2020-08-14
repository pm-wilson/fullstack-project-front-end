import React from 'react';
import { fetchDestination } from './FetchFunctions.js';
import { Link } from 'react-router-dom';

class DetailPage extends React.Component {
    state = {
      destination: {},
    }

    componentDidMount = async () => {
      const data = await fetchDestination(this.props.match.params.id);

      this.setState({
        destination: data.body[0],
      })
    }
    
    render() {
      return (
        <div className='detail-view'>
          <div className="detail-container">
              Wishing to go to {this.state.destination.city}, {this.state.destination.country}? It is only {this.state.destination.flight_hours} hours away {this.state.destination.need_passport && 'and do not forget the passport'}!
          </div>
          <Link to='/'>Return to List Page</Link>
        </div>
      );
    }
  }
  
  export default DetailPage;