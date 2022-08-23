import app from "./app"
import "./database"
//static files

//stating the server

app.listen(app.get("port"),()=>{
    console.log("Server listening on port " + app.get("port"))
})