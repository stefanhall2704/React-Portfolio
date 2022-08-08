import React, { useState, useEffect } from "react"
import Axios from 'axios'


function Application() {
  const [first_name, set_first_name] = useState('');
  const [last_name, set_last_name] = useState('');
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const [phone_number, set_phone_number] = useState('');
  const createUser = ()=> {
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
  const [project_title, set_project_title] = useState('');
  const [project_url, set_project_url] = useState('');
  const [user_id, set_user_id] = useState('');
  const createProject = ()=> {
    Axios.post('http://localhost:3001/api/project/create', {
      project_title: project_title,
      project_url: project_url,
      user_id: user_id
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
                    <button onClick={createUser}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
      <div>
      <section>
          <div>
            <div>
              <div>
                  <div className="card-body">
                      <div className="form-group">
                          <label>Project Title</label>
                          <input 
                          type="text" 
                          id="firstName" 
                          onChange={(e)=> {
                            set_project_title(e.target.value);
                          }}
                          />
                      </div>
                      <div className="form-group">
                          <label>Project URL</label>
                          <input type="text" id="lastName" onChange={(e)=> {
                            set_project_url(e.target.value);
                          }}/>
                      </div>
                      <div className="form-group">
                          <label>User Id</label>
                          <input type="email" id="email" onChange={(e)=> {
                            set_user_id(e.target.value);
                          }}/>
                      </div>
                    <button onClick={createProject}>Submit</button>
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
