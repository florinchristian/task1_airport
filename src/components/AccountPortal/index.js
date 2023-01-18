import styles from './styles';

import {FiUserPlus} from "react-icons/fi";
import {RxEnter} from "react-icons/rx";

import {HiOutlineMail} from "react-icons/hi";
import {MdPassword} from "react-icons/md";
import {useState} from "react";
import registerUser from "../../services/registerUser";
import loginUser from "../../services/loginUser";

const FormInput = ({icon, placeholder, type, value, onTextChange}) => {
    return (
        <div style={{
            width: '100%',
            display: 'flex',
            borderBottomColor: '#dcdcdc',
            borderBottomWidth: '2px',
            borderBottomStyle: 'solid'
        }}>
            <div style={{
                marginRight: '10px',
                color: 'gray'
            }}>
                {icon}
            </div>

            <input value={value} onChange={event => onTextChange(event.target.value)} style={{
                outline: 0,
                border: 0,
                width: '100%'
            }} type={type} placeholder={placeholder}/>
        </div>
    );
};

const Section = ({icon, title, activeColor, onClick}) => {
    return (
        <div onClick={onClick} style={styles.sectionItemContainer}>
            {icon}
            <p>{title}</p>
        </div>
    );
};

const LoginSection = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        const result = await loginUser(email, password);

        if (result['message']) {
            alert(result['message']);
            return;
        }

        window.sessionStorage['userEmail'] = email;
        window.location.reload();
    }

    return(
        <>
            <FormInput
                icon={<HiOutlineMail/>}
                type={'email'}
                placeholder={'Your email...'}
                value={email}
                onTextChange={newValue => setEmail(newValue)}
            />

            <FormInput
                icon={<MdPassword/>}
                type={'password'}
                placeholder={'A secure password...'}
                value={password}
                onTextChange={newValue => setPassword(newValue)}
            />

            <button onClick={login} style={styles.submitButton}>Login</button>
        </>
    );
}

const RegisterSection = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');

    const register = async () => {
        await registerUser(email, password);

        window.sessionStorage['userEmail'] = email;
        window.location.reload();
    }

    return(
        <>
            <FormInput
                icon={<HiOutlineMail/>}
                type={'email'}
                placeholder={'Your email...'}
                value={email}
                onTextChange={newValue => setEmail(newValue)}
            />

            <FormInput
                icon={<MdPassword/>}
                type={'password'}
                placeholder={'A secure password...'}
                value={password}
                onTextChange={newValue => setPassword(newValue)}
            />

            <FormInput
                icon={<MdPassword/>}
                type={'password'}
                placeholder={'Confirm password...'}
                value={secondPassword}
                onTextChange={newValue => setSecondPassword(newValue)}
            />

            <button onClick={register} style={styles.submitButton}>Register</button>
        </>
    );
}

const AccountPortal = () => {
    const [currentSection, setCurrentSection] = useState('login');

    return (
        <div>
            <div style={styles.sectionsContainer}>
                <Section
                    icon={<FiUserPlus/>}
                    title={'Register'}
                    onClick={() => setCurrentSection('register')}
                />

                <Section
                    icon={<RxEnter/>}
                    title={'Log in'}
                    onClick={() => setCurrentSection('login')}
                />
            </div>

            {(currentSection === 'login') && <LoginSection />}
            {(currentSection === 'register') && <RegisterSection />}
        </div>
    );
};

export default AccountPortal;