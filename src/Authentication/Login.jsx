import React, { use, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContex } from "../Providers/AuthContex";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import useAxiosSicures from "../Hooks/useAxiosSicure";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const { setUser, userSingIn, singInWithGoogle} = use(AuthContex);
  const { register, handleSubmit } = useForm();
  const [eye, setEye] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

const axiosSicure = useAxiosSicures();

  const { isPaused, isError, mutateAsync } = useMutation({
    mutationFn: async (data) => await axiosSicure.post(`/product`, data),
    onSuccess: () => {
      toast("succes full you post");
      navigate(location.state || "/");
    },
    onError: (err) => {
      console.log("error", err);
    },
    onMutate: (data) => {
      console.log("i will post this data", data);
    },
    onSettled: (data, error) => {
      if (data) {
        console.log(data);
      }
      if (error) {
        console.log(error);
      }
    },
    retry: 3,
  });
  if (isPaused) {
    return <Loading></Loading>;
  }
  if (isError) {
    return toast("you post request fail");
  }
  //login
  const handelLogin = async (data) => {
       try {
      const email = data.email;
      const password = data.password;
      const res = await userSingIn(email, password);
      console.log(res.user)
      setUser(res.user);
      toast("successful login");
      navigate(location.state || "/");
    } catch (err) {
      console.log(err.message);
    }
  };
  ///singUp with google///
  const handelGoogeSing = () => {
    singInWithGoogle()
      .then((res) => {
         const creatUser = {
          Name: res.user.displayName,
          Email: res.user.email,
          PhotoURL: res.user.photoURL,
          Role: "buyer",
          status: "pending",
        };
        mutateAsync(creatUser);
        setUser(res.user);
        toast("successful singIn");
          navigate(location.state || "/");
      })
      .catch((err) => console.log(err.message));
  };

  const handelEye = () => {
    setEye(!eye);
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body ">
            <h2 className="text-center">
              Have you any account?
              <Link to="/SingUp">
                <span className="text-blue-400 ml-2">now SingUp</span>
              </Link>
            </h2>
            <form onSubmit={handleSubmit(handelLogin)}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>

                <span className="relative">
                  <input
                    type={`${eye ? "password" : "text"}`}
                    {...register("password")}
                    className="input"
                    placeholder="Password"
                  />
                  <span
                    onClick={handelEye}
                    className="text-[18px] absolute top-3 right-6"
                  >
                    {eye ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </span>
                </span>

                <button className="btn btn-neutral mt-4">LogIn</button>
                <button
                  onClick={handelGoogeSing}
                  className="btn bg-white text-black border-[#e5e5e5]"
                >
                  <FcGoogle />
                  Login with Google
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
