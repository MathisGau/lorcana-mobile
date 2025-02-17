import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerServices = async (
  name,
  email,
  password,
  password_confirmation
) => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    name,
    email,
    password,
    password_confirmation,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(
      "https://lorcana.brybry.fr/api/register",
      requestOptions
    );
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const loginServices = async (email, password) => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email,
    password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(
      "https://lorcana.brybry.fr/api/login",
      requestOptions
    );
    const result = await response.json();
    if (result.token) {
      await AsyncStorage.setItem("userToken", result.token);
      console.log(result.token);
      return result.token;
    }
  } catch (error) {
    console.error(error);
  }

  return null;
};
