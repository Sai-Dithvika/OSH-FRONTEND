// lib/routes.ts
const routes = {
    home: { path: '/', isAuthenticated: false },
    protected: { path: '/protected', isAuthenticated: true },
    // Add other routes here
  };
  
  export default routes;
  