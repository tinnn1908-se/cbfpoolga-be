import cors, { CorsOptions } from 'cors';
import express from 'express';
import bodyParser from 'body-parser'
var port = process.env.PORT || 1908;
const app = express();


/** CORS */
const options: CorsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: '*'
}
app.use(cors(options))

/** Body Parser */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Router */
// app.use('/api/user',userRouter);
app.get("/", (req, resp) => {
    console.log("Hello Server")
    return resp.status(200).json({
        data: "Hello Wolrd"
    });
})
/** App Running */
app.listen(port, () => {
    console.log('UserAPI is runnning at ' + port);
});