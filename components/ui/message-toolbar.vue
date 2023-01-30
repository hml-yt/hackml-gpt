<template>
    <div class="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
        <button @click="captureMessages"
            class="w-22 text-sm text-gray-700 hover:text-gray-600 dark:hover:text-gray-400 rounded border-2 mx-1 border-gray-500 bg-gray-400 p-1 hover:bg-gray-300">
            <icon name="uil:picture" size="14px" />
            Screenshot
        </button>
        <!-- <button
            class="w-22 text-sm text-gray-700 hover:text-gray-600 dark:hover:text-gray-400 rounded border-2 mx-1 border-gray-500 bg-gray-400 p-1 hover:bg-gray-300">
            <icon name="uil:book-open" size="14px" />
            Learn
        </button> -->
        |
        <button
            class="w-22 text-sm text-gray-700 hover:text-gray-600 dark:hover:text-gray-400 rounded border-2 mx-1 border-gray-500 bg-gray-400 p-1 hover:bg-gray-300"
            :class="{ 'bg-emerald-800': settings.talk, 'text-gray-200': settings.talk }"
            @click="settings.talk = !settings.talk">
            <icon name="uil:microphone" size="14px" :class="{ 'animate-pulse': settings.talk }" />
            Talk
        </button>
        <button
            class="w-22 text-sm text-gray-700 hover:text-gray-600 dark:hover:text-gray-400 rounded border-2 mx-1 border-gray-500 bg-gray-400 p-1 hover:bg-gray-300"
            :class="{ 'bg-emerald-800': settings.draw, 'text-gray-200': settings.draw }">
            <icon name="uil:paint-tool" size="14px" />
            Draw
        </button>
    </div>
</template>

<script setup lang="ts">
const settings = useSettingsStore();

import html2canvas from 'html2canvas';

const captureMessages = () => {
    const messages: HTMLElement = document.querySelector("main") as HTMLElement;
    const hiddens = Array.from(document.querySelectorAll(".overflow-hidden"));
    const actions = Array.from(document.querySelectorAll(".btn-actions"));
    const pixelRatio = window.devicePixelRatio;
    const minRatio = 2.5;

    const changeElements = () => {
        window.devicePixelRatio = Math.max(pixelRatio, minRatio);
        hiddens.forEach((el) => {
            el.classList.remove('overflow-hidden');
        });
        actions.forEach((el) => {
            el.classList.add('hidden');
        });
        messages.style.width = '850px';
        messages.style.height = 'fit-content';
        messages.style.marginInline = 'auto';
        messages.style.padding = '0';
        messages.style.paddingBottom = '10px';
        messages.classList.add('bg-gray-800');
        (messages.querySelector('.btn-logout') as HTMLElement).style.display = 'none';
    };

    const restoreElements = () => {
        window.devicePixelRatio = pixelRatio;
        messages.style.removeProperty('width');
        messages.style.removeProperty('height');
        messages.style.removeProperty('margin-inline');
        messages.style.removeProperty('padding');
        messages.style.removeProperty('padding-bottom');
        hiddens.forEach((el) => {
            el.classList.add('overflow-hidden');
        });
        actions.forEach((el) => {
            el.classList.remove('hidden');
        });
        messages.classList.remove('bg-gray-800');
        (messages.querySelector('.btn-logout') as HTMLElement).style.display = 'block';
    };

    changeElements();
    html2canvas(messages, {
        letterRendering: true,
    }).then(async (canvas: any) => {
        canvas.toBlob((blob: Blob | MediaSource) => {
            const url = URL.createObjectURL(blob);
            window.open(url, "_blank");
            // restoreElements();
        });
    });
};
</script>

<style scoped>

</style>