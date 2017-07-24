export abstract class EventHandler {
  protected events: Array<string> = [];

  public abstract handle(evt: Event): void;

  public register(evtName: string) {
    this.events.push(evtName);
    window.addEventListener(evtName, (evt: Event) => this.handle(evt));
  }

  public unregister() {
    for (const evt in this.events) {
      window.removeEventListener(evt, (evt: Event) => this.handle(evt));
    }
  }
}
