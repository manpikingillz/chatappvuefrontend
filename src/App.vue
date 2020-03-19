<template>
  <div id="app" style="width: 50%">
      <ChatMessages v-bind:chatMessages="chatMessagesList"/>
      <form @submit.prevent="submitForm">
        <input  v-model="message" placeholder="add multiple lines"/>
        <input type="submit"  value="Submit"/>
      </form>
      
  </div>
</template>

<script>
import ChatMessages from './components/ChatMessages.vue'

export default {
  name: 'App',

  components: {
      ChatMessages
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
      console.log("Form submited", this.message )
    }
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
