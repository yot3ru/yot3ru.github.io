// Curated order keeps related artwork apart while preserving the supplied files.
// Add a new optimized image here with its original dimensions and a factual alt.
export interface LabWork {
  slug: string;
  width: number;
  height: number;
  alt: string;
}

export const labRows: [LabWork[], LabWork[]] = [
  [
    { slug: 'easy-go', width: 6588, height: 6584, alt: 'EasyGo car artwork on a light background with Sinhala lettering.' },
    { slug: 'food-project02', width: 2160, height: 2160, alt: 'Dark burger promotion with stacked food photography and bold lettering.' },
    { slug: 'uonow-open-v03', width: 2905, height: 4096, alt: 'Urban Oasis Cafe opening poster with tea and pastry on a light background.' },
    { slug: 'sofa-sell01', width: 2160, height: 2160, alt: 'Green sofa promotion on a deep green background.' },
    { slug: 'uonow-open-v05', width: 2905, height: 4096, alt: 'Urban Oasis Cafe opening poster with coffee and pastry on a dark background.' },
    { slug: '02', width: 1080, height: 1080, alt: 'Three days to go event poster featuring a speaker portrait.' },
    { slug: 'cafe-masala-post01v01', width: 1080, height: 1080, alt: 'Cafe Masala welcome artwork with food photography and lettering.' },
    { slug: 'syneptic-happy-holidays', width: 6588, height: 6588, alt: 'Syneptic holiday greeting with hanging festive ornaments.' },
    { slug: 'uonow-open-v02', width: 2905, height: 4096, alt: 'Urban Oasis Cafe opening poster featuring a cup of coffee.' },
    { slug: 'menu', width: 1628, height: 1155, alt: 'Dark restaurant menu artwork with food photographs and orange headings.' },
  ],
  [
    { slug: 'pmspost28v01', width: 6584, height: 6588, alt: 'Independence Day graphic with an illustrated Indian flag.' },
    { slug: 'frame-22', width: 2905, height: 4096, alt: 'Urban Oasis Cafe opening poster with a plated dish on a dark background.' },
    { slug: 'food-project01', width: 2160, height: 2160, alt: 'Peach food promotion with a chocolate dessert and large lettering.' },
    { slug: 'uonow-open-v04', width: 2905, height: 4096, alt: 'Urban Oasis Cafe opening poster with two cold drinks on a dark background.' },
    { slug: 'pyxelio-new-year', width: 1082, height: 1088, alt: 'Pyxelio New Year greeting with large red 2026 numerals.' },
    { slug: 'easy-go02', width: 6584, height: 6584, alt: 'EasyGo family travel artwork photographed at the back of a car.' },
    { slug: 'food-project03', width: 2160, height: 2160, alt: 'Zero sugar drink promotion with a black can and ice.' },
    { slug: 'easy-go-christmas', width: 6588, height: 6588, alt: 'EasyGo Christmas greeting in white lettering on a dark background.' },
    { slug: 'media', width: 6584, height: 6584, alt: 'Syneptic Thai Pongal greeting with a portrait on a blue background.' },
  ],
];
