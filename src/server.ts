/* eslint-disable no-console */

import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import { router as productsRouter } from './routes/products';

const app = express();
const API_PATH = '/.netlify/functions/server';

app.use(cors());

app.use(`${API_PATH}/products`, productsRouter);

export const handler = serverless(app);

// for local testing

// const PORT = 5000 || null;

// app.listen(PORT, () => {
//   console.log(`server started at port ${PORT}`);
// });
