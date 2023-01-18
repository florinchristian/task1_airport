import styles from "./styles";

const SearchInput = ({title, placeholder, value, onTextChange}) => {

    return (
        <div style={styles.container}>
            <p style={styles.title}>{title}</p>

            <input
                value={value}
                onChange={event => {
                    onTextChange(event.target.value);
                }}
                style={styles.input}
                type={'text'}
                placeholder={placeholder}
            />
        </div>
    );
};

export default SearchInput;