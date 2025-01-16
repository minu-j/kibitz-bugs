import { useEffect } from "react";
import { useAuth } from "@/entities/auth";
import { LoadingSpinner } from "@/shared/ui";

function Auth() {
  const { requestToken } = useAuth();

  useEffect(() => {
    requestToken();
  }, []);

  return <LoadingSpinner />;
}

export default Auth;
