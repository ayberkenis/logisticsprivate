import { useEffect, useState } from "react";
import { secondsToTimeFormat, arventoDateTimetoHuman } from "../utils/helpers";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePause,
    faCircleStop,
    faClock,
    faGauge,
    faGaugeHigh,
    faMapMarker,
    faRoad,
    faStar,
} from "@fortawesome/free-solid-svg-icons";

function LocationStatistics() {
    const [locationData, setLocationData] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/locations")
            .then((response) => {
                console.log(response.data);
                setLocationData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching location data:", error);
            });
    }, []);

    return (
        <div className="location-statistics w-2/3 my-8 py-8">
            <h2 className="mt-12 text-2xl font-[Lora] font-bold">
                Konum İstatistikleri
            </h2>
            {locationData ? (
                locationData.Record["722153"].map((location) =>
                    location.ADDRESS ? (
                        <div
                            key={location.DATE_TIME}
                            className="even:bg-zinc-200 odd:bg-zinc-300 py-4 px-4"
                        >
                            <div className="flex flex-row gap-8 justify-between">
                                <FontAwesomeIcon icon={faMapMarker} />

                                <p className="font-semibold">{location.ADDRESS}</p>
                                <p className="font-semibold">
                                    {arventoDateTimetoHuman(location.DATE_TIME)}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )
                )
            ) : (
                <p>Konum istatistikleri yükleniyor</p>
            )}
        </div>
    );
}

function DailyStatistics({ data }) {
    const todayLocale = new Date().toLocaleString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    if (data === null) {
        return (
            <div className="daily-statistics w-2/3 my-8 py-8">
                <h2 className="mt-12 text-2xl font-[Lora] font-bold animate-pulse">
                    Arvento'ya bağlanmaya çalışıyoruz.
                </h2>
            </div>
        );
    }

    console.log(data.IGNTIME);

    if (data.IGNTIME === -1) {
        return (
            <div className="daily-statistics w-2/3 my-8 py-8">
                <h2 className="mt-12 text-2xl font-[Lora] font-bold">
                    İsmail Okur, Bugün ({todayLocale}) aracı çalıştırıp hareket etmedi.{" "}
                </h2>
            </div>
        );
    }

    return (
        <div className="daily-statistics w-2/3 my-8 py-8">
            <h2 className="mt-12 text-2xl font-[Lora] font-bold">
                Günlük İstatistik
            </h2>
            <div className="monthly-statistics-table mt-8">
                <div className="card">
                    <div className="mt-4 grid grid-cols-2 gap-8 ">
                        <div className="statistics-single-item">
                            <span>
                                <FontAwesomeIcon icon={faRoad} />
                            </span>
                            <p className="font-semibold">Bugün katedilen mesafe:</p>
                            <p className="statistics-value">{data.DISTANCE} km</p>
                        </div>
                        <div className="statistics-single-item">
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            <p className="font-semibold">Çalışma süresi:</p>
                            <p className="statistics-value">
                                {secondsToTimeFormat(data.IGNTIME > 0 ? data.IGNTIME : 0)}
                            </p>
                        </div>
                        <div className="statistics-single-item">
                            <span>
                                <FontAwesomeIcon icon={faCirclePause} />
                            </span>
                            <p className="font-semibold">Bekleme süresi:</p>
                            <p className="statistics-value">
                                {secondsToTimeFormat(data.IDLING)}
                            </p>
                        </div>
                        <div className="statistics-single-item">
                            <span>
                                <FontAwesomeIcon icon={faCircleStop} />
                            </span>
                            <p className="font-semibold">Duraklama süresi:</p>
                            <p className="statistics-value">
                                {secondsToTimeFormat(data.STANDSTILL)}
                            </p>
                        </div>
                        <div className="statistics-single-item">
                            <span>
                                <FontAwesomeIcon icon={faGaugeHigh} />
                            </span>
                            <p className="font-semibold">Maksimum Hız:</p>
                            <p className="statistics-value">{data.MAXSPEED}km/h</p>
                        </div>
                        <div className="statistics-single-item">
                            <span>
                                <FontAwesomeIcon icon={faGauge} />
                            </span>
                            <p className="font-semibold">Ortalama Hız:</p>
                            <p className="statistics-value">
                                {data.AVERAGE_SPEED ? data.AVERAGE_SPEED : 0}km/h
                            </p>
                        </div>
                        <div className="statistics-single-item">
                            <span>
                                <FontAwesomeIcon icon={faStar} />
                            </span>
                            <p className="font-semibold">Sürücü Skoru:</p>
                            <p className="statistics-value">
                                {" "}
                                {data.SAFEDRIVESCORE
                                    ? data.SAFEDRIVESCORE
                                    : "PUAN YOK"}/100{" "}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MonthlyStatistics() {
    const [data, setData] = useState(null);
    const thisMonthStart = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
    ).toLocaleString("tr", { day: "numeric", month: "long" });
    const thisMonthEnd = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
    ).toLocaleString("tr", { day: "numeric", month: "long" });

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/monthly-statistics")
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            });
    }, []);

    if (data) {
        return (
            <div className="monthly-statistics w-full">
                <h2 className="mt-12 text-2xl font-[Lora] font-bold">
                    Aylık İstatistik ({thisMonthStart} - {thisMonthEnd})
                </h2>
                <div className="monthly-statistics-table">
                    {data.length > 0 ? (
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Araç</th>
                                    <th className="px-4 py-2">Plaka</th>
                                    <th className="px-4 py-2">Sürücü</th>
                                    <th className="px-4 py-2">Toplam KM</th>
                                    <th className="px-4 py-2">Toplam Yakıt</th>
                                    <th className="px-4 py-2">Toplam Çalışma Süresi</th>
                                    <th className="px-4 py-2">Yakıt Tüketimi</th>
                                    <th className="px-4 py-2">Ortalama Hız</th>
                                    <th className="px-4 py-2">Maksimum Hız</th>
                                    <th className="px-4 py-2">Sırasız</th>
                                    <th className="px-4 py-2">Sıralı</th>
                                    <th className="px-4 py-2">Toplam Harcırah</th>
                                    <th className="px-4 py-2">Toplam Masraf</th>
                                    <th className="px-4 py-2">Toplam Bakım Masrafı</th>
                                    <th className="px-4 py-2">Toplam Diğer Masraf</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((settings) => (
                                    <tr>
                                        <td className="px-4 py-2">{settings.vehicle}</td>
                                        <td className="px-4 py-2">{settings.plate}</td>
                                        <td className="px-4 py-2">{settings.driver}</td>
                                        <td className="px-4 py-2">{settings.total_distance}</td>
                                        <td className="px-4 py-2">{settings.total_fuel_cost}</td>
                                        <td className="px-4 py-2"></td>
                                        <td className="px-4 py-2"></td>
                                        <td className="px-4 py-2">{settings.sirasiz}</td>
                                        <td className="px-4 py-2">{settings.sirali}</td>
                                        <td className="px-4 py-2">{settings.toplam_harcirah}</td>
                                        <td className="px-4 py-2">{settings.total_cost}</td>
                                        <td className="px-4 py-2">
                                            {settings.total_maintenance_cost}
                                        </td>
                                        <td className="px-4 py-2">{settings.additional_costs}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <h2 className="mt-12 text-lg font-[Lora] font-bold animate-pulse">
                            Herhangi bir veri bulunamadı.
                        </h2>
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <h1 className="text-2xl w-full text-center"> Sunucuya ulaşılamıyor. </h1>
        );
    }
}

export { DailyStatistics, MonthlyStatistics, LocationStatistics };
