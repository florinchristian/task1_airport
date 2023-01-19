import styles from "./styles";

import SearchInput from "../../components/SearchInput";
import {useEffect, useState} from "react";

import {BiUserCircle, BiChevronDown, BiLogOut} from "react-icons/bi";
import {MdOutlineAirplaneTicket} from 'react-icons/md';

import AuthModal from "../../components/AuthModal";
import browseAirports from "../../services/browseAirports";
import browseFlights from "../../services/browseFlights";

const DropdownOption = ({icon, title, onClick}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                width: '150px',
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                color: '#0079ff',
                cursor: 'pointer',
                backgroundColor: hovered ? '#f8f8f8' : 'white'
            }}
        >
            <div style={{
                display: 'flex'
            }}>
                {icon}
            </div>

            <p style={{
                width: '100%',
                textAlign: 'center'
            }}>{title}</p>
        </div>
    );
};

const UserDropdown = ({userEmail}) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const logOut = () => {
        delete window.sessionStorage['userEmail'];
        window.location.reload();
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <p style={{
                color: 'white'
            }}>{userEmail}</p>

            <div onClick={() => setDropdownVisible(!dropdownVisible)} style={{
                marginLeft: '10px',
                color: 'white',
                border: '2px solid white',
                borderRadius: '50px',
                cursor: 'pointer'
            }}>
                <BiChevronDown style={{
                    width: '25px',
                    height: '25px',
                    display: 'flex'
                }}/>
            </div>

            {dropdownVisible &&
                <div style={{
                    position: 'absolute',
                    backgroundColor: 'white',
                    right: 10,
                    top: 50,
                    borderRadius: '5px',
                    overflow: 'hidden'
                }}>
                    <DropdownOption
                        icon={<MdOutlineAirplaneTicket/>}
                        title={"Your tickets"}
                    />

                    <DropdownOption
                        icon={<BiLogOut/>}
                        title={"Log out"}
                        onClick={logOut}
                    />
                </div>
            }
        </div>
    );
}

const LoginButton = ({onClick}) => {
    return (
        <button onClick={onClick} style={{
            cursor: 'pointer',
            background: 'transparent',
            border: '2px solid white',
            color: 'white',
            borderRadius: '25px',
            padding: '5px 10px 5px 10px'
        }}>
            Enter your account
        </button>
    );
}

const AuthHeader = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginModalVisible, setLoginModalVisible] = useState(false);

    const checkIfLoggedIn = () => {
        if (!window.sessionStorage['userEmail']) {
            console.log('No user signed in.');
            return;
        }

        console.log(`User signed in as ${window.sessionStorage['userEmail']}`);
        setLoggedIn(true);
    };

    useEffect(() => {
        checkIfLoggedIn();
    }, []);

    return (
        <div style={{
            width: 'calc(100% - 10px)',
            height: '50px',
            paddingRight: '10px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
        }}>
            <AuthModal
                visible={loginModalVisible}
                closeModal={() => setLoginModalVisible(false)}
            />

            <BiUserCircle style={{
                color: 'white',
                width: '30px',
                height: '30px',
                marginRight: '10px'
            }}/>

            {loggedIn ?
                <UserDropdown userEmail={window.sessionStorage['userEmail']}/>
                :
                <LoginButton onClick={() => setLoginModalVisible(true)}/>
            }
        </div>
    );
};

const SearchItem = ({item, onClick, selected}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            style={{
                backgroundColor: (hovered || selected)? '#f0f0f0' : null,
                padding: '10px',
                cursor: 'pointer'
            }}
        >
            {item['name']}, {item['country']}, {item['county']}
        </div>
    );
}

const Home = () => {
    const [fromAirportSearch, setFromAirportSearch] = useState('');
    const [toAirportSearch, setToAirportSearch] = useState('');

    const [fromAirportResult, setFromAirportResults] = useState([]);
    const [toAirportResult, setToAirportResults] = useState([]);

    const [fromLoading, setFromLoading] = useState(false);
    const [toLoading, setToLoading] = useState(false);

    const [selectedFromAirport, setSelectedFromAirport] = useState(-1);
    const [selectedToAirport, setSelectedToAirport] = useState(-1);

    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const [isOneWay, setIsOneWay] = useState('false');

    const [numberOfSeats, setNumberOfSeats] = useState(1);

    const searchFromAirports = async () => {
        setFromLoading(true);
        setSelectedFromAirport(-1);

        const results = await browseAirports(fromAirportSearch);
        setFromAirportResults(results);

        setFromLoading(false);
    };

    const searchToAirports = async () => {
        setToLoading(true);
        setSelectedToAirport(-1);

        const results = await browseAirports(toAirportSearch);
        setToAirportResults(results);

        setToLoading(false);
    }

    const compute = place => {
        if (place === 'to')
            return selectedToAirport;
        else
            return selectedFromAirport;
    }

    const renderResults = (results, place) => {
        return results.map((item, index) => (
            <SearchItem
                key={index}
                item={item}
                onClick={() => {
                    if (place === 'from')
                        setSelectedFromAirport(index);
                    else
                        setSelectedToAirport(index);
                }}
                selected={compute(place) === index}
            />
        ));
    }

    const searchForFlights = async () => {
        const config = {
            'fromAirport': selectedFromAirport,
            'toAirport': selectedToAirport,
            'departureDate': departureDate,
            'numberOfSeats': numberOfSeats
        };

        if (!isOneWay)
            config['returnDate'] = returnDate;

        const result = await browseFlights(config);

        console.log(result);
    }

    useEffect(() => {

    }, []);

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            background: "linear-gradient(180deg, rgba(0,121,255,1) 0%, rgba(0,212,255,0) 100%)",
        }}>
            <AuthHeader/>

            <div style={styles.container}>
                <h1 style={styles.title}>Flightr</h1>
                <h3 style={styles.subTitle}>Cheapest and fastest flights on the web</h3>

                <div style={styles.searchInputsContainer}>
                    <div>
                        <SearchInput
                            type={'text'}
                            title={'From'}
                            placeholder={'Enter a city or an airport...'}
                            value={fromAirportSearch}
                            onTextChange={newValue => {
                                setFromAirportSearch(newValue);

                                if (newValue.length >= 3)
                                    searchFromAirports();
                            }}
                        />

                        {fromLoading ? <div>Loading</div> :
                            <>
                                {!fromAirportResult.length ? <div>There are no airports.</div> :
                                    <div style={styles.airportResultContainer}>
                                        {renderResults(fromAirportResult, 'from')}
                                    </div>
                                }
                            </>
                        }

                        {/*<p>Selected airport {selectedFromAirport}</p>*/}
                    </div>

                    <div>
                        <SearchInput
                            type={'text'}
                            title={'To'}
                            placeholder={'Enter a city or an airport...'}
                            value={toAirportSearch}
                            onTextChange={newValue => {
                                setToAirportSearch(newValue);

                                if (newValue.length >= 3)
                                    searchToAirports();
                            }}
                        />

                        {toLoading ? <div>Loading</div> :
                            <>
                                {!toAirportResult.length ? <div>There are no airports.</div> :
                                    <div style={styles.airportResultContainer}>
                                        {renderResults(toAirportResult, 'to')}
                                    </div>
                                }
                            </>
                        }

                        {/*<p>Selected airport {selectedToAirport}</p>*/}

                    </div>

                    <SearchInput
                        type={'date'}
                        title={'Departure'}
                        value={departureDate}
                        onTextChange={newValue => {
                            setDepartureDate(newValue);
                        }}
                    />

                    <div>
                        <SearchInput
                            disabled={isOneWay === 'true'}
                            type={'date'}
                            title={'Return'}
                            value={returnDate}
                            onTextChange={newValue => {
                                setReturnDate(newValue);
                            }}
                        />

                        <div style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <input value={isOneWay} onChange={event => {
                                const newValue = event.target.value;

                                setIsOneWay((newValue === 'true')? 'false' : 'true');
                            }} type={"checkbox"}/>
                            <p>One way</p>
                        </div>
                    </div>

                    <div>
                        <p>Number of seats:</p>
                        <input value={numberOfSeats} onChange={event => setNumberOfSeats(event.target.value)} type={'number'} min={1} max={6}/>
                    </div>

                    <button onClick={browseFlights} style={styles.submitButtonStyle}>Search</button>
                </div>
            </div>
        </div>
    );
};

export default Home;