import { defineStore } from "pinia";
import { ref } from "vue";

export const useAccountStore = defineStore("account", () => {
    const profile = ref<any | undefined>();
    const setProfile = (data: any | undefined) => {
        profile.value = data;
    };

    return {
        profile,
        setProfile
    };
});
