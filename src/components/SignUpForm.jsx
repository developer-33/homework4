import { useState} from "react";

export default function SignUpForm({setToken}) {
  //  const [token, setToken] = useState(" ")
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState(null);
  const APIURL = ('https://fsa-jwt-practice.herokuapp.com/signup')

    async function handleSubmit(event){
        event.preventDefault();
        console.log(username)
        console.log(password)
        try{
          
          const response = await fetch(APIURL, 
          { 
            method: "POST", 
            headers: { 
              "Content-Type": "application/json" 
            }, 
            body: JSON.stringify({ 
              username,
              password
            }) 
          }
          )
         
          const result = await response.json();
          console.log("Signup Result: ", result);
          setToken(result.token);
          setSuccessMessage(result.message);
          setUsername("");
          setPassword("");
             
        } catch (error) {
          setError(error.message);

        }
       
      } 
  
  return (
    <div>
      <h2>Sign Up</h2>
        {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}
