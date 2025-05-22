import { useEffect, useState } from 'react'
import { History } from '../component/History'
import { Link, useLocation } from 'react-router-dom'

function History_page() {
  // Get the current URL path using react-router
  const location = useLocation()

  // State to track which tab is currently active
  const [active, setActive] = useState("")

  // Update the active tab whenever the path changes
  useEffect(() => {
    // Get the last segment of the path (e.g., 'history' from '/history')
    const currentPath = location.pathname.split("/").pop() || ""
    setActive(currentPath)
  }, [location.pathname]) // Re-run when the URL path changes

  // Navigation links with corresponding route paths
  const links = [
    { name: "Queue", link: "" },       // maps to '/'
    { name: "Table", link: "table" },  // maps to '/table'
    { name: "History", link: "history" } // maps to '/history'
  ]

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#444343] to-[#121624] min-h-[100vh] text-white">
      {/* Navigation Bar */}
      <nav className="flex justify-center border-b border-white/20 pt-4 w-[20%]">
        <ul className="flex gap-8">
          {links.map((link) => (
            <li key={link.name}>
              <Link to={`/${link.link}`}>
                {/* Highlight button if it's the active tab */}
                <button className={`text-xl px-4 py-2 transition-all duration-200 cursor-pointer 
                  ${active === link.link
                    ? "bg-gradient-to-b to-zinc-600/100 from-slate-200/0 border-b-2 border-white"
                    : "hover:bg-white/10"
                  }`}>
                  {link.name}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="p-6 flex flex-col items-center gap-10 w-[50%]">
        {/* Conditionally render History component based on active tab */}
        {active === "history" && <History />}
         {active === "history" && <History />}
      </main>
    </div>
  )
}

export default History_page
