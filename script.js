document.addEventListener('DOMContentLoaded', (event) => {
    const storyPages = document.querySelectorAll('.story-page');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const speakBtn = document.getElementById('play-btn');

    let currentPageIndex = 0;

    function speakText(text) {
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        
        window.speechSynthesis.speak(utterance);
    }

    function showPage(index) {
        window.speechSynthesis.cancel();

        storyPages.forEach(page => {
            page.classList.remove('active-page');
        });

        storyPages[index].classList.add('active-page');
        
        updateButtons();
    }

    function updateButtons() {
        if (currentPageIndex === 0) {
            prevBtn.disabled = true;
        } else {
            prevBtn.disabled = false;
        }

        if (currentPageIndex === storyPages.length - 1) {
            nextBtn.disabled = true;
        } else {
            nextBtn.disabled = false;
        }
    }

    nextBtn.addEventListener('click', () => {
        if (currentPageIndex < storyPages.length - 1) {
            currentPageIndex++;
            showPage(currentPageIndex);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentPageIndex > 0) {
            currentPageIndex--;
            showPage(currentPageIndex);
        }
    });
    
    speakBtn.addEventListener('click', () => {
        const currentPage = storyPages[currentPageIndex];
        const pTag = currentPage.querySelector('p');
        
        if (pTag) {
            const pageText = pTag.textContent;
            speakText(pageText);
        }
    });

    showPage(currentPageIndex);
});