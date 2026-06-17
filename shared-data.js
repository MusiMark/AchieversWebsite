window.AchieversSiteData = {
  phoneDisplay: '+256 772 34567',
  phoneHref: 'tel:+25677234567',
  emailDisplay: 'achievers256@gmail.com',
  emailHref: 'mailto:achievers256@gmail.com',
  whatsappDisplay: '+256 772 34567 (Chat)',
  whatsappHref: 'https://wa.me/25677234567',
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

document.addEventListener('DOMContentLoaded', applySharedContactData);
