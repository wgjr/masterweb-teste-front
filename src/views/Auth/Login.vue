<script setup lang="ts">
    import {ref} from "vue";
    import myImageLogo from "../../assets/logo-white-blue-masterdaweb.png"
    import {loginService} from "../../services/accountServices";
    import {useRouter} from "vue-router";
    import { useQuasar } from 'quasar'

    const loading = ref<boolean>(false);
    const useremail = ref<string>("");
    const password = ref<string>("");

    const router = useRouter();
    const $q = useQuasar()

    const onSubmit = async (e: Event) => {
        loading.value = true;
        try {
            const {status, data} = await loginService(useremail.value, password.value);
            if (status === 200) {
                localStorage.setItem("access_token", data.AuthLogin.token);

                router.push({name: "Dashboard"});
            }
            e.preventDefault();
        } catch (error) {
            $q.notify({
                position: 'top',
                message: 'Usuário ou senha inválidos',
                icon: 'announcement'
            })
        } finally {
            loading.value = false;
        }
    };
</script>

<template>
    <q-page
            class="window-height window-width row justify-center items-center"
            style="background: linear-gradient(135deg, #202736  0%,#202736 100%);"
    >
        <div class="column">
            <div class="row">
                <q-card square dark class="q-ma-none no-shadow text-center" style="width:420px; background-color: #191e29">
                    <q-card-section class="content-center">
                        <q-img
                                :src=myImageLogo
                                alt="Logo HospedaFácil"
                                class="my-image"
                        />
                        <div class="text-h5">Acesso Restrito</div>
                    </q-card-section>
                    <q-form @submit="onSubmit" class="q-gutter-md">
                        <q-card-section>
                            <q-input :rules="[val => !!val || 'Email invalido']" dark dense square filled clearable v-model="useremail" type="email" label="Email">
                                <template v-slot:prepend>
                                    <q-icon name="email"/>
                                </template>
                            </q-input>
                            <q-input :rules="[val => !!val || 'Senha inválida']" dark dense square filled clearable v-model="password" type="password"
                                     label="Password">
                                <template v-slot:prepend>
                                    <q-icon name="lock"/>
                                </template>
                            </q-input>
                        </q-card-section>
                        <q-card-actions>
                            <div class="row full-width items-center">
                                <div class="col-12">
                                    <q-btn outline rounded size="md" color="red-4" class="full-width text-white"
                                           label="Acessar" type="submit" :loading="loading"/>
                                </div>
                            </div>
                            <div class="row full-width items-center">
                                <div class="col-6 ">
                                    <div class="locale-changer">
                                    </div>
                                </div>
                                <div class="col-6 ">
                                </div>
                            </div>
                        </q-card-actions>
                    </q-form>
                    <q-card-section>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<style>

</style>