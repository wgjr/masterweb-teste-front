import type { RouteRecordRaw } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import DefaultLayout from '../layouts/DefaultLayout.vue';

const routes: RouteRecordRaw[] = [
    {
        path: "",
        component: MainLayout,
        meta: {
            requiresAuth: false,
        },
        children: [
            {
                path: "/:catchAll(.*)",
                redirect: "404",
            },
            {
                path: "404",
                name: "404",
                component: () =>
                    import(/* webpackChunkName: "404" */ "../views/HomeView.vue"),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: "",
                name: "Dashboard",
                component: () =>
                    import(/* webpackChunkName: "404" */ "../views/HomeView.vue"),
                meta: {
                    requiresAuth: true,
                },
            }
        ],
    },
    {
        path: "",
        component: DefaultLayout,
        children: [
            {
                path: "signin",
                name: "SignIn",
                component: () =>
                    import(/* webpackChunkName: "auth" */ '../views/Auth/Login.vue'),
                meta: {
                    requiresAuth: false,
                },
            },
        ],
    },
];

export default routes;
