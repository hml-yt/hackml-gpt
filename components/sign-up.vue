<template>
    <TransitionRoot as="template" :show="user?.aud !== 'authenticated'">
        <Dialog as="div" class="relative z-10">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                            <div v-if="!waitRes">
                                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 text-center">
                                    Please
                                    sign in
                                </DialogTitle>
                                <Suspense>
                                    <div class="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
                                        <div
                                            class="bg-white sm:mx-auto sm:w-full sm:max-w-md sm:overflow-hidden sm:rounded-lg">
                                            <div class="px-4 pt-8 sm:px-10">
                                                <div>
                                                    <p class="text-sm font-medium text-gray-700">Sign in with</p>
                                                    <div>
                                                        <div class="mt-1 grid grid-cols-3 gap-3">
                                                            <div>
                                                                <button href="#" @click="login('google')"
                                                                    class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                                                                    <span class="sr-only">Sign in with Google</span>
                                                                    <svg class="h-5 w-5" aria-hidden="true"
                                                                        fill="currentColor" viewBox="0 0 20 20">
                                                                        <path
                                                                            d="M9.001 10.71V7.362h8.424c.126.567.225 1.098.225 1.845 0 5.139-3.447 8.793-8.64 8.793-4.968 0-9-4.032-9-9s4.032-9 9-9c2.43 0 4.464.891 6.021 2.349l-2.556 2.484c-.648-.612-1.782-1.332-3.465-1.332-2.979 0-5.409 2.475-5.409 5.508s2.43 5.508 5.409 5.508c3.447 0 4.716-2.385 4.95-3.798H9.001v-.009z" />
                                                                    </svg>
                                                                </button>
                                                            </div>

                                                            <div>
                                                                <button @click="login('linkedin')"
                                                                    class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                                                                    <span class="sr-only">Sign in with LinkedIn</span>
                                                                    <svg class="h-5 w-5" aria-hidden="true"
                                                                        fill="currentColor" viewBox="0 0 24 24">
                                                                        <path
                                                                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                                    </svg>
                                                                </button>
                                                            </div>

                                                            <div>
                                                                <button @click="login('github')"
                                                                    class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                                                                    <span class="sr-only">Sign in with Github</span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                        class="h-5 w-5" fill="currentColor"
                                                                        viewBox="0 0 24 24">
                                                                        <path
                                                                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                                    </svg> </button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="relative mt-6">
                                                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                                        <div class="w-full border-t border-gray-300" />
                                                    </div>
                                                    <div class="relative flex justify-center text-sm">
                                                        <span class="bg-white px-2 text-gray-500">Or</span>
                                                    </div>
                                                </div>

                                                <div class="mt-6">
                                                    <FormKit type="form" @submit="signUp" submit-label="Sign In">
                                                        <FormKitSchema :schema="[{
                                                            $formkit: 'email', name: 'email', placeholder: 'E-Mail', validation: 'required|email'
                                                        }]" />
                                                    </FormKit>
                                                </div>
                                            </div>
                                            <!-- <div
                                            class="border-t-2 border-gray-200 bg-gray-50 px-4 py-6 sm:px-10 text-center">
                                            <p class="text-xs leading-5 text-gray-500">By signing up, you agree to our
                                                <a href="/text/terms"
                                                    class="font-medium text-gray-900 hover:underline">Terms</a>, <a
                                                    href="/text/privacy"
                                                    class="font-medium text-gray-900 hover:underline">Privacy
                                                    Policy</a>.
                                            </p>
                                        </div> -->
                                        </div>
                                    </div>
                                    <template #fallback>
                                        Loading...
                                    </template>
                                </Suspense>
                            </div>
                            <div v-else>
                                <DialogTitle>Please check your email for the login link...</DialogTitle>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script lang="ts" setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const user = useSupabaseUser();
const client = useSupabaseAuthClient();
const waitRes = ref(false);

const signUp = async (data: { email: string; }) => {
    const { email } = data;
    const { error } = await client.auth.signInWithOtp({
        email
    });
    waitRes.value = true;

};

// Login method using providers
const login = async (provider: 'github' | 'google' | 'linkedin') => {
    const { error } = await client.auth.signInWithOAuth({ provider })
    if (error) {
        return alert('Something went wrong !')
    }
}
</script>