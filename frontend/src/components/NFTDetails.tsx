import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface NFTDetails {
  id: string;
  name: string;
  description: string;
  image_url: string;
  creator: string;
  owner: string;
  price: string;
}

const NFTDetails: React.FC = () => {
  const [nft, setNft] = useState<NFTDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchNFTDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/nfts/${id}`);
        setNft(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching NFT details:', error);
        setError('Failed to fetch NFT details. Please try again later.');
        setLoading(false);
      }
    };

    if (id) {
      fetchNFTDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="loading">Loading NFT details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!nft) {
    return <div className="error-message">NFT not found</div>;
  }

  return (
    <div className="nft-details">
      <h2>{nft.name}</h2>
      <img src={nft.image_url} alt={nft.name} />
      <p>{nft.description}</p>
      <p>Creator: {nft.creator}</p>
      <p>Owner: {nft.owner}</p>
      <p>Price: {nft.price}</p>
    </div>
  );
};

export default NFTDetails;
