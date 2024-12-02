import React, { useState, useEffect } from 'react';

const ResultCard = ({ result, delay }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [rating, setRating] = useState(0); 

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    const handleStarClick = (starIndex) => {
        setRating(starIndex + 1); 
    };

    return (
        <div style={{ ...styles.card, ...(isVisible ? styles.fadeIn : styles.hidden) }}>
            <h3 style={styles.cardTitle}>{result.title}</h3>
            <p style={styles.cardSnippet}>{result.snippet}</p>
            <p style={styles.cardDetails}>{result.details}</p>
            <div style={styles.ratingContainer}>
                {[...Array(5)].map((_, i) => (
                    <span
                        key={i}
                        onClick={() => handleStarClick(i)}
                        style={{
                            color: i < rating ? '#ffbf00' : '#bbb', 
                            cursor: 'pointer',
                        }}
                    >
                        ★
                    </span>
                ))}
            </div>
        </div>
    );
};

const styles = {
    card: {
        width: '100%',
        maxWidth: '700px',
        padding: '20px',
        margin: '15px 0',
        borderRadius: '12px',
        border: '1px solid #ddd',
        boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
        backgroundColor: '#ffffff',
        textAlign: 'left',
        opacity: 0,
        transform: 'translateY(20px) scale(0.98)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
    },
    fadeIn: {
        opacity: 1,
        transform: 'translateY(0) scale(1)',
    },
    hidden: {
        opacity: 0,
        transform: 'translateY(20px) scale(0.98)',
    },
    cardTitle: {
        fontSize: '1.6rem',
        color: '#00796b',
        marginBottom: '10px',
    },
    cardSnippet: {
        fontSize: '1rem',
        color: '#555',
    },
    cardDetails: {
        fontSize: '0.9rem',
        color: '#777',
        marginTop: '10px',
    },
    ratingContainer: {
        marginTop: '10px',
        fontSize: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
    },
};

export default ResultCard;