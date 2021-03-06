
import Login from "../components/Login"
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Route, HashRouter, Link, Redirect, Switch } from 'react-router-dom';
import "../assets/style/Home.css";
import Particles from 'react-particles-js'; 
import HeroImage from "./video-placeholder.jpg";

export default function() {
    return (
        <div className="outercont">
            <Particles
                className="particles"

                height="90vh"

                style={{
                    // width: '100%',
                    position: 'absolute' 
                  }}

                params={{
                    "particles": {
                        "number": {
                            "value": 80,
                            "density": {
                                "enable": false
                            }
                        },
                        "color": {
                            "value": "#00000"
                        },
                        "size": {
                            "value": 6,
                            "random": true
                        },
                        "move": {
                            "direction": "bottom",
                            "out_mode": "out"
                        },
                        "line_linked": {
                            "enable": false
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "repulse"
                            },
                            // "onclick": {
                            //     "enable": true,
                            //     "mode": "remove"
                            // }
                        },
                        "modes": {
                            "remove": {
                                "particles_nb": 10
                            }
                        }
                    }
                }} />

            <div className="headercont">
                <div className="section-inner illustration-section-01">
                    <div className="hero-content">
                        <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
                            Let's recover <span className="text-color-primary">together</span>
                        </h1>
                        <div className="container-xs">
                        <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                            Recovering after climate disasters can be hard. Help and connect with those in need. 
                        </p>
                        <div className="reveal-from-bottom" data-reveal-delay="600">
                            <ButtonGroup>
                                <Button onClick = {(e) => window.location.pathname="/near"} tag="a" color="primary" variant="contained">
                                    Sources near me
                                </Button>
                                <Button component={Link} to="/create"  tag="a" color="secondary" variant="outlined">
                                    Create a source
                                </Button>
                                {/* onClick = {(e) => window.location.pathname="/create"} */}
                                {/* <Button component={Link} to="/near" tag="a" color="primary" variant="contained">
                                    Sources near me
                                </Button>
                                <Button component={Link} to="/account" tag="a" color="secondary" variant="outlined">
                                    Create a source
                                </Button> */}
                            </ButtonGroup>
                        </div>
                        </div>
                    </div>

                    {/* <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
                        <a
                        data-video="https://player.vimeo.com/video/174002812"
                        href="#0"
                        aria-controls="video-modal"
                        >
                        <img
                            className="has-shadow"
                            src={HeroImage}
                            alt="Hero"
                            width="30vw"
                            />
                        </a>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
