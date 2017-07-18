export interface EventHandlerInterface {
  handle: (evt: Event) => void;
  register: (evt: string) => void;
  unregister: () => void;
}

export abstract class EventHandler implements EventHandlerInterface {
  protected events: Array<string> = [];

  public abstract handle(evt: Event): void;

  public register(evtName: string): void {
    this.events.push(evtName);
    window.addEventListener(evtName, (evt: Event) => this.handle(evt));
  }

  public unregister(): void {
    for (const evt in this.events) {
      window.removeEventListener(evt, (evt: Event) => this.handle(evt));
    }
  }
}
