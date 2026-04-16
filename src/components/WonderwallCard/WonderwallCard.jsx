import './WonderwallCard.css'
export const WonderwallCard = ({
  cardColor = "Black",
  theme = "Light",
  backgroundImage,
  headerType = "Text",
  headerText,
  logo,
  title,
  subtitle,
  description,
  footerLayout = 'Link',
  footerLinkText,
  footerLink,
  personImage,
  personName,
  personPosition
}) => {
  const colors = {
    "Black" : "#000",
    "Teal" : "var(--_colors---teal)",
    "Blue" : "var(--_colors---blue)",
    "Yellow" : "var(--_colors---yellow)",
    "Orange" : "var(--_colors---orange)",
    "Purple" : "var(--_colors---light-purple)"
  }
  return (
    <a
      href={footerLink?.href}
      target={footerLink?.target ?? "_self"}
      className={`wonderwall-card ${theme === 'Light' ? '' : 'dark'}`}
      style={{
        backgroundColor: colors[cardColor],
        backgroundImage: backgroundImage ? `url(${backgroundImage.src})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        {headerType === "Logo" && logo && (
          <img src={logo.src} alt="" style={{maxHeight: '65px', maxWidth: '240px'}}/>
        )}
        {headerType === "Text" && (
          <p className='wonderwall-header-title'>{headerText}</p>
        )}
      </div>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'end', flex: 1}}>
        <p className="wonderwall-title">{title}</p>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.563rem'}}>
          <p className="wonderwall-subtitle">{subtitle}</p>
          <p className="wonderwall-description">{description}</p>
        </div>
      </div>
      <div style={{ marginTop: "24px" }}>
        {footerLayout === "Link" && (
          <p className='card-link'>
            <span>{footerLinkText}</span>
            <span>{">"}</span>
          </p>
        )}

        {footerLayout === "Person" && (
          <div className='footer-person' style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {personImage?.src && (
              <img
                src={personImage.src}
                alt=""
                style={{
                  height: '65px',
                  width: '65px',
                  borderRadius: "100%",
                  objectFit: "cover"
                }}
              />
            )}

            <div>
              <div>{personName}</div>
              <div>{personPosition}</div>
            </div>
          </div>
        )}
      </div>
      <div className='wonderwall-hover-overlay'>
        {headerType === "Logo" && logo && (
          <img src={logo.src} alt="" style={{filter: theme === "Dark" ? "invert(1)" : "none", maxHeight: '65px', maxWidth: '240px' }} />
        )}
        {headerType === "Text" && (
          <p className='wonderwall-header-title'>{headerText}</p>
        )}
      </div>
      <svg className='card-arrow' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5002 13.2818H11.7314V2.74867H1.19824V0.979858H13.5002V13.2818Z"></path>
        <path d="M11.9962 1.20548L0.578125 12.6235L1.82886 13.8743L13.2469 2.45621L11.9962 1.20548Z"></path>
      </svg>
    </a>
  );
};