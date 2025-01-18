import { useEffect } from "react";
import { useAuth } from "@/entities/auth";
import { LoadingSpinner } from "@/shared/ui";
import { useParams } from "react-router-dom";

function Auth() {
  const { provider } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code") ?? null;
  const state = queryParams.get("state") ?? null;

  const { requestToken } = useAuth();

  useEffect(() => {
    requestToken({ provider, code, state });
  }, []);

  return <LoadingSpinner />;
}

export default Auth;
