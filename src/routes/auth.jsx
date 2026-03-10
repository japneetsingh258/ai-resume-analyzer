import { usePuterStore } from "../lib/puter";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { auth, isLoading } = usePuterStore();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await auth.signIn();   // opens Puter login
    navigate("/");         // redirect after login
  };

  if (isLoading) {
    return (
      <button className="auth-button animate-pulse">
        Checking authentication...
      </button>
    );
  }

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      {auth?.isAuthenticated ? (
        <button className="auth-button" onClick={auth.signOut}>
          Log Out
        </button>
      ) : (
        <button className="auth-button" onClick={handleLogin}>
          Log In
        </button>
      )}
    </main>
  );
};

export default Auth;