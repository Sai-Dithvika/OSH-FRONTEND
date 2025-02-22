// lib/withAuth.tsx
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/login");
      }
    }, [status, router]);

    // Only render the wrapped component if the session is authenticated
    if (status === "loading") return <p>Loading...</p>;
    if (status === "authenticated") return <WrappedComponent {...props} />;

    return null;
  };

  return ComponentWithAuth;
};

export default withAuth;
