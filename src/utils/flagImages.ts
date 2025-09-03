// Flag image URLs (you can use any flag image service)
export const flagImageUrls: Record<string, string> = {
  US: "https://flagcdn.com/w20/us.png",
  GB: "https://flagcdn.com/w20/gb.png",
  CA: "https://flagcdn.com/w20/ca.png",
  AU: "https://flagcdn.com/w20/au.png",
  DE: "https://flagcdn.com/w20/de.png",
  FR: "https://flagcdn.com/w20/fr.png",
  // Add more countries as needed
};

// Helper function to get flag image URL
export const getFlagImageUrl = (countryCode: string): string => {
  return (
    flagImageUrls[countryCode] ||
    `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`
  );
};
