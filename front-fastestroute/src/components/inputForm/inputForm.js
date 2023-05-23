import React, { useState, useEffect } from 'react';

function InputForm() {
  const [from, setFrom] = useState('');
  const [pick, setPick] = useState('');
  const [destination, setDestination] = useState('');
  const [data, setData] = useState(null);
  // const [response, setResponse] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/time/${from}/${pick}/${destination}`) // Insira o URL da API que você quer chamar
      .then((response) => response.json()) // Isso formata a resposta para JSON
      .then((jsonData) => setData(jsonData)); // Salve o JSON formatado no estado
  }, []);

  return (
    <div>
      {data && 
        <div>
          <h2>Resumo</h2>
          <p>Total: {data.Total}</p>
          <h3>Caminho</h3>
          <ul>
            {data.Path.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
}

export default InputForm;
