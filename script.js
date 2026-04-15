document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicControl');
    const musicIcon = document.getElementById('musicIcon');
    
    const coverPage = document.getElementById('cover-page');
    const openBtn = document.getElementById('open-btn');
    
    let isPlaying = false;

    // --- Logika Buka Amplop & Auto-Play Musik ---
    openBtn.addEventListener('click', () => {
        // Tambahkan class slide-up untuk animasi geser ke atas
        coverPage.classList.add('slide-up');

        // Hapus elemen dari layar setelah animasi selesai (1 detik) agar tidak mengganggu klik
        setTimeout(() => {
            coverPage.style.display = 'none';
        }, 1000);

        // Putar lagu otomatis!
        if (!isPlaying) {
            music.play();
            musicBtn.classList.add('playing');
            musicIcon.innerText = '❚❚';
            isPlaying = true;
        }
    });

    // --- Logika Tombol Musik (Kanan Bawah) ---
    musicBtn.addEventListener('click', () => {
        if (!isPlaying) {
            music.play();
            musicBtn.classList.add('playing');
            musicIcon.innerText = '❚❚';
        } else {
            music.pause();
            musicBtn.classList.remove('playing');
            musicIcon.innerText = '🎵';
        }
        isPlaying = !isPlaying;
    });

    // --- Efek Klik Love ---
    document.addEventListener('click', (e) => {
        // Jangan munculkan love saat ngeklik amplop, biar tidak dobel
        if (e.target.closest('#cover-page')) return;

        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = e.pageX + 'px';
        heart.style.top = e.pageY + 'px';
        heart.style.fontSize = '1.5rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '999';
        
        document.body.appendChild(heart);

        let animation = heart.animate([
            { transform: 'translateY(0)', opacity: 1 },
            { transform: 'translateY(-100px)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });

        animation.onfinish = () => heart.remove();
    });
});