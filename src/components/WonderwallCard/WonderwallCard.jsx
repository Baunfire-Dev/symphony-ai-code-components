import './WonderwallCard.css'
export const WonderwallCard = ({
  cardColor = "None",
  iconColor = "Dark Gray",
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
    "None" : "transparent",
    "Dark Gray" : "var(--_colors---dark-gray)",
    "Teal" : "var(--_colors---teal)",
    "Blue" : "var(--_colors---blue)",
    "Yellow" : "var(--_colors---yellow)",
    "Orange" : "var(--_colors---orange)",
    "Purple" : "var(--_colors---light-purple)"
  }

  const iconColors = {
    "Dark Gray" : "var(--_colors---dark-gray)",
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
      className='relative'
    >
      <div className={`wonderwall-card ${theme === 'Light' ? '' : 'dark'}`} style={{backgroundColor: colors[cardColor]}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          {headerType === "Logo" && logo && (
            <img src={logo.src} alt="" style={{maxHeight: '65px', maxWidth: '240px'}}/>
          )}
          {headerType === "Text" && (
            <div style={{borderLeft: "1px solid rgba(255,255,255,0.7)"}} className="flex items-center gap-[10px] bg-[linear-gradient(103deg,_rgba(255,255,255,0.30)_-16.2%,_rgba(255,255,255,0.02)_69.25%)] border border-white rounded-[1000px] backdrop-blur-[2.8px] pt-[10px] pr-[20px] pl-[16px] pb-[10px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                <circle cx="19" cy="19" r="19" fill="white"/>
                <path d="M9.05396 28.0811V10.7838H18.9999V14.6276H28.9458V28.0811H9.05396ZM11.0431 26.1592H17.0107V24.2372H11.0431V26.1592ZM11.0431 22.3153H17.0107V20.3934H11.0431V22.3153ZM11.0431 18.4715H17.0107V16.5495H11.0431V18.4715ZM11.0431 14.6276H17.0107V12.7057H11.0431V14.6276ZM18.9999 26.1592H26.9567V16.5495H18.9999V26.1592ZM20.9891 20.3934V18.4715H24.9675V20.3934H20.9891ZM20.9891 24.2372V22.3153H24.9675V24.2372H20.9891Z" fill={iconColors[iconColor] || "#1a1a1a"}/>
              </svg>
              <p className='wonderwall-header-title'>{headerText}</p>
            </div>
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
            <div style={{borderLeft: "1px solid rgba(255,255,255,0.7)"}} className="flex items-center gap-[10px] bg-[linear-gradient(103deg,_rgba(255,255,255,0.30)_-16.2%,_rgba(255,255,255,0.02)_69.25%)] border border-white rounded-[1000px] backdrop-blur-[2.8px] pt-[10px] pr-[20px] pl-[16px] pb-[10px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                <circle cx="19" cy="19" r="19" fill="#1a1a1a"/>
                <path d="M9.05396 28.0811V10.7838H18.9999V14.6276H28.9458V28.0811H9.05396ZM11.0431 26.1592H17.0107V24.2372H11.0431V26.1592ZM11.0431 22.3153H17.0107V20.3934H11.0431V22.3153ZM11.0431 18.4715H17.0107V16.5495H11.0431V18.4715ZM11.0431 14.6276H17.0107V12.7057H11.0431V14.6276ZM18.9999 26.1592H26.9567V16.5495H18.9999V26.1592ZM20.9891 20.3934V18.4715H24.9675V20.3934H20.9891ZM20.9891 24.2372V22.3153H24.9675V24.2372H20.9891Z" fill="#ffffff"/>
              </svg>
              <p className='wonderwall-header-title'>{headerText}</p>
            </div>
          )}
        </div>
        <svg className='card-arrow' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5002 13.2818H11.7314V2.74867H1.19824V0.979858H13.5002V13.2818Z"></path>
          <path d="M11.9962 1.20548L0.578125 12.6235L1.82886 13.8743L13.2469 2.45621L11.9962 1.20548Z"></path>
        </svg>
      </div>
      {backgroundImage &&
        <img src={backgroundImage.src} className='absolute z-[1] inset-0 w-full h-full object-cover'/>
      }
    </a>
  );
};