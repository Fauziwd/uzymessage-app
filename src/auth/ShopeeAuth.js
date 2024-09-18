import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const clientId = 'your-client-id';
const clientSecret = process.env.REACT_APP_SHOPEE_CLIENT_SECRET; // Ambil dari variabel lingkungan
const redirectUri = 'http://localhost:3000/shopee-callback'; // Sesuaikan dengan URL aplikasi Anda

function ShopeeAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      fetch(`https://partner.shopeemobile.com/api/v2/auth/token/get`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
        },
        body: JSON.stringify({
          code,
          shop_id: 'your-shop-id',
          partner_id: 'your-partner-id'
        })
      })
      .then(response => response.json())
      .then(data => {
        // Simpan token di Firestore atau Firebase Authentication
        navigate('/notes');
      })
      .catch(error => console.error('Error:', error));
    }
  }, [navigate]);

  const loginWithShopee = () => {
    window.location.href = `https://partner.shopeemobile.com/api/v2/shop/auth_partner?partner_id=${clientId}&redirect=${redirectUri}`;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      <button onClick={loginWithShopee} className="bg-white text-blue-600 px-4 py-2 rounded">
        Login with Shopee
      </button>
    </div>
  );
}

export default ShopeeAuth;
