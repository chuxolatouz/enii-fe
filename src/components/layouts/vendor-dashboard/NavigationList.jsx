import duotone from "components/icons/duotone";
export const navigations = [
  {
    type: "label",
    label: "Admin",
  },
  {
    name: "Dashboard",
    icon: duotone.Dashboard,
    path: "/vendor/dashboard",
  },
  {
    name: "Proyectos",
    icon: duotone.Products,
    children: [
      {
        name: "Lista de Proyectos",
        path: "/admin/products",
      },
      {
        name: "Crear Proyecto",
        path: "/admin/products/create",
      },
      {
        name: "Solicitudes",
        path: "/admin/products/request",
      },
    ],
  },
  {
    name: "Usuarios",
    icon: duotone.Customers,
    path: "/admin/customers",
  },
  {
    name: "Configuraciones",
    icon: duotone.SiteSetting,
    path: "/vendor/site-settings",
  },
  {
    name: "Logout",
    icon: duotone.Session,
    path: "/",
  },
];
