import { Formbody } from "../components/formbody";


function Login(){
    return(
        <main>
        <div class="logo">
            <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTOIsLtdQPu_wKkuK2cptqnjlgvV1kKeWLF7Ki6HKvqTpZVglh-" alt="" />
        </div>
        <h1>Welcome Back!</h1>
        <form action="/submit" method="post">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required/>
            
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required/>
            
            <input type="submit" value="Login" class="login"/>
        </form>
        <p>Don't have an account? <a href="/register">Register</a></p>
        <p>Forgot your password? <a href="/forgot-password">Reset</a></p>
    </main>
    );
};

export default Login;