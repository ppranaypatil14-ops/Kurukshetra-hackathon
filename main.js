/**
 * RepoSense — Software Supply Chain Security Analyzer
 * Interactive Dependency Network Canvas, Terminal Scan Simulator & Showcase Controls
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initDependencyNetwork();
  initScanSimulation();
  initDashboardTabs();
});

/* ==========================================================================
   1. NAVBAR & NAVIGATION
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('navbar');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  // Scroll blur effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

/* ==========================================================================
   2. INTERACTIVE DEPENDENCY NETWORK CANVAS
   ========================================================================== */
function initDependencyNetwork() {
  const canvas = document.getElementById('dependencyCanvas');
  const container = document.getElementById('canvasContainer');
  const tooltip = document.getElementById('graphTooltip');
  const ttName = document.getElementById('ttName');
  const ttVersion = document.getElementById('ttVersion');
  const ttStatus = document.getElementById('ttStatus');
  const ttDesc = document.getElementById('ttDesc');

  if (!canvas || !container) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = container.clientWidth);
  let height = (canvas.height = container.clientHeight);

  // Resize handler
  window.addEventListener('resize', () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
    centerRepoNode();
  });

  // Color Definitions
  const COLORS = {
    cyan: '#00f0ff',
    green: '#00ffaa',
    yellow: '#f59e0b',
    red: '#ff3b5c',
    line: 'rgba(0, 240, 255, 0.15)',
    pulse: 'rgba(0, 240, 255, 0.6)'
  };

  // Node data definitions
  const nodes = [
    // Central Root Repository
    { id: 'root', name: 'core-api-service', ver: 'repo:main', type: 'root', risk: 'none', radius: 24, x: width * 0.5, y: height * 0.48, vx: 0, vy: 0 },

    // Critical Risky Nodes (Red)
    { id: 'jwt', name: 'jsonwebtoken', ver: 'v9.0.0', type: 'dep', risk: 'critical', radius: 14, x: width * 0.28, y: height * 0.26, vx: 0, vy: 0, desc: 'CVE-2022-23529 Remote Code Execution in verify()' },
    { id: 'axios', name: 'axios', ver: 'v1.2.0', type: 'dep', risk: 'critical', radius: 14, x: width * 0.74, y: height * 0.28, vx: 0, vy: 0, desc: 'CVE-2023-45857 Server-Side Request Forgery vulnerability' },
    { id: 'expr_jwt', name: 'express-jwt', ver: 'v0.1.2', type: 'dep', risk: 'critical', radius: 12, x: width * 0.20, y: height * 0.55, vx: 0, vy: 0, desc: 'Critical algorithm confusion flaw allows token bypass' },

    // Warning Nodes (Yellow)
    { id: 'lodash_squat', name: 'lod-ash', ver: 'v4.17.21', type: 'dep', risk: 'warning', radius: 13, x: width * 0.65, y: height * 0.75, vx: 0, vy: 0, desc: 'Typosquat candidate: Levenshtein distance 1 to lodash' },
    { id: 'internal_auth', name: '@internal/auth', ver: 'v1.0.0', type: 'dep', risk: 'warning', radius: 12, x: width * 0.38, y: height * 0.82, vx: 0, vy: 0, desc: 'Dependency confusion risk: unreserved public npm scope' },

    // Safe Nodes (Green)
    { id: 'ts', name: 'typescript', ver: 'v5.3.3', type: 'dep', risk: 'safe', radius: 11, x: width * 0.48, y: height * 0.18, vx: 0, vy: 0, desc: 'Clean build tool, verified cryptographic provenance' },
    { id: 'zod', name: 'zod', ver: 'v3.22.4', type: 'dep', risk: 'safe', radius: 10, x: width * 0.82, y: height * 0.58, vx: 0, vy: 0, desc: 'Type validation schema, zero known vulnerabilities' },
    { id: 'dotenv', name: 'dotenv', ver: 'v16.4.5', type: 'dep', risk: 'safe', radius: 9, x: width * 0.52, y: height * 0.78, vx: 0, vy: 0, desc: 'Secure environment loader, active maintainers' },
    { id: 'clsx', name: 'clsx', ver: 'v2.1.0', type: 'dep', risk: 'safe', radius: 8, x: width * 0.16, y: height * 0.35, vx: 0, vy: 0, desc: 'Zero dependencies, verified clean audit' }
  ];

  // Connections (Edges)
  const links = [
    { source: 'root', target: 'jwt' },
    { source: 'root', target: 'axios' },
    { source: 'root', target: 'expr_jwt' },
    { source: 'root', target: 'lodash_squat' },
    { source: 'root', target: 'internal_auth' },
    { source: 'root', target: 'ts' },
    { source: 'root', target: 'zod' },
    { source: 'root', target: 'dotenv' },
    { source: 'jwt', target: 'expr_jwt' },
    { source: 'expr_jwt', target: 'clsx' }
  ];

  function centerRepoNode() {
    const root = nodes.find(n => n.id === 'root');
    if (root) {
      root.x = width * 0.5;
      root.y = height * 0.48;
    }
  }

  // Energy pulses traveling along links
  const pulses = links.map(() => ({
    progress: Math.random(),
    speed: 0.006 + Math.random() * 0.008
  }));

  // Interaction State
  let hoveredNode = null;
  let draggedNode = null;
  let mouse = { x: -100, y: -100 };

  // Helper map for fast node lookup
  const nodeMap = new Map();
  nodes.forEach(n => nodeMap.set(n.id, n));

  // Physics update
  function updatePhysics() {
    const root = nodes.find(n => n.id === 'root');

    nodes.forEach(node => {
      if (node === draggedNode) return;
      if (node.type === 'root') {
        // Keep root gently centered
        node.vx += (width * 0.5 - node.x) * 0.02;
        node.vy += (height * 0.48 - node.y) * 0.02;
      } else {
        // Subtle floating motion
        node.vx += (Math.random() - 0.5) * 0.15;
        node.vy += (Math.random() - 0.5) * 0.15;

        // Gravitational tether to root
        if (root) {
          const dx = root.x - node.x;
          const dy = root.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const targetDist = 120 + (node.radius * 2);
          const force = (dist - targetDist) * 0.0012;
          node.vx += dx * force;
          node.vy += dy * force;
        }

        // Repel from other nodes
        nodes.forEach(other => {
          if (node === other) return;
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = node.radius + other.radius + 35;
          if (dist < minDist && dist > 0) {
            const push = (minDist - dist) * 0.015;
            node.vx += (dx / dist) * push;
            node.vy += (dy / dist) * push;
          }
        });
      }

      // Apply friction and bounds
      node.vx *= 0.92;
      node.vy *= 0.92;
      node.x += node.vx;
      node.y += node.vy;

      // Contain inside canvas borders
      const pad = node.radius + 15;
      if (node.x < pad) { node.x = pad; node.vx *= -0.5; }
      if (node.x > width - pad) { node.x = width - pad; node.vx *= -0.5; }
      if (node.y < pad) { node.y = pad; node.vy *= -0.5; }
      if (node.y > height - pad) { node.y = height - pad; node.vy *= -0.5; }
    });
  }

  // Render loop
  function render() {
    ctx.clearRect(0, 0, width, height);

    // 1. Draw Links
    links.forEach((link, idx) => {
      const src = nodeMap.get(link.source);
      const tgt = nodeMap.get(link.target);
      if (!src || !tgt) return;

      const isHovered = hoveredNode && (hoveredNode.id === src.id || hoveredNode.id === tgt.id);

      ctx.beginPath();
      ctx.moveTo(src.x, src.y);
      ctx.lineTo(tgt.x, tgt.y);

      if (isHovered) {
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.65)';
        ctx.lineWidth = 2.2;
      } else {
        ctx.strokeStyle = COLORS.line;
        ctx.lineWidth = 1.2;
      }
      ctx.stroke();

      // Draw Animated Pulse Signal along line
      const pulse = pulses[idx];
      pulse.progress += pulse.speed;
      if (pulse.progress > 1) pulse.progress = 0;

      const px = src.x + (tgt.x - src.x) * pulse.progress;
      const py = src.y + (tgt.y - src.y) * pulse.progress;

      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.cyan;
      ctx.shadowColor = COLORS.cyan;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // 2. Draw Nodes
    nodes.forEach(node => {
      const isHover = hoveredNode === node;
      let fillColor, glowColor, strokeColor;

      if (node.type === 'root') {
        fillColor = '#0b1329';
        strokeColor = COLORS.cyan;
        glowColor = 'rgba(0, 240, 255, 0.4)';
      } else if (node.risk === 'critical') {
        fillColor = '#240b12';
        strokeColor = COLORS.red;
        glowColor = 'rgba(255, 59, 92, 0.5)';
      } else if (node.risk === 'warning') {
        fillColor = '#241a0b';
        strokeColor = COLORS.yellow;
        glowColor = 'rgba(245, 158, 11, 0.4)';
      } else {
        fillColor = '#0b241b';
        strokeColor = COLORS.green;
        glowColor = 'rgba(0, 255, 170, 0.4)';
      }

      // Outer glow circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius + (isHover ? 6 : 2), 0, Math.PI * 2);
      ctx.fillStyle = glowColor;
      ctx.fill();

      // Base circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.lineWidth = isHover ? 2.5 : 1.8;
      ctx.strokeStyle = strokeColor;
      ctx.stroke();

      // Node label
      ctx.font = node.type === 'root' ? '600 11px JetBrains Mono' : '500 10px JetBrains Mono';
      ctx.fillStyle = isHover ? '#ffffff' : '#cbd5e1';
      ctx.textAlign = 'center';
      ctx.fillText(node.name, node.x, node.y + node.radius + 14);

      // Warning indicator badge on risky nodes
      if (node.risk === 'critical' || node.risk === 'warning') {
        const badgeX = node.x + node.radius * 0.7;
        const badgeY = node.y - node.radius * 0.7;
        ctx.beginPath();
        ctx.arc(badgeX, badgeY, 5.5, 0, Math.PI * 2);
        ctx.fillStyle = node.risk === 'critical' ? COLORS.red : COLORS.yellow;
        ctx.fill();

        ctx.font = '700 8px JetBrains Mono';
        ctx.fillStyle = '#06080e';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('!', badgeX, badgeY);
      }
    });

    updatePhysics();
    requestAnimationFrame(render);
  }

  // Mouse Interactivity
  function getNodeAt(x, y) {
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      const dx = x - n.x;
      const dy = y - n.y;
      if (Math.sqrt(dx * dx + dy * dy) <= n.radius + 8) {
        return n;
      }
    }
    return null;
  }

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

    if (draggedNode) {
      draggedNode.x = mouse.x;
      draggedNode.y = mouse.y;
      draggedNode.vx = 0;
      draggedNode.vy = 0;
      return;
    }

    const hit = getNodeAt(mouse.x, mouse.y);
    if (hit !== hoveredNode) {
      hoveredNode = hit;
      if (hoveredNode && hoveredNode.type !== 'root') {
        // Show tooltip
        ttName.textContent = hoveredNode.name;
        ttVersion.textContent = hoveredNode.ver;
        ttDesc.textContent = hoveredNode.desc || '';

        if (hoveredNode.risk === 'critical') {
          ttStatus.textContent = 'CRITICAL CVE';
          ttStatus.style.color = '#ff3b5c';
          ttStatus.style.background = 'rgba(255, 59, 92, 0.15)';
        } else if (hoveredNode.risk === 'warning') {
          ttStatus.textContent = 'SUPPLY CHAIN RISK';
          ttStatus.style.color = '#f59e0b';
          ttStatus.style.background = 'rgba(245, 158, 11, 0.15)';
        } else {
          ttStatus.textContent = 'INTEGRITY VERIFIED';
          ttStatus.style.color = '#00ffaa';
          ttStatus.style.background = 'rgba(0, 255, 170, 0.15)';
        }

        tooltip.style.left = `${hoveredNode.x}px`;
        tooltip.style.top = `${hoveredNode.y - hoveredNode.radius - 12}px`;
        tooltip.classList.add('visible');
      } else {
        tooltip.classList.remove('visible');
      }
    } else if (hoveredNode && hoveredNode.type !== 'root') {
      tooltip.style.left = `${hoveredNode.x}px`;
      tooltip.style.top = `${hoveredNode.y - hoveredNode.radius - 12}px`;
    }
  });

  canvas.addEventListener('mousedown', e => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const hit = getNodeAt(x, y);
    if (hit) {
      draggedNode = hit;
    }
  });

  window.addEventListener('mouseup', () => {
    draggedNode = null;
  });

  canvas.addEventListener('mouseleave', () => {
    hoveredNode = null;
    draggedNode = null;
    tooltip.classList.remove('visible');
  });

  // Start network loop
  render();
}

/* ==========================================================================
   3. REPOSITORY SCAN SIMULATION MODAL
   ========================================================================== */
function initScanSimulation() {
  const modal = document.getElementById('scanModal');
  const openBtns = document.querySelectorAll('.open-scan-modal');
  const closeBtn = document.getElementById('closeModalBtn');
  const runBtn = document.getElementById('runSimulationBtn');
  const restartBtn = document.getElementById('restartScanBtn');
  const viewDetailsBtn = document.getElementById('viewDetailsBtn');
  const consoleBody = document.getElementById('consoleBody');
  const resultSummary = document.getElementById('scanResultSummary');
  const repoInput = document.getElementById('repoInput');
  const modalRepoInput = document.getElementById('modalRepoInput');

  if (!modal) return;

  function openModal() {
    if (repoInput && modalRepoInput && repoInput.value.trim()) {
      modalRepoInput.value = repoInput.value.trim();
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    startScanSequence();
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      startScanSequence();
    });
  }

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      startScanSequence();
    });
  }

  if (viewDetailsBtn) {
    viewDetailsBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  let scanTimer = null;

  function appendLog(text, type = '') {
    const row = document.createElement('div');
    row.className = `term-row ${type}`;
    row.textContent = text;
    consoleBody.appendChild(row);
    consoleBody.scrollTop = consoleBody.scrollHeight;
  }

  function startScanSequence() {
    if (scanTimer) clearTimeout(scanTimer);
    consoleBody.innerHTML = '';
    resultSummary.style.display = 'none';

    const target = modalRepoInput ? modalRepoInput.value : 'repository';

    const steps = [
      { delay: 100, text: `[START] Initializing RepoSense AST engine for: ${target}`, type: 'info' },
      { delay: 450, text: `[1/5] Fetching package.json, package-lock.json & manifest trees...`, type: '' },
      { delay: 850, text: `[2/5] Parsed 84 total packages (23 direct, 61 transitive dependencies)`, type: 'info' },
      { delay: 1300, text: `[3/5] Querying CVE feeds (NVD, OSV, GitHub Security Advisories)...`, type: '' },
      { delay: 1800, text: `  -> [ALERT] CVE-2022-23529 (CVSS 9.8 RCE) detected in jsonwebtoken@9.0.0`, type: 'error' },
      { delay: 2200, text: `  -> [ALERT] CVE-2023-45857 (CVSS 9.1 SSRF) detected in axios@1.2.0`, type: 'error' },
      { delay: 2600, text: `[4/5] Executing Typosquatting & Levenshtein heuristics...`, type: '' },
      { delay: 3000, text: `  -> [SUSPICIOUS] Detected 'lod-ash@4.17.21' (Impersonating 'lodash')`, type: 'warn' },
      { delay: 3400, text: `[5/5] Checking private npm namespace collisions...`, type: '' },
      { delay: 3700, text: `  -> [WARNING] '@internal/auth' missing namespace reservation in public registry`, type: 'warn' },
      { delay: 4100, text: `[SYNTHESIS] Aggregating exploitability risk score: 72 / 100 [HIGH RISK]`, type: 'error' },
      { delay: 4400, text: `[DONE] Supply-chain audit complete. Actionable fixes generated.`, type: 'success' }
    ];

    let current = 0;

    function step() {
      if (current < steps.length) {
        const item = steps[current];
        appendLog(item.text, item.type);
        current++;
        scanTimer = setTimeout(step, item.delay ? 350 : 250);
      } else {
        resultSummary.style.display = 'flex';
      }
    }

    step();
  }
}

/* ==========================================================================
   4. DASHBOARD SHOWCASE TABS FILTER
   ========================================================================== */
function initDashboardTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tableRows = document.querySelectorAll('.mockup-table tbody tr');

  if (!tabBtns.length || !tableRows.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      tableRows.forEach(row => {
        const cat = row.getAttribute('data-category');
        if (filter === 'all') {
          row.style.display = '';
        } else if (filter === 'critical') {
          row.style.display = cat === 'critical' ? '' : 'none';
        } else if (filter === 'supply-chain') {
          row.style.display = (cat === 'supply-chain') ? '' : 'none';
        }
      });
    });
  });
}
