import React from 'react';
import ServicePage from '../components/ServicePage';

function ThumbnailPage() {
  const serviceName = "Desain Thumbnail YouTube";
  const message = `permisi, saya ingin order jasa ${serviceName} bisa kak?`;
  const orderLink = `https://wa.me/6287777747297?text=${encodeURIComponent(message)}`;

  return (
    <ServicePage
      title={`Jasa ${serviceName}`}
      description="Dapatkan lebih banyak klik dengan thumbnail YouTube yang memikat. Kami merancang thumbnail yang sesuai dengan branding channel Anda dan membuat penonton penasaran."
      image="/image/services/youtube-thumb.jpg"
      price="IDR 50K"
      orderLink={orderLink}
    />
  );
}

export default ThumbnailPage;