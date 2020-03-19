<template>
  <div>
    <div v-bind:key="index" v-for="(chatMessage, index) in chatMessages">
        <ChatMessageItem v-bind:chatMessage="chatMessage" />
    </div>
  </div>
</template>

<script>
  import ChatMessageItem from "./ChatMessageItem";

  export default {
    name: "ChatMessages",
    components: {
      ChatMessageItem
    },
    props: ["chatMessages"]
  };
</script>

<style scoped>
</style>
