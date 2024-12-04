const ADMIN: string = "ADMIN";
const MANAGER: string = "MANAGER";
const CHEF: string = "CHEF";
const WAITER: string = "WAITER";
const RECEPTIONIST: string = "RECEPTIONIST";
const TESTER: string = "TESTER";

const ROLES = {
  [ADMIN]: [
    "/home",
    "/home/dashboard",
    "/home/staff-management",
    "/home/staff-schedule",
    "/home/staff-attendance",
    "/home/staff-payroll",
    "/home/customer-management",
    "/home/products",
    "/home/purchase-order",
    "/home/purchase-order/new",
    "/home/purchase-order/open",
    "/home/purchase-order/return",
  ],
  [MANAGER]: [
    "/home",
    "/home/staff-management",
    "/home/staff-schedule",
    "/home/staff-attendance",
    "/home/staff-payroll",
    "/home/customer-management",
    "/home/products",
    "/home/purchase-order",
    "/home/purchase-order/new",
    "/home/purchase-order/open",
    "/home/purchase-order/return",
    "/home/kitchen",
    "/home/order-booking",
    "/home/order-taking",
  ],
  [CHEF]: ["/home", "/home/kitchen"],
  [WAITER]: ["/home", "/home/order-taking"],
  [RECEPTIONIST]: ["/home", "/home/order-booking"],
  [TESTER]: [
    "/home",
    "/home/dashboard",
    "/home/staff-management",
    "/home/staff-schedule",
    "/home/staff-attendance",
    "/home/staff-payroll",
    "/home/customer-management",
    "/home/products",
    "/home/purchase-order",
    "/home/purchase-order/new",
    "/home/purchase-order/open",
    "/home/purchase-order/return",
    "/home/kitchen",
    "/home/order-booking",
    "/home/order-taking",
    "/home/purchase-return",
    "/home/purchase-return/return",
    "/home/supplier-management",
    "/home/paysheet",
    "/home/calendar",
    "/home/bill",
    "/home/tableandroom",
  ],
};

type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

export function hasPermission(role: Role, permission: Permission) {
  return ROLES[role].includes(permission);
}
