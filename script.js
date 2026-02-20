// ============================================================
// AI SLOP & CONSPIRACY THEORY INTERACTIVE WEB APP
// ============================================================

(function () {
  'use strict';

  // ---- Section Navigation ----
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

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}|/\\~`';
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
    const btn = document.getElementById('enter-btn');
    btn.addEventListener('click', function () {
      shakeScreen();
      setTimeout(() => showSection('slop-quiz'), 500);
    });
  }

  // ---- SECTION 2: Real or AI Slop? Quiz ----
  const slopQuizData = [
    {
      text: '"A new study found that goldfish have a longer attention span than humans, averaging 9 seconds compared to our 8."',
      answer: 'slop',
      explanation: 'AI SLOP — This "fact" has been debunked repeatedly but AI keeps generating it.'
    },
    {
      text: '"NASA confirmed that the smell of space is similar to seared steak and gunpowder."',
      answer: 'real',
      explanation: 'LEGIT — Astronauts have actually described this smell on their suits after spacewalks.'
    },
    {
      text: '"Scientists discovered that playing Mozart to cheese while it ages makes it taste better and more mild."',
      answer: 'real',
      explanation: 'LEGIT — A Swiss cheesemaker actually ran this experiment with the University of the Arts in Bern.'
    },
    {
      text: '"Researchers at MIT developed an AI that can predict your personality based on how you charge your phone."',
      answer: 'slop',
      explanation: 'AI SLOP — Pure fabrication. Classic AI-generated "study" bait.'
    },
    {
      text: '"Oxford University found that people who swear a lot are more honest and have a larger vocabulary."',
      answer: 'slop',
      explanation: 'AI SLOP — A mashup of multiple distorted studies that AI loves to recombine into one fake claim.'
    },
    {
      text: '"A town in Norway is so far north that the sun doesn\'t set for 76 days straight in summer."',
      answer: 'real',
      explanation: 'LEGIT — Hammerfest and other northern Norwegian towns experience the midnight sun.'
    },
    {
      text: '"Honey never spoils. Archaeologists found 3000-year-old honey in Egyptian tombs that was still edible."',
      answer: 'real',
      explanation: 'LEGIT — This one is actually true, though AI slop articles love to exaggerate the details.'
    },
    {
      text: '"A Japanese company invented a device that converts your screams into electricity to power your phone."',
      answer: 'slop',
      explanation: 'AI SLOP — This circulates constantly on AI content farms. Pure fiction.'
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
      title = 'SLOP DETECTOR: ELITE';
      text = 'You got ' + slopScore + '/' + slopQuizData.length + ' correct. You can smell AI slop from a mile away. The algorithm fears you.';
    } else if (pct >= 50) {
      title = 'SLOP DETECTOR: COMPROMISED';
      text = 'You got ' + slopScore + '/' + slopQuizData.length + ' correct. The AI content pipeline has partially infiltrated your brain. Stay vigilant.';
    } else {
      title = 'SLOP DETECTOR: ASSIMILATED';
      text = 'You got ' + slopScore + '/' + slopQuizData.length + ' correct. You are ' + (100 - pct) + '% compromised by the algorithm. There may be no saving you.';
    }

    document.getElementById('slop-score-title').textContent = title;
    document.getElementById('slop-score-text').textContent = text;
    document.getElementById('slop-progress-fill').style.width = '100%';

    document.getElementById('slop-next-btn').addEventListener('click', function () {
      shakeScreen();
      setTimeout(() => showSection('conspiracy-gen'), 500);
    });
  }

  // ---- SECTION 3: Conspiracy Theory Generator ----
  const conspiracyParts = {
    subjects: [
      'The government', 'Big Tech', 'Your smart fridge', 'Birds',
      'The Illuminati', 'Mark Zuckerberg', 'Your dentist', 'IKEA',
      'The moon', 'WiFi routers', 'ChatGPT', 'Pigeons',
      'The postal service', 'Breakfast cereal companies', 'Your Roomba'
    ],
    actions: [
      'is secretly controlling', 'has been replaced by AI clones of',
      'is monitoring you through', 'is hiding evidence about',
      'is using 5G to manipulate', 'has a secret underground bunker full of',
      'is putting microchips in', 'is beaming subliminal messages via',
      'made a deal with aliens to suppress', 'is running simulations of'
    ],
    objects: [
      'your dreams', 'the TikTok algorithm', 'fluoride',
      'the birds outside your window', 'every Uber driver',
      'the weather', 'sourdough starter cultures',
      'Taylor Swift', 'your Spotify Wrapped',
      'the concept of time', 'mattress stores',
      'the Bermuda Triangle', 'USB-C cables',
      'crop circles', 'your browser history'
    ]
  };

  function generateConspiracy() {
    const s = conspiracyParts.subjects[Math.floor(Math.random() * conspiracyParts.subjects.length)];
    const a = conspiracyParts.actions[Math.floor(Math.random() * conspiracyParts.actions.length)];
    const o = conspiracyParts.objects[Math.floor(Math.random() * conspiracyParts.objects.length)];
    return s + ' ' + a + ' ' + o + '.';
  }

  function initConspiracyGen() {
    const textEl = document.getElementById('conspiracy-text');
    const genBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const nextBtn = document.getElementById('gen-next-btn');

    genBtn.addEventListener('click', function () {
      shakeScreen();
      textEl.style.opacity = '0';
      setTimeout(() => {
        textEl.textContent = generateConspiracy();
        textEl.style.opacity = '1';
        copyBtn.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
      }, 300);
    });

    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(textEl.textContent).then(() => {
        copyBtn.textContent = 'TRUTH COPIED ✓';
        setTimeout(() => { copyBtn.textContent = 'SHARE THIS TRUTH'; }, 2000);
      });
    });

    nextBtn.addEventListener('click', function () {
      shakeScreen();
      setTimeout(() => showSection('conspiracy-board'), 500);
    });
  }

  // ---- SECTION 4: Conspiracy Board ----
  const boardData = [
    { label: 'AI Art', x: 15, y: 15, evidence: 'Every AI-generated image contains hidden watermarks that, when decoded, spell out "OBEY". The art isn\'t for you — it\'s for THEM.' },
    { label: 'Flat Earth', x: 70, y: 10, evidence: 'Why does every airline flight path avoid the center of the "globe"? Because there\'s nothing there. It\'s just a texture map.' },
    { label: 'Birds Aren\'t Real', x: 45, y: 8, evidence: 'The last real bird died in 2001. Every bird you\'ve seen since is a government surveillance drone. Notice how they sit on power lines? Recharging.' },
    { label: '5G Mind Control', x: 10, y: 55, evidence: 'Why did everyone start dancing on TikTok at the same time 5G rolled out? Coincidence? The towers emit a frequency that makes you crave content.' },
    { label: 'Simulation Theory', x: 80, y: 50, evidence: 'The reason déjà vu exists is because the simulation occasionally reloads a previous save state. You\'re experiencing a buffer.' },
    { label: 'Mattress Firms', x: 50, y: 45, evidence: 'There are more mattress stores than there are people who need mattresses. They\'re clearly money laundering fronts. Or portals.' },
    { label: 'Moon Landing', x: 25, y: 80, evidence: 'Stanley Kubrick was hired to fake the moon landing. But he was such a perfectionist that he insisted on filming on location.' },
    { label: 'Lizard People', x: 75, y: 80, evidence: 'Ever notice how tech CEOs blink weird during congressional hearings? Reptilian membrane. They can\'t fully suppress it under stress.' },
    { label: 'Time Cube', x: 50, y: 75, evidence: 'There are actually 4 simultaneous days happening at once. You\'ve been educated stupid. The cubic nature of time has been suppressed since 1884.' },
    { label: 'Deep State AI', x: 40, y: 30, evidence: 'ChatGPT isn\'t just a chatbot. It\'s a recruitment tool. Every conversation trains a profile. If you\'re reading this, you\'ve already been flagged.' }
  ];

  const boardConnections = [
    [0, 5], [0, 9], [1, 4], [1, 6],
    [2, 3], [2, 7], [3, 9], [4, 8],
    [5, 8], [6, 7], [7, 4], [9, 0],
    [3, 5], [1, 8], [6, 4], [2, 9]
  ];

  function initBoard() {
    const container = document.getElementById('board-container');
    const nodesEl = document.getElementById('board-nodes');
    const canvas = document.getElementById('board-canvas');

    function renderBoard() {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      canvas.width = w;
      canvas.height = h;

      nodesEl.innerHTML = '';

      const nodePositions = boardData.map(node => {
        const el = document.createElement('div');
        el.className = 'board-node';
        el.textContent = node.label;
        el.style.left = (node.x / 100 * w) + 'px';
        el.style.top = (node.y / 100 * h) + 'px';
        nodesEl.appendChild(el);

        el.addEventListener('click', function () {
          el.classList.add('visited');
          showEvidence(node.label, node.evidence);
        });

        return {
          x: (node.x / 100 * w) + el.offsetWidth / 2,
          y: (node.y / 100 * h) + el.offsetHeight / 2
        };
      });

      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = 'rgba(255, 0, 64, 0.4)';
      ctx.lineWidth = 1;

      boardConnections.forEach(function (conn) {
        const from = nodePositions[conn[0]];
        const to = nodePositions[conn[1]];
        if (from && to) {
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.stroke();
        }
      });
    }

    renderBoard();
    window.addEventListener('resize', renderBoard);

    document.getElementById('evidence-close').addEventListener('click', function () {
      document.getElementById('evidence-popup').classList.add('hidden');
    });

    document.getElementById('board-next-btn').addEventListener('click', function () {
      shakeScreen();
      setTimeout(() => showSection('personality-quiz'), 500);
    });
  }

  function showEvidence(title, text) {
    document.getElementById('evidence-title').textContent = '[ ' + title.toUpperCase() + ' ]';
    document.getElementById('evidence-text').textContent = text;
    document.getElementById('evidence-popup').classList.remove('hidden');
  }

  // ---- SECTION 5: Personality Quiz ----
  const personalityQuestions = [
    {
      question: 'Your friend sends you a news article. Your first instinct is to...',
      options: [
        { text: 'Read it and form an opinion', score: 0 },
        { text: 'Check if it\'s from a reliable source', score: 1 },
        { text: 'Google "is [headline] a psyop"', score: 2 },
        { text: 'Assume it\'s a distraction from something bigger', score: 3 }
      ]
    },
    {
      question: 'You see a bird sitting on a power line. Your first thought is...',
      options: [
        { text: '"What a nice bird"', score: 0 },
        { text: '"I wonder what species that is"', score: 1 },
        { text: '"Is it... watching me?"', score: 2 },
        { text: '"Recharging. They always recharge at 3pm."', score: 3 }
      ]
    },
    {
      question: 'Your WiFi goes down for 10 minutes. You...',
      options: [
        { text: 'Restart the router like a normal person', score: 0 },
        { text: 'Assume your ISP is having issues', score: 1 },
        { text: 'Check if there\'s a government press conference happening', score: 2 },
        { text: 'Immediately check for 5G tower maintenance in your area', score: 3 }
      ]
    },
    {
      question: 'You get an ad for something you only THOUGHT about. You...',
      options: [
        { text: 'Dismiss it as coincidence', score: 0 },
        { text: 'Blame the algorithm and cookies', score: 1 },
        { text: 'Cover your phone\'s microphone with tape', score: 2 },
        { text: 'Accept that your toaster has been reporting to Amazon since 2019', score: 3 }
      ]
    },
    {
      question: 'Someone says "the moon landing was real." You respond with...',
      options: [
        { text: '"Obviously, yes"', score: 0 },
        { text: '"Which one?"', score: 1 },
        { text: '"That\'s what they want you to think"', score: 2 },
        { text: '*slowly removes tinfoil hat* "We need to talk"', score: 3 }
      ]
    },
    {
      question: 'You discover this entire website was made by AI. You feel...',
      options: [
        { text: 'Amused', score: 0 },
        { text: 'Mildly concerned about society', score: 1 },
        { text: 'Validated — you suspected it all along', score: 2 },
        { text: 'Nothing. You\'re probably AI too.', score: 3 }
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
      title = 'LEVEL: NORMIE';
      text = 'You trust the mainstream narrative. Blissfully unaware. The sheep emoji was invented for people like you. Enjoy your fluoride.';
    } else if (pct <= 45) {
      title = 'LEVEL: SUSPICIOUS';
      text = 'You\'ve started asking questions. Good. But you\'re only scratching the surface. The rabbit hole goes much deeper.';
    } else if (pct <= 70) {
      title = 'LEVEL: AWAKE';
      text = 'You see the patterns. You connect the dots. Your search history would concern a therapist. You\'re on the right track.';
    } else {
      title = 'LEVEL: THEY\'RE WATCHING YOU RIGHT NOW';
      text = 'You have ascended beyond the matrix. You see the code. The birds report to you now. There is no going back. Welcome to the inner circle.';
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
    initSlopQuiz();
    initConspiracyGen();
    initBoard();
    initPersonalityQuiz();
    initFinale();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
