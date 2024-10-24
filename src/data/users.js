const users = [
  {
    name: "Manager",
    email: "manager@email.com",
    password: "password",
    role: "MANAGER",
    username: "manager",
    id: 4214213,
  },
  {
    name: "Chef",
    email: "chef@email.com",
    password: "password",
  },
  {
    name: "Waiter",
    email: "waiter@email.com",
    password: "password",
  },
];

export const getUserByEmail = (email) => {
  return users.find((user) => user.email === email);
};
