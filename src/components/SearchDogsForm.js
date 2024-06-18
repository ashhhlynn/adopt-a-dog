import React, { useState } from 'react';
import { Dropdown, Form, FormInput, FormField, FormGroup, FormRadio, Button } from 'semantic-ui-react';

const SearchDogsForm = (props) => {

    const [formData, setFormData] = useState({
        ageMin: "",
        ageMax: "", 
        size: "", 
        sort: "breed:asc",
        breeds: []
    });

    const breedsGroup = props.breedsAll.map((i, index) => ({
        key: index,
        text: i,
        value: i
    }));

    return (
        <Form style={{width:"90%"}}>
            <FormGroup inline widths='equal'>
                <label>Filter</label>
                <FormField>
                    <Dropdown onChange={(e, {value}) => setFormData({...formData, breeds: value})} value={formData.breeds} placeholder='Breeds' fluid multiple selection options={breedsGroup} />
                </FormField>
                <FormInput onChange={(e) => setFormData({...formData, ageMin: e.target.value})} fluid placeholder='Age Min.' />
                <FormInput onChange={(e) => setFormData({...formData, ageMax: e.target.value})} fluid placeholder='Age Max.' />
                <FormInput onChange={(e) => setFormData({...formData, size: e.target.value})} fluid placeholder='Size (Default 25)' />
            </FormGroup>
            <FormGroup inline>
                <label>Sort</label>
                <FormRadio checked={formData.sort === 'breed:asc'} onChange={() => setFormData({...formData, sort: 'breed:asc'})} label='Breed (Asc.)' />
                <FormRadio checked={formData.sort === 'breed:desc'} onChange={() => setFormData({...formData, sort: 'breed:desc'})} label='Breed (Desc.)' />
                <FormRadio checked={formData.sort === 'name:asc'} onChange={() => setFormData({...formData, sort: 'name:asc'})} label='Name (Asc.)' />
                <FormRadio checked={formData.sort === 'name:desc'} onChange={() => setFormData({...formData, sort: 'name:desc'})}label='Name (Desc.)' />
                <FormRadio checked={formData.sort === 'age:asc'} onChange={() => setFormData({...formData, sort: 'age:asc'})} label='Age (Asc.)' />
                <FormRadio checked={formData.sort === 'age:desc'} onChange={() => setFormData({...formData, sort: 'age:desc'})}label='Age (Desc.)' />
                <Button size='small' color='teal' circular onClick={() => props.getDogsSearch(formData)}>Apply</Button>
            </FormGroup>
        </Form>
    );
};

export default SearchDogsForm;