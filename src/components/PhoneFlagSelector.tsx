import React, { useEffect, useState } from "react";
import { countryData } from "../data/countries";
import { Country, PhoneFlagSelectorProps } from "../types";
import CountryCodeSelector from "./CountryCodeSelector";

export type { PhoneFlagSelectorProps } from "../types";

const PhoneFlagSelector: React.FC<PhoneFlagSelectorProps> = ({
  value = "",
  onChange,
  placeholder = "Enter phone number",
  className = "",
  disabled = false,
  searchable = true,
  showFlag = true,
  showDialCode = true,
  useFlagImages = false,
  flagSize = 16,
  defaultCountry = "US",
  preferredCountries = [],
  excludeCountries = [],
  inputProps = {},
  dropdownProps = {},
}) => {
  const [phoneNumber, setPhoneNumber] = useState(value);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();

  // Initialize selected country
  useEffect(() => {
    if (!selectedCountry) {
      const defaultCountryData = countryData.find(
        (country) => country.code === defaultCountry
      );
      if (defaultCountryData) {
        setSelectedCountry(defaultCountryData);
      }
    }
  }, [defaultCountry, selectedCountry]);

  // Update phone number when value prop changes
  useEffect(() => {
    setPhoneNumber(value);
  }, [value]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPhoneNumber(newValue);

    // Call onChange with the full phone number (country code + number)
    const fullNumber = selectedCountry
      ? `${selectedCountry.dialCode}${newValue}`
      : newValue;
    onChange?.(fullNumber, selectedCountry!);
  };

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);

    // Call onChange with the full phone number (country code + current number)
    const fullNumber = `${country.dialCode}${phoneNumber}`;
    onChange?.(fullNumber, country);
  };

  // Extract phone number without country code for display
  const displayPhoneNumber =
    selectedCountry && phoneNumber.startsWith(selectedCountry.dialCode)
      ? phoneNumber.substring(selectedCountry.dialCode.length)
      : phoneNumber;

  return (
    <div className={`phone-flag-selector ${className}`}>
      <div className="phone-input-container">
        <CountryCodeSelector
          value={selectedCountry}
          onChange={handleCountryChange}
          disabled={disabled}
          searchable={searchable}
          showFlag={showFlag}
          showDialCode={showDialCode}
          useFlagImages={useFlagImages}
          flagSize={flagSize}
          defaultCountry={defaultCountry}
          preferredCountries={preferredCountries}
          excludeCountries={excludeCountries}
          dropdownProps={dropdownProps}
        />
        <input
          type="tel"
          value={displayPhoneNumber}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          disabled={disabled}
          className="phone-input"
          {...inputProps}
        />
      </div>
    </div>
  );
};

export default PhoneFlagSelector;
