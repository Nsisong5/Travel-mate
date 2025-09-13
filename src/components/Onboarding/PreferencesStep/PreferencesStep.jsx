import React, { useState } from "react";
import { motion } from "framer-motion";
import { useOutletContext, useNavigate } from "react-router-dom";
import styles from "./PreferencesStep.module.css";
import { fadeInUp, staggerContainer } from "../motion";
import { Users, Plus, Minus } from "lucide-react";
// Budget field dynamic width calculation helper
function computeBudgetInputWidth(val) {
  const base = 80;
  const add = Math.min(9, String(val).length - 2) * 12;
  return `${Math.min(base + add, 200)}px`;
}

const BUDGETS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];
const STYLES = [
  { value: "leisure", label: "Leisure" },
  { value: "adventure", label: "Adventure" },
  { value: "cultural", label: "Cultural" },
];

export default function PreferencesStep() {
  const { state, dispatch } = useOutletContext();
  const navigate = useNavigate();
  const [setBudgetNow, setSetBudgetNow] = useState(false);

  const handleChange = (field) => (e) => {
    dispatch({ type: "setField", field, value: e.target.value });
  };

  const handleTravelersChange = (delta) => {
    dispatch({
      type: "setField",
      field: "travelers",
      value: Math.max(1, Math.min(20, Number(state.travelers || 1) + delta)),
    });
  };

  const handleBudgetSet = (v) => {
    dispatch({ type: "setField", field: "budget_amount", value: v });
  };

  const handleBudgetSkip = () => {
    setSetBudgetNow(false);
    dispatch({ type: "setField", field: "budget_amount", value: "" });
  };

  return (
    <motion.div
      className={styles.preferencesPage}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      aria-label="Select trip preferences"
    >
      <motion.h1 variants={fadeInUp} className={styles.title}>
        Set your travel preferences
      </motion.h1>

      <motion.div variants={fadeInUp} className={styles.selectSection}>
        {/* --- Budget Range Dropdown --- */}
        <label htmlFor="budget" className={styles.label}>Budget Range</label>
        <select
          id="budget"
          className={styles.select}
          value={state.budget}
          onChange={handleChange("budget")}
        >
          {BUDGETS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {/* --- Travel Style Dropdown --- */}
        <label htmlFor="style" className={styles.label}>Travel Style</label>
        <select
          id="style"
          className={styles.select}
          value={state.style}
          onChange={handleChange("style")}
        >
          {STYLES.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {/* --- Number of Travelers --- */}
        <label className={styles.label}>Number of Travelers</label>
        <div className={styles.travelersRow}>
          <button
            type="button"
            className={styles.travBtn}
            aria-label="Decrease travelers"
            onClick={() => handleTravelersChange(-1)}
            disabled={Number(state.travelers || 1) <= 1}
          >
            <Minus size={18} />
          </button>
          <input
            type="number"
            min={1}
            max={20}
            className={styles.travelersInput}
            value={state.travelers || 1}
            onChange={e =>
              dispatch({
                type: "setField",
                field: "travelers",
                value: Math.max(1, Math.min(20, Number(e.target.value))),
              })
            }
            aria-label="Number of travelers"
          />
          <button
            type="button"
            className={styles.travBtn}
            aria-label="Increase travelers"
            onClick={() => handleTravelersChange(1)}
            disabled={Number(state.travelers || 1) >= 20}
          >
            <Plus size={18} />
          </button>
          <Users className={styles.travelersIcon} size={20} />
        </div>
        {/* --- Budget Option Section --- */}
        <div className={styles.budgetOptionBox}>
          <div className={styles.budgetPrompt}>
            <span>Set a Trip Budget?</span>
            {!setBudgetNow ? (
              <>
                <button
                  className={styles.budgetAction}
                  type="button"
                  onClick={()=>(navigate("/trip_budget"))}
                >
                  Set Now
                </button>
 
              </>
            ) : (
              <div className={styles.budgetRow}>
                <div className={styles.budgetInputWrap}>
                  <input
                    type="number"
                    min={50}
                    step={10}
                    placeholder="Enter amount (e.g. 1000)"
                    className={styles.budgetInput}
                    value={state.budget_amount || ""}
                    onChange={e => handleBudgetSet(e.target.value)}
                    aria-label="Set trip budget"
                    style={{
                      width: computeBudgetInputWidth(state.budget_amount || ""),
                    }}
                    data-shrink={String(state.budget_amount || "").length > 9}
                  />
                  <span className={styles.currencySymbol}>USD</span>
                </div>
                <button
                  className={styles.budgetActionCancel}
                  type="button"
                  onClick={handleBudgetSkip}
                  aria-label="Cancel budget input"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className={styles.nextNav}>
        <button
          className={styles.nextBtn}
          type="button"
          onClick={() => navigate("/onboarding/summary")}
        >
          Next
        </button>
      </motion.div>
    </motion.div>
  );
}
