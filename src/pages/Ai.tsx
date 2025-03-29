import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonInput, IonButton, IonIcon } from "@ionic/react";
import React from "react";
import axios from "axios";
import "./Ai.css"; // Import the CSS file
import { chatboxEllipsesOutline } from "ionicons/icons";

function Ai() {
    const [list, setList] = React.useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = React.useState('');

    const fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:4000/chat', { content: input });
            const data = response.data.candidates[0].content.parts[0].text;
            setList((prev) => [...prev, { role: 'bot', content: data }]);
        } catch (error) {
            console.error("Error fetching response:", error);
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return; // Prevent empty messages
        setList((prev) => [...prev, { role: 'user', content: input }]);
        setInput('');
        fetchData();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="add-toolbar">
                    <IonTitle><IonIcon icon={chatboxEllipsesOutline}></IonIcon>  ChatBot</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="chat-container">
                <div className="chat-box">
                    {list.map((item, index) => (
                        <div key={index} className={`message ${item.role === 'user' ? 'user' : 'bot'}`}>
                            <span className="role">{item.role === 'user' ? "You" : "Bot"}</span>
                            <p className="content">{item.content}</p>
                        </div>
                    ))}
                </div>

                <div className="input-container">
                    <IonInput 
                        className="chat-input"
                        value={input}
                        onIonInput={(e) => setInput(e.detail.value!)}
                        placeholder="Type a message..."
                    />
                    <IonButton className="add-toolbar" onClick={onSubmit} color="">Send</IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Ai;
