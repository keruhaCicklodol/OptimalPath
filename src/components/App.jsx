import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [fromOne, setFromOne] = useState({ fromOne: '' } || null);
  const [toOne, setToOne] = useState({ toOne: '' } || null);
  const [fromTwo, setFromTwo] = useState({ fromTwo: '' } || null);
  const [toTwo, setToTwo] = useState({ toTwo: '' } || null);
  const [fromThree, setFromThree] = useState({ fromThree: '' } || null);
  const [toThree, setToThree] = useState({ toThree: '' } || null);
  const [distanceOne, setDistanceOne] = useState({});
  const [distanceTwo, setDistanceTwo] = useState({});
  const [distanceThree, setDistanceThree] = useState({});
  const [optimal, setOptimal] = useState([]);
  useEffect(
    () => {
      console.log('distance', distanceOne, distanceTwo, distanceThree);
      console.log('from, to', fromOne, toOne, fromTwo, toTwo, fromThree, toThree);
    },
    [fromOne, toOne, fromTwo, toTwo, fromThree, toThree, distanceOne, distanceTwo, distanceThree],
  );
  const getDistanceOne = async () => {
    const options = {
      method: 'GET',
      url: 'https://distanceto.p.rapidapi.com/get',
      params: { route: `[{\"t\":\"${fromOne}\"}, {\"t\":\"${toOne}\"}}]`, car: 'true' },
      headers: {
        'X-RapidAPI-Key': 'd489f2b082msh241b1a650482228p1ad90fjsn09b2ddc89d00',
        'X-RapidAPI-Host': 'distanceto.p.rapidapi.com',
      },
    };

    axios.request(options)
      .then((res) => {
        console.log(res.data);
        setDistanceOne(res.data.steps.car.distance);
      }).catch((error) => {
        console.error(error);
      });
  };
  const getDistanceTwo = async () => {
    const options = {
      method: 'GET',
      url: 'https://distanceto.p.rapidapi.com/get',
      params: { route: `[{\"t\":\"${fromTwo}\"}, {\"t\":\"${toTwo}\"}}]`, car: 'true' },
      headers: {
        'X-RapidAPI-Key': 'd489f2b082msh241b1a650482228p1ad90fjsn09b2ddc89d00',
        'X-RapidAPI-Host': 'distanceto.p.rapidapi.com',
      },
    };

    axios.request(options)
      .then((res) => {
        console.log(res.data);
        setDistanceTwo(res.data.steps.car.distance);
      }).catch((error) => {
        console.error(error);
      });
  };
  const getDistanceThree = async () => {
    const options = {
      method: 'GET',
      url: 'https://distanceto.p.rapidapi.com/get',
      params: { route: `[{\"t\":\"${fromThree}\"}, {\"t\":\"${toThree}\"}}]`, car: 'true' },
      headers: {
        'X-RapidAPI-Key': 'd489f2b082msh241b1a650482228p1ad90fjsn09b2ddc89d00',
        'X-RapidAPI-Host': 'distanceto.p.rapidapi.com',
      },
    };

    axios.request(options)
      .then((res) => {
        console.log(res.data);
        setDistanceThree(res.data.steps.car.distance);
      }).catch((error) => {
        console.error(error);
      });
  };
  const changeHandler = (e) => {
    setFromOne(e.target.value);
    setToOne(e.target.value);
    setFromTwo(e.target.value);
    setToTwo(e.target.value);
    setFromThree(e.target.value);
    setToThree(e.target.value);
  };
  const getOptimal = async () => {
    const result = await optimal.push(distanceOne, distanceTwo, distanceThree)
      .sort((a, b) => a - b);
    setOptimal(result);
  };
  return (
    <div className="">
      <h2>Optimal Path search</h2>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">Start One</span>
        <input onChange={changeHandler} type="text" name="fromOne" value={fromOne.fromOne} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">Finish One</span>
        <input id="titleinput" onChange={changeHandler} type="text" name="toOne" value={toOne.toOne} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
      </div>
      <button onClick={getDistanceOne} type="button" className="btn btn-info">Search</button>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">Start Two</span>
        <input onChange={changeHandler} type="text" name="fromTwo" value={fromTwo.fromTwo} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">Finish Two</span>
        <input id="titleinput" onChange={changeHandler} type="text" name="toTwo" value={toTwo.toTwo} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
      </div>
      <button onClick={getDistanceTwo} type="button" className="btn btn-info">Search</button>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">Start Three</span>
        <input onChange={changeHandler} type="text" name="fromThree" value={fromThree.fromThree} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">Finish Three</span>
        <input id="titleinput" onChange={changeHandler} type="text" name="toThree" value={toThree.toThree} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
      </div>
      <button onClick={getDistanceThree} type="button" className="btn btn-info">Search</button>
      <button onClick={getOptimal} type="button" className="btn btn-info">Get Optimal Path</button>
      <div className="d-flex justify-content-center space-between" id="distance">{optimal}</div>
    </div>
  );
}
