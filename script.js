document.addEventListener('DOMContentLoaded', (event) => {
    const storyPages = document.querySelectorAll('.story-page');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const speakBtn = document.getElementById('play-btn');
    const firstPageBtn = document.getElementById('first-page-btn');
    const body = document.body;

    let currentPageIndex = 0;

    function speakText(text) {
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }

    function showPage(index) {
        if (index < 0 || index >= storyPages.length) {
            return;
        }

        window.speechSynthesis.cancel();

        storyPages.forEach(page => {
            page.classList.remove('active-page');
        });
        storyPages[index].classList.add('active-page');
        
        currentPageIndex = index;
        
        updateButtons();
    }

    function updateButtons() {
        prevBtn.disabled = currentPageIndex === 0;

        // Hide 'Next' button and show 'First' button on the last page
        if (currentPageIndex === storyPages.length - 1) {
            nextBtn.style.display = 'none';
            firstPageBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            firstPageBtn.style.display = 'none';
        }
    }

    nextBtn.addEventListener('click', () => {
        showPage(currentPageIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        showPage(currentPageIndex - 1);
    });
    
    speakBtn.addEventListener('click', () => {
        const currentPage = storyPages[currentPageIndex];
        const pTag = currentPage.querySelector('p');
        
        if (pTag) {
            const pageText = pTag.textContent;
            speakText(pageText);
        }
    });

    firstPageBtn.addEventListener('click', () => {
        showPage(0);
    });

    showPage(currentPageIndex);
});