const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const db = require('./db')

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

app.get("/video/:imageUrl/:videoUrl", (request, response) => {
    console.log(`Got request video: ${request.url}`);

    let imageDecodedUrl = request.params["imageUrl"];
    let videoDecodedUrl = request.params["videoUrl"];
    let rawvideoUrl = encodeURIComponent(request.params["videoUrl"]);
    
    response.render("video.hbs", {
        imageUrl: imageDecodedUrl,
        videoUrl: videoDecodedUrl,
        rawVideoUrl: rawvideoUrl
    });
});

app.listen(80, () => {
    console.log("Server is running")
});

