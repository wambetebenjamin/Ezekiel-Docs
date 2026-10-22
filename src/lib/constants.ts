export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

export const DOCUMENT_CATEGORIES = [
  { id: 'contracts', name: 'Contracts', icon: 'FileText' },
  { id: 'employment', name: 'Employment', icon: 'Briefcase' },
  { id: 'property', name: 'Property', icon: 'Home' },
  { id: 'business', name: 'Business', icon: 'Building' },
];

export const KENYAN_COUNTIES = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi', 'Kitale',
  'Garissa', 'Kakamega', 'Kericho', 'Meru', 'Nyeri', 'Machakos', 'Kilifi', 'Bungoma',
  'Kiambu', 'Kajiado', 'Uasin Gishu', 'Kisii', 'Homabay', 'Siaya', 'Busia', 'Vihiga',
  'Trans Nzoia', 'Bomet', 'Kericho', 'Nandi', 'Laikipia', 'Nyandarua', 'Murang\'a',
  'Kirinyaga', 'Embu', 'Tharaka Nithi', 'Marsabit', 'Isiolo', 'Mandera', 'Wajir',
  'Turkana', 'West Pokot', 'Samburu', 'Elgeyo Marakwet', 'Baringo', 'Taita Taveta',
  'Kwale', 'Lamu', 'Tana River', 'Garissa', 'Wajir', 'Mandera'
];

export const CURRENCY = 'KSh';
export const LOCALE = 'en-KE';

export const WHATSAPP_NUMBER = '254112272061';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;