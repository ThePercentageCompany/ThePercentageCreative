"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { LANGUAGES, DICTIONARIES, LocaleKey } from "@/locales";
import { InteractiveHoverButton } from "@/registry/magicui/interactive-hover-button";
import { TextAnimate } from "@/registry/magicui/text-animate";
import { Particles } from "@/registry/magicui/particles";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/registry/magicui/scroll-based-velocity";

export default function Home() {
  const [currentLang, setCurrentLang] = useState<LocaleKey>("en");
  const [navOpen, setNavOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{ message: string; color: string }>({
    message: "",
    color: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    need: "",
    message: "",
  });

  const t = DICTIONARIES[currentLang] || DICTIONARIES.en;
  const activeLangOption = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];
  const isRtl = activeLangOption.dir === "rtl";

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = currentLang;
  }, [currentLang, isRtl]);

  const handleNavClick = () => {
    setNavOpen(false);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentLang(e.target.value as LocaleKey);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const need = formData.need.trim();
    const message = formData.message.trim();

    if (!name || !email || !need || !message) {
      setFormStatus({
        message: t.contact.statusRequired,
        color: "#dc2626",
      });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({
      message: "",
      color: "",
    });

    try {
      const response = await fetch("https://formspree.io/f/xkjnzwwp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          need,
          message,
          language: currentLang,
        }),
      });

      if (response.ok) {
        setFormStatus({
          message: t.contact.statusSuccess,
          color: "#1f8a45",
        });
        setFormData({ name: "", email: "", need: "", message: "" });
      } else {
        const data = await response.json().catch(() => ({}));
        const errorMessage =
          data?.errors?.map((err: { message: string }) => err.message).join(", ") ||
          "Oops! There was a problem submitting your form.";
        setFormStatus({
          message: errorMessage,
          color: "#dc2626",
        });
      }
    } catch {
      setFormStatus({
        message: "Oops! There was a problem submitting your form. Please try again.",
        color: "#dc2626",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page" dir={isRtl ? "rtl" : "ltr"}>
      <header className="nav">
        <a className="logo" href="#top" aria-label="The Percentage Creative home">
          <Image
            src="/The Percentage FZ-LLC-SYMBOL ONLY.png"
            alt="The Percentage Creative Logo"
            width={32}
            height={32}
            className="logo-img"
            priority
          />
          <span className="logo-text">The Percentage Creative</span>
        </a>

        <nav className={`nav-links ${navOpen ? "open" : ""}`} id="navLinks">
          <a href="#services" onClick={handleNavClick}>{t.nav.services}</a>
          <a href="#work" onClick={handleNavClick}>{t.nav.whatWeMake}</a>
          <a href="#clients" onClick={handleNavClick}>{t.nav.clients}</a>
          <a href="#branding" onClick={handleNavClick}>{t.nav.branding}</a>
          <a href="#contact" onClick={handleNavClick}>{t.nav.contact}</a>
        </nav>

        <div className="nav-actions">
          {/* Multi-Language Dropdown */}
          <div className="lang-switcher" aria-label="Language Selector">
            <select
              className="lang-select"
              value={currentLang}
              onChange={handleLanguageChange}
              aria-label="Select Language"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.nativeName}
                </option>
              ))}
            </select>
          </div>

          <a className="btn btn-ghost" href="#contact">{t.nav.talkToUs}</a>
          <InteractiveHoverButton href="#contact" className="nav-hover-btn">
            {t.nav.getStarted}
          </InteractiveHoverButton>
          <button
            className="menu-btn"
            id="menuBtn"
            aria-label="Open menu"
            onClick={() => setNavOpen(!navOpen)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <Particles
            className="hero-particles"
            quantity={100}
            ease={80}
            color="#0e2a1f"
            refresh
          />
          <div className="hero-content">
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1>{t.hero.title}</h1>
            <TextAnimate
              key={currentLang}
              animation="blurInUp"
              by="character"
              className="hero-lead"
              once
            >
              {t.hero.lead}
            </TextAnimate>
            <div className="hero-cta">
              <InteractiveHoverButton href="#contact">
                {t.hero.getStarted}
              </InteractiveHoverButton>
              <a className="btn btn-ghost" href="#clients">{t.hero.seeClients}</a>
            </div>
          </div>

          <div className="logo-strip-velocity-wrapper" aria-label="Client quick links">
            <ScrollVelocityContainer className="logo-strip-velocity">
              <ScrollVelocityRow baseVelocity={3} direction={1}>
                <a href="https://www.newdelmon.com/" target="_blank" rel="noopener noreferrer">NewDelmon</a>
                <span className="velocity-dot">•</span>
                <a href="https://petsorigin.com/" target="_blank" rel="noopener noreferrer">PetsOrigin</a>
                <span className="velocity-dot">•</span>
                <a href="https://welltechinternational.com/" target="_blank" rel="noopener noreferrer">Welltech International</a>
                <span className="velocity-dot">•</span>
                <a href="https://www.alwassimtrading.com/" target="_blank" rel="noopener noreferrer">Kely Ayurveda</a>
                <span className="velocity-dot">•</span>
                <a href="https://www.aljazeerafoods.ae/" target="_blank" rel="noopener noreferrer">Al Jazeera Foods</a>
                <span className="velocity-dot">•</span>
                <a href="https://oggytoy.com/" target="_blank" rel="noopener noreferrer">OggyToy</a>
                <span className="velocity-dot">•</span>
                <a href="https://www.kottakkalayurveda.ae" target="_blank" rel="noopener noreferrer">Kottakkal Ayurveda</a>
                <span className="velocity-dot">•</span>
                <span className="muted">{t.clientsStrip.andMore} ↗</span>
                <span className="velocity-dot">•</span>
              </ScrollVelocityRow>
            </ScrollVelocityContainer>
            <div className="velocity-fade velocity-fade-left"></div>
            <div className="velocity-fade velocity-fade-right"></div>
          </div>
        </section>

        <section className="intro" id="work">
          <div className="intro-copy">
            <h2>{t.intro.title}</h2>
            <p>{t.intro.lead}</p>
          </div>
          <div className="feature-grid">
            <article className="feature-card">
              <h3>{t.intro.printTitle}</h3>
              <p>{t.intro.printDesc}</p>
            </article>
            <article className="feature-card">
              <h3>{t.intro.digitalTitle}</h3>
              <p>{t.intro.digitalDesc}</p>
            </article>
            <article className="feature-card">
              <h3>{t.intro.identityTitle}</h3>
              <p>{t.intro.identityDesc}</p>
            </article>
          </div>
        </section>

        <section className="audiences" id="services">
          <div className="section-head">
            <h2>{t.services.title}</h2>
            <p>{t.services.lead}</p>
          </div>
          <div className="audience-grid">
            <article className="audience-card">
              <div className="audience-art art-brochure">
                <Image
                  src="/Welltech_brand_logo_upload_2K_202609020022_converted.webp"
                  alt="Welltech A4 Brochure Mockup"
                  fill
                  sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 25vw"
                  className="audience-img"
                  priority
                />
              </div>
              <h3>{t.services.brochuresTitle}</h3>
              <p>{t.services.brochuresDesc}</p>
            </article>
            <article className="audience-card">
              <div className="audience-art art-poster">
                <Image
                  src="/PetsOrigin_brand_logo_color_2K_202609020050_converted.webp"
                  alt="PetsOrigin Flyer & Poster Design Mockup"
                  fill
                  sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 25vw"
                  className="audience-img"
                />
              </div>
              <h3>{t.services.postersTitle}</h3>
              <p>{t.services.postersDesc}</p>
            </article>
            <article className="audience-card">
              <div className="audience-art art-digital">
                <Image
                  src="/Change_glass_logo_to_kely_202609022352_converted.webp"
                  alt="Digital Images and Social Visuals Mockup"
                  fill
                  sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 25vw"
                  className="audience-img"
                />
              </div>
              <h3>{t.services.digitalTitle}</h3>
              <p>{t.services.digitalDesc}</p>
            </article>
            <article className="audience-card">
              <div className="audience-art art-label">
                <Image
                  src="/Make_packaging_mockup_labels_2K_202609030020_converted.webp"
                  alt="Packaging and Label Design Mockup"
                  fill
                  sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 25vw"
                  className="audience-img"
                />
              </div>
              <h3>{t.services.labelsTitle}</h3>
              <p>{t.services.labelsDesc}</p>
            </article>
          </div>
        </section>

        <section className="pillars">
          <article className="pillar">
            <h3>{t.pillars.localTitle}</h3>
            <p>{t.pillars.localDesc}</p>
          </article>
          <article className="pillar">
            <h3>{t.pillars.deliveryTitle}</h3>
            <p>{t.pillars.deliveryDesc}</p>
          </article>
          <article className="pillar">
            <h3>{t.pillars.controlTitle}</h3>
            <p>{t.pillars.controlDesc}</p>
          </article>
        </section>

        <section className="cta-band" id="branding">
          <div>
            <h2>{t.ctaBand.title}</h2>
            <p>{t.ctaBand.lead}</p>
          </div>
          <InteractiveHoverButton href="#contact">{t.ctaBand.btn}</InteractiveHoverButton>
        </section>

        <section className="simplify">
          <div className="section-head">
            <h2>{t.simplify.title}</h2>
            <p>{t.simplify.lead}</p>
          </div>
          <div className="steps">
            <article>
              <span className="step-n">01</span>
              <h3>{t.simplify.step1Title}</h3>
              <p>{t.simplify.step1Desc}</p>
            </article>
            <article>
              <span className="step-n">02</span>
              <h3>{t.simplify.step2Title}</h3>
              <p>{t.simplify.step2Desc}</p>
            </article>
            <article>
              <span className="step-n">03</span>
              <h3>{t.simplify.step3Title}</h3>
              <p>{t.simplify.step3Desc}</p>
            </article>
            <article>
              <span className="step-n">04</span>
              <h3>{t.simplify.step4Title}</h3>
              <p>{t.simplify.step4Desc}</p>
            </article>
          </div>
        </section>

        <section className="clients" id="clients">
          <div className="section-head">
            <h2>{t.clients.title}</h2>
            <p>{t.clients.lead}</p>
          </div>
          <div className="client-grid">
            <a
              href="https://www.newdelmon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="client-card"
            >
              <div className="client-card-top">
                <span className="client-tag">{t.clients.tagRetail}</span>
                <span className="client-ext-icon" aria-hidden="true">↗</span>
              </div>
              <h3>NewDelmon</h3>
              <p>{t.clients.newDelmonDesc}</p>
            </a>
            <a
              href="https://petsorigin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="client-card"
            >
              <div className="client-card-top">
                <span className="client-tag">{t.clients.tagPets}</span>
                <span className="client-ext-icon" aria-hidden="true">↗</span>
              </div>
              <h3>PetsOrigin</h3>
              <p>{t.clients.petsOriginDesc}</p>
            </a>
            <a
              href="https://welltechinternational.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="client-card"
            >
              <div className="client-card-top">
                <span className="client-tag">{t.clients.tagTrade}</span>
                <span className="client-ext-icon" aria-hidden="true">↗</span>
              </div>
              <h3>Welltech International</h3>
              <p>{t.clients.welltechDesc}</p>
            </a>
            <a
              href="https://www.alwassimtrading.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="client-card"
            >
              <div className="client-card-top">
                <span className="client-tag">{t.clients.tagWellness}</span>
                <span className="client-ext-icon" aria-hidden="true">↗</span>
              </div>
              <h3>Kely Ayurveda</h3>
              <p>{t.clients.kelyDesc}</p>
            </a>
            <a
              href="https://www.aljazeerafoods.ae/"
              target="_blank"
              rel="noopener noreferrer"
              className="client-card"
            >
              <div className="client-card-top">
                <span className="client-tag">{t.clients.tagFood}</span>
                <span className="client-ext-icon" aria-hidden="true">↗</span>
              </div>
              <h3>Al Jazeera Foods</h3>
              <p>{t.clients.alJazeeraDesc}</p>
            </a>
            <a
              href="https://oggytoy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="client-card"
            >
              <div className="client-card-top">
                <span className="client-tag">{t.clients.tagToys}</span>
                <span className="client-ext-icon" aria-hidden="true">↗</span>
              </div>
              <h3>OggyToy</h3>
              <p>{t.clients.oggyToyDesc}</p>
            </a>
            <a
              href="https://www.kottakkalayurveda.ae"
              target="_blank"
              rel="noopener noreferrer"
              className="client-card"
            >
              <div className="client-card-top">
                <span className="client-tag">{t.clients.tagWellness}</span>
                <span className="client-ext-icon" aria-hidden="true">↗</span>
              </div>
              <h3>Kottakkal Ayurveda</h3>
              <p>{t.clients.kottakkalDesc}</p>
            </a>
          </div>
        </section>

        <section className="news">
          <article className="news-card">
            <p className="news-label">{t.news.tagStudio}</p>
            <h3>{t.news.studioTitle}</h3>
            <p>{t.news.studioDesc}</p>
            <a href="#contact">{t.news.studioLink}</a>
          </article>
          <article className="news-card">
            <p className="news-label">{t.news.tagPrintDigital}</p>
            <h3>{t.news.campaignTitle}</h3>
            <p>{t.news.campaignDesc}</p>
            <a href="#contact">{t.news.campaignLink}</a>
          </article>
        </section>

        <section className="contact" id="contact">
          <div className="contact-copy">
            <p className="eyebrow">{t.contact.eyebrow}</p>
            <h2>{t.contact.title}</h2>
            <p>{t.contact.lead}</p>
            <ul className="contact-points">
              <li>{t.contact.point1}</li>
              <li>{t.contact.point2}</li>
              <li>{t.contact.point3}</li>
            </ul>
          </div>
          <form className="contact-form" id="contactForm" noValidate onSubmit={handleSubmit}>
            <label>
              {t.contact.nameLabel}
              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </label>
            <label>
              {t.contact.emailLabel}
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </label>
            <label>
              {t.contact.needLabel}
              <select
                name="need"
                required
                value={formData.need}
                onChange={(e) => setFormData({ ...formData, need: e.target.value })}
              >
                <option value="">{t.contact.selectPlaceholder}</option>
                <option value={t.contact.optBrochure}>{t.contact.optBrochure}</option>
                <option value={t.contact.optPoster}>{t.contact.optPoster}</option>
                <option value={t.contact.optFlyer}>{t.contact.optFlyer}</option>
                <option value={t.contact.optDigital}>{t.contact.optDigital}</option>
                <option value={t.contact.optLabels}>{t.contact.optLabels}</option>
                <option value={t.contact.optLogo}>{t.contact.optLogo}</option>
                <option value={t.contact.optBranding}>{t.contact.optBranding}</option>
                <option value={t.contact.optOther}>{t.contact.optOther}</option>
              </select>
            </label>
            <label>
              {t.contact.messageLabel}
              <textarea
                name="message"
                rows={5}
                required
                placeholder={t.contact.messagePlaceholder}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </label>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
              style={isSubmitting ? { opacity: 0.7, cursor: "not-allowed" } : undefined}
            >
              {isSubmitting ? "..." : t.contact.btnSubmit}
            </button>
            <p
              className="form-status"
              id="formStatus"
              role="status"
              style={{ color: formStatus.color }}
            >
              {formStatus.message}
            </p>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <a className="logo" href="#top" aria-label="The Percentage Creative home">
            <Image
              src="/The Percentage FZ-LLC-SYMBOL ONLY.png"
              alt="The Percentage Creative Logo"
              width={32}
              height={32}
              className="logo-img"
            />
            <span className="logo-text">The Percentage Creative</span>
          </a>
          <p>{t.footer.tagline}</p>
        </div>
        <div className="footer-links">
          <a href="#services">{t.nav.services}</a>
          <a href="#clients">{t.nav.clients}</a>
          <a href="#contact">{t.nav.contact}</a>
        </div>
        <p className="copyright">© <span id="year">{new Date().getFullYear()}</span> The Percentage Creative. {t.footer.allRights}</p>
      </footer>
    </div>
  );
}
