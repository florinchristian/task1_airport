import styles from "./styles";

const SearchInput = ({title, placeholder}) => {
    return (
        <div style={styles.container}>
            <p style={styles.title}>{title}</p>

            <input style={styles.input} type={'text'} placeholder={placeholder}/>
        </div>
    );
};

export default SearchInput;