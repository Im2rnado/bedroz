import conf from "../../config";

export default function Footer(){
  return (
    <footer>
      <img src="/assets/logo.png" alt="Logo" />

      <div className="links">
        {
          conf.SITE_DISCORD &&
          <a href={conf.SITE_DISCORD} target="_blank">Discord</a>
        }

        {
          conf.SITE_CREDITS &&
          <a href="https://bedroz.lol" target="_blank">🎨 by Bedro</a>
        }
      </div>

      <p className="disclaimer">&copy; {conf.SITE_TITLE} 2023. We do not store any media.</p>
    </footer>
  )
}
