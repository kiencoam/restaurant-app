const ADMIN: string = "ADMIN";
const MANAGER: string = "MANAGER";
const CHEF: string = "CHEF";
const WAITER: string = "WAITER";
const RECEPTIONIST: string = "CASHIER";
const TESTER: string = "TESTER";

const ROLES = {
  [ADMIN]: [
    "/home/dashboard",
    "/home/kitchen",
    "/home/tableandroom",
    "/home/staff-management",
    "/home/staff-schedule",
    "/home/staff-attendance",
    "/home/staff-payroll",
    "/home/customer-management",
    "/home/supplier-management",
    "/home/order-taking",
    "/home/order-booking",
    "/home/products",
    "/home/purchase-order",
    "/home/menu",
    "/home/bill",
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
    "/home/kitchen",
    "/home/order-booking",
    "/home/order-taking",
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
