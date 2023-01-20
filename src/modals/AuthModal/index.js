import styles from "./styles";
import AccountPortal from "../../components/AccountPortal";
import {useState} from "react";

const AuthModal = ({visible, closeModal}) => {
    const [bodyIsHovered, setBodyIsHovered] = useState(false);

    if (visible)
        return (
            <div
                onClick={() => {
                    if (!bodyIsHovered)
                        closeModal();
                }}
                style={styles.container}
            >
                <div
                    onMouseEnter={() => {
                        setBodyIsHovered(true);
                    }}
                    onMouseLeave={() => {
                        setBodyIsHovered(false);
                    }}
                    style={styles.body}
                >
                    <h1>Enter your account</h1>

                    <AccountPortal />
                </div>
            </div>
        );

    return null;
};

export default AuthModal;