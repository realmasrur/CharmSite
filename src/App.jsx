import { useEffect, useState } from "react";
import { SITE, TOKEN, LINKS, TEAM, DETAILS, PRINCIPLES, USE_CASES, ALLOCATION, DISTRIBUTION, FAUCET, SECURITY, ADMIN_NOTE, ROADMAP, RISKS, DISCLAIMER } from "./site.config";
import Legal from "./components/Legal";

const API = "https://polygon.blockscout.com/api/v2";
const short = (a) => `${a.slice(0, 6)}…${a.slice(-4)}`;
const btn = "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900";
const solid = `${btn} bg-neutral-900 text-white hover:bg-black`;
const ghost = `${btn} text-neutral-700 ring-1 ring-neutral-200 hover:bg-neutral-50`;
const ext = { target: "_blank", rel: "noreferrer" };

const SOCIALS = [["X", LINKS.x], ["Telegram", LINKS.telegram], ["Discord", LINKS.discord], ["GitHub", LINKS.github], ["LinkedIn", LINKS.linkedin], ["Medium", LINKS.medium], ["CoinGecko", LINKS.coingecko], ["CoinMarketCap", LINKS.coinmarketcap]].filter(([, u]) => u);

function useHash() {
  const [h, setH] = useState(window.location.hash);
  useEffect(() => { const f = () => { setH(window.location.hash); if (window.location.hash.startsWith("#/")) window.scrollTo(0, 0); }; window.addEventListener("hashchange", f); return () => window.removeEventListener("hashchange", f); }, []);
  return h;
}

function Section({ id, title, eyebrow, children }) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-neutral-100">
      <div className="mx-auto max-w-3xl px-5 py-14">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">{eyebrow}</p>}
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">{title}</h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

export default function App() {
  const route = useHash();
  const [holders, setHolders] = useState(null);
  const [copied, setCopied] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch(`${API}/tokens/${TOKEN.address.toLowerCase()}`).then((r) => r.json()).then((d) => { const n = Number(d.holders_count ?? d.holders); if (!Number.isNaN(n)) setHolders(n); }).catch(() => {});
  }, []);

  async function copy() {
    try { await navigator.clipboard.writeText(TOKEN.address); }
    catch { const t = document.createElement("textarea"); t.value = TOKEN.address; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); }
    setCopied(true); setTimeout(() => setCopied(false), 1600);
  }

  async function addToWallet() {
    setMsg("");
    const eth = window.ethereum;
    if (!eth) return setMsg("No wallet found. Use any wallet provider such as MetaMask, Rabby, Trust or Coinbase Wallet: install its extension, or open this page inside the wallet's browser.");
    try {
      await eth.request({ method: "eth_requestAccounts" });
      try { await eth.request({ method: "wallet_switchEthereumChain", params: [{ chainId: TOKEN.chainId }] }); }
      catch (e) { if (e.code === 4902) await eth.request({ method: "wallet_addEthereumChain", params: [{ chainId: TOKEN.chainId, chainName: "Polygon Mainnet", rpcUrls: ["https://polygon-rpc.com"], nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 }, blockExplorerUrls: [TOKEN.explorer] }] }); else throw e; }
      await eth.request({ method: "wallet_watchAsset", params: { type: "ERC20", options: { address: TOKEN.address.toLowerCase(), symbol: TOKEN.symbol, decimals: TOKEN.decimals, image: `${window.location.origin}/logo.png` } } });
    } catch (e) { if (e.code !== 4001) setMsg("Couldn't add the token. Try again from your wallet."); }
  }

  const stats = [["Total supply", "1,000,000,000"], ["Decimals", "18"], ["Transfer tax", "0%"], ["Holders", holders == null ? "—" : holders.toLocaleString()]];

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-700">
      <header className="sticky top-0 z-20 border-b border-neutral-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
          <a href="#/" className="flex items-center gap-2 font-bold text-neutral-900"><img src="/logo.png" alt="" className="h-7 w-7 object-contain" />CHARM</a>
          <nav className="hidden items-center gap-6 text-sm text-neutral-500 sm:flex" aria-label="Sections">
            <a className="hover:text-neutral-900" href="#about">About</a>
            <a className="hover:text-neutral-900" href="#token">Token</a>
            <a className="hover:text-neutral-900" href="#tokenomics">Tokenomics</a>
            <a className="hover:text-neutral-900" href="#roadmap">Roadmap</a>
          </nav>
          <a className={`${solid} !px-4 !py-2`} href={LINKS.faucet} {...ext}>Faucet</a>
        </div>
      </header>

      {route === "#/terms" ? <Legal kind="terms" /> : route === "#/privacy" ? <Legal kind="privacy" /> : (
        <main>
          <section className="mx-auto max-w-2xl px-5 pb-16 pt-16 text-center sm:pt-24">
            <img src="/logo.png" alt="CHARM logo" className="mx-auto h-20 w-20 object-contain" />
            <h1 className="mt-6 text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl">CHARM</h1>
            <p className="mt-3 text-lg text-neutral-500 sm:text-xl">{SITE.tagline}</p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-500">{SITE.intro}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a className={solid} href={LINKS.faucet} {...ext}>Claim free CHARM</a>
              <button className={ghost} onClick={addToWallet}>Add to wallet</button>
              <a className={ghost} href={LINKS.whitepaper} {...ext}>Whitepaper</a>
            </div>
            {msg && <p role="alert" className="mx-auto mt-4 max-w-md rounded-2xl bg-neutral-50 p-3 text-left text-sm text-neutral-600 ring-1 ring-neutral-200">{msg}</p>}
            <button onClick={copy} className="mx-auto mt-6 flex items-center gap-2 rounded-full bg-neutral-50 px-4 py-2 font-mono text-xs text-neutral-600 ring-1 ring-neutral-200 hover:bg-neutral-100" aria-label="Copy contract address">
              {short(TOKEN.address)} <span className="font-sans font-semibold text-neutral-900">{copied ? "Copied ✓" : "Copy"}</span>
            </button>
            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-100 sm:grid-cols-4">
              {stats.map(([k, v]) => (<div key={k} className="bg-white px-3 py-4"><dd className="font-mono text-base font-semibold text-neutral-900">{v}</dd><dt className="mt-0.5 text-xs text-neutral-400">{k}</dt></div>))}
            </dl>
          </section>

          <Section id="about" eyebrow="About" title="Appreciation, made easy">
            <p className="leading-relaxed">Small gestures of thanks, like tipping a creator or rewarding a helpful member, are held back by fees, friction and complicated tools. CHARM turns those moments into a lightweight on-chain gesture. It has a strict supply of 1,000,000,000 CHARM, no transfer tax, no minting after deployment and no hidden mechanics.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {PRINCIPLES.map(([t, d]) => (<div key={t} className="rounded-2xl p-5 ring-1 ring-neutral-200"><h3 className="font-bold text-neutral-900">{t}</h3><p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{d}</p></div>))}
            </div>
            <h3 className="mt-12 text-lg font-bold text-neutral-900">Use cases</h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {USE_CASES.map(([t, d]) => (<li key={t}><p className="font-semibold text-neutral-900">{t}</p><p className="mt-0.5 text-sm text-neutral-500">{d}</p></li>))}
            </ul>
            <p className="mt-10 rounded-2xl bg-neutral-50 p-5 text-sm leading-relaxed text-neutral-600"><strong className="text-neutral-900">What CHARM is not.</strong> It is not a promise of profit, an investment contract or a claim on any company or revenue. Its value depends entirely on how widely people choose to use it.</p>
          </Section>

          <Section id="token" eyebrow="Token" title="Token details">
            <dl className="divide-y divide-neutral-100 text-sm">
              {DETAILS.map(([k, v]) => (<div key={k} className="flex justify-between gap-4 py-3"><dt className="text-neutral-400">{k}</dt><dd className="text-right font-medium text-neutral-900">{v}</dd></div>))}
              <div className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-4">
                <dt className="text-neutral-400">Contract</dt>
                <dd className="break-all font-mono text-xs font-medium text-neutral-900 sm:text-right">{TOKEN.address}</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className={ghost} onClick={copy}>{copied ? "Copied ✓" : "Copy address"}</button>
              <a className={ghost} href={LINKS.polygonscan} {...ext}>View on Polygonscan</a>
            </div>
            <p className="mt-4 text-xs text-neutral-400">Always verify the contract address above on Polygonscan before interacting with any token.</p>
          </Section>

          <Section id="tokenomics" eyebrow="Tokenomics" title="Fixed supply, openly allocated">
            <p className="leading-relaxed">The entire supply of 1,000,000,000 CHARM was minted once, at deployment. No further CHARM can ever be created.</p>
            <ul className="mt-8 space-y-6">
              {ALLOCATION.map(([name, pct, tokens, why]) => (
                <li key={name}>
                  <div className="flex items-baseline justify-between gap-3"><span className="font-semibold text-neutral-900">{name}</span><span className="font-mono text-sm text-neutral-900">{pct}%</span></div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100" role="img" aria-label={`${pct} percent`}><div className="h-full rounded-full bg-[#1fdcc0]" style={{ width: `${pct}%` }} /></div>
                  <p className="mt-2 text-xs text-neutral-500"><span className="font-mono">{tokens}</span> · {why}</p>
                </li>
              ))}
            </ul>
            <h3 className="mt-12 text-lg font-bold text-neutral-900">Distribution and vesting</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-600">{DISTRIBUTION.map((d) => <li key={d}>{d}</li>)}</ul>
            <p className="mt-3 text-xs text-neutral-400">Vesting and lock terms are plans and may change. Announcements will be published here.</p>
          </Section>

          <Section id="faucet" eyebrow="Faucet" title="Try CHARM for free">
            <p className="leading-relaxed">{FAUCET.summary}</p>
            <a className={`${solid} mt-6`} href={LINKS.faucet} {...ext}>Open the faucet</a>
          </Section>

          <Section id="security" eyebrow="Security" title="Built on proven components">
            <ul className="grid gap-5 sm:grid-cols-2">{SECURITY.map(([t, d]) => (<li key={t}><p className="font-semibold text-neutral-900">{t}</p><p className="mt-0.5 text-sm text-neutral-500">{d}</p></li>))}</ul>
            <p className="mt-8 text-sm leading-relaxed text-neutral-600"><strong className="text-neutral-900">Admin controls.</strong> {ADMIN_NOTE}</p>
          </Section>

          <Section id="roadmap" eyebrow="Roadmap" title="Where we're going">
            <p className="text-sm text-neutral-500">Timelines are targets, not guarantees, and may change as we learn.</p>
            <ol className="mt-8 space-y-8">
              {ROADMAP.map(([phase, items], i) => (
                <li key={phase}>
                  <h3 className="font-bold text-neutral-900"><span className="mr-2 font-mono text-xs text-neutral-400">0{i + 1}</span>{phase}</h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {items.map(([t, done]) => (<li key={t} className="flex gap-2.5"><span aria-hidden className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-[10px] ${done ? "bg-emerald-500 text-white" : "ring-1 ring-neutral-300"}`}>{done ? "✓" : ""}</span><span className={done ? "text-neutral-800" : "text-neutral-500"}>{t}<span className="sr-only">{done ? " (done)" : " (planned)"}</span></span></li>))}
                  </ul>
                </li>
              ))}
            </ol>
          </Section>

          {TEAM.length > 0 && (
            <Section id="team" eyebrow="Team" title="The people behind CHARM">
              <ul className="grid gap-5 sm:grid-cols-2">
                {TEAM.map((m) => (
                  <li key={m.name} className="flex gap-4 rounded-2xl p-5 ring-1 ring-neutral-200">
                    {m.photo && <img src={m.photo} alt={m.name} className="h-14 w-14 rounded-full object-cover" />}
                    <div className="min-w-0">
                      <p className="font-bold text-neutral-900">{m.name}</p>
                      <p className="text-sm text-neutral-500">{m.role}</p>
                      {m.bio && <p className="mt-1 text-sm text-neutral-500">{m.bio}</p>}
                      <p className="mt-2 flex gap-3 text-sm">
                        {m.linkedin && <a className="underline" href={m.linkedin} {...ext}>LinkedIn</a>}
                        {m.x && <a className="underline" href={m.x} {...ext}>X</a>}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Section id="community" eyebrow="Community" title="Be kind first">
            <p className="leading-relaxed">CHARM grows through people, not hype. We put moderation and culture before marketing, reward real contribution, and publish wallets, allocations and updates openly.</p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {SOCIALS.map(([n, u]) => (<li key={n}><a className={ghost} href={u} {...ext}>{n}</a></li>))}
              <li><a className={ghost} href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            </ul>
          </Section>

          <Section id="risks" eyebrow="Risks" title="Know before you use">
            <ul className="grid gap-5 sm:grid-cols-2">{RISKS.map(([t, d]) => (<li key={t}><p className="font-semibold text-neutral-900">{t} risk</p><p className="mt-0.5 text-sm text-neutral-500">{d}</p></li>))}</ul>
            <p className="mt-8 text-xs leading-relaxed text-neutral-400">{DISCLAIMER}</p>
          </Section>
        </main>
      )}

      <footer className="border-t border-neutral-100">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-5 py-8 text-xs text-neutral-400 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} CHARM. Not financial advice.</p>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Footer">
            <a className="hover:text-neutral-700" href="#/terms">Terms</a>
            <a className="hover:text-neutral-700" href="#/privacy">Privacy</a>
            <a className="hover:text-neutral-700" href={LINKS.whitepaper} {...ext}>Whitepaper</a>
            <a className="hover:text-neutral-700" href={LINKS.polygonscan} {...ext}>Polygonscan</a>
            <a className="hover:text-neutral-700" href={`mailto:${SITE.email}`}>Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
