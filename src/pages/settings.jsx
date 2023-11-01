import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SettingsPage() {
    const [settingsData, setSettingsData] = useState([]);
    const [settingsSaveStatus, setSettingsSaveStatus] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:8000/api/settings')
            .then((response) => {
                console.log(response.data);
                setSettingsData(response.data);
            });
    }, []);

    function saveSetting(event) {
        event.preventDefault();
    
        // Get the setting_id and setting_value from the button and its parent form element
        const setting_id = event.target.getAttribute('data-settings-id');
        const setting_name = event.target.getAttribute('data-settings-name');
        const setting_value = event.target.parentElement.querySelector('input').value;
    
        // Create the data to be sent in the POST request
        const postBody = {

                id: setting_id,
                name: setting_name,
                value: setting_value,

        };
    
        // Send a POST request to the server to save the setting
        axios
            .patch('http://localhost:8000/api/settings/update', postBody)
            .then((response) => {
                // Log the response data from the server
                console.log(response.data);
                document.getElementsByClassName('settings-item')[setting_id-1].classList.add('bg-green-500').classList.add('animate-pulse').classList.add('px-8');
                

            })
            .catch((error) => {
                // Handle any errors that may occur during the request
                console.error(error);
                setSettingsSaveStatus(false);
            });
    }
    
    
    return (
        <div className="settings-page page-content">
            <h1 className="text-2xl font-bold font-[Lora] w-full mx-auto text-center">Ayarlar</h1>
            <p className="w-full mx-auto text-center text-zinc-500 py-8">Aşağıdaki ayarları değiştirebilirsiniz. 
            Ayarları değiştirmek için lütfen ilgili ayarın yanındaki kutucuğa tıklayın ve değeri değiştirin. Sonrasında KAYDET butonuna tıklayın. 
            <br></br>
            <span className="font-bold">Ayarları değiştirirken dikkatli olunuz. Bu ayarlar yönetim panelinin yönetimini sağlar.</span>
            </p>

            {settingsData.length > 0 ? (
                // Sort settingsData by id and then map
                settingsData
                    .sort((a, b) => a.id - b.id) // Sort by id in ascending order
                    .map((settings) => (
                        <div className="settings-item w-full flex flex-row items-baseline" key={settings.id}>
                            <form className="form-input-row !w-full" onSubmit={saveSetting} data-settings-id={settings.id} data-settings-name={settings.name}>
                                <label className="form-label w-1/3">{settings.name}</label>
                                <input type="text" className="form-input mx-12 w-1/3" defaultValue={settings.value}></input>

                                <button type="submit" className="btn btn-option h-full w-1/3" data-setting-id={settings.id}>Kaydet</button>
                            </form>
                        </div>
                    ))
            ) : (
                <p>Ayar bulunamadı.</p>
            )}

        </div>
    );
}
