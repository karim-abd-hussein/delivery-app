 import cors from 'cors';

 const corsOptions = {
    origin: '*', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  };
  
  // Use CORS middleware
  export default cors(corsOptions);
  