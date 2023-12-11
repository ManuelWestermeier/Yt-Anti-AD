const states = [
    {
        top: "0%",
        left: "0%",
        width: "50%",
        height: "50%",
    },
    {
        top: "0%",
        left: "0%",
        width: "100%",
        height: "50%",
    },
    {
        top: "0%",
        left: "50%",
        width: "50%",
        height: "50%",
    },
    {
        top: "0%",
        left: "0%",
        width: "50%",
        height: "100%",
    },
    {
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },
    {
        top: "0%",
        left: "50%",
        width: "50%",
        height: "100%",
    },
    {
        top: "50%",
        left: "0%",
        width: "50%",
        height: "50%",
    },
    {
        top: "50%",
        left: "0%",
        width: "100%",
        height: "50%",
    },
    {
        top: "50%",
        left: "50%",
        width: "50%",
        height: "50%",
    },
];

__start()
function __start() {





    var url = new URL(document.location);
    var isStart = true;

    if (url.pathname.split("/")?.[1] == "embed") return;

    var globalWindowTopLayer = 10000;
    var isSeeable = true;

    var dontSeeSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>`
    var seeSVG = `<svg xmlns = "http://www.w3.org/2000/svg" height = "24" viewBox = "0 -960 960 960" width = "24" > <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" /></svg> `

    const root = document.createElement("div");
    root.classList.add("anti-add-root-elem")
    document.documentElement.appendChild(root);

    const getYTEmbedURL = id => `https://www.youtube.com/embed/` + id;

    const button = document.createElement("button");
    button.innerText = "No ADS";
    button.classList.add("anti-add-button")
    root.appendChild(button);

    var _widows = document.createElement("div");
    root.appendChild(_widows);

    start();

    var toggleButton = document.createElement("a")
    toggleButton.innerHTML = dontSeeSVG;

    toggleButton.addEventListener("click", e => {
        isSeeable = isSeeable ? false : true;
        toggleButton.innerHTML = isSeeable ? dontSeeSVG : seeSVG;
        _widows.style.display = isSeeable ? "" : "none"
    })

    button.appendChild(toggleButton)

    function start() {

        if (!isStart) {
            if (document.location.pathname == url.pathname && document.location.search == url.search) return;
            if (url.pathname != "/watch") return;
        }

        if (isStart)
            isStart = false;

        button.onclick = e => {

            url = new URL(document.location);
            new YtVidWindow(getYTEmbedURL(url.searchParams.get("v")))

        };

    }

    var __YTVINDOWS = [];

    setInterval(start, 1000);

    class YtVidWindow {

        constructor(url) {

            if (__YTVINDOWS.map(win => {
                if (win.url == url) return true;
                else return false
            }).includes(true)) return;

            var _window = document.createElement("div");
            _window.classList.add("_window")
            globalWindowTopLayer++;
            _window.style.zIndex = globalWindowTopLayer;

            _window.addEventListener("click", e => {
                globalWindowTopLayer++;
                _window.style.zIndex = globalWindowTopLayer;
            })

            _widows.appendChild(_window);


            var header = document.createElement("header");
            header.addEventListener("mousemove", e => {

                if (e.buttons != 1) return

                _window.style.top = parseInt(getComputedStyle(_window).top) + e.movementY + "px";
                _window.style.left = parseInt(getComputedStyle(_window).left) + e.movementX + "px";

            });
            var contextmenu = document.createElement("div")
            contextmenu.classList.add("contextmenu")
            contextmenu.classList.add("none")
            for (let index = 0; index < 9; index++) {
                var field = document.createElement("div");
                field.classList.add("field");
                field.addEventListener("click", e => {
                    contextmenu.classList.add("none")
                    var state = states[index];
                    _window.style.top = state.top;
                    _window.style.left = state.left;
                    _window.style.width = state.width;
                    _window.style.height = state.height;
                });
                contextmenu.appendChild(field);
            }
            header.appendChild(contextmenu);
            header.addEventListener("contextmenu", e => {

                e.preventDefault();
                contextmenu.classList.toggle("none");

            });
            _window.appendChild(header);

            var replaceButton = document.createElement("button")
            replaceButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M666-440 440-666l226-226 226 226-226 226Zm-546-80v-320h320v320H120Zm400 400v-320h320v320H520Zm-400 0v-320h320v320H120Zm80-480h160v-160H200v160Zm467 48 113-113-113-113-113 113 113 113Zm-67 352h160v-160H600v160Zm-400 0h160v-160H200v160Zm160-400Zm194-65ZM360-360Zm240 0Z"/></svg>';
            replaceButton.addEventListener("click", e => {
                contextmenu.classList.toggle("none");               
            })
            header.appendChild(replaceButton)

            var replaceButton = document.createElement("button")
            replaceButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-320H520v-160H320v480Zm0-480v480-480ZM240-80v-80h80v80h-80Zm-80-640H80q0-33 23.5-56.5T160-800v80ZM400-80v-80h80v80h-80Zm160 0v-80h80v80h-80Zm-400-80v80q-33 0-56.5-23.5T80-160h80Zm-80-80v-80h80v80H80Zm0-160v-80h80v80H80Zm0-160v-80h80v80H80Zm640 400h80q0 33-23.5 56.5T720-80v-80Z"/></svg>'
            replaceButton.addEventListener("click", e => {
                __YTVINDOWS = __YTVINDOWS.map((win, index) => {
                    if (win != this) return win;
                    var url = new URL(document.location);
                    win.url = getYTEmbedURL(url.searchParams.get("v"));
                    win.video.src = win.url;
                    return win;
                })
            })
            header.appendChild(replaceButton)

            var newTabOpenButton = document.createElement("button");
            newTabOpenButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/></svg>`
            newTabOpenButton.title = "open in new Tab"
            newTabOpenButton.addEventListener("click", e => {
                var link = document.createElement("a")
                link.target = "_blank"
                link.href = url;
                link.click();
                _widows.removeChild(_window);
                __YTVINDOWS = __YTVINDOWS.filter(win => {
                    return win != this;
                });
            })
            header.appendChild(newTabOpenButton)

            var closeButton = document.createElement("button");
            closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`
            closeButton.title = "close"
            closeButton.addEventListener("click", e => {
                _widows.removeChild(_window);
                __YTVINDOWS = __YTVINDOWS.filter(win => {
                    return win != this;
                });
            })
            header.appendChild(closeButton)

            var video = document.createElement("iframe");
            video.src = url;
            this.video = video;
            _window.appendChild(video);

            this.url = url;
            this.window = _window;

            __YTVINDOWS.push(this);

        }

    }





}