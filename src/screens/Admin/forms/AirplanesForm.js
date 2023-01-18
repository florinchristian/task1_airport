import {useState} from "react";
import insertAirplane from "../../../services/insertAirplane";

const AirplanesForm = () => {
    const [name, setName] = useState('');
    const [rowNumber, setRowNumber] = useState(0);
    const [columnNumber, setColumnNumber] = useState(0);

    const registerAirplane = async () => {
        await insertAirplane(name, rowNumber, columnNumber);

        console.log('Inserted airplane', name);
    };

    return(
        <div>
            <h2>Airplanes</h2>

            <div>
                <p>Name</p>
                <input value={name} onChange={event => setName(event.target.value)} type={'text'}/>
            </div>

            <div>
                <p>Row number</p>
                <input value={rowNumber} onChange={event => setRowNumber(event.target.value)} type={'number'} min={0} max={5}/>
            </div>

            <div>
                <p>Column number</p>
                <input value={columnNumber} onChange={event => setColumnNumber(event.target.value)} type={'number'} min={0} max={12}/>
            </div>

            <button onClick={registerAirplane}>Insert new airplane</button>
        </div>
    );
}

export default AirplanesForm;