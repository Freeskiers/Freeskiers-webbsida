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
    id: 'alpingaraget-rabatt',
    partnerName: 'Alpingaraget',
    logo: '/assets/partners/alpingaraget.png',
    discountBadge: '15% RABATT',
    title: '15% rabatt på skidutrustning, bootfitting & klubbkläder',
    shortDesc: 'Handla skidor, pjäxor, hjälmar, ryggskydd och säsongens officiella klubbkläder med Freeskiers klubbrabatt.',
    howToRedeem: 'Visa ditt digitala medlemskort i kassan i butiken på Birger Jarlsgatan, eller använd rabattkoden i webbshoppen.',
    onlineCode: 'FREESKIERS15',
    inStoreInstructions: 'Visa QR-koden på ditt medlemskort i kassan.',
    validThrough: 'Gäller hela säsongen 2026/2027',
    category: 'utrustning'
  },
  {
    id: 'ekholmsnas-liftkort',
    partnerName: 'Ekholmsnäsbacken',
    logo: '/assets/partners/ekholmsnas.png',
    discountBadge: '20% RABATT',
    title: 'Förmånligt säsongskort & 10% på skidservice & slipning',
    shortDesc: 'Medlemmar åker billigare i hemmabacken! Dessutom 10% rabatt på vallning, kantslipning och skiduthyrning.',
    howToRedeem: 'Visa medlemskortets QR-kod vid köp av säsongskort eller vid inlämning av skidor i skidverkstaden.',
    inStoreInstructions: 'Scanna QR-koden i kassan vid backen.',
    validThrough: 'Vintersäsongen 2026/2027',
    category: 'backe'
  },
  {
    id: 'kang-poles-rabatt',
    partnerName: 'Kang Poles',
    logo: '/assets/partners/kang.png',
    discountBadge: '20% ONLINE',
    title: '20% rabatt på hållbara friåknings- & parkstavar',
    shortDesc: 'Klubbens officiella stavpartner tillverkar prisbelönta, stilrena och extremt tåliga stavar i bambu och lin.',
    howToRedeem: 'Använd medlemskoden vid utcheckning på kangpoles.com.',
    onlineCode: 'KANGFREESKI20',
    inStoreInstructions: 'Gäller online på kangpoles.com.',
    validThrough: 'T.o.m. 30 april 2027',
    category: 'utrustning'
  },
  {
    id: 'gadelius-stod',
    partnerName: 'Gadelius Fastighetsbyrå',
    logo: '/assets/partners/gadelius.png',
    discountBadge: '2 500 KR TILL KLUBBEN',
    title: 'Föreningsbonus vid bostadsförsäljning på Lidingö',
    shortDesc: 'När en klubbfamilj eller vän säljer sin bostad via Gadelius skänker Gadelius 2 500 kr direkt till Freeskiers ungdomsverksamhet.',
    howToRedeem: 'Uppge att du är medlem i IK Lidingö Freeskiers vid kontakt med Gadelius fastighetsmäklare.',
    inStoreInstructions: 'Uppge klubbmedlemskap vid förmedlingsuppdrag.',
    validThrough: 'Löpande samarbete',
    category: 'ovrigt'
  },
  {
    id: 'stockholm-bordsuthyrning',
    partnerName: 'Stockholm Bordsuthyrning',
    logo: '/assets/partners/stockholmbordsuthyrning.png',
    discountBadge: '15% RABATT',
    title: '15% rabatt på bord, stolar & partytält',
    shortDesc: 'Perfekt för födelsedagskalas, barnkalas, studentfirande eller föreningsfester.',
    howToRedeem: 'Ange koden vid bokningsförfrågan online eller via telefon.',
    onlineCode: 'STHLMBORD15',
    inStoreInstructions: 'Uppge rabattkod vid bokning.',
    validThrough: 'Gäller hela 2026/2027',
    category: 'ovrigt'
  }
];
