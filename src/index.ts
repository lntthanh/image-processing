import express from 'express';
import logger from './middleware/logger';
import { resizeImg } from './utils/imgUtils';
import { isNumeric, isValidFileName } from './utils/numberValidate';

const app = express();

const port = 3000;

app.get(
  '/api/images',
  logger,
  (req: express.Request, res: express.Response) => {
    // Check input parameters
    if (!req.query.filename || !req.query.width || !req.query.height) {
      return res
        .status(400)
        .json({ error: 'Missing filename, height, or width.' });
    }
    if (!isValidFileName(req.query.filename as string)) {
      return res.status(400).json({ error: 'Invalid Input for filename.' });
    }

    if (
      !isNumeric(req.query.width as string) ||
      !isNumeric(req.query.height as string)
    ) {
      return res
        .status(400)
        .json({ error: 'Invalid Input for height or width.' });
    }

    // Resize the image
    resizeImg(req.query.filename as string, {
      size: {
        width: Number.parseInt(req.query.width as string),
        height: Number.parseInt(req.query.height as string),
      },
    })
      .then((file: string) => {
        res.sendFile(file);
      })
      .catch((err: Error) => {
        res.status(400).json({ error: err.message });
      });
  }
);

app.get('/api', logger, (req: express.Request, res: express.Response): void => {
  res.send('Welcome Image Processing API');
});
app.get('*', logger, (req: express.Request, res: express.Response): void => {
  res.send('Welcome Image Processing');
});

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

export default app;
