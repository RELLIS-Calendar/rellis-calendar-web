import "./Event-Card.css";
import goblen from '../../../assets/goblen.jpg'
import { Link } from "react-router-dom";


function EventCard({ eventData }) { 

    return (

        <Link to={'/Calendar'} className = "EventCard">
                <img className="cardImage" src={eventData.imageUrl}></img>
                
                <div className = "cardOverlay">
                    <h2 className="cardTitle">{eventData.title}</h2>
                </div>

        </Link>

    );


}

export default EventCard