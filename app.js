const { response } = require("express");
const express = require("express")
const expressHbs = require("express-handlebars");
const hbs = require("hbs");

const app = express();

app.engine("hbs", expressHbs.engine(
    {
        layoutsDir: "views/layouts",
        extname: "hbs",
        defaultLayout: "video.hbs"
    }
));

app.set("view engine", "hbs");

app.use("/video/:imageUrl/:videoUrl", (request, response) => {
    console.log(`Got request video: ${request.url}`);

    let imageDecodedUrl = decodeURIComponent(request.params["imageUrl"]);
    let videoDecodedUrl = decodeURIComponent(request.params["videoUrl"]);

    response.render("video", {
        imageUrl: imageDecodedUrl,
        videoUrl: videoDecodedUrl
    });
});

app.use("/", (request, respose) => {
    console.log(`Got request main: ${request.url}`);
    respose.render("main.hbs")
})

app.listen(80, () => {
    console.log("Server is running")
});