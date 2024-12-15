const ADMIN: string = "ADMIN";
const MANAGER: string = "MANAGER";
const CHEF: string = "CHEF";
const WAITER: string = "WAITER";
const RECEPTIONIST: string = "CASHIER";
const TESTER: string = "TESTER";

const ROLES = {
  [ADMIN]: [
    "/home/dashboard",
    "/home/staff-management",
    "/home/staff-schedule",
    "/home/staff-attendance",
    "/home/staff-payroll",
    "/home/order-booking",
    "/home/order-taking",
    "/home/kitchen",
    "/home/menu",
    "/home/bill",
    "/home/tableandroom",
    "/home/customer-management",
    "/home/supplier-management",
    "/home/products",
    "/home/purchase-order",
  ],
  [MANAGER]: [
    "/home/staff-schedule",
    "/home/staff-attendance",
    "/home/staff-payroll",
    "/home/order-booking",
    "/home/order-taking",
    "/home/kitchen",
    "/home/menu",
    "/home/bill",
    "/home/tableandroom",
    "/home/customer-management",
    "/home/supplier-management",
    "/home/products",
    "/home/purchase-order",
  ],
  [CHEF]: ["/home/kitchen"],
  [WAITER]: ["/home/order-taking"],
  [RECEPTIONIST]: ["/home/order-booking"],
};

type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

export function hasPermission(role: Role, permission: Permission) {
  if (!ROLES[role]) {
    return false;
  }
  for (const path of ROLES[role]) {
    if (permission.startsWith(path)) {
      return true;
    }
  }
  return false;
}

export function firstView(role: Role): string {
  switch (role) {
    case ADMIN:
      return "/home/dashboard";
    case MANAGER:
      return "/home/staff-schedule";
    case CHEF:
      return "/home/kitchen";
    case RECEPTIONIST:
      return "/home/order-booking";
    case WAITER:
      return "/home/order-taking";
    default:
      return "";
  }
}
