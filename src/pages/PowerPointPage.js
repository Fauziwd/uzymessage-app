// src/pages/PowerPointPage.js
import React from 'react';
import ServicePage from '../components/ServicePage';

function PowerPointPage() {
  const serviceName = "Pembuatan Presentasi PowerPoint";
  const message = `permisi, saya ingin order jasa ${serviceName} bisa kak?`;
  const orderLink = `https://wa.me/6287777747297?text=${encodeURIComponent(message)}`;

  return (
    <ServicePage
      title={`Jasa ${serviceName}`}
      description="Kami membuat presentasi PowerPoint yang profesional, menarik, dan informatif untuk kebutuhan bisnis, akademik, atau personal Anda. Desain slide yang bersih dan modern untuk menyampaikan pesan Anda dengan efektif."
      image="/image/services/powerpoint-banner.jpg"
      price="IDR 100K"
      orderLink={orderLink}
    />
  );
}

export default PowerPointPage;