import {useState} from "react";
import browseAirports from "../../../services/browseAirports";
import browseAirplanes from "../../../services/browseAirplanes";
import insertFlight from "../../../services/insertFlight";

const styles = {
    resultsContainer: {
        width: '270px',
        height: '130px',
        overflowY: 'scroll',
        border: '2px solid gray'
    },
    halfContainer: {
        width: '50%',
        height: '100%',
        overflowY: 'scroll'
    },
    planeItemContainer: {
        width: '100%',
        padding: '10px 0 10px 0',
        cursor: 'pointer'
    },
    planeItemText: {
        marginLeft: '10px'
    },
    availablePlanesContainer: {
        width: '100%',
        height: 'calc(100% - 22px - 28px)',
        overflowY: 'scroll'
    }
};

const SearchItem = ({item, onClick, selected}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            style={{
                backgroundColor: (hovered || selected) ? '#f0f0f0' : null,
                padding: '10px',
                cursor: 'pointer'
            }}
        >
            {item['name']}, {item['country']}, {item['county']}
        </div>
    );
}

const PlaneItem = ({item, onClick, selected}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            style={{
                ...styles.planeItemContainer, ...{
                    backgroundColor: (hovered || selected) ? '#f0f0f0' : null,
                }
            }}
        >
            <p style={styles.planeItemText}>Name: {item['name']}</p>
            <p style={styles.planeItemText}>Number of seats: {item['rowNumber'] * item['columnNumber']}</p>
        </div>
    );
};

const FlightsForm = () => {
    const [fromAirportSearch, setFromAirportSearch] = useState('');
    const [toAirportSearch, setToAirportSearch] = useState('');

    const [fromAirportSearchResult, setFromAirportSearchResult] = useState([]);
    const [toAirportSearchResult, setToAirportSearchResult] = useState([]);

    const [selectedFromAirport, setSelectedFromAirport] = useState(-1);
    const [selectedToAirport, setSelectedToAirport] = useState(-1);

    const [selectedLeaveDate, setSelectedLeaveDate] = useState('');
    const [selectedArrivalDate, setSelectedArrivalDate] = useState('');

    const [price, setPrice] = useState(0);

    const [availableAirplanes, setAvailableAirplanes] = useState([]);
    const [selectedAirplane, setSelectedAirplane] = useState(-1);

    const fetchAvailableAirplanes = async () => {
        const result = await browseAirplanes();

        setAvailableAirplanes(result);
    }

    const registerFlight = async () => {
        await insertFlight({
            'airplane': availableAirplanes[selectedAirplane],
            'fromAirport': fromAirportSearchResult[selectedFromAirport],
            'toAirport': toAirportSearchResult[selectedToAirport],
            'startTime': selectedLeaveDate,
            'endTime': selectedArrivalDate,
            price,
        });

        window.location.reload();
    }

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row'
        }}>
            <div style={styles.halfContainer}>
                <h2>Flights</h2>

                <div>
                    <p>From</p>

                    <input
                        value={fromAirportSearch}
                        onChange={async event => {
                            setFromAirportSearch(event.target.value);

                            if (event.target.value.length >= 3) {
                                const result = await browseAirports(event.target.value);

                                setFromAirportSearchResult(result);
                                setSelectedFromAirport(-1);
                            }
                        }}
                        type={'text'}
                    />

                    <p>Search results:</p>
                    <div style={styles.resultsContainer}>
                        {fromAirportSearchResult.map((item, index) => (
                            <SearchItem
                                key={index}
                                item={item}
                                selected={selectedFromAirport === index}
                                onClick={() => setSelectedFromAirport(index)}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <p>To</p>

                    <input
                        value={toAirportSearch}
                        onChange={async event => {
                            setToAirportSearch(event.target.value);

                            if (event.target.value.length >= 3) {
                                const result = await browseAirports(event.target.value);

                                setToAirportSearchResult(result);
                                setSelectedToAirport(-1);
                            }
                        }}
                        type={'text'}
                    />

                    <p>Search results:</p>
                    <div style={styles.resultsContainer}>
                        {toAirportSearchResult.map((item, index) => (
                            <SearchItem
                                key={index}
                                item={item}
                                selected={selectedToAirport === index}
                                onClick={() => setSelectedToAirport(index)}
                            />
                        ))}
                    </div>
                </div>

                <p>Leave date</p>
                <input
                    type={'datetime-local'}
                    value={selectedLeaveDate}
                    onChange={event => setSelectedLeaveDate(event.target.value)}
                />

                <p>Arrival date</p>
                <input
                    type={'datetime-local'}
                    value={selectedArrivalDate}
                    onChange={event => setSelectedArrivalDate(event.target.value)}
                />


                <p>Price</p>
                <input type={'number'} min={1} max={9999} value={price} onChange={event => setPrice(event.target.value - 0)}/>

                <button onClick={fetchAvailableAirplanes} style={{
                    display: 'block'
                }}>See available airplanes
                </button>
            </div>

            <div style={{
                ...styles.halfContainer, ...{
                    overflowY: 'hidden'
                }
            }}>
                <h2>Available airplanes</h2>

                <div style={styles.availablePlanesContainer}>
                    {availableAirplanes.map((item, index) => (
                        <PlaneItem
                            key={index}
                            item={item}
                            onClick={() => setSelectedAirplane(index)}
                            selected={selectedAirplane === index}
                        />
                    ))}
                </div>

                <button onClick={registerFlight} style={{
                    display: 'block'
                }}>Confirm flight
                </button>
            </div>
        </div>
    );
}

export default FlightsForm;