import express from 'express';
import { getNFTs, getNFTDetails } from '../controllers/nftController.js';

const router = express.Router();

router.get('/nfts', getNFTs);
router.get('/nfts/:id', getNFTDetails);

export default router;
