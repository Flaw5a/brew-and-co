import { MenuItem } from "./types";

export const menuItems: MenuItem[] = [
  { id: 1,  category: "Espresso",    name: "Espresso",               description: "Single shot of our house-blend. Bright, clean finish.",                                              price: 2.50, badge: "House Blend"    },
  { id: 2,  category: "Espresso",    name: "Double Espresso",        description: "Two ristretto pulls — full-bodied with a long caramel finish.",                                       price: 3.20, badge: ""               },
  { id: 3,  category: "Espresso",    name: "Macchiato",              description: "Espresso with a single dash of steamed milk foam.",                                                   price: 3.00, badge: ""               },
  { id: 4,  category: "Espresso",    name: "Cortado",                description: "Equal parts espresso and warm whole milk. Balanced and smooth.",                                      price: 3.50, badge: "Popular"         },
  { id: 5,  category: "Drinks",      name: "Flat White",             description: "Double ristretto shots with velvety microfoam poured to the rim.",                                    price: 4.20, badge: "Popular"         },
  { id: 6,  category: "Drinks",      name: "Cappuccino",             description: "Classic thirds — espresso, steamed milk, and a generous foam cap.",                                   price: 4.00, badge: ""               },
  { id: 7,  category: "Drinks",      name: "Oat Milk Latte",         description: "Smooth espresso with steamed oat milk. Naturally sweet.",                                             price: 4.50, badge: "House Favourite" },
  { id: 8,  category: "Drinks",      name: "Americano",              description: "Espresso lengthened with hot water. Clean and easy drinking.",                                        price: 3.20, badge: ""               },
  { id: 9,  category: "Cold Drinks", name: "Iced Latte",             description: "Two espresso shots over ice with cold whole milk.",                                                   price: 4.80, badge: "Popular"         },
  { id: 10, category: "Cold Drinks", name: "Cold Brew",              description: "18-hour steeped house blend served over ice. Smooth and low-acid.",                                   price: 5.00, badge: "House Favourite" },
  { id: 11, category: "Cold Drinks", name: "Iced Matcha Latte",      description: "Japanese ceremonial matcha whisked with oat milk over ice.",                                          price: 5.20, badge: ""               },
  { id: 12, category: "Cold Drinks", name: "Sparkling Lemonade",     description: "Cold-pressed lemon juice with sparkling water and a hint of mint.",                                   price: 3.80, badge: ""               },
  { id: 13, category: "Pastries",    name: "Butter Croissant",       description: "Freshly baked all-butter pastry. Flaky outside, soft inside.",                                        price: 3.20, badge: "Popular"         },
  { id: 14, category: "Pastries",    name: "Pain au Chocolat",       description: "Two layers of dark Valrhona chocolate in buttery laminated dough.",                                   price: 3.50, badge: ""               },
  { id: 15, category: "Pastries",    name: "Banana Bread",           description: "Moist loaf with walnuts and a dusting of dark sugar. Warming spice.",                                 price: 3.80, badge: "House Favourite" },
  { id: 16, category: "Pastries",    name: "Almond Danish",          description: "Open pastry filled with almond frangipane and flaked almonds.",                                       price: 3.80, badge: ""               },
  { id: 17, category: "Sandwiches",  name: "Sourdough BLT",          description: "Smoked streaky bacon, gem lettuce, beef tomato, and house aioli on sourdough.",                       price: 7.50, badge: "Popular"         },
  { id: 18, category: "Sandwiches",  name: "Avocado Toast",          description: "Smashed avocado, chilli flakes, lemon zest, and a poached egg on toasted sourdough.",                price: 8.50, badge: "House Favourite" },
  { id: 19, category: "Sandwiches",  name: "Toasted Mature Cheddar", description: "Mature cheddar and grain mustard on thick-cut white bloomer. Served warm.",                          price: 6.50, badge: ""               },
  { id: 20, category: "Sandwiches",  name: "Chicken Pesto Wrap",     description: "Grilled chicken breast, sun-dried tomato pesto, rocket and parmesan in a spinach wrap.",             price: 8.00, badge: ""               },
];

export const categories = [...new Set(menuItems.map((item) => item.category))];

export const popularItems = menuItems.filter(
  (item) => item.badge === "Popular" || item.badge === "House Favourite"
);

export const categoryImages: Record<string, string> = {
  Espresso:      "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800",
  Drinks:        "https://images.pexels.com/photos/350478/pexels-photo-350478.jpeg?auto=compress&cs=tinysrgb&w=800",
  "Cold Drinks": "https://images.pexels.com/photos/1187317/pexels-photo-1187317.jpeg?auto=compress&cs=tinysrgb&w=800",
  Pastries:      "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800",
  Sandwiches:    "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=800",
};
