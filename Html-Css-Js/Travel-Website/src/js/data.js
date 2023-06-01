
// App Name
export const AppName = import.meta.env.VITE_APP_NAME;
export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const endpoints = {
  secretArea: `${BASE_URL}/secret-area`
}
export let browserHeight = window.innerHeight;

export const mainNavLinks = [
  {
    text: 'Our Beginning',
    href: '#our-beginning',
    id: 'our-beginning-link'
  },
  {
    text: 'Features',
    href: '#features',
    id: 'features-link'
  },
  {
    text: 'Testimonials',
    href: '#testimonials',
    id: 'testimonials-link'
  },
]

export const featureCards = [
  {
    img: "rain.svg",
    title: "We&rsquo;ll Watch the Weather",
    desc: `Download our app and we&rsquo;ll send you a notice if it&rsquo;s about to rain in the next 20 minutes around your
           current location. A good rain can be refreshing, but sometimes you just want to stay dry.`
  },
  {
    img: "globe.svg",
    title: "Global Guides",
    desc: `We&rsquo;ve scoured the entire planet for the best retreats and beautiful vistas. If there&rsquo;s a
           corner of the world you want to escape to we know the most scenic and inspiring locations.`
  },
  {
    img: "wifi.svg",
    title: "Wi-Fi Waypoints",
    desc: `We only send you on trips to places we can personally vouch for as being amazing. Which means we&rsquo;ve mapped
           out where local wi-fi spots are and marked them in our app&rsquo;s map view.`
  },
  {
    img: "fire.svg",
    title: "Survival Kit",
    desc: `Everytime you book an escape with us we send you a survival kit with the finest materials. The kit will allow you
           to setup a tent, start a fire, scratch your own back and lower your taxes.`
  },
]

export const testimonialCards = [
  {
    img: "testimonial-jane.jpg",
    title: {
      name: 'Jane Doe',
      desc: '9 Time Escaper',
    },
    desc: `&ldquo;Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
           Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
           Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
           magna aliqua.&rdquo;`
  },
  {
    img: "testimonial-john.jpg",
    title: {
      name: 'John Smith',
      desc: '4 Time Escaper',
    },
    desc: `&ldquo;Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
           Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
           Lorem ipsum dolor sit amet, consectetur.&rdquo;`
  },
  {
    img: "testimonial-cat.jpg",
    title: {
      name: 'Cat McKitty',
      desc: '6 Time Escaper',
    },
    desc: `&ldquo;Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.&rdquo;`
  },
]

