"use client";

import React, { useState, useEffect } from "react";
import styles from "./SharedStyles.module.css";

export default function AgeCalculator() {
  const [birthdate, setBirthdate] = useState("1995-10-15");
  const [ageDetails, setAgeDetails] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalHours: number;
    totalWeeks: number;
    nextBirthdayDays: number;
    zodiac: string;
  } | null>(null);

  const getZodiacSign = (day: number, month: number) => {
    const signs = [
      { name: "Capricorn ♑", date: 120 },
      { name: "Aquarius ♒", date: 219 },
      { name: "Pisces  Pisces ♓", date: 320 },
      { name: "Aries ♈", date: 420 },
      { name: "Taurus ♉", date: 521 },
      { name: "Gemini ♊", date: 621 },
      { name: "Cancer ♋", date: 722 },
      { name: "Leo ♌", date: 823 },
      { name: "Virgo ♍", date: 923 },
      { name: "Libra ♎", date: 1023 },
      { name: "Scorpio ♏", date: 1122 },
      { name: "Sagittarius ♐", date: 1222 },
      { name: "Capricorn ♑", date: 1231 },
    ];
    const val = (month + 1) * 100 + day;
    for (let i = 0; i < signs.length; i++) {
      if (val <= signs[i].date) {
        return signs[i].name;
      }
    }
    return "Capricorn ♑";
  };

  const calculateAge = () => {
    if (!birthdate) return;

    const birth = new Date(birthdate);
    const today = new Date();

    if (isNaN(birth.getTime()) || birth > today) {
      setAgeDetails(null);
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      // Days in previous month
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Total lived units
    const totalTimeDiff = today.getTime() - birth.getTime();
    const totalDays = Math.floor(totalTimeDiff / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(totalTimeDiff / (1000 * 60 * 60));
    const totalWeeks = Math.floor(totalDays / 7);

    // Calculate days until next birthday
    const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < today) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    const nextBdayTimeDiff = nextBday.getTime() - today.getTime();
    const nextBirthdayDays = Math.ceil(nextBdayTimeDiff / (1000 * 60 * 60 * 24));

    // Zodiac sign
    const zodiac = getZodiacSign(birth.getDate(), birth.getMonth());

    setAgeDetails({
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalWeeks,
      nextBirthdayDays,
      zodiac,
    });
  };

  useEffect(() => {
    calculateAge();
  }, [birthdate]);

  const handleLoadSample = () => {
    setBirthdate("2000-01-01");
  };

  return (
    <div className={styles.container}>
      <div className={styles.workspace}>
        {/* Date Selector Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Select Date of Birth</span>
            <button onClick={handleLoadSample} className={styles.sampleBtn}>
              Set Y2K Birthday
            </button>
          </div>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className={styles.input}
            style={{ fontSize: "1.1rem", fontWeight: "700" }}
          />

          {ageDetails && (
            <div style={{ marginTop: "12px", borderTop: "1.5px solid var(--border)", paddingTop: "12px" }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
                Current Age
              </div>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--lime-700)" }}>
                {ageDetails.years} Years, {ageDetails.months} Months, {ageDetails.days} Days
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <span className={`${styles.badge} ${styles.badgeSuccess}`} style={{ fontSize: "0.8rem", padding: "6px 12px" }}>
                  Zodiac: {ageDetails.zodiac}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Metrics Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>Life Milestones & Time Metrics</span>
          </div>

          {ageDetails ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                  Days until next birthday
                </div>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>
                  {ageDetails.nextBirthdayDays === 365 || ageDetails.nextBirthdayDays === 0
                    ? "Today is your birthday! Happy Birthday!"
                    : `${ageDetails.nextBirthdayDays} Days`}
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "12px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Total Lived Units
                </span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div style={{ padding: "10px", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)" }}>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Total Weeks</div>
                    <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>{ageDetails.totalWeeks.toLocaleString()}</div>
                  </div>
                  <div style={{ padding: "10px", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)" }}>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Total Days</div>
                    <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>{ageDetails.totalDays.toLocaleString()}</div>
                  </div>
                  <div style={{ padding: "10px", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", gridColumn: "span 2" }}>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Total Hours (Approx)</div>
                    <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>{ageDetails.totalHours.toLocaleString()} Hours</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: "48px", textAlign: "center", border: "1.5px dashed var(--border-dark)", borderRadius: "var(--radius-md)", color: "var(--text-muted)", fontSize: "0.85rem" }}>
              Select a valid date of birth to see detailed milestones.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
