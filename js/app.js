// --------------------------------------------------------------
// 1. THREE.JS BACKGROUND (Immersive 3D)
// --------------------------------------------------------------
const canvasEl = document.getElementById('three-canvas');
const scene = new THREE.Scene();
scene.background = null;
scene.fog = new THREE.FogExp2(0x03050a, 0.0018);
const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.2, 30);
const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Particle system
const particleCount = 2400;
const geomParticles = new THREE.BufferGeometry();
const positionsArray = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  positionsArray[i*3] = (Math.random() - 0.5) * 220;
  positionsArray[i*3+1] = (Math.random() - 0.5) * 120;
  positionsArray[i*3+2] = (Math.random() - 0.5) * 100 - 30;
}
geomParticles.setAttribute('position', new THREE.BufferAttribute(positionsArray, 3));
const particleMaterial = new THREE.PointsMaterial({ color: 0x8b5cf6, size: 0.18, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending });
const particleSystem = new THREE.Points(geomParticles, particleMaterial);
scene.add(particleSystem);

// Central torus knot
const knotGeo = new THREE.TorusKnotGeometry(3.6, 0.85, 260, 42, 3, 4);
const knotMat = new THREE.MeshStandardMaterial({ color: 0x4f46e5, wireframe: true, emissive: 0x2e1065, roughness: 0.3, metalness: 0.85 });
const knot = new THREE.Mesh(knotGeo, knotMat);
scene.add(knot);

// Orbiting ring
const ringGeo = new THREE.TorusGeometry(5.0, 0.07, 160, 400);
const ringMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0x3b0764 });
const ring = new THREE.Mesh(ringGeo, ringMat);
ring.rotation.x = Math.PI / 2;
scene.add(ring);

// Lighting
const ambientLight = new THREE.AmbientLight(0x1a1a2e);
scene.add(ambientLight);
const keyLight = new THREE.PointLight(0x4f46e5, 0.85);
keyLight.position.set(5, 7, 12);
scene.add(keyLight);
const fillLight = new THREE.PointLight(0xa855f7, 0.45);
fillLight.position.set(-4, 3, -8);
scene.add(fillLight);

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = (e.clientY / window.innerHeight) * 2 - 1;
});

function animate3D() {
  requestAnimationFrame(animate3D);
  const t = Date.now() * 0.0012;
  knot.rotation.x = t * 0.22;
  knot.rotation.y = t * 0.38;
  ring.rotation.z = t * 0.14;
  ring.rotation.x = Math.sin(t * 0.45) * 0.65;
  particleSystem.rotation.y = t * 0.045;
  particleSystem.rotation.x = Math.sin(t * 0.1) * 0.07;
  camera.position.x += (mouseX * 1.4 - camera.position.x) * 0.025;
  camera.position.y += (-mouseY * 1.1 - camera.position.y) * 0.025;
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
}
animate3D();
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --------------------------------------------------------------
// 2. LENIS SMOOTH SCROLL + GSAP SCROLLTRIGGER
// --------------------------------------------------------------
const lenis = new Lenis({ duration: 1.25, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// Counters animation
const counters = document.querySelectorAll('.counter');
counters.forEach(c => {
  const target = parseInt(c.getAttribute('data-target'));
  ScrollTrigger.create({
    trigger: c, start: 'top 85%', once: true,
    onEnter: () => {
      gsap.fromTo(c, { innerText: 0 }, {
        innerText: target, duration: 2.4, snap: { innerText: 1 }, ease: 'back.out(1.2)',
        onUpdate: function() { c.innerText = Math.floor(c.innerText) + (target === 4 ? '%' : ''); }
      });
    }
  });
});

// Reveal items on scroll
document.querySelectorAll('.reveal-item').forEach(el => {
  ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => el.classList.add('revealed') });
});

// Hero entrance animation
gsap.from("h1 .block:first-child", { y: 110, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.2 });
gsap.from("h1 .block:last-child", { y: 110, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.45 });

// Smooth anchor scroll with Lenis
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -80 }); }
  });
});

// --------------------------------------------------------------
// 3. INTELLIGENT LOCAL AI (100% reliable, no API)
// --------------------------------------------------------------
const knowledge = {
  skills: "My core skills: SIEM (Splunk), Packet Analysis, Log Correlation, Linux/Unix, incident response, threat hunting, and Python/Bash scripting.",
  certifications: "I hold Cyber Security 101 and Pre‑Security certifications from TryHackMe, both verified. I'm also in the top 4% globally on TryHackMe.",
  location: "I'm based in Mumbai, India.",
  education: "I have a Bachelor of Computer Applications (BCA) degree.",
  email: "You can email me at alifaizan20@outlook.com.",
  github: "My GitHub is github.com/Mohd-Ali2 — check out my security labs and tools.",
  linkedin: "Connect with me on LinkedIn: linkedin.com/in/mohdali02.",
  tryhackme: "I'm in the top 4% on TryHackMe with 109+ completed labs and rooms.",
  experience: "I'm currently on the SOC Level 1 Analyst path. Previously completed Cyber Security 101 and Pre-Security tracks.",
  role: "I'm a Cybersecurity Engineer specializing in Blue Team / SOC defense and threat hunting.",
  background: "I'm a BCA graduate with a passion for defensive security, SIEM analytics, and continuous learning.",
  contact: "You can reach me via email at alifaizan20@outlook.com or connect on LinkedIn/GitHub.",
  projects: "I've worked on SIEM lab setups, log analysis scripts, and threat detection playbooks.",
  languages: "I use Python, Bash, and SQL for automation and log parsing.",
  future: "I aim to become a senior SOC analyst and eventually a Security Architect.",
  achievement: "Top 4% TryHackMe global ranking, 109+ labs completed, two industry certifications."
};

function getAIResponse(question) {
  const q = question.toLowerCase();
  if (q.match(/^(hi|hello|hey|greetings)/)) return "Hello! I'm Mohammad's AI assistant. Ask me about his skills, certifications, background, or contact info.";
  if (q.includes("thank")) return "You're very welcome! Feel free to ask anything else.";
  if (q.includes("who are you")) return "I'm an AI assistant representing Mohammad Ali, a Cybersecurity Engineer. How can I help?";
  
  if (q.includes("skill") || q.includes("technology") || q.includes("tool")) return knowledge.skills;
  if (q.includes("certif") || q.includes("credential")) return knowledge.certifications;
  if (q.includes("location") || q.includes("mumbai")) return knowledge.location;
  if (q.includes("education") || q.includes("bca") || q.includes("degree")) return knowledge.education;
  if (q.includes("email") || q.includes("contact")) return knowledge.email;
  if (q.includes("github")) return knowledge.github;
  if (q.includes("linkedin")) return knowledge.linkedin;
  if (q.includes("tryhackme") || q.includes("rank") || q.includes("labs")) return knowledge.tryhackme;
  if (q.includes("experience") || q.includes("journey")) return knowledge.experience;
  if (q.includes("role") || q.includes("job")) return knowledge.role;
  if (q.includes("background")) return knowledge.background;
  if (q.includes("project")) return knowledge.projects;
  if (q.includes("language") || q.includes("programming")) return knowledge.languages;
  if (q.includes("future") || q.includes("goal")) return knowledge.future;
  if (q.includes("achievement") || q.includes("accomplishment")) return knowledge.achievement;
  
  return `I'm Mohammad Ali, a cybersecurity engineer based in Mumbai. I specialize in SIEM, threat hunting, and Blue Team defense. Ask me about my skills, certifications, or background — I'll give you a specific answer!`;
}

// Vue 3 Application
const { createApp, ref, nextTick } = Vue;
const app = createApp({
  setup() {
    const chatActive = ref(false);
    const messages = ref([{ role: "ai", content: "👋 I'm Mohammad's AI. Ask me anything about his work, skills, certifications, or background — I understand natural language!" }]);
    const userInput = ref("");
    const loading = ref(false);
    const chatContainer = ref(null);
    
    const scrollChat = () => nextTick(() => { if (chatContainer.value) chatContainer.value.scrollTop = chatContainer.value.scrollHeight; });
    
    const sendMessage = () => {
      const text = userInput.value.trim();
      if (!text) return;
      messages.value.push({ role: "user", content: text });
      userInput.value = "";
      scrollChat();
      loading.value = true;
      setTimeout(() => {
        const reply = getAIResponse(text);
        messages.value.push({ role: "ai", content: reply });
        loading.value = false;
        scrollChat();
      }, 300);
    };
    
    const resetChat = () => {
      messages.value = [{ role: "ai", content: "👋 I'm Mohammad's AI. Ask me anything about his work, skills, certifications, or background — I understand natural language!" }];
    };
    
    return { chatActive, messages, userInput, loading, chatContainer, sendMessage, resetChat };
  }
}).mount('#app');

// Refresh ScrollTrigger after all assets load
window.addEventListener('load', () => ScrollTrigger.refresh());
