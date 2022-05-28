import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LikeButton from './components/LikeButton/LikeButton';

function App() {
  
  const [items, setItems] = useState([]);
  

  useEffect(() => {
    const fetchSearch = async () => {
        const result = await axios(
          `/data.json`
        );
        setItems(result.data);
    };
    fetchSearch();
  }, []);

  return (
    <div className="App">
      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: "20px" }}>
      
            <span>{item.name}</span>
            <LikeButton item={item}  />

        </div>
      ))}

    </div>
  );
}

export default App;
