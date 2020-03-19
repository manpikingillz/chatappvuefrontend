// const HOST_URL = "http://127.0.0.1:8000";
const SOCKET_URL = "ws://127.0.0.1:8000";

class WebSocketService {
    static instance = null;
    callbacks = {};
    jsonMessagesData = {}
  
    static getInstance() {
      if (!WebSocketService.instance) {
        WebSocketService.instance = new WebSocketService();
      }
      return WebSocketService.instance;
    }
  
    constructor() {
      this.socketRef = new WebSocket("ws://127.0.0.1:8000/ws/chat/vuewebsocket/");//null
    }
  
    connect(chatUrl) {
      const path = `${SOCKET_URL}/ws/chat/${chatUrl}/`;
      console.log("the path is: ",path)
      this.socketRef = new WebSocket("ws://127.0.0.1:8000/ws/chat/vuewebsocket/");
      this.socketRef.onopen = () => {
        console.log("WebSocket open");
      };
      this.socketRef.onmessage = e => {
        this.socketNewMessage(e.data);
        console.log("websocket messages: ", e.data)
      };
      this.socketRef.onerror = e => {
        console.log("Websocket error; ",e.message);
      };
      this.socketRef.onclose = () => {
        console.log("WebSocket closed let's reopen");
        this.connect();
      };
    }

    retrievedMessages(){
        return this.jsonMessagesData;
    }
  
    disconnect() {
      this.socketRef.close();
    }
  
    socketNewMessage(data) {
      const parsedData = JSON.parse(data);
    
      this.jsonMessagesData = parsedData
        // console.log("websocket messages: ", this.jsonMessagesData)
      const command = parsedData.command;
      if (Object.keys(this.callbacks).length === 0) {
        return;
      }
      if (command === "messages") {
        this.callbacks[command](parsedData.chat_messages);
        console.log("the callback: ",this.callbacks)
      }
      if (command === "new_message") {
        this.callbacks[command](parsedData.chat_message);
      }
    }
  
    fetchMessages(username, chatId) {
      this.sendMessage({
        command: "fetch_messages",
        username: username,
        chatId: chatId
      });
    }
  
    newChatMessage(message) {
        console.log("message to be sent: ",message)
      this.sendMessage({
        command: "new_message",
        from: message.from,
        message: message.content,
        chatId: message.chatId
      });
    }
  
    addCallbacks(messagesCallback, newMessageCallback) {
      this.callbacks["messages"] = messagesCallback;
      this.callbacks["new_message"] = newMessageCallback;
    }
  
    sendMessage(data) {
      try {
        this.socketRef.send(JSON.stringify({ ...data }));
      } catch (err) {
        console.log(err.message);
      }
    }
  
    state() {
      return this.socketRef.readyState;
    }
  }
  
  const WebSocketInstance = WebSocketService.getInstance();
  
  export default WebSocketInstance;