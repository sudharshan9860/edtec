import React from 'react';

const Spinner = () => {
    return (
        <div style={styles.spinner}>
            <div style={styles.doubleBounce1}></div>
            <div style={styles.doubleBounce2}></div>
        </div>
    );
};

const styles = {
    spinner: {
        width: '40px',
        height: '40px',
        position: 'relative',
    },
    doubleBounce1: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        backgroundColor: '#4CAF50',
        opacity: 0.6,
        position: 'absolute',
        top: 0,
        left: 0,
        animation: 'bounce 2s infinite ease-in-out',
    },
    doubleBounce2: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        backgroundColor: '#4CAF50',
        opacity: 0.6,
        position: 'absolute',
        top: 0,
        left: 0,
        animation: 'bounce 2s infinite ease-in-out',
        animationDelay: '-1s',
    },
};

export default Spinner;
