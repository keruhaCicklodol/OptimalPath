import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [from, setFrom] = useState({ city: '' } || null);
  const [to, setTo] = useState({ city: '' } || null);
  const [distance, setDistance] = useState('');
  useEffect(
    () => {
      console.log('distance', distance);
      console.log('from, to', from, to);
    },
    [from, to, distance],
  );
  const getDistance = async () => {
    const options = {
      method: 'GET',
      url: 'https://distanceto.p.rapidapi.com/get',
      params: { route: `[{\"t\":\"${from}\"}, {\"t\":\"${to}\"}}]`, car: 'true' },
      headers: {
        'X-RapidAPI-Key': 'd489f2b082msh241b1a650482228p1ad90fjsn09b2ddc89d00',
        'X-RapidAPI-Host': 'distanceto.p.rapidapi.com',
      },
    };

    axios.request(options)
      .then((res) => {
        setDistance(res.data);
      }).catch((error) => {
        console.error(error);
      });
  };
  const changeHandler = (e) => {
    setFrom(e.target.value);
    setTo(e.target.value);
  };
  return (
    <div className="">
      <h2>Optimal Path search</h2>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">Start</span>
        <input onChange={changeHandler} type="text" name="city" value={from.city} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">Finish</span>
        <input id="titleinput" onChange={changeHandler} type="text" name="city" value={to.city} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
      </div>
      <button onClick={getDistance} type="button" className="btn btn-info">Search</button>
      <div className="d-flex justify-content-center space-between" id="distance">{distance.steps.car.distance}</div>
    </div>
  );
}
