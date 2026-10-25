import { SITE } from "../site.config";
const DATE = "October 26, 2026";
const Sec = ({ t, children }) => (<><h2 className="mt-6 text-base font-bold text-neutral-900">{t}</h2><p className="mt-1">{children}</p></>);

export default function Legal({ kind }) {
  const terms = kind === "terms";
  return (
    <article className="mx-auto w-full max-w-2xl px-5 py-12 text-sm leading-relaxed text-neutral-600">
      <a href="#/" className="text-xs font-medium text-neutral-900 underline">← Back to home</a>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900">{terms ? "Terms of Use" : "Privacy Policy"}</h1>
      <p className="text-xs text-neutral-400">Last updated {DATE}</p>
      {terms ? (<>
        <Sec t="About this site">This website provides information about the CHARM token on Polygon. By using it you agree to these terms.</Sec>
        <Sec t="No advice, no offer">Nothing here is financial, investment, tax or legal advice, or an offer or solicitation to buy any asset. CHARM may have no market value and carries no promise of returns.</Sec>
        <Sec t="Your responsibility">Always verify the contract address on Polygonscan before interacting with any token. Blockchain transactions are final. You are responsible for your wallet, keys and decisions.</Sec>
        <Sec t="Third-party links">We link to services we don't control, such as Polygonscan and wallet providers. We aren't responsible for their content.</Sec>
        <Sec t="No warranty">The site is provided as is, without warranties. To the fullest extent allowed by law, we aren't liable for losses arising from its use.</Sec>
        <Sec t="Contact">Questions? Email {SITE.email}.</Sec>
      </>) : (<>
        <Sec t="What we collect">This site has no accounts, no tracking cookies and no forms. We don't ask for your name or email.</Sec>
        <Sec t="Wallet features">The "Add to wallet" button asks your own wallet extension to add CHARM. Your wallet address is not sent to our servers.</Sec>
        <Sec t="Third-party services">The page loads fonts from Google Fonts and reads public token data (such as holder count) from the Blockscout API. Our hosting provider may log standard request data such as IP address.</Sec>
        <Sec t="On-chain data">Anything you do on the blockchain is public and permanent, and we can't delete it.</Sec>
        <Sec t="Contact">Privacy questions? Email {SITE.email}.</Sec>
      </>)}
    </article>
  );
}
