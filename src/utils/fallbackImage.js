/* eslint-disable no-unused-vars */
const titleToImageMap = {
  "Men Premium Jacket.":
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80",
  "Premium Jacket.":
    "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80",
  "Kids Premium Jacket.":
    "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80",
  "Home Premium Cloths.":
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
  "Weeding Premium Cloths.":
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
  "Travelling Premium Cloths.":
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80",
  "Men Premium Trending t-sharts.":
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
  "Men Premium Trending sleeves t-shart.":
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80",
  "Women Premium Saree.":
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
  "Women Premium Dress.":
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80",
  "Men Premium Trending jens t-shart.":
    "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80",
  "Men Trending Safari.":
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80",
  "Men Trending Safari pant.":
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80",
  "Women.":
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80",
  "Women party dress.":
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80",
  "Girls frokes.":
    "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&auto=format&fit=crop&q=80",
  "Kids Premium coat.":
    "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80",
  "Kids Premium coat+pant.":
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=80",
  "Kids t-shart.":
    "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80",
  "Electronics primium jocket":
    "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=600&auto=format&fit=crop&q=80",
  "Electronics primium jocket+pant":
    "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=600&auto=format&fit=crop&q=80",
  "Home primium t-shart":
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80",
  "Home primium lower":
    "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&auto=format&fit=crop&q=80",
  "Home primium Jens":
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80",
  "Weeding dress":
    "https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=600&auto=format&fit=crop&q=80",
  "Weeding party dress":
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop&q=80",
  "Weeding Ceremoney saree":
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80",
  "Jens little baby":
    "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80",
};

const defaultImage =
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&auto=format&fit=crop&q=80";

export const getFallbackImage = (seed = "") => {
  const trimmed = (seed || "").trim();
  if (titleToImageMap[trimmed]) {
    return titleToImageMap[trimmed];
  }

  const lSeed = trimmed.toLowerCase();
  for (const [key, url] of Object.entries(titleToImageMap)) {
    if (key.toLowerCase() === lSeed) {
      return url;
    }
  }

  if (lSeed.includes("kid") || lSeed.includes("baby") || lSeed.includes("girl"))
    return titleToImageMap["Kids Premium Jacket."];
  if (lSeed.includes("saree"))
    return titleToImageMap["Women Premium Saree."];
  if (lSeed.includes("dress"))
    return titleToImageMap["Women Premium Dress."];
  if (lSeed.includes("jacket") || lSeed.includes("jocket") || lSeed.includes("coat"))
    return titleToImageMap["Premium Jacket."];
  if (
    lSeed.includes("pant") ||
    lSeed.includes("jeans") ||
    lSeed.includes("jens") ||
    lSeed.includes("lower")
  )
    return titleToImageMap["Home primium Jens"];
  if (
    lSeed.includes("t-shirt") ||
    lSeed.includes("tshirt") ||
    lSeed.includes("t-shart") ||
    lSeed.includes("shirt")
  )
    return titleToImageMap["Men Premium Trending t-sharts."];
  if (lSeed.includes("wedding") || lSeed.includes("weeding"))
    return titleToImageMap["Weeding dress"];
  if (lSeed.includes("women"))
    return titleToImageMap["Women."];
  if (lSeed.includes("men"))
    return titleToImageMap["Men Premium Trending t-sharts."];

  return defaultImage;
};

export const getProductImage = (product) => {
  if (!product) return defaultImage;
  const img = product.images && product.images[0];
  if (img && typeof img === "string" && !img.includes("pollinations.ai")) {
    return img;
  }
  return getFallbackImage(product.title);
};
