import React from 'react';
import ServicePage from '../components/ServicePage';

function SocialMediaPage() {
  const serviceName = "Desain Konten Media Sosial";
  const message = `permisi, saya ingin order jasa ${serviceName} bisa kak?`;
  const orderLink = `https://wa.me/6287777747297?text=${encodeURIComponent(message)}`;

  return (
    <ServicePage
      title={`Jasa ${serviceName}`}
      description="Tingkatkan engagement di media sosial Anda dengan konten visual yang konsisten dan menarik. Kami menyediakan paket desain feed Instagram, Facebook post, dan story."
      image="/image/services/social-media.jpg"
      price="IDR 250K"
      orderLink={orderLink}
    />
  );
}

export default SocialMediaPage;