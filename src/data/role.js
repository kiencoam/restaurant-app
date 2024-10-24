export const role = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  CHEF: "Chef",
  WAITER: "Waiter",
};

export const roleRouter = {
  [role.MANAGER]: [
    {
      page: "Staff Management",
      link: "/home/staff-manager",
    },
    {
      page: "Staff Schedule",
      link: "/home/staff-schedule",
    },
  ],
};
