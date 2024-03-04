import axios from "axios";
import { SERVER_URL } from "../constants";
import { StatusCodes } from "http-status-codes";

const RequestLogin = async (name, password) => {
  try {
    const response = await axios.post(`${SERVER_URL}/users`, {
      name: name,
      password: password,
    });
    localStorage.setItem("token", response.data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const RequestRegister = async (name, password) => {
  try {
    const response = await axios.post(`${SERVER_URL}/users/register`, {
      name: name,
      password: password,
    });
    localStorage.setItem("token", response.data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const RequestNameCheck = async (name) => {
  try {
    const response = await axios.get(`${SERVER_URL}/users/exists/${name}`);
    return response.status === StatusCodes.OK;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const RequestAdminCheck = async () => {
  try {
    const response = await axios.post(`${SERVER_URL}/users/is_admin`, null, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const RequestUsers = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/users/`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const RequestUserById = async (id) => {
  try {
    const response = await axios.get(`${SERVER_URL}/users/${id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    if (response.status === StatusCodes.OK) {
      return response.data;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const RequestUserDeletion = async (name) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/users/${name}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return response.status === StatusCodes.OK;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const RequestMessageSend = async (message) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/messages`,
      { message: message },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    if (response.status === StatusCodes.OK) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

const RequestAllMessages = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/messages`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    if (response.status === StatusCodes.OK) {
      return response.data;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default {
  RequestLogin,
  RequestRegister,
  RequestNameCheck,
  RequestAdminCheck,
  RequestUsers,
  RequestUserById,
  RequestUserDeletion,
  RequestMessageSend,
  RequestAllMessages,
};
