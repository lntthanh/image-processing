import express from 'express';

const logger = (
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/ban-types
  next: Function
): void => {
  console.log(`URL: ${req.url}`);
  next();
};

export default logger;
