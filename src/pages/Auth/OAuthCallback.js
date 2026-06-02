import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import Loading from "../../components/Loading";

const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      navigate("/?error=" + error, { replace: true });
      return;
    }

    if (token) {
      axios
        .get(`${BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.success) {
            login(token, res.data.data.user);
            // Redirect to saved location or home
            const savedPath = sessionStorage.getItem("redirectAfterLogin") || "/";
            sessionStorage.removeItem("redirectAfterLogin");
            navigate(savedPath, { replace: true });
          } else {
            navigate("/?error=oauth_failed", { replace: true });
          }
        })
        .catch(() => navigate("/?error=oauth_failed", { replace: true }));
    } else {
      navigate("/", { replace: true });
    }
  }, [login, navigate, searchParams]);

  return <Loading />;
};

export default OAuthCallback;
