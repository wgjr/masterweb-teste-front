import { createRouter, createWebHistory, type Router } from "vue-router";
import routes from "./routes";
import authGuard from "./authGuard";
const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(authGuard);

export default router;
