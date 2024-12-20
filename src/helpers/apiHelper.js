import axios from "axios";
import Swal from "sweetalert2";

const apiHelper = async (method, url, data = null) => {
  try {
    const response = await axios({
      method,
      url,
      data,
    });
    return response;   
  } catch (error) {
    console.error("API Error:", error);
    // Show error with SweetAlert
    Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "Okay",
       
      });
    throw error; // Rethrow the error if you want to handle it in the calling code
  }
};

export default apiHelper;
