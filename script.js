/**
 * ============================================================================
 * LEILTE — A PERSONAL ROMANTIC ANNIVERSARY WEBSITE
 * Interactive JavaScript Engine
 * ============================================================================
 * 
 * 💖 HOW TO CUSTOMIZE THIS WEBSITE:
 * ----------------------------------------------------------------------------
 * 1. ANNIVERSARY DATE:
 *    Update `ANNIVERSARY_DATE` below when you have your exact date.
 *    Until then, it remains null and displays "4 beautiful months and counting".
 * 
 * 2. OUR SONG:
 *    - To play a local MP3: place `our-song.mp3` inside `assets/music/`.
 *    - To stream: update `SONG_STREAM_URL` with your Spotify or YouTube link.
 * 
 * 3. REASONS WHY I LOVE YOU:
 *    Add or modify any love reasons in the `REASONS_LIST` array below.
 * ============================================================================
 */

/* ============================================================================
   USER CONFIGURATION ZONE (EDIT THESE VALUES)
   ============================================================================ */

/**
 * 1. YOUR ANNIVERSARY START DATE
 * Format: "YYYY-MM-DD" (e.g. "2024-06-20") or null.
 * Leave as null until you decide on the exact date.
 */
const ANNIVERSARY_DATE = null; 

/**
 * 2. YOUR SONG STREAMING LINK
 * A direct link to your song on Spotify, YouTube, or Apple Music.
 */
const SONG_STREAM_URL = "https://open.spotify.com/search/Ed%20Sheeran%20Perfect";

/**
 * 3. THE 10 REASONS WHY I LOVE YOU
 * You can add as many more as you'd like!
 */
const REASONS_LIST = [
  "Your smile makes my day better.",
  "You make me feel happy and loved.",
  "You're smart, beautiful, and amazing.",
  "Your style is incredible.",
  "You make the university feel like home.",
  "You bring out the caring side of me.",
  "I love how cute and sexy you are.",
  "Being with you makes ordinary days special.",
  "You're my favorite person to spend time with.",
  "You make my world more beautiful."
];

/* ============================================================================
   END OF USER CONFIGURATION ZONE
   ============================================================================ */


function initAll() {
  initHeartsCanvas();
  initHeroSurprise();
  initPolaroidGallery();
  initVideoGallery();
  initReasonsFlipper();
  initMusicPlayer();
  initTimeCounter();
  initDodgingNoButton();
  initProposalCelebration();
  initSoundToggle();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAll);
} else {
  initAll();
}


/* ----------------------------------------------------------------------------
   1. FLOATING HEARTS BACKGROUND CANVAS (60fps Lightweight Animation)
   ---------------------------------------------------------------------------- */
function initHeartsCanvas() {
  const canvas = document.getElementById("hearts-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return; // Respect reduced motion accessibility

  const hearts = [];
  const MAX_HEARTS = 28;
  const colors = ["#fda4af", "#f43f5e", "#fecdd3", "#fb7185", "#ffd1dc"];

  class FloatingHeart {
    constructor(initRandomY = false) {
      this.reset(initRandomY);
    }

    reset(initRandomY = false) {
      this.x = Math.random() * width;
      this.y = initRandomY ? Math.random() * height : height + 20;
      this.size = Math.random() * 14 + 10;
      this.speedY = Math.random() * 0.8 + 0.4;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.45 + 0.2;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.rotation = (Math.random() - 0.5) * 0.6;
      this.swingSpeed = Math.random() * 0.02 + 0.01;
      this.swingOffset = Math.random() * Math.PI * 2;
    }

    update() {
      this.y -= this.speedY;
      this.x += Math.sin(this.y * this.swingSpeed + this.swingOffset) * 0.6 + this.speedX;

      if (this.y < -30 || this.x < -30 || this.x > width + 30) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;

      // Draw SVG Heart path onto canvas
      ctx.beginPath();
      const topCurveHeight = this.size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
      ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, (this.size + topCurveHeight) / 1.3, 0, this.size);
      ctx.bezierCurveTo(0, (this.size + topCurveHeight) / 1.3, this.size / 2, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight);
      ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }
  }

  for (let i = 0; i < MAX_HEARTS; i++) {
    hearts.push(new FloatingHeart(true));
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < hearts.length; i++) {
      hearts[i].update();
      hearts[i].draw();
    }
    requestAnimationFrame(animate);
  }

  animate();

  // Micro-interaction: clicking screen spawns a tiny rising heart
  window.addEventListener("pointerdown", (e) => {
    // Only spawn if not clicking an interactive button/link
    if (e.target.closest("button, a, input, [role='dialog']")) return;
    spawnClickHeart(e.clientX, e.clientY);
  });

  function spawnClickHeart(clientX, clientY) {
    const heart = document.createElement("div");
    heart.textContent = ["💖", "🌸", "✨", "💕", "👑"][Math.floor(Math.random() * 5)];
    heart.style.cssText = `
      position: fixed;
      left: ${clientX}px;
      top: ${clientY}px;
      font-size: 1.5rem;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%) scale(0.6);
      transition: transform 0.8s ease-out, opacity 0.8s ease-out;
      opacity: 1;
    `;
    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform = `translate(-50%, -100px) scale(1.4)`;
      heart.style.opacity = "0";
    });

    setTimeout(() => heart.remove(), 850);
  }
}


/* ----------------------------------------------------------------------------
   2. SECTION 1: HERO "OPEN SURPRISE" BUTTON
   ---------------------------------------------------------------------------- */
function initHeroSurprise() {
  const openSurpriseBtn = document.getElementById("open-surprise-btn");
  if (!openSurpriseBtn) return;

  openSurpriseBtn.addEventListener("click", () => {
    playChime(523.25); // High C chime

    // Confetti burst from button position
    triggerConfetti(openSurpriseBtn);

    // Smooth scroll down to memories
    const memoriesSection = document.getElementById("memories");
    if (memoriesSection) {
      memoriesSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}


/* ----------------------------------------------------------------------------
   3. SECTION 2: POLAROID GALLERY & LIGHTBOX
   ---------------------------------------------------------------------------- */
function initPolaroidGallery() {
  const gallery = document.getElementById("polaroid-gallery");
  const modal = document.getElementById("photo-modal");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalHeartBtn = document.getElementById("modal-heart-btn");
  const modalHeartCount = document.getElementById("modal-heart-count");

  if (!gallery || !modal) return;

  let currentHeartLikes = 1;

  // Open modal on polaroid click
  gallery.addEventListener("click", (e) => {
    const card = e.target.closest(".polaroid-card");
    if (!card) return;

    const img = card.querySelector(".polaroid-img");
    const caption = card.querySelector(".caption-text");

    if (img && caption) {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalCaption.textContent = caption.textContent;
      currentHeartLikes = Math.floor(Math.random() * 4) + 1;
      modalHeartCount.textContent = currentHeartLikes;

      modal.style.display = "flex";
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden"; // Prevent background scroll
      playChime(659.25); // E chime
    }
  });

  // Like button in modal
  if (modalHeartBtn) {
    modalHeartBtn.addEventListener("click", () => {
      currentHeartLikes++;
      modalHeartCount.textContent = currentHeartLikes;
      modalHeartBtn.style.transform = "scale(1.25)";
      setTimeout(() => (modalHeartBtn.style.transform = "scale(1)"), 150);
      playChime(783.99); // G chime
    });
  }

  // Close modal
  function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeModal();
    }
  });
}


/* ----------------------------------------------------------------------------
   3b. SECTION 3: VIDEO GALLERY (15 VIDEOS MANAGEMENT)
   ---------------------------------------------------------------------------- */
function initVideoGallery() {
  const videos = document.querySelectorAll(".romantic-video");
  const audioPlayer = document.getElementById("audio-player");
  const playPauseBtn = document.getElementById("play-pause-btn");

  videos.forEach((video) => {
    // When a video starts playing, pause all other videos
    video.addEventListener("play", () => {
      videos.forEach((other) => {
        if (other !== video && !other.paused) {
          other.pause();
        }
      });

      // Also pause background music if it's currently active so audio doesn't clash
      if (audioPlayer && !audioPlayer.paused) {
        audioPlayer.pause();
        if (playPauseBtn) {
          const playText = playPauseBtn.querySelector("#play-btn-text");
          const playIcon = playPauseBtn.querySelector("#play-btn-icon");
          if (playText) playText.textContent = "Play Song";
          if (playIcon) playIcon.textContent = "▶";
          const disc = document.getElementById("vinyl-disc");
          if (disc) disc.classList.remove("is-playing");
        }
      }
    });

    // Graceful fallback notice if video file cannot be loaded
    const source = video.querySelector("source");
    const showFallbackNotice = () => {
      const notice = video.parentElement.querySelector(".video-fallback-notice");
      if (notice) notice.style.display = "flex";
    };

    if (source) {
      source.addEventListener("error", showFallbackNotice);
    }
    video.addEventListener("error", showFallbackNotice);
  });
}


/* ----------------------------------------------------------------------------
   4. SECTION 4: REASONS WHY I LOVE YOU (NO REPEATS DECK)
   ---------------------------------------------------------------------------- */
function initReasonsFlipper() {
  const nextReasonBtn = document.getElementById("next-reason-btn");
  const reasonCard = document.getElementById("reason-display-card");
  const reasonQuote = document.getElementById("reason-quote");
  const reasonCounter = document.getElementById("reason-counter");
  const progressFill = document.getElementById("reason-progress-fill");
  const trackerLabel = document.getElementById("reason-tracker-label");

  if (!nextReasonBtn || !reasonCard || !reasonQuote) return;

  // Track remaining reasons to guarantee NO repeats until all shown
  let remainingIndices = [];
  let shownCount = 1;

  function resetDeck() {
    remainingIndices = REASONS_LIST.map((_, i) => i);
    // Shuffle using Fisher-Yates
    for (let i = remainingIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remainingIndices[i], remainingIndices[j]] = [remainingIndices[j], remainingIndices[i]];
    }
  }

  resetDeck();
  // Remove initial reason (#0) from deck if present
  remainingIndices = remainingIndices.filter((idx) => idx !== 0);

  nextReasonBtn.addEventListener("click", () => {
    playChime(659.25);

    // If all shown, reset deck
    if (remainingIndices.length === 0) {
      resetDeck();
      shownCount = 0;
    }

    const nextIndex = remainingIndices.pop();
    shownCount++;

    // Flip animation
    reasonCard.classList.remove("card-animated");
    void reasonCard.offsetWidth; // Reflow trigger
    reasonCard.classList.add("card-animated");

    // Update content
    reasonQuote.textContent = `"${REASONS_LIST[nextIndex]}"`;
    reasonCounter.textContent = `Reason #${nextIndex + 1}`;
    
    // Update progress bar
    const totalReasons = REASONS_LIST.length;
    const progressPercent = Math.min(100, Math.round((shownCount / totalReasons) * 100));
    progressFill.style.width = `${progressPercent}%`;
    trackerLabel.textContent = `${shownCount} of ${totalReasons} reasons shown`;
  });
}


/* ----------------------------------------------------------------------------
   5. SECTION 5: OUR SONG (SMART AUDIO & SPOTIFY FALLBACK)
   ---------------------------------------------------------------------------- */
function initMusicPlayer() {
  const audio = document.getElementById("audio-player");
  const playPauseBtn = document.getElementById("play-pause-btn");
  const playBtnText = document.getElementById("play-btn-text");
  const playBtnIcon = document.getElementById("play-btn-icon");
  const vinylDisc = document.getElementById("vinyl-disc");
  const statusDot = document.getElementById("music-status-dot");
  const statusText = document.getElementById("music-status-text");
  const externalLink = document.getElementById("external-music-link");

  if (!audio || !playPauseBtn) return;

  // Set streaming link from configuration
  if (externalLink && SONG_STREAM_URL) {
    externalLink.href = SONG_STREAM_URL;
  }

  let audioFileAvailable = false;

  // Test if local audio file exists and can load
  audio.addEventListener("canplaythrough", () => {
    audioFileAvailable = true;
    if (statusDot) statusDot.classList.add("active");
    if (statusText) statusText.textContent = "Audio ready • 'Perfect' by Ed Sheeran";
  });

  audio.addEventListener("error", () => {
    audioFileAvailable = false;
    if (statusDot) statusDot.classList.remove("active", "playing");
    if (statusText) {
      statusText.textContent = "No local audio file in assets/music/our-song.mp3 (Click to stream!)";
    }
  });

  playPauseBtn.addEventListener("click", () => {
    if (audioFileAvailable) {
      // Local audio file is present! Play or pause it
      if (audio.paused) {
        audio.play().then(() => {
          updatePlayingState(true);
        }).catch(() => {
          openStreamingAlternative();
        });
      } else {
        audio.pause();
        updatePlayingState(false);
      }
    } else {
      // No local audio file; gracefully guide to the streaming service
      // Do NOT pretend to play music when none is loaded
      openStreamingAlternative();
    }
  });

  function updatePlayingState(isPlaying) {
    if (isPlaying) {
      if (vinylDisc) vinylDisc.classList.add("is-playing");
      if (statusDot) statusDot.classList.add("playing");
      if (playBtnText) playBtnText.textContent = "Pause Song";
      if (playBtnIcon) playBtnIcon.textContent = "⏸";
      if (statusText) statusText.textContent = "Now Playing • 'Perfect' by Ed Sheeran ❤️";
    } else {
      if (vinylDisc) vinylDisc.classList.remove("is-playing");
      if (statusDot) statusDot.classList.remove("playing");
      if (playBtnText) playBtnText.textContent = "Play Song";
      if (playBtnIcon) playBtnIcon.textContent = "▶";
      if (statusText) statusText.textContent = "Paused";
    }
  }

  function openStreamingAlternative() {
    if (statusText) {
      statusText.textContent = "Opening Spotify streaming link... 🎵";
    }
    window.open(SONG_STREAM_URL, "_blank");
  }

  audio.addEventListener("ended", () => {
    updatePlayingState(false);
  });
}


/* ----------------------------------------------------------------------------
   6. SECTION 6: OUR TIME TOGETHER
   ---------------------------------------------------------------------------- */
function initTimeCounter() {
  const unitMonths = document.getElementById("unit-months");
  const unitDays = document.getElementById("unit-days");
  const unitHours = document.getElementById("unit-hours");
  const unitStatus = document.getElementById("unit-status");
  const timeDynamicMsg = document.getElementById("time-dynamic-message");

  // Requirement: Until starting date is configured, display "4 beautiful months and counting"
  // Do NOT invent a fake starting date.
  if (!ANNIVERSARY_DATE) {
    if (timeDynamicMsg) {
      timeDynamicMsg.innerHTML = `
        <p class="time-status-pill">4 beautiful months and counting ❤️</p>
      `;
    }
    if (unitMonths) unitMonths.textContent = "4";
    if (unitDays) unitDays.textContent = "120+";
    if (unitHours) unitHours.textContent = "2,880+";
    if (unitStatus) unitStatus.textContent = "Forever";
    return;
  }

  // If user has provided their real date, run dynamic live countdown
  const startDate = new Date(ANNIVERSARY_DATE);
  if (isNaN(startDate.getTime())) return;

  function updateLiveTime() {
    const now = new Date();
    const diffMs = now - startDate;

    if (diffMs < 0) return;

    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    // Approximate months
    const approxMonths = Math.floor(totalDays / 30.4375);

    if (unitMonths) unitMonths.textContent = approxMonths;
    if (unitDays) unitDays.textContent = totalDays.toLocaleString();
    if (unitHours) unitHours.textContent = totalHours.toLocaleString();
    if (unitStatus) unitStatus.textContent = `${totalSeconds % 60}s`;

    if (timeDynamicMsg) {
      timeDynamicMsg.innerHTML = `
        <p class="time-status-pill">
          ${totalDays} days, ${totalHours % 24} hours, and ${totalSeconds % 60} seconds of pure happiness ❤️
        </p>
      `;
    }
  }

  updateLiveTime();
  setInterval(updateLiveTime, 1000);
}


/* ----------------------------------------------------------------------------
   7. SECTION 7: DODGING "NO" BUTTON (SMOOTH & STRICTLY BOUNDED)
   ---------------------------------------------------------------------------- */
function initDodgingNoButton() {
  const noBtn = document.getElementById("no-btn");
  const zone = document.getElementById("proposal-buttons-zone");
  const noModal = document.getElementById("no-modal");
  const errorFixBtn = document.getElementById("error-fix-btn");
  const yesBtn = document.getElementById("yes-btn");

  if (!noBtn || !zone) return;

  let dodgeCount = 0;
  let currentX = -1;
  let currentY = -1;

  function dodge() {
    const zoneRect = zone.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn ? yesBtn.getBoundingClientRect() : null;

    // Ensure we keep the button strictly inside the zone with safe padding
    const padding = 12;
    const maxLeft = Math.max(10, zoneRect.width - btnRect.width - padding);
    const maxHeight = Math.max(10, zoneRect.height - btnRect.height - padding);

    let newX = 10;
    let newY = 10;
    let attempts = 0;

    // Avoid overlapping the YES button and guarantee visible movement
    do {
      newX = Math.max(padding, Math.floor(Math.random() * maxLeft));
      newY = Math.max(padding, Math.floor(Math.random() * maxHeight));
      attempts++;

      const tooClose = currentX >= 0 && Math.hypot(newX - currentX, newY - currentY) < 50;

      if (!yesRect) {
        if (!tooClose || attempts > 25) break;
        continue;
      }

      const yesRelLeft = yesRect.left - zoneRect.left;
      const yesRelTop = yesRect.top - zoneRect.top;
      const yesRelRight = yesRelLeft + yesRect.width;
      const yesRelBottom = yesRelTop + yesRect.height;

      const overlapsYes = !(
        newX + btnRect.width < yesRelLeft - 8 ||
        newX > yesRelRight + 8 ||
        newY + btnRect.height < yesRelTop - 8 ||
        newY > yesRelBottom + 8
      );

      if ((!overlapsYes && !tooClose) || attempts > 30) {
        break;
      }
    } while (true);

    currentX = newX;
    currentY = newY;

    noBtn.style.position = "absolute";
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    noBtn.style.transition = "left 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)";

    dodgeCount++;
    if (dodgeCount > 2) {
      noBtn.textContent = ["Wait, really? 🥺", "Wrong button! 😂", "Can't catch me! 🏃‍♀️", "Pick YES! 🥰"][dodgeCount % 4];
    }
  }

  // Desktop mouse proximity dodging
  noBtn.addEventListener("mouseenter", dodge);
  noBtn.addEventListener("mouseover", dodge);

  // Mobile touch dodge without blocking page scroll
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    dodge();
  }, { passive: false });

  noBtn.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "touch") {
      e.preventDefault();
      dodge();
    }
  });

  // If successfully clicked (e.g. keyboard accessible focus + enter)
  noBtn.addEventListener("click", () => {
    if (noModal) {
      noModal.style.display = "flex";
      noModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      playChime(392.00); // Lower chime
    }
  });

  // Close the funny error modal
  if (errorFixBtn) {
    errorFixBtn.addEventListener("click", () => {
      if (noModal) {
        noModal.style.display = "none";
        noModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }
      if (yesBtn) {
        yesBtn.focus();
        yesBtn.click(); // Trigger celebration directly!
      }
    });
  }

  if (noModal) {
    noModal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-backdrop")) {
        noModal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }
}


/* ----------------------------------------------------------------------------
   8. SECTION 7: PROPOSAL CELEBRATION (YES BUTTON)
   ---------------------------------------------------------------------------- */
function initProposalCelebration() {
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");
  const celebrationBox = document.getElementById("celebration-box");
  const proposalCard = document.getElementById("proposal-card");
  const dodgeHint = document.getElementById("dodge-hint");
  const replayConfettiBtn = document.getElementById("replay-confetti-btn");

  if (!yesBtn || !celebrationBox) return;

  function triggerCelebration() {
    // Hide buttons and hint
    if (yesBtn) yesBtn.style.display = "none";
    if (noBtn) noBtn.style.display = "none";
    if (dodgeHint) dodgeHint.style.display = "none";

    // Reveal celebration card
    celebrationBox.style.display = "block";
    if (proposalCard) {
      proposalCard.classList.add("celebration-active");
    }

    // Play celebration arpeggio
    playRomanticArpeggio();

    // Big heart & confetti shower
    triggerConfetti(celebrationBox, 100);
  }

  yesBtn.addEventListener("click", triggerCelebration);

  if (replayConfettiBtn) {
    replayConfettiBtn.addEventListener("click", () => {
      playRomanticArpeggio();
      triggerConfetti(replayConfettiBtn, 80);
    });
  }
}


/* ----------------------------------------------------------------------------
   9. CANVASES & CONFETTI GENERATOR (Pure Vanilla, Zero External Dependencies)
   ---------------------------------------------------------------------------- */
function triggerConfetti(targetElement, particleCount = 60) {
  const colors = ["#f43f5e", "#fb7185", "#fda4af", "#ffd700", "#ffffff", "#f472b6"];
  const rect = targetElement ? targetElement.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2 };
  const originX = rect.left + (rect.width ? rect.width / 2 : 0);
  const originY = rect.top + (rect.height ? rect.height / 2 : 0);

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement("div");
    const isHeart = Math.random() > 0.4;
    p.textContent = isHeart ? (Math.random() > 0.5 ? "💖" : "🌸") : "";
    
    const size = Math.random() * 10 + 8;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 260 + 120;
    const destX = Math.cos(angle) * velocity;
    const destY = Math.sin(angle) * velocity - 90; // Upward bias
    const rotate = (Math.random() - 0.5) * 720;

    p.style.cssText = `
      position: fixed;
      left: ${originX}px;
      top: ${originY}px;
      width: ${isHeart ? "auto" : size + "px"};
      height: ${isHeart ? "auto" : size + "px"};
      background: ${isHeart ? "transparent" : color};
      border-radius: ${isHeart ? "0" : (Math.random() > 0.5 ? "50%" : "2px")};
      font-size: ${isHeart ? size + 6 + "px" : "inherit"};
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%) scale(0.5);
      transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 1.2s ease-out;
      opacity: 1;
    `;

    document.body.appendChild(p);

    requestAnimationFrame(() => {
      p.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) rotate(${rotate}deg) scale(1)`;
      p.style.opacity = "0";
    });

    setTimeout(() => p.remove(), 1250);
  }
}


/* ----------------------------------------------------------------------------
   10. ROMANTIC CHIMES (Synthesized via Web Audio API)
   Zero external audio files required! Pure, gentle, pleasant chimes.
   ---------------------------------------------------------------------------- */
let audioCtx = null;
let soundEnabled = true;

function initSoundToggle() {
  const toggleBtn = document.getElementById("sound-toggle");
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    toggleBtn.style.opacity = soundEnabled ? "1" : "0.5";
    toggleBtn.title = soundEnabled ? "Chimes enabled" : "Chimes muted";
    if (soundEnabled) playChime(587.33);
  });
}

function playChime(freq = 523.25) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.15, audioCtx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.85);
  } catch (err) {
    // Silently ignore if browser restricts audio
  }
}

function playRomanticArpeggio() {
  if (!soundEnabled) return;
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    setTimeout(() => playChime(freq), idx * 120);
  });
}
