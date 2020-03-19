<template>
  <div class="chat-message-item">
    <p>
          {{ chatMessage.content }}
    </p>
  </div>
</template>

<script>
export default {
  name: "ChatMessageItem",
  props: ["chatMessage"],
};
</script>

<style scoped>
.chat-message-item {
  background: #f4f4f4;
  padding: 10px;
  border-bottom: 1px #ccc dotted;
}
</style>
