import express from 'express';

const server = express();

server.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}.`);
  });