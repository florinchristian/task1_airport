import styles from "./styles";

const SearchInput = ({title, placeholder, value, onTextChange, type, disabled}) => {

    return (
        <div style={styles.container}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <p style={styles.title}>{title}</p>
            </div>

            <input
                disabled={disabled}
                value={value}
                onChange={event => {
                    onTextChange(event.target.value);
                }}
                style={styles.input}
                type={type}
                placeholder={placeholder}
            />
        </div>
    );
};

export default SearchInput;