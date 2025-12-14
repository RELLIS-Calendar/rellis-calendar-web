import "./Footer.css";
import Github from '../../assets/github.png'


function Footer() {
  return ( 
  <div className="Footer">
    <div className="sb__footer section__padding">

    <hr></hr>
    <div className="sb__footer-below">


      <div className="socialmedia">      
          <a href="https://github.com/RELLIS-Calendar" target="_blank" rel="noopener noreferrer"><img src={Github} alt="github"/></a>
        </div>

      <div className="sb__footer-below-links">
         
        
        
      </div>
    </div>
  </div>
</div>
  
  );
}

export default Footer;