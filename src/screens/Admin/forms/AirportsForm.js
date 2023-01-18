import {useState} from "react";
import insertAirport from "../../../services/insertAirport";

const AirportsForm = () => {
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [county, setCounty] = useState('');
    const [street, setStreet] = useState('');

    const registerPlane = async () => {
        await insertAirport(name, country, county, street);

        console.log('Inserted', name);
    }

    return(
        <div>
            <h2>Airports</h2>

            <div>
                <p>Name</p>
                <input value={name} onChange={event => setName(event.target.value)} type={'text'}/>
            </div>

            <div>
                <p>Country</p>
                <input value={country} onChange={event => setCountry(event.target.value)} type={'text'}/>
            </div>

            <div>
                <p>County</p>
                <input value={county} onChange={event => setCounty(event.target.value)} type={'text'}/>
            </div>

            <div>
                <p>Street</p>
                <input value={street} onChange={event => setStreet(event.target.value)} type={'text'}/>
            </div>

            <button onClick={registerPlane}>Insert new airport</button>
        </div>
    );
};

export default AirportsForm;