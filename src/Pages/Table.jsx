// Import required hooks and components
import { useEffect, useState } from 'react'
import { Table } from '../component/Table'
import { Link, useLocation } from 'react-router-dom'

function TablePage() {
  // Get the current location object from React Router
  const location = useLocation()

  // Track which tab is currently active
  const [active, setActive] = useState("")

  // Update the active tab based on the current URL path
  useEffect(() => {
    const currentPath = location.pathname.split("/").pop() || ""
    setActive(currentPath)
  }, [location.pathname])

  // Define navigation tabs with names and corresponding route paths
  const links = [
    { name: "Queue", link: "" },
    { name: "Table", link: "table" },
    { name: "History", link: "history" }
  ]

  return (
    <div className="bg-gradient-to-b from-[#444343] to-[#121624] flex flex-col items-center min-h-[100vh] text-white">
      
      {/* Navigation bar with tab links */}
      <nav className="flex justify-center border-b border-white/20 pt-4 w-[20%]">
        <ul className="flex gap-8">
          {links.map((link) => (
            <li key={link.name}>
              {/* Use Link for client-side routing */}
              <Link to={`/${link.link}`}>
                <button
                  className={`text-xl px-4 py-2 transition-all duration-200 cursor-pointer 
                    ${active === link.link 
                      ? "bg-gradient-to-b to-zinc-600/100 from-slate-200/0 border-b-2 border-white" // Active tab styling
                      : "hover:bg-white/10" // Inactive tab hover effect
                    }`}
                >
                  {link.name}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main content area where the Table component is rendered */}
      <main className="p-6 flex flex-col items-center gap-10 mb:w-[50%]">
        <Table />
      </main>
    </div>
  )
}

export default TablePage
