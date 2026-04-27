export interface StaticNewsArticle {
  category: string;
  title: string;
  summary: string;
  source: string;
  url: string;
}

export const staticHealthNews: StaticNewsArticle[] = [
  {
    category: 'Major Medical Breakthroughs',
    title: 'Gene Therapy Slows Huntington’s Disease Progression by 75%',
    summary:
      'A pioneering gene therapy has shown a 75% reduction in Huntington’s disease progression over three years. Delivered directly into the brain using a modified virus to silence the mutant gene producing the toxic huntingtin protein, this treatment represents a major scientific milestone.',
    source: 'The Guardian',
    url: '#',
  },
  {
    category: 'Major Medical Breakthroughs',
    title: 'Eli Lilly\'s Therapy Approved for Advanced Breast Cancer',
    summary:
      'The U.S. FDA has approved Eli Lilly’s therapy for advanced breast cancer, marking a significant advancement in treatment options for this condition.',
    source: 'Reuters',
    url: '#',
  },
  {
    category: 'Global Health Challenges',
    title: 'Over a Billion People at Risk Due to Uncontrolled High Blood Pressure',
    summary:
      'The World Health Organization reports that 1.4 billion people lived with hypertension in 2024, yet only one in five have it under control, putting over a billion people at risk.',
    source: 'World Health Organization',
    url: '#',
  },
  {
    category: 'Global Health Challenges',
    title: 'Billions Still Lack Basic Health Services Despite Global Efforts',
    summary:
      'A joint WHO/UNICEF report reveals that while over 100 countries have made unprecedented efforts to improve basic services in healthcare facilities, billions are still served by facilities without essential services like water, sanitation, hygiene, healthcare waste management, and electricity.',
    source: 'World Health Organization',
    url: '#',
  },
  {
    category: 'Regional Health Alerts',
    title: 'Food Poisoning Outbreak in New Delhi During Navratri',
    summary:
      'On September 23, around 200 individuals fell ill after consuming food prepared with buckwheat flour during the Hindu festival of Navratri in northwest Delhi. The affected individuals were treated at local hospitals, and no fatalities were reported.',
    source: 'Wikipedia',
    url: '#',
  },
  {
    category: 'Regional Health Alerts',
    title: 'Ebola Outbreak in Kasaï Province, Democratic Republic of Congo',
    summary:
      'An outbreak of the Zaire ebolavirus was declared in Kasai Province on September 4, with at least 81 confirmed cases and 28 deaths reported as of September 14. Vaccination efforts are underway to contain the spread.',
    source: 'Wikipedia',
    url: '#',
  },
  {
    category: 'Policy and Advocacy Developments',
    title: 'Trump Imposes 100% Tariff on Pharmaceuticals',
    summary:
      'Former U.S. President Donald Trump announced a new policy imposing a 100% tariff on all pharmaceutical products, aiming to boost domestic manufacturing and reduce dependency on international drug imports. This move has significant implications for global pharmaceutical trade and healthcare costs.',
    source: 'The Australian',
    url: '#',
  },
  {
    category: 'Policy and Advocacy Developments',
    title: 'Advocacy for Extended Medicare Enrollment Flexibility',
    summary:
      'The American Medical Association (AMA) has successfully advocated for extended enrollment flexibility for Medicare patients impacted by incorrect provider data, allowing them to switch plans in 2026 and strengthening transparency in Medicare enrollment.',
    source: 'American Medical Association',
    url: '#',
  },
];
