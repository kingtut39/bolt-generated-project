import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import NFTList from './components/NFTList';
import NFTDetails from './components/NFTDetails';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nfts" element={<NFTList />} />
          <Route path="/nft/:id" element={<NFTDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
