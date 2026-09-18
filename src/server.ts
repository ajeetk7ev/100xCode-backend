import { app } from "./app.ts";




const startServer = async() => {
    app.listen(8000, () => {
        console.log("Server is running at port 8000")
    })
}


startServer();