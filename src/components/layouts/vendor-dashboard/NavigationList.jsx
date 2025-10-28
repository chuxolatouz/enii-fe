import duotone from "components/icons/duotone";
export const navigations = [
  {
    type: "label",
    label: "Admin",
  },
  {
    name: "Dashboard",
    icon: duotone.Dashboard,
    path: "/admin/dashboard",
  },
  {
    name: "Portafolio",
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
    ],
  },
  {
    name: "Reglas Fijas",
    icon: duotone.AccountSetting,
    children: [
      {
        name: "Crear Solicitud",
        path: "/admin/request/create"
      },
      {
        name: "Lista de Solicitudes",
        path: "/admin/request",
      },
    ]
  },
  {
    name: "Usuarios",
    icon: duotone.Customers,
    path: "/admin/customers",
  },
  // {
  //   name: "Configuraciones",
  //   icon: duotone.SiteSetting,
  //   path: "/vendor/site-settings",
  // },
  {
    name: "Logout",
    icon: duotone.Session,
    type: "action",
  },
];
