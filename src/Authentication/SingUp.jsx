import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContex } from "../Providers/AuthContex";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useLoaderData, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { UploadImg } from "../Utils/UploadImg";
import { useMutation } from "@tanstack/react-query";
import useAxiosSicures from "../Hooks/useAxiosSicure";
import Loading from "../Extra/Loading";

const SingUp = () => {
  const { register, handleSubmit } = useForm();
  const [eye, setEye] = useState(true);
  const location = useLoaderData;
  const navigate = useNavigate();
  const {
    creatUserWithEmail,
    user,
    setUser,
    singInWithGoogle,
    updataUserProfile,
    loader,
  } = use(AuthContex);
  console.log(user)

  //emplement post method widd tanstacqury
  const axiosSicure = useAxiosSicures();

  const { isPaused, isError, mutateAsync } = useMutation({
    mutationFn: async (data) => await axiosSicure.post(`/user`, data),
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
  // singWith emailandpasswor
  const handelFomSubmit = async (data) => {
    console.log("data", data);
    try {
      const email = data.email;
      const photo = data.photo[0];
      const password = data.password;
      const res = await creatUserWithEmail(email, password);
      const uploadImbb = await UploadImg(photo);


        const update = {
        displayName: data.name,
         photoURL: uploadImbb,
      };
      await updataUserProfile(update);
  
      const creatUserRol = {
        Name: data.name,
        Email: email,
        photoURL: uploadImbb,
        Role: data.role,
        status: "pending",
      };
      await mutateAsync(creatUserRol);
      setUser(res.user);
      console.log('user',res.user)
    } catch (err) {
      toast("Registration Error:", err.message);
    }
  };
  ///singUp with google///
  const handelGoogeSing = () => {
    try {
      singInWithGoogle().then((res) => {
        //database creat usear
        const creatUser = {
          Name: res.user.displayName,
          Email: res.user.email,
          PhotoURL: res.user.photoURL,
          Role: "buyer",
          status: "pending",
        };
        mutateAsync(creatUser);
        setUser(res.user);
         navigate(location.state || "/");
        toast("successful google");
      });
    } catch (err) {
      toast("SingUp  Error:", err.message);
    }
  };

  const handelEye = () => {
    setEye(!eye);
  };
  console.log(user);
  if (loader) {
    return <p>loading...</p>;
  }
  return (
    <div className=" flex justify-center items-center h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body ">
          <h2 className="text-center">
            Already yoy have account?
            <Link to="/Login">
              <span className="text-blue-400 ml-2">now LogIn</span>
            </Link>
          </h2>
          <form onSubmit={handleSubmit(handelFomSubmit)}>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                {...register("name")}
                className="input"
                placeholder="name"
              />
              <label className="label">Select your role</label>
              <select
                className="select"
                defaultValue="buyer"
                {...register("role")}
              >
                <option value="" disabled>
                  select a role
                </option>

                <option>buyer</option>
                <option>manager</option>
            
              </select>
              <label className="label">photo</label>

              <input
                type="file"
                {...register("photo")}
                className="file-input"
              />

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
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    //   pattern: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
                  })}
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
              <button className="btn btn-neutral mt-4">singUp</button>
              {/* Google */}
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
  );
};

export default SingUp;
