import React from 'react';
import ServicePage from '../components/ServicePage';

function VideoEditingPage() {
  const serviceName = "Editing Video Kreatif";
  const message = `permisi, saya ingin order jasa ${serviceName} bisa kak?`;
  const orderLink = `https://wa.me/6287777747297?text=${encodeURIComponent(message)}`;

  return (
    <ServicePage
      title={`Jasa ${serviceName}`}
      description="Ubah rekaman mentah Anda menjadi video yang dinamis dan profesional. Kami melayani editing video untuk konten YouTube, iklan, profil perusahaan, dan lainnya."
      image="/image/services/video-edit.jpg"
      price="IDR 400K"
      orderLink={orderLink}
    />
  );
}

export default VideoEditingPage;