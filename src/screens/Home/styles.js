const styles = {
    container: {
        width: '100%',
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
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    airportResultContainer: {
        width: '231px',
        maxHeight: '160px',
        overflowY: 'scroll',
        backgroundColor: 'white',
        marginTop: '10px',
        borderRadius: '5px'
    },
    submitButtonStyle: {
        height: '27px'
    },
    searchContainer: {
        width: '100%',
    },
    flightsContainer: {

    },
    flightItem: {
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between'
    }
};

export default styles;