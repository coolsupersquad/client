import React from 'react'
import mapStyles from '../assets/style/mapStyles.js'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'

//Used for the search feature
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'

import '@reach/combobox/styles.css'

import '../assets/style/Near.css'

import { useState, useEffect } from 'react'

require('dotenv').config()
const superagent = require('superagent')

// Load Google API Library
const libraries = ['places']

// Establishes size of the map
const mapContainerStyle = {
  width: '100vw',
  height: 'calc(100vh - 56px)',
}

// Used to set the default location of the map
const center = {
  lat: 32.9858,
  lng: -96.7501,
}

const options = {
  styles: mapStyles,
}

const Near = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  const [filled, setFilled] = useState(false)
  const [selected, setSelected] = React.useState({})
  //const [markers, setMarkers] = React.useState;
  const [locations, setLocations] = useState([])

  const onSelect = (item) => {
    setSelected(item)
  }

  const loadLocations = () => {
    superagent.get('http://35.222.213.18/api/events').end((err, res) => {
      res.body.forEach((el) => {
        console.log(el)

        let addressRes = el.address + ', ' + el.city + ', ' + el.state // address
        let nameRes = el.name
        let orgName = el.org
        let dateOf = el.date
        let typeEvent = el.eventType
        let startTime = el.start
        let endTime = el.end
        let nes = []
        let arrLength = el.necessities.length
        if (arrLength > 1)
        {
        for (var i = 0; i < arrLength; i++) {
          nes[i] = el.necessities[i]
        }
      }
        else
        {
          nes[0] = "N/A";
        }
        // addressRes = "2557 Thresher Circle, Plano, TX"
        console.log(addressRes)
        try {
          getGeocode({ address: addressRes })
            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
              let chunk = []

              console.log('📍 Coordinates: ', { lat, lng })
              let item = {
                name: nameRes,
                address: addressRes,
                org: orgName,
                date: dateOf,
                eventType: typeEvent,
                start: startTime,
                end: endTime,
                nesc: nes,
                location: {
                  lat: lat, //32.9858,
                  lng: lng, //-96.7501
                },
              }
              // chunk.push(item)
              // console.log("Old locations, ", locations)
              // console.log("New locations, ", [...locations, item])
              // setLocations([...locations, item])
              setLocations((locations) => locations.concat(item))
            })
            .catch((error) => {
              console.log('😱 Error: ', error)
            })
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
          // something
          console.log(locations)
        } catch (error) {
          console.error(error)
        }
      })
    })
  }

  useEffect(() => {
    try {
      // setLocations();
      // window.location.mpth = "/near"
      loadLocations()
    } catch (err) {
      console.error(err)
    }
  }, [])

  const mapRef = React.useRef()
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map
    console.log('Map loaded')
  })

  // Prevents the map from changing unless the lat and lng change.
  // Used to pan to the location of the searched address
  const landOn = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(14)
  })

  if (loadError) return 'Error loading the map.'
  if (!isLoaded) return 'Map loading.'

  return (
    <div>
      <Search landOn={landOn} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        options={options}
        center={center}
        onLoad={onMapLoad}
      >
        {locations.map((item) => {
          return (
            <Marker
              key={item.name}
              position={item.location}
              onClick={() => {
                onSelect(item)
              }}
            />
          )
        })}
        {selected.location && (
          <InfoWindow
            position={{
              lat: selected.location.lat + 0.1,
              lng: selected.location.lng,
            }}
            clickable={true}
            onCloseClick={() => setSelected({})}
          >
            <div className='main'>
              <h2>{selected.name}</h2>
              <p>This event is hosted by: {selected.org}</p>
              <p>The event is {selected.eventType}</p>
              <p>
                This event is from {selected.start} to {selected.end}
              </p>
              <p>Address: {selected.address}</p>
              <p>What {selected.org} needs: </p>
              <ol>
                {selected.nesc.map((nesce) => (
                  <li className='nes'>{nesce}</li>
                ))}
              </ol>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  )
}
export default Near

function Search({ landOn }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    requestOptions: {
      //Shows the locations near the assigned lat and lng.
      location: { lat: () => 32.9858, lng: () => -96.7501 },
      //radius of the default display for searches in kilometers
      radius: 200 * 1000,
    },
  })

  return (
    <div className='search'>
      <Combobox
        onSelect={async (address) => {
          try {
            console.log('Address', address)
            const results = await getGeocode({ address })
            // Returns the lat and lng from the JSON object aquired from the above function
            const { lat, lng } = await getLatLng(results[0]) // <------
            landOn({ lat, lng })
            console.log({ lat, lng })
          } catch (error) {
            console.log('error')
          }
          //console.log(address)
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          disabled={!ready}
          placeholder='Enter an address'
          className='inputcombo'
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}
