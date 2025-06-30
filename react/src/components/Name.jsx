import React from 'react';


const Name = ({data, onClick}) => {
    return (

        <div onClick={()=>onClick(data.id)} style={{ cursor: 'pointer' }}>
            {data.name}
        </div>
    );
};

export default Name;

