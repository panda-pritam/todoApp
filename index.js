//mongodb+srv://todoApp:todoApp123@cluster0.fjap3dw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const mongoose = require("mongoose");
const app = require("./app");
var dotenv = require("dotenv");
dotenv.config();
// console.log(process.env.PORT, process.env.MONGODB_URL);
let PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("DB Connected "))
  .catch((err) => {
    console.log(err);
    console.log("can't connect to the DB " + err);
  });

app.listen(PORT, () => {
  console.log(PORT);
  console.log("Server is runing at " + PORT);
});
