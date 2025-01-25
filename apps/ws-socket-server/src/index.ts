import app from './app';
import config from './config';

// start the application
app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});
