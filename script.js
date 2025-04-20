console.log('Script.js caricato!');

// Constants for calculations
const CATEGORY_STANDARDS = {
    classic: {
        natural: {
            imcRange: [24, 26],
            bf: [6, 9],
            vita_altezza: [0.43, 0.47],
            rapporti: {
                petto: 1.55,
                braccio: 0.52,
                avambraccio: 0.40,
                addome: 1.1,
                fianchi: 0.93,
                coscia: 0.75,
                polpaccio: 0.50
            }
        },
        doped: {
            imcRange: [26, 29],
            bf: [4, 6.5],
            vita_altezza: [0.40, 0.45],
            rapporti: {
                petto: 1.65,
                braccio: 0.58,
                avambraccio: 0.45,
                addome: 1.15,
                fianchi: 0.88,
                coscia: 0.80,
                polpaccio: 0.55
            }
        }
    },
    mens: {
        natural: {
            imcRange: [23, 25],
            bf: [6, 8],
            vita_altezza: [0.42, 0.46],
            rapporti: {
                petto: 1.50,
                braccio: 0.50,
                avambraccio: 0.38,
                addome: 1.05,
                fianchi: 0.95,
                coscia: 0.70,
                polpaccio: 0.50
            }
        },
        doped: {
            imcRange: [25, 27.5],
            bf: [4, 6],
            vita_altezza: [0.40, 0.44],
            rapporti: {
                petto: 1.60,
                braccio: 0.55,
                avambraccio: 0.42,
                addome: 1.10,
                fianchi: 0.90,
                coscia: 0.75,
                polpaccio: 0.55
            }
        }
    },
    open: {
        natural: {
            imcRange: [26, 28],
            bf: [6, 9],
            vita_altezza: [0.44, 0.48],
            rapporti: {
                petto: 1.60,
                braccio: 0.56,
                avambraccio: 0.43,
                addome: 1.15,
                fianchi: 0.92,
                coscia: 0.80,
                polpaccio: 0.55
            }
        },
        doped: {
            imcRange: [28, 32],
            bf: [3, 5.5],
            vita_altezza: [0.38, 0.44],
            rapporti: {
                petto: 1.75,
                braccio: 0.62,
                avambraccio: 0.50,
                addome: 1.20,
                fianchi: 0.85,
                coscia: 0.85,
                polpaccio: 0.60
            }
        }
    },
    bikini: {
        natural: {
            imcRange: [18.5, 20.5],
            bf: [13, 17],
            vita_altezza: [0.35, 0.38],
            rapporti: {
                petto: 1.35,
                braccio: 0.47,
                avambraccio: 0.34,
                addome: 1.00,
                fianchi: 1.45,
                coscia: 0.90,
                polpaccio: 0.53
            }
        },
        doped: {
            imcRange: [19.5, 21.5],
            bf: [10, 14],
            vita_altezza: [0.33, 0.36],
            rapporti: { 
                petto: 1.40,
                braccio: 0.50,
                avambraccio: 0.36,
                addome: 1.00,
                fianchi: 1.50,
                coscia: 0.95,
                polpaccio: 0.55
            }
        }
    },
    wellness: {
        natural: {
            imcRange: [20.5, 22.5],
            bf: [12, 16],
            vita_altezza: [0.34, 0.37],
            rapporti: {
                petto: 1.40,
                braccio: 0.50,
                avambraccio: 0.36,
                addome: 1.03,
                fianchi: 1.55,
                coscia: 1.00,
                polpaccio: 0.55
            }
        },
        doped: {
            imcRange: [21.5, 23.5],
            bf: [9, 13],
            vita_altezza: [0.32, 0.35],
            rapporti: { 
                petto: 1.45,
                braccio: 0.52,
                avambraccio: 0.38,
                addome: 1.05,
                fianchi: 1.60,
                coscia: 1.05,
                polpaccio: 0.57
            }
        }
    },
    figure: {
        natural: {
            imcRange: [21.5, 23.5],
            bf: [10, 14],
            vita_altezza: [0.33, 0.36],
            rapporti: {
                petto: 1.45,
                braccio: 0.53,
                avambraccio: 0.38,
                addome: 1.05,
                fianchi: 1.50,
                coscia: 1.05,
                polpaccio: 0.58
            }
        },
        doped: {
            imcRange: [22.5, 24.5],
            bf: [8, 12],
            vita_altezza: [0.30, 0.34],
            rapporti: { 
                petto: 1.50,
                braccio: 0.55,
                avambraccio: 0.40,
                addome: 1.05,
                fianchi: 1.55,
                coscia: 1.10,
                polpaccio: 0.60
            }
        }
    },
    physique: {
        natural: {
            imcRange: [22.5, 24.5],
            bf: [8, 12],
            vita_altezza: [0.31, 0.34],
            rapporti: {
                petto: 1.50,
                braccio: 0.58,
                avambraccio: 0.40,
                addome: 1.05,
                fianchi: 1.45,
                coscia: 1.10,
                polpaccio: 0.63
            }
        },
        doped: {
            imcRange: [23.5, 25.5],
            bf: [6, 10],
            vita_altezza: [0.28, 0.32],
            rapporti: { 
                petto: 1.55,
                braccio: 0.60,
                avambraccio: 0.42,
                addome: 1.05,
                fianchi: 1.50,
                coscia: 1.15,
                polpaccio: 0.65
            }
        }
    },
    bodybuilding: {
        natural: {
            imcRange: [23.5, 25.5],
            bf: [6, 10],
            vita_altezza: [0.28, 0.32],
            rapporti: {
                petto: 1.55,
                braccio: 0.63,
                avambraccio: 0.43,
                addome: 1.05,
                fianchi: 1.40,
                coscia: 1.15,
                polpaccio: 0.68
            }
        },
        doped: {
            imcRange: [25, 28],
            bf: [4, 8],
            vita_altezza: [0.26, 0.30],
            rapporti: { 
                petto: 1.60,
                braccio: 0.65,
                avambraccio: 0.45,
                addome: 1.05,
                fianchi: 1.45,
                coscia: 1.20,
                polpaccio: 0.70
            }
        }
    },
};


// Function to calculate BMI
function calculateBMI(weight, height) {
    return (weight / Math.pow(height / 100, 2)).toFixed(1);
}

// Function to get URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        altezza: parseFloat(params.get('altezza')),
        peso: parseFloat(params.get('peso')),
        bodyfat: parseFloat(params.get('bodyfat')),
        eta: parseInt(params.get('eta')),
        petto: parseFloat(params.get('petto')),
        vita: parseFloat(params.get('vita')),
        braccio: parseFloat(params.get('braccio')),
        avambraccio: parseFloat(params.get('avambraccio')),
        addome: parseFloat(params.get('addome')),
        fianchi: parseFloat(params.get('fianchi')),
        coscia: parseFloat(params.get('coscia')),
        polpaccio: parseFloat(params.get('polpaccio')),
        sesso: params.get('sesso'),
        categoria: params.get('categoria'),
        doped: params.get('doped') === 'on'
    };
}

// Function to calculate ideal measurements
function calculateIdealMeasurements(params) {
    const category = params.categoria;
    const isDoped = params.doped;
    
    // Get the appropriate standards based on category and doping status
    let standards;
    if (category === 'classic') {
        standards = isDoped ? CATEGORY_STANDARDS.classic.doped : CATEGORY_STANDARDS.classic.natural;
    } else if (category === 'mens') {
        standards = isDoped ? CATEGORY_STANDARDS.mens.doped : CATEGORY_STANDARDS.mens.natural;
    } else if (category === 'open') {
        standards = isDoped ? CATEGORY_STANDARDS.open.doped : CATEGORY_STANDARDS.open.natural;
    }

    // Calculate ideal waist based on height range
    const vitaMin = params.altezza * standards.vita_altezza[0];
    const vitaMax = params.altezza * standards.vita_altezza[1];
    const vitaIdeale = (vitaMin + vitaMax) / 2;
    const pesoMin = standards.imcRange[0] * (params.altezza / 100) ** 2;
    const pesoMax = standards.imcRange[1] * (params.altezza / 100) ** 2;
     

    // Calculate ideal weight based on IMC range
    const massaMagraMin = pesoMin * (1 - standards.bf[0] / 100);
    const massaMagraMax = pesoMax * (1 - standards.bf[1] / 100);

    const pesoIdealeMin = ((massaMagraMin / (1 - standards.bf[0] / 100)) + (massaMagraMin / (1 - standards.bf[1] / 100))) / 2;
    const pesoIdealeMax = ((massaMagraMax / (1 - standards.bf[0] / 100)) + (massaMagraMax / (1 - standards.bf[1] / 100))) / 2;
    const IMC = params.peso / ((params.altezza / 100) ** 2);

    // Calculate other measurements based on actual waist
    const misure = {};
    for (let parte in standards.rapporti) {
        misure[parte] = params.vita * standards.rapporti[parte];
    }

    return {
        imc: IMC,
        weightMin: pesoIdealeMin,
        weightMax: pesoIdealeMax,
        waist: vitaIdeale,
        waistMin: vitaMin,
        waistMax: vitaMax,
        chest: misure.petto,
        arm: misure.braccio,
        forearm: misure.avambraccio,
        abs: misure.addome,
        hips: misure.fianchi,
        thigh: misure.coscia,
        calf: misure.polpaccio,
        bf: standards.bf,
        imcRange: standards.imcRange
    };
}

// Function to display results
function displayResults(params, ideals) {
    // Display category in the center
    const categoriaText = params.categoria.charAt(0).toUpperCase() + params.categoria.slice(1);
    const dopingText = params.doped ? ' (Doped)' : ' (Natural)';
    document.getElementById('categoria-display').textContent = categoriaText + dopingText;

    // Display current values
    document.getElementById('imc-value').textContent = `${ideals.imc.toFixed(1)}`;
    document.getElementById('peso-value').textContent = `${params.peso.toFixed(1)} kg`;
    document.getElementById('bodyfat-value').textContent = `${params.bodyfat.toFixed(1)} %`;
    document.getElementById('vita-value').textContent = `${params.vita.toFixed(1)} cm`;
    document.getElementById('petto-value').textContent = `${params.petto.toFixed(1)} cm`;
    document.getElementById('braccio-value').textContent = `${params.braccio.toFixed(1)} cm`;
    document.getElementById('avambraccio-value').textContent = `${params.avambraccio.toFixed(1)} cm`;
    document.getElementById('addome-value').textContent = `${params.addome.toFixed(1)} cm`;
    document.getElementById('fianchi-value').textContent = `${params.fianchi.toFixed(1)} cm`;
    document.getElementById('coscia-value').textContent = `${params.coscia.toFixed(1)} cm`;
    document.getElementById('polpaccio-value').textContent = `${params.polpaccio.toFixed(1)} cm`;

    // Display calculated values
    document.getElementById('imcIdeale').textContent = 
        `${ideals.imcRange[0]} - ${ideals.imcRange[1]}`;
    
    document.getElementById('pesoRange').textContent = 
        `${ideals.weightMin.toFixed(1)} - ${ideals.weightMax.toFixed(1)} kg`;
    
    document.getElementById('CATEGORY_STANDARDS.bf').textContent = 
        `${ideals.bf[0]} - ${ideals.bf[1]} %`;
    
    document.getElementById('vita-obiettivo').textContent = `${ideals.waist.toFixed(1)} cm`;
    document.getElementById('vita-diff-right').textContent = getDifferenceText(params.vita, ideals.waist);
    
    document.getElementById('petto-obiettivo').textContent = `${ideals.chest.toFixed(1)} cm`;
    document.getElementById('petto-diff-right').textContent = getDifferenceText(params.petto, ideals.chest);
    
    document.getElementById('braccio-obiettivo').textContent = `${ideals.arm.toFixed(1)} cm`;
    document.getElementById('braccio-diff-right').textContent = getDifferenceText(params.braccio, ideals.arm);
    
    document.getElementById('avambraccio-obiettivo').textContent = `${ideals.forearm.toFixed(1)} cm`;
    document.getElementById('avambraccio-diff-right').textContent = getDifferenceText(params.avambraccio, ideals.forearm);

    document.getElementById('addome-obiettivo').textContent = `${ideals.abs.toFixed(1)} cm`;
    document.getElementById('addome-diff-right').textContent = getDifferenceText(params.addome, ideals.abs);

    document.getElementById('fianchi-obiettivo').textContent = `${ideals.hips.toFixed(1)} cm`;
    document.getElementById('fianchi-diff-right').textContent = getDifferenceText(params.fianchi, ideals.hips);
    
    document.getElementById('coscia-obiettivo').textContent = `${ideals.thigh.toFixed(1)} cm`;
    document.getElementById('coscia-diff-right').textContent = getDifferenceText(params.coscia, ideals.thigh);
    
    document.getElementById('polpaccio-obiettivo').textContent = `${ideals.calf.toFixed(1)} cm`;
    document.getElementById('polpaccio-diff-right').textContent = getDifferenceText(params.polpaccio, ideals.calf);
}

// Helper function to get difference text
function getDifferenceText(current, target) {
    const difference = Math.abs(target - current);
    if (target > current) {
        return `(+${difference.toFixed(1)} cm da aumentare)`;
    } else {
        return `(-${difference.toFixed(1)} cm da ridurre)`;
    }
}


// Handle references popup
document.addEventListener('DOMContentLoaded', function() {
    const formulaLink = document.querySelector('.formula-link');
    const popup = document.getElementById('referencesPopup');
    const closeButton = document.querySelector('.close-popup');

    if (formulaLink) {
        formulaLink.addEventListener('click', function(e) {
            e.preventDefault();
            popup.style.display = 'block';
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', function() {
            popup.style.display = 'none';
        });
    }

    // Close popup when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});


// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the index page
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        console.log('Pagina index.html rilevata, inizializzazione suggerimenti...');
        
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

        // Gestione degli eventi per gli input
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
    } else if (window.location.pathname.includes('risultati.html')) {
        const params = getUrlParams();
        const ideals = calculateIdealMeasurements(params);
        displayResults(params, ideals);
        
        document.getElementById('downloadPDF').addEventListener('click', function() {
            const element = document.querySelector('.results-main');
            const opt = {
                margin: 1,
                filename: 'YourFitGoal-Results.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            // Add temporary title for PDF
            const title = document.createElement('h1');
            title.textContent = 'Your Fit Goal - Risultati';
            title.style.textAlign = 'center';
            title.style.marginBottom = '20px';
            element.insertBefore(title, element.firstChild);

            // Generate PDF
            html2pdf().set(opt).from(element).save().then(() => {
                // Remove temporary title after PDF generation
                element.removeChild(title);
            });
        });
    }

    // Cookie consent handling
    const cookieSettings = document.getElementById('cookie-settings');
    if (cookieSettings) {
        cookieSettings.addEventListener('click', function(e) {
            e.preventDefault();
            // Implement cookie settings modal or redirect
            alert('Impostazioni cookie verranno implementate in futuro');
        });
    }
}); 