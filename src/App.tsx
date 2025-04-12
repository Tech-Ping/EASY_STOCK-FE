import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login_page';
import Signup from './pages/signup_page';
import NotificationPage from './pages/notif_page';
import Home from './pages/home';
import Stock_inv from './pages/invest_page';
import UserField from './components/user_field';
import MyPage from './pages/mypage';
import Report from './pages/personal_report';
import Stock_details from './pages/stock_details';
import Quiz from './pages/quiz/quiz';
import Quiz_Correct from './pages/quiz/quiz_result';

import ChatbotButton from './components/chatbotButton';
import Chat_Landing from './pages/chat/Chat_Landing';
import ChatScreen from './pages/chat/Chat_Screen';
import { ChatProvider } from './pages/chat/Chat_Context';

const App: React.FC = () => {
  return (
    <ChatProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/invest" element={<Stock_inv />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/report" element={<Report />} />
        <Route path="/stocks/:stockId" element={<Stock_details />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path ="quiz/result" element={<Quiz_Correct />} />
        <Route path="/stocki" element={<Chat_Landing />} />
        <Route
          path="/stocki/chat"
          element={
            
              <ChatScreen />
          }
        />
      </Routes>
      <ChatbotButton/>
    </Router>
    </ChatProvider>
  );
};
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
export default App;
