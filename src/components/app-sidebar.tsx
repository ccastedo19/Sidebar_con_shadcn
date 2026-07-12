import * as React from 'react'
import {
  AudioWaveform,
  BadgeCheck,
  Bell,
  House,
  CalendarDays,
  ChevronRight,
  ChevronsUpDown,
  Command,
  GalleryVerticalEnd,
  LogOut,
  Settings2,
  UserRound,
  SquareScissors
} from 'lucide-react'
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun, Monitor } from "lucide-react";

import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Barberiaaa Demo',
      logo: GalleryVerticalEnd,
      plan: 'Version 1.0',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: "Inicio",
      url: "/inicio",
      icon: House,
    },

    {
      title: "Personas",
      icon: UserRound,

      items: [
        {
          title: "Usuarios",
          url: "/usuarios",
        },

        {
          title: "Trabajadores",
          url: "/trabajadores",
        },

        {
          title: "Clientes",
          url: "/clientes",
        },
      ],
    },

    {
      title: "Servicios",
      url: "/servicios",
      icon: SquareScissors,
    },

    {
      title: "Agenda",
      url: "/agenda",
      icon: CalendarDays,
    },

    {
      title: "Configuración",
      icon: Settings2,

      items: [
        {
          title: "Datos de Empresa",
          url: "/datos-empresa",
        },

        {
          title: "Backup de Datos",
          url: "/backup",
        },
      ],
    },
  ]
  
}

function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const activeTeam = teams[0];

  if (!activeTeam) {
    return null
  }

 
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <activeTeam.logo className="size-4" />
          </div>
  
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{activeTeam.name}</span>
            <span className="truncate text-xs">{activeTeam.plan}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

function NavMain({
  items,
}: {
  items: {
    title: string
    url?: string
    icon?: React.ElementType
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menú</SidebarGroupLabel>
      <SidebarMenu>
      {items.map((item) =>
        item.items && item.items.length > 0 ? (
          <Collapsible
            key={item.title}
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger
                render={<SidebarMenuButton tooltip={item.title} />}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>

                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton render={<Link to={subItem.url} />}>
                        <span>{subItem.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ) : (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              tooltip={item.title}
              render={<Link to={item.url ?? "/"} />}
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      )}
      </SidebarMenu>
    </SidebarGroup>
  )
}


function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const { theme, setTheme } = useTheme();
  
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                />
              }
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

                <DropdownMenuGroup>

                  <DropdownMenuLabel>
                    Tema
                  </DropdownMenuLabel>

                  <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={(value) =>
                      setTheme(value)
                    }
                  >

                    <DropdownMenuRadioItem value="light">
                      <Sun />
                      Claro
                    </DropdownMenuRadioItem>


                    <DropdownMenuRadioItem value="dark">
                      <Moon />
                      Oscuro
                    </DropdownMenuRadioItem>


                    <DropdownMenuRadioItem value="system">
                      <Monitor />
                      Sistema
                    </DropdownMenuRadioItem>

                  </DropdownMenuRadioGroup>

                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>

                  <DropdownMenuItem>
                    <BadgeCheck />
                    Cuenta
                  </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notificaciones
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <LogOut />
                  Salir
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
