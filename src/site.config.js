// EDIT THIS FILE. Empty links ("") are hidden automatically, so there are never broken links.

export const SITE = {
  name: "CHARM",
  tagline: "Everybody deserves to be charmed.",
  intro: "A friendly, fixed-supply ERC-20 token on Polygon for small acts of appreciation: tipping, thank-yous and community rewards.",
  url: "https://charm.voidkin.world",
  email: "info@workmail.space", // TODO: Polygonscan prefers an address on your own domain, e.g. hello@voidkin.world
};

export const TOKEN = {
  address: "0xC00583c4C8E8eEd451cb827809DfE7F011477350",
  symbol: "CHARM",
  decimals: 18,
  chainId: "0x89",
  explorer: "https://polygonscan.com",
};

export const LINKS = {
  faucet: import.meta.env.VITE_FAUCET_URL || "https://charmfaucet.vercel.app",
  whitepaper: "/CHARM-whitepaper.pdf",
  polygonscan: `${TOKEN.explorer}/token/${TOKEN.address}`,
  // Fill these in (full https:// URLs). Anything left "" is hidden.
  x: "",
  telegram: "",
  discord: "",
  github: "",
  linkedin: "",   // project or creator LinkedIn
  medium: "",
  coingecko: "",
  coinmarketcap: "",
};

// Add real people here. The Team section appears only when this has entries.
// { name: "Full Name", role: "Founder", bio: "One line.", linkedin: "https://linkedin.com/in/...", x: "", photo: "/team/name.jpg" }
export const TEAM = [];

export const DETAILS = [
  ["Name", "Charm"],
  ["Symbol", "CHARM"],
  ["Network", "Polygon (PoS), chain ID 137"],
  ["Standard", "ERC-20"],
  ["Decimals", "18"],
  ["Total supply", "1,000,000,000 CHARM (fixed)"],
  ["Transfer tax", "None (0%)"],
  ["Minting", "Disabled after deployment"],
  ["Extensions", "ERC-20 Permit (gasless approvals), Ownable"],
  ["Libraries", "OpenZeppelin v5, Solidity ^0.8.20"],
];

export const PRINCIPLES = [
  ["Simplicity", "A standard token with clear rules and nothing clever hiding between you and your balance."],
  ["Fairness", "A fixed supply that can never be inflated, and an openly published distribution plan."],
  ["Warmth", "A community-first brand where kindness is the product."],
];

export const USE_CASES = [
  ["Tipping and thank-yous", "Send CHARM to creators, builders, moderators and friends."],
  ["Community rewards", "Reward helpful members, contest winners and active contributors."],
  ["Free faucet", "Newcomers claim their first CHARM at no cost and try the token."],
  ["Perks and partnerships", "Partner communities can accept CHARM for badges, access or small perks."],
];

export const ALLOCATION = [
  ["Community and faucet rewards", 40, "400,000,000", "Faucet, giveaways, tipping campaigns and contributor rewards"],
  ["Liquidity", 25, "250,000,000", "Trading liquidity on Polygon decentralized exchanges"],
  ["Team and development", 15, "150,000,000", "Building, maintenance and long-term contributors"],
  ["Ecosystem and partnerships", 10, "100,000,000", "Integrations, partner communities and grants"],
  ["Treasury reserve", 10, "100,000,000", "Future needs, emergencies and community-approved initiatives"],
];

export const DISTRIBUTION = [
  "The full supply was minted once to the deployer wallet, so the allocation is carried out by distribution, not by code.",
  "Wallet addresses for each category will be published once tokens are moved.",
  "Team tokens are planned to be locked in a public vesting contract (proposed: 6-month cliff, then 18-month linear release).",
  "Liquidity provider tokens are planned to be locked for a stated period.",
  "Faucet and community tokens are released gradually so rewards last for years, not days.",
];

export const FAUCET = {
  // Keep this in sync with what the faucet contract really does.
  summary: "Every wallet can claim 50 CHARM, once, for free. The faucet is funded from the community allocation, so it can never increase total supply.",
};

export const SECURITY = [
  ["OpenZeppelin v5", "Inherits well-tested, community-reviewed ERC-20, Permit and Ownable."],
  ["Fixed supply", "The constructor mints the full supply once. There is no mint function."],
  ["No hooks or taxes", "Transfers behave exactly like a standard ERC-20 transfer."],
  ["ERC-20 Permit", "Apps can request an approval by signature, saving a separate transaction."],
  ["Gas efficient", "A minimal contract keeps costs low on Polygon."],
  ["Open source", "Source code is verified on Polygonscan so anyone can read it."],
];

export const ADMIN_NOTE = "Ownership is limited to the administrative functions of the standard Ownable pattern. It does not include minting, freezing balances or changing fees.";

// done: true shows a check mark. Update as you ship.
export const ROADMAP = [
  ["Foundation", [["Deploy the CHARM contract on Polygon", true], ["Launch the website and brand", true], ["Publish the whitepaper", true], ["Update token information on Polygonscan", false]]],
  ["Community", [["Launch the faucet", true], ["Open community channels", false], ["Run the first tipping and giveaway campaigns", false], ["Publish distribution wallets and lock details", false]]],
  ["Liquidity and access", [["Add liquidity on a Polygon decentralized exchange", false], ["List on token trackers and data aggregators", false], ["One-click Add to wallet support", true]]],
  ["Utility", [["Release a simple tipping tool for creators and communities", false], ["Onboard the first partner communities", false], ["Explore perks, badges and community-governed initiatives", false]]],
  ["Growth", [["Expand partnerships and integrations", false], ["Evaluate community voting on treasury use", false], ["Keep building from community feedback", false]]],
];

export const RISKS = [
  ["Market", "Token prices can be very volatile and may fall to zero."],
  ["Liquidity", "There may not always be enough buyers or sellers to trade at a fair price."],
  ["Adoption", "CHARM's usefulness depends on people and communities choosing to use it."],
  ["Smart contract", "Even standard code can contain unknown bugs, and this contract has not been independently audited."],
  ["Regulatory", "Laws about digital assets differ by country and may change."],
  ["Security", "Lost keys, scams and phishing can cause permanent loss. Never share your seed phrase."],
];

export const DISCLAIMER = "This site is for information only. It is not financial, legal or tax advice, and not an offer to sell or a solicitation to buy any asset or security. CHARM carries no promise of returns. Information may change without notice. Do your own research and only use funds you can afford to lose.";
