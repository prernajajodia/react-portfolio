import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Contact = ({ data }) => {
   const [name, setName] = useState('');
   const [subject, setSubject] = useState('');
   const [email, setEmail] = useState('');
   const [message, setMessage] = useState('');
   const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
   if (reason === 'clickaway') {
     return;
   }

   setOpen(false);
 };

function snack() {
return (
   <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
   <Alert onClose={handleClose} severity="success">
     Your message was sent successfully! Thank you!
   </Alert>
 </Snackbar>
)
}

function Alert(props) {
   return <MuiAlert elevation={6} variant="filled" {...props} />;
 }

    const handleClick = (e) => {
       e.preventDefault();
      // window.open(`mailto:${email}?subject=${subject}&body=${name}: ${message}`);

      emailjs.sendForm('service_65rgilf', 'template_1jt0dmg', e.target, 'user_VRsslVleFz5oO5jsnlWPH')
      .then((result) => {
         if (result.status === 200)
         setOpen(true);
         // window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
      }, (error) => {
         console.log('Form submit result with error');
          console.log(error);
      });
    }
    

    return (
      <section id="contact">

         <div className="row section-head">

            <div className="two columns header-col">

               <h1><span>Get In Touch.</span></h1>

            </div>

            <div className="ten columns">

                  <p className="lead">{data?.message}</p>

            </div>

         </div>

         <div className="row">
            <div className="eight columns">

               <form id="contactForm" name="contactForm" onSubmit={handleClick}>
					<fieldset>

                  <div>
						   <label htmlFor="contactName">Name <span className="required">*</span></label>
						   <input value={name} type="text" size="35" id="contactName" name="from_name" onChange={e => setName(e.target.value)}/>
                  </div>

                  <div>
						   <label htmlFor="contactEmail">Email <span className="required">*</span></label>
						   <input value={email} type="text" size="35" id="contactEmail" name="user_email" onChange={e=> setEmail(e.target.value)}/>
                  </div>

                  <div>
						   <label htmlFor="contactSubject">Subject</label>
						   <input value={subject} type="text" size="35" id="contactSubject" name="message_subject" onChange={e => setSubject(e.target.value)}/>
                  </div>

                  <div>
                     <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                     <textarea value={message} onChange={e => setMessage(e.target.value)} cols="50" rows="15" id="message" name="message"></textarea>
                  </div>

                  <div>
                     <button type='submit' className="submit">Submit</button>
                     <span id="image-loader">
                        <img alt="" src="images/loader.gif" />
                     </span>
                  </div>
					</fieldset>
				   </form>

           <div id="message-warning"> Error boy</div>
				   <div id="message-success">
                  <i className="fa fa-check"></i>Your message was sent, thank you!<br />
				   </div>
           </div>


            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">

					   <h4>Contact</h4>
					   <p className="address">
						   {data?.name}<br />
						   <span>{data?.phone}</span>
					   </p>
				   </div>

               <div className="widget widget_tweets">

		         </div>
            </aside>
      </div>
      {snack()}
   </section>
    );
}

export default Contact;