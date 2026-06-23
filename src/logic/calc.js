import {GravitationalPull} from "./constants.js";
import bremsbeschleunigungAudio from "../assets/bremsbeschleunigung.mp3";

const EASTER_EGG_TARGET    = 67;

// Eine einzige, wiederverwendete Audio-Instanz, damit sie sich stoppen lässt.
const easterEggAudio = new Audio(bremsbeschleunigungAudio);
easterEggAudio.loop = true;

async function playEasterEgg() {
    if (!easterEggAudio.paused) return; // läuft schon, nicht neu starten
    try {
        await easterEggAudio.play();
    } catch (err) {
        // z.B. Browser-Autoplay-Policy blockiert die Wiedergabe ohne User-Geste
        console.error("Easter-Egg-Sound konnte nicht abgespielt werden:", err);
    }
}

function stopEasterEgg() {
    if (easterEggAudio.paused) return;
    easterEggAudio.pause();
    easterEggAudio.currentTime = 0;
}

function brakingPower(mass, brakingCoefficient){
    try{
        let error = null
        if(mass >= 7558200000000000000000000000000){
            error = "TF YOU BRAKING, A BLACK HOLE?"
        }
        const force = mass * brakingCoefficient * GravitationalPull
        return {force, error}
    }catch (e){
        console.error("Mass too big, what are you braking? A Black hole?")
    }
}

function deceleration(brakingForce, mass){
    if(mass <= 0){
        console.error("Mass must be greater than 0.")
        return null;
    }
    console.log(mass)
    return brakingForce / mass
}

function brakingDistance(speed, deceleration) {
    if (deceleration <= 0) {
        console.error("Decleration must be greater than 0");
        return null;
    }
    return Math.pow(speed, 2) / (2 * deceleration);
}

export function calculateBrakingDistance(speedKmh, mass, brakingCoefficient, reactionTime, roadFactor) {
    const effectiveMu = brakingCoefficient * roadFactor;
    const speedMs     = speedKmh / 3.6;

    const {force, error}   = brakingPower(mass, effectiveMu);
    const dec     = deceleration(force, mass);
    const bDist   = brakingDistance(speedMs, dec);
    const rDist   = speedMs * reactionTime;
    const tDist = bDist + rDist

    const nearEasterEgg = Math.round(tDist) == EASTER_EGG_TARGET;
    if (nearEasterEgg) {
        playEasterEgg();
    } else {
        stopEasterEgg();
    }

    return {
        brakingDistance:   bDist,
        reactionDistance:  rDist,
        totalDistance:     tDist,
        deceleration:      dec,
        force:             force,
        brakingTime:       speedMs / dec,
        effectiveMu:       effectiveMu,
        error:             error
    };
}