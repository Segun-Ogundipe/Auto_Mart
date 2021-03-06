import express from 'express';

import router from './routes';
import Response from './models/ResponseModel';

const app = express();

app.use(express.json());

app.use('/api/v2', router);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');

  next();
});

app.use('*', (req, res) => {
  res.status(404).json(new Response(false, 404, 'You typed in the wrong URL'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App running on port: ${PORT}`));

export default app;
