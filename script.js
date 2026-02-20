// ============================================================
// BIRDS AREN'T REAL — INTERACTIVE PRESENTATION
// ============================================================

(function () {
  'use strict';

  const sections = document.querySelectorAll('.section');

  function showSection(id) {
    sections.forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
      window.scrollTo(0, 0);
    }
  }

  function shakeScreen() {
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 500);
  }

  // ---- Matrix Rain Background ----
  function initMatrix() {
    const canvas = document.getElementById('matrix-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const chars = 'BIRDSARENTREAL01IF1TFLIES1TSPIES@#$%<>[]{}|/\\~`';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(draw, 50);
  }

  // ---- SECTION 1: Landing Page ----
  function initLanding() {
    document.getElementById('enter-btn').addEventListener('click', function () {
      shakeScreen();
      setTimeout(() => showSection('timeline'), 500);
    });
  }

  // ---- SECTION 2: Timeline ----
  function initTimeline() {
    document.querySelectorAll('.timeline-card').forEach(function (card) {
      card.addEventListener('click', function () {
        const detail = card.querySelector('.timeline-detail');
        const isExpanded = card.classList.contains('expanded');

        if (isExpanded) {
          card.classList.remove('expanded');
          detail.classList.add('hidden');
        } else {
          card.classList.add('expanded');
          detail.classList.remove('hidden');
        }
      });
    });

    document.getElementById('timeline-next-btn').addEventListener('click', function () {
      shakeScreen();
      setTimeout(() => showSection('slop-quiz'), 500);
    });
  }

  // ---- SECTION 3: Real Bird Fact or Gov't Lie? ----
  const slopQuizData = [
    {
      text: '"Pigeons can recognize themselves in a mirror, passing the self-awareness test that most animals fail."',
      answer: 'real',
      explanation: 'REAL FACT — Pigeons are one of the few non-mammal species to pass the mirror test, demonstrated in a 2008 study.'
    },
    {
      text: '"The last real bird in North America died in 1971 when the CIA completed Project Ornithex, a classified avian replacement program."',
      answer: 'fake',
      explanation: 'GOV\'T LIE — This is the core claim of the Birds Aren\'t Real movement. Project Ornithex doesn\'t exist... or does it?'
    },
    {
      text: '"A woodpecker\'s tongue wraps all the way around the back of its skull to cushion its brain during pecking."',
      answer: 'real',
      explanation: 'REAL FACT — The hyoid bone in woodpeckers wraps around the skull, acting as a shock absorber. Nature is wild.'
    },
    {
      text: '"Bird \'migration\' is actually a scheduled firmware update cycle. They fly south to receive software patches at designated relay stations."',
      answer: 'fake',
      explanation: 'GOV\'T LIE — Classic Birds Aren\'t Real doctrine. Migration is real, but this explanation is way more fun.'
    },
    {
      text: '"Crows can remember individual human faces and hold grudges against specific people for years."',
      answer: 'real',
      explanation: 'REAL FACT — University of Washington researchers proved crows recognize and remember threatening faces for 5+ years.'
    },
    {
      text: '"Birds sitting on power lines are wirelessly recharging their internal surveillance batteries through induction charging."',
      answer: 'fake',
      explanation: 'GOV\'T LIE — The recharging theory is one of the movement\'s most iconic claims. Birds actually sit on wires because their feet insulate them.'
    },
    {
      text: '"Flamingos can only eat with their heads completely upside down, filtering food through comb-like structures in their beaks."',
      answer: 'real',
      explanation: 'REAL FACT — Flamingos are obligate filter feeders and must invert their heads to eat. Real birds are stranger than fiction.'
    },
    {
      text: '"A group of flamingos is called a \'flamboyance.\'"',
      answer: 'real',
      explanation: 'REAL FACT — This is 100% real. Whoever named bird groups was clearly having a good time.'
    }
  ];

  let slopIndex = 0;
  let slopScore = 0;

  function initSlopQuiz() {
    renderSlopQuestion();

    document.querySelectorAll('#slop-buttons .btn-choice').forEach(btn => {
      btn.addEventListener('click', function () {
        const answer = this.dataset.answer;
        const current = slopQuizData[slopIndex];
        const resultEl = document.getElementById('slop-result');
        const buttonsEl = document.getElementById('slop-buttons');

        const isCorrect = answer === current.answer;
        if (isCorrect) slopScore++;

        resultEl.textContent = isCorrect ? '✓ CORRECT' : '✗ WRONG';
        resultEl.className = 'quiz-result ' + (isCorrect ? 'correct' : 'wrong');
        resultEl.classList.remove('hidden');
        buttonsEl.classList.add('hidden');

        document.getElementById('slop-question').innerHTML =
          '<div>' + current.text + '<br><br><small style="color:#888">' + current.explanation + '</small></div>';

        setTimeout(() => {
          slopIndex++;
          if (slopIndex < slopQuizData.length) {
            resultEl.classList.add('hidden');
            buttonsEl.classList.remove('hidden');
            renderSlopQuestion();
          } else {
            showSlopFinal();
          }
        }, 2500);
      });
    });
  }

  function renderSlopQuestion() {
    const q = slopQuizData[slopIndex];
    document.getElementById('slop-question').innerHTML = '<p>' + q.text + '</p>';
    const pct = ((slopIndex) / slopQuizData.length) * 100;
    document.getElementById('slop-progress-fill').style.width = pct + '%';
  }

  function showSlopFinal() {
    document.getElementById('slop-quiz-container').classList.add('hidden');
    const finalEl = document.getElementById('slop-final');
    finalEl.classList.remove('hidden');

    const pct = Math.round((slopScore / slopQuizData.length) * 100);
    let title, text;

    if (pct >= 80) {
      title = 'DRONE DETECTOR: ELITE';
      text = 'You got ' + slopScore + '/' + slopQuizData.length + ' correct. You can tell real bird facts from government propaganda. The resistance needs you.';
    } else if (pct >= 50) {
      title = 'DRONE DETECTOR: COMPROMISED';
      text = 'You got ' + slopScore + '/' + slopQuizData.length + ' correct. The bird propaganda machine has partially infiltrated your mind. Stay vigilant near power lines.';
    } else {
      title = 'DRONE DETECTOR: ASSIMILATED';
      text = 'You got ' + slopScore + '/' + slopQuizData.length + ' correct. You can\'t tell real birds from government lies. The drones have already won your mind.';
    }

    document.getElementById('slop-score-title').textContent = title;
    document.getElementById('slop-score-text').textContent = text;
    document.getElementById('slop-progress-fill').style.width = '100%';

    document.getElementById('slop-next-btn').addEventListener('click', function () {
      shakeScreen();
      setTimeout(() => showSection('videos'), 500);
    });
  }

  // ---- SECTION 4: Surveillance Footage (Videos) ----
  function initVideos() {
    document.getElementById('videos-next-btn').addEventListener('click', function () {
      shakeScreen();
      setTimeout(() => showSection('personality-quiz'), 500);
    });
  }

  // ---- SECTION 5: Personality Quiz ----
  const personalityQuestions = [
    {
      question: 'A pigeon lands near your lunch. You...',
      options: [
        { text: 'Toss it a crumb and carry on eating', score: 0 },
        { text: 'Shoo it away — dirty birds', score: 1 },
        { text: 'Cover your phone camera immediately', score: 2 },
        { text: 'Whisper its serial number into your sleeve and report to base', score: 3 }
      ]
    },
    {
      question: 'You hear birds chirping at 4am. You think...',
      options: [
        { text: '"It\'s the dawn chorus, how lovely"', score: 0 },
        { text: '"Ugh, so annoying this early"', score: 1 },
        { text: '"Sounds like a scheduled data upload cycle"', score: 2 },
        { text: '"I should jam the signal with white noise before they finish transmitting"', score: 3 }
      ]
    },
    {
      question: 'Someone gives you a bird feeder as a gift. You...',
      options: [
        { text: 'Hang it in the garden, lovely', score: 0 },
        { text: 'Regift it — not really your thing', score: 1 },
        { text: 'Burn it. You\'re not fueling government drones.', score: 2 },
        { text: 'Set up a counter-surveillance camera pointed directly at it', score: 3 }
      ]
    },
    {
      question: 'You see a flock of geese flying in V formation. You think...',
      options: [
        { text: '"Beautiful — nature is amazing"', score: 0 },
        { text: '"Must be migration season"', score: 1 },
        { text: '"That\'s a tactical drone formation, not migration"', score: 2 },
        { text: '"Squadron deployment. They\'re heading to the firmware update station."', score: 3 }
      ]
    },
    {
      question: 'A bird poops on your car. You...',
      options: [
        { text: 'Wash it off at the next gas station', score: 0 },
        { text: 'Get annoyed and curse the bird', score: 1 },
        { text: 'Realize your car has been GPS-tagged for satellite tracking', score: 2 },
        { text: 'Scrape a sample into a ziplock bag and send it to an independent lab', score: 3 }
      ]
    },
    {
      question: 'Someone tells you "Birds Aren\'t Real is just a joke." You respond...',
      options: [
        { text: '"Ha, yeah it\'s pretty funny"', score: 0 },
        { text: '"It makes some good points about misinformation though"', score: 1 },
        { text: '"That\'s exactly what a government agent would say"', score: 2 },
        { text: '*stares in silence, then hands them a pamphlet* "Read this. Then we\'ll talk."', score: 3 }
      ]
    }
  ];

  let pqIndex = 0;
  let pqScore = 0;

  function initPersonalityQuiz() {
    renderPQQuestion();
  }

  function renderPQQuestion() {
    const q = personalityQuestions[pqIndex];
    document.getElementById('pq-question').innerHTML = '<p>' + q.question + '</p>';
    const optionsEl = document.getElementById('pq-options');
    optionsEl.innerHTML = '';

    q.options.forEach(function (opt) {
      const div = document.createElement('div');
      div.className = 'pq-option';
      div.textContent = opt.text;
      div.addEventListener('click', function () {
        pqScore += opt.score;
        pqIndex++;
        const pct = (pqIndex / personalityQuestions.length) * 100;
        document.getElementById('pq-progress-fill').style.width = pct + '%';

        if (pqIndex < personalityQuestions.length) {
          renderPQQuestion();
        } else {
          showPQResult();
        }
      });
      optionsEl.appendChild(div);
    });
  }

  function showPQResult() {
    document.getElementById('pq-container').classList.add('hidden');
    document.getElementById('pq-result').classList.remove('hidden');

    const maxScore = personalityQuestions.length * 3;
    const pct = Math.round((pqScore / maxScore) * 100);
    let title, text;

    if (pct <= 20) {
      title = 'LEVEL: OBLIVIOUS';
      text = 'You still think they\'re real. You feed them. You watch them. You even think they\'re "cute." The drones have won your mind completely. There may be no saving you.';
    } else if (pct <= 45) {
      title = 'LEVEL: QUESTIONING';
      text = 'You\'ve noticed things. The way they stare. The way they sit in perfect rows on wires. Something doesn\'t add up. Keep pulling the thread.';
    } else if (pct <= 70) {
      title = 'LEVEL: AWARE';
      text = 'You see them for what they are. You\'ve stopped feeding the enemy. You cover your cameras near "nesting" areas. The resistance needs people like you.';
    } else {
      title = 'LEVEL: BIRD TRUTHER';
      text = 'You are fully awake. You can identify drone models by wingspan. You haven\'t been to a park in years. The birds report to YOU now. Welcome to the inner circle.';
    }

    document.getElementById('pq-result-title').textContent = title;
    document.getElementById('pq-result-text').textContent = text;
    document.getElementById('pq-result-level').style.setProperty('--depth', pct + '%');

    document.getElementById('pq-next-btn').addEventListener('click', function () {
      shakeScreen();
      setTimeout(() => showSection('finale'), 500);
    });
  }

  // ---- SECTION 6: Finale ----
  function initFinale() {
    const btn = document.getElementById('finale-btn');
    btn.addEventListener('click', function () {
      btn.classList.add('hidden');
      shakeScreen();

      setTimeout(function () {
        document.getElementById('finale-reveal').classList.remove('hidden');

        if (typeof confetti === 'function') {
          confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
          setTimeout(function () {
            confetti({ particleCount: 80, spread: 120, origin: { y: 0.7 } });
          }, 500);
          setTimeout(function () {
            confetti({ particleCount: 50, angle: 60, spread: 80, origin: { x: 0 } });
            confetti({ particleCount: 50, angle: 120, spread: 80, origin: { x: 1 } });
          }, 1000);
        }
      }, 800);
    });
  }

  // ---- Initialize Everything ----
  function init() {
    initMatrix();
    initLanding();
    initTimeline();
    initSlopQuiz();
    initVideos();
    initPersonalityQuiz();
    initFinale();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
