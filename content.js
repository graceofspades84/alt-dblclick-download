(function () {
    document.addEventListener(
        "dblclick",
        (e) => {
            if (!e.altKey) return; // require Option/Alt key

            let url = null;

            // Case 1: <img> element
            const img = e.target.closest("img");
            if (img) {
                url = img.currentSrc || img.src;
            } else {
                // Case 2: background-image element
                const s = getComputedStyle(e.target);
                const m =
                    s.backgroundImage &&
                    s.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
                if (m) url = m[1];
            }

            if (!url) return;

            chrome.runtime.sendMessage({ type: "download", url });
        },
        true
    );
})();