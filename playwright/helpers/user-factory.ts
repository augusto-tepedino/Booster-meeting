/**
 * user-factory.ts
 * Generates randomized user data for Playwright signup tests.
 * Uses only native Node.js APIs — no external dependencies required.
 */

const FIRST_NAMES = [
  "Alice", "Bruno", "Carlos", "Diana", "Eduardo",
  "Fernanda", "Gabriel", "Helena", "Igor", "Julia",
  "Kevin", "Laura", "Marcos", "Natalia", "Olivia",
]

const LAST_NAMES = [
  "Silva", "Santos", "Oliveira", "Costa", "Souza",
  "Lima", "Alves", "Ferreira", "Pereira", "Gomes",
  "Carvalho", "Ribeiro", "Martins", "Rodrigues", "Araujo",
]

const COMPANIES = [
  "TechCorp", "Innovate Ltd", "DevStudio", "Nexus Group",
  "Bright Solutions", "CodeWave", "DataPeak", "CloudBase",
]

const STREETS = [
  "Maple Ave", "Oak Street", "Cedar Lane", "Birch Blvd",
  "Pine Road", "Elm Drive", "Willow Way", "River Rd",
]

const CITIES = [
  "Toronto", "Vancouver", "Montreal", "Calgary",
  "Ottawa", "Edmonton", "Winnipeg", "Halifax",
]

const STATES = [
  "Ontario", "British Columbia", "Quebec", "Alberta",
  "Manitoba", "Saskatchewan", "Nova Scotia", "New Brunswick",
]

// ── Helpers ──────────────────────────────────────────────────────────────────

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomDigits(length: number): string {
  return Array.from({ length }, () => randomInt(0, 9)).join("")
}

function randomAlphanumeric(length: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  return Array.from({ length }, () => chars[randomInt(0, chars.length - 1)]).join("")
}

// ── Factory ───────────────────────────────────────────────────────────────────

export interface UserData {
  name: string
  email: string
  password: string
  day: string
  month: string
  year: string
  firstName: string
  lastName: string
  company: string
  address1: string
  address2: string
  country: string
  state: string
  city: string
  zipcode: string
  mobile: string
}

/**
 * Generates a unique user payload for each call.
 * Email uniqueness is guaranteed by combining a timestamp + random suffix,
 * making parallel test runs safe as well.
 */
export function generateUser(): UserData {
  const firstName = pickRandom(FIRST_NAMES)
  const lastName = pickRandom(LAST_NAMES)
  const uniqueSuffix = `${Date.now()}${randomAlphanumeric(4)}`

  return {
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${uniqueSuffix}@mailtest.dev`,
    password: randomAlphanumeric(10),
    day: String(randomInt(1, 28)),
    month: String(randomInt(1, 12)),
    year: String(randomInt(1970, 2000)),
    firstName,
    lastName,
    company: pickRandom(COMPANIES),
    address1: `${randomInt(1, 9999)} ${pickRandom(STREETS)}`,
    address2: `Apt ${randomInt(1, 999)}`,
    country: "Canada",
    state: pickRandom(STATES),
    city: pickRandom(CITIES),
    zipcode: randomDigits(5),
    mobile: randomDigits(10),
  }
}
