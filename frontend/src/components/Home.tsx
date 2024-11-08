import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to NFT Marketplace</h1>
      <p>Explore and trade unique digital assets.</p>
      <Link to="/nfts">View NFTs</Link>
    </div>
  );
};

export default Home;
