import React from "react";
import mapStyles from "../assets/style/mapStyles.js"; 
import{
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";


//Used for the search feature 
import usePlacesAutocomplete,
{
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import
{
 Combobox,
 ComboboxInput,
 ComboboxPopover,
 ComboboxList,
 ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css"; 

import { useState, useEffect } from 'react';

require('dotenv').config();
const superagent = require('superagent');

// Load Google API Library
const libraries = ["places"]

// Establishes size of the map
const mapContainerStyle = 
{
  width: "100vw",
  height: "100vh"
}; 

// Used to set the default location of the map
const center = {
  lat: 32.9858,
  lng: -96.7501
}; 


const options =
{
  styles: mapStyles
}; 


const Near = () => {
  const { isLoaded, loadError } = useLoadScript(
    {
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries,
    }
  );

  const [ filled, setFilled ] = useState(false)
  const [ locations, setLocations ] = useState([
    {
      name: "Location 1",
      location: { 
        lat: 41.3954,
        lng: 2.162 
      },
    },
    {
      name: "Location 2",
      location: { 
        lat: 41.3917,
        lng: 2.1649
      },
    },
    {
      name: "Location 3",
      location: { 
        lat: 41.3773,
        lng: 2.1585
      },
    },
    {
      name: "Location 4",
      location: { 
        lat: 41.3797,
        lng: 2.1682
      },
    },
    {
      name: "Location 5",
      location: { 
        lat: 41.4055,
        lng: 2.1915
      },
    }
  ])
  
  

  const loadLocations = () => {
    
      superagent
        .get('http://35.222.213.18/api/events')
        .end((err, res) => {
          res.body.forEach( (el) => {
            console.log(el)
            
            let addressRes = el.address + ", " + el.city + ", " + el.state // address
            let nameRes = el.name
            // addressRes = "2557 Thresher Circle, Plano, TX"
            console.log(addressRes)
            try {
              getGeocode({ address: addressRes })
                .then((results) => getLatLng(results[0]))
                .then(({ lat, lng }) => {
                  let chunk = []
                  
                  console.log("📍 Coordinates: ", { lat, lng });
                  let item = {
                      name: nameRes,
                      // address: addressRes,
                      location: {
                        lat: lat, //32.9858,
                        lng: lng //-96.7501
                      },
                  };
                  // chunk.push(item)
                  console.log("Old locations, ", locations)
                  console.log("New locations, ", [...locations, item])
                  setLocations([...locations, item])
                })
                .catch((error) => {
                  console.log("😱 Error: ", error);
                });
              // const results = await getGeocode({address: addressRes});
              // // Returns the lat and lng from the JSON object aquired from the above function
              // const {latRes, lngRes} = await getLatLng(results[0]);  // <------
              // console.log("Location", latRes, lngRes)
  
              // let item = {
              //   name: nameRes,
              //   // address: addressRes,
              //   location: {
              //     lat: latRes, //32.9858,
              //     lng: lngRes //-96.7501
              //   },
              // };
              // chunk.push(item)
              // console.log("Adding ", item)
              console.log(locations)
            } catch (error) {
              console.error(error)
            }
            
          });
  
          
          
        });
  }

  useEffect( () => {
    try {
      // setLocations();

      loadLocations()
    } catch (err) {
      console.error(err)
    }
  }, [])

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map; 
    console.log("Map loaded")
  });

  // Prevents the map from changing unless the lat and lng change.
  // Used to pan to the location of the searched address
  const landOn = React.useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng});
    mapRef.current.setZoom(14);
  }); 

  

  if (loadError) return "Error loading the map."
  if (!isLoaded) return "Map loading."

  
  return (
      <div>
        <Search landOn={landOn} />
        <GoogleMap 
          mapContainerStyle={mapContainerStyle} 
          zoom ={8}
          options ={options}
          center = {center}
          onLoad = {onMapLoad}
          >
            {
              locations && 
              (locations.map(item => {
                return (
                  <Marker key={item.name} position={item.location}/>
                )
              }))
            }
        </GoogleMap>
      </div>
  )

}
export default Near

function Search({landOn})
{
  const {
    ready,
    value,
    suggestions: {status, data},
    setValue
  } = usePlacesAutocomplete({
    requestOptions:
    {
      //Shows the locations near the assigned lat and lng.
      location: {lat: () => 32.9858, lng: () => -96.7501},
      //radius of the default display for searches in kilometers
      radius: 200 * 1000,
    },
  }); 

  return (
    <div className="search"> 
    <Combobox onSelect={async (address) => {
      try {
        console.log("Address", address)
        const results = await getGeocode({address});
        // Returns the lat and lng from the JSON object aquired from the above function
        const {lat, lng} = await getLatLng(results[0]);  // <------
        landOn({lat, lng}); 
        console.log({lat, lng})
      } catch(error)
      {
        console.log("error"); 
      }
      //console.log(address)
      }}>
      <ComboboxInput value={value} onChange={(e) => {
        setValue(e.target.value);
      }}
      disabled={!ready}
      placeholder = "Enter an address"
      />
      <ComboboxPopover>
        <ComboboxList>
        {status === "OK" && data.map(({id, description}) => (<ComboboxOption key = {id} value={description} /> ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
    </div> 
    );
  }
