import "../styles/form.css";
import { useState } from "react";
import Formbody from "../components/formbody";
import { Link,useNavigate } from "react-router-dom";

function Signup() {
    const navigate=useNavigate();
    const [formData, SetformData]=useState({
        username:"",
        email:"",
        password:""
    });

    const [validateEmail, setvalidateEmail]=useState(true);
    const [validatePassword,setvalidatePassword]=useState("");

    
    function handleChange(e) {
        SetformData({
            ...formData,
            [e.target.name]:e.target.value
        })
        if (e.target.name=="email") {
          setvalidateEmail(true);         
        }
        if(e.target.name=="password"){
          const checkPassword=e.target.value;
          setvalidatePassword("");
          if(checkPassword.length<8){
            setvalidatePassword("Password length must be at least 8 characters long!");
          }
          if(!/[A-Z]/.test(checkPassword)){
            setvalidatePassword("Password must contain at least one uppercase character");
          }
          if(!/[a-z]/.test(checkPassword)){
            setvalidatePassword("Password must contain at least one lowercase character");
          }
          if(!/[0-9]/.test(checkPassword)){
            setvalidatePassword("Password must contain at least one number");
          }
          if(!/[^A-Za-z0-9]/.test(checkPassword)){
            setvalidatePassword("Password must contain at least one special character");
          }

        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        navigate("/dashboard");
        if(validatePassword===''){
        try {
          const response= await fetch("http://localhost:3001/api/signup",{
            method:"POST",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify(formData)
          });
            const result= await response.json();
            console.log(result);
            if (result.code==23505) {
              setvalidateEmail(false);
            }
            if (result.ok) {
              // history.push("/dashboard");
            }
        } catch (error) {
            console.error("What Error",error);         
        }}
        };
 
    const items=[["Username","text"], ["Email","email"], ["Password","password"]];
            return(
                
                <div class="form-container">
                 <h2>Sign Up</h2>

                    <form class="form" onSubmit={handleSubmit}>
                      
                        {items.map((item,index)=>{
                            var member=(item[0].toLowerCase());                            
                            return(
                              <div>
                            <Formbody key={index} field={item[0]} name={member} type={item[1]} value={formData[member]} handleChange={handleChange} />
                             {index==1 && !validateEmail && <p className="warning">Email already taken</p>}
                             {index==2 && <p className="warning">{validatePassword}</p>}
                             </div>
                            );
                        })}
                        <button type="submit">Signup</button>
                     </form>
                     <p>Already have an account? <Link to="/login">Log In</Link></p>
                </div>
            );
}

export default Signup;