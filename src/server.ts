import { app } from "./app.ts";
import env from "./config/env.ts";



const startServer = async() => {
    app.listen(env.PORT, () => {
        console.log("Server is running at port 8000")
    })
}


startServer();