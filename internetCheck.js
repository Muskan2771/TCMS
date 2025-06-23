function checkInternetConnection() {
  if (navigator.onLine) {
    console.log("You are connected to the internet.");
  } else {
    console.log("You are not connected to the internet.");
  }
}

// Call the function to check internet connection
checkInternetConnection();

export default checkInternetConnection;
