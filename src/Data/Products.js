import { BoatP } from "./Boat";
// import { AppleP } from "./Apple";

export const product = [
  {
    cart: null,
    fav: null,
    productCount: null,
    topDeals: "yes",
    brand: "Boat",
    file: BoatP.boat1,
    spec: BoatP.boat1.spec,
  },
  // {
  //   cart: null,
  //   fav: null,
  //   productCount: null,
  //   topDeals: "yes",
  //   brand: "Apple",
  //   file: AppleP.apple1,
  //   spec: AppleP.apple1.spec,
  // },
  {
    cart: null,
    fav: null,
    productCount: null,
    topDeals: "yes",
    brand: "Boat",
    file: BoatP.boat2,
    spec: BoatP.boat2.spec,
  },
  {
    cart: null,
    fav: null,
    productCount: null,
    topDeals: "yes",
    brand: "Boat",
    file: BoatP.boat3,
    spec: BoatP.boat3.spec,
  },
  // {
  //   cart: null,
  //   fav: null,
  //   productCount: null,
  //   topDeals: "yes",
  //   brand: "Apple",
  //   file: AppleP.apple2,
  //   spec: AppleP.apple2.spec,
  // },
  {
    cart: null,
    fav: null,
    productCount: null,
    topDeals: "yes",
    brand: "Boat",
    file: BoatP.boat4,
    spec: BoatP.boat4.spec,
  },
  {
    cart: null,
    fav: null,
    productCount: null,
    topDeals: "yes",
    brand: "Boat",
    file: BoatP.boat5,
    spec: BoatP.boat5.spec,
  },
  {
    cart: null,
    fav: null,
    productCount: null,
    topDeals: null,
    brand: "Boat",
    file: BoatP.boat6,
    spec: BoatP.boat6.spec,
  },
  {
    cart: null,
    fav: null,
    productCount: null,
    topDeals: null,
    brand: "Boat",
    file: BoatP.boat7,
    spec: BoatP.boat7.spec,
  },
  {
    cart: null,
    fav: null,
    productCount: null,
    topDeals: null,
    brand: "Boat",
    file: BoatP.boat8,
    spec: BoatP.boat8.spec,
  },
  {
    cart: null,
    fav: null,
    productCount: null,
    topDeals: null,
    brand: "Boat",
    file: BoatP.boat9,
    spec: BoatP.boat9.spec,
  },
  {
    cart: null,
    fav: null,
    productCount: null,
    topDeals: null,
    brand: "Boat",
    file: BoatP.boat10,
    spec: BoatP.boat10.spec,
  },
].map((item, index) => ({
  ...item,
  id: "fashion0" + index,
}));
