
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { useState } from 'react';
const superagent = require('superagent');


export default function Create() {

    const [ status, setStatus ] = useState("")
    
    function handleSubmit (e) {
        e.preventDefault();
        let name = (document.getElementById("name").value)
        let org = (document.getElementById("org").value)
        let zip = (document.getElementById("zip").value)
        let city = (document.getElementById("city").value)
        let state = (document.getElementById("state").value)
        let address = (document.getElementById("address").value)
        let date = (document.getElementById("date").value)
        let start = (document.getElementById("start").value)
        let end = (document.getElementById("end").value)
        let cat = (document.getElementById("cat").value)
        let nec = (document.getElementById("nec").value).split(", ")
        

        console.log("sending", {
            "name": name,
            "org": org,
            "address": address,
            "zip" : zip,
            "city": city,
            "state": state,
            "date": date,
            "start": start,
            "end": end,
            "eventType": cat,
            "necessities": nec,
        })

        superagent.post("http://35.222.213.18/api/events")
            .send({
                "name": name,
                "org": org,
                "address": address,
                "zip" : zip,
                "city": city,
                "state": state,
                "date": date,
                "start": start,
                "end": end,
                "eventType": cat,
                "necessities": nec,
            })
            .then((res) => {
                console.log(res)
                setStatus("Successfully created event. You will see it posted shortly.")
            })
            .catch((err) => {
                console.log(err)
                setStatus("Error with the input.")
            })


    }

    return (
        <div>
            <form>
                <TextField placeholder="Name" id="name" /> <br/>
                <TextField placeholder="Organization" id="org"/> <br/>
                <TextField placeholder="ZIP" id="zip"/> <br/>
                <TextField placeholder="City" id="city"/> <br/>
                <TextField placeholder="State" id="state"/> <br/>
                <TextField placeholder="Address" id="address"/> <br/>
                <TextField placeholder="Date" id="date"/> <br/>
                <TextField placeholder="Start" id="start"/> <br/>
                <TextField placeholder="End" id="end"/> <br/>

                {/* <select name="category" id="cat">   */}
                <Select
                    native
                    inputProps={{
                        name: 'category',
                        id: 'cat',
                    }}
                >
                    <option>Food drive</option>
                    <option>Shelters</option>
                    <option>Water</option>
                    <option>Charging station</option>
                </Select> <br/> 

                <TextField placeholder="Necessities" id="nec"/> <br/>


                <Button type="submit" onClick={handleSubmit}>Create event</Button>

                <p>{status}</p>
            </form>
        </div>
    )
}
