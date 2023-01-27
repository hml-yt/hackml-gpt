<template>
    <button @click="signOut">Logout</button>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
    useCookie('sb-access-token').value = null;
    useCookie('sb-refresh-token').value = null;
    user.value = null;
};
</script>

<style scoped>

</style>