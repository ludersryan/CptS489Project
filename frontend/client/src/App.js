import './css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div id = "app">
      <div id="nav-placeholder"></div>

          <div className="container-fluid" id="global-landing-div">
              <div className="row">
                  <div className="col-12 d-flex align-items-center justify-content-center" id="landing-col" style={{padding:0}}>
                      <div className="text-center" id="landing-text">
                          <h1 id="landing-header">WELCOME TO SOUNDSWAP</h1>
                          <p id="landing-paragraph">The premiere marketplace to buy, sell and discover authenticated music equipment from reputable sellers</p>
                          <div className="btn group" id="landing-btn-group">
                              <button className="btn btn-outline-primary" id="landing-button" aria-pressed="false">SHOP NOW</button>
                              <button className="btn btn-outline-primary" id="landing-button" aria-pressed="false">SELL NOW</button>
                          </div>
                        
                      </div>
                      <video autoPlay loop muted className="w-100" id="landing-video">
                          <source src={require("./images/mixkit-drummer-playing.mp4")} type="video/mp4"/>
                      </video>
                      
                  </div>
              </div>
          </div>

          <div className="container-fluid" id="global-featured-div">
              <h2 style={{'fontWeight': 700}}>Popular Brands</h2>
              <div className="card-group" id="brand-card-group">
                  <div className="card">
                      <div className="card-body">
                          <h5 className="card-title">Gibson</h5>
                      </div>
                      <img className="card-img-bottom" src={require("./images/gibson.jpg")}  alt="Card gibson"/>
                  </div>
                  <div className="card">
                      <div className="card-body">
                          <h5 className="card-title">Fender</h5>
                      </div>  
                      <img className="card-img-bottom"src={require("./images/Fender.jpg")}  alt="Card fender"/>
                  </div>
                  <div className="card">
                      
                      <div className="card-body">
                          <h5 className="card-title">Yamaha</h5>
                      </div>
                      <img className="card-img-bottom" src={require("./images/yamaha.jpg")} alt="Card yamaha"/>
                  </div>
                  <div className="card">
                      <div className="card-body">
                          <h5 className="card-title">Pearl</h5>
                      </div>
                      <img className="card-img-bottom" src={require("./images/pearl.jpg")} alt="Card pearl"/>
                  </div>
                  <div className="card">
                      <div className="card-body">
                          <h5 className="card-title">Martin</h5>
                      </div>
                      <img className="card-img-bottom" src={require("./images/martin.jpg")} alt="Card martin"/>
                  </div>
                  <div className="card">
                      <div className="card-body">
                          <h5 className="card-title">Stradivarius</h5>
                      </div>
                      <img className="card-img-bottom" src={require("./images/Stradivarius.jpg")}  alt="Cardstradivarius"/>
                  </div>
              </div>
          </div>
    </div>
  );
}

export default App;
