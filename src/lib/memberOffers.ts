export interface MemberOffer {
  id: string;
  partnerName: string;
  logo: string;
  discountBadge: string;
  title: string;
  shortDesc: string;
  howToRedeem: string;
  onlineCode?: string;
  inStoreInstructions: string;
  validThrough: string;
  category: 'utrustning' | 'backe' | 'ovrigt';
}

export const memberOffers: MemberOffer[] = [
  {
    id: 'kang-poles-medlem',
    partnerName: 'Kang Poles',
    logo: '/assets/partners/kang.png',
    discountBadge: '20% RABATT',
    title: '20% rabatt online för medlemmar',
    shortDesc: '20% rabatt online på hela sortimentet av hållbara skidstavar i bambu och lin.',
    howToRedeem: 'Ange rabattkoden i kassan vid beställning online på kangpoles.com.',
    onlineCode: 'LFSGROM2627',
    inStoreInstructions: 'Gäller online på kangpoles.com.',
    validThrough: 'Gäller säsongen 2026/2027',
    category: 'utrustning'
  },
  {
    id: 'kang-poles-ledare',
    partnerName: 'Kang Poles',
    logo: '/assets/partners/kang.png',
    discountBadge: '25% LEDARRABATT',
    title: '25% rabatt för tränare, styrelse & ledare',
    shortDesc: 'Exklusiv ledarrabatt på 25% online för klubbens tränare, styrelsemedlemmar och ledare.',
    howToRedeem: 'Ange koden i kassan vid beställning online på kangpoles.com.',
    onlineCode: 'PRO-LFS2627',
    inStoreInstructions: 'Gäller tränare, styrelse och ledare på kangpoles.com.',
    validThrough: 'Gäller säsongen 2026/2027',
    category: 'utrustning'
  },
  {
    id: 'ekholmsnas-liftkort',
    partnerName: 'Ekholmsnäsbacken',
    logo: '/assets/partners/ekholmsnas.png',
    discountBadge: '1 100 KR RABATT',
    title: '1 100 kr rabatt på säsongskort',
    shortDesc: 'Medlemmar i IK Lidingö Freeskiers har 1 100 kr rabatt på säsongskortet i hemmabacken Ekholmsnäs.',
    howToRedeem: 'Visa upp ditt digitala medlemskort i kassan i Ekholmsnäsbacken vid köp av säsongskort.',
    inStoreInstructions: 'Visa upp medlemskort i kassan.',
    validThrough: 'Vintersäsongen 2026/2027',
    category: 'backe'
  },
  {
    id: 'alpingaraget-rabatt',
    partnerName: 'Alpingaraget',
    logo: '/assets/partners/alpingaraget.png',
    discountBadge: 'ERBJUDANDE KOMMER',
    title: 'Erbjudande kommer',
    shortDesc: 'Erbjudande och klubbrabatt för säsongen 2026/2027 presenteras inom kort.',
    howToRedeem: 'Information om säsongens förmåner hos Alpingaraget publiceras här inom kort.',
    inStoreInstructions: 'Erbjudande kommer.',
    validThrough: 'Säsongen 2026/2027',
    category: 'utrustning'
  },
  {
    id: '1000skis-rabatt',
    partnerName: '1000 Skis',
    logo: '/assets/partners/1000skis.avif',
    discountBadge: 'ERBJUDANDE KOMMER',
    title: 'Erbjudande kommer',
    shortDesc: 'Erbjudande och klubbrabatt från 1000 Skis för säsongen 2026/2027 presenteras inom kort.',
    howToRedeem: 'Information om säsongens erbjudande publiceras här inom kort.',
    inStoreInstructions: 'Erbjudande kommer.',
    validThrough: 'Säsongen 2026/2027',
    category: 'utrustning'
  },
  {
    id: 'stellar-rabatt',
    partnerName: 'Stellar',
    logo: '/assets/partners/stellar.jpeg',
    discountBadge: 'ERBJUDANDE KOMMER',
    title: 'Erbjudande kommer',
    shortDesc: 'Erbjudande och samarbete med Stellar Equipment för säsongen 2026/2027 presenteras inom kort.',
    howToRedeem: 'Information om säsongens erbjudande publiceras här inom kort.',
    inStoreInstructions: 'Erbjudande kommer.',
    validThrough: 'Säsongen 2026/2027',
    category: 'utrustning'
  }
];
