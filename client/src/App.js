// import App from './App';
import React, { useState, useEffect } from "react"
import Axios from 'axios'


function Application() {
  const [first_name, set_first_name] = useState('');
  const [last_name, set_last_name] = useState('');
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const [phone_number, set_phone_number] = useState('');
;  const submitReview = ()=> {
    Axios.post('http://localhost:3001/api/user/create', {
      first_name: first_name, 
      last_name: last_name, 
      email: email,
      password: password,
      phone_number: phone_number
    }).then(()=>{
      alert(`User ${first_name} ${last_name} added.`);
    }).catch((err)=> {
      console.log(err);
    })
  };

  return (
    <div className="App">
      <div>
      <section>
          <div>
            <div>
              <div>
                  <div className="card-body">
                      <div className="form-group">
                          <label>First Name</label>
                          <input 
                          type="text" 
                          id="firstName" 
                          onChange={(e)=> {
                            set_first_name(e.target.value);
                          }}
                          />
                      </div>
                      <div className="form-group">
                          <label>Last Name</label>
                          <input type="text" id="lastName" onChange={(e)=> {
                            set_last_name(e.target.value);
                          }}/>
                      </div>
                      <div className="form-group">
                          <label>Email</label>
                          <input type="email" id="email" onChange={(e)=> {
                            set_email(e.target.value);
                          }}/>
                      </div>
                      <div className="form-group">
                        <label>Password</label><br />
                          <input type="password" id="password" onChange={(e)=> {
                            set_password(e.target.value);
                          }}/>
                      </div>
                      <div className="form-group">
                          <label>Phone Number</label>
                          <input type="tel" id="phoneNumber" onChange={(e)=> {
                            set_phone_number(e.target.value);
                          }}/>
                      </div>
                    <button onClick={submitReview}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}

export default Application;
