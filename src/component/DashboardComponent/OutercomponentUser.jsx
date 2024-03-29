/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import UserTab from "./UserTab";
import axiosInstance from "../../../Axios";
import SkelitonList from "./SkelitonList";
import CreateUser from "./CreateUser";
import { useSnapshot } from "valtio";
import state from "../../store";
import CreateUserValidation from "./CreateUserValidation";
import Swal from "sweetalert2";

function OutercomponentUser() {
  const snap = useSnapshot(state);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createuser, setCreateuser] = useState(false);
  const [resopnes, setResponse] = useState([]);
  const [error, setError] = useState({})
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    domain: "",
    color: "",
    limit: "",
    expiryDate: "",
    addUser: true,
    deleteUser: false,
    createChannel: false,
    deleteChannel: false,
  });

  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let error = CreateUserValidation(formData)
    setError(error)
    if(Object.keys(error).length == 0){
           
      axiosInstance
      .post(`/users/${snap.userId}/create-user/`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        state.refreshData = !snap.refreshData;
        setResponse(true);
        setCreateuser(false);
         Swal.fire("Created!", "Your Channel has been Created.", "success");
      })
      .catch((err) =>{
         if (err.response.status === 401) {
           Swal.fire(
             "Not Authorized",
             "You are not authorized to Create User.",
             "error"
           );
         }
          if (err.response.status === 409) {
            Swal.fire(
              "User Already Exist",
              "error"
            );
          }
          console.log("error :", err)});

    }
    else
    {
      console.log("Validation Error: ",error);
    }
    
  };


  useEffect(() => {
    axiosInstance
      .get(`/users/${snap.userId}`, { withCredentials: true })
      .then((res) => {
        setData(res.data);
      })
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [snap.refreshData]);

  return (
    <div className="bg-gray relative">
      <div
        className="flex justify-between items-center border-b-2 border-gray
     px-20 py-9 text-blue font-bold bg-white"
      >
        <div className="name flex items-center ">
          NAME
        
        </div>
        <div className="status flex items-center  ">
          STATUS
        
        </div>
        <div className="expiryDate flex items-center ">
          CREATED DATE
        
        </div>

        <div className="expiryDate flex items-center ">
          EXPIRY DATE
        
        </div>
        <div
          className=" cursor-pointer hover:scale-105 transform ease-in-out w-fit h-fit bg-blue px-2 py-1 rounded-lg text-white"
          onClick={() => {
            snap.userData.createChannel
              ? setCreateuser(!createuser)
              : Swal.fire(
                  "Not Authorized",
                  "You are not authorized to Create User.",
                  "error"
                );
          }}
        >
          Create User
        </div>
      </div>
      <div>
        {createuser ? (
          <CreateUser {...error}
            value={createuser}
            
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleClose={setCreateuser}
          />
        ) : null}
      </div>
      <div>
        {loading ? (
          <div>
            <SkelitonList />
            <SkelitonList />
            <SkelitonList />
            <SkelitonList />
            <SkelitonList />
            <SkelitonList />{" "}
          </div>
        ) : (
          data?.user?.map((item, index) => <UserTab  key={index} {...item} />)
        )}
      </div>
    </div>
  );
}
export default OutercomponentUser;
