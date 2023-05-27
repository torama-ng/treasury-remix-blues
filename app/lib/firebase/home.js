// // To sign out a user, the signOut method is called from Firebase. 
// // After signing in to the Home route, there will be a button to sign out 
// // whenever the Logout button is clicked.The button should have an onClick 
// // event that calls the signOut method from Firebase auth.
// // A success message will be displayed on the console if the sign out is
// // successful.

// // Here is the complete code to sign out a user:


// import React from "react";
// import { signOut } from "firebase/auth";
// import { auth } from "./firebase";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         // Sign-out successful.
//         navigate("/");
//         console.log("Signed out successfully");
//       })
//       .catch((error) => {
//         // An error happened.
//       });
//   };

//   return (
//     <>
//       <nav>
//         <p>Welcome Home</p>

//         <div>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Home;
