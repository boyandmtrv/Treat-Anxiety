let intervalId;

export function startBackgroundChanger() {
    const backgroundLayer = document.getElementById('background-layer');
    const transitionLayer = document.getElementById('transition-layer');

    const backgroundImages = [
        '/src/img/main-img.png',
        '/src/img/second-main.png',
        '/src/img/third-main.png',
        '/src/img/fourth-main.png',
        '/src/img/fifth-main.png',
    ];

    function getRandomImage(images) {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    }

    function changeBackgroundImage() {
        transitionLayer.style.opacity = 1;

        setTimeout(() => {
            const randomImage = getRandomImage(backgroundImages);
            backgroundLayer.style.backgroundImage = `url(${randomImage})`;
            transitionLayer.style.opacity = 0;
        }, 1000);
    }

    intervalId = setInterval(changeBackgroundImage, 5000);

    changeBackgroundImage();
}

export function stopBackgroundChanger() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null; 
    }
}

export function isBackgroundChangerRunning() {
    return intervalId !== null;
}
