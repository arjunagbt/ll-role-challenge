import express, { Request, Response } from 'express';
import { AppDataSource } from "./data-source"
import "reflect-metadata"

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({status: 'OK'});
});

AppDataSource.initialize().then(async () => {
    
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });

}).catch(error => console.log(error))