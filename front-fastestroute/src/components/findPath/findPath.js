import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ShowData from '../showData/showData';

const Container = styled.div`
    justify-content: center;
    align-items: center;
    background-color: white;
    width: 500px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin: auto;
    margin-top: 20px;
`;

const Title = styled.h1`
    font-size: 2rem;
    color: #279B61;
`
const SubTitle = styled.h3`
    font-size: 1rem;
    color: #888888;
`

const DivForm = styled.div`
    margin-top: 20px;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
`;

const Input = styled.input`
    width: 90%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const Button = styled.button`
    background-color: #279B61;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const PositiveResponse = styled.div`
    margin-top: 20px;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
`;

const ErrorResponse = styled.div`
    margin-top: 20px;
    background-color: #993333;
    color: #F0F0F0;
    padding: 10px;
    border-radius: 5px;
`;

const FindPath = () => {
  const [from, setFrom] = useState('');
  const [pick, setPick] = useState('');
  const [destination, setDestination] = useState('');
  const [info, setInfo] = useState('');
  const [erro, setErro] = useState('');
  const [calculating, setCalculating] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCalculating(true);

    if(!from || !pick || !destination){
      setInfo('');
      setErro('Please verify that all values have been provided.');
      return;
    }

    const url = `http://localhost:3001/time/${from}/${pick}/${destination}`;

    try {
      const response = await axios.get(url);
      setErro('');
      setInfo(response.data);
    } catch (error) {
      setInfo('');
      setErro(error.response?.data?.Error ?? error.message);
    }

    setCalculating(false);

  }


  return (
    <Container>
      <>
        <Title>
          Input the coordinates:
        
        </Title>

        <SubTitle>
          Remember, all these positions should be informed as if they were coordinates of a chessboard by letters on the horizontal axis (A to H) and numbers on the vertical axis (1 to 8). For example, <b>F3</b>.
        </SubTitle>
        <form onSubmit={handleSubmit}>
            
            <Input type="text" placeholder="Drone start" value={from} onChange={(e) => setFrom(e.target.value)} />
            <Input type="text" placeholder="Object pick-up" value={pick} onChange={(e) => setPick(e.target.value)} />
            <Input type="text" placeholder="Delivery destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
            <Button type="submit">Enviar</Button>
        </form>

      </>

      {calculating && !info && !erro && (
        <PositiveResponse>
          Calculating...
        </PositiveResponse>
      )}

      {info && (
        <PositiveResponse key='response'>
            <ShowData response={info}/>
        </PositiveResponse>
      )}

      {erro && (
        <ErrorResponse key='error'>
          <b>{ erro }  </b>
        </ErrorResponse> 

      )}
    </Container>
  );

  
}

export default FindPath;