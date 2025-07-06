import React from 'react';
import ServicePage from '../components/ServicePage';

function TypingPage() {
  const serviceName = "Pengetikan Kilat";
  const message = `permisi, saya ingin order jasa ${serviceName} bisa kak?`;
  const orderLink = `https://wa.me/6287777747297?text=${encodeURIComponent(message)}`;

  return (
    <ServicePage
      title={`Jasa ${serviceName}`}
      description="Butuh transkrip dokumen atau data entry dengan cepat dan akurat? Kami menyediakan jasa pengetikan dari file PDF, gambar, atau tulisan tangan dengan layanan kilat."
      image="/image/services/typing.jpg"
      price="IDR 20K"
      orderLink={orderLink}
    />
  );
}

export default TypingPage;