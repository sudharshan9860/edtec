import React from 'react';
import ResultCard from './ResultCard';

const SearchResults = ({ results }) => {
    return (
        <div style={styles.resultsContainer}>
            {results.length === 0 ? (
                <p style={styles.noResultsText}>No results found. Please perform a search.</p>
            ) : (
                results.map((result, index) => (
                    <ResultCard key={result.id} result={result} delay={index * 300} />
                ))
            )}
        </div>
    );
};

const styles = {
    resultsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',       
        width: '100%',
        maxWidth: '800px',     
        margin: '0 auto',           
        padding: '20px',
        boxSizing: 'border-box',
    },
    noResultsText: {
        color: '#888',
        fontSize: '1.2rem',
        fontStyle: 'italic',
        textAlign: 'center',         
    },
};

export default SearchResults;
