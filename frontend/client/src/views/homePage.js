import '../css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import {Container, Card} from 'react-bootstrap';

export default function HomePage() {
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
                              <Link to = '/Search'><button className="btn btn-outline-primary" id="landing-button" aria-pressed="false">SHOP NOW</button></Link>
                              <Link to = '/createListing'><button className="btn btn-outline-primary" id="landing-button" aria-pressed="false">SELL NOW</button></Link>
                          </div>
                        
                      </div>
                      <video autoPlay loop muted className="w-100" id="landing-video">
                          <source src={require("../images/mixkit-drummer-playing.mp4")} type="video/mp4"/>
                      </video>
                      
                  </div>
              </div>
          </div>
          <Container>
              <h2 style={{'fontWeight': 700}}>Popular Brands</h2>
              <br></br>
                    <Card>
                        <Card.Header>Gibson</Card.Header>
                        <Card.Body>
                            <Card.Img src={require("../images/gibson.jpg")}  alt="Card gibson" style={{ height: '200px', objectFit: 'cover' }}/>
                            <Card.Title>Gibson</Card.Title>
                            <Card.Text style={{minHeight: '200px'}}>
                                Gibson Brands, Inc. is an American manufacturer of guitars, other musical instruments, and professional audio equipment.
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>Fender</Card.Header>
                        <Card.Body>
                            <Card.Img src={require("../images/Fender.jpg")}  alt="Card fender" style={{ height: '200px', objectFit: 'cover' }}/>
                            <Card.Title>Fender</Card.Title>
                            <Card.Text style={{minHeight: '200px'}}>
                                Fender Musical Instruments Corporation is an American manufacturer of stringed instruments and amplifiers.
                            </Card.Text>

                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>Yamaha</Card.Header>
                        <Card.Body>
                            <Card.Img src={require("../images/yamaha.jpg")}  alt="Card yamaha" style={{ height: '200px', objectFit: 'cover' }}/>
                            <Card.Title>Yamaha</Card.Title>
                            <Card.Text style={{minHeight: '200px'}}>
                                Yamaha Corporation is a Japanese multinational corporation and conglomerate with a very wide range of products and services.
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>Pearl</Card.Header>
                        <Card.Body>
                            <Card.Img src={require("../images/pearl.jpg")}  alt="Card pearl" style={{ height: '200px', objectFit: 'cover' }}/>
                            <Card.Title>Pearl</Card.Title>
                            <Card.Text style={{minHeight: '200px'}}>
                                Pearl Musical Instrument Company, simply known as Pearl, is a multinational corporation based in Japan with a wide range of products, predominantly percussion instruments.
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>Martin</Card.Header>
                        <Card.Body>
                            <Card.Img src={require("../images/martin.jpg")}  alt="Card martin" style={{ height: '200px', objectFit: 'cover' }}/>
                            <Card.Title>Martin</Card.Title>
                            <Card.Text style={{minHeight: '200px'}}>

                                C.F. Martin & Company is an American guitar manufacturer established in 1833.
                            </Card.Text>
                        </Card.Body>

                    </Card>

                    <Card>
                        <Card.Header>Stradivarius</Card.Header>
                        <Card.Body>
                            <Card.Img src={require("../images/Stradivarius.jpg")}  alt="Card stradivarius" style={{ height: '200px', objectFit: 'cover' }}/>
                            <Card.Title>Stradivarius</Card.Title>
                            <Card.Text style={{minHeight: '200px'}}>
                                Stradivarius is a stringed instrument brand that was established in 1994 as a part of the Inditex group. The brand offers the latest trends in clothing, shoes and
                            </Card.Text>
                        </Card.Body>
                    </Card>
          </Container>
    </div>
  );
}