const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  projectId: 'analog-reef-468911',
});

const bucket = storage.bucket('analog-reef-468911-j1-raw');

export default bucket;
