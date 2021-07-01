import "./App.css";
import LoginScreen from "./screens/LoginScreen";
import { useAuth0 } from "@auth0/auth0-react";
import ChatScreen from "./screens/ChatScreen";
import Loading from "./components/loading";

import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCg19TajXn2GohqxYRtU9RVWdtSNIaf2h8",
  authDomain: "react-chatapp-c1894.firebaseapp.com",
  projectId: "react-chatapp-c1894",
  storageBucket: "react-chatapp-c1894.appspot.com",
  messagingSenderId: "787618413976",
  appId: "1:787618413976:web:972ddead10e2c34644ffed",
});

const db = firebase.firestore();

function App() {
  const { isAuthenticated } = useAuth0();
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="App">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      {isAuthenticated ? (
        <div className="App-header">
          <ChatScreen db={db} />
        </div>
      ) : (
        <div className="App-header">
          <LoginScreen />
        </div>
      )}
    </div>
  );
}

export default App;
