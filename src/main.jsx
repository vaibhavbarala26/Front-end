import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Queuw_page from './Pages/Queue.jsx';
import Table_page from './Pages/Table.jsx';
import History_page from './Pages/History.jsx';
import TablePage from './Pages/Table.jsx';
import QueuePage from './Pages/Queue.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <QueuePage></QueuePage>
    ),
  },
  {
    path: "/history",
    element: (
      <History_page></History_page>
    )
  },
  {
    path: "/table",
    element: (
      <TablePage></TablePage>
    )
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
