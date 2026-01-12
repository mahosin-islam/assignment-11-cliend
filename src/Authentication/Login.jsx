import React, { use, useRef, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContex } from "../Providers/AuthContex";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import useAxiosSicures from "../Hooks/useAxiosSicure";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const { setUser, userSingIn, singInWithGoogle } = use(AuthContex);
  const riderModelRef = useRef();
  const { register, handleSubmit, setValue } = useForm();
  const [eye, setEye] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const axiosSicure = useAxiosSicures();

  /* ------------------ Auto Login Modal ------------------ */
  const handelAutoLogin = () => {
    riderModelRef.current.showModal();
  };
           //creadential with Admin
  const handelWithAdmin = () => {
    setValue("email", "mahosina@gamil.com");
    setValue("password", "1234aZ");
    riderModelRef.current.close();
  };
           //creadential with Manager
  const handelWithManager = () => {
    setValue("email", "mahosinm@gmail.com");
    setValue("password", "1234aZ");
    riderModelRef.current.close();
  };
           //creadential with Buyer
  const handelWithBuyer = () => {
    setValue("email", "mahosinb@gmail.com");
    setValue("password", "1234aZ");
    riderModelRef.current.close();
  };
 
  /* ------------------ Login ------------------ */
  const handelLogin = async (data) => {
    try {
      const res = await userSingIn(data.email, data.password);
      setUser(res.user);
      toast.success("Login successful");
      navigate(location.state || "/");
    } catch (err) {
      toast.error("Wrong email or password",err);
    }
  };

  /* ------------------ Google Login ------------------ */
  const { mutateAsync } = useMutation({
    mutationFn: async (data) => await axiosSicure.post(`/user`, data),
  });

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
        toast.success("Google login successful");
        navigate(location.state || "/");
      })
      .catch(() => toast.error("Google login failed"));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">
          <h2 className="text-center">
            Have you any account?
            <Link to="/SingUp">
              <span className="text-blue-400 ml-2">Now SignUp</span>
            </Link>
            <br />
         <button
  onClick={handelAutoLogin}
  className="mt-2 inline-flex items-center gap-2 rounded-full 
  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
  px-5 py-2 text-sm font-semibold text-white
  shadow-md 
 "
>
  🚀Are you use Use Demo Credential
</button>

          </h2>

          <form onSubmit={handleSubmit(handelLogin)}>
            <fieldset className="fieldset space-y-3">
              <label>Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />

              <label>Password</label>
              <div className="relative">
                <input
                  type={eye ? "password" : "text"}
                  {...register("password", { required: true })}
                  className="input w-full"
                  placeholder="Password"
                />
                <span
                  onClick={() => setEye(!eye)}
                  className="absolute top-3 right-4 cursor-pointer"
                >
                  {eye ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </span>
              </div>

              <button
                type="submit"
                className="bg-linear-to-r from-[#632ee3] to-[#9f62f2] p-2 font-semibold rounded text-white"
              >
                Login
              </button>

              <button
                type="button"
                onClick={handelGoogeSing}
                className="btn bg-white text-black border"
              >
                <FcGoogle />
                Login with Google
              </button>
            </fieldset>
          </form>
        </div>
      </div>

      {/* -------- Modal -------- */}
      <dialog
        ref={riderModelRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold mb-3">Login as</h3>

          <div className="flex gap-4">
            <button className="btn" onClick={handelWithAdmin}>
              Admin
            </button>
            <button className="btn" onClick={handelWithManager}>
              manager
            </button>
            <button className="btn" onClick={handelWithBuyer}>
              buyer
            </button>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Login;
