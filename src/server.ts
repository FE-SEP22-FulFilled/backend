import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

const router = express.Router();

const app = express();

app.use(cors());

router.get('/', (req, res) => {
  res.json({
    hello: '12345',
  });
});

app.use('/.netlify/functions/server', router);

export const handler = serverless(app);
