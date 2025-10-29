const ErrorHandler = (err) => {
  const errorType = (typeof err === "string" ? err : err.name || "UNKNOWN_ERROR").toUpperCase();

  switch (errorType) {
    case "NETWORK_ERROR":
      console.error("Network Error:", err.message || err);
      return "Network connection failed. Please check your internet.";

    case "VALIDATION_ERROR":
      console.warn("Validation Error:", err.message || err);
      return "Please enter valid input.";

    case "AUTH_ERROR":
      console.warn("Authentication Error:", err.message || err);
      return "Your session has expired. Please login again.";

    case "SERVER_ERROR":
      console.error("Server Error:", err.message || err);
      return "Server issue occurred. Please try again later.";

    default:
      console.error("Unhandled Error:", err);
      return "Something went wrong! Please try again.";
  }
};

export default ErrorHandler;
