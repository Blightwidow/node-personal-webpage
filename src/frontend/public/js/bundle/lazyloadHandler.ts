import { EventHandler } from "./eventHandler";

export class LazyloadHandler extends EventHandler {
  private static PLACEHOLDER_ID = "placeholder";

  public handle() {
    const placeholder = <HTMLImageElement>document.getElementById( LazyloadHandler.PLACEHOLDER_ID );

    if (this.isLoadableImage(placeholder)) {
      this.replacePlaceholderWithImage(placeholder);
    }
  }

  private isLoadableImage(img: HTMLImageElement): boolean {
    return !!(img.parentElement.offsetParent);
  }

  private replacePlaceholderWithImage(placeholder: HTMLImageElement) {
    if (this.hasObjectFit()) {
      this.replaceImageWithObjectFit(placeholder);
    } else {
      this.replaceImageWithBackgroundCover(placeholder);
    }
    this.unregister();
  }

  private hasObjectFit(): boolean {
    return "object-fit" in document.body.style;
  }

  private replaceImageWithObjectFit(img: HTMLImageElement) {
    img.src = img.dataset.large;
    img.onload = () => {
      img.classList.add("loaded");
    };
  }

  private replaceImageWithBackgroundCover(img: HTMLImageElement) {
    img.parentElement.style.backgroundImage = `url("${img.dataset.large}")`;
    img.style.opacity = "0";
  }
}
