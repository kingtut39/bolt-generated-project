import axios from 'axios';

const OPENSEA_API_KEY = 'cafb5a1da99945848ad69f5bba875ddd';

export const getNFTs = async (req, res) => {
  try {
    const response = await axios.get('https://api.opensea.io/api/v1/assets', {
      headers: {
        'X-API-KEY': OPENSEA_API_KEY
      },
      params: {
        order_direction: 'desc',
        offset: 0,
        limit: 20
      }
    });

    const nfts = response.data.assets.map(asset => ({
      id: asset.id,
      name: asset.name,
      image_url: asset.image_url
    }));

    res.json(nfts);
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    res.status(500).json({ message: 'Error fetching NFTs' });
  }
};

export const getNFTDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.opensea.io/api/v1/asset/${id}`, {
      headers: {
        'X-API-KEY': OPENSEA_API_KEY
      }
    });

    const asset = response.data;
    const nftDetails = {
      id: asset.id,
      name: asset.name,
      description: asset.description,
      image_url: asset.image_url,
      creator: asset.creator.user?.username || 'Unknown',
      owner: asset.owner.user?.username || 'Unknown',
      price: asset.last_sale?.total_price || 'Not for sale'
    };

    res.json(nftDetails);
  } catch (error) {
    console.error('Error fetching NFT details:', error);
    res.status(500).json({ message: 'Error fetching NFT details' });
  }
};
