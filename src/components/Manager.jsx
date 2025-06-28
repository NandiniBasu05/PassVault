import React, { useRef, useState, useEffect } from "react";
import showIcon from "../assets/show.png";
import dontshowIcon from "../assets/dont-show.png";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

  const ref = useRef();
  const passwordRef = useRef();

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
     let req = await fetch("http://localhost:3000/")
      
   let passwords = await req.json();
    console.log(passwords);
    setPasswordArray(passwords)
  }

  useEffect(() => {
  getPasswords();
  }, []);

  const showPassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
      ref.current.src = dontshowIcon;
    } else {
      passwordRef.current.type = "password";
      ref.current.src = showIcon;
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
        await fetch("http://localhost:3000/", {
        method:"DELETE", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify({id: form.id})})
      setPasswordArray([...passwordArray, {...form ,id: uuidv4()}])
       await fetch("http://localhost:3000/", {
        method:"POST", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify({...form, id: uuidv4()})})
      setform({ site: "", username: "", password: "" });
      toast("Password saved!", { position: "top-right", autoClose: 3000, theme: "dark" });
    } else {
      toast("Error: Please fill out all fields properly.", { position: "top-right", autoClose: 3000, theme: "dark" });
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard!", { position: "top-right", autoClose: 3000, theme: "dark" });
  };

  const deletePassword = async (id) => {
    if (window.confirm("Do you really want to delete this password?")) {
      const filtered = passwordArray.filter(item => item.id !== id);
      setPasswordArray(filtered);
       let res =  await fetch("http://localhost:3000/", {
        method:"DELETE", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify({id})})
      toast("Password deleted successfully!", { 
        position: "top-right", 
        autoClose: 3000, 
        theme: "dark" });
    }
  };

  const editPassword = (id) => {
         
        console.log("Editing password with id ", id)
        setform(passwordArray.filter(i=>i.id===id)[0]) 
        setPasswordArray(passwordArray.filter(item=>item.id!==id)) 

    }

  return (
    <>
      <ToastContainer />
      <div className="fixed min-h-screen inset-0 -z-10 w-full overflow-hidden [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="px-3 sm:px-6 md:px-10 lg:px-20">
        <div className='text-white py-4 min-h-fit'>
        
<h1
  className="text-center text-3xl sm:text-4xl font-bold 
             bg-gradient-to-r from-[#6203fc] via-[#6203fc] to-[#6203fc]
             bg-clip-text text-transparent 
             transition-all duration-700 ease-in-out 
             hover:scale-110 hover:shadow-[0_0_20px_#6203fc]"
>
  PassVault
</h1>


          <p className="text-gray-400 text-center text-sm sm:text-base">Your own Password Manager</p>

          <div className="flex flex-col gap-2 sm:gap-4 items-center mt-4">
            <input
              name="site"
              value={form.site}
              onChange={handleChange}
              placeholder="Enter website URL"
              className="rounded-full border border-gray-500 w-full bg-black p-2 text-sm"
              type="text"
            />

            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter Username"
                className="rounded-full border border-gray-500 w-full bg-black p-2 text-sm"
                type="text"
              />

              <div className="relative w-full">
                <input
                  name="password"
                  ref={passwordRef}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="rounded-full border border-gray-500 w-full bg-black p-2 text-sm"
                  type="password"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" onClick={showPassword}>
                  <img ref={ref} className="p-1" width={24} height={24} src={showIcon} alt="show" />
                </span>
              </div>
            </div>

            <button
              onClick={savePassword}
              className="flex items-center rounded-full bg-gray-700 px-4 py-2 hover:bg-gray-600 border border-gray-500 text-sm"
            >
              <lord-icon src="https://cdn.lordicon.com/efxgwrkc.json" trigger="hover" colors="primary:#ffffff" class="mr-2"></lord-icon>
              Save Password
            </button>
          </div>

          <div className="passwords mt-4">
            <h2 className="font-bold text-lg sm:text-xl py-1">Your Passwords</h2>
            {passwordArray.length === 0 && <div className="text-center text-gray-400">No passwords to show</div>}
            {passwordArray.length !== 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-[320px] w-full border-collapse border border-gray-500 text-sm">
                  <thead>
                    <tr >
                      <th className="border border-gray-500 py-1 px-2">Site</th>
                      <th className="border border-gray-500 py-1 px-2">Username</th>
                      <th className="border border-gray-500 py-1 px-2">Password</th>
                      <th className="border border-gray-500 py-1 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {passwordArray.map((item) => (
                      <tr key={item.id}>
                        <td className="border border-gray-500 py-1 px-2 text-center break-all">
                          <div className="flex justify-center items-center gap-1">
                            <a href={item.site} target="_blank" rel="noreferrer">{item.site}</a>
                            <div className="cursor-pointer" onClick={() => copyText(item.site)}>
                              <lord-icon src="https://cdn.lordicon.com/xuoapdes.json" trigger="hover" colors="primary:#ffffff" style={{ width: "25px", height: "25px" }}></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="border border-gray-500 py-1 px-2 text-center break-all">
                          <div className="flex justify-center items-center gap-1">
                            <span>{item.username}</span>
                            <div className="cursor-pointer" onClick={() => copyText(item.username)}>
                              <lord-icon src="https://cdn.lordicon.com/xuoapdes.json" trigger="hover" colors="primary:#ffffff, secondary:#ffffff" style={{ width: "25px", height: "25px" }}></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="border border-gray-500 py-1 px-2 text-center break-all">
                          <div className="flex justify-center items-center gap-1">
                            <span>{"*".repeat(item.password.length)}</span>
                            <div className="cursor-pointer" onClick={() => copyText(item.password)}>
                              <lord-icon src="https://cdn.lordicon.com/xuoapdes.json" trigger="hover" colors="primary:#ffffff,secondary:#ffffff" style={{ width: "25px", height: "25px" }}></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="border border-gray-500 py-1 px-2 text-center">
                          <span className="cursor-pointer mx-2" onClick={() => editPassword(item.id)}>
                            <lord-icon src="https://cdn.lordicon.com/exymduqj.json" trigger="hover" colors="primary:#ffffff,secondary:#ffffff" style={{ width: "25px", height: "25px" }}></lord-icon>
                          </span>
                          <span className="cursor-pointer mx-2" onClick={() => deletePassword(item.id)}>
                            <lord-icon src="https://cdn.lordicon.com/jzinekkv.json" trigger="hover" colors="primary:#ffffff,secondary:#ffffff" style={{ width: "25px", height: "25px" }}></lord-icon>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
