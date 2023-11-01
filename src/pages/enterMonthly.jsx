import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { KoopTransaction } from "../popup/quickTransactions";
import Axios from "axios";

export default function EnterMonthly() {
  const todayDate = new Date().toISOString().split("T")[0];
  const nowTime = new Date().toLocaleTimeString("tr-TR", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  });

  const [owner, setOwner] = useState("ismailokur");
  const [date, setDate] = useState(todayDate);
  const [time, setTime] = useState(nowTime);
  const [otherOption, setOtherOption] = useState(false);
  const [otherValue, setOtherValue] = useState("");
  const [girisCikis, setGirisCikis] = useState("giris");
  const [type, setType] = useState("koopodeme");
  const [category, setCategory] = useState("koopodeme");
  const [source, setSource] = useState("koopodeme");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [showKoopTransaction, setShowKoopTransaction] = useState(false);

  const openKoopodemePopup = () => {
    setShowKoopTransaction(true);
  };

  const closeKoopodemePopup = () => {
    setShowKoopTransaction(false);
  };

  const refreshDate = () => {
    const date = new Date().toISOString().split("T")[0];
    return date;
  };

  const refreshTime = () => {
    const time = new Date().toLocaleTimeString("tr-TR", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
    });
    return time;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("Form submitted!");

    const sanitizedBody = {
      date: date,
      time: time,
      owner: owner,
      type: type,
      category: category,
      source: source,
      description: description,
      amount: amount,
    };

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };

    try {
      console.log(sanitizedBody);
      const response = await Axios.post("http://localhost:8000/api/transactions/add", sanitizedBody, { headers });

      console.log("API Response:", response.data);
    } catch (error) {
      console.error("API Request Error:", error);
    }
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleOptionChange = (event) => {
    if (event.target.value === "diger") {
      setOtherOption(true);
    } else {
      setOtherOption(false);
    }
    setOwner(event.target.value);
  };

  const handleOtherInputChange = (event) => {
    setOtherValue(event.target.value);
  };

  const handleGirisCikisChange = (event) => {
    setGirisCikis(event.target.value);
    setType(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSourceChange = (event) => {
    setSource(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div className="enter-details">
      {showKoopTransaction ? (
        <KoopTransaction closePopup={closeKoopodemePopup} />
      ) : null}
      <h1 className="text-center text-lg font-bold py-8">İşlem Girişi Yap</h1>
      <p className="text-center w-full text-lg font-semibold font-[Lora] text-zinc-800">
        Aşağıdaki butonlara tıklayarak hızlıca işlem girebilirsiniz.
      </p>
      <div className="quick-details mb-10 border border-opacity-50 py-8">
        <button className="btn-primary" onClick={openKoopodemePopup}>
          Kooperatif Ödemesi Girişi
        </button>
        <button className="btn-primary">Tamir/Bakım Ödemesi Girişi</button>
        <button className="btn-primary">Maaş Ödemesi Girişi</button>
        <button className="btn-primary">Muhtasar Ödemesi Girişi</button>
        <button className="btn-primary">Peşin Ödeme Girişi</button>
        <button className="btn-primary">Para Transferi Girişi</button>
      </div>
      <p className="text-center w-full text-lg font-semibold font-[Lora] text-zinc-800 mb-8">
        Daha detaylı bilgi girişi için aşağıdaki formu kullanabilirsiniz.
      </p>
      <form className="details-form" onSubmit={handleSubmit}>
        <div className="form-input-wrapper">
          <div className="form-input-row">
            <label className="form-label">İşlem Tarihi</label>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="form-input"
            />
            <input
              type="time"
              value={time}
              onChange={handleTimeChange}
              className="form-input-2"
            />
            <button
              type="button"
              className="btn-today bg-white ml-4 px-2 py-2 w-full hover:bg-black hover:text-white"
              onClick={() => {
                setDate(refreshDate());
                setTime(refreshTime());
              }}
            >
              <FontAwesomeIcon icon={faArrowsRotate} /> Bugünü seç
            </button>
          </div>
          <span className="form-info text-sm text-zinc-600">
            Bugünün tarihi ve saati otomatik olarak seçilmiştir. İşlem tarihini değiştirmek için lütfen sağdaki alanları kullanınız.
          </span>
        </div>

        <div className="form-input-wrapper">
          <div className="form-input-row">
            <label className="form-label">İşlem Yapan</label>
            <select className="form-input" onChange={handleOptionChange}>
              <option disabled>İşlem Yapan Kişi/Kurum Seçiniz</option>
              <option value="İsmail Okur">İSMAİL OKUR</option>
              <option value="Ayberk Enis Yılmaz">AYBERK ENİS YILMAZ</option>
              <option value="Fethi Yılmaz">FETHİ YILMAZ</option>
              <option value="Bandırma Damperli Taşıyıcılar KOOP.">BANDIRMA DAMPERLİ TAŞIYICILAR KOOP</option>
              <option value="Diğer">DİĞER</option>
            </select>
          </div>
          {otherOption && (
            <div className="form-input-row">
              <label className="form-label text-red-500">Diğer İşlem Açıklaması**</label>
              <input
                type="text"
                value={otherValue}
                onChange={handleOtherInputChange}
                className="form-input"
                required
                placeholder="BU ALANIN DOLDURULMASI ZORUNLUDUR."
              />
            </div>
          )}
        </div>

        <div className="form-input-wrapper">
          <div className="form-input-row">
            <label className="form-label">İşlem Türü</label>
            <select className="form-input" onChange={handleGirisCikisChange}>
              <option disabled>İşlem Türü Seçiniz</option>
              <option value="Para Çıkışı">Para Çıkışı</option>
              <option value="Para Girişi">Para Girişi</option>
            </select>
          </div>
        </div>

        <div className="form-input-wrapper">
          <div className="form-input-row">
            <label className="form-label">İşlem Kategorisi</label>
            <select className="form-input" onChange={handleCategoryChange}>
              <option disabled>İşlem Kategorisi Seçiniz</option>
              {girisCikis === "Para Girişi" ? (
                <>
                  <option value="Kooperatif Ödeme">Kooperatif Ödeme</option>
                  <option value="Peşin/Elden">Peşin/Elden</option>
                  <option value="Fatura">Fatura</option>
                  <option value="Transfer">Transfer (Hesaptan Hesaba)</option>
                </>
              ) : (
                <>
                  <option value="Bakım, Tamir veya Onarım">Bakım, Tamir veya Onarım</option>
                  <option value="Mazot Fişi">Mazot Fişi</option>
                  <option value="Muhtasar">Muhtasar</option>
                  <option value="Maaş Ödemesi">Maaş Ödemesi</option>
                </>
              )}
            </select>
          </div>
        </div>

        <div className="form-input-wrapper">
          <div className="form-input-row">
            <label className="form-label">İşlem Kaynağı</label>
            <select className="form-input" onChange={handleSourceChange}>
              <option disabled>İşlem Kaynağı Seçiniz</option>
              <option value="Banka">Banka</option>
              <option value="Kooperatif">Kooperatif</option>
              <option value="Elden/Peşin">Elden/Peşin</option>
            </select>
          </div>
        </div>

        <div className="form-input-wrapper">
          <div className="form-input-row">
            <label className="form-label">İşlem Açıklaması</label>
            <input
              type="text"
              placeholder="NAKLİYAT/BAKIM GİDERİ/FATURASIZ İŞ/SİGORTA/KASKO VB."
              className="form-input"
              onChange={handleDescriptionChange}
            />
          </div>
        </div>

        <div className="form-input-wrapper">
          <div className="form-input-row">
            <label className="form-label">İşlem Tutarı</label>
            <input
              type="number"
              className="form-input"
              placeholder="0.00"
              onChange={handleAmountChange}
              defaultValue="0.00"
            />
          </div>
          <span className="form-info text-sm text-zinc-600">
            KDV dahil tutar giriniz. KDV tutarı otomatik olarak %20'den hesaplanacaktır.
          </span>
        </div>

        <button type="submit" className="btn-submit">
          İŞLEMİ KAYDET
        </button>
      </form>
    </div>
  );
}
