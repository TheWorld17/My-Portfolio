
import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'FitCore',
    category: 'Web Development',
    description: 'Modern fitness trainer landing page with automated booking.',
    longDescription: 'A modern, responsive one-page website showcasing personal training services: individual, group, and online sessions. Includes sections about workouts, client testimonials, and a contact form. Built with HTML/CSS and hosted on Netlify with fast loading and SSL. Perfect for attracting clients and boosting conversions.',
    image: 'https://content.freelancehunt.com/snippet/6e1946a9-9cc2-4ed2-9010-dcbd07ddc12a/2006604/Screenshot%202026-01-06%20224327.png',
    price: '$40',
    specs: ['Responsive Design', 'SEO Optimization', 'Fast Performance', 'Netlify Hosting'],
    link: 'https://fitcores.netlify.app/'
  },
  {
    id: '2',
    title: 'Massage Studio',
    category: 'Web Development',
    description: 'Lead-focused landing page with 24/7 booking integration.',
    longDescription: 'A modern, responsive landing page focused on lead generation and online bookings. Includes a contact and booking form with 24/7 email notifications, fast loading speed, SSL security, and SEO-friendly structure. Optimized for both desktop and mobile devices.',
    image: 'https://content.freelancehunt.com/snippet/0f06c1f8-6f23-4554-8335-1602ba39006e/2006587/Screenshot%202026-01-06%20003535.png',
    price: '$25',
    specs: ['Mobile First UI', 'Booking System', 'Lead Generation', 'SSL Security'],
    link: 'https://relaxart.netlify.app/'
  },
  {
    id: '3',
    title: 'VLAN Network Config',
    category: 'Network Administration',
    description: 'Multi-segment network design with secure VLAN segmentation.',
    longDescription: 'Designed and configured a multi-segment network in Cisco Packet Tracer with VLANs, routing, switching, DHCP, DNS, and web servers. Verified connectivity between VLANs and ensured secure segmentation.',
    image: 'https://content.freelancehunt.com/snippet/2868ec27-c8ac-424e-878e-f99ef6842147/2006585/Screenshot%202026-01-06%20004301.png',
    price: '$50',
    specs: ['VLAN Segmentation', 'DHCP & DNS Config', 'Secure Routing', 'Packet Tracer']
  },
  {
    id: '4',
    title: 'Enterprise Network',
    category: 'Network Administration',
    description: 'Scalable enterprise design with VLSM & Inter-VLAN routing.',
    longDescription: 'Complex enterprise network design using Cisco Packet Tracer. Includes VLAN segmentation, DHCP, DNS, web servers, inter-VLAN routing, and VLSM subnetting. Designed for scalability, performance, and security.',
    image: 'https://content.freelancehunt.com/snippet/6ee37dee-8fc2-454d-ba74-2e8fab0857e4/2006584/Screenshot%202026-01-06%20005120.png',
    price: '$65',
    specs: ['VLSM Subnetting', 'Inter-VLAN Routing', 'Scalability', 'Switch Security']
  }
];
