import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import ItemList from './components/ItemList';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setItems(data);
        setFilteredItems(data);
      });
  }, []);

  useEffect(() => {
    setFilteredItems(
      items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, items]);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Item List
      </Typography>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ItemList items={filteredItems} />
    </Container>
  );
}

export default App;
