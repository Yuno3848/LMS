// utils/mux.js
import { Video } from '@mux/mux-node';
import fs from 'fs';

const muxClient = new Video({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export const uploadVideoToMux = async (filePath) => {
  try {
    const asset = await muxClient.assets.create({
      input: fs.createReadStream(filePath),
      playback_policy: ['public'],
    });

    fs.unlink(filePath, (err) => {
      if (err) console.error('Could not delete local file', err);
    });

    return {
      assetId: asset.id,
      playbackId: asset.playback_ids[0].id,
    };
  } catch (error) {
    throw new Error(`Mux upload failed: ${error.message}`);
  }
};
