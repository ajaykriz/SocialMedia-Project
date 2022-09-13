// import {useState} from 'react';
// import axios from 'axios';
// export default function App() {
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState(null);

//   async function  isValidEmail(email) {
//      return await axios.post("/api/auth/checkmail",{
//         email})
//   }
//   const handleChange = event => {
//     console.log(isValidEmail);
//     if (isValidEmail(event.target.value)) {
//       setError('Email is invalid');
//     } else {
//       setError(null);
//     }

//     setMessage(event.target.value);
//   };
//   return (
//     <div>
//       <input
//         id="message"
//         name="message"
//         value={message}
//         onChange={handleChange}
//       />
//       {error && <h2 style={{color: 'red'}}>{error}</h2>}
//     </div>
//   );
// }