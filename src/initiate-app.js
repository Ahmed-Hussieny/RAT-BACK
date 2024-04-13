import db_connection from "../DB/connection.js";
import * as routes from "./modules/index.routes.js";

export const initApp = (app,express) => {

    app.use(express.json());

db_connection()

app.use('/user',routes.authRouter);
app.use('/data',routes.dataRouter);
// app.use(globalResponse,rollbackuploadedfiles, rollbackSaveDocument)
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})

}