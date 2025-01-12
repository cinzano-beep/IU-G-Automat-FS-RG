// Button zum Bearbeiten der Texte
document.getElementById('process-button').addEventListener('click', () => {
    // Originaltexte (Beispieltexte aus dem Content-Bereich)
    const exampleTexts = [
        "Der Entwickler hat seine Aufgabe erfolgreich abgeschlossen.",
        "Der Arzt untersucht seine Patienten sorgfältig.",
        "Ein Student schrieb eine bemerkenswerte Arbeit."
    ];

    // Funktion zur gendersensiblen Bearbeitung
    const processedTexts = exampleTexts.map(text => {
        return text
            .replace("Der Entwickler", "Die Entwicklerin")
            .replace("seine Aufgabe", "ihre Aufgabe")
            .replace("Der Arzt", "Die Ärztin")
            .replace("seine Patienten", "ihre Patient:innen")
            .replace("Ein Student", "Eine Studentin");
    });

    // Ausgabe der bearbeiteten Texte
    document.getElementById('result-text').textContent = processedTexts.join(" ");
});
