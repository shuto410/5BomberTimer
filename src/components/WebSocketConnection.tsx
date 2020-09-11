

class WebSocketConnection {
  private host = 'wss://fivebomber.herokuapp.com';
  private socket = new WebSocket(this.host);
  private onMessages: Array<(event: MessageEvent) => void> = [];

  constructor() {
    this.init();
    setInterval(() => {
      this.init();
    }, 20000)
  }

  private init = () => {
    const newSocket = new WebSocket(this.host);
    newSocket.onopen = () => {
      console.log("open!!!");
      const oldSocket = this.socket;
      this.socket = newSocket;
      oldSocket.onclose = () => undefined;
      oldSocket.close();
    }
    newSocket.onmessage = (event) => {
      console.log(event.data);
      this.onMessages.forEach(onMessage => onMessage(event));
    };
    newSocket.onclose = () => {
      console.log("closed!!!");
      this.init();
    }
  }

  public addOnMessage(onMessage: (event: MessageEvent) => void) {
    this.onMessages.push(onMessage);
    this.socket.onmessage = (event) => {
      this.onMessages.forEach(onMessage => onMessage(event));
    };
  }

  public send(data: string): void {
    this.socket.send(data);
  }
}

export const connection = new WebSocketConnection();