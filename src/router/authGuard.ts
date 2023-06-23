import { useAccountStore } from '../stores/modules/account';
import { storeToRefs } from 'pinia';
import { Loading } from "quasar";
import { getMeService } from "../services/accountServices";
export default async (to: any) => {
    const token = localStorage.getItem("access_token");
    const { setProfile } = useAccountStore();
    const { profile } = storeToRefs(useAccountStore());

    const getProfile = async (): Promise<any> => {
        try {
            Loading.show();
            const { status, data } = await getMeService();
            if (status === 200) return data;
        } catch (error) {
            return false;
        } finally {
            Loading.hide();
        }
    };

    if (await to.matched.some((record: any) => record.meta.requiresAuth)) {
        if (!token) return "signin";
        if (!profile.value) {
            const [profile] = await Promise.all([getProfile()]);
            if (profile) setProfile(profile);
            else {
                localStorage.removeItem("access_token");
                return "signin";
            }
        }
        return true;
    } else {
        if (token) return "";
        else return true;
    }
};
