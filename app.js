const express = require('express')
const app = express()
const handlebars = require('express-handlebars')

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

app.get("/video-oe/:imageUrl/:videoUrl", (request, response) => {
    console.log(`Got request video: ${request.url}`);

    let imageDecodedUrl = request.params["imageUrl"];
    let videoDecodedUrl = request.params["videoUrl"];
    let rawvideoUrl = encodeURIComponent(request.params["videoUrl"]);
    
    response.render("video-oe.hbs", {
        imageUrl: imageDecodedUrl,
        videoUrl: videoDecodedUrl,
        rawVideoUrl: rawvideoUrl
    });
});

app.get("/video-og/:imageUrl/:videoUrl", (request, response) => {
    console.log(`Got request video: ${request.url}`);

    let imageDecodedUrl = request.params["imageUrl"];
    let videoDecodedUrl = request.params["videoUrl"];
    let rawvideoUrl = encodeURIComponent(request.params["videoUrl"]);
    
    response.render("video-og.hbs", {
        imageUrl: imageDecodedUrl,
        videoUrl: videoDecodedUrl,
        rawVideoUrl: rawvideoUrl
    });
});

app.get("/video-tc/:imageUrl/:videoUrl", (request, response) => {
    console.log(`Got request video: ${request.url}`);

    let imageDecodedUrl = request.params["imageUrl"];
    let videoDecodedUrl = request.params["videoUrl"];
    let rawvideoUrl = encodeURIComponent(request.params["videoUrl"]);
    
    response.render("video-tc.hbs", {
        imageUrl: imageDecodedUrl,
        videoUrl: videoDecodedUrl,
        rawVideoUrl: rawvideoUrl
    });
});

oembedHtml = `<iframe src="{{URL}}" width="640" height="360" frameborder="0" allowfullscreen="1" allow="autoplay; encrypted-media; fullscreen; picture-in-picture"></iframe>`

app.get("/oembed/:videoUrl", (request, response) => {
    console.log(`Got oembed request: ${request.url}`)

    let videoDecodedUrl = decodeURIComponent(request.params["videoUrl"]);

    response.json({
        version: "1.0",
	    type: "video",
	    provider_name: "VK",
	    provider_url: "videoDecodedUrl",
	    width: 425,
	    height: 344,
	    title: "VVTDE",
	    author_name: "Flexlug",
	    author_url: "https://github.com/Flexlug",
	    html: oembedHtml.replace("{{URL}}", videoDecodedUrl)
    });
});

app.listen(80, () => {
    console.log("Server is running")
});

/*
<iframe src="https://vk.com/video_ext.ph?oid=-17833376&id=456257480&hash=f25bae6a04de086a" width="640" height="360" frameborder="0" allowfullscreen="1" allow="autoplay; encrypted-media; fullscreen; picture-in-picture"></iframe>
https://vk.com/video-17833376_456257480
https://vk.com/video_ext.ph?oid=-17833376&id=456257480&hash=f25bae6a04de086a
https://vk.com/video_ext.php?oid=-17833376&id=456257480&hash=f25bae6a04de086a&__ref=vk.api&api_hash=1670432673ea803faee2a61dbcd7_GE3DONRUGI2DG
https://api.flexlug.ru/vvtde/video/https%3a%2f%2fsun9-east.userapi.com%2fsun9-26%2fs%2fv1%2fif2%2fzEcudfdZe_hMRR3CoVfckhkx6V-q4TO_Tdk3oFyo_ZbcZ8kG7onePp9JgiKqmIP0JCjaTkJL0wIHstDPDZlzoP8P.jpg%3fsize%3d0x0%26quality%3d90%26proxy%3d1%26type%3dvideo_thumb/https%3a%2f%2fvk.com%2fvideo_ext.php%3foid%3d-17833376%26id%3d456257480%26hash%3df25bae6a04de086a%26__ref%3dvk.api%26api_hash%3d1670432673ea803faee2a61dbcd7_GE3DONRUGI2DG
*/