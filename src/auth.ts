const ADMIN: string = "ADMIN";
const MANAGER: string = "MANAGER";
const CHEF: string = "CHEF";
const WAITER: string = "WAITER";
const RECEPTIONIST: string = "RECEPTIONIST";
const TESTER: string = "TESTER";

const ROLES = {
  [ADMIN]: [
    "/home/dashboard",
    "/home/staff-management",
    "/home/staff-schedule",
    "/home/staff-attendance",
    "/home/staff-payroll",
    "/home/customer-management",
    "/home/supplier-management",
    "/home/order-taking",
    "/home/products",
    "/home/purchase-order",
    "/home/purchase-order/new",
    "/home/purchase-order/open",
    "/home/purchase-order/return",
    "/home/menu",
  ],
  [MANAGER]: [
    "/home/staff-management",
    "/home/staff-schedule",
    "/home/staff-attendance",
    "/home/staff-payroll",
    "/home/customer-management",
    "/home/supplier-management",
    "/home/products",
    "/home/purchase-order",
    "/home/purchase-order/new",
    "/home/purchase-order/open",
    "/home/purchase-order/return",
    "/home/kitchen",
    "/home/order-booking",
    "/home/order-taking",
  ],
  [CHEF]: ["/home/kitchen"],
  [WAITER]: ["/home/order-taking"],
  [RECEPTIONIST]: ["/home/order-booking"],
  [TESTER]: [
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
    "/home/menu",
  ],
};

type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

export function hasPermission(role: Role, permission: Permission) {
  return ROLES[role]?.includes(permission);
}

export function firstView(role: Role): string {
  switch (role) {
    case ADMIN:
      return "/home/dashboard";
    case MANAGER:
      return "/home/staff-management";
    case CHEF:
      return "/home/kitchen";
    case RECEPTIONIST:
      return "/home/order-booking";
    case WAITER:
      return "/home/order-taking";
    case TESTER:
      return "/home/dashboard";
    default:
      return "";
  }
}
