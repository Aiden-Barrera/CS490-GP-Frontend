// src/App.js
import React, { useEffect, useState } from 'react';
import Navbar from './NavBar';
function App() {
  const [actorData, setActorData] = useState([]);
  const [filmData, setFilmData] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);
  const [selectedFilms, setSelectedFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);

  useEffect(() => {
    fetchActors();
    fetchFilms();
  }, []);

  const fetchActors = () => {
    fetch('http://localhost:8080/actors')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched actors:", data); // Debugging
    
        const actorMap = new Map();
    
        data.forEach(actor => {
          const actorKey = `${actor.first_name} ${actor.last_name}`;
          if (!actorMap.has(actorKey)) {
            actorMap.set(actorKey, {
              first_name: actor.first_name,
              last_name: actor.last_name,
              films: []
            });
          }
          actorMap.get(actorKey).films.push({
            title: actor.title,
            rental_count: actor.rental_count
          });
        });
  
        // Convert map values to an array (ensuring we have only top 5 actors)
        const uniqueActors = Array.from(actorMap.values()).slice(0, 5);
  
        console.log("Processed top 5 actors:", uniqueActors); // Debugging
  
        setActorData(uniqueActors);
      })
      .catch(err => console.log("Error fetching actors:", err));
  };
  
  
  const fetchFilms = () => {
    fetch('http://localhost:8080/movie')
      .then(res => res.json())
      .then(data => {
        setFilmData(data.slice(0, 5)); // Show only top 5 movies
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: '50px' }} className="topFive">
      <Navbar />
      <h1>Top 5 Movies</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filmData.map((d, i) => (
            <tr key={i}>
              <td>{d.title}</td>
              <td>
                <button onClick={() => setSelectedFilm(d)}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedFilm && (
        <div>
          <h2>Film Details</h2>
          <table>
            <thead>
              <tr>
                <th>Genre</th>
                <th>ID</th>
                <th>Rental Count</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedFilm.category_name}</td>
                <td>{selectedFilm.film_id}</td>
                <td>{selectedFilm.rental_count}</td>
                <td>{selectedFilm.description}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => setSelectedFilm(null)}>Close</button>
        </div>
      )}

      <h1>Top 5 Actors</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {actorData.map((actor, i) => (
            <tr key={i}>
              <td>{actor.first_name}</td>
              <td>{actor.last_name}</td>
              <td>
                <button onClick={() => {
                  setSelectedActor(actor);
                  setSelectedFilms(actor.films);
                }}>View Actor Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedActor && (
        <div>
          <h2>Actor Details</h2>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedActor.first_name}</td>
                <td>{selectedActor.last_name}</td>
              </tr>
            </tbody>
          </table>
          <h3>Top 5 Films</h3>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Rental Count</th>
              </tr>
            </thead>
            <tbody>
              {selectedFilms.map((film, i) => (
                <tr key={i}>
                  <td>{film.title}</td>
                  <td>{film.rental_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

export default App;

