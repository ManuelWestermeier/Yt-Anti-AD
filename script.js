const root = document.createElement("div");
root.classList.add("anti-add-root-elem")
document.documentElement.appendChild(root);

const getYTEmbedURL = id => `https://www.youtube.com/embed/` + id;

const button = document.createElement("button");
button.innerText = "No ADS";
button.classList.add("anti-add-button")
root.appendChild(button);

var url = new URL(document.location);
var isStart = true;

start();

function start() {

    if (!isStart) {
        if (document.location.pathname == url.pathname && document.location.search == url.search) return;
        if (url.pathname != "/watch") return;
    }

    isStart = false;

    url = new URL(document.location);


    button.addEventListener("click", e => {

        new YtVidWindow(getYTEmbedURL(url.searchParams.get("v")))

    });

}

setInterval(start, 1000);

class YtVidWindow {

    constructor(url) {

        var _window = document.createElement("div");
        _window.classList.add("_window")
        root.appendChild(_window);


        var header = document.createElement("header");
        header.addEventListener("mousemove", e => {

            if (e.buttons != 1) return

            _window.style.top = parseInt(getComputedStyle(_window).top) + e.movementY + "px";
            _window.style.left = parseInt(getComputedStyle(_window).left) + e.movementX + "px";

        });
        _window.appendChild(header);

        var newTabOpenButton = document.createElement("button");
        newTabOpenButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/></svg>`
        newTabOpenButton.title = "open in new Tab"
        newTabOpenButton.addEventListener("click", e => {
            var link = document.createElement("a")
            link.target = "_blank"
            link.href = url;
            link.click();
        })
        header.appendChild(newTabOpenButton)

        var closeButton = document.createElement("button");
        closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`
        closeButton.title = "close"
        closeButton.addEventListener("click", e => {
            root.removeChild(_window)
        })
        header.appendChild(closeButton)

        var video = document.createElement("iframe");
        video.src = url;
        _window.appendChild(video);

    }

}