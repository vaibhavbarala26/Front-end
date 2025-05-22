import { useEffect, useState } from 'react'
import { Queue } from '../component/Queue'
import { Link, useLocation } from 'react-router-dom'

function QueuePage() {
  const location = useLocation()
  const [active, setActive] = useState("")

  useEffect(() => {
    const currentPath = location.pathname.split("/").pop() || ""
    setActive(currentPath)
  }, [location.pathname])

  const links = [
    { name: "Queue", link: "" },
    { name: "Table", link: "table" },
    { name: "History", link: "history" }
  ]

  return (
    <div className=" flex flex-col items-center bg-gradient-to-b from-[#444343] to-[#121624] min-h-[100vh] text-white">
      <nav className="flex justify-center border-b border-white/20 pt-4 w-[20%]">
        <ul className="flex gap-8">
          {links.map((link) => (
            <li
              key={link.name}
              
            >
              <Link to={`/${link.link}`}> <button className={`text-xl px-4 py-2 transition-all duration-200 cursor-pointer 
                ${active === link.link ? "bg-gradient-to-b to-zinc-600/100 from-slate-200/0 border-b-2 border-white" : "hover:bg-white/10"}
              `} >{link.name}
              </button></Link>
            </li>
          ))}
        </ul>
      </nav>

      <main className="p-6 flex flex-col items-center gap-10 w-[50%]">
        <Queue />
      </main>
    </div>
  )
}

export default QueuePage
