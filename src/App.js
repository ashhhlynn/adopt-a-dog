import './App.css';
import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, Header, Icon } from 'semantic-ui-react';
import DogsContainer from './components/DogsContainer';
import LoginForm from './components/LoginForm';

class App extends Component {

  render (){  
    return (
      <BrowserRouter>
        <div className="App">
          <Container>
            <br></br>
            <Header as='h1'> Adopt a Dog <Icon name='paw' color='teal' /></Header>    
            <br></br>
            <Routes>
              <Route path='/' element={<LoginForm />}></Route>
              <Route path='/adopt' element={<DogsContainer />}></Route>
            </Routes>
          </Container>
        </div>
      </BrowserRouter>
    )
  };
};

export default App;