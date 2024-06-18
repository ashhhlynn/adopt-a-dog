import React from 'react';
import { CardGroup, CardHeader, Card, CardContent } from 'semantic-ui-react';
import Favorite from './Favorite';

const DisplayDogs = (props) => {

    const dogGroup = props.dogs.map( i => {
        return (
            <Card key={i.id}>
                <div style={{height:"160px", width:"210px"}}>
                    <img src={i.img} alt={i.name} style={{maxHeight:"160px", maxWidth:"210px"}} />
                </div>
                <CardContent>
                    <CardHeader style={{color:"#009c95", }}>{i.name}</CardHeader>
                    Age: {i.age}<br></br>
                    Breed: {i.breed}<br></br>
                    Zip Code: {i.zip_code}
                </CardContent>
                <CardContent extra>                
                    <Favorite i={i} addToFavorites={props.addToFavorites} removeFromFavorites={props.removeFromFavorites} favorites={props.favorites}/>
                </CardContent>
            </Card> 
        )
    })

    return (
        <CardGroup itemsPerRow={5}>
            {dogGroup}
        </CardGroup>
    )
};

export default DisplayDogs;