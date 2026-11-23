export interface ReviewItem {
  id: string;
  name: string;
  designation: string;
  quote: string;
  /** Optional avatar path inside public/img/ (e.g. '/img/reviews/client-01.webp'). */
  avatar?: string;
}

export const reviews: ReviewItem[] = [
  {
    id: 'daneshwara-vidulanga',
    name: 'Daneshwara Vidulanga',
    designation: 'UX Lead',
    quote:
      "I had a great experience working with Lufi on graphic design projects. I'm really happy with the quality, creativity, and attention to detail. Great service and definitely recommend!",
    avatar: '/img/reviews/daneshwara-vidulanga.jpg',
  },
  {
    id: 'samanali-amashakya',
    name: 'Samanali Amashakya',
    designation: 'Executive Merchandiser · MAS',
    quote:
      'Working with Lufi on my design projects was a fantastic experience. Their creativity, professionalism, and eye for detail really stood out in the final results. Highly recommend!',
    avatar: '/img/reviews/samanali-amashakya.jpg',
  },
  {
    id: 'nawod-medawela',
    name: 'Nawod Medawela',
    designation: 'Lead Auditor - IMS · SGS',
    quote:
      'Lufi did an amazing job on our Digital Platform needs. From the creative concepts to the polished final files, everything was handled with great care and precision. Truly top-notch service!',
    avatar: '/img/reviews/nawod-medawela.jpg',
  },
  {
    id: 'samanthi-ranasinghe',
    name: 'Samanthi Ranasinghe',
    designation: 'Additional Secretary · Ministry of Health',
    quote:
      "I am extremely pleased with Lufi's designs for my presentations and social media posts. Their creativity, attention to detail, and professional quality exceeded expectations. Highly recommend!",
    avatar: '/img/reviews/samanthi-ranasinghe.jpg',
  },
];
