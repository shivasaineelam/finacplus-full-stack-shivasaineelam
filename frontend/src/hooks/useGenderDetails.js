import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addGenders } from "../utils/genderSlics";

const useGenderDetails = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    const url = `${import.meta.env.VITE_USER_REGISTRATION_BACKEND}/types/genders`;
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      dispatch(addGenders(json.data));
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return;
};

export default useGenderDetails;
