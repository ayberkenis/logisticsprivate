import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowsRotate,
  faGears,
  faGhost,
  faHouse,
  faSignal5,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Header() {
  const [serverStatus, setServerStatus] = React.useState(false);
  const goBack = () => {
    window.history.back();
  };
  const refreshPage = () => {
    window.location.reload();
  };

  React.useEffect(() => {
    axios.get("http://localhost:8000/api/status").then((response) => {
      if (response.data.status == 'online'){
        setServerStatus(true);
      } else {
        setServerStatus(false);
      }
    });
  }, []);

  return (
    <div className="app-header fixed">
      <div className="app-header-previous">
        <button className="app-header-button" onClick={goBack}>
          <FontAwesomeIcon icon={faArrowLeft} /> Geri
        </button>
        <a href="/" className="app-header-button">
          <FontAwesomeIcon icon={faHouse} /> Anasayfa
        </a>
      </div>
      <div className="app-header-title">
        <h1>10 ABV 29 - Yönetim Paneli</h1>
      </div>
      <div className="app-header-right">
        {serverStatus ? <button className="app-header-button bg-green-500">
          <FontAwesomeIcon icon={faSignal5} /> Çevrimiçi 
        </button>: 
        <button className="app-header-button bg-red-500">
          <FontAwesomeIcon icon={faGhost} /> Çevrimdışı
        </button>
        }
        
        <button className="app-header-button" onClick={refreshPage}>
          <FontAwesomeIcon icon={faArrowsRotate} /> Yenile
        </button>
        <a className="app-header-button" href="/settings">
          <FontAwesomeIcon icon={faGears} /> Ayarlar
        </a>
      </div>
    </div>
  );
}

function Footer() {

  return (
    <div className="app-footer bottom-0 w-full bg-black text-white text-center py-4 mt-20">
      <span className="app-footer-text">
        10 ABV 29 - Yönetim Paneli - 2023 - Tüm hakları saklıdır.
      </span>
    </div>
  );
  
}

export default function Layout({ children }) {
  return (
    <div className="app-layout">
      <Header></Header>
      <div className="app-layout-content">{children}</div>
      <Footer></Footer>
    </div>
  );
}
