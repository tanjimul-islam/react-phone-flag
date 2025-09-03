import React, { useEffect, useRef, useState } from "react";
import { countryData } from "../data/countries";
import { Country, CountryCodeSelectorProps } from "../types";
import Flag from "./Flag";

export type { CountryCodeSelectorProps } from "../types";

const CountryCodeSelector: React.FC<CountryCodeSelectorProps> = ({
  value,
  onChange,
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
  dropdownProps = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
    value
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Update selected country when value prop changes
  useEffect(() => {
    if (value) {
      setSelectedCountry(value);
    }
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter countries based on search term and exclusions
  const filteredCountries = countryData.filter((country) => {
    const matchesSearch =
      !searchTerm ||
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.dialCode.includes(searchTerm) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase());

    const notExcluded = !excludeCountries.includes(country.code);

    return matchesSearch && notExcluded;
  });

  // Sort countries: preferred first, then alphabetically
  const sortedCountries = [...filteredCountries].sort((a, b) => {
    const aPreferred = preferredCountries.includes(a.code);
    const bPreferred = preferredCountries.includes(b.code);

    if (aPreferred && !bPreferred) return -1;
    if (!aPreferred && bPreferred) return 1;

    return a.name.localeCompare(b.name);
  });

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchTerm("");
    onChange?.(country);
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setSearchTerm("");
      }
    }
  };

  return (
    <div className={`country-code-selector ${className}`} ref={dropdownRef}>
      <div
        className={`selector-trigger ${disabled ? "disabled" : ""} ${
          isOpen ? "open" : ""
        }`}
        onClick={handleToggle}
      >
        {selectedCountry && (
          <div className="selected-country">
            {showFlag && (
              <Flag
                countryCode={selectedCountry.code}
                emoji={selectedCountry.flag}
                useImages={useFlagImages}
                size={flagSize}
                className="flag"
              />
            )}
            {showDialCode && (
              <span className="dial-code">{selectedCountry.dialCode}</span>
            )}
          </div>
        )}
        <span className="arrow">▼</span>
      </div>

      {isOpen && (
        <div className="dropdown" {...dropdownProps}>
          {searchable && (
            <div className="search-container">
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                autoFocus
              />
            </div>
          )}

          <div className="countries-list">
            {sortedCountries.length > 0 ? (
              sortedCountries.map((country) => (
                <div
                  key={country.code}
                  className={`country-option ${
                    selectedCountry?.code === country.code ? "selected" : ""
                  }`}
                  onClick={() => handleCountrySelect(country)}
                >
                  {showFlag && (
                    <Flag
                      countryCode={country.code}
                      emoji={country.flag}
                      useImages={useFlagImages}
                      size={flagSize}
                      className="flag"
                    />
                  )}
                  <span className="country-name">{country.name}</span>
                  {showDialCode && (
                    <span className="dial-code">{country.dialCode}</span>
                  )}
                </div>
              ))
            ) : (
              <div className="no-results">No countries found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryCodeSelector;
