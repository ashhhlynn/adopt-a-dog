import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';

const Favorite = (props) => {

    const [active, setActive] = useState(false);

    const handleAddToFavorites = () => {
        setActive(!active)
        active === false ? props.addToFavorites(props.i.id) : props.removeFromFavorites(props.i.id)      
    };

    return (
        <Icon name='heart' style={{cursor:"pointer"}} active={active} color={props.favorites.length === 0 ? null : active ? 'teal': null} onClick={handleAddToFavorites}></Icon>
    );
};

export default Favorite;