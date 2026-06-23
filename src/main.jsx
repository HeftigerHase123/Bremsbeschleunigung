import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router'
import App from "./App.jsx"
import HomeRoute from "./routes/HomeRoute.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [{
            index: true,
            element: <HomeRoute/>
        }]

    }
])

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)