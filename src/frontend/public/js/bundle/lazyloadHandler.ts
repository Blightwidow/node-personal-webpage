export class LazyloadHandler {

    public static loadImage() {
        const placeholder = (<HTMLImageElement>document.getElementById("placeholder"));
        if (LazyloadHandler.isLoadableImage(placeholder)) {
            LazyloadHandler.replacePlaceholderWithImage(placeholder);
        } else if (LazyloadHandler.isLoadedImage(placeholder)){
            LazyloadHandler.unregisterPlaceholderEventListeners();
        }
    }

    public static getRequestAnimationFrame(): any {
        return requestAnimationFrame;
    }

    public static hasRequestAniationFrame(): boolean {
        return !!(requestAnimationFrame);
    }

    private static unregisterPlaceholderEventListeners() {
        if (!LazyloadHandler.hasRequestAniationFrame()) {
            window.removeEventListener("load", LazyloadHandler.loadImage);
        }
        window.removeEventListener("orientationchange", LazyloadHandler.loadImage);
    }

    private static isLoadableImage(img: HTMLImageElement): boolean {
        return (img.parentElement.offsetParent && !img.classList.contains("loaded"));
    }

    private static isLoadedImage(img: HTMLImageElement): boolean {
        return (img.classList.contains("loaded"));
    }

    private static replacePlaceholderWithImage(placeholder: HTMLImageElement) {
        if (LazyloadHandler.hasObjectFit()) {
            LazyloadHandler.replaceImageWithObjectFit(placeholder);
        }
        else {
            LazyloadHandler.replaceImageWithBackgroundCover(placeholder);
        }
    }

    private static hasObjectFit(): boolean {
        return ("object-fit" in document.body.style);
    }

    private static replaceImageWithObjectFit (img: HTMLImageElement) {
        img.src = img.dataset.large;
        img.onload = () => {
            img.classList.add("loaded");
        };
    }

    private static replaceImageWithBackgroundCover (img: HTMLImageElement) {
        img.parentElement.style.backgroundImage = `url("${img.dataset.large}")`;
    }

}
