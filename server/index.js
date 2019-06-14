import express from 'express';
import dotenv from 'dotenv';

import router from './routes';
import Error from './models/ErrorModel';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);

app.use('*', (req, res) => {
  res.status(404).json(new Error(404, 'You typed in the wrong URL'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App running on port: ${PORT}`));

export default app;
