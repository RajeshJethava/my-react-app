export const apiCall = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorMessage = `Error: ${response.status} ${response.statusText}`;
      console.error(errorMessage);
      alert("An error occurred. Please try again.");
      return null; // Return null to indicate failure
    }

    return await response.json();
  } catch (error) {
    console.error("Unexpected error:", error);
    alert("An unexpected error occurred. Please try again.");
    return null; // Return null to indicate failure
  }
};

// Add this line to make the file a module
export {};