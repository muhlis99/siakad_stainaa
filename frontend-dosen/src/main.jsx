import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/vendors/mdi/css/materialdesignicons.min.css'
import './assets/css/demo_2/style.css'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
