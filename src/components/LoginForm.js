import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, FormInput, Header, Button } from 'semantic-ui-react';

const LoginForm = () => {

  const [loginData, setLoginData] = useState({
    name: "",
    email: "", 
  });

  const navigate = useNavigate();

  const postLogin = () => {
    fetch("https://frontend-take-home-service.fetch.com/auth/login", {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: loginData.name,
        email: loginData.email
      }),
    })
    .then((response) => response.json())
    .catch(error => {
      console.error('Error:', error);
      navigate('/adopt')
    });
  };

  return (
    <div>
      <br></br><br></br>
      <Form size="large" style={{margin:"auto", width:"50%"}}> 
        <Header as='h3'>Login</Header>
          <FormInput onChange={(e) => setLoginData({...loginData, name: e.target.value})} placeholder='Name' />
          <FormInput onChange={(e) => setLoginData({...loginData, email: e.target.value})} placeholder='Email' />
          <Button onClick={postLogin} color='teal'>Submit</Button>
        </Form>
    </div>
  );
};

export default LoginForm;