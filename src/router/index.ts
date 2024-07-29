import { createWebHistory, createRouter } from "vue-router";
import BooksView from "../views/BooksView.vue";
import ViewBookView from "../views/ViewBookView.vue";

// const routes = [
//     { path: "/", name: "home", component: HomeView },
//     { path: "/jobs", name: "jobs", component: JobListings },
//     { path: "/job/add", name: "add-job", component: AddJobView },
//     { path: "/job/edit/:id", name: "edit-job", component: AddJobView },
//     { path: "/jobs/:id", name: "view-job", component: ViewJob },
//     {
//       path: "/:catchAll(.*)",
//       name: "not-found",
//       component: NotFound,
//     },
//   ];

const routes = [
    {path: "/", name: "books", component: BooksView},
    {path: "/:id", name: "view-books", component: ViewBookView},

]
  

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
