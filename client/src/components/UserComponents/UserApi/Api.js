import axios from "axios";

export const login = async (props) => {
  let data = {
    message: "",
    token: null,
    success: false,
    userData: {},
  };
  const { enteredEmail: email, enteredPassword: password } = props;
  try {
    const res = await axios.post("http://localhost:8000/signin", {email,password});
    data.message = res.data.message;
    data.success = true;
    data.token = res.data.token;
    data.userData = res.data.response
  } catch (err) {
    data.message = err.response.data.error;
  }
  return data;
};

export const signUp = async (props) => {
  const {
    enteredName: name,
    enteredEmail: email,
    enteredPassword: password,
    enteredNumber: number,
  } = props;
  let data = {
    message: "",
    success: false,
  };
  try {
    const res = await axios.post("http://localhost:8000/signup", {
      name,
      email,
      password,
      number,
    });
    if(res.status === 200) {
      await axios.post("http://localhost:8000/createcart", {email});
    }
    data.message = res.data.message;
    data.success = true;
  } catch (err) {
    data.message = err.response.data.error;
  }
  return data;
};
