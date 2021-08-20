import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/login"
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;