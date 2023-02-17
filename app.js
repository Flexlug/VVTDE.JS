const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const db = require('./db')
const grpc = require('./grpc')

app.engine(
  'handlebars',
  handlebars.engine({ defaultLayout: 'main' })
)

app.set('views', './views')
app.set('view engine', 'handlebars')

app.get("/", (request, respose) => {
    console.log(`Got request main: ${request.url}`);
    respose.render("main.hbs")
})

app.get("/video/:guid", (request, response) => {
    console.log(`Got request video: ${request.url}`);

    let guid = request.params["guid"];

    let result = db.getUrl(guid)
    console.log(result)

    if (result == null) {
        response.render("no-video.hbs")
    } else {
        response.render("video.hbs", {
            imageUrl: "asd",
            videoUrl: "asd",
            rawVideoUrl: "ad"
        })
    }
});

app.listen(80, () => {
    console.log("Server is running")
});

