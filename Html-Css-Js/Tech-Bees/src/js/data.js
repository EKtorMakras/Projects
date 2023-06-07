
// App Name/Title
export const AppName = import.meta.env.VITE_APP_NAME
export const pageTitle = import.meta.env.VITE_APP_PAGE_TITLE


// Domain Categories
export const categories = [
  {
    id: 1,
    name: 'Mobile Development'
  },
  {
    id: 2,
    name: 'Web Development'
  },
  {
    id: 3,
    name: 'Marketing'
  },
  {
    id: 4,
    name: 'Branding'
  },
]

// Social Links
export const socialLinks = {
  facebook: {
    icon: 'fab fa-facebook',
    label: 'facebook'
  },
  instagram: {
    icon: 'fab fa-instagram',
    label: 'instagram'
  },
  twitter: {
    icon: 'fab fa-twitter',
    label: 'twitter'
  },
  linkedin: {
    icon: 'fab fa-linkedin',
    label: 'linkedin'
  },
}



// Main Nav Links
export const mainNavLinks = [
  {
    label: 'Home',
    url: '#'
  },
  {
    label: 'Services',
    url: '#services'
  },
  {
    label: 'About',
    url: '#about'
  },
  {
    label: 'Portfolio',
    url: '#portfolio'
  },
  {
    label: 'Team',
    url: '#team'
  },
  {
    label: 'Testimonials',
    url: '#testimonials'
  },
  {
    label: 'Blog',
    url: '#blog'
  },
  {
    label: 'Contact Us',
    url: '#contact-us'
  },
  
]


// Services Boxes
export const servicesBoxes = [
  {
    icon: 'mobileapp.png',
    label: 'Mobile App',
    class: 'mobileApp'
  },
  {
    icon: 'webdesign.png',
    label: 'Web Design',
    class: 'webDesign'
  },
  {
    icon: 'marketing.png',
    label: 'Marketing',
    class: 'marketing'
  },
  {
    icon: 'branding.png',
    label: 'Branding',
    class: 'branding'
  },
]


// Record Boxes
export const recordsBoxes = [
  {
    number: '2500',
    desc: 'Happy Clients',
    class: 'clients'
  },
  {
    number: '750',
    desc: 'Projects Completed',
    class: 'projects-completed'
  },
  {
    number: '500',
    desc: 'Running Projects',
    class: 'projects-running'
  },
  {
    number: '700',
    desc: 'Awesome Designs',
    class: 'designs'
  },
]


// Projects
export const projects = [
  {
    name:'TechPulse',
    img: 'project-1',
    category: 2,
    iconsUrls:['https://github.com/EKtorMakras?tab=repositories','#']
  },
  {
    name:'GrowthHive',
    img: 'project-2',
    category: 4,
    iconsUrls:['https://github.com/EKtorMakras?tab=repositories','#']
  },
  {
    name:'ClickMagnet',
    img: 'project-3',
    category: 1,
    iconsUrls:['https://github.com/EKtorMakras?tab=repositories','#']
  },
  {
    name:'Amplify360',
    img: 'project-4',
    category: 4,
    iconsUrls:['https://github.com/EKtorMakras?tab=repositories','#']
  },
  {
    name:'DataFusion',
    img: 'project-5',
    category: 2,
    iconsUrls:['https://github.com/EKtorMakras?tab=repositories','#']
  },
  {
    name:'MarketMasters',
    img: 'project-6',
    category: 3,
    iconsUrls:['https://github.com/EKtorMakras?tab=repositories','#']
  },
]


export const projectIcons = [
  {
    label: 'Source Code',
    name: 'fab fa-github',
  },
  {
    label: 'Live Website',
    name: 'fa-solid fa-diagram-project',
  },
]


// Team
export const teamMembers = [
  {
    img: 'team1',
    name: 'Ethan Thompson',
    role: 'CEO & Founder',
    socials: [
      {
        name: socialLinks.facebook.icon,
        url: 'http://www.facebook.com',
        label: socialLinks.facebook.label
      },
      {
        name: socialLinks.twitter.icon,
        url: 'http://www.twitter.com',
        label: socialLinks.twitter.label
      },
      {
        name: socialLinks.instagram.icon,
        url: 'http://www.instagram.com',
        label: socialLinks.instagram.label
      },
      {
        name: socialLinks.linkedin.icon,
        url: 'http://www.linkedin.com',
        label: socialLinks.linkedin.label
      }
    ]
  },
  {
    img: 'team2',
    name: 'Olivia Anderson',
    role: 'Manager',
    socials: [
      {
        name: socialLinks.facebook.icon,
        url: 'http://www.facebook.com',
        label: socialLinks.facebook.label
      },
      {
        name: socialLinks.twitter.icon,
        url: 'http://www.twitter.com',
        label: socialLinks.twitter.label
      },
      {
        name: socialLinks.instagram.icon,
        url: 'http://www.instagram.com',
        label: socialLinks.instagram.label
      },
      {
        name: socialLinks.linkedin.icon,
        url: 'http://www.linkedin.com',
        label: socialLinks.linkedin.label
      }
    ]
  },
  {
    img: 'team3',
    name: 'Noah Patel',
    role: 'Tech Leader',
    socials: [
      {
        name: socialLinks.facebook.icon,
        url: 'http://www.facebook.com',
        label: socialLinks.facebook.label
      },
      {
        name: socialLinks.twitter.icon,
        url: 'http://www.twitter.com',
        label: socialLinks.twitter.label
      },
      {
        name: socialLinks.instagram.icon,
        url: 'http://www.instagram.com',
        label: socialLinks.instagram.label
      },
      {
        name: socialLinks.linkedin.icon,
        url: 'http://www.linkedin.com',
        label: socialLinks.linkedin.label
      }
    ]
  },
  {
    img: 'team4',
    name: 'Alexander Hughes',
    role: 'Product Designer',
    socials: [
      {
        name: socialLinks.facebook.icon,
        url: 'http://www.facebook.com',
        label: socialLinks.facebook.label
      },
      {
        name: socialLinks.twitter.icon,
        url: 'http://www.twitter.com',
        label: socialLinks.twitter.label
      },
      {
        name: socialLinks.instagram.icon,
        url: 'http://www.instagram.com',
        label: socialLinks.instagram.label
      },
      {
        name: socialLinks.linkedin.icon,
        url: 'http://www.linkedin.com',
        label: socialLinks.linkedin.label
      }
    ]
  },
]


// Testimonials
export const testimonials = [
  {
    img: 'testimonial-1.jpeg',
    name: 'Benjamin Johnson',
    text: `Tech Bees has been an absolute game-changer for our business. Their expertise and dedication to delivering results are unparalleled. They took the time to understand our goals and provided us with innovative solutions that have significantly boosted our online presence.`
  },
  {
    img: 'testimonial-2.jpg',
    name: 'Emily Thompson',
    text: `Working with Tech Bees has been an incredible experience. Their team's technical prowess and creative vision have transformed our outdated website into a modern and engaging platform. Not only did they exceed our expectations in terms of design, but they also implemented effective marketing strategies that have generated a substantial increase in our customer base.`
  },
  {
    img: 'testimonial-3.jpg',
    name: 'Matthew Anderson',
    text: `I can't recommend Tech Bees enough. Their commitment to client satisfaction is exceptional. From the initial consultation to the final product delivery, they maintained clear communication and ensured that every step of the process was aligned with our objectives. The level of professionalism, attention to detail, and passion for their work is evident in the outstanding results they achieved for our brand.`
  },
]


// Blog
export const blogs = [
  {
    img: 'blog1.png',
    title: 'Unleashing the Power of Mobile Development: Building Mobile Apps That Stand Out',
    desc: 'Learn the ins and outs of mobile app development and discover how to create captivating and user-friendly mobile applications. This blog explores the essential steps, frameworks, and design principles to create intuitive mobile apps that provide seamless experiences across different devices and platforms.',
    url: '/blog-1',
    category: 1,
    readTime: '5'
  },
  {
    img: 'blog2.png',
    title: 'Mastering Web Development: Best Practices for Building Modern Websites',
    desc: 'Discover the latest trends and techniques in web development. From responsive design to performance optimization, this blog covers essential tips and tricks to create visually stunning and high-performing websites that leave a lasting impression on your visitors.',
    url: '/blog-2',
    category: 2,
    readTime: '3'
  },
  {
    img: 'blog3.png',
    title: 'Building a Brand That Resonates: The Art of Branding in the Digital Age',
    desc: 'Unlock the secrets of successful branding in the digital age. This blog delves into the importance of brand identity, storytelling, and creating emotional connections with your audience. Learn how to craft a strong brand presence that sets your business apart from the competition.',
    url: '/blog-3',
    category: 4,
    readTime: '6'
  },
  {
    img: 'blog4.jpg',
    title: 'The Future of Web Development: Exploring Emerging Technologies',
    desc: 'Dive into the future of web development and explore the exciting possibilities offered by emerging technologies. From progressive web apps (PWAs) to voice interfaces and AI integration, this blog uncovers the cutting-edge tools and technologies shaping the web development landscape.',
    url: '/blog-4',
    category: 2,
    readTime: '4'
  },
  {
    img: 'blog5.jpg',
    title: 'Strategies for Effective Digital Marketing: Reaching and Engaging Your Target Audience',
    desc: 'Discover proven strategies and tactics for successful digital marketing campaigns. From social media marketing to content marketing and SEO, this blog provides valuable insights and practical tips to help you optimize your digital marketing efforts and drive meaningful results.',
    url: '/blog-5',
    category: 3,
    readTime: '5'
  },
]


// Footer
export const footer = {

  socials: [
    {
      name: socialLinks.facebook.icon,
      url: 'http://www.facebook.com',
      label: socialLinks.facebook.label
    },
    {
      name: socialLinks.twitter.icon,
      url: 'http://www.twitter.com',
      label: socialLinks.twitter.label
    },
    {
      name: socialLinks.instagram.icon,
      url: 'http://www.instagram.com',
      label: socialLinks.instagram.label
    },
    {
      name: socialLinks.linkedin.icon,
      url: 'http://www.linkedin.com',
      label: socialLinks.linkedin.label
    }
  ],

  contact: [
    '123 Main Street, New York, NY 10001',
    '(212) 555-1234',
    'techbees@gmai.com'
  ],

  about: [
    'Company',
    'Projects',
    'Events',
    'Awards',
    'Open Source',
  ],

  useful: [
    'Company Policy',
    'Financial Statements',
    'Terms & Conditions',
    'Privacy Policy',
  ],
}