import React from 'react'
const Navbar = () => {
  return (
    <>
      <nav className="bg-black text-white">
  <div className="mycontainer flex items-center justify-between px-4 h-14 py-5">
    <div className="logo font-bold text-2xl whitespace-nowrap">
      <span className='text-gray-500'>&lt;</span>
      Pass
      <span className='text-gray-500'>Vault/&gt;</span>
    </div>
    
    <div className="ml-auto">
      <button className='text-white bg-gray-700 my-5 rounded-md flex gap-4 ring-white ring-2'>
      <lord-icon
    src="https://cdn.lordicon.com/jjxzcivr.json"
    trigger="hover"
    colors="primary:#ffffff,secondary:#e4e4e4"
    >
</lord-icon>
</button>
    </div>

  </div>
  <div className="h-1 bg-gray-950"></div>
</nav>

    </>
  )
}

export default Navbar
