import React from 'react';

export default ({Poster, Title}) => (
        <div className="movie">
            <img src={Poster} alt={Title}/>
            <h3>{Title}</h3>
        </div>
);