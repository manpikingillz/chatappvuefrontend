<template>
  <div id="app" style="width: 50%">
      <!-- <ChatMessages v-bind:chatMessages="chatMessagesList"/> -->
      <form @submit.prevent="submitForm">
        <input  v-model="message" placeholder="type your chat message"/>
        <input type="submit"  value="Send"/>
      </form>
      
  </div>
</template>

<script>
// import ChatMessages from './components/ChatMessages.vue'
import WebSocketInstance from './websocket'

export default {
  name: 'App',

  components: {
      // ChatMessages
  },

  data: ()=>({
    message: '',

    chatMessagesList: [
      {
        content: 'Hello'
      },
      {
        content: 'How are you?'
      }
    ]
  }),

  methods: {
    submitForm(){
      
      WebSocketInstance.newChatMessage({
        from: 'admin',
        content: this.message,
        chatId: '1'
      })
      this.initialiseChat();
      console.log("Form submited", this.message )
    },

    waitForSocketConnection(callback) {
    const component = this;
    setTimeout(function() {
      if (WebSocketInstance.state() === 1) {
        console.log("Connection is made");
        callback();
        
        return;
      } else {
        console.log("wait for connection...");
        component.waitForSocketConnection(callback);
      }
    }, 100);
  },

  initialiseChat() {
    this.waitForSocketConnection(() => {
      WebSocketInstance.fetchMessages(
        'admin',
        '1'
      );
    });
    WebSocketInstance.connect("vuewebsocket");
  }

  },
  
  created(){
    this.initialiseChat();

  },


  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
