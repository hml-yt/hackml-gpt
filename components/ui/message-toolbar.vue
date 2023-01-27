<template>
    <div class="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
        <button
            class="w-22 text-sm text-gray-700 hover:text-gray-600 dark:hover:text-gray-400 rounded border-2 mx-1 border-gray-500 bg-gray-400 p-1 hover:bg-gray-300">
            <icon name="uil:picture" size="14px" />
            Capture
        </button>
        <button
            class="w-22 text-sm text-gray-700 hover:text-gray-600 dark:hover:text-gray-400 rounded border-2 mx-1 border-gray-500 bg-gray-400 p-1 hover:bg-gray-300">
            <icon name="uil:book-open" size="14px" />
            Learn
        </button>
        |
        <button
            class="w-22 text-sm text-gray-700 hover:text-gray-600 dark:hover:text-gray-400 rounded border-2 mx-1 border-gray-500 bg-gray-400 p-1 hover:bg-gray-300"
            :class="{ 'bg-emerald-800': settings.talk, 'text-gray-200': settings.talk }"
            @click="settings.talk = !settings.talk">
            <icon name="uil:microphone" size="14px" />
            Talk
        </button>
        <button
            class="w-22 text-sm text-gray-700 hover:text-gray-600 dark:hover:text-gray-400 rounded border-2 mx-1 border-gray-500 bg-gray-400 p-1 hover:bg-gray-300"
            :class="{ 'bg-emerald-800': settings.draw, 'text-gray-200': settings.draw }"
            @click="settings.draw = !settings.draw">
            <icon name="uil:paint-tool" size="14px" />
            Draw
        </button>
    </div>
</template>

<script setup lang="ts">
const settings = useSettingsStore();
</script>

<style scoped>

</style>