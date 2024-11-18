const ADMIN: string = "Admin";
const MANAGER: string = "Manager";
const CHEF: string = "Chef";
const WAITER: string = "Waiter";
const RECEPTIONIST: string = "Receptionist";
const TESTER: string = "Tester";

const ROLES = {
  [ADMIN]: [
    "/home",
    "/home/dashboard",
    "/home/staff-management",
    "/home/staff-schedule",
    "/home/staff-attendance",
    "/home/staff-payroll",
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
    "/home/products",
    "/home/purchase-order",
    "/home/purchase-order/new",
    "/home/purchase-order/open",
    "/home/purchase-order/return",
    "/home/kitchen",
    "/home/order-booking",
    "/home/order-taking",
  ],
};

type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

export function hasPermission(role: Role, permission: Permission) {
  return ROLES[role].includes(permission);
}
