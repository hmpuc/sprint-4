const useGeneralFunctions = () => {
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return {
    isValidEmail,
  };
};

export default useGeneralFunctions;
