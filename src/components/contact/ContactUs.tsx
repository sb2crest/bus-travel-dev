import { Link } from "react-router-dom";
import Contact from './Contact'
import Form from './Form'
import Map from './Map'
import './ContactUs.scss'

const ContactUs = () => {
  return (
    <div> 
       <div className="contactus_container_banner">
          <h1>Contact Us</h1>
          <h3>From Inquiries to Adventures, We're with You</h3>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>&#10095;</li>
            <li>Contact Us</li>
          </ul>
        </div>
      <Map/>
      <Contact/>
      <Form/>
    </div>
  )
}

export default ContactUs
