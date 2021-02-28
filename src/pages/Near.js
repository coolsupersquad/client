import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../components/Marker';
const superagent = require('superagent'); 
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Near extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {

    superagent.get('http://35.222.213.18/api/events')
    .end((err, res) => {
      console.log(res)

    });    
      

    return (
      // Important! Always set the container height explicitly
      <div>
        <div style={{ height: '90vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyDgYD-yjDO9bqmrFYuOZWwDKa3uX6DSJAI" }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <Marker
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default Near;
