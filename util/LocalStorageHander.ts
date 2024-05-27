/**
 * Local Storage Handler
 * 
 * Utility functions for handling date of birth in local storage.
 */
const LocalStorageHandler = {
    /**
     * Retrieves the date of birth from local storage.
     * 
     * @returns {string | null} The date of birth in "YYYY-MM-DD" format if it exists in local storage, otherwise null.
     */
    getDOB: (): string | null => {
      return localStorage.getItem("dob");
    },
    /**
     * Sets the date of birth in local storage.
     * 
     * @param {string} dob - The date of birth in "YYYY-MM-DD" format.
     */
    setDOB: (dob: string) => {
      localStorage.setItem("dob", dob);
    },
    /**
     * Checks if the provided date of birth is in the valid format "YYYY-MM-DD".
     * 
     * @param {string} dob - The date of birth to validate.
     * @returns {boolean} True if the date of birth is in the valid format, otherwise false.
     */
    isValidDOBFormat: (dob: string): boolean => {
      const pattern = /^\d{4}-\d{2}-\d{2}$/;
      return pattern.test(dob);
    },
  };
  
  export default LocalStorageHandler;
  