document.addEventListener('DOMContentLoaded', function() {
    const logoContainer = document.querySelector('.logo-container');
    const form = document.querySelector('.index-form');
    const header = document.querySelector('header');
    const headerText = header.querySelector('p');
    
    // Set logo as fixed from the start
    logoContainer.style.position = 'fixed';
    logoContainer.style.top = '0';
    logoContainer.style.left = '0';
    logoContainer.style.width = '100%';
    logoContainer.style.zIndex = '1000';
    
    // Create a placeholder for the header
    const placeholder = document.createElement('div');
    placeholder.style.height = '0';
    placeholder.style.transition = 'height 0.5s ease';
    header.parentNode.insertBefore(placeholder, header.nextSibling);
    
    // Start with smaller size
    logoContainer.style.transform = 'scale(0.5)';
    logoContainer.style.transition = 'all 0.5s ease';
    form.style.opacity = '0';
    form.style.transition = 'opacity 0.5s ease';
    headerText.style.opacity = '0';
    headerText.style.transition = 'opacity 0.5s ease';
    
    // After 1.5 seconds, make logo smaller and move it to the top
    setTimeout(() => {
        // First expand the placeholder
        placeholder.style.height = '120px';
        
        // Then transform the logo with smooth animation
        logoContainer.style.height = '120px';
        logoContainer.style.display = 'flex';
        logoContainer.style.justifyContent = 'center';
        logoContainer.style.alignItems = 'center';
        logoContainer.style.transform = 'scale(1.6)';
        logoContainer.querySelector('img').style.maxHeight = '100px';
        logoContainer.querySelector('img').style.width = 'auto';
        
        // Position and show the text
        headerText.style.position = 'relative';
        headerText.style.top = '140px';
        headerText.style.textAlign = 'center';
        headerText.style.opacity = '1';
        
        form.style.opacity = '1';
    }, 1500);
}); 