export const fetchUsers = () => {
  return $.ajax({
    method: "GET",
    url: `/api/users`
  });
};

export const fetchUser = (user) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${user.id}`
  });
};
