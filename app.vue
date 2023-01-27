<template>
  <div class="dark">
    <WidgetSignUp v-if="!user" />
    <Messages ref="messages" @send-request="sendRequest" />
    <NewMessage ref="messageInput" @new-message="submit" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import NewMessage from '~/components/new-message.vue';
import Messages from '~/components/messages.vue';

const user = useSupabaseUser();

const loading = ref(false);
const messageInput = ref<typeof NewMessage | null>(null);
const messages = ref<typeof Messages | null>(null);

const sendRequest = async () => {
  loading.value = true;
  const { newMessage, finishMessage } = messages.value?.addMessage("AI", '');

  const res = await fetch(`/api/gpt3`, {
    body: messages.value?.getJson(),
    method: 'post'
  });

  const reader = res.body?.pipeThrough(new TextDecoderStream()).getReader();

  while (true) {
    const result = await reader?.read();
    console.log('Result', result);

    if (result?.done) {
      loading.value = false;
      finishMessage();
      return;
    }

    const results = result?.value?.split(/\n/);
    results?.forEach((line) => {
      const dataSlice = line.slice('data: '.length).trim();
      if (dataSlice && dataSlice != '[DONE]') {
        const data = JSON.parse(dataSlice);
        newMessage.message = newMessage.message.concat(data.text);
        messages.value?.scrollToEnd();
      }
    });
  }
}

const submit = async (newMessage: string) => {
  messages.value?.addMessage("Human", newMessage, false, true);
  await sendRequest();
  messageInput?.value?.reset();
};
</script>