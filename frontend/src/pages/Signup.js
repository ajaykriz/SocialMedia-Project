import React, { useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  styled,
  Modal,
  Divider,
  Button,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import OTPInput, { ResendOTP } from "otp-input-react";
import OtpTimer from "otp-timer";
import { useState } from "react";
const validate = (values) => {
  const errors = {};
  if (!values.username) {
    console.log("not value");
    errors.name = "Required";
  } else if (values.username.length > 15) {
    console.log("not length");
    errors.name = "Must be 15 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.phone) {
    errors.phone = "Required";
  } else if (values.phone.length < 10) {
    errors.phone = "Invalid phonenumber";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "password must be 8 character long ";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword.length < 8) {
    errors.confirmPassword = "password must be 8 character long ";
  } else if (values.Password !== values.confirmpassword) {
    errors.confirmPassword = "your passsword doesn't match";
  }
  return errors;
};
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
function Signup() {
  const [open, setOpen] = useState(false);
  const [OTP, setOTP] = useState("");
  const [userData, setUserData] = useState({});

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: async (values) => {
      setUserData(values);
      const checkUser = await axios.post("/api/auth/checkUser", {
        email: values.email,
        name: values.name,
      });
      if (checkUser.data == "Email is already taken") {
        toast.error("Email is already taken");
      }
      if (checkUser.data == "username is already taken") {
        toast.error("username is already taken");
      }
      const otpData = await axios.post("/api/auth/otpValidation", {
        phone: values.phone,
      });
      if (otpData.data == "success") {
        setOpen(true);
        // dispatch(register(userData));
      }
    },
  });
  const validateOtp = async (e) => {
    e.preventDefault();
    console.log(userData);
    console.log(OTP.length);
    if (OTP.length === 4) {
      console.log(userData);
      // console.log(userData.phone);
      const inOtpData = await axios.post("/api/auth/otpConfirmation", {
        phone: userData.phone,
        otp: OTP,
      });
      console.log(inOtpData);
      if (inOtpData.data == "otpConfirmed") {
        dispatch(register(userData));
      } else {
        console.log("otp not confirmed");
      }
    } else {
      console.log("Not 4 digit");
    }
  };
  const handleResend = async () => {
    console.log("resend otp");
  };
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          margin="auto"
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography variant="h3" padding={1} textAlign="center">
            SIGNUP
          </Typography>
          <TextField
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            margin="normal"
            type={"text"}
            variant="outlined"
            placeholder="Name"
            sx={{
              width: { sm: 200, md: 300 },
              "& .MuiInputBase-root": {
                height: 50,
              },
            }}
          />
          {formik.errors.name ? (
            <Typography variant="body1">{formik.errors.username}</Typography>
          ) : null}
          <TextField
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            margin="normal"
            type={"email"}
            variant="outlined"
            placeholder="Email"
            sx={{
              width: { sm: 200, md: 300 },
              "& .MuiInputBase-root": {
                height: 50,
              },
            }}
          />
          {formik.errors.email ? (
            <Typography variant="body1">{formik.errors.email}</Typography>
          ) : null}
          <TextField
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            margin="normal"
            type={"phone"}
            variant="outlined"
            placeholder="Phonenumber"
            sx={{
              width: { sm: 200, md: 300 },
              "& .MuiInputBase-root": {
                height: 50,
              },
            }}
          />
          {formik.errors.phone ? (
            <Typography variant="body1">{formik.errors.phone}</Typography>
          ) : null}
          <TextField
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            margin="normal"
            type={"password"}
            variant="outlined"
            placeholder="Password"
            sx={{
              width: { sm: 200, md: 300 },
              "& .MuiInputBase-root": {
                height: 50,
              },
            }}
          />
          {formik.errors.password ? (
            <Typography variant="body1">{formik.errors.password}</Typography>
          ) : null}
          <TextField
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            margin="normal"
            type={"password"}
            variant="outlined"
            placeholder=" Confirm Password"
            sx={{
              width: { sm: 200, md: 300 },
              "& .MuiInputBase-root": {
                height: 55,
              },
            }}
          />
          {formik.errors.confirmPassword ? (
            <Typography variant="body1">
              {formik.errors.confirmPassword}
            </Typography>
          ) : null}

          <Button
            endIcon={<HowToRegIcon />}
            type="submit"
            sx={{ marginTop: 1, borderRadius: 1 }}
            variant="contained"
          >
            Signup
          </Button>
          <Button sx={{ marginTop: 1, borderRadius: 1 }}>
            <Link to="/"> Login </Link>
          </Button>
        </Box>
      </form>
      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          p={3}
          textAlign="center"
          bgcolor={"background.default"}
          color={"text.primary"}
          borderRadius={3}
          sx={{
            width: { sm: 300, md: 400 },
          }}
        >
          <Typography variant="h6">Enter 4 digit otp here</Typography>
          <Divider
            textAlign="center"
            sx={{
              width: "100%",

              bgcolor: "background.paper",
              mt: { xs: 1, md: 2 },
              mb: 2,
              color: "gray",
            }}
          ></Divider>
          <Box sx={{ marginLeft: { sm: "50px", md: "100px" } }}>
            <OTPInput
              value={OTP}
              inputStyles={{
                width: "2rem",
                height: "2rem",
                margin: "20px 0.25rem",
                fontSize: "2rem",
                borderRadius: 4,
                border: "1px solid #051b34",
              }}
              onChange={setOTP}
              autoFocus
              OTPLength={4}
              otpType="number"
              disabled={false}
            />

            {/* <div className="flex justify-between"> */}
          </Box>
          <OtpTimer
            seconds={0}
            minutes={10}
            ButtonText="Resend OTP"
            buttonColor={"black"}
            background={"none"}
            resend={handleResend}
          />
          <Divider
            textAlign="center"
            sx={{
              width: "100%",
              // width: { sm: 200, md: 300 },
              bgcolor: "background.paper",
              mt: { xs: 1, md: 2 },
              mb: 2,
              color: "gray",
            }}
          ></Divider>

          <Button
            type="submit"
            onClick={(e) => {
              validateOtp(e);
            }}
            sx={{
              mt: 2,
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "#fff",
                color: "#3c52b2",
              },
              color: "#fff",
              bgcolor: "#1876d2",
            }}
            variant="outlined"
          >
            validate
          </Button>
        </Box>
      </StyledModal>
    </div>
  );
}

export default Signup;
