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
