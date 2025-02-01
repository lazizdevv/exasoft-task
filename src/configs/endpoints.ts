export const endpoints = {
  login: "/api/auths/sign-in",
  register: "/api/auths/sign-up",
  companies: {
    post: "/api/companies/add",
    put: "/api/companies/update",
    delete: "/api/companies/delete/by-id",
    get: "/api/companies/get/",
    list: "/api/companies/get-all",
  },
};
