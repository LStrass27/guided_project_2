import React from 'react';

const MapFilms = ({ data, onClick }) => {
    console.log(data)

    // Remove duplicates based on film.id
    const uniqueFilms = data ? Array.from(new Set(data.map(film => film.id)))
        .map(id => data.find(film => film.id === id)) : [];

    return (
        <div>
            {uniqueFilms.length > 0 ? (
                uniqueFilms.map((film) => (
                    <div key={film.film_id} onClick={() => onClick(film.film_id)} style={{ cursor: 'pointer' }}>
                        {film.film_id}
                    </div>
                ))
            ) : (
                <p>Loading Films data...</p> // Display a loading message or spinner
            )}
        </div>
    );
};

export default MapFilms;