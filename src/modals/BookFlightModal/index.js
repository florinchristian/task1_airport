import styles from "./styles";
import {useEffect, useState} from "react";

const useForceUpdate = () => {
    const [value, setValue] = useState(1);
    return () => setValue(value * -1);
}

const BookFlightModal = ({visible, flightConfig, closeModal, createBooking, maximumSeats}) => {
    const [bodyHovered, setBodyHovered] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState(null);

    const [seatsCounter, setSeatsCounter] = useState(0);

    const forceUpdate = useForceUpdate();

    const initializeSeats = () => {
        let n = flightConfig['height'];
        let m = flightConfig['width'];

        let seats = {};

        for (let i = 1; i <= n ; ++i) {
            seats[i] = {};

            for (let j = 1; j <= m; ++j)
                seats[i][j] = false;
        }

        console.log(seats);
    };

    const renderSeats = () => {
        let n = flightConfig['height'];
        let m = flightConfig['width'];

        let seats = [];

        initializeSeats();


        for (let i = 1; i <= n; ++i) {
            let row = []
            let elements = [];

            for (let j = 1; j <= m; ++j) {
                elements.push(
                    <div onClick={() => {
                        let newSelectedSeats = selectedSeats;

                        if (newSelectedSeats[i] === undefined) {
                            newSelectedSeats[i] = {};
                            newSelectedSeats[i][j] = true;
                            setSeatsCounter(seatsCounter + 1);
                        } else
                            if (newSelectedSeats[i][j] === undefined) {
                                newSelectedSeats[i][j] = true;
                            }
                            else {
                                if (!newSelectedSeats[i][j] === true && seatsCounter >= maximumSeats) {
                                    setSelectedSeats(newSelectedSeats);

                                    forceUpdate();

                                    return;
                                }

                                newSelectedSeats[i][j] = !newSelectedSeats[i][j];

                                if (newSelectedSeats[i][j])
                                    setSeatsCounter(seatsCounter + 1);
                                else
                                    setSeatsCounter(seatsCounter - 1);
                            }

                        setSelectedSeats(newSelectedSeats);

                        forceUpdate();
                    }} style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: (selectedSeats[i] !== undefined && selectedSeats[i][j] === true) ? 'cyan' : 'gray',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}>
                        {i} {j}
                    </div>
                );

                if (elements.length === m / 2) {
                    row.push(
                        <div>
                            {elements}
                        </div>
                    );

                    elements = [];
                }
            }

            seats.push(
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    marginTop: '10px'
                }}>
                    {row}
                </div>
            );
        }

        return seats;
    };

    useEffect(() => {
        //console.log(selectedSeats);
        console.log({maximumSeats});
        console.log({seatsCounter});
    }, [selectedSeats]);

    if (visible)
        return (
            <div onClick={() => {
                if (!bodyHovered)
                    closeModal();
            }} style={styles.container}>
                <div
                    onMouseEnter={() => setBodyHovered(true)}
                    onMouseLeave={() => setBodyHovered(false)}

                    style={styles.body}
                >
                    <h2>Book your flight</h2>
                    <p>Please pick your seat(s):</p>

                    <div style={styles.seatsContainer}>
                        {renderSeats()}
                    </div>

                    <button onClick={() => createBooking(selectedSeats)}>Book flight</button>
                </div>
            </div>
        );

    return null;
};

export default BookFlightModal;