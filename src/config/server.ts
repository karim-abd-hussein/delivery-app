import express,{Express} from 'express';
import authRouter from '../routes/auth';
import orderRouter from '../routes/orders';
import productRouter from '../routes/products';
import storeRouter from '../routes/stores';
import handleApiError from '../middlewares/errorHandling.middleware';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import swaggerDocs from './swaggerConfig';


export default function createServer():Express{

    const app =express();

    app.use(express.json());
    app.use(cookieParser());

    // Serve Swagger documentation
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    // Routes
    app.use('/auth',authRouter);
    app.use('/orders',orderRouter);
    app.use('/products',productRouter);
    app.use('/stores',storeRouter);

    app.use(handleApiError);

    return app;
}