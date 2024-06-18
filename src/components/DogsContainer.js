import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Header, Segment, Button, Modal, Pagination } from 'semantic-ui-react';
import SearchDogsForm from './SearchDogsForm';
import DisplayDogs from './DisplayDogs';
import MatchDog from './MatchDog';

const DogsContainer = () => {

    const [dogs, setDogs] = useState([]);
    const [dogsAll, setDogsAll] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [breedsAll, setBreedsAll] = useState([]);
    const [resultsPages, setResultsPages] = useState(1);
    const [favorites, setFavorites] = useState([]);
    const [match, setMatch] = useState();
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://frontend-take-home-service.fetch.com/dogs/search?sort=breed:asc", {
            credentials: "include"
        })
        .then((response) => response.json())
        .then(data => {
            postDogs(data.resultIds)
        })
        getBreeds()
    }, []);

    const getDogsSearch = (formData) => {
        let breedParam = ''
        for (let i=0; i < formData.breeds.length; i++){
            breedParam = breedParam + `breeds[]=${formData.breeds[i]}&`
        }
        fetch(`https://frontend-take-home-service.fetch.com/dogs/search?${breedParam}&sort=${formData.sort}&ageMin=${formData.ageMin}&ageMax=${formData.ageMax}&size=${formData.size}`, {
            credentials: "include"
        })
        .then((response) => response.json())
        .then(data => {
            let results = data.resultIds.slice(0,100)
            postDogs(results)
            setResultsPages(Math.ceil(results.length/25))
            setFavorites([])
        })
    };

    const postDogs = (resultIds) => {
        fetch("https://frontend-take-home-service.fetch.com/dogs", {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                resultIds
            ),
        })
        .then((response) => response.json())
        .then(data => {
            setDogs(data.slice(0,25))
            setDogsAll(data)
            setActivePage(1)
        })
    };
    
    const getBreeds = () => {
        fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {
            credentials: "include"
        })
        .then((response) => response.json())
        .then(data => {
            setBreedsAll(data)
        })
    };

    const addToFavorites = (id) => {
        const newFavorites = [...favorites, id]
        setFavorites(newFavorites)
    };

    const removeFromFavorites = (id) => {
        const newFavorites = favorites.filter((x) => x !== id)
        setFavorites(newFavorites)
    };

    const handlePaginationChange = (e) => {
        setActivePage(e.target.innerHTML)
        let start = (e.target.innerHTML - 1)*25
        let newDogs = dogsAll.slice(start, start+25)
        setDogs(newDogs)
    };

    const postMatch = () => {
        fetch("https://frontend-take-home-service.fetch.com/dogs/match", {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(
                favorites
            ),
        })
        .then((response) => response.json())
        .then(data => {
            let dogMatch = dogsAll.find(x => x.id === data.match)
            setMatch(dogMatch)
            setOpen(true)
        })
    }

    const postLogout = () => {
        fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
          method: 'POST',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
        .then((response) => response.json())
        navigate('/')
    }

    return (
        <div>
            <br></br>
            <center>
                <Segment style={{width:"50%"}}>
                    <Header as='h4' style={{marginTop:"2.5%"}}>Heart your favorite dogs to find your match!</Header>
                    <Modal
                        onClose={() => setOpen(false)}
                        onOpen={postMatch}
                        open={open}
                        closeIcon
                        size="mini"
                        trigger={<Button size='large' color='teal' style={{marginBottom:"2%"}}>Match</Button>}
                    >
                        <MatchDog match={match} />
                    </Modal>
                </Segment>
                <br></br><br></br><br></br>
                <SearchDogsForm breedsAll={breedsAll} getDogsSearch={getDogsSearch} />
            </center>
            <br></br><br></br>
            <DisplayDogs addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} dogs={dogs} favorites={favorites}/>
            <br></br>
            <Pagination
                boundaryRange={0}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                prevItem={null}
                nextItem={null}
                activePage={activePage}
                siblingRange={1}
                totalPages={resultsPages}
                onPageChange={(e)=>handlePaginationChange(e)}
            />
            <br></br><br></br><br></br>
            <Button color='teal' onClick={postLogout}>Logout</Button> 
            <br></br><br></br>
        </div>
    );
};

export default DogsContainer;