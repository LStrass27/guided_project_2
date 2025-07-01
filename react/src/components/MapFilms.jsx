import React from 'react';

const MapFilms = ({ data, onClick }) => {
    console.log("IN MAP FILMS");
    

    // Remove duplicates based on film.id
    const uniqueFilms = data ? Array.from(new Set(data.map(film => film.id)))
        .map(id => data.find(film => film.id === id)) : [];

    return (
        <div>
            {uniqueFilms.length > 0 ? (
                uniqueFilms.map((film) => (
                    <div key={film.id} onClick={() => onClick(film.id)} style={{ cursor: 'pointer' }}>
                        {film.title}
                    </div>
                ))
            ) : (
                <p>Loading Films data...</p> // Display a loading message or spinner
            )}
        </div>
    );
};

export default MapFilms;