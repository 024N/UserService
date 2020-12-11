import * as dotenv from 'dotenv';
import express from "express";
import { invalidUrlHandler } from './middleware/InvalidUrlHandler';
import { requestLogHandler } from './middleware/RequestLogHandler';
import { getUserRewards, getAllUsers, createUser } from './repository/potgreSQL'

dotenv.config();

const app = express();
app.use(requestLogHandler); // Log request
app.use(express.json()) // Parse body

app.get( "/", async ( req, res ) => {
    console.log("Home Page")
    res.send( "ENDPOINTS: <p/> GET /user/:id <p/> GET /users <p/> POST /user" );
});

app.get( "/user/:id", async ( req, res ) => {
    await getUserRewards(req.params.id);
    res.send( "1" );
});

app.get( "/users", async ( req, res ) => {
    const allUsers = await getAllUsers();
    res.send( allUsers );
});

app.post( "/user", async ( req, res ) => {
    const users = await createUser(req.body);
    res.send( users ? 'Created' : 'Not Created' );
});

app.use('*', invalidUrlHandler); // Catch Invalid Path

app.listen( process.env.PORT, () => {
    console.log( `server started at http://localhost:${ process.env.PORT }` );
});