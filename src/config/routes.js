import home from "pages/home";

const routes = [
  {
    path: "/",
    exact: true,
    need_auth: false,
    ui_components: [home],
    title: "Introduction"
  }
];

export default routes;
