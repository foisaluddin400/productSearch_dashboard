

const Login = () => {
  
  // const onFinish = async (values) => {
  //   setLoading(true);
  //   try {
  //     console.log("Form Values:", values);
  //     const payload = await loginAdmin(values).unwrap();
  //     console.log("API Response:", payload);
  //     if (payload?.success) {
  //       // localStorage.setItem("accessToken", payload?.data?.accessToken);
  //       dispatch(setToken(payload?.data?.accessToken))
  //       message.success("Login successful!");
  //       navigate("/");
  //     } else {
  //       message.error(payload?.message || "Login failed!");
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     message.error(error?.data?.message || "Something went wrong. Try again!");
  //   } finally {
  //     setLoading(false);
  //     console.log("Login attempt finished.");
  //   }
  // };

  
  return (
    <div className="flex items-center justify-center min-h-screen ">
      login
    </div>
  );
};

export default Login;
