import axios from "axios";
import React from "react";
import { kdvCalculation, userFriendlyDate } from "../utils/helpers";

function MonthlyDetailsPage() {
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

    const [data, setData] = React.useState(null);
    const [responseStatus, setResponseStatus] = React.useState(null);

    function handleDeleteButton(button) {
        const transaction_id = button.target.parentNode.parentNode.firstChild.innerHTML;
        console.log(transaction_id);
        axios
            .delete("http://localhost:8000/api/transactions/delete", { data: { id: transaction_id } })
            .then((response) => {
                console.log(response.data); // Access response data using response.data
                setResponseStatus(response.status); // Set state with the response data
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    React.useEffect(() => {
        axios
            .get("http://localhost:8000/api/transactions")
            .then((response) => {
                console.log(response.data); // Access response data using response.data
                setData(response.data); // Set state with the response data
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className="monthly-details">
            <h1 className="font-[Lora] text-lg font-semibold text-center w-full border-b-2 border-black py-4">
                {thisMonthStart} - {thisMonthEnd} arası işlem gerçekleşen işlemler
            </h1>
            <div className="monthly-details-menu">
                <button className="btn-option">Tüm İşlemler</button>
                <button className="btn-option">Gelirler</button>
                <button className="btn-option">Giderler</button>
                <button className="btn-option">KDV Ödemeleri</button>
                <button className="btn-option">Koop. Ödemeleri</button>
                <button className="btn-option">Aidat Ödemeleri</button>
                <button className="btn-option">Yönetim Ödemeleri</button>
                <button className="btn-option">Diğer Ödemeler</button>
            </div>
            {data ? (
            <table className="table-fixed w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2">İşlem ID</th>
                        <th className="px-4 py-2">İşlem Tarihi</th>
                        <th className="px-4 py-2">İşlem Saati</th>
                        <th className="px-4 py-2">İşlemi Gerçekleştiren</th>
                        <th className="px-4 py-2">İşlem Türü</th>
                        <th className="px-4 py-2">İşlem Kaynağı</th>
                        <th className="px-4 py-2">İşlem Açıklaması</th>
                        <th className="px-4 py-2">İşlem Tutarı</th>
                        <th className="px-4 py-2">KDV Oranı</th>
                        <th className="px-4 py-2">KDV Tutarı</th>
                        <th className="px-4 py-2">İşlem Eklenme Tarihi</th>
                        <th className="px-4 py-2">İşlemi Düzenle</th>{" "}
                        {/* TODO: Add edit/delete button */}
                    </tr>
                </thead>
                <tbody>

                    
                        {data.map((item) => {
                            return (
                                <tr>
                                    <>
                                        <td className="border px-4 py-2">{item.id}</td>
                                        <td className="border px-4 py-2">
                                            {userFriendlyDate(item.date)}
                                        </td>
                                        <td className="border px-4 py-2">{item.time}</td>
                                        <td className="border px-4 py-2">{item.owner}</td>
                                        <td className="border px-4 py-2">{item.type}</td>
                                        <td className="border px-4 py-2">{item.source}</td>
                                        <td className="border px-4 py-2">{item.description}</td>
                                        <td className="border px-4 py-2">{item.amount}TL</td>
                                        <td className="border px-4 py-2">{item.kdv_rate}%</td>
                                        <td className="border px-4 py-2">
                                            {kdvCalculation(item.amount, item.kdv_rate)}TL
                                        </td>
                                        <td className="border px-4 py-2">
                                            {userFriendlyDate(item.added_at)}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <button className="btn-edit">Düzenle</button>
                                            <button className="btn-remove" onClick={handleDeleteButton}>Kaldır</button>
                                        </td>
                                    </>
                                </tr>
                            );
                        })
                        }
                </tbody>
            </table>
            ) : (
                        <p className="text-red-500 w-full text-center text-lg font-bold my-10">Bir işlem kaydı bulunamadı.
                        Yeni bir işlem kaydı eklemek için <a href="/monthly" className="text-blue-500">buraya</a> tıklayın.
                        </p>
                    )}
        </div>
    );
}

export default MonthlyDetailsPage;
