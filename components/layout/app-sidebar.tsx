'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/ui/sidebar';
import { navItems } from '@/constants/data';
import { bankNavItems } from '@/constants/data';
import {
  BadgeCheck,
  Bell,
  ChevronRight,
  ChevronsUpDown,
  Eye,
  Landmark,
  Flower,
  LogOut
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { Icons } from '../icons';
import { useRouter } from 'next/navigation';

export default function AppSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  // Set the isPaynet flag based on the directory
  const isPaynet = pathname.startsWith('/dashboard');

  // Conditionally set the company name and nav items
  const company = {
    name: isPaynet ? 'PayNet' : 'Bank ABC',
    logo: isPaynet ? Flower : Landmark,
    plan: isPaynet ? 'In-House' : 'Enterprise'
  };

  const items = isPaynet ? navItems : bankNavItems;
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex gap-2 py-2 text-sidebar-accent-foreground ">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <company.logo className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{company.name}</span>
            <span className="truncate text-xs">{company.plan}</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          {/* <SidebarGroupLabel>Overview</SidebarGroupLabel> */}
          <SidebarMenu>
            {items.map((item) => {
              const Icon = item.icon ? Icons[item.icon] : Icons.logo;
              return item?.items && item?.items?.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={pathname === item.url}
                      >
                        {item.icon && <Icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === subItem.url}
                            >
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
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
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <Icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={session?.user?.image || ''}
                      alt={session?.user?.name || ''}
                    />
                    <AvatarFallback className="rounded-lg">
                      {session?.user?.name?.slice(0, 2)?.toUpperCase() || (
                        <Eye></Eye>
                      )}
                    </AvatarFallback>
                  </Avatar>
                  Switch View Mode
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {session?.user?.name || ''}
                    </span>
                    <span className="truncate text-xs">
                      {session?.user?.email || ''}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push('/dashboard/overview');
                    }}
                  >
                    Paynet
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push('/bank_dashboard/bank_overview');
                    }}
                  >
                    Bank Specific
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push('/customer/transfer-amount');
                    }}
                  >
                    Customer
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    router.push('/');
                  }}
                >
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
