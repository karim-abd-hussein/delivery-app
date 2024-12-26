import express,{Express} from 'express';
import authRouter from '../routes/auth';
import orderRouter from '../routes/orders';
import productRouter from '../routes/products';
import storeRouter from '../routes/stores';
import handleApiError from '../middlewares/errorHandling.middleware';

export default function createServer():Express{

    const app =express();

    app.use(express.json());

    // Routes
    app.use('/auth',authRouter);
    app.use('/orders',orderRouter);
    app.use('/products',productRouter);
    app.use('/stores',storeRouter);

    app.use(handleApiError);

    return app;
}