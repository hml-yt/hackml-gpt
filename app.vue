<template>
  <div class="dark">
    <UiSignUp v-if="!user" />
    <Messages ref="messages" @send-request="sendRequest" @add-message="onMessageAdded" />
    <NewMessage ref="messageInput" @new-message="submit" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import NewMessage from '~/components/new-message.vue';
import Messages from '~/components/messages.vue';

const user = useSupabaseUser();
const settings = useSettingsStore();

const loading = ref(false);
const messageInput = ref<typeof NewMessage | null>(null);
const messages = ref<typeof Messages | null>(null);
const lastMessage = ref("");

const voice = ref<SpeechSynthesisVoice>(undefined as unknown as SpeechSynthesisVoice)
const tts = useSpeechSynthesis(lastMessage, {
  voice,
});

watch(tts.isPlaying, () => {
  messageInput.value?.setListening(!tts.isPlaying.value);
});

onMounted(() => {
  if (tts.isSupported.value) {
    setTimeout(() => {
      const voices = window.speechSynthesis.getVoices();
      // voice.value = (voices.find((v) => v.name.startsWith('Google UK English Male')) as SpeechSynthesisVoice || voices[0]);
      voice.value = voices[0];
      console.log(voice.value);
    }, 100)
  }
})

const onMessageAdded = async (actor: string, message: string) => {
  lastMessage.value = message;

  if (actor === 'AI' && settings.talk && tts.isSupported.value) {
    tts.speak();
  }
};

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