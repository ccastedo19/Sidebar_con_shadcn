import { Link, useLocation } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const routes: Record<
  string,
  {
    title: string;
    parent?: string;
  }
> = {
  "/inicio": {
    title: "Inicio",
  },

  "/usuarios": {
    title: "Usuarios",
    parent: "Personas",
  },

  "/trabajadores": {
    title: "Trabajadores",
    parent: "Personas",
  },

  "/clientes": {
    title: "Clientes",
    parent: "Personas",
  },

  "/servicios": {
    title: "Servicios",
  },

  "/agenda": {
    title: "Agenda",
  },

  "/datos-empresa": {
    title: "Datos de Empresa",
    parent: "Configuración",
  },

  "/backup": {
    title: "Backup de Datos",
    parent: "Configuración",
  },
};

export function Breadcrumbs() {
  const { pathname } = useLocation();

  const current = routes[pathname];

  return (
    <Breadcrumb>
      <BreadcrumbList>

        {/* Inicio */}
        <BreadcrumbItem>
          {pathname === "/inicio" || pathname === "/" ? (
            <BreadcrumbPage>Inicio</BreadcrumbPage>
          ) : (
            <BreadcrumbLink
              render={<Link to="/inicio" />}
            >
              Inicio
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {/* Padre */}
        {current?.parent && (
          <>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>{current.parent}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}

        {/* Página */}
        {pathname !== "/inicio" &&
          pathname !== "/" &&
          current && (
            <>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>
                  {current.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}