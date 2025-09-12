import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Globe, Map, MapPin, Search, ChevronDown } from "lucide-react";
import styles from "./DestinationStep.module.css";
import { fadeInUp, staggerContainer } from "../motion";

// TODO: Replace with API call - keep this structure for easy swapping
const LOCATION_DATA = {
  "United States": {
    "California": ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "Oakland"],
    "New York": ["New York City", "Buffalo", "Rochester", "Syracuse", "Albany"],
    "Texas": ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth"],
    "Florida": ["Miami", "Tampa", "Orlando", "Jacksonville", "Tallahassee"],
    "Illinois": ["Chicago", "Springfield", "Rockford", "Peoria", "Elgin"]
  },
  "United Kingdom": {
    "England": ["London", "Manchester", "Birmingham", "Leeds", "Liverpool"],
    "Scotland": ["Edinburgh", "Glasgow", "Aberdeen", "Dundee", "Stirling"],
    "Wales": ["Cardiff", "Swansea", "Newport", "Wrexham", "Bangor"],
    "Northern Ireland": ["Belfast", "Derry", "Lisburn", "Newry", "Carrickfergus"]
  },
  "Canada": {
    "Ontario": ["Toronto", "Ottawa", "Hamilton", "London", "Windsor"],
    "Quebec": ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil"],
    "British Columbia": ["Vancouver", "Victoria", "Surrey", "Burnaby", "Richmond"],
    "Alberta": ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "Medicine Hat"]
  },
  "Australia": {
    "New South Wales": ["Sydney", "Newcastle", "Wollongong", "Tamworth", "Albury"],
    "Victoria": ["Melbourne", "Geelong", "Ballarat", "Bendigo", "Shepparton"],
    "Queensland": ["Brisbane", "Gold Coast", "Townsville", "Cairns", "Toowoomba"],
    "Western Australia": ["Perth", "Fremantle", "Bunbury", "Geraldton", "Kalgoorlie"]
  },
  "Germany": {
    "Bavaria": ["Munich", "Nuremberg", "Augsburg", "Würzburg", "Regensburg"],
    "North Rhine-Westphalia": ["Cologne", "Düsseldorf", "Dortmund", "Essen", "Duisburg"],
    "Baden-Württemberg": ["Stuttgart", "Mannheim", "Karlsruhe", "Freiburg", "Heidelberg"],
    "Berlin": ["Berlin Center", "Charlottenburg", "Kreuzberg", "Prenzlauer Berg", "Mitte"]
  },
  "France": {
    "Île-de-France": ["Paris", "Boulogne-Billancourt", "Saint-Denis", "Argenteuil", "Versailles"],
    "Provence-Alpes-Côte d'Azur": ["Marseille", "Nice", "Toulon", "Aix-en-Provence", "Antibes"],
    "Auvergne-Rhône-Alpes": ["Lyon", "Saint-Étienne", "Grenoble", "Villeurbanne", "Clermont-Ferrand"],
    "Nouvelle-Aquitaine": ["Bordeaux", "Limoges", "Poitiers", "La Rochelle", "Pau"]
  },
  "Japan": {
    "Tokyo": ["Tokyo", "Shibuya", "Shinjuku", "Harajuku", "Akihabara"],
    "Osaka": ["Osaka City", "Sakai", "Higashiosaka", "Hirakata", "Suita"],
    "Kyoto": ["Kyoto City", "Uji", "Kameoka", "Joyo", "Mukō"],
    "Hokkaido": ["Sapporo", "Hakodate", "Asahikawa", "Kushiro", "Tomakomai"]
  },
  "Brazil": {
    "São Paulo": ["São Paulo", "Guarulhos", "Campinas", "São Bernardo do Campo", "Osasco"],
    "Rio de Janeiro": ["Rio de Janeiro", "Nova Iguaçu", "Niterói", "Belford Roxo", "Campos dos Goytacazes"],
    "Minas Gerais": ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim"],
    "Bahia": ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Juazeiro"]
  },
  "India": {
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
    "Delhi": ["New Delhi", "Old Delhi", "Dwarka", "Rohini", "Karol Bagh"]
  },
  "China": {
    "Beijing": ["Beijing City", "Chaoyang", "Haidian", "Dongcheng", "Xicheng"],
    "Shanghai": ["Shanghai City", "Pudong", "Huangpu", "Xuhui", "Changning"],
    "Guangdong": ["Guangzhou", "Shenzhen", "Dongguan", "Foshan", "Zhongshan"],
    "Sichuan": ["Chengdu", "Mianyang", "Deyang", "Nanchong", "Yibin"]
  },
  "Nigeria": {
    "Lagos": ["Lagos Island", "Victoria Island", "Ikeja", "Lekki", "Surulere"],
    "Kano": ["Kano City", "Fagge", "Dala", "Gwale", "Tarauni"],
    "Rivers": ["Port Harcourt", "Obio-Akpor", "Okrika", "Oyigbo", "Eleme"],
    "Federal Capital Territory": ["Abuja", "Gwagwalada", "Kuje", "Abaji", "Kwali"]
  }
};

const SearchableDropdown = ({ 
  value, 
  onChange, 
  options, 
  placeholder, 
  icon: Icon, 
  disabled = false,
  optional = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    return options.filter(option => 
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = () => {
    onChange("");
    setSearchTerm("");
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownLabel}>
        <Icon size={18} />
        <span>{placeholder}</span>
        {optional && <span className={styles.optional}>(Optional)</span>}
      </div>
      
      <div className={styles.dropdownContainer}>
        <button
          type="button"
          className={`${styles.dropdownTrigger} ${isOpen ? styles.open : ''} ${disabled ? styles.disabled : ''}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className={value ? styles.selected : styles.placeholder}>
            {value || `Select ${placeholder.toLowerCase()}...`}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={styles.dropdownMenu}
            >
              <div className={styles.searchContainer}>
                <Search size={16} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder={`Search ${placeholder.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                  autoFocus
                />
              </div>

              <div className={styles.optionsList}>
                {optional && (
                  <button
                    type="button"
                    className={styles.option}
                    onClick={handleClear}
                  >
                    <span className={styles.skipOption}>Skip this step</span>
                  </button>
                )}
                
                {filteredOptions.map((option, index) => (
                  <motion.button
                    key={option}
                    type="button"
                    className={`${styles.option} ${value === option ? styles.selected : ''}`}
                    onClick={() => handleSelect(option)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    {option}
                  </motion.button>
                ))}
                
                {filteredOptions.length === 0 && (
                  <div className={styles.noResults}>
                    No results found
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function SelectLocation() {
  const { state, dispatch } = useOutletContext();
  const navigate = useNavigate();
  
  const [selectedCountry, setSelectedCountry] = useState(state.location?.country || "");
  const [selectedState, setSelectedState] = useState(state.location?.state || "");
  const [selectedLocalGov, setSelectedLocalGov] = useState(state.location?.localGov || "");
  const [locationName, setLocationName] = useState(state.location?.name || "");
  const [touched, setTouched] = useState(false);

  // Get available options based on selections
  const countries = Object.keys(LOCATION_DATA);
  const states = selectedCountry ? Object.keys(LOCATION_DATA[selectedCountry] || {}) : [];
  const localGovs = (selectedCountry && selectedState) ? 
    (LOCATION_DATA[selectedCountry]?.[selectedState] || []) : [];

  // Reset dependent selections when parent changes
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedLocalGov("");
    setTouched(true);
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedLocalGov("");
  };

  const handleLocalGovChange = (localGov) => {
    setSelectedLocalGov(localGov);
  };

  const handleLocationNameChange = (e) => {
    setLocationName(e.target.value);
    setTouched(true);
  };

  // Check if user can proceed (country + location name required)
  const canProceed = selectedCountry && locationName.trim();

  const handleNext = () => {
    if (!canProceed) return;

    const locationData = {
      country: selectedCountry,
      state: selectedState || null,
      localGov: selectedLocalGov || null,
      name: locationName.trim()
    };

    dispatch({ type: "setField", field: "destination", value: locationData });
    navigate("/onboarding/dates");
  };

  return (
    <motion.div
      className={styles.locationPage}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      aria-label="Select your location"
    >
      <motion.h1 variants={fadeInUp} className={styles.title}>
        Where are you located?
      </motion.h1>
      <motion.p variants={fadeInUp} className={styles.subtext}>
        Help us provide better recommendations by selecting your location.
      </motion.p>

      <motion.div variants={fadeInUp} className={styles.formSection}>
        {/* Step 1: Country Selection */}
        <SearchableDropdown
          value={selectedCountry}
          onChange={handleCountryChange}
          options={countries}
          placeholder="Country"
          icon={Globe}
        />

        {/* Step 2: State Selection (Optional) */}
        <AnimatePresence mode="wait">
          {selectedCountry && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <SearchableDropdown
                value={selectedState}
                onChange={handleStateChange}
                options={states}
                placeholder="State/Province"
                icon={Map}
                optional={true}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Local Government (Optional) */}
        <AnimatePresence mode="wait">
          {selectedCountry && selectedState && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
            >
              <SearchableDropdown
                value={selectedLocalGov}
                onChange={handleLocalGovChange}
                options={localGovs}
                placeholder="Local Government"
                icon={MapPin}
                optional={true}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 4: Location Name (Required) */}
        <AnimatePresence mode="wait">
          {selectedCountry && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
              className={styles.locationNameSection}
            >
              <div className={styles.inputLabel}>
                <MapPin size={18} />
                <span>Specific Location</span>
                <span className={styles.required}>*Required</span>
              </div>
              <input
                type="text"
                value={locationName}
                onChange={handleLocationNameChange}
                placeholder="Enter city, town, or specific destination..."
                className={styles.locationInput}
                required
              />
              <p className={styles.inputHint}>
                Enter your exact location (e.g., "Downtown Manhattan" or "Bondi Beach")
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div variants={fadeInUp} className={styles.nextNav}>
        <motion.button
          className={styles.nextBtn}
          type="button"
          onClick={handleNext}
          disabled={!canProceed}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.1 }}
        >
          Next
        </motion.button>
      </motion.div>
    </motion.div>
  );
}