import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface NFT {
  id: string;
  name: string;
  image_url: string;
}

const NFTList: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/nfts');
        setNfts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        setError('Failed to fetch NFTs. Please try again later.');
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  if (loading) {
    return <div className="loading">Loading NFTs...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <h2>NFT List</h2>
      <div className="nft-grid">
        {nfts.map((nft) => (
          <Link to={`/nft/${nft.id}`} key={nft.id}>
            <div className="nft-item">
              <img src={nft.image_url} alt={nft.name} />
              <h3>{nft.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NFTList;
