// Constants for calculations
const CATEGORY_STANDARDS = {
    classic: {
        natural: {
            imcRange: [22, 25],
            bf: "8-10%",
            vita_altezza: [0.44, 0.46],
            rapporti: {
                petto: 1.50,
                braccio: 0.70,
                avambraccio: 0.52,
                coscia: 0.80,
                polpaccio: 0.52
            }
        },
        doped: {
            imcRange: [25, 28],
            bf: "5-7%",
            vita_altezza: [0.42, 0.44],
            rapporti: {
                petto: 1.618,
                braccio: 0.75,
                avambraccio: 0.55,
                coscia: 0.85,
                polpaccio: 0.55
            }
        }
    },
    mens: {
        natural: {
            imcRange: [21, 24],
            bf: "8-10%",
            vita_altezza: [0.45, 0.47],
            rapporti: {
                petto: 1.40,
                braccio: 0.65,
                avambraccio: 0.50,
                coscia: 0.70,
                polpaccio: 0.50
            }
        }
    },
    open: {
        doped: {
            imcRange: [28, 32],
            bf: "4-6%",
            vita_altezza: [0.40, 0.43],
            rapporti: {
                petto: 1.90,
                braccio: 0.95,
                avambraccio: 0.60,
                coscia: 1.25,
                polpaccio: 0.70
            }
        }
    }
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
        eta: parseInt(params.get('eta')),
        petto: parseFloat(params.get('petto')),
        vita: parseFloat(params.get('vita')),
        braccio: parseFloat(params.get('braccio')),
        avambraccio: parseFloat(params.get('avambraccio')),
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
        standards = CATEGORY_STANDARDS.mens.natural;
    } else if (category === 'open') {
        standards = CATEGORY_STANDARDS.open.doped;
    }

    // Calculate ideal waist based on height range
    const vitaMin = params.altezza * standards.vita_altezza[0];
    const vitaMax = params.altezza * standards.vita_altezza[1];
    const vitaIdeale = (vitaMin + vitaMax) / 2;

    // Calculate ideal weight based on IMC range
    const altezza_m = params.altezza / 100;
    const pesoMin = standards.imcRange[0] * (altezza_m ** 2);
    const pesoMax = standards.imcRange[1] * (altezza_m ** 2);
    const pesoIdeale = (pesoMin + pesoMax) / 2;

    // Calculate other measurements based on actual waist
    const misure = {};
    for (let parte in standards.rapporti) {
        misure[parte] = params.vita * standards.rapporti[parte];
    }

    return {
        weight: pesoIdeale,
        weightMin: pesoMin,
        weightMax: pesoMax,
        waist: vitaIdeale,
        waistMin: vitaMin,
        waistMax: vitaMax,
        chest: misure.petto,
        arm: misure.braccio,
        forearm: misure.avambraccio,
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
    document.getElementById('categoria-risultato').textContent = categoriaText + dopingText;

    // Display current values
    document.getElementById('imc-risultato').textContent = calculateBMI(params.peso, params.altezza);
    document.getElementById('peso-risultato').textContent = `${params.peso} kg`;
    document.getElementById('vita-risultato').textContent = `${params.vita} cm`;
    document.getElementById('petto-risultato').textContent = `${params.petto} cm`;
    document.getElementById('braccio-risultato').textContent = `${params.braccio} cm`;
    document.getElementById('avambraccio-risultato').textContent = `${params.avambraccio} cm`;
    document.getElementById('coscia-risultato').textContent = `${params.coscia} cm`;
    document.getElementById('polpaccio-risultato').textContent = `${params.polpaccio} cm`;

    // Display calculated values
    document.getElementById('imc-ideale-risultato').textContent = 
        `${ideals.imcRange[0]} - ${ideals.imcRange[1]}`;
    
    document.getElementById('peso-range').textContent = 
        `${ideals.weightMin.toFixed(1)} - ${ideals.weightMax.toFixed(1)} kg`;
    
    document.getElementById('vita-range').textContent = 
        `${ideals.waistMin.toFixed(1)} - ${ideals.waistMax.toFixed(1)} cm`;
    
    document.getElementById('petto-obiettivo').textContent = `${ideals.chest.toFixed(1)} cm`;
    const diffPetto = ideals.chest - params.petto;
    document.getElementById('differenza-petto').textContent = getDifferenceText(diffPetto);
    
    document.getElementById('braccio-obiettivo').textContent = `${ideals.arm.toFixed(1)} cm`;
    const diffBraccio = ideals.arm - params.braccio;
    document.getElementById('differenza-braccio').textContent = getDifferenceText(diffBraccio);
    
    document.getElementById('avambraccio-obiettivo').textContent = `${ideals.forearm.toFixed(1)} cm`;
    const diffAvambraccio = ideals.forearm - params.avambraccio;
    document.getElementById('differenza-avambraccio').textContent = getDifferenceText(diffAvambraccio);
    
    document.getElementById('coscia-obiettivo').textContent = `${ideals.thigh.toFixed(1)} cm`;
    const diffCoscia = ideals.thigh - params.coscia;
    document.getElementById('differenza-coscia').textContent = getDifferenceText(diffCoscia);
    
    document.getElementById('polpaccio-obiettivo').textContent = `${ideals.calf.toFixed(1)} cm`;
    const diffPolpaccio = ideals.calf - params.polpaccio;
    document.getElementById('differenza-polpaccio').textContent = getDifferenceText(diffPolpaccio);
    
    document.getElementById('bf-ideale').textContent = `Body Fat: ${ideals.bf}`;
}

// Helper function to get difference text
function getDifferenceText(difference) {
    // Se la differenza è positiva, significa che l'obiettivo è maggiore del valore attuale
    // quindi dobbiamo aumentare
    if (difference > 0) {
        return `(+${difference.toFixed(1)} da aumentare)`;
    } 
    // Se la differenza è negativa, significa che l'obiettivo è minore del valore attuale
    // quindi dobbiamo ridurre
    else {
        return `(-${Math.abs(difference).toFixed(1)} da ridurre)`;
    }
}

// Function to generate PDF
function generatePDF(params, ideals) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text('Your Fit Goal - Obiettivi Personalizzati', 20, 20);

    // Category and doping status
    const categoriaText = params.categoria.charAt(0).toUpperCase() + params.categoria.slice(1);
    const dopingText = params.doped ? ' (Doped)' : ' (Natural)';
    doc.setFontSize(14);
    doc.text(`Categoria: ${categoriaText}${dopingText}`, 20, 30);

    // Current measurements
    doc.setFontSize(12);
    doc.text('Misure Attuali:', 20, 40);
    doc.text(`Altezza: ${params.altezza} cm`, 20, 50);
    doc.text(`Peso: ${params.peso} kg`, 20, 60);
    doc.text(`IMC: ${calculateBMI(params.peso, params.altezza)}`, 20, 70);

    // Ideal measurements
    doc.text('Obiettivi Ideali:', 20, 90);
    doc.text(`IMC ideale: ${ideals.imcRange[0]} - ${ideals.imcRange[1]}`, 20, 100);
    doc.text(`Peso ideale: ${ideals.weight.toFixed(1)} kg`, 20, 110);
    doc.text(`Range peso: ${ideals.weightMin.toFixed(1)} - ${ideals.weightMax.toFixed(1)} kg`, 20, 120);
    doc.text(`Vita ideale: ${ideals.waist.toFixed(1)} cm`, 20, 130);
    doc.text(`Range vita: ${ideals.waistMin.toFixed(1)} - ${ideals.waistMax.toFixed(1)} cm`, 20, 140);
    doc.text(`Petto: ${ideals.chest.toFixed(1)} cm`, 20, 150);
    doc.text(`Braccio: ${ideals.arm.toFixed(1)} cm`, 20, 160);
    doc.text(`Avambraccio: ${ideals.forearm.toFixed(1)} cm`, 20, 170);
    doc.text(`Coscia: ${ideals.thigh.toFixed(1)} cm`, 20, 180);
    doc.text(`Polpaccio: ${ideals.calf.toFixed(1)} cm`, 20, 190);
    doc.text(`Body Fat ideale: ${ideals.bf}`, 20, 200);

    // Save the PDF
    doc.save('your-fit-goal-obiettivi.pdf');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the results page
    if (window.location.pathname.includes('risultati.html')) {
        const params = getUrlParams();
        const ideals = calculateIdealMeasurements(params);
        displayResults(params, ideals);

        // Add PDF download event listener
        document.getElementById('downloadPDF').addEventListener('click', function() {
            generatePDF(params, ideals);
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