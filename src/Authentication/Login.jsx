import React, { use, useRef, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContex } from "../Providers/AuthContex";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import useAxiosSicures from "../Hooks/useAxiosSicure";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion"; // এনিমেশনের জন্য

const Login = () => {
  const { setUser, userSingIn, singInWithGoogle } = use(AuthContex);
  const riderModelRef = useRef();
  const { register, handleSubmit, setValue } = useForm();
  const [eye, setEye] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const axiosSicure = useAxiosSicures();

  /* ------------------ Auto Login Helpers ------------------ */
  const setCredentials = (email, password) => {
    setValue("email", email);
    setValue("password", password);
    riderModelRef.current.close();
  };

  const handelLogin = async (data) => {
    try {
      const res = await userSingIn(data.email, data.password);
      setUser(res.user);
      toast.success("Login successful");
      navigate(location.state || "/");
    } catch (err) {
      toast.error("Wrong email or password");
    }
  };

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
    <div className="min-h-screen flex justify-center items-center bg-base-100 px-4 transition-colors  duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300"
      >
        <div className="card-body p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-sm text-base-content/60 mt-2">
              New here? <Link to="/SingUp" className="link link-primary font-medium">Create an account</Link>
            </p>
          </div>

          {/* Demo Credentials Button */}
          <button
            onClick={() => riderModelRef.current.showModal()}
            className="btn btn-outline btn-sm rounded-full gap-2 border-dashed mb-6 hover:bg-primary/10 hover:text-primary"
          >
            🚀 Use Demo Credentials
          </button>

          <form onSubmit={handleSubmit(handelLogin)} className="space-y-4">
            <div className="form-control">
              <label className="label text-xs font-semibold uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered focus:input-primary transition-all bg-base-200/50"
                placeholder="name@example.com"
              />
            </div>

            <div className="form-control">
              <label className="label text-xs font-semibold uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={eye ? "password" : "text"}
                  {...register("password", { required: true })}
                  className="input input-bordered w-full focus:input-primary transition-all bg-base-200/50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setEye(!eye)}
                  className="absolute top-1/2 -translate-y-1/2 right-4 text-xl text-base-content/50 hover:text-primary transition-colors"
                >
                  {eye ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-gradient-pink w-full text-white"
            >
              Sign In
            </button>

            <div className="divider text-xs text-base-content/40 uppercase">OR</div>

            <button
              type="button"
              onClick={handelGoogeSing}
              className="btn btn-outline w-full gap-3 border-base-300 hover:bg-base-200 transition-all"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>
          </form>
        </div>
      </motion.div>

      {/* -------- Demo Login Modal -------- */}
      <dialog ref={riderModelRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 border border-base-300">
          <h3 className="font-bold text-lg mb-4 text-center">Quick Login As:</h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { role: "Admin", email: "mahosina@gamil.com", color: "btn-error" },
              { role: "Manager", email: "mahosinm@gmail.com", color: "btn-info" },
              { role: "Buyer", email: "mahosinb@gmail.com", color: "btn-success" }
            ].map((item) => (
              <button 
                key={item.role}
                className={`btn btn-outline ${item.color} btn-block capitalize justify-between`}
                onClick={() => setCredentials(item.email, "1234aZ")}
              >
                {item.role} <span>{item.email}</span>
              </button>
            ))}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost">Cancel</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop bg-black/40 backdrop-blur-sm">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Login;