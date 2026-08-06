window.AchieversSiteData = {
  phoneDisplay: '+256 744 321121',
  phoneHref: 'tel:+256744321121',
  emailDisplay: 'achievers256@gmail.com',
  emailHref: 'mailto:achievers256@gmail.com',
  whatsappDisplay: '+256 702 132630 (Chat)',
  whatsappHref: 'https://wa.me/256702132630',
  locationDisplay: 'Kampala, Uganda',
  mapsHref: 'https://maps.app.goo.gl/XExUnmnAgf465hiq6'
};

function applyContactText(name, value) {
  document.querySelectorAll(`[data-contact-text="${name}"]`).forEach((element) => {
    element.textContent = value;
  });
}

function applyContactLink(name, href) {
  document.querySelectorAll(`[data-contact-link="${name}"]`).forEach((element) => {
    element.href = href;
  });
}

function applySharedContactData() {
  const contact = window.AchieversSiteData;

  applyContactText('phone', contact.phoneDisplay);
  applyContactText('email', contact.emailDisplay);
  applyContactText('whatsapp', contact.whatsappDisplay);
  applyContactText('location', contact.locationDisplay);

  applyContactLink('phone', contact.phoneHref);
  applyContactLink('email', contact.emailHref);
  applyContactLink('whatsapp', contact.whatsappHref);
  applyContactLink('maps', contact.mapsHref);
}

// Expose it to other scripts
window.applySharedContactData = applySharedContactData;

document.addEventListener('DOMContentLoaded', applySharedContactData);
