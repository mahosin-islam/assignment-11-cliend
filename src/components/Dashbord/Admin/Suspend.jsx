import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import useAxiosSicures from "../../../Hooks/useAxiosSicure";
import { toast } from "react-toastify";

const Suspend = () => {
  const { register, reset, handleSubmit } = useForm();
  const axiosSicure = useAxiosSicures();
  const navigate = useNavigate();
  const { state } = useLocation();
  const suspen = state?.suspend;
  const handelSuspen = async (data) => {
    const suspendInfo = {
      Title: data.title,
      Reson: data.reason,
      SupenarEmai: suspen.Email,
      Time: new Date(),
    };
    console.log('sespen', suspendInfo)

    const res = await axiosSicure.post(`/suspen/${suspen._id}`, suspendInfo);

    if (res.data.acknowledged == true) {
      toast("successful suspend");
      reset();
      navigate("/dashboard/manage-users");
    }
  };

  return (
    <div>
      <h2 className="my-10 text-center text-xl font-semibold">Suspend User</h2>
      <div className="flex justify-center items-center ">
        <div className="w-1/3 border-2 border-gray-200">
          <form onSubmit={handleSubmit(handelSuspen)}>
            <fieldset className="fieldset">
              <label className="label">Tytel of suspend</label>
              <input
                type="text"
                {...register("title")}
                className="input w-full"
                placeholder="Tytel "
              />
              <label className="label">suspend reason</label>
              <input
                type="text"
                {...register("reason")}
                className="input w-full"
                placeholder="reason"
              />
              <button className="bg-blue-600 hover:bg-blue-700 transition-all flex items-center justify-center text-sm font-medium text-white shadow-md cursor-pointer select-none py-2">
                suspend
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Suspend;
