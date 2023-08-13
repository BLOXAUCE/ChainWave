import BestPlace from "../assets/bestPlace.jpg";
import BestCar from "../assets/bestCar.jpeg";
import BestCoffe from "../assets/bestCoffe.jpg";
import BestGirl from "../assets/bestGirl.jpg";
import BestLunch from "../assets/bestLunch.jpg";

export function isMobileDevice() {
  const pattern = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];
  return pattern.some((toMatch) => {
    return navigator.userAgent.match(toMatch);
  });
}

export function getShortAddressString(address) {
  return (
    address.substring(0, 5) + "..." + address.substring(address.length - 4)
  );
}

export const ProjectName = {
  1: "What is best car",
  2: "Best lunch in Bloxauce",
  3: "Best girl in class",
  4: "Best date with girl",
  5: "Best coffe beans",
};

export const ProjectPhoto = {
  1: BestCar,
  2: BestLunch,
  3: BestGirl,
  4: BestPlace,
  5: BestCoffe,
};

export const ProjectItems = {
  1: [
    "Lamborghini",
    "Skoda",
    "Mercedes",
    "Ford",
    "Toyota",
    "BMW",
    "Honda",
    "Chevrolet",
  ],
  2: ["Burger", "Pizza", "Sushi", "Sandwich", "Salad"],
  3: ["Emma", "Olivia", "Sophia", "Ava", "Isabella", "Mia"],
  4: ["Pub", "Coffe bar"],
  5: [
    "Ethiopian Yirgacheffe",
    "Colombian Supremo",
    "Kenyan AA",
    "Guatemalan Antigua",
  ],
};
