import React, { useState } from "react";
import { BRAKE_TYPES, ROAD_CONDITIONS } from "./../logic/constants.js";
import { calculateBrakingDistance } from "./../logic/calc.js";
import '../style.css'


export default function BrakingCalculator() {
    const [speedKmh, setSpeedKmh]     = useState(100);
    const [mass, setMass]             = useState(1400);
    const [reactionTime, setReaction] = useState(1.0);
    const [brakeId, setBrakeId]       = useState("abs_disc");
    const [roadId, setRoadId]         = useState("dry");
    const brake  = BRAKE_TYPES.find((b) => b.id === brakeId);
    const road   = ROAD_CONDITIONS.find((r) => r.id === roadId);
    const [result, setResult] = useState(() => calculateBrakingDistance(speedKmh, mass, brake.mu, reactionTime, road.factor));


    const rPct = result.totalDistance > 0 ? (result.reactionDistance / result.totalDistance) * 100 : 0;
    const bPct = 100 - rPct;

    return (
        <div className="bc-root">

            <header className="bc-header">
                <h1>Bremswegrechner</h1>
                <p>Berechnung nach realen Physikformeln</p>
            </header>

            <section className="bc-card">
                <h2 className="bc-card-title">Fahrzeug</h2>

                <div className="bc-field">
                    <label htmlFor="speed">Geschwindigkeit</label>
                    <div className="bc-input-row">
                        <input id="speed" type="number" value={speedKmh} min={0} max={400}
                               onChange={(e) => setSpeedKmh(Number(e.target.value))} />
                        <span className="bc-unit">km/h</span>
                    </div>
                </div>

                <div className="bc-field">
                    <label htmlFor="mass">Fahrzeugmasse</label>
                    <div className="bc-input-row">
                        <input id="mass" type="number" value={mass} min={1}
                               onChange={(e) => setMass(Number(e.target.value))} />
                        <span className="bc-unit">kg</span>
                    </div>
                </div>

                <div className="bc-field">
                    <label htmlFor="reaction">Reaktionszeit</label>
                    <div className="bc-input-row">
                        <input id="reaction" type="number" value={reactionTime} min={0} max={5} step={0.1}
                               onChange={(e) => setReaction(Number(e.target.value))} />
                        <span className="bc-unit">s</span>
                    </div>
                </div>
            </section>

            <section className="bc-card">
                <h2 className="bc-card-title">Straßenzustand</h2>
                <div className="bc-pill-row">
                    {ROAD_CONDITIONS.map((r) => (
                        <label key={r.id} className={`bc-pill ${roadId === r.id ? "bc-pill--active" : ""}`}>
                            <input
                                type="radio"
                                name="road"
                                checked={roadId === r.id}
                                onChange={() => setRoadId(r.id)}
                            />
                            {r.label}
                        </label>
                    ))}
                </div>
            </section>

            <section className="bc-card">
                <h2 className="bc-card-title">Bremsentyp</h2>
                <div className="bc-brake-grid">
                    {BRAKE_TYPES.map((b) => (
                        <label key={b.id}>
                            <input
                                type="radio"
                                name="brake"
                                checked={brakeId === b.id}
                                onChange={() => setBrakeId(b.id)}
                            />
                            <span className="bc-brake-name">{b.name}</span>
                            <span className="bc-brake-mu"> [μ] = {b.mu} · {b.note}</span>
                        </label>
                    ))}
                </div>
            </section>

            <section>
                <div>
                    <button onClick={() => {
                        setResult(() => calculateBrakingDistance(speedKmh, mass, brake.mu, reactionTime, road.factor))
                        console.log(result)
                    }}>
                        Calculate Bitch - Martin Lehman
                    </button>
                </div>
            </section>

            <section className="bc-card bc-result-card">
                <h2 className="bc-card-title">Ergebnis</h2>

                <div className="bc-metrics">
                    <div className="bc-metric">
                        <span className="bc-metric-label">Reaktionsweg: </span>
                        <span className="bc-metric-value">{result.reactionDistance.toFixed(1)}</span>
                        <span className="bc-metric-unit">m</span>
                        {result.error && <p>{result.error}</p>}
                    </div>
                    <div className="bc-metric">
                        <span className="bc-metric-label">Bremsweg: </span>
                        <span className="bc-metric-value">{result.brakingDistance.toFixed(1)}</span>
                        <span className="bc-metric-unit">m</span>
                    </div>
                </div>

                <div className="bc-total">
                    <span className="bc-total-label">Anhalteweg gesamt: </span>
                    <span className="bc-total-value">{result.totalDistance.toFixed(1)}</span>
                    <span className="bc-total-unit">Meter</span>
                </div>

                <div className="bc-bars">
                    <div className="bc-bar-row">
                        <span className="bc-bar-label">Reaktionsweg: </span>
                        <div className="bc-bar-bg">
                            <div className="bc-bar-fill bc-bar--reaction" style={{ width: `${rPct}%` }} />
                        </div>
                        <span className="bc-bar-pct">{rPct.toFixed(0)}%</span>
                    </div>
                    <div className="bc-bar-row">
                        <span className="bc-bar-label">Bremsweg: </span>
                        <div className="bc-bar-bg">
                            <div className="bc-bar-fill bc-bar--brake" style={{ width: `${bPct}%` }} />
                        </div>
                        <span className="bc-bar-pct">{bPct.toFixed(0)}%</span>
                    </div>
                </div>

                <div className="bc-detail">
                    <div className="bc-detail-row">
                        <span>Effektiver Haftkoeffizient [μ]: </span>
                        <span>{result.effectiveMu.toFixed(3)}</span>
                    </div>
                    <div className="bc-detail-row">
                        <span>Verzögerung: </span>
                        <span>{result.deceleration.toFixed(2)} m/s²</span>
                    </div>
                    <div className="bc-detail-row">
                        <span>Bremskraft: </span>
                        <span>{(result.force / 1000).toFixed(2)} kN</span>
                    </div>
                    <div className="bc-detail-row">
                        <span>Bremszeit: </span>
                        <span>{result.brakingTime.toFixed(2)} s</span>
                    </div>
                </div>
            </section>

        </div>
    );
}