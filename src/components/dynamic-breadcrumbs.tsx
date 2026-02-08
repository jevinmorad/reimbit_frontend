import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react"
import { Link, useLocation } from "react-router-dom"

const ROUTE_NAME_MAP: Record<string, string> = {
    dashboard: "Dashboard",
    expenses: "Expenses",
    reports: "Reports",
    approvals: "Approvals",
    finance: "Finance",
    projects: "Projects",
    categories: "Categories",
    policies: "Policies",
    analytics: "Analytics",
    organization: "Organization",
    users: "Users",
    roles: "Roles",
    settings: "Settings",
    list: "List",
    create: "Create",
    edit: "Edit",
    view: "View",
}

export function DynamicBreadcrumbs() {
    const location = useLocation()
    const pathnames = location.pathname.split("/").filter((x) => x)

    // Explicitly handle home/dashboard as start if needed, 
    // currently assuming path-based breadcrumbs structure.

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {pathnames.length === 0 ? (
                    <BreadcrumbItem>
                        <BreadcrumbPage>Home</BreadcrumbPage>
                    </BreadcrumbItem>
                ) : (
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink asChild>
                            <Link to="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                )}

                {pathnames.map((value, index) => {
                    // If the first segment is dashboard, skip it since we manually added it above
                    // Or handle logic to avoid duplication if user is ON /dashboard
                    if (value === 'dashboard' && index === 0) return null;

                    const to = `/${pathnames.slice(0, index + 1).join("/")}`
                    const isLast = index === pathnames.length - 1

                    const displayName = ROUTE_NAME_MAP[value] || value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ')

                    return (
                        <React.Fragment key={to}>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem className="hidden md:block">
                                {isLast ? (
                                    <BreadcrumbPage>{displayName}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link to={to}>{displayName}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
