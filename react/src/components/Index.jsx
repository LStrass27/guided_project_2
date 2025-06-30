//import Navigator from "./Navigator";
import Name from "./Name";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Index = (props) => {
    //const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleNameClick = (id) => {
        navigate(`/character/${id}`);
    };

    return (
        
        <section id="charactersList">
            {
                props.data.map((character) => (
                    <Name key={character._id} data={character} onClick={handleNameClick}/>
                ))
            }
        </section>
        
    );
};

export default Index;
