document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form dari submit default

    // Tampilkan SweetAlert untuk meminta nama
    Swal.fire({
        title: 'Masukkin Nama Kamu',
        input: 'text',
        inputLabel: 'Silahkan isi nama mu secara valid',
        inputAttributes: {
            autocapitalize: 'off'
        },
        confirmButtonText: 'Lanjutkan',
        showCancelButton: true,
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            const name = result.value;
            
            // Berikan pesan agar pengisi dapat mengerjakan dengan baik dan benar
            Swal.fire({
                title: `Halo, ${name}!`,
                text: 'Terima kasih sudah mengisi form pertanyaan diatas!',
                icon: 'info',
                confirmButtonText: 'Selanjutnya'
            }).then(() => {
                // Melanjutkan dengan logika kuis
                handleQuiz();
            });
        }
    });
});

function handleQuiz() {
    // Jawaban benar untuk setiap pertanyaan
    const correctAnswers = {
        q1: 'Hypertext Markup Language',
        q2: 'img',
        q3: 'Cascading Style Sheets',
        q4: 'a',
        q5: 'Menambahkan interaktivitas',
        q6: 'p',
        q7: 'Desain yang menyesuaikan tampilan dengan ukuran layar',
        q8: 'Menampung informasi meta dan link ke stylesheet',
        q9: '// komentar',
        q10: 'Document Object Model'
    };

    let score = 0;
    let unansweredQuestions = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    // Periksa jawaban
    for (const question in correctAnswers) {
        const selectedAnswer = document.querySelector(`select[name=${question}]`).value;

        if (selectedAnswer === '') {
            unansweredQuestions++;
        } else if (selectedAnswer === correctAnswers[question]) {
            score++;
        }
    }

    // Jika ada jawaban yang belum diisi
    if (unansweredQuestions > 0) {
        Swal.fire({
            title: 'Jawaban Belum Lengkap',
            text: `Kamu masih memiliki ${unansweredQuestions} jawaban yang belum diisi.`,
            icon: 'warning',
            confirmButtonText: 'Tutup'
        });
        return;
    }

    // Tampilkan hasil
    if (score === totalQuestions) {
        Swal.fire({
            title: 'Selamat!',
            text: 'Jawabanmu benar semua!',
            icon: 'success',
            confirmButtonText: 'Tutup'
        }).then(() => {
            Swal.fire({
                icon: "success",
                title: "Jangan Lupa",
                text: "Claim hadiah kamu lewat tombol dibawah ya!",
                footer: '<a href="https://wa.link/rqbwe8">Minta sama kak arif</a>'
            });
        });
    } else {
        Swal.fire({
            title: 'Hasil Kuis',
            text: `Kamu menjawab ${score} dari ${totalQuestions} pertanyaan dengan benar.`,
            icon: 'info',
            confirmButtonText: 'Tutup'
        });
    }
}
