export interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
  format?: string;
}

export interface PhoneFlagSelectorProps {
  value?: string;
  onChange?: (value: string, country: Country) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  searchable?: boolean;
  showFlag?: boolean;
  showDialCode?: boolean;
  useFlagImages?: boolean;
  flagSize?: number;
  defaultCountry?: string;
  preferredCountries?: string[];
  excludeCountries?: string[];
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  dropdownProps?: React.HTMLAttributes<HTMLDivElement>;
}

export interface CountryCodeSelectorProps {
  value?: Country;
  onChange?: (country: Country) => void;
  className?: string;
  disabled?: boolean;
  searchable?: boolean;
  showFlag?: boolean;
  showDialCode?: boolean;
  useFlagImages?: boolean;
  flagSize?: number;
  defaultCountry?: string;
  preferredCountries?: string[];
  excludeCountries?: string[];
  dropdownProps?: React.HTMLAttributes<HTMLDivElement>;
}
