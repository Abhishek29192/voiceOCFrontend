export const HandleDownload = (url, name) => {
    // let name;
    // let url;
    // if (type == "pdf") {
    //     name = message?.name
    //     url = message?.url
    // }
    // else if (type == "image") {
    //     name = Date.now().toString() + ".jpg"
    //     url = message
    // }
    // else if (type == "video") {
    //     name = Date.now().toString() + ".mp4"
    //     url = message
    // }

    fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
}