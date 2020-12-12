import "reflect-metadata";
import { createConnection } from "typeorm";
import { POSTGRES_OPTIONS } from "../db/Constant";
import { UserEntity } from "../db/entity/UserEntity";

export async function getUserRewards(id: any){
    console.log(`getUserRewards ID: ${id}`);
}

export async function getAllUsers(){
    return createConnection(POSTGRES_OPTIONS).then(async connection => {
        console.log("Loading users from the database...");
        const users = await connection.manager.find(UserEntity);
        console.log("Loaded users: ", users);
        connection.close();
        return users;
    }).catch(error => {
        console.log(error);
        return false;
    });
}

export async function createUser(body: UserEntity): Promise<boolean> {
    return createConnection(POSTGRES_OPTIONS).then(async (connection) => {
        console.log("Inserting a new user into the database...");
        console.log(body);
        const user = new UserEntity();
        user.name = body.name;
        user.email = body.email;
        user.phone = body.phone;
        user.country = body.country;
        await connection.manager.save(user);
        connection.close();
        return true;
    }).catch(error => {
        console.log(error);
        return false;
    });
}