import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "@/components/MainLayout";

import { Login } from "@/pages/Login";
import { Inicio } from "@/pages/Inicio";
import { Usuarios } from "@/pages/Usuarios";
import { Trabajadores } from "@/pages/Trabajadores";
import { Clientes } from "@/pages/Clientes";
import { Servicios } from "@/pages/Servicios";
import { Agenda } from "@/pages/Agenda";
import { Datos_empresa } from "@/pages/Datos_empresa";
import { Backup } from "@/pages/Backup";

const pages = [
  { path: "inicio", element: <Inicio /> },
  { path: "usuarios", element: <Usuarios /> },
  { path: "trabajadores", element: <Trabajadores /> },
  { path: "clientes", element: <Clientes /> },
  { path: "servicios", element: <Servicios /> },
  { path: "agenda", element: <Agenda /> },
  { path: "datos-empresa", element: <Datos_empresa /> },
  { path: "backup", element: <Backup /> },
];

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Inicio />,
      },
      ...pages,
    ],
  },
]);