import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import { useState } from 'react'
import '../assets/style/Create.css'
import { makeStyles } from '@material-ui/styles'

const superagent = require('superagent')

export default function Create() {
  const [status, setStatus] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    let name = document.getElementById('name').value
    let org = document.getElementById('org').value
    let zip = document.getElementById('zip').value
    let city = document.getElementById('city').value
    let state = document.getElementById('state').value
    let address = document.getElementById('address').value
    let date = document.getElementById('date').value
    let start = document.getElementById('start').value
    let end = document.getElementById('end').value
    let cat = document.getElementById('cat').value
    let nec = document.getElementById('nec').value.split(', ')

    console.log('sending', {
      name: name,
      org: org,
      address: address,
      zip: zip,
      city: city,
      state: state,
      date: date,
      start: start,
      end: end,
      eventType: cat,
      necessities: nec,
    })

    superagent
      .post('http://35.222.213.18/api/events')
      .send({
        name: name,
        org: org,
        address: address,
        zip: zip,
        city: city,
        state: state,
        date: date,
        start: start,
        end: end,
        eventType: cat,
        necessities: nec,
      })
      .then((res) => {
        console.log(res)
        setStatus('Successfully created event. You will see it posted shortly.')
      })
      .catch((err) => {
        console.log(err)
        setStatus('Error with the input.')
      })
  }

  return (
    <div>
      <h1>Enter Event Information:</h1>
      <div className='formCont'>
        <form>
          <TextField
            className='inputField'
            placeholder='Name'
            margin='normal'
            id='name'
          />{' '}
          <br />
          <TextField
            className='inputField'
            placeholder='Organization'
            margin='normal'
            id='org'
          />{' '}
          <br />
          <TextField
            className='inputField'
            margin='normal'
            placeholder='ZIP'
            id='zip'
          />{' '}
          <br />
          <TextField
            className='inputField'
            margin='normal'
            placeholder='City'
            id='city'
          />{' '}
          <br />
          <TextField
            className='inputField'
            margin='normal'
            placeholder='State'
            id='state'
          />{' '}
          <br />
          <TextField
            className='inputField'
            margin='normal'
            placeholder='Address'
            id='address'
          />{' '}
          <br />
          <TextField
            className='inputField'
            margin='normal'
            placeholder='Date'
            id='date'
          />{' '}
          <br />
          <TextField
            className='inputField'
            margin='normal'
            placeholder='Start'
            id='start'
          />{' '}
          <br />
          <TextField
            className='inputField'
            margin='normal'
            placeholder='End'
            id='end'
          />{' '}
          <br />
          {/* <select name="category" id="cat">   */}
          <Select
            native
            className='inputField'
            margin='normal'
            inputProps={{
              name: 'category',
              id: 'cat',
            }}
          >
            <option>Food drive</option>
            <option>Shelters</option>
            <option>Water</option>
            <option>Charging station</option>
          </Select>{' '}
          <br />
          <TextField
            className='inputField'
            placeholder='Necessities'
            margin='normal'
            id='nec'
          />{' '}
          <br />
          <Button
            variant='contained'
            color='primary'
            type='submit'
            onClick={handleSubmit}
          >
            Create event
          </Button>
          <p>{status}</p>
        </form>
      </div>
    </div>
  )
}
