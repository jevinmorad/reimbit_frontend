import { AppSidebar, data } from '@/components/app-sidebar';
import { DynamicBreadcrumbs } from '@/components/dynamic-breadcrumbs';
import { NavUser } from '@/components/nav-user';
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <DynamicBreadcrumbs />
                    </div>
                    <div>
                        <NavUser user={data.user} />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
