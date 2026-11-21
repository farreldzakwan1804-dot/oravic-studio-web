(function () {
  "use strict";

  const intro = document.getElementById("intro");
  const introText = document.getElementById("introText");
  const main = document.getElementById("main");
  const cards = document.querySelectorAll(".fade-card");

  const SEQ = [
    { text: "Welcome to", hold: 900 },
    { text: "Oravic", hold: 1100 },
  ];

  function showIntroText(item) { 
    return new Promise((resolve) => {
      introText.textContent = item.text;
      introText.classList.remove("intro-out");
      introText.style.animation = "none";
      void introText.offsetWidth; // reflow
      introText.style.animation = "";
      // introIn runs (1.2s) then hold then introOut (1.2s)
      setTimeout(() => {
        introText.classList.add("intro-out");
        setTimeout(resolve, 1200);
      }, 500 + item.hold);
    });
  }

  async function runIntro() {
    for (const item of SEQ) {
      await showIntroText(item);
    }
    intro.style.transition = "opacity 0.5s ease";
    intro.style.opacity = "0";
    setTimeout(() => {
      intro.classList.add("hidden");
      main.classList.remove("hidden");
      requestAnimationFrame(() => {
        cards.forEach((c) => c.classList.add("in"));
      });
    }, 1500);
  }

  runIntro();

  // ---------- Keyboard arrow scroll ----------
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      window.scrollBy({ top: 90, behavior: "smooth" });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      window.scrollBy({ top: -90, behavior: "smooth" });
    } 
  });

  // ---------- Modal ----------
  const logoModal = document.getElementById("logoModal");
  const MascotModal = document.getElementById("MascotModal");
  const mascotModalContent = document.getElementById("mascotModalContent");
  const modalClose = document.getElementById("modalClose");
  const webBtn = document.getElementById("webBtn");
  const enterpriseCard = document.getElementById("enterpriseCard");
  const proCard = document.getElementById("proCard");
  const starterCard = document.getElementById("starterCard");
  const entClose = document.getElementById("entClose");
  const proClose = document.getElementById("proClose");
  const strClose = document.getElementById("strClose");
  const entOverlay = document.getElementById("entOverlay");
  const proOverlay = document.getElementById("proOverlay");
  const strOverlay = document.getElementById("strOverlay");
  const pkgEnterprise = document.getElementById("pkgEnterprise");
  const pkgPro = document.getElementById("pkgPro");
  const pkgStarter = document.getElementById("pkgStarter");
  const logoBrand = document.getElementById("logoBrand");
  const logoKomunitas = document.getElementById("logoKomunitas");
  const logoEsport = document.getElementById("logoEsport");
  const logoLain = document.getElementById("logoLain");
  const orderForm = document.getElementById("orderForm");
  const toast = document.getElementById("toast");
  const packageRadios = document.querySelectorAll('input[name="package"]');

  function openModal() {
    logoModal.classList.add("open");
    logoModal.setAttribute("aria-hidden", "false");
    const modalContent = document.getElementById("logoModalContent");
  if (modalContent) {
    modalContent.focus();
  }
  }
  function closeModal() {
    logoModal.classList.remove("open");
    logoModal.setAttribute("aria-hidden", "true");
    enterpriseCard.classList.remove("show");
    enterpriseCard.setAttribute("aria-hidden", "true");
  }

  function openMascotModal() {
    if (MascotModal) {
        MascotModal.classList.add("open");
        MascotModal.setAttribute("aria-hidden", "false");
        if (mascotModalContent) {
            mascotModalContent.focus();
        }
    }
}
function closeMascotModal() {
    if (MascotModal) {
        MascotModal.classList.remove("open");
        MascotModal.setAttribute("aria-hidden", "true");
    }
}

  document.querySelectorAll(".svc-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.service === "logo"){ openModal();
      } else if (btn.dataset.service === "mascot") {
        openMascotModal();
      } else { showToast("Layanan ini akan segera tersedia.");}
    });
  });

  modalClose.addEventListener("click", closeModal);
  logoModal.addEventListener("click", (e) => {
    if (e.target === logoModal) closeModal();
  });

  // Sesuaikan ID tombol close di HTML Anda (misal: modalMascotClose atau strClose)
const modalMascotClose = document.getElementById("modalMascotClose"); 
if (modalMascotClose) {
    modalMascotClose.addEventListener("click", closeMascotModal);
}

// Menutup modal jika area luar/overlay diklik
if (MascotModal) {
    MascotModal.addEventListener("click", (e) => {
        if (e.target === MascotModal) {
            closeMascotModal();
        }
    });
}

  // Mengambil elemen modal menggunakan ID baru yang khusus untuk konten
const modalContent = document.getElementById('logoModalContent');

if (modalContent) {
  modalContent.addEventListener('keydown', function(e) {
    const scrollStep = 60;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      modalContent.scrollBy({ top: scrollStep, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      modalContent.scrollBy({ top: -scrollStep, behavior: 'smooth' });
    }
  });
}

if (mascotModalContent) {
  mascotModalContent.addEventListener('keydown', function(e) {
    const scrollStep = 60; // Besar kecilnya jarak lompatan scroll
    
    if (e.key === 'ArrowDown') {
      e.preventDefault(); // Mencegah halaman utama ikut bergeser
      mascotModalContent.scrollBy({ top: scrollStep, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      mascotModalContent.scrollBy({ top: -scrollStep, behavior: 'smooth' });
    }
  });
}

  // Enterprise handling 
  packageRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (pkgEnterprise.checked) {
        entOverlay.classList.add("show")
        enterpriseCard.classList.add("show");
        enterpriseCard.setAttribute("aria-hidden", "false");
      } 
      else {
        entOverlay.classList.remove("show")
        enterpriseCard.classList.remove("show");
        enterpriseCard.setAttribute("aria-hidden", "true");
      }
    });
  });
  entClose.addEventListener("click", () => {
    entOverlay.classList.remove("show")
    enterpriseCard.classList.remove("show");
    enterpriseCard.setAttribute("aria-hidden", "true");
  });

  // Pro handling 
  packageRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (pkgPro.checked) {
        proOverlay.classList.add("show")
        proCard.classList.add("show");
        proCard.setAttribute("aria-hidden", "false");
      } 
      else {
        proOverlay.classList.remove("show")
        proCard.classList.remove("show");
        proCard.setAttribute("aria-hidden", "true");
      }
    });
  });
  proClose.addEventListener("click", () => {
    proOverlay.classList.remove("show")
    proCard.classList.remove("show");
    proCard.setAttribute("aria-hidden", "true");
  });

  // Starter handling 
  packageRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (pkgStarter.checked) {
        strOverlay.classList.add("show")
        starterCard.classList.add("show");
        starterCard.setAttribute("aria-hidden", "false");
      } 
      else {
        strOverlay.classList.remove("show")
        starterCard.classList.remove("show");
        starterCard.setAttribute("aria-hidden", "true");
      }
    });
  });
  strClose.addEventListener("click", () => {
    strOverlay.classList.remove("show")
    starterCard.classList.remove("show");
    starterCard.setAttribute("aria-hidden", "true");
  });
 const phoneNumber = "6285725049462";
  document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const checkedLogo = document.querySelector('input[name="logotype"]:checked');
    let logotype = 'Logo ...';
    if (logoBrand.checked){logotype = 'Logo Brand'}
    else if (logoKomunitas.checked){logotype = 'Logo Komunitas'}
    else if (logoEsport.checked){logotype = 'Logo Esport'}
    else {logotype = 'Logo Lain'}

    const packageElement = document.querySelector('input[name="package"]:checked');
    const packageName = packageElement ? packageElement.closest('label').querySelector('span').innerText.split('\n')[0] : '-';

    const logoName = document.getElementById('logoName').value.trim();
    const baseShape = document.getElementById('baseShape').value.trim();
    const baseColor = document.getElementById('baseColor').value.trim();
    const notes = document.getElementById('notes').value.trim();

    const phoneNo = "6281234567890"; 

    const message = `Halo Oravic Studio, saya ingin memesan jasa pembuatan logo dengan detail berikut:

*--- DATA PESANAN ---*
- *Jenis Logo:* ${logotype}
- *Paket:* ${packageName}
- *Nama untuk Logo:* ${logoName || '-'}
- *Bentuk Dasar:* ${baseShape || '-'}
- *Warna Dasar:* ${baseColor || '-'}
- *Catatan Tambahan:* ${notes || '-'}

Mohon informasi selanjutnya. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
});


// 1. Logika untuk Checkbox Nama Maskot
const checkboxName = document.getElementById('noIdeaName');
const inputLogoName = document.getElementById('logoName');

if (checkboxName && inputLogoName) {
    checkboxName.addEventListener('change', function() {
        if (this.checked) {
            inputLogoName.value = "Belum ada ide"; 
            inputLogoName.disabled = true;       
        } else {
            inputLogoName.value = "";          
            inputLogoName.disabled = false;      
        }
    });
}

// 2. Logika untuk Checkbox Deskripsi Maskot
const checkboxNotes = document.getElementById('noIdeaNotes');
const textareaNotes = document.getElementById('notes');

if (checkboxNotes && textareaNotes) {
    checkboxNotes.addEventListener('change', function() {
        if (this.checked) {
            textareaNotes.value = "Belum ada ide";
            textareaNotes.disabled = true;    
        } else {
            textareaNotes.value = "";            
            textareaNotes.disabled = false;      
        }
    });
}

document.getElementById('orderMascotForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Mencegah form reload halaman

  // 1. Ambil Jenis Maskot (Radio Button)
  const mascotTypeEl = document.querySelector('input[name="mascotType"]:checked');
  const mascotType = mascotTypeEl ? mascotTypeEl.parentElement.textContent.trim() : '-';

  // 2. Ambil Nama Maskot & Ceklis "Belum ada ide"
  const mascotNameInput = document.getElementById('mascotName').value.trim();
  const noIdeaName = document.getElementById('noIdeaName').checked;
  let mascotName = noIdeaName ? "Belum ada ide" : (mascotNameInput || '-');

  // 3. Ambil Deskripsi Maskot & Ceklis "Belum ada ide"
  const notesInput = document.getElementById('notesMascot').value.trim();
  const noIdeaNotes = document.getElementById('noIdeaNotes').checked;
  let notes = noIdeaNotes ? "Belum ada ide" : (notesInput || '-');

  // 4. Ambil Sudut Pandang Maskot (Checkbox 'angle')
  const selectedAngles = document.querySelectorAll('input[name="angle"]:checked');
  let anglesList = [];
  selectedAngles.forEach(el => {
      // Mengambil judul/title dari label pembungkusnya agar lebih deskriptif
      const labelTitle = el.closest('label').getAttribute('title');
      if (labelTitle) anglesList.push(labelTitle);
  });
  const anglesText = anglesList.length > 0 ? anglesList.join(', ') : 'Standar';

  // 5. Ambil Pilihan Pose (Checkbox 'pose')
  const selectedPoses = document.querySelectorAll('input[name="pose"]:checked');
  let posesList = [];
  selectedPoses.forEach(el => {
      const poseLabel = el.parentElement.textContent.trim();
      if (poseLabel) posesList.push(poseLabel);
  });

  // 6. Ambil Pose Kustom Tambahan (Input dinamis 'customPose[]')
  const customPoseInputs = document.querySelectorAll('input[name="customPose[]"]');
  customPoseInputs.forEach(input => {
      if (input.value.trim() !== '') {
          posesList.push(input.value.trim());
      }
  });
  const posesText = posesList.length > 0 ? posesList.join(', ') : '-';

  // --- Format Pesan WhatsApp ---
  let message = `Halo Oravic Studio, saya ingin memesan Maskot dengan detail berikut:%0A%0A` +
                `*FORM PEMESANAN MASCOT DESIGN*%0A` +
                `----------------------------------------%0A` +
                `• *Jenis Maskot:* ${mascotType}%0A` +
                `• *Nama Maskot:* ${mascotName}%0A` +
                `• *Deskripsi:* ${notes}%0A` +
                `• *Sudut Pandang:* ${anglesText}%0A` +
                `• *Pilihan Pose:* ${posesText}%0A` +
                `----------------------------------------%0A` +
                `Mohon informasi selanjutnya, terima kasih!`;


  

  // Buka link WhatsApp
  const waURL = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(waURL, '_blank');
});


function showToast(message) {
  const toast = document.getElementById("toast");
  
  if (toast) {
    toast.textContent = message;

    toast.classList.add("show");
    
    setTimeout(() => {
      toast.classList.remove("show");
    }, 1000);
  }
}

if (webBtn) {
  webBtn.addEventListener("click", () => {
    showToast("Layanan ini akan segera tersedia");
  });
}

})();


// A. Fitur Tambah Input Pose Kustom Secara Dinamis
const addPoseBtn = document.getElementById('addPoseBtn');
const customPoseContainer = document.getElementById('customPoseContainer');

if (addPoseBtn && customPoseContainer) {
    addPoseBtn.addEventListener('click', function() {
        const div = document.createElement('div');
        div.className = 'custom-pose-item';
        
        div.innerHTML = `
            <input type="text" name="customPose[]" placeholder="cth. Pose melipat tangan..." class="custom-pose-input" />
            <button type="button" class="remove-pose-btn">✕</button>
        `;
        
        customPoseContainer.appendChild(div);

        // Fungsi tombol hapus baris input kustom
        div.querySelector('.remove-pose-btn').addEventListener('click', function() {
            div.remove();
        });
    });
}

// B. Fungsi untuk merangkum data Pose saat dikirim ke WhatsApp
function getSelectedPoses() {
    const selectedPoses = [];
    
    // Ambil dari checkbox yang dicentang
    document.querySelectorAll('input[name="pose"]:checked').forEach((cb) => {
        selectedPoses.push(cb.nextElementSibling.innerText.trim());
    });

    // Ambil dari input kustom teks yang diisi pengguna
    document.querySelectorAll('input[name="customPose[]"]').forEach((input) => {
        if (input.value.trim() !== "") {
            selectedPoses.push(input.value.trim());
        }
    });

    return selectedPoses.length > 0 ? selectedPoses.join(', ') : 'Standar';
}

// === LOGIKA CENTER-FOCUS CAROUSEL (DINAMIS, LOOP & COUNTER 1 DETIK) ===
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("worksCarousel");
  const prevBtn = document.getElementById("prevWork");
  const nextBtn = document.getElementById("nextWork");
  const counterEl = document.getElementById("worksCounter");

  if (!carousel || !prevBtn || !nextBtn) return;

  const cards = Array.from(carousel.querySelectorAll(".work-item"));
  const total = cards.length;

  if (total === 0) return;

  let activeIndex = 0;
  let hideTimer = null;

  function showCounterBriefly() {
    if (!counterEl) return;

    // Angka dimulai dari 1 (bukan 0) agar terbaca 1/10, 2/10, dst.
    counterEl.textContent = `${activeIndex + 1}/${total}`;
    counterEl.classList.add("is-visible");

    if (hideTimer) {
      clearTimeout(hideTimer);
    }

    // Hilang otomatis setelah 1 detik
    hideTimer = setTimeout(() => {
      counterEl.classList.remove("is-visible");
    }, 1000);
  }

  function updateCarousel() {
    const prevIndex = (activeIndex - 1 + total) % total;
    const nextIndex = (activeIndex + 1) % total;

    cards.forEach((card, index) => {
      card.classList.remove("pos-center", "pos-left", "pos-right", "pos-hidden");

      if (index === activeIndex) {
        card.classList.add("pos-center");
      } else if (index === prevIndex) {
        card.classList.add("pos-left");
      } else if (index === nextIndex) {
        card.classList.add("pos-right");
      } else {
        card.classList.add("pos-hidden");
      }
    });
  }

  nextBtn.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % total;
    updateCarousel();
    showCounterBriefly();
  });

  prevBtn.addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + total) % total;
    updateCarousel();
    showCounterBriefly();
  });

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("pos-left") || card.classList.contains("pos-right")) {
        activeIndex = index;
        updateCarousel();
        showCounterBriefly();
      }
    });
  });

  // Render awal tanpa menampilkan angka (muncul saat tombol panah diklik)
  updateCarousel();
});

// === PROTEKSI GAMBAR (CLIENT-SIDE DETERRENT) ===
document.addEventListener("DOMContentLoaded", () => {
  const worksSection = document.querySelector(".card-side") || document;

  // 1. Cegah klik kanan pada area gambar & carousel karya
  worksSection.addEventListener("contextmenu", (e) => {
    if (e.target.closest(".work-img-box") || e.target.closest(".works-carousel")) {
      e.preventDefault();
    }
  });

  // 2. Cegah dragstart pada semua gambar
  document.addEventListener("dragstart", (e) => {
    if (e.target.tagName === "IMG" || e.target.closest(".work-img-box")) {
      e.preventDefault();
    }
  });

  // 3. Cegah shortcut umum simpan halaman / lihat source / copy (opsional)
  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    const isCtrlOrCmd = e.ctrlKey || e.metaKey;

    if (isCtrlOrCmd && (key === "s" || key === "u")) {
      e.preventDefault();
    }
  });
});

// === TUTUP CELAH SAVE PAGE AS & KLIK KANAN (PALING BAWAH script.js) ===
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && ["s", "u"].includes(e.key.toLowerCase())) {
    e.preventDefault();
  }
});

async function renderProtectedCanvases() {
  const canvases = document.querySelectorAll(".work-canvas[data-work-src]");

  for (const canvas of canvases) {
    const src = canvas.getAttribute("data-work-src");
    if (!src) continue;

    try {
      const response = await fetch(src, { cache: "no-store" });
      const blob = await response.blob();
      const bitmap = await createImageBitmap(blob);

      const size = 600;
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");
      const scale = Math.max(size / bitmap.width, size / bitmap.height);
      const drawW = bitmap.width * scale;
      const drawH = bitmap.height * scale;
      const offsetX = (size - drawW) / 2;
      const offsetY = (size - drawH) / 2;

      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(bitmap, offsetX, offsetY, drawW, drawH);

      bitmap.close();
      canvas.removeAttribute("data-work-src");
    } catch (err) {
      const img = new Image();
      img.onload = () => {
        const size = 600;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        const scale = Math.max(size / img.width, size / img.height);
        const drawW = img.width * scale;
        const drawH = img.height * scale;
        ctx.drawImage(img, (size - drawW) / 2, (size - drawH) / 2, drawW, drawH);
      };
      img.src = src;
      canvas.removeAttribute("data-work-src");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderProtectedCanvases();
});

// === WHITELIST KARAKTER AMAN (TANPA UBAH HTML) ===
// Diizinkan: huruf (A-Z, a-z), angka (0-9), spasi, dan ? , . ( ) - + " : ! & *
const ALLOWED_INPUT_REGEX = /[^a-zA-Z0-9\s\?,\.\(\)\-\+" :!&*]/g;
const IGNORED_INPUT_TYPES = [
  "checkbox",
  "radio",
  "submit",
  "button",
  "reset",
  "hidden",
  "file",
  "range",
  "color",
];

function isTextEditableField(el) {
  if (!el || !(el instanceof HTMLElement)) return false;
  if (el.tagName === "TEXTAREA") return true;
  if (el.tagName === "INPUT") {
    const type = (el.type || "text").toLowerCase();
    return !IGNORED_INPUT_TYPES.includes(type);
  }
  return false;
}

function sanitizeAllowedChars(value) {
  return value.replace(ALLOWED_INPUT_REGEX, "");
}

function attachStrictInputFilter(el) {
  if (!isTextEditableField(el) || el.dataset.strictFiltered === "true") return;
  el.dataset.strictFiltered = "true";

  if (el.value) {
    el.value = sanitizeAllowedChars(el.value);
  }

  el.addEventListener("input", () => {
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const before = el.value;
    const after = sanitizeAllowedChars(before);

    if (before !== after) {
      el.value = after;
      if (typeof start === "number" && typeof end === "number") {
        const diff = before.length - after.length;
        const nextPos = Math.max(0, start - diff);
        el.setSelectionRange(nextPos, nextPos);
      }
    }
  });

  el.addEventListener("paste", (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    if (!clipboardData) return;

    const pastedText = clipboardData.getData("text");
    const cleanedText = sanitizeAllowedChars(pastedText);

    if (pastedText !== cleanedText) {
      e.preventDefault();
      const start = el.selectionStart ?? el.value.length;
      const end = el.selectionEnd ?? el.value.length;
      el.value = el.value.slice(0, start) + cleanedText + el.value.slice(end);
      const cursorPos = start + cleanedText.length;
      el.setSelectionRange(cursorPos, cursorPos);
      el.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });
}

function scanAndProtectInputs(root = document) {
  const fields = root.querySelectorAll("input, textarea");
  fields.forEach(attachStrictInputFilter);
}

function initStrictInputs() {
  scanAndProtectInputs(document);

  // Pantau elemen baru jika ada input/modal yang ditambahkan lewat JS
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;
        if (isTextEditableField(node)) {
          attachStrictInputFilter(node);
        } else if (node.querySelectorAll) {
          scanAndProtectInputs(node);
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initStrictInputs);
} else {
  initStrictInputs();
}