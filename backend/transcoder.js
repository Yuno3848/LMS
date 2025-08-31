// Import Transcoder client correctly
import { TranscoderServiceClient } from '@google-cloud/video-transcoder';

// Create the client
const client = new TranscoderServiceClient();

// Cloud Function entry point
export const transcodeVideo = async (event, context) => {
  const object = event;

  // Input file (raw upload)
  const inputUri = `gs://${object.bucket}/${object.name}`;
  // Output folder (transcoded)
  const outputUri = `gs://analog-reef-468911-j1-transcoded/${object.name}/`;

  console.log(`New file uploaded: ${inputUri}`);

  // Parent path (project + region)
  const parent = `projects/analog-reef-468911-j1/locations/asia-south1`;

  // Create Transcoder job request
  const request = {
    parent,
    job: {
      inputUri,
      outputUri,
      templateId: 'preset/web-hd', // built-in HLS/DASH template
    },
  };

  // Send job to Transcoder API
  const [response] = await client.createJob(request);
  console.log(`Transcoder job created: ${response.name}`);
};
