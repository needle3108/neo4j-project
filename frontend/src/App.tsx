import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import Users from "./pages/Users";
import Books from "./pages/Books";
import RentBook from "./pages/RentBook";
import UserHistory from "./pages/UserHistory";
import ReturnBook from "./pages/ReturnBook";

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/users" element={<Users />}/>
          <Route path="/books" element={<Books />}/>
          <Route path="/rentBook" element={<RentBook />}/>
          <Route path="/userHistory" element={<UserHistory />}/>
          <Route path="/returnBook" element={<ReturnBook />}/>
      </Routes>
    </BrowserRouter>
  )
}