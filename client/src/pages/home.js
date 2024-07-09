import "../styles/home.css";
import { Link } from "react-router-dom";
function Home(){
    return(
        <div>    
    <section id="hero">
    <div class="hero-content">
        <h1>Organize Your Ideas with Ease!</h1>
        <p>A simple and effective way to manage your notes.</p>
        <Link to="/signup" class="cta-button">Get Started</Link>
    </div>
    </section>
    </div>
    );
}
   

export default Home;