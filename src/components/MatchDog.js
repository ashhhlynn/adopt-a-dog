import React from 'react';
import { Header, Image, ModalContent, ModalHeader } from 'semantic-ui-react';

const MatchDog = (props) => {
    return (
        <>
        <ModalHeader>You matched with...</ModalHeader>
        <ModalContent>
            <center>
                <Header as='h2' style={{color:"#009c95"}}>{props.match.name}</Header>
                <Image src={props.match.img} size='small'  />
                <br></br>
                Age: {props.match.age} <br></br>
                Breed: {props.match.breed}<br></br>
                Zip Code: {props.match.zip_code}
            </center>
        </ModalContent>
        </>
    );
};

export default MatchDog;