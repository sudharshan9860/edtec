import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Spinner from './components/Spinner';

function App() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const performSearch = (query, grade, subject, chapter) => {
        if (!query || !grade || !subject || !chapter) {
            setError("Please fill in all fields before searching.");
            setResults([]);
            return;
        }

        setLoading(true);
        setError(null);

        setTimeout(() => {
            const mockData = [
                {
                    id: 1,
                    title: `Result for "${query}" in ${subject} - ${chapter}`,
                    snippet: "This is a sample snippet of the result.",
                    details: "Detailed explanation of the result goes here."
                },
                {
                    id: 2,
                    title: `Another related result for "${query}"`,
                    snippet: "This is another snippet related to the query.",
                    details: "Additional details and explanation."
                }
            ];

            setResults(mockData);
            setLoading(false);
        }, 1500);  
    };

    return (
        <div style={styles.appContainer}>
            <div style={styles.overlay}>
                <h1 style={styles.title}>Math RAG Search</h1>
                <SearchBar onSearch={performSearch} />
                {loading ? <Spinner /> : error ? <p style={styles.errorText}>{error}</p> : <SearchResults results={results} />}
            </div>
        </div>
    );
}

const styles = {
    appContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        background: 'linear-gradient(135deg, #3f87a6, #ebf8e1, #f69d3c)',
        fontFamily: "'Roboto', sans-serif",
        color: '#333333',
    },
    overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',  
        padding: '40px',
        borderRadius: '15px',
        width: '90%',
        maxWidth: '900px',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
    },
    title: {
        fontSize: '3.5rem',
        color: '#00796b',  
        marginBottom: '30px',
        fontWeight: 'bold',
    },
    errorText: {
        color: '#d9534f',  
        fontSize: '1.2rem',
        fontStyle: 'italic',
    },
};

export default App; 