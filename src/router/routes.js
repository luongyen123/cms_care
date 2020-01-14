import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Login from "@/pages/Login/Login.vue";
import TableList from "@/pages/TableList"
import NurseList from "@/pages/NurseList"
const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {permisions: 1}
      },
      {
        path: "stats",
        name: "stats",
        component: UserProfile,
        meta: {permisions: 1}
      },
      {
        path: "list/Patient",
        name: "list-user",
        component: TableList,
        meta: {permisions: 1}
      },
      {
        path: "list/Nurse",
        name: "list-user",
        component: NurseList,
        meta: {permisions: 1}
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    name:"Login"
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
