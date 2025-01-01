import {
  generateCodeChallenge,
  generateCodeVerifier,
} from "../utils/utils.tsx";
import { useEffect, useState } from "react";

function LichessOauth() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const url = "https://lichess.org/";

  const initializeOAuth = async () => {
    try {
      setError("");
      const verifier = generateCodeVerifier();

      localStorage.setItem("lichess_code_verifier", verifier);

      const codeChallenge = await generateCodeChallenge(verifier);

      const clientId = "Chess Trainer";
      const redirectUri = "http://localhost:5173/";

      // Construct the authorization URL for Lichess
      const params = new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        redirect_uri: redirectUri,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
        scope: "preference:read",
      });

      window.location.href = `${url}oauth?${params.toString()}`;
    } catch (err) {
      console.error("OAuth initialization error:", err);
    }
  };

  // Handle the OAuth callback
  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const error = urlParams.get("error");
      const storedVerifier = localStorage.getItem("lichess_code_verifier");

      // Clear the code verifier from storage
      localStorage.removeItem("lichess_code_verifier");

      // Clear the URL parameters without triggering a refresh
      window.history.replaceState({}, "", window.location.pathname);

      if (error) {
        setError(`Authentication failed: ${error}`);
        setIsLoading(false);
        return;
      }

      if (code && storedVerifier) {
        try {
          setSuccess(true);
        } catch (err) {
          setError("Failed to complete authentication. Please try again.");
          console.error("Token exchange error:", err);
        }
      }
      setIsLoading(false);
    };

    handleCallback();
  }, []);

  return (
    <div>
      {isLoading && "Loading..."}
      <>Logo</>
      <button onClick={() => initializeOAuth()}>Login with Lichess</button>
      {error && (
        <div className="mb-4">
          <p>Error</p>
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4">
          <p>Success</p>
          <p>Successfully authenticated with Lichess!</p>
        </div>
      )}
    </div>
  );
}

export default LichessOauth;
