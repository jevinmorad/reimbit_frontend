"use client"

import {
  BarChart3,
  BookOpen,
  CheckSquare,
  CreditCard,
  FileText,
  LayoutDashboard,
  LayoutGrid,
  LifeBuoy,
  Lock,
  Receipt,
  Send,
  Settings,
  ShieldCheck,
  Users
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

export const data = {
  user: {
    name: "User Name",
    email: "user@reimbit.com",
    avatar: "/avatars/shadcn.jpg",
  },
  // ... navMain ...
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        { title: "My Dashboard", url: "#" },
        { title: "Expense Summary", url: "#" },
        { title: "Pending Approvals", url: "#" },
        { title: "Pending Payments", url: "#" },
        { title: "Alerts & Notifications", url: "#" },
      ],
    },
    {
      title: "My Expenses",
      url: "/MyExpenses",
      icon: Receipt,
    },
    {
      title: "Expense Category",
      url: "/ExpenseCategories",
      icon: LayoutGrid,
    },
    {
      title: "Expense Reports",
      url: "#",
      icon: FileText,
      items: [
        { title: "My Team Reports", url: "#" },
        { title: "Submitted Reports", url: "#" },
        { title: "Approved Reports", url: "#" },
      ],
    },
    {
      title: "Approvals",
      url: "#",
      icon: CheckSquare,
      items: [
        { title: "Approval Inbox", url: "#" },
        { title: "Approval History", url: "#" },
        { title: "Delegate Approver", url: "#" },
        { title: "Escalated Approvals", url: "#" },
      ],
    },
    {
      title: "Finance & Reimbursements",
      url: "#",
      icon: CreditCard,
      items: [
        { title: "Approved Reports", url: "#" },
        { title: "Payment Processing", url: "#" },
        { title: "Payment Batches", url: "#" },
        { title: "Transaction History", url: "#" },
        { title: "Failed Payments", url: "#" },
      ],
    },
    {
      title: "Categories & Policies",
      url: "#",
      icon: ShieldCheck,
      items: [
        { title: "Category List", url: "#" },
        { title: "Policies", url: "#" },
        { title: "Policy Violations", url: "#" },
        { title: "Exception Requests", url: "#" },
      ],
    },
    {
      title: "Reports & Analytics",
      url: "#",
      icon: BarChart3,
      items: [
        { title: "Expense Summary", url: "#" },
        { title: "Employee Report", url: "#" },
        { title: "Category Spend", url: "#" },
        { title: "Project Spend", url: "#" },
        { title: "Monthly Trends", url: "#" },
        { title: "Policy Violations", url: "#" },
        { title: "Custom Builder", url: "#" },
      ],
    },
    {
      title: "Org & User Mgmt",
      url: "#",
      icon: Users,
      items: [
        { title: "Org Profile", url: "#" },
        { title: "User List", url: "#" },
        { title: "Create/Edit User", url: "#" },
        { title: "Manager Mapping", url: "#" },
        { title: "Department Setup", url: "#" },
      ],
    },
    {
      title: "Roles & Permissions",
      url: "#",
      icon: Lock,
      items: [
        { title: "Role List", url: "#" },
        { title: "Create/Edit Role", url: "#" },
        { title: "Assign Permissions", url: "#" },
        { title: "Assign Role to User", url: "#" },
        { title: "Temp Role Assignment", url: "#" },
        { title: "Role Change Logs", url: "#" },
      ],
    },
    {
      title: "System Settings",
      url: "#",
      icon: Settings,
      items: [
        { title: "App Settings", url: "#" },
        { title: "Feature Toggles", url: "#" },
        { title: "Currency Settings", url: "#" },
        { title: "Fiscal Year Setup", url: "#" },
        { title: "Maintenance Mode", url: "#" },
        { title: "System Health", url: "#" },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <BookOpen className="size-4" /> {/* Placeholder logo icon */}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Reimbit</span>
                  <span className="truncate text-xs">Expense Management</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  )
}