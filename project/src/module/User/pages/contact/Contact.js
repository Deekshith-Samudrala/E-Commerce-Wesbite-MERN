import React from 'react'

const Contact = () => {
  return (
    <>
        <div className='Toppagename container-fluid'>
            <h4 className="mb-5">Contact</h4>
        </div>
        <div className="container my-5 pt-5 pb-4">
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 text-center">
                    <div className="contact__widget">
                        <span className="icon_phone"></span>
                        <h4>Phone</h4>
                        <p>+91-9003275594</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 text-center">
                    <div className="contact__widget">
                        <span className="icon_pin_alt"></span>
                        <h4>Address</h4>
                        <p>123 Main Street,Cityville, Stateville,</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 text-center">
                    <div className="contact__widget">
                        <span className="icon_mail_alt"></span>
                        <h4>Email</h4>
                        <p>ditusamudrala@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    <div className="map mb-5">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d204889.32003455452!2d78.38712942511057!3d17.405909986373892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1688350995785!5m2!1sen!2sin" height="500" aria-hidden="false" style={{border : 0}} allowFullScreen tabIndex="0"></iframe>
      <div className="map-inside">
        <i className="icon_pin"></i>
        <div className="inside-widget">
          <h4>123 Main Street</h4>
          <ul>
            <li>Phone: +91-9003275594</li>
            <li>Cityville, Stateville,</li>
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}

export default Contact