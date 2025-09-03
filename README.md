# React Phone Flag Selector

A modern React component for selecting country codes with flags for phone numbers. Built with TypeScript and featuring a beautiful, accessible UI.

## Features

- 🌍 **200+ Countries**: Comprehensive list of countries with flags and dial codes
- 🎨 **Modern UI**: Clean, responsive design with smooth animations
- 🔍 **Searchable**: Quick search through countries by name, code, or dial code
- 📱 **Phone Input**: Combined country selector with phone number input
- ♿ **Accessible**: Keyboard navigation and screen reader support
- 📦 **TypeScript**: Full TypeScript support with type definitions
- 🎯 **Customizable**: Extensive props for styling and behavior
- 📱 **Responsive**: Mobile-friendly design
- 🏳️ **Flag Support**: Both emoji flags and image flags supported
- 🖼️ **Flag Images**: Optional flag images from flagcdn.com with emoji fallback

## Installation

```bash
npm install react-phone-flag
```

## Usage

### Basic Country Code Selector

```tsx
import { CountryCodeSelector } from "react-phone-flag";

function App() {
  const handleCountryChange = (country) => {
    console.log("Selected country:", country);
  };

  return (
    <CountryCodeSelector onChange={handleCountryChange} defaultCountry="US" />
  );
}
```

### Phone Number Input with Country Selector

```tsx
import { PhoneFlagSelector } from "react-phone-flag";

function App() {
  const handlePhoneChange = (phoneNumber, country) => {
    console.log("Phone number:", phoneNumber);
    console.log("Country:", country);
  };

  return (
    <PhoneFlagSelector
      onChange={handlePhoneChange}
      placeholder="Enter your phone number"
      defaultCountry="US"
    />
  );
}
```

### Advanced Usage with Flag Images

```tsx
import { PhoneFlagSelector } from "react-phone-flag";

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <PhoneFlagSelector
      value={phoneNumber}
      onChange={(number, country) => setPhoneNumber(number)}
      defaultCountry="GB"
      preferredCountries={["US", "GB", "CA"]}
      excludeCountries={["KP"]}
      showFlag={true}
      showDialCode={true}
      searchable={true}
      disabled={false}
      placeholder="Enter phone number"
      className="custom-phone-input"
      useFlagImages={true} // Use flag images instead of emojis
      flagSize={20} // Set flag size in pixels
      inputProps={{
        maxLength: 15,
        pattern: "[0-9]*",
      }}
    />
  );
}
```

### Using the Flag Component Directly

```tsx
import { Flag } from "react-phone-flag";

function App() {
  return (
    <div>
      {/* Emoji flag */}
      <Flag countryCode="US" emoji="🇺🇸" useImages={false} size={16} />

      {/* Image flag */}
      <Flag countryCode="US" emoji="🇺🇸" useImages={true} size={20} />
    </div>
  );
}
```

## Props

### CountryCodeSelector Props

| Prop                 | Type                         | Default     | Description                       |
| -------------------- | ---------------------------- | ----------- | --------------------------------- |
| `value`              | `Country`                    | `undefined` | Currently selected country        |
| `onChange`           | `(country: Country) => void` | `undefined` | Callback when country changes     |
| `className`          | `string`                     | `''`        | Additional CSS class              |
| `disabled`           | `boolean`                    | `false`     | Disable the selector              |
| `searchable`         | `boolean`                    | `true`      | Enable search functionality       |
| `showFlag`           | `boolean`                    | `true`      | Show country flags                |
| `showDialCode`       | `boolean`                    | `true`      | Show dial codes                   |
| `useFlagImages`      | `boolean`                    | `false`     | Use flag images instead of emojis |
| `flagSize`           | `number`                     | `16`        | Size of flag in pixels            |
| `defaultCountry`     | `string`                     | `'US'`      | Default country code              |
| `preferredCountries` | `string[]`                   | `[]`        | Countries to show first           |
| `excludeCountries`   | `string[]`                   | `[]`        | Countries to exclude              |
| `dropdownProps`      | `HTMLAttributes`             | `{}`        | Props for dropdown container      |

### PhoneFlagSelector Props

| Prop                 | Type                                        | Default                | Description                         |
| -------------------- | ------------------------------------------- | ---------------------- | ----------------------------------- |
| `value`              | `string`                                    | `''`                   | Phone number value                  |
| `onChange`           | `(value: string, country: Country) => void` | `undefined`            | Callback when phone/country changes |
| `placeholder`        | `string`                                    | `'Enter phone number'` | Input placeholder                   |
| `className`          | `string`                                    | `''`                   | Additional CSS class                |
| `disabled`           | `boolean`                                   | `false`                | Disable the input                   |
| `searchable`         | `boolean`                                   | `true`                 | Enable search functionality         |
| `showFlag`           | `boolean`                                   | `true`                 | Show country flags                  |
| `showDialCode`       | `boolean`                                   | `true`                 | Show dial codes                     |
| `useFlagImages`      | `boolean`                                   | `false`                | Use flag images instead of emojis   |
| `flagSize`           | `number`                                    | `16`                   | Size of flag in pixels              |
| `defaultCountry`     | `string`                                    | `'US'`                 | Default country code                |
| `preferredCountries` | `string[]`                                  | `[]`                   | Countries to show first             |
| `excludeCountries`   | `string[]`                                  | `[]`                   | Countries to exclude                |
| `inputProps`         | `InputHTMLAttributes`                       | `{}`                   | Props for phone input               |
| `dropdownProps`      | `HTMLAttributes`                            | `{}`                   | Props for dropdown container        |

### Flag Component Props

| Prop          | Type      | Default | Description                       |
| ------------- | --------- | ------- | --------------------------------- |
| `countryCode` | `string`  | -       | ISO country code (e.g., "US")     |
| `emoji`       | `string`  | `"🏳️"`  | Flag emoji fallback               |
| `useImages`   | `boolean` | `false` | Use flag images instead of emojis |
| `size`        | `number`  | `16`    | Size of flag in pixels            |
| `className`   | `string`  | `""`    | Additional CSS class              |

## Country Data Structure

```typescript
interface Country {
  name: string; // Country name (e.g., "United States")
  code: string; // ISO country code (e.g., "US")
  dialCode: string; // Phone dial code (e.g., "+1")
  flag: string; // Flag emoji (e.g., "🇺🇸")
  format?: string; // Optional phone format
}
```

## Styling

The components come with modern, clean styling that matches contemporary design patterns. The styling includes:

- **Modern Design**: Clean, rounded corners with smooth animations
- **Search Functionality**: Search input with magnifying glass icon
- **Responsive**: Works perfectly on mobile and desktop
- **Dark Mode Support**: Automatic dark mode detection
- **Accessibility**: Proper focus states and keyboard navigation

### Custom Styling

You can customize the appearance by overriding the CSS classes:

```css
/* Main container */
.phone-flag-selector {
}

/* Input container */
.phone-input-container {
}

/* Country selector trigger */
.selector-trigger {
}

/* Dropdown */
.dropdown {
}

/* Search input */
.search-input {
}

/* Country options */
.country-option {
}
```

### Example: Custom Theme

```css
.phone-input-container {
  border-radius: 8px;
  border-color: #e2e8f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.selector-trigger {
  background-color: #f8fafc;
}

.dropdown {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.search-container {
  background-color: #fafafa;
  border-bottom-color: #f0f0f0;
}
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
