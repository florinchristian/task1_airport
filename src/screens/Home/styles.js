const styles = {
    container: {
        width: '100%',
        height: 'calc(100% - 50px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    title: {
        color: 'white'
    },
    subTitle: {
        color: 'white'
    },
    searchInputsContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    airportResultContainer: {
        width: '231px',
        maxHeight: '60px',
        overflowY: 'scroll',
        backgroundColor: 'white',
        marginTop: '10px',
        borderRadius: '5px'
    },
    submitButtonStyle: {
        height: '27px'
    }
};

export default styles;