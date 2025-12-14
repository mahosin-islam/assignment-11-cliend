import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import useAxiosSicures from "../../../Hooks/useAxiosSicure";
import Loading from "../../../Extra/Loading";
import { IoMdArrowRoundBack } from "react-icons/io";

const Orderdtails = () => {

  const { id } = useParams();
  const  navigate =useNavigate();
  const axiosSicure = useAxiosSicures();
  const { isPending, data: orderDtail = [] } = useQuery({
    queryKey: ["orderDtail"],
    queryFn: async () => {
      const res = await axiosSicure.get(`/order-dtail/${id}`);
      return res.data;
    },
  });
  if(isPending){
    return <Loading></Loading>
  }
 const {
ProductName,
DeliveryAddress,
PaymentType,
FirstName,
LastName,
OrderEmail,
Price,
OrderQuantite,
trackingId,
createdAt,
status,
photo,
cratorEmail,


 }=orderDtail;




  
  return (
    <div className="min-h-screen  p-6 flex justify-center">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <button onClick={()=> navigate(-1)}
            className="text-2xl text-green-400"
            ><IoMdArrowRoundBack /></button>
          <h1 className="text-2xl font-bold text-gray-800">Order Details  {orderDtail.length}</h1>
          <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {status}
          </span>
        </div>

        {/* Order Info */}
        <div className="space-y-2">
          
          <p className="text-gray-700">
            <strong>trackingId ID:</strong> {trackingId}
          </p>
          <p className="text-gray-700">
            <strong>Order Date:</strong> {new Date(createdAt).toLocaleString()}
          </p>
        </div>
        {/* Crator-email */}
          <div  className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Manager Information
          </h2>
          <p>
            <strong>ManagerEmail:</strong> {cratorEmail}
          </p>
          </div>
        {/* Customer Info */}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Customer Information
          </h2>
          <p>
            <strong>Name:</strong> {FirstName + LastName}
          </p>
          <p>
            <strong>Email:</strong> {OrderEmail}
          </p>
    
         
          <p>
            <strong>Address:</strong> {DeliveryAddress}
          </p>
        </div>

        {/* Product List */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Products</h2>

         
            <div
              
              className="flex items-center justify-between mb-4 border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={photo}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">{ProductName}</p>
                  <p className="text-gray-600 text-sm">Quantity:{OrderQuantite} </p>
                </div>
              </div>

              <p className="text-gray-700 font-semibold">৳ {Price}</p>
            </div>
        
        </div>

        {/* Payment Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Payment Details
          </h2>
          <p>
            <strong>Payment Status:</strong> {PaymentType}
          </p>
        </div>

        {/* Total */}
        <div className="flex justify-end text-xl font-bold text-gray-800 border-t pt-4">
          Total: ৳{Price}
        </div>
      </div>
    </div>
  );
};

export default Orderdtails;
