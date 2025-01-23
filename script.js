document.addEventListener("DOMContentLoaded", function () {
    // Browsersprache ermitteln und Sprachrichtung setzen
    const userLang = navigator.language || navigator.userLanguage;
    const rtlLanguages = ["ar", "he", "fa", "ur"];
    document.body.setAttribute("dir", rtlLanguages.some(lang => userLang.startsWith(lang)) ? "rtl" : "ltr");

    // Schutz: document.write deaktivieren da oldschool
    document.write = function () {
        console.warn("document.write wurde blockiert!");
    };

    // innerHTML verbieten  
    Object.defineProperty(Element.prototype, 'innerHTML', {
        set: function () {
            console.warn("Änderung von innerHTML wurde blockiert!");
        }
    });

    // Funktion für den Button-Prozess
    document.getElementById('process-button').addEventListener('click', () => {
        const exampleTexts = [
            "Der Entwickler hat seine Aufgabe erfolgreich abgeschlossen.",
            "Der Arzt untersucht seine Patienten sorgfältig.",
            "Ein Student schrieb eine bemerkenswerte Arbeit."
        ];

        const replacements = {
            "Der Entwickler hat seine Aufgabe erfolgreich abgeschlossen.": "Die Entwickler:innen haben ihre Aufgaben erfolgreich abgeschlossen.",
            "Der Arzt untersucht seine Patienten sorgfältig": "Die Ärzt:innen untersuchen ihre Patienten sorgfältig.",
            "Ein Student schrieb eine bemerkenswerte Arbeit": "Die Student:innen schrieben eine bemerkenswerte Arbeit."
        };

        // potentielle gefährliche zeichen nach Flanagan entschärfen
        const escapeHTML = (text) => {
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;',
                "/": '&#x2F;'
            };
            return text.replace(/[&<>"'/]/g, (m) => map[m]);
        };

        // verarbeitung der texte mit gendering sowie die sicherheitßsmaßnahmen
        const processedTexts = exampleTexts.map(text => {
            let updatedText = text;
            for (const [key, value] of Object.entries(replacements)) {
                updatedText = updatedText.replace(new RegExp(key, "g"), value);
            }
            return escapeHTML(updatedText); // gefährliche zeichen werden escaped
        });

        // (hoffentlich :D sichere eingabe im document object model)
        let resultElement = document.getElementById('result-text');
        resultElement.innerHTML = '';
        resultElement.appendChild(document.createTextNode(processedTexts.join(" "))); // Keine Injektion möglich
    });
});
