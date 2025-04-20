// Funzione per salvare i valori nel localStorage
function saveValues() {
    const formData = {};
    document.querySelectorAll('input[type="number"]').forEach(input => {
        if (input.value) {
            // Salva il valore corrente
            formData[input.id] = input.value;
            
            // Ottieni i valori precedenti per questo campo
            let previousValues = JSON.parse(localStorage.getItem(input.id + '_history') || '[]');
            
            // Aggiungi il nuovo valore se non esiste già
            if (!previousValues.includes(input.value)) {
                previousValues.push(input.value);
                // Mantieni solo gli ultimi 5 valori
                if (previousValues.length > 5) {
                    previousValues = previousValues.slice(-5);
                }
                localStorage.setItem(input.id + '_history', JSON.stringify(previousValues));
            }
        }
    });
}

// Funzione per caricare i valori dal localStorage
function loadValues() {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        console.log('Valori caricati:', formData);
        Object.keys(formData).forEach(key => {
            const input = document.getElementById(key);
            if (input) {
                input.value = formData[key];
            }
        });
    }
}

// Funzione per mostrare i suggerimenti
function showSuggestions(input) {
    const suggestionsContainer = input.nextElementSibling;
    if (!suggestionsContainer) return;
    
    // Ottieni la cronologia dei valori per questo campo
    const previousValues = JSON.parse(localStorage.getItem(input.id + '_history') || '[]');
    
    suggestionsContainer.innerHTML = '';
    
    if (previousValues.length > 0) {
        previousValues.forEach(value => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.textContent = value;
            div.onclick = (e) => {
                e.stopPropagation(); // Previene la propagazione del click
                input.value = value;
                suggestionsContainer.classList.remove('active');
                saveValues();
            };
            suggestionsContainer.appendChild(div);
        });
        suggestionsContainer.classList.add('active');
    }
}

// Funzione di test
function testSuggestions() {
    // Salva alcuni valori di test
    const testData = {
        input_altezza: '180',
        input_peso: '80',
        input_bodyfat: '15',
        input_eta: '30',
        input_vita: '80',
        input_petto: '100',
        input_braccio: '40',
        input_avambraccio: '30',
        input_addome: '85',
        input_fianchi: '95',
        input_coscia: '60',
        input_polpaccio: '40'
    };
    localStorage.setItem('formData', JSON.stringify(testData));
    console.log('Dati di test salvati:', testData);
    
    // Carica i valori di test
    loadValues();
    
    // Mostra un messaggio all'utente
    alert('Dati di test salvati! Ora clicca su un campo per vedere i suggerimenti.');
}

// Aggiungi event listener per il pulsante di test
document.getElementById('testButton').addEventListener('click', testSuggestions);

// Carica i valori salvati all'avvio
document.addEventListener('DOMContentLoaded', () => {
    // Aggiungi event listener per gli input
    document.querySelectorAll('input[type="number"]').forEach(input => {
        // Salva il valore quando viene modificato
        input.addEventListener('change', () => {
            saveValues();
        });
        
        // Mostra suggerimenti quando il campo riceve il focus
        input.addEventListener('focus', () => {
            showSuggestions(input);
        });
        
        // Nascondi suggerimenti quando il campo perde il focus
        input.addEventListener('blur', (e) => {
            // Piccolo delay per permettere il click sui suggerimenti
            setTimeout(() => {
                const suggestionsContainer = input.nextElementSibling;
                if (suggestionsContainer) {
                    suggestionsContainer.classList.remove('active');
                }
            }, 200);
        });
    });
    
    // Chiudi i suggerimenti quando si clicca fuori
    document.addEventListener('click', (e) => {
        if (!e.target.matches('input[type="number"]')) {
            document.querySelectorAll('.suggestions').forEach(suggestions => {
                suggestions.classList.remove('active');
            });
        }
    });
}); 