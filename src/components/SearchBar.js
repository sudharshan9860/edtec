import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const grades = ['8th', '9th', '10th', '11th', '12th'];
const subjects = ['Mathematics'];
const chapters = {
    Mathematics: ['Algebra', 'Geometry', 'Trigonometry', 'Calculus'],
};

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedChapter, setSelectedChapter] = useState('');
    const [validationError, setValidationError] = useState(null);
    const [ocrText, setOcrText] = useState('');
    const [ocrProcessing, setOcrProcessing] = useState(false);

    const handleOcrUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setOcrProcessing(true);

            Tesseract.recognize(
                file,
                'eng',
                {
                    logger: (m) => console.log(m),
                }
            ).then(({ data: { text } }) => {
                setOcrText(text);
                setQuery(text); 
                setOcrProcessing(false);
                alert("OCR processing complete. Please review or edit the extracted text.");
            }).catch((error) => {
                console.error("OCR failed:", error);
                setOcrProcessing(false);
                alert("Failed to process the image. Please try again.");
            });
        }
    };

    const handleSearch = () => {
        const searchQuery = query || ocrText; 
        if (!searchQuery || !selectedGrade || !selectedSubject || !selectedChapter) {
            setValidationError("Please fill in all fields before searching.");
        } else {
            setValidationError(null);
            onSearch(searchQuery, selectedGrade, selectedSubject, selectedChapter);
        }
    };

    const handleInputChange = (field, value) => {
        setValidationError(null);
        if (field === 'query') setQuery(value);
        if (field === 'grade') {
            setSelectedGrade(value);
            setSelectedSubject('');
            setSelectedChapter('');
        }
        if (field === 'subject') setSelectedSubject(value);
        if (field === 'chapter') setSelectedChapter(value);
    };

    return (
        <div style={styles.container}>
            <div style={styles.ocrContainer}>
                <input
                    type="file"
                    accept="image/*;capture=camera"
                    onChange={handleOcrUpload}
                    style={styles.inputFile}
                />
                {ocrProcessing && <p style={styles.processingText}>Processing OCR...</p>}
            </div>
            <textarea
                placeholder="Enter your question or edit the extracted text here..."
                value={query || ocrText} 
                onChange={(e) => setQuery(e.target.value)}
                style={styles.textArea}
                disabled={ocrProcessing} 
            />
            <div style={styles.inlineContainer}>
                <select
                    value={selectedGrade}
                    onChange={(e) => handleInputChange('grade', e.target.value)}
                    style={styles.select}
                >
                    <option value="">Select Grade</option>
                    {grades.map((grade) => (
                        <option key={grade} value={grade}>{grade}</option>
                    ))}
                </select>
                <select
                    value={selectedSubject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    style={styles.select}
                >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                        <option key={subject} value={subject}>{subject}</option>
                    ))}
                </select>
                <select
                    value={selectedChapter}
                    onChange={(e) => handleInputChange('chapter', e.target.value)}
                    style={styles.select}
                    disabled={!selectedSubject}
                >
                    <option value="">Select Chapter</option>
                    {selectedSubject && chapters[selectedSubject].map((chapter) => (
                        <option key={chapter} value={chapter}>{chapter}</option>
                    ))}
                </select>
            </div>
            <button onClick={handleSearch} style={styles.button}>Search</button>
            {validationError && <p style={styles.errorText}>{validationError}</p>}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        alignItems: 'center',
        marginBottom: '30px',
        width: '100%',
        maxWidth: '800px',
        padding: '20px',
    },
    ocrContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputFile: {
        width: '100%',
        maxWidth: '400px',
        marginBottom: '15px',
    },
    processingText: {
        color: '#00796b',
        fontSize: '1rem',
        fontStyle: 'italic',
    },
    textArea: {
        width: '100%',
        minHeight: '100px',
        padding: '12px',
        borderRadius: '12px',
        border: '1px solid #cccccc',
        fontSize: '16px',
        backgroundColor: '#ffffff',
        color: '#333333',
        outline: 'none',
        overflowY: 'auto',
    },
    inlineContainer: {
        display: 'flex',
        gap: '10px',
        width: '100%',
        justifyContent: 'space-between',
    },
    select: {
        width: '32%',
        padding: '10px',
        borderRadius: '12px',
        border: '1px solid #cccccc',
        backgroundColor: '#ffffff',
        color: '#333333',
    },
    button: {
        padding: '10px 25px',
        borderRadius: '12px',
        fontSize: '16px',
        backgroundColor: '#00796b',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
    },
    errorText: {
        color: '#d9534f',
        fontSize: '1rem',
    },
};

export default SearchBar;
