import axios from "axios";

export const Url = "https://hafzny.online/back/public/api/";

export async function fetchDataWithRetries(URL, setApiData, status) {
  try {
    const response = await axios.get(`${Url}${URL}`);
    setApiData(response.data);
    status(response.status);
  } catch (error) {
    console.log(error);
  }
}

export async function postData(
  APiURL,
  userData,
  setUploadPercentage,
  setError
) {
  try {
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setTimeout(() => {
          setUploadPercentage(percent);
        }, 500);
      },
    };
    const response = await axios.post(`${Url}${APiURL}`, userData, {
      headers: {
        "X-Request-With": "XMLHttpRequest",
      },
      // ...options
    });
    return response;
  } catch (error) {
    console.log(error);
    setError("كلمه السر او البريد الالكتروني غير صحيح");
    throw error;
  }
}

export async function putData(APiURL, userData, setUploadPercentage) {
  try {
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setTimeout(() => {
          setUploadPercentage(percent);
        }, 500);
      },
    };
    const response = await axios.put(`${Url}${APiURL}`, userData, {
      headers: {
        "X-Request-With": "XMLHttpRequest",
      },
      // ...options
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteFunction(APiURL, userData, setUploadPercentage) {
  try {
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setTimeout(() => {
          setUploadPercentage(percent);
        }, 500);
      },
    };
    const response = await axios.delete(`${Url}${APiURL}`, userData, {
      headers: {
        "X-Request-With": "XMLHttpRequest",
      },
      // ...options
    });
    return response;
  } catch (error) {
    throw error;
  }
}
