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
  const {isLoaded, loadError} = useLoadScript(
    {
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries,
    }
  );
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map; 
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
        const results = await getGeocode({address});
        // Returns the lat and lng from the JSON object aquired from the above function
        const {lat, lng} = await getLatLng(results[0]);  // <------
        landOn({lat, lng}); 
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