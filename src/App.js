import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Switch, Typography,Paper } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';


function App() {
  const [userN, setuserN] = useState([])
  const [userData, setuserData] = useState([])

  const userEvent = (event) => {
    setuserN(event.target.value)
    console.log(userN)
  }

  useEffect(() => {
    axios.get("https://api.github.com/users/" + userN).then((res) => {
      console.log(res.data);
      setuserData(res.data)
      console.log(userData)
    });
  }, [userN]);

  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Paper className="wrapper" style = {{height: '95%', marginTop: '20px', borderRadius: '10px'}}>
            <div class="input-group mb-1">
              <input type="text" name='' placeholder='Github User Name' id='user' class="form-control" onChange={userEvent} style={{ borderRadius: '40px' }} />
              <div class="input-group-append mx-1">
              </div>
            </div>
              <div className="top-icons">
              <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} /> 
                {/* <i className="fas fa-ellipsis-v"></i> */}
                {/* <i className="far fa-heart"></i> */}
              </div>

              <div className="profile">
                {/* <img src="AC.png" className="thumbnail" alt="" /> */}
                <img src={userData.avatar_url} className="thumbnail" />
                <div className="check">
                  {/* <i className="fas fa-check"></i> */}
                </div>
                <Typography variant = 'h3' className="name">{userData.name}</Typography>
                <p className="title">Company: <strong>{userData.company}</strong></p>
                <Typography variant = 'p' className="description">{userData.bio}</Typography>
                
                {/* <button type="button" className="btn">Subscribe</button> */}
              </div>

              <div className="social-icons data">

                <div className="icon">
                  <a><i class="fas fa-user-plus"></i></a>
                  <Typography variant = 'h4' className="count">{userData.followers}</Typography>
                  <Typography variant = 'p'>Followers</Typography>
                </div>
                <div className="icon">
                  <a><i class="fas fa-users"></i></a>
                  <Typography variant = 'h4' className="count">{userData.following}</Typography>
                  <Typography variant = 'p'>Following</Typography>
                </div>
                <div className="icon">
                  <a href=''><i className="fab fa-github"></i></a>
                  <Typography variant = 'h4' className="count">{userData.public_repos}</Typography>
                  <Typography variant = 'p'>Repositries</Typography>
                </div>
              </div>
        </Paper>
      </ThemeProvider>
    </>
  );
}

export default App;
