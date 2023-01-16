import styles from "./styles";

import SearchInput from "../../components/SearchInput";
import {useEffect, useState} from "react";

import {BiUserCircle, BiChevronDown, BiLogOut} from "react-icons/bi";
import {MdOutlineAirplaneTicket} from 'react-icons/md';

import AuthModal from "../../components/AuthModal";

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
                backgroundColor: hovered? '#f8f8f8' : 'white'
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
                        icon={<MdOutlineAirplaneTicket />}
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

const Home = () => {
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
                    <SearchInput
                        title={'From'}
                        placeholder={'Enter a city or an airport...'}
                    />

                    <SearchInput
                        title={'To'}
                        placeholder={'Enter a city or an airport...'}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;