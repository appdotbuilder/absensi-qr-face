import { SidebarProvider } from '@/components/ui/sidebar';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header';
import { AppContent } from '@/components/app-content';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
    breadcrumbs?: BreadcrumbItem[];
}

export function AppShell({ children, variant = 'header', breadcrumbs }: AppShellProps) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    if (variant === 'header') {
        return <div className="flex min-h-screen w-full flex-col">{children}</div>;
    }

    return (
        <SidebarProvider defaultOpen={isOpen}>
            <AppSidebar />
            <AppContent>
                <AppHeader breadcrumbs={breadcrumbs} />
                <div className="flex-1 overflow-auto p-4">
                    {children}
                </div>
            </AppContent>
        </SidebarProvider>
    );
}
