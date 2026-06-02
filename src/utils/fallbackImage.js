/* eslint-disable no-unused-vars */
const titleToImageMap = {
  "Men Premium Jacket.":
    "https://loremflickr.com/500/600/men,jacket/all?lock=1",
  "Premium Jacket.":
    "https://loremflickr.com/500/600/jacket,fashion/all?lock=2",
  "Kids Premium Jacket.":
    "https://loremflickr.com/500/600/kids,jacket/all?lock=3",
  "Home Premium Cloths.":
    "https://loremflickr.com/500/600/clothing,home/all?lock=4",
  "Weeding Premium Cloths.":
    "https://loremflickr.com/500/600/wedding,clothing/all?lock=5",
  "Travelling Premium Cloths.":
    "https://loremflickr.com/500/600/travel,clothing/all?lock=6",
  "Men Premium Trending t-sharts.":
    "https://loremflickr.com/500/600/men,tshirt/all?lock=7",
  "Men Premium Trending sleeves t-shart.":
    "https://loremflickr.com/500/600/men,tshirt,sleeves/all?lock=8",
  "Women Premium Saree.":
    "https://loremflickr.com/500/600/women,saree/all?lock=9",
  "Women Premium Dress.":
    "https://loremflickr.com/500/600/women,dress/all?lock=10",
  "Men Premium Trending jens t-shart.":
    "https://loremflickr.com/500/600/men,jeans,tshirt/all?lock=11",
  "Men Trending Safari.":
    "https://loremflickr.com/500/600/men,safari,suit/all?lock=12",
  "Men Trending Safari pant.":
    "https://loremflickr.com/500/600/men,safari,pants/all?lock=13",
  "Women.": "https://loremflickr.com/500/600/women,fashion/all?lock=14",
  "Women party dress.":
    "https://loremflickr.com/500/600/women,party,dress/all?lock=15",
  "Girls frokes.": "https://loremflickr.com/500/600/girl,frock/all?lock=16",
  "Kids Premium coat.": "https://loremflickr.com/500/600/kids,coat/all?lock=17",
  "Kids Premium coat+pant.":
    "https://loremflickr.com/500/600/kids,coat,pant/all?lock=18",
  "Kids t-shart.": "https://loremflickr.com/500/600/kids,tshirt/all?lock=19",
  "Electronics primium jocket":
    "https://loremflickr.com/500/600/jacket,tech/all?lock=20",
  "Electronics primium jocket+pant":
    "https://loremflickr.com/500/600/jacket,pants/all?lock=21",
  "Home primium t-shart":
    "https://loremflickr.com/500/600/tshirt,home/all?lock=22",
  "Home primium lower":
    "https://loremflickr.com/500/600/sweatpants/all?lock=23",
  "Home primium Jens": "https://loremflickr.com/500/600/jeans,home/all?lock=24",
  "Weeding dress": "https://loremflickr.com/500/600/wedding,dress/all?lock=25",
  "Weeding party dress":
    "https://loremflickr.com/500/600/wedding,dress/all?lock=26",
  "Weeding Ceremoney saree":
    "https://loremflickr.com/500/600/wedding,saree/all?lock=27",
  "Jens little baby": "https://loremflickr.com/500/600/baby,jeans/all?lock=28",
};

const defaultImage =
  "http://res.cloudinary.com/dptfwcnro/image/upload/v1683911125/E-comm%20ATTIREX/Womens-Category_iscqhs.jpg";

export const getFallbackImage = (seed = "") => {
  if (titleToImageMap[seed]) {
    return titleToImageMap[seed];
  }

  const lSeed = seed.toLowerCase();

  let keyword = "clothing";
  if (lSeed.includes("kid") || lSeed.includes("baby") || lSeed.includes("girl"))
    keyword = "kids,clothing";
  else if (lSeed.includes("men")) keyword = "men,clothing";
  else if (
    lSeed.includes("women") ||
    lSeed.includes("saree") ||
    lSeed.includes("dress")
  )
    keyword = "women,clothing";

  if (lSeed.includes("jacket")) keyword += ",jacket";
  if (
    lSeed.includes("pant") ||
    lSeed.includes("jeans") ||
    lSeed.includes("jens")
  )
    keyword += ",pants";

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  return `https://loremflickr.com/500/600/${keyword}/all?lock=${Math.abs(hash) % 1000}`;
};
