import styles from "./styles";
import {useState} from "react";
import AirplanesForm from "./forms/AirplanesForm";
import AirportsForm from "./forms/AirportsForm";
import FlightsForm from "./forms/FlightsForm";

const SideMenuItem = ({title, setCurrentForm, currentForm}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}

            onClick={() => setCurrentForm(title.toLowerCase())}

            style={{
                ...styles.sideMenuItemContainer, ...{
                    borderLeftWidth: (currentForm === title.toLowerCase()) ? '5px' : 0,
                    backgroundColor: hovered? '#f0f0f0' : null
                }
            }}>
            <p style={{
                marginLeft: '20px'
            }}>{title}</p>
        </div>
    );
}

const Admin = () => {
    const [currentForm, setCurrentForm] = useState('airports');

    return (
        <div style={styles.container}>
            <h1>Administration</h1>

            <div style={styles.contentContainer}>
                <div style={styles.sideMenuContainer}>
                    <SideMenuItem
                        title={'Airports'}
                        currentForm={currentForm}
                        setCurrentForm={setCurrentForm}
                    />

                    <SideMenuItem
                        title={'Airplanes'}
                        currentForm={currentForm}
                        setCurrentForm={setCurrentForm}
                    />

                    <SideMenuItem
                        title={'Flights'}
                        currentForm={currentForm}
                        setCurrentForm={setCurrentForm}
                    />
                </div>

                <div style={styles.formContainer}>
                    {currentForm === 'airports' && <AirportsForm />}
                    {currentForm === 'airplanes' && <AirplanesForm />}
                    {currentForm === 'flights' && <FlightsForm />}
                </div>
            </div>
        </div>
    );
};

export default Admin;