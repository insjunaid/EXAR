export const company = {
  name: "Exar International Trading Est",
  shortName: "Exar",
  tagline: "Building Material, Industrial Tools, Safety & Fire",
  established: 2015,
  country: "Saudi Arabia",
  region: "Middle East & Africa",
  support: "24×7",

  contact: {
    phone: "+966 54 379 6070",
    phoneClean: "+966543796070",
    phoneSecondary: "+966 54 379 5656",
    phoneSecondaryClean: "+966543795656",
    email: "sales@exarintl.com",
    emailRfq: "sales1@exarintl.com",
    website: "www.exarintl.com",
    whatsapp: "+966543796070",
    whatsappUrl: "https://wa.me/966543796070",
  },

  vendors: [
    {
      name: "ARAMCO",
      label: "ARAMCO Vendor",
      id: "10065059",
      prefix: "#",
    },
    {
      name: "SABIC",
      label: "SABIC Vendor ID",
      id: "S10935771",
      prefix: "#",
    },
    {
      name: "Royal Commission",
      label: "Royal Commission Registration",
      id: "10016149",
      prefix: "#",
    },
  ],

  locations: [
    {
      name: "Dammam",
      type: "Head Office",
      description:
        "Our main headquarters, serving as the central hub for operations across Saudi Arabia.",
    },
    {
      name: "Jubail",
      type: "Branch",
      description:
        "Strategically located to serve the Jubail Industrial City and its petrochemical sector.",
    },
    {
      name: "Khobar",
      type: "Branch",
      description:
        "Covering the Eastern Province and providing quick access to clients across the Gulf.",
    },
  ],

  about:
    "Exar International is a Saudi Arabia-based company established in 2015, providing top-quality industrial products and trade services. We have built a strong reputation for excellence and reliability through years of dedicated retail and wholesale experience. Exar International stands as your trusted partner for fulfilling all your trading and product requirements across the Middle East & Africa.",

  aboutExtended:
    "Exar International is dedicated to providing top-notch goods that adhere to the highest standards of performance and quality. We offer a wide selection of products to meet your specific needs, whether you require tools and machinery, industrial supplies, or other essentials. Our main goal is to deliver premium items and ensure that our clients receive outstanding support. With our accomplished team and a solid devotion to customer satisfaction, Exar International stands as your trusted partner for fulfilling all your trading and product requirements across the Middle East & Africa.",

  vision:
    "Our vision is to redefine the tools supply industry by becoming the premier destination for professionals, businesses, and project teams seeking exceptional tools and equipment. We aspire to be the catalyst for innovation, empowering our customers to tackle any project with confidence, precision, and efficiency.",

  mission:
    "At Exar, our mission is to provide businesses in the Middle East & Africa with the highest quality tools and machinery, fostering growth, innovation, and operational excellence. We are dedicated to delivering exceptional products, unparalleled service, and expertise to empower our customers' success, while promoting sustainability and advancing industry standards.",

  benefits: [
    {
      title: "Quality Control",
      number: "01",
      description:
        "Every product we stock comes from manufacturers with proven track records for dependability and performance. You buy with confidence.",
    },
    {
      title: "Wide Range",
      number: "02",
      description:
        "From precision instruments to heavy machinery, we offer everything your industrial and construction projects require — under one roof.",
    },
    {
      title: "Exceptional Support",
      number: "03",
      description:
        "Our team is available 24×7 to answer technical questions, process orders, and resolve issues. Your operations never have to wait.",
    },
    {
      title: "Reliable Partnerships",
      number: "04",
      description:
        "We work directly with industry-leading manufacturers and authorized distributors to deliver products that meet the highest standards.",
    },
  ],

  stats: [
    { value: "Since 2015", label: "Established" },
    { value: "3", label: "Locations" },
    { value: "20+", label: "Product Categories" },
    { value: "40+", label: "Partner Brands" },
  ],
} as const;
