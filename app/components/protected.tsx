// pages/protected.tsx
import { signOut } from "next-auth/react";
import withAuth from "@/lib/withAuth";
const ProtectedPage = () => (
  <div>
    <h1>Protected Content</h1>
    <button onClick={() => signOut()}>Sign Out</button>
  </div>
);

export default withAuth(ProtectedPage);
