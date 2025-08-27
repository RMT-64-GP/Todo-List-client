import { useEffect, useRef, useState } from "react";
import { GoogleOAuth } from "../services/googleAuth";

export default function GoogleSignInButton() {
  const buttonRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log("GoogleSignInButton: Starting initialization");
        await GoogleOAuth.initializeGoogleSignIn();
        console.log("GoogleSignInButton: Initialization successful");
        setIsInitialized(true);
        setError(null);

        // Render button after a small delay
        setTimeout(() => {
          if (buttonRef.current) {
            GoogleOAuth.renderSignInButton("google-signin-button");
          }
        }, 200);
      } catch (error) {
        console.error("GoogleSignInButton: Initialization failed:", error);
        setError(error);
        setIsInitialized(true); // Still set to true to show fallback
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const handleFallbackLogin = () => {
    console.log("GoogleSignInButton: Attempting fallback login");
    setIsLoading(true);

    GoogleOAuth.initializeGoogleSignIn()
      .then(() => {
        console.log("GoogleSignInButton: Fallback successful");
        setError(null);
        setTimeout(() => {
          if (buttonRef.current) {
            GoogleOAuth.renderSignInButton("google-signin-button");
          }
        }, 200);
      })
      .catch((error) => {
        console.error("GoogleSignInButton: Fallback failed:", error);
        alert(
          "Unable to load Google Sign-In. Please check your internet connection and try again."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <div className="flex items-center">
        <div className="px-4 py-2 text-sm text-slate-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <div
        id="google-signin-button"
        ref={buttonRef}
        className="google-signin-button"
        style={{ minHeight: "40px", minWidth: "120px" }}
      />
      {error && (
        <button
          onClick={handleFallbackLogin}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors ml-2"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}
