import React from "react"
import driver from "../assets/driver.png"
import { DailyStatistics, MonthlyStatistics, LocationStatistics } from "../commonComponents/statistics";
import Axios from 'axios';

    
const thisMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toLocaleString('tr', { day: 'numeric', month: 'long' });
const thisMonthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toLocaleString('tr', { day: 'numeric', month: 'long' });



export default function WelcomePage() {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        Axios.get('http://localhost:8000/api/dashboard').then((response) => {
            console.log(response.data.Data[0]);
            setData(response.data.Data[0]);
        });
    }, []);

    return (
        <div className="welcome-page">
            <h1 className="header">
                10 ABV 29 - Yönetim Panelinize Hoşgeldiniz
            </h1>
            <span>
                Lütfen yapmak istediğiniz işlemi seçiniz
            </span>
            <div className="welcome-page-options">
                <a href="/monthly" className="btn-option">
                    İşlem Girişi Yap
                </a>
                <a href="/month" className="btn-option">
                    {thisMonthStart} - {thisMonthEnd} İşlem Kayıtları
                </a>
                <button type="button" className="btn-option">
                    Kar/Zarar Tablosu
                </button>
                <button type="button" className="btn-option">
                    Excel Çıktısı
                </button>
                <button type="button" className="btn-option">
                    Ayarlar
                </button>
            </div>

            <span className="mt-12 text-2xl font-[Lora] font-bold">
                Sürücü Bilgileri
            </span>
            <div className="driver">
                <div className="driver-left">
                    <img src={driver} alt="Driver" className="w-48 hover:scale-110 transition-all ease-in-out duration-300"></img>
                </div>
                <div className="driver-right">
                    <p>
                        <span className="font-bold text-lg">İsim Soyisim:</span> İSMAİL OKUR
                    </p>
                    <p>
                        <span className="font-bold text-lg">İşe giriş tarihi:</span> 12/09/2023
                    </p>
                    <p>
                        <span className="font-bold text-lg">Toplam Kilometre:</span> 123.456
                    </p>
                    <p>
                        <span className="font-bold text-lg">Toplam Sırasız</span> 24
                    </p>
                    <p>
                        <span className="font-bold text-lg">Toplam Sıralı</span> 24
                    </p>
                </div>

            </div>

            <DailyStatistics data={data}></DailyStatistics>
            <LocationStatistics></LocationStatistics>
            <MonthlyStatistics></MonthlyStatistics>
            </div>
           
            

    );
}