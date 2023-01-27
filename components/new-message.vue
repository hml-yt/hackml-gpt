<template>
    <div
        class="fixed inset-x-0 bottom-0 left-0 border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient">
        <form class="stretch mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6">
            <div class="relative flex h-full flex-1 md:flex-col">
                <div class="ml-1 mt-1.5 md:w-full md:m-auto md:flex md:mb-2 gap-2 justify-center"></div>
                <div
                    class="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
                    <textarea tabindex="0" v-model="message" @keydown.enter.exact.prevent="submit" ref="messageInput"
                        autofocus :disabled="loading" data-id="63ee3844-11f0-456d-b3b5-a6e2a3ac6a04" rows="1"
                        :class="{ 'text-gray-800': loading }" placeholder="Write your message here..."
                        class="m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0"
                        style="max-height: 200px; overflow-y: auto;"
                        :style="{ height: (numOfLines * 24) + 'px' }"></textarea>
                    <button @click.prevent="submit" :disabled="loading"
                        class="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"><svg
                            stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20"
                            class="h-4 w-4 rotate-90" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"
                            :class="{ 'text-gray-800': loading }">
                            <path
                                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z">
                            </path>
                        </svg></button>
                </div>
            </div>
        </form>
        <UiMessageToolbar />
    </div>
</template>

<script setup lang="ts">
const messageInput = ref<HTMLInputElement | null>(null)
const message = ref("");
const settings = useSettingsStore();
const speech = useSpeechRecognition({});

const emit = defineEmits<{
    (e: 'new-message', message: string): void
}>()

defineProps<{
    loading?: boolean,
}>()

watchEffect(() => {
    if (settings.talk && speech.isSupported.value) {
        speech.start();
    } else {
        speech.stop();
    }
});

watch(speech.result, () => {
    if (speech.result.value) {
        message.value = speech.result.value;
    }
});

watch(speech.isFinal, () => {
    console.log(speech.isFinal);
    if (speech.isFinal.value === true) {
        submit();
    }
})

const setListening = (listening: boolean) => {
    console.log({ listening });
    if (listening && settings.talk) {
        speech.start();
    } else {
        speech.stop();
    }
}

const numOfLines = computed(() => {
    return Math.max(Math.min(4, message.value.split('\n').length), 1);
});

const submit = () => {
    if (message.value.trim() === "") return;
    emit('new-message', message.value);
}

const reset = () => {
    message.value = "";
    messageInput.value?.focus();
}

defineExpose({
    reset,
    setListening,
});
</script>

<style lang="scss" scoped>

</style>