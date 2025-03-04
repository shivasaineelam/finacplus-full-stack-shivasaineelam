import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addname } from './utlils/useSlice';
import Header from './components/Header'; 
import useGenderDetails from './hooks/useGenderDetails';
import UserForm from './components/UserForm';

function App() {
  const name = useSelector((store) => store.user.name);
  const dispatch = useDispatch();
  useGenderDetails();

  return (
    <div>
      <Header /> 

      <h1>{name}</h1>
      <h1>hello</h1>
      <button
        onClick={() => {
          dispatch(addname('shivasaineelam'));
        }}
      >
        click me
      </button>
      <UserForm/>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

export default App;
