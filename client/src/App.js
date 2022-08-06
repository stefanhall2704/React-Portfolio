// import App from './App';
import React, { useState, useEffect } from "react"
import Axios from 'axios'


function Application() {
  const [project_title, set_project_title] = useState('');
  const [project_link, set_project_link] = useState('');
  const [user_id, set_user_id] = useState('');
  const submitReview = ()=> {
    Axios.post('http://localhost:3001/api/project/create', {
      project_title: project_title, 
      project_link: project_link, 
      user_id: user_id
    }).then(()=>{
      alert('successful insert');
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
                          <label>Project Title</label>
                          <input 
                          type="text" 
                          id="projectTitle" 
                          onChange={(e)=> {
                            set_project_title(e.target.value);
                          }}
                          />
                      </div>
                      <div className="form-group">
                          <label>Project URL</label>
                          <input type="text" id="projectLink" onChange={(e)=> {
                            set_project_link(e.target.value);
                          }}/>
                      </div>
                      <div className="form-group">
                        <label>User</label><br />
                          <input type="number" onChange={(e)=> {
                            set_user_id(e.target.value);
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
