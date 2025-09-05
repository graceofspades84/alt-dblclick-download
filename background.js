chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "download" && msg.url) {
        let filename = "image";

        try {
            const u = new URL(msg.url);
            const tail = u.pathname.split("/").pop();
            if (tail) filename = decodeURIComponent(tail.split("?")[0]);
        } catch (err) {
            console.warn("Filename parse failed, using default", err);
        }

        chrome.downloads.download({
            url: msg.url,
            filename: filename,
            saveAs: false
        });
    }
});