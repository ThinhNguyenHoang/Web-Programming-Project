import React, {useState} from 'react';
import {Box, Button, Container, Typography} from "@mui/material";
import LocationMapWithMarker from "../components/Map/LocationMapWithMarker";
import side_banner from "../assets/images/default_company_logo.jpeg"
import ThemedButton from "../components/Buttons/ThemedButton/ThemedButton";
import Carousel from "react-material-ui-carousel";
import Map from "../components/Map/Map";

const our_information = {
    company_description: 'Ceros is a fast-growing software company that keeps culture and creativity at the heart of everything we do. Our mission is to help customers unlock their creativity and build exceptional content using our uniquely powerful design platform and our tirelessly helpful support and education resources—and do it all without writing a single line of code.',
    slogan: 'Our mission is to inspire and unlock creativity with liberating technology.',
    mottos: ['Find A Way', 'Give A Shit', 'Care about you', 'Love eating','Respect Each Other','Are courageously honest'],
    side_banner: `https://www.themealdb.com/images/ingredients/Chicken.png`
}

const Slide = ({content}) => {
    return (
        <Box sx={{height: `100%`, width: `100%`}}>
            {content ? content : "hHA"}
        </Box>
    )
}
const SlideShowFocus = (props) => {
    return (
        <Box sx={{margin: `0 auto`, overflow: `hidden`, maxHeight: `300px`, maxWidth: `300px`}}>
            {props.children}
        </Box>
    );
}

// rgb(255, 95, 91)
const delay = 2500;
const colors = ["#FF5F5B", "#EECED4", "#FFBB28","#008148","#BBFFAA"];

const TextSlideShow = () => {
    // Get the index state
    const [activeIndex, setActiveIndex] = useState(0);
    const timeoutRef = React.useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setActiveIndex((prevIndex) =>
                    prevIndex === colors.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );
        return () => {
            resetTimeout();
        };
    }, [activeIndex]);

    return (
        // Slide show focus
        <Box sx={{margin: `2em 0`, overflow: 'hidden', maxHeight: `100px`,border:3}}>
            <Box sx={{
                transform: `translate3d(0, ${-activeIndex * 100}px, 0)`,
                transition: `ease ${activeIndex!== 0 ? 1000 : 0}ms`,
            }}>
                {
                    our_information.mottos.map((item, index) => {
                        return <Box sx={{display:'flex',flex:'0 0 auto',alignItems:`center`,justifyContent:`center`,height:`100px`,width:`100%`}}>
                            <Typography variant={`h3`} color={colors[activeIndex]}>
                                {item}
                            </Typography>
                        </Box>
                    })
                }
            </Box>
        </Box>
    );
}

const AboutUs = () => {
    return (
        <div>
            <Box sx={{display: `flex`, flexDirection: `column`, justifyContent: `center`, alignItems: `center`}}>
                <Box sx={{display: `flex`, flexDirection: `row`,width:`100%`}} bgcolor={`primary.main`}>
                    <Box sx={{display: `flex`, flexDirection: `column`,width:`100%`}}>
                        <Typography sx={{m:6}} color={`white`} variant={`h1`}>About Us</Typography>
                        <Typography sx={{mx:10}} color={`white`} variant={`h4`} paragraph>{our_information.company_description ? our_information.company_description :
                            "COMPANY Description here"}</Typography>
                    </Box>
                    <img src={our_information.side_banner ? our_information.side_banner : side_banner}
                         alt={`Banner image`}  style={{width: `50%`}}/>
                </Box>
                <Box sx={{my:6,display: `flex`, flexDirection: `column`, justifyContent: `center`, alignItems: `center`,width:`100%`,textAlign:`center`}}>
                    <Typography sx={{my:2}} mx={15}
                                variant={`h2`}>{our_information.slogan ? our_information.slogan : "Company slogan"}</Typography>
                    <Button variant={`contained`} color={`primary`}> Order some food now</Button>
                </Box>
                <Box sx={{display: `flex`, flexDirection: `column`,justifyContent:`center`,alignItems:`center`,width:`100%`,bgcolor:`black`}}>
                    <Typography sx={{my:2}} variant={`h2`} color={`primary.main`}>At BK Food Sale we</Typography>
                    <TextSlideShow/>
                </Box>
            </Box>
            <Typography textAlign={`center`} sx={{my:2}} mx={15} color={`primary.main`}
                        variant={`h2`}>Where can you find us</Typography>
            <Map
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAMeYALPFuQ_klstxu-M8WDNUmR4hoEJZM`}
                loadingElement={<div style={{ height: `50%` }} />}
                containerElement={<div style={{ height: `500px`, margin: `0 2em 4em 2em`, border: '2px solid black' }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
};
export default AboutUs;
