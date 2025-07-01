import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Index from "./components/Index";
import Character from "./components/Character";
import Planet from "./components/Planet";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // State to store the current page number

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_CHARACTERS_URL);
            if (!response.ok) {
                throw new Error('Data could not be fetched!');
            }
            const json_response = await response.json();
            setData(json_response); // assign JSON response to the data variable.
        } catch (error) {
            console.error('Error fetching socks:', error);
        }
    };

    fetchData();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Index data={data} />} />
          <Route path="/character/:id" element={<Character />}  />
          <Route path="/planet/:id" element={<Planet />}  />
        </Routes>
        {error && <div className="error">{error}</div>}
      </Router>
    </>
  );
}

export default App
