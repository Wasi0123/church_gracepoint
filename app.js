/* ===== GRACEPOINT CHURCH MANAGEMENT SYSTEM ===== */

// ===== CFA FRANC FORMATTER =====
function cfa(amount) {
  return new Intl.NumberFormat('fr-FR',{style:'currency',currency:'XAF',minimumFractionDigits:0,maximumFractionDigits:0}).format(amount).replace('XAF','FCFA').trim();
}

// ===== STATE =====
let currentUser=null, currentPage='dashboard';
let calendarState={year:new Date().getFullYear(),month:new Date().getMonth()};
let bibleState={book:null,chapter:1,searchQuery:''};

// ===== DEMO DATA =====
const DEMO_USERS={
  member:{id:'MBR-2024-001',name:'Sarah Johnson',email:'sarah@church.com',role:'member',initials:'SJ',phone:'+237 699 234 567',department:'Louange',joinDate:'Janvier 2022',address:'Rue de la Paix, Douala, Cameroun'},
  admin:{id:'ADM-2024-001',name:'Pasteur David Osei',email:'pastor@church.com',role:'admin',initials:'DO',phone:'+237 677 100 200',department:'Leadership',joinDate:'Mars 2018',address:'Avenue de la Liberté, Yaoundé, Cameroun'}
};
const MEMBERS=[
  {id:'MBR-001',name:'Sarah Johnson',email:'sarah@church.com',dept:'Louange',joined:'Jan 2022',status:'active',role:'member',initials:'SJ'},
  {id:'MBR-002',name:'Emmanuel Kwame',email:'emma@church.com',dept:'Jeunesse',joined:'Mar 2023',status:'active',role:'member',initials:'EK'},
  {id:'MBR-003',name:'Grace Mensah',email:'grace@church.com',dept:'Accueil',joined:'Jul 2021',status:'active',role:'member',initials:'GM'},
  {id:'MBR-004',name:'James Boateng',email:'james@church.com',dept:'Médias',joined:'Sep 2022',status:'pending',role:'member',initials:'JB'},
  {id:'MBR-005',name:'Abena Asamoah',email:'abena@church.com',dept:'Prière',joined:'Feb 2020',status:'active',role:'admin',initials:'AA'},
  {id:'MBR-006',name:'Michael Owusu',email:'michael@church.com',dept:'École du Dimanche',joined:'Nov 2023',status:'inactive',role:'member',initials:'MO'},
];
const EVENTS=[
  {id:1,title:'Culte du Dimanche',date:'Mar 23',day:23,month:'Mar',time:'9:00',location:'Sanctuaire Principal',emoji:'🙏',registered:true,desc:'Rejoignez-nous pour notre culte dominical hebdomadaire avec louange, prière et la Parole.',calYear:2025,calMonth:2,calDay:23},
  {id:2,title:'Veillée Jeunesse',date:'Mar 28',day:28,month:'Mar',time:'20:00',location:'Salle Jeunesse',emoji:'🌙',registered:false,desc:'Une nuit de prière et de louange pour les jeunes.',calYear:2025,calMonth:2,calDay:28},
  {id:3,title:'Célébration de Pâques',date:'Avr 5',day:5,month:'Avr',time:'10:00',location:'Sanctuaire Principal',emoji:'✝️',registered:false,desc:'Service spécial de Pâques avec chorale et sketches.',calYear:2025,calMonth:3,calDay:5},
  {id:4,title:'Mission Communautaire',date:'Avr 12',day:12,month:'Avr',time:'8:00',location:'Parc Municipal',emoji:'❤️',registered:false,desc:'Distribution de nourriture et évangélisation.',calYear:2025,calMonth:3,calDay:12},
  {id:5,title:'Sommet Leadership',date:'Avr 19',day:19,month:'Avr',time:'9:00',location:'Salle de Conférence',emoji:'📖',registered:true,desc:'Formation annuelle pour les responsables.',calYear:2025,calMonth:3,calDay:19},
  {id:6,title:'Semaine de Jeûne',date:'Mai 1',day:1,month:'Mai',time:'6:00',location:'Salle de Prière',emoji:'🕊️',registered:false,desc:'Semaine de jeûne collectif avec prières quotidiennes.',calYear:2025,calMonth:4,calDay:1},
];
const SERMONS=[
  {id:1,title:'Marcher dans la Destinée de Dieu',speaker:'Pasteur David Osei',date:'16 Mar 2025',duration:'48 min',topic:'Destinée',type:'video',emoji:'🎬'},
  {id:2,title:'La Puissance de la Foi',speaker:'Évang. Marie Asante',date:'9 Mar 2025',duration:'52 min',topic:'Foi',type:'audio',emoji:'🎵'},
  {id:3,title:'Grâce et Rédemption',speaker:'Pasteur David Osei',date:'2 Mar 2025',duration:'45 min',topic:'Grâce',type:'video',emoji:'🎬'},
  {id:4,title:'Prier Sans Cesse',speaker:'Ancien Jean Frimpong',date:'23 Fév 2025',duration:'38 min',topic:'Prière',type:'audio',emoji:'🎵'},
  {id:5,title:"Les Fruits de l'Esprit",speaker:'Diacre Ruth Aidoo',date:'16 Fév 2025',duration:'41 min',topic:'Saint-Esprit',type:'video',emoji:'🎬'},
];
const ANNOUNCEMENTS=[
  {id:1,title:'Horaires de Pâques Modifiés',body:'Veuillez noter que notre culte du dimanche de Pâques commencera à 8h00 au lieu de 9h00. Les portes ouvrent à 7h30. Venez tôt car nous attendons une grande assemblée.',date:'15 Mar',urgent:true,dept:'Tous'},
  {id:2,title:'Auditions pour la Chorale',body:'Le ministère de la musique invite tous les membres à auditionner pour la chorale. Les auditions se tiennent chaque mardi de 17h à 19h dans la Salle de Musique.',date:'12 Mar',urgent:false,dept:'Louange'},
  {id:3,title:"Bénévoles pour l'École du Dimanche",body:"Nous cherchons des bénévoles dévoués pour soutenir notre ministère des enfants le dimanche. Contactez Sœur Abena.",date:'10 Mar',urgent:false,dept:"École du Dimanche"},
  {id:4,title:'Réunion Budgétaire Annuelle',body:'Tous les membres sont invités à la réunion budgétaire le 2 avril à 16h dans le hall principal.',date:'8 Mar',urgent:false,dept:'Tous'},
];
const PROJECTS=[
  {id:1,title:'Rénovation du Sanctuaire',desc:'Expansion du sanctuaire principal pour accueillir notre congrégation croissante.',emoji:'🏛️',target:90000000,raised:58200000,updates:8},
  {id:2,title:'Fonds de Bourses Scolaires',desc:'Attribution de bourses à 50 enfants de membres qui ne peuvent pas payer les frais scolaires.',emoji:'📚',target:18000000,raised:13500000,updates:5},
  {id:3,title:'Projet Forage Communautaire',desc:'Fournir de l\'eau potable à trois villages près de notre communauté.',emoji:'💧',target:27000000,raised:18600000,updates:12},
];
const SCHEDULE=[
  {time:'8:00',name:'Louange et Adoration',preacher:"Équipe de Louange",tag:'Dimanche'},
  {time:'8:45',name:'Annonces',preacher:"Secrétaire d'Église",tag:'Dimanche'},
  {time:'9:00',name:'Message Principal',preacher:'Pasteur David Osei',tag:'Dimanche'},
  {time:'10:30',name:"Appel à l'Autel & Prière",preacher:'Ancien Jean Frimpong',tag:'Dimanche'},
  {time:'11:00',name:'Offrandes et Dîmes',preacher:'Diacre Michel Boateng',tag:'Dimanche'},
  {time:'11:30',name:'Prières de Clôture',preacher:'Pasteur David Osei',tag:'Dimanche'},
];
const PRAYER_REQUESTS=[
  {from:'Emmanuel K.',time:'Il y a 2 heures',body:'Priez pour mon entretien d\'embauche jeudi. Je crois que Dieu ouvrira cette porte.',tag:'Carrière'},
  {from:'Grace M.',time:'Il y a 5 heures',body:'Demande de prière pour ma mère qui se remet d\'une opération. Confiance en Dieu pour la guérison.',tag:'Santé'},
  {from:'Anonyme',time:'Il y a 1 jour',body:'Prière pour la réconciliation de ma famille. Séparés depuis deux ans.',tag:'Famille'},
];
const BIBLE_VERSES=[
  {verse:"Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.",ref:'Jérémie 29:11'},
  {verse:'Je puis tout par celui qui me fortifie.',ref:'Philippiens 4:13'},
  {verse:"L'Éternel est mon berger: je ne manquerai de rien.",ref:'Psaumes 23:1'},
  {verse:"Confie-toi en l'Éternel de tout ton cœur, Et ne t'appuie pas sur ta sagesse; Reconnais-le dans toutes tes voies, Et il aplanira tes sentiers.",ref:'Proverbes 3:5-6'},
  {verse:"Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",ref:'Jean 3:16'},
  {verse:"Mais ceux qui se confient en l'Éternel renouvellent leurs forces. Ils prennent le vol comme les aigles.",ref:'Ésaïe 40:31'},
];

// ===== NAV =====
const MEMBER_NAV=[
  {section:'Principal'},{id:'dashboard',label:'Tableau de Bord',icon:'⊞'},{id:'profile',label:'Mon Profil',icon:'👤'},
  {section:'Église'},{id:'calendar',label:'Calendrier',icon:'📆'},{id:'events',label:'Événements',icon:'📅'},
  {id:'sermons',label:'Bibliothèque',icon:'🎵'},{id:'schedule',label:'Programme',icon:'🕐'},{id:'announcements',label:'Annonces',icon:'📢',badge:2},
  {section:'Personnel'},{id:'attendance',label:'Mon Assiduité',icon:'✅'},{id:'giving',label:'Offrandes / Dîmes',icon:'💛'},
  {id:'projects',label:"Projets d'Église",icon:'🏗️'},{id:'prayer',label:'Requêtes de Prière',icon:'🙏'},
  {id:'messages',label:'Messages Admin',icon:'✉️'},{id:'bible',label:'La Bible',icon:'📖'},
];
const ADMIN_NAV=[
  {section:"Vue d'ensemble"},{id:'dashboard',label:'Tableau de Bord',icon:'⊞'},{id:'profile',label:'Mon Profil',icon:'👤'},
  {section:'Gestion'},{id:'calendar',label:'Calendrier',icon:'📆'},{id:'members',label:'Gestion Membres',icon:'👥'},
  {id:'events',label:'Événements',icon:'📅'},{id:'sermons',label:'Bibliothèque',icon:'🎵'},
  {id:'schedule',label:'Programme',icon:'🕐'},{id:'announcements',label:'Annonces',icon:'📢'},
  {section:'Finance & Admin'},{id:'attendance',label:'Assiduité',icon:'✅'},{id:'giving',label:'Finance & Offrandes',icon:'💛'},
  {id:'projects',label:'Projets',icon:'🏗️'},{id:'partners',label:'Partenaires',icon:'🤝'},
  {id:'prayer',label:'Requêtes de Prière',icon:'🙏'},{id:'messages',label:'Communications',icon:'✉️'},
  {section:'Système'},{id:'reports',label:'Rapports & Analyses',icon:'📊'},{id:'security',label:'Rôles & Sécurité',icon:'🛡️'},
  {id:'bible',label:'La Bible',icon:'📖'},
];

// ===== AUTH =====
function switchAuthTab(t){
  document.querySelectorAll('.auth-tab').forEach((b,i)=>b.classList.toggle('active',(t==='login'&&i===0)||(t==='register'&&i===1)));
  document.getElementById('loginForm').classList.toggle('hidden',t!=='login');
  document.getElementById('registerForm').classList.toggle('hidden',t!=='register');
}
function handleLogin(e){e.preventDefault();loginAs(document.getElementById('loginEmail').value.includes('admin')||document.getElementById('loginEmail').value.includes('pastor')?'admin':'member');}
function handleRegister(e){e.preventDefault();loginAs('member');showToast('Compte créé! Bienvenue 🙏','success');}
function demoLogin(r){loginAs(r);}
function loginAs(r){
  currentUser={...DEMO_USERS[r]};
  document.getElementById('authOverlay').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  initApp();showPage('dashboard');
}
function handleLogout(){
  currentUser=null;
  document.getElementById('app').classList.add('hidden');
  document.getElementById('authOverlay').classList.remove('hidden');
}

function initApp(){
  ['sidebarAvatar','topAvatar'].forEach(id=>document.getElementById(id).textContent=currentUser.initials);
  document.getElementById('sidebarName').textContent=currentUser.name;
  const rb=document.getElementById('sidebarRole');
  rb.textContent=currentUser.role==='admin'?'Administrateur':'Membre';
  rb.className='role-badge '+(currentUser.role==='admin'?'admin':'');
  buildNav();
}
function buildNav(){
  const nav=document.getElementById('sidebarNav');
  const items=currentUser.role==='admin'?ADMIN_NAV:MEMBER_NAV;
  nav.innerHTML=items.map(item=>{
    if(item.section) return `<div class="nav-section-label">${item.section}</div>`;
    const badge=item.badge?`<span class="nav-badge">${item.badge}</span>`:'';
    return `<button class="nav-item" id="nav-${item.id}" onclick="showPage('${item.id}')"><span class="nav-icon">${item.icon}</span>${item.label}${badge}</button>`;
  }).join('');
}

function showPage(pageId){
  currentPage=pageId;
  document.querySelectorAll('.nav-item').forEach(el=>el.classList.remove('active'));
  const an=document.getElementById('nav-'+pageId);if(an)an.classList.add('active');
  const pages={
    dashboard:currentUser.role==='admin'?renderAdminDashboard:renderMemberDashboard,
    profile:renderProfile,events:renderEvents,sermons:renderSermons,schedule:renderSchedule,
    announcements:renderAnnouncements,attendance:renderAttendance,giving:renderGiving,
    projects:renderProjects,prayer:renderPrayer,messages:renderMessages,bible:renderBible,
    members:renderMembers,partners:renderPartners,reports:renderReports,security:renderSecurity,calendar:renderCalendar,
  };
  const titleMap={dashboard:'Tableau de Bord',profile:'Mon Profil',events:'Événements',sermons:'Bibliothèque de Sermons',
    schedule:'Programme du Culte',announcements:'Annonces',attendance:'Assiduité',giving:'Offrandes & Dîmes',
    projects:"Projets d'Église",prayer:'Requêtes de Prière',messages:'Messages',bible:'La Bible',
    members:'Gestion des Membres',partners:'Partenaires',reports:'Rapports & Analyses',security:'Rôles & Sécurité',calendar:'Calendrier'};
  document.getElementById('pageTitle').textContent=titleMap[pageId]||pageId;
  const fn=pages[pageId];
  if(fn)document.getElementById('pageContainer').innerHTML=`<div class="page-in">${fn()}</div>`;
  animateBars();
  if(window.innerWidth<900)closeSidebar();
}
function toggleSidebar(){document.getElementById('sidebar').classList.toggle('open');}
function closeSidebar(){document.getElementById('sidebar').classList.remove('open');}

// ===== CALENDAR =====
const MFR=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const DFR=['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];

function renderCalendar(){
  return `<div class="page-header-row">
    <div class="page-header" style="margin-bottom:0"><h2>Calendrier de l'Église</h2><p>Événements et programmes à venir</p></div>
    ${currentUser.role==='admin'?`<button class="btn-primary" onclick="openCreateEvent()">+ Ajouter Événement</button>`:''}
  </div>
  <div style="margin-top:20px" id="calendarRoot">${buildCalHTML()}</div>`;
}
function buildCalHTML(){
  const {year,month}=calendarState;
  const firstDay=new Date(year,month,1).getDay();
  const daysInMonth=new Date(year,month+1,0).getDate();
  const today=new Date();
  const monthEvents=EVENTS.filter(e=>e.calYear===year&&e.calMonth===month);
  let cells='';
  for(let i=0;i<firstDay;i++) cells+=`<div class="cal-cell empty"></div>`;
  for(let d=1;d<=daysInMonth;d++){
    const isToday=today.getFullYear()===year&&today.getMonth()===month&&today.getDate()===d;
    const de=monthEvents.filter(e=>e.calDay===d);
    cells+=`<div class="cal-cell ${isToday?'today':''}" onclick="calDayClick(${d})">
      <div class="cal-day-num ${isToday?'today-num':''}">${d}</div>
      ${de.map(e=>`<div class="cal-event-dot" title="${e.title}">${e.emoji} <span>${e.title}</span></div>`).join('')}
    </div>`;
  }
  return `<div class="card" style="margin-bottom:20px">
    <div class="cal-header">
      <button class="cal-nav-btn" onclick="calNav(-1)">‹</button>
      <div class="cal-title">${MFR[month]} ${year}</div>
      <button class="cal-nav-btn" onclick="calNav(1)">›</button>
      <button class="btn-outline btn-sm" onclick="calGoToday()">Aujourd'hui</button>
    </div>
    <div class="cal-grid">${DFR.map(d=>`<div class="cal-head">${d}</div>`).join('')}${cells}</div>
  </div>
  <div class="card"><div class="card-header"><div class="card-title">Événements de ${MFR[month]}</div></div>
    ${monthEvents.length===0?`<div style="text-align:center;padding:30px;color:var(--text-muted)">Aucun événement ce mois-ci</div>`:
    monthEvents.map(e=>`<div class="schedule-item" style="cursor:pointer;margin-bottom:8px" onclick="viewEvent(${e.id})">
      <div style="width:42px;height:42px;border-radius:10px;background:linear-gradient(135deg,var(--gold),var(--gold-light));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">${e.emoji}</div>
      <div class="schedule-info"><div class="schedule-name">${e.title}</div><div class="schedule-preacher">${e.date} • ${e.time} • ${e.location}</div></div>
      ${e.registered?`<span class="badge badge-active">✓ Inscrit</span>`:`<button class="btn-primary btn-sm" onclick="event.stopPropagation();registerEvent(${e.id})">S'inscrire</button>`}
    </div>`).join('')}
  </div>`;
}
function calNav(dir){
  calendarState.month+=dir;
  if(calendarState.month>11){calendarState.month=0;calendarState.year++;}
  if(calendarState.month<0){calendarState.month=11;calendarState.year--;}
  const root=document.getElementById('calendarRoot');if(root)root.innerHTML=buildCalHTML();
}
function calGoToday(){
  const now=new Date();calendarState.year=now.getFullYear();calendarState.month=now.getMonth();
  const root=document.getElementById('calendarRoot');if(root)root.innerHTML=buildCalHTML();
}
function calDayClick(day){
  const {year,month}=calendarState;
  const de=EVENTS.filter(e=>e.calYear===year&&e.calMonth===month&&e.calDay===day);
  if(de.length===0){if(currentUser.role==='admin')showToast(`Créer un événement le ${day} ${MFR[month]}`);return;}
  if(de.length===1){viewEvent(de[0].id);return;}
  openModal(`Événements du ${day} ${MFR[month]}`,de.map(e=>`<div class="schedule-item" style="cursor:pointer;margin-bottom:8px" onclick="closeModal();viewEvent(${e.id})">
    <div style="width:36px;height:36px;border-radius:8px;background:var(--gold-pale);display:flex;align-items:center;justify-content:center;font-size:16px">${e.emoji}</div>
    <div><div style="font-weight:500">${e.title}</div><div style="font-size:12px;color:var(--text-muted)">${e.time} • ${e.location}</div></div>
  </div>`).join(''));
}

// ===== BIBLE =====
function renderBible(){
  if(bibleState.book) return renderBibleChapter();
  return renderBibleHome();
}
function renderBibleHome(){
  const verse=BIBLE_VERSES[Math.floor(Math.random()*BIBLE_VERSES.length)];
  const allOT=BIBLE_BOOKS.OT.map(b=>`<button onclick="selectBibleBook('${b.id}','${b.name}',${b.chapters})" class="book-btn"><div>${b.name}</div><div style="font-size:10px;color:var(--text-light)">${b.chapters} ch.</div></button>`).join('');
  const allNT=BIBLE_BOOKS.NT.map(b=>`<button onclick="selectBibleBook('${b.id}','${b.name}',${b.chapters})" class="book-btn"><div>${b.name}</div><div style="font-size:10px;color:var(--text-light)">${b.chapters} ch.</div></button>`).join('');
  return `<div class="page-header"><h2>La Bible — KJV</h2><p>Ancien et Nouveau Testament — 66 livres</p></div>
  <div class="bible-verse-card" style="margin-bottom:24px">
    <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:var(--gold);margin-bottom:12px">Verset du Jour</div>
    <div class="bible-verse" id="dailyVerse">"${verse.verse}"</div>
    <div class="bible-ref" id="dailyRef">— ${verse.ref}</div>
    <button onclick="refreshVerse()" style="margin-top:16px;padding:8px 16px;border:1px solid rgba(201,168,76,0.3);background:transparent;border-radius:8px;color:var(--gold);cursor:pointer;font-size:12px">Verset Suivant →</button>
  </div>
  <div class="card" style="margin-bottom:20px">
    <div class="card-header"><div class="card-title">Rechercher un Passage</div></div>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <div class="search-bar" style="flex:1;min-width:200px"><span class="search-icon">🔍</span><input type="text" id="bsearch" placeholder="Rechercher verset, livre..." style="width:100%"></div>
      <button class="btn-primary" onclick="doBibleSearch()">Rechercher</button>
    </div>
    <div id="bibleSearchResults"></div>
  </div>
  <div style="margin-bottom:20px">
    <div class="card-title" style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;margin-bottom:16px">⭐ Chapitres Populaires</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px">
      ${FEATURED_CHAPTERS.map(fc=>`<div class="schedule-item" style="cursor:pointer;flex-direction:column;align-items:flex-start;gap:4px" onclick="openBibleChapter('${fc.key}')"><div style="font-size:15px;font-weight:600">${fc.label}</div><div style="font-size:12px;color:var(--text-muted)">${fc.desc}</div></div>`).join('')}
    </div>
  </div>
  <div class="grid-2">
    <div class="card">
      <div class="card-header"><div class="card-title">📜 Ancien Testament</div><span style="font-size:12px;color:var(--text-muted)">39 livres</span></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;max-height:350px;overflow-y:auto">${allOT}</div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">✝️ Nouveau Testament</div><span style="font-size:12px;color:var(--text-muted)">27 livres</span></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;max-height:350px;overflow-y:auto">${allNT}</div>
    </div>
  </div>`;
}
function refreshVerse(){
  const v=BIBLE_VERSES[Math.floor(Math.random()*BIBLE_VERSES.length)];
  const el=document.getElementById('dailyVerse'),ref=document.getElementById('dailyRef');
  if(el)el.textContent=`"${v.verse}"`;if(ref)ref.textContent=`— ${v.ref}`;
}
function selectBibleBook(id,name,chapters){
  openModal(`${name} — Choisir un Chapitre`,`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(52px,1fr));gap:8px;padding:8px 0;max-height:400px;overflow-y:auto">
    ${Array.from({length:chapters},(_,i)=>i+1).map(c=>`<button class="chap-btn" onclick="closeModal();openBibleChapter('${id}-${c}')">${c}</button>`).join('')}
  </div>`);
}
function openBibleChapter(key){
  bibleState.book=key;
  const container=document.getElementById('pageContainer');
  if(container)container.innerHTML=`<div class="page-in">${renderBibleChapter()}</div>`;
}
function renderBibleChapter(){
  const key=bibleState.book;
  const data=BIBLE_TEXT[key];
  const [bookId,chapNum]=key.split('-');
  const allBooks=[...BIBLE_BOOKS.OT,...BIBLE_BOOKS.NT];
  const book=allBooks.find(b=>b.id===bookId);
  const chap=parseInt(chapNum);
  const navRow=`<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;flex-wrap:wrap">
    <button onclick="bibleState.book=null;showPage('bible')" class="btn-outline btn-sm">← Retour</button>
    ${chap>1?`<button class="btn-outline btn-sm" onclick="openBibleChapter('${bookId}-${chap-1}')">‹ Ch. ${chap-1}</button>`:''}
    ${book&&chap<book.chapters?`<button class="btn-outline btn-sm" onclick="openBibleChapter('${bookId}-${chap+1}')">Ch. ${chap+1} ›</button>`:''}
    ${book?`<button class="btn-outline btn-sm" onclick="selectBibleBook('${bookId}','${book.name}',${book.chapters})">Choisir Chapitre</button>`:''}
    <button class="btn-outline btn-sm" onclick="bibleState.book=null;showPage('bible')">📚 Tous les Livres</button>
  </div>`;
  if(data){
    return `${navRow}
    <div style="margin-bottom:16px"><div style="font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700">${data.title}</div><div style="font-size:14px;color:var(--text-muted);font-style:italic">${data.subtitle}</div></div>
    <div class="card"><div style="max-height:600px;overflow-y:auto;padding-right:8px">
      ${data.verses.map((v,i)=>`<div class="verse-row" onclick="highlightVerse(this)" onmouseover="if(!this.classList.contains('highlighted'))this.style.background='rgba(201,168,76,0.04)'" onmouseout="if(!this.classList.contains('highlighted'))this.style.background=''">
        <span class="verse-num">${i+1}</span><span class="verse-text">${v}</span>
      </div>`).join('')}
    </div></div>`;
  }
  if(book){
    return `${navRow}
    <div style="margin-bottom:16px"><div style="font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700">${book.name} — Chapitre ${chap}</div></div>
    <div class="bible-verse-card" style="margin-bottom:20px">
      <div style="font-size:14px;color:var(--gold-light);margin-bottom:8px">📖 ${book.name} ${chap}</div>
      <div style="font-size:14px;color:var(--cream-2);line-height:1.7">Sélectionnez un chapitre en vedette pour afficher le texte intégral, ou utilisez la Recherche pour trouver des versets spécifiques. Les chapitres en or indiquent du contenu disponible.</div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(52px,1fr));gap:8px">
      ${Array.from({length:book.chapters},(_,i)=>i+1).map(c=>{
        const has=!!BIBLE_TEXT[`${bookId}-${c}`];
        return `<button class="chap-btn ${has?'has-text':''}" onclick="openBibleChapter('${bookId}-${c}')">${c}</button>`;
      }).join('')}
    </div>`;
  }
  return navRow;
}
function highlightVerse(el){
  document.querySelectorAll('.verse-row.highlighted').forEach(v=>{v.classList.remove('highlighted');v.style.cssText='';});
  el.classList.add('highlighted');el.style.background='rgba(201,168,76,0.1)';el.style.borderRadius='8px';
}
function doBibleSearch(){
  const q=document.getElementById('bsearch')?.value?.toLowerCase().trim();
  const container=document.getElementById('bibleSearchResults');
  if(!q||!container)return;
  const results=[];
  Object.entries(BIBLE_TEXT).forEach(([key,chap])=>{
    chap.verses.forEach((verse,idx)=>{if(verse.toLowerCase().includes(q))results.push({key,title:chap.title,verse,idx:idx+1});});
  });
  const allBooks=[...BIBLE_BOOKS.OT,...BIBLE_BOOKS.NT];
  const bookMatches=allBooks.filter(b=>b.name.toLowerCase().includes(q));
  if(!results.length&&!bookMatches.length){container.innerHTML=`<div style="padding:16px;color:var(--text-muted);font-size:13px">Aucun résultat pour "${q}"</div>`;return;}
  container.innerHTML=`<div style="padding-top:16px">
    ${bookMatches.length?`<div style="font-size:12px;color:var(--text-light);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.08em">Livres</div><div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">${bookMatches.map(b=>`<button class="btn-outline btn-sm" onclick="selectBibleBook('${b.id}','${b.name}',${b.chapters})">${b.name}</button>`).join('')}</div>`:''}
    ${results.length?`<div style="font-size:12px;color:var(--text-light);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.08em">${results.length} Verset(s)</div>
      ${results.slice(0,10).map(r=>`<div style="padding:12px;margin-bottom:8px;border-radius:var(--radius);background:var(--cream);border:1px solid var(--cream-2);cursor:pointer" onclick="openBibleChapter('${r.key}')">
        <div style="font-size:12px;color:var(--gold);font-weight:600;margin-bottom:4px">${r.title} v.${r.idx}</div>
        <div style="font-size:13px;line-height:1.5">${r.verse.replace(new RegExp(q,'gi'),m=>`<mark style="background:rgba(201,168,76,0.3);padding:0 2px;border-radius:2px">${m}</mark>`)}</div>
      </div>`).join('')}
      ${results.length>10?`<div style="font-size:12px;color:var(--text-muted);text-align:center;padding:8px">... et ${results.length-10} autres résultats</div>`:''}`:''}
  </div>`;
}

// ===== DASHBOARDS =====
function renderMemberDashboard(){
  const verse=BIBLE_VERSES[Math.floor(Math.random()*BIBLE_VERSES.length)];
  return `<div class="page-header"><h2>Bonjour, ${currentUser.name.split(' ')[0]} 👋</h2><p>Bienvenue sur le Portail GracePoint</p></div>
  <div class="stats-grid stagger">
    <div class="stat-card gold"><div class="stat-icon gold">🙏</div><div class="stat-value">24</div><div class="stat-label">Cultes Assistés</div><div class="stat-change">↑ 4 ce mois</div></div>
    <div class="stat-card green"><div class="stat-icon green">📅</div><div class="stat-value">3</div><div class="stat-label">Événements à Venir</div></div>
    <div class="stat-card blue"><div class="stat-icon blue">🎵</div><div class="stat-value">12</div><div class="stat-label">Sermons Écoutés</div></div>
    <div class="stat-card orange"><div class="stat-icon orange">💛</div><div class="stat-value">${cfa(720000)}</div><div class="stat-label">Total Donné (2025)</div></div>
  </div>
  <div class="bible-verse-card" style="margin-bottom:24px"><div class="bible-verse">"${verse.verse}"</div><div class="bible-ref">— ${verse.ref}</div></div>
  <div class="grid-2" style="gap:20px">
    <div class="card"><div class="card-header"><div class="card-title">Prochains Événements</div><button class="btn-outline btn-sm" onclick="showPage('events')">Voir Tout</button></div>
      ${EVENTS.slice(0,3).map(e=>`<div class="schedule-item" style="margin-bottom:8px"><div class="sermon-thumb" style="width:42px;height:42px;font-size:18px">${e.emoji}</div><div class="schedule-info"><div class="schedule-name">${e.title}</div><div class="schedule-preacher">${e.date} • ${e.time}</div></div></div>`).join('')}
    </div>
    <div class="card"><div class="card-header"><div class="card-title">Dernières Annonces</div><button class="btn-outline btn-sm" onclick="showPage('announcements')">Voir Tout</button></div>
      ${ANNOUNCEMENTS.slice(0,3).map(a=>`<div style="padding:10px 0;border-bottom:1px solid var(--cream-2)">
        ${a.urgent?'<span class="badge" style="background:rgba(224,82,82,0.12);color:var(--danger);margin-bottom:4px;display:inline-flex">Urgent</span><br>':''}
        <span style="font-size:13px;font-weight:500">${a.title}</span>
        <div style="font-size:12px;color:var(--text-muted);margin-top:2px">${a.body.substring(0,80)}...</div>
      </div>`).join('')}
    </div>
  </div>
  <div class="card" style="margin-top:20px"><div class="card-header"><div class="card-title">Sermons Récents</div><button class="btn-outline btn-sm" onclick="showPage('sermons')">Voir Tout</button></div>
    <div class="sermon-list">${SERMONS.slice(0,3).map(s=>`<div class="sermon-item"><div class="sermon-thumb">${s.emoji}</div><div class="sermon-info"><div class="sermon-title">${s.title}</div><div class="sermon-meta">${s.speaker} • ${s.date}</div></div><button class="btn-outline btn-sm">▶ Lire</button></div>`).join('')}</div>
  </div>`;
}
function renderAdminDashboard(){
  return `<div class="page-header"><h2>Tableau de Bord Admin</h2><p>Vue d'ensemble de l'église</p></div>
  <div class="stats-grid stagger">
    <div class="stat-card gold"><div class="stat-icon gold">👥</div><div class="stat-value">842</div><div class="stat-label">Membres Totaux</div><div class="stat-change">↑ 23 nouveaux</div></div>
    <div class="stat-card green"><div class="stat-icon green">✅</div><div class="stat-value">78%</div><div class="stat-label">Taux d'Assiduité</div><div class="stat-change">↑ 5%</div></div>
    <div class="stat-card blue"><div class="stat-icon blue">💰</div><div class="stat-value" style="font-size:22px">${cfa(28920000)}</div><div class="stat-label">Offrandes du Mois</div></div>
    <div class="stat-card orange"><div class="stat-icon orange">📅</div><div class="stat-value">6</div><div class="stat-label">Événements ce Mois</div></div>
  </div>
  <div class="grid-2" style="gap:20px;margin-bottom:20px">
    <div class="card"><div class="card-header"><div class="card-title">Assiduité ce Mois</div></div>
      <div class="chart-bars">${[65,72,88,58,70,85,78,90,65,75,80,92].map(h=>`<div class="chart-bar" style="height:${h}%" data-value="${Math.round(h*8)} membres"></div>`).join('')}</div>
      <div class="chart-labels">${['S1','S2','S3','S4','S5','S6','S7','S8','S9','S10','S11','S12'].map(l=>`<span>${l}</span>`).join('')}</div>
    </div>
    <div class="card"><div class="card-header"><div class="card-title">Revenus Mensuels</div></div>
      <div class="chart-bars">${[40,55,70,48,62,78,65,82,58,72,88,76].map(h=>`<div class="chart-bar secondary" style="height:${h}%" data-value="${cfa(h*300000)}"></div>`).join('')}</div>
      <div class="chart-labels">${['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'].map(l=>`<span>${l}</span>`).join('')}</div>
    </div>
  </div>
  <div class="grid-2" style="gap:20px">
    <div class="card"><div class="card-header"><div class="card-title">Membres Récents</div><button class="btn-outline btn-sm" onclick="showPage('members')">Voir Tout</button></div>
      <div class="table-container"><table><thead><tr><th>Nom</th><th>Départ.</th><th>Statut</th></tr></thead><tbody>
        ${MEMBERS.slice(0,4).map(m=>`<tr><td><div class="td-avatar"><div class="td-avatar-circle">${m.initials}</div><div><div style="font-weight:500">${m.name}</div><div style="font-size:11px;color:var(--text-light)">${m.id}</div></div></div></td><td>${m.dept}</td><td><span class="badge badge-${m.status}">${m.status==='active'?'Actif':m.status==='pending'?'En attente':'Inactif'}</span></td></tr>`).join('')}
      </tbody></table></div>
    </div>
    <div class="card"><div class="card-header"><div class="card-title">Requêtes de Prière</div><button class="btn-outline btn-sm" onclick="showPage('prayer')">Gérer</button></div>
      ${PRAYER_REQUESTS.map(p=>`<div class="prayer-item"><div class="prayer-header"><span class="prayer-from">${p.from}</span><span class="prayer-time">${p.time}</span></div><div class="prayer-body">${p.body.substring(0,90)}...</div><span class="prayer-tag">🙏 ${p.tag}</span></div>`).join('')}
    </div>
  </div>`;
}

function renderMembers(){
  return `<div class="page-header-row">
    <div class="page-header" style="margin-bottom:0"><h2>Gestion des Membres</h2><p>${MEMBERS.length} membres</p></div>
    <div class="toolbar"><div class="search-bar"><span class="search-icon">🔍</span><input type="text" placeholder="Rechercher..." oninput="filterMembers(this.value)"></div>
    <button class="btn-primary" onclick="openAddMember()">+ Ajouter</button></div>
  </div>
  <div class="card" style="margin-top:20px"><div class="table-container"><table id="membersTable">
    <thead><tr><th>Membre</th><th>Département</th><th>Inscription</th><th>Rôle</th><th>Statut</th><th>Actions</th></tr></thead>
    <tbody>${MEMBERS.map(m=>`<tr>
      <td><div class="td-avatar"><div class="td-avatar-circle">${m.initials}</div><div><div style="font-weight:500">${m.name}</div><div style="font-size:11px;color:var(--text-light)">${m.id}</div></div></div></td>
      <td>${m.dept}</td><td style="color:var(--text-muted);font-size:13px">${m.joined}</td>
      <td><span class="badge badge-${m.role}">${m.role==='admin'?'Admin':'Membre'}</span></td>
      <td><span class="badge badge-${m.status}">${m.status==='active'?'Actif':m.status==='pending'?'En attente':'Inactif'}</span></td>
      <td><div style="display:flex;gap:6px"><button class="btn-outline btn-sm" onclick="showToast('Édition...')">Modifier</button><button class="btn-outline btn-sm btn-danger" onclick="showToast('Supprimé','error')">Suppr.</button></div></td>
    </tr>`).join('')}</tbody>
  </table></div></div>`;
}
function filterMembers(q){document.querySelectorAll('#membersTable tbody tr').forEach(r=>r.style.display=r.textContent.toLowerCase().includes(q.toLowerCase())?'':'none');}
function openAddMember(){
  openModal('Ajouter un Membre',`<div class="auth-form">
    <div class="form-row-two"><div class="form-group"><label>Prénom</label><input type="text"></div><div class="form-group"><label>Nom</label><input type="text"></div></div>
    <div class="form-group"><label>Email</label><input type="email"></div><div class="form-group"><label>Téléphone</label><input type="tel" placeholder="+237 6XX XXX XXX"></div>
    <div class="form-group"><label>Département</label><select><option>Louange</option><option>Jeunesse</option><option>École du Dimanche</option><option>Accueil</option><option>Médias</option><option>Prière</option></select></div>
    <button class="btn-primary full" onclick="closeModal();showToast('Membre ajouté! 🎉','success')">Ajouter</button>
  </div>`);
}

function renderEvents(){
  return `<div class="page-header-row">
    <div class="page-header" style="margin-bottom:0"><h2>Événements</h2><p>Programmes à venir</p></div>
    ${currentUser.role==='admin'?`<button class="btn-primary" onclick="openCreateEvent()">+ Créer</button>`:''}
  </div>
  <div class="events-grid stagger" style="margin-top:20px">
    ${EVENTS.map(e=>`<div class="event-card" onclick="viewEvent(${e.id})">
      <div class="event-banner" style="background:linear-gradient(135deg,#f5e9c8,#e8d4a0)"><div class="event-banner-bg">${e.emoji}</div>
        <div class="event-date-chip"><div class="date-day">${e.day}</div><div class="date-month">${e.month}</div></div>
      </div>
      <div class="event-body"><div class="event-title">${e.title}</div><div class="event-meta"><span>🕐 ${e.time}</span><span>📍 ${e.location}</span></div>
        ${e.registered?`<span class="badge badge-active">✓ Inscrit</span>`:`<button class="btn-primary btn-sm" onclick="event.stopPropagation();registerEvent(${e.id})">S'inscrire</button>`}
      </div>
    </div>`).join('')}
  </div>`;
}
function viewEvent(id){
  const e=EVENTS.find(ev=>ev.id===id);if(!e)return;
  openModal(e.title,`<div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;padding:20px;background:var(--cream);border-radius:var(--radius)">
    <span style="font-size:48px">${e.emoji}</span>
    <div><div style="font-size:13px;color:var(--text-muted)">Date & Heure</div><div style="font-size:16px;font-weight:600">${e.date} à ${e.time}</div><div style="font-size:13px;color:var(--text-muted);margin-top:4px">📍 ${e.location}</div></div>
  </div>
  <p style="font-size:14px;color:var(--text-muted);line-height:1.7;margin-bottom:20px">${e.desc}</p>
  ${!e.registered?`<button class="btn-primary full" onclick="registerEvent(${e.id});closeModal()">S'inscrire</button>`:`<div style="text-align:center;padding:14px;background:rgba(76,175,114,0.08);border-radius:var(--radius);color:var(--success);font-weight:500">✓ Vous êtes inscrit</div>`}`);
}
function registerEvent(id){const e=EVENTS.find(ev=>ev.id===id);if(e){e.registered=true;showToast(`Inscrit à "${e.title}"! 🎉`,'success');showPage('events');}}
function openCreateEvent(){
  openModal('Créer un Événement',`<div class="auth-form">
    <div class="form-group"><label>Titre</label><input type="text"></div>
    <div class="form-row-two"><div class="form-group"><label>Date</label><input type="date"></div><div class="form-group"><label>Heure</label><input type="time"></div></div>
    <div class="form-group"><label>Lieu</label><input type="text"></div>
    <div class="form-group"><label>Description</label><textarea rows="3"></textarea></div>
    <button class="btn-primary full" onclick="closeModal();showToast('Événement créé! 📅','success')">Créer</button>
  </div>`);
}

function renderSermons(){
  return `<div class="page-header-row">
    <div class="page-header" style="margin-bottom:0"><h2>Bibliothèque de Sermons</h2></div>
    <div class="toolbar"><div class="search-bar"><span class="search-icon">🔍</span><input type="text" placeholder="Sujet, orateur..."></div>
    ${currentUser.role==='admin'?`<button class="btn-primary" onclick="openModal('Télécharger','<div class=auth-form><div class=form-group><label>Titre</label><input type=text></div><div class=form-group><label>Orateur</label><input type=text></div><button class=btn-primary onclick=closeModal()>Télécharger</button></div>')">+ Télécharger</button>`:''}
    </div>
  </div>
  <div class="sermon-list stagger" style="margin-top:20px">
    ${SERMONS.map(s=>`<div class="sermon-item"><div class="sermon-thumb">${s.emoji}</div>
      <div class="sermon-info"><div class="sermon-title">${s.title}</div><div class="sermon-meta">${s.speaker} • ${s.date} • ${s.duration}</div></div>
      <div class="sermon-actions"><button class="btn-outline btn-sm" onclick="showToast('Lecture...')">▶ Lire</button><button class="btn-outline btn-sm" onclick="showToast('Téléchargement...')">📄 Notes</button>
      ${currentUser.role==='admin'?`<button class="btn-outline btn-sm btn-danger" onclick="showToast('Supprimé','error')">🗑</button>`:''}
      </div>
    </div>`).join('')}
  </div>`;
}

function renderSchedule(){
  return `<div class="page-header-row">
    <div class="page-header" style="margin-bottom:0"><h2>Programme du Culte</h2></div>
    ${currentUser.role==='admin'?`<button class="btn-primary" onclick="showToast('Éditeur ouvert')">Modifier</button>`:''}
  </div>
  <div class="card" style="margin-top:20px">
    <div style="display:flex;align-items:center;gap:16px;padding-bottom:20px;border-bottom:1px solid var(--cream-2);margin-bottom:20px">
      <div style="width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,var(--gold),var(--gold-light));display:flex;align-items:center;justify-content:center;font-size:24px">📖</div>
      <div><div style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600">Culte du Dimanche Matin</div><div style="font-size:13px;color:var(--text-muted)">23 Mars 2025 • Sanctuaire Principal • 8:00</div></div>
    </div>
    <div class="schedule-list">${SCHEDULE.map(s=>`<div class="schedule-item"><div class="schedule-time">${s.time}</div><div class="schedule-info"><div class="schedule-name">${s.name}</div><div class="schedule-preacher">${s.preacher}</div></div><span class="badge badge-active">${s.tag}</span></div>`).join('')}</div>
  </div>`;
}

function renderAnnouncements(){
  return `<div class="page-header-row">
    <div class="page-header" style="margin-bottom:0"><h2>Annonces</h2></div>
    ${currentUser.role==='admin'?`<button class="btn-primary" onclick="openPostAnnouncement()">+ Publier</button>`:''}
  </div>
  <div class="announcement-list stagger" style="margin-top:20px">
    ${ANNOUNCEMENTS.map(a=>`<div class="announcement-item ${a.urgent?'urgent':''}">
      <div class="ann-header">
        <div>${a.urgent?`<span class="badge" style="background:rgba(224,82,82,0.12);color:var(--danger);margin-bottom:6px;display:inline-flex">🚨 Urgent</span><br>`:''}
        <div class="ann-title">${a.title}</div></div>
        <div style="text-align:right"><div class="ann-date">${a.date}</div><span class="badge badge-member" style="margin-top:4px">${a.dept}</span></div>
      </div>
      <div class="ann-body">${a.body}</div>
      ${currentUser.role==='admin'?`<div style="display:flex;gap:8px;margin-top:12px"><button class="btn-outline btn-sm" onclick="showToast('Édition...')">Modifier</button><button class="btn-outline btn-sm btn-danger" onclick="showToast('Supprimée','error')">Supprimer</button></div>`:''}
    </div>`).join('')}
  </div>`;
}
function openPostAnnouncement(){
  openModal('Publier une Annonce',`<div class="auth-form">
    <div class="form-group"><label>Titre</label><input type="text"></div>
    <div class="form-group"><label>Message</label><textarea rows="4"></textarea></div>
    <div class="form-row-two">
      <div class="form-group"><label>Département</label><select><option>Tous</option><option>Louange</option><option>Jeunesse</option></select></div>
      <div class="form-group"><label>Priorité</label><select><option>Normale</option><option>Urgente</option></select></div>
    </div>
    <button class="btn-primary full" onclick="closeModal();showToast('Publiée! 📢','success')">Publier</button>
  </div>`);
}

function renderAttendance(){
  const weeks=Array.from({length:48},()=>Math.random()>0.25);
  return `<div class="page-header"><h2>${currentUser.role==='admin'?"Gestion de l'Assiduité":"Mon Assiduité"}</h2></div>
  ${currentUser.role==='admin'?`<div class="stats-grid" style="margin-bottom:20px">
    <div class="stat-card gold"><div class="stat-icon gold">📊</div><div class="stat-value">78%</div><div class="stat-label">Assiduité Moyenne</div></div>
    <div class="stat-card green"><div class="stat-icon green">👥</div><div class="stat-value">656</div><div class="stat-label">Présents Dimanche Dernier</div></div>
    <div class="stat-card blue"><div class="stat-icon blue">📈</div><div class="stat-value">+42</div><div class="stat-label">Visiteurs ce Mois</div></div>
    <div class="stat-card orange"><div class="stat-icon orange">⬇️</div><div class="stat-value">186</div><div class="stat-label">Absents Dimanche Dernier</div></div>
  </div>`:''}
  <div class="grid-2">
    <div class="card"><div class="card-header"><div class="card-title">Carte de Présence (2025)</div><span style="font-size:12px;color:var(--text-muted)">${weeks.filter(Boolean).length}/48 cultes</span></div>
      <div style="display:flex;gap:4px;flex-wrap:wrap">
        ${DFR.map(d=>`<div style="width:calc(14.28% - 4px);font-size:10px;text-align:center;color:var(--text-light);padding:2px 0">${d}</div>`).join('')}
        ${weeks.map(p=>`<div style="width:calc(14.28% - 4px);aspect-ratio:1;border-radius:3px;background:${p?'var(--gold)':'var(--cream-2)'};opacity:${p?1:0.6}"></div>`).join('')}
      </div>
    </div>
    <div class="card"><div class="card-header"><div class="card-title">Résumé</div>${currentUser.role==='admin'?`<button class="btn-primary btn-sm" onclick="showToast('Export...')">Exporter</button>`:''}</div>
      ${[{l:'Cultes cette Année',v:'48',p:null},{l:'Présent(e)',v:`${weeks.filter(Boolean).length}`,p:Math.round(weeks.filter(Boolean).length/48*100)},{l:"Absent(e)",v:`${weeks.filter(v=>!v).length}`,p:null},{l:'Série Actuelle',v:'4 semaines',p:null}].map(s=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--cream-2)"><span style="font-size:13px;color:var(--text-muted)">${s.l}</span><div><span style="font-size:15px;font-weight:600">${s.v}</span>${s.p!==null?`<span style="font-size:11px;color:var(--success);margin-left:6px">${s.p}%</span>`:''}</div></div>`).join('')}
    </div>
  </div>`;
}

function renderGiving(){
  const amounts=[30000,50000,100000,200000,500000,'Autre'];
  return `<div class="page-header"><h2>${currentUser.role==='admin'?'Finance & Offrandes':'Offrandes & Dîmes'}</h2></div>
  ${currentUser.role==='admin'?`<div class="stats-grid" style="margin-bottom:20px">
    <div class="stat-card gold"><div class="stat-icon gold">💰</div><div class="stat-value" style="font-size:20px">${cfa(28920000)}</div><div class="stat-label">Total ce Mois</div></div>
    <div class="stat-card green"><div class="stat-icon green">🙏</div><div class="stat-value" style="font-size:20px">${cfa(13260000)}</div><div class="stat-label">Dîmes</div></div>
    <div class="stat-card blue"><div class="stat-icon blue">💛</div><div class="stat-value" style="font-size:20px">${cfa(11040000)}</div><div class="stat-label">Offrandes</div></div>
    <div class="stat-card orange"><div class="stat-icon orange">📊</div><div class="stat-value" style="font-size:20px">${cfa(4620000)}</div><div class="stat-label">Dons Spéciaux</div></div>
  </div>`:''}
  <div class="grid-2">
    <div class="card"><div class="card-header"><div class="card-title">Faire un Don</div></div>
      <div class="giving-options" id="amountOptions">
        ${amounts.map((a,i)=>`<div class="amount-chip ${i===1?'selected':''}" onclick="selectAmount('${a}',this)">${typeof a==='number'?cfa(a):a}${a==='Autre'?`<p>Saisir montant</p>`:''}</div>`).join('')}
      </div>
      <div class="form-group" id="customAmountField" style="display:none;margin-bottom:16px"><label>Montant (FCFA)</label><input type="number" placeholder="Ex: 75000"></div>
      <div class="form-group" style="margin-bottom:16px"><label>Type</label>
        <select><option>Dîme</option><option>Offrande</option><option>Prémices</option><option>Fonds de Construction</option><option>Missions</option><option>Don pour Projet</option></select>
      </div>
      <div class="form-group" style="margin-bottom:20px"><label>Paiement</label>
        <select><option>Mobile Money (MTN)</option><option>Mobile Money (Orange)</option><option>Virement Bancaire</option><option>Espèces</option></select>
      </div>
      <button class="btn-primary full" onclick="showToast('Paiement traité! Merci 🙏','success')">Donner Maintenant</button>
    </div>
    <div class="card"><div class="card-header"><div class="card-title">Historique</div><button class="btn-outline btn-sm" onclick="showToast('Téléchargement...')">📄 Relevé</button></div>
      <div class="table-container"><table><thead><tr><th>Date</th><th>Type</th><th>Montant</th></tr></thead><tbody>
        ${[{d:'16 Mar',t:'Dîme',a:72000},{d:'9 Mar',t:'Offrande',a:30000},{d:'2 Mar',t:'Fonds Construction',a:120000},{d:'23 Fév',t:'Dîme',a:72000},{d:'16 Fév',t:'Offrande',a:30000}]
          .map(r=>`<tr><td style="font-size:13px">${r.d}</td><td><span class="badge badge-member">${r.t}</span></td><td style="font-weight:600;color:var(--success)">${cfa(r.a)}</td></tr>`).join('')}
      </tbody></table></div>
    </div>
  </div>`;
}
function selectAmount(val,el){document.querySelectorAll('.amount-chip').forEach(c=>c.classList.remove('selected'));el.classList.add('selected');document.getElementById('customAmountField').style.display=val==='Autre'?'flex':'none';}

function renderProjects(){
  return `<div class="page-header-row">
    <div class="page-header" style="margin-bottom:0"><h2>Projets de l'Église</h2></div>
    ${currentUser.role==='admin'?`<button class="btn-primary" onclick="showToast('Créateur ouvert')">+ Nouveau</button>`:''}
  </div>
  <div class="grid-3 stagger" style="margin-top:20px">
    ${PROJECTS.map(p=>{const pct=Math.round(p.raised/p.target*100);return `<div class="project-card">
      <div class="project-img">${p.emoji}</div>
      <div class="project-title">${p.title}</div>
      <div class="project-desc">${p.desc}</div>
      <div class="project-progress">
        <div class="project-progress-label"><span>${cfa(p.raised)}</span><span>${pct}%</span></div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        <div style="font-size:11px;color:var(--text-light);margin-top:4px">Objectif: ${cfa(p.target)}</div>
      </div>
      <div style="display:flex;gap:8px"><button class="btn-primary btn-sm" onclick="showToast('Paiement...','success')" style="flex:1">Contribuer</button><button class="btn-outline btn-sm" onclick="showToast('Chargement...')">Mises à jour (${p.updates})</button></div>
    </div>`;}).join('')}
  </div>`;
}

function renderPartners(){
  const partners=[{name:'Fondation Grâce',type:'Sponsor',a:3000000,f:'mois',joined:'Jan 2024',i:'FG'},{name:'Emmanuel Corp',type:'Partenaire',a:1500000,f:'mois',joined:'Mar 2023',i:'EC'},{name:'Livingstone Trust',type:'Donateur',a:6000000,f:'unique',joined:'Déc 2023',i:'LT'}];
  return `<div class="page-header-row"><div class="page-header" style="margin-bottom:0"><h2>Partenaires & Sponsors</h2></div><button class="btn-primary" onclick="showToast('Ajout...')">+ Ajouter</button></div>
  <div class="card" style="margin-top:20px"><div class="table-container"><table><thead><tr><th>Partenaire</th><th>Type</th><th>Contribution</th><th>Depuis</th><th>Actions</th></tr></thead><tbody>
    ${partners.map(p=>`<tr><td><div class="td-avatar"><div class="td-avatar-circle" style="background:var(--info)">${p.i}</div><span>${p.name}</span></div></td><td><span class="badge badge-admin">${p.type}</span></td><td style="font-weight:600;color:var(--success)">${cfa(p.a)}/${p.f}</td><td style="color:var(--text-muted);font-size:13px">${p.joined}</td><td><button class="btn-outline btn-sm" onclick="showToast('Historique...')">Voir</button></td></tr>`).join('')}
  </tbody></table></div></div>`;
}

function renderPrayer(){
  return `<div class="page-header-row">
    <div class="page-header" style="margin-bottom:0"><h2>Requêtes de Prière</h2></div>
    <button class="btn-primary" onclick="openPrayerForm()">+ Soumettre</button>
  </div>
  <div style="margin-top:20px">
    ${PRAYER_REQUESTS.map(p=>`<div class="prayer-item">
      <div class="prayer-header"><div style="display:flex;align-items:center;gap:8px"><div class="td-avatar-circle" style="width:28px;height:28px;font-size:11px">${p.from.split(' ').map(n=>n[0]).join('')}</div><span class="prayer-from">${p.from}</span></div><span class="prayer-time">${p.time}</span></div>
      <div class="prayer-body">${p.body}</div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px"><span class="prayer-tag">🙏 ${p.tag}</span>
        ${currentUser.role==='admin'?`<button class="btn-outline btn-sm" onclick="showToast('Réponse...')">Répondre</button>`:`<button class="btn-outline btn-sm" onclick="showToast('Je prie 🙏')">Je Prie</button>`}
      </div>
    </div>`).join('')}
  </div>`;
}
function openPrayerForm(){
  openModal('Soumettre une Requête',`<div class="auth-form">
    <div class="form-group"><label>Catégorie</label><select><option>Santé & Guérison</option><option>Famille</option><option>Carrière</option><option>Finances</option><option>Croissance Spirituelle</option><option>Autre</option></select></div>
    <div class="form-group"><label>Votre Requête</label><textarea rows="5" placeholder="Partagez votre requête..."></textarea></div>
    <div class="form-group"><label class="checkbox-label"><input type="checkbox"> Anonyme</label></div>
    <button class="btn-primary full" onclick="closeModal();showToast('Soumise! 🙏','success')">Soumettre</button>
  </div>`);
}

function renderMessages(){
  const msgs=[{t:"Bonjour! J'ai une question sur le culte de Pâques.",s:true,time:'10:32'},{t:'Bonjour! Le culte de Pâques commence à 8h00. Arrivez à 7h30.',s:false,time:'10:45'},{t:'Merci Pasteur. Y aura-t-il un programme pour les enfants?',s:true,time:'11:02'},{t:"Oui! L'École du Dimanche se tiendra en parallèle dans la Salle des Enfants.",s:false,time:'11:15'}];
  return `<div class="page-header"><h2>Centre de Messages</h2></div>
  <div class="card"><div class="msg-thread" id="msgThread">
    ${msgs.map(m=>`<div><div class="msg-bubble ${m.s?'sent':'received'}">${m.t}</div><div class="msg-time" style="text-align:${m.s?'right':'left'}">${m.time}</div></div>`).join('')}
  </div>
  <div class="msg-input-row"><input type="text" id="msgInput" placeholder="Tapez votre message..." onkeydown="if(event.key==='Enter')sendMessage()"><button class="btn-primary" onclick="sendMessage()">Envoyer</button></div>
  </div>`;
}
function sendMessage(){
  const input=document.getElementById('msgInput');if(!input||!input.value.trim())return;
  const thread=document.getElementById('msgThread');const now=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
  const div=document.createElement('div');div.innerHTML=`<div class="msg-bubble sent">${input.value}</div><div class="msg-time" style="text-align:right">${now}</div>`;
  thread.appendChild(div);input.value='';thread.scrollTop=thread.scrollHeight;
  setTimeout(()=>{const reply=document.createElement('div');reply.innerHTML=`<div class="msg-bubble received">Merci pour votre message. L'administration vous répondra sous peu.</div><div class="msg-time">${now}</div>`;thread.appendChild(reply);thread.scrollTop=thread.scrollHeight;},1200);
}

function renderProfile(){
  const u=currentUser;
  return `<div class="profile-hero">
    <div class="profile-avatar">${u.initials}</div>
    <div class="profile-details"><h2>${u.name}</h2><p>${u.department} • ${u.role==='admin'?'Administrateur':'Membre'}</p><div class="profile-id">🆔 ${u.id}</div></div>
    <button class="btn-outline btn-sm" style="margin-left:auto" onclick="openEditProfile()">Modifier</button>
  </div>
  <div class="grid-2">
    <div class="card"><div class="card-header"><div class="card-title">Informations Personnelles</div></div>
      ${[{l:'Nom Complet',v:u.name},{l:'Email',v:u.email},{l:'Téléphone',v:u.phone},{l:'Adresse',v:u.address},{l:'Département',v:u.department},{l:'Membre Depuis',v:u.joinDate}].map(i=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--cream-2)"><span style="font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-light)">${i.l}</span><span style="font-size:14px;font-weight:500">${i.v}</span></div>`).join('')}
    </div>
    <div class="card"><div class="card-header"><div class="card-title">Statistiques</div></div>
      ${[{l:'Cultes Assistés',v:'24',i:'✅'},{l:'Total Donné',v:cfa(720000),i:'💛'},{l:'Événements Inscrits',v:'3',i:'📅'},{l:'Sermons Écoutés',v:'12',i:'🎵'},{l:'Requêtes Prière',v:'2',i:'🙏'}].map(s=>`<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--cream-2)"><span style="font-size:20px">${s.i}</span><div><div style="font-size:14px;font-weight:600">${s.v}</div><div style="font-size:12px;color:var(--text-muted)">${s.l}</div></div></div>`).join('')}
    </div>
  </div>`;
}
function openEditProfile(){
  openModal('Modifier le Profil',`<div class="auth-form">
    <div class="form-row-two"><div class="form-group"><label>Prénom</label><input type="text" value="${currentUser.name.split(' ')[0]}"></div><div class="form-group"><label>Nom</label><input type="text" value="${currentUser.name.split(' ')[1]||''}"></div></div>
    <div class="form-group"><label>Email</label><input type="email" value="${currentUser.email}"></div>
    <div class="form-group"><label>Téléphone</label><input type="tel" value="${currentUser.phone}"></div>
    <div class="form-group"><label>Adresse</label><input type="text" value="${currentUser.address}"></div>
    <button class="btn-primary full" onclick="closeModal();showToast('Profil mis à jour! ✓','success')">Sauvegarder</button>
  </div>`);
}

function renderReports(){
  return `<div class="page-header"><h2>Rapports & Analyses</h2></div>
  <div class="stats-grid" style="margin-bottom:24px">
    <div class="stat-card gold"><div class="stat-icon gold">📈</div><div class="stat-value">+23%</div><div class="stat-label">Croissance Membres</div></div>
    <div class="stat-card green"><div class="stat-icon green">💰</div><div class="stat-value" style="font-size:18px">${cfa(325200000)}</div><div class="stat-label">Revenus Totaux (2025)</div></div>
    <div class="stat-card blue"><div class="stat-icon blue">🎯</div><div class="stat-value">94%</div><div class="stat-label">Objectifs Atteints</div></div>
    <div class="stat-card orange"><div class="stat-icon orange">🌍</div><div class="stat-value">12</div><div class="stat-label">Missions Soutenues</div></div>
  </div>
  <div class="grid-2">
    <div class="card"><div class="card-header"><div class="card-title">Croissance des Membres</div></div>
      <div class="chart-bars">${[55,58,60,64,68,70,71,74,78,80,83,86].map(h=>`<div class="chart-bar" style="height:${h}%" data-value="${Math.round(h*10)} membres"></div>`).join('')}</div>
      <div class="chart-labels">${['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'].map(l=>`<span>${l}</span>`).join('')}</div>
    </div>
    <div class="card"><div class="card-header"><div class="card-title">Par Département</div></div>
      ${[{d:'Louange',c:124,p:75},{d:'Jeunesse',c:210,p:92},{d:"École du Dimanche",c:98,p:60},{d:'Prière',c:86,p:80},{d:'Médias',c:45,p:55},{d:'Accueil',c:72,p:68}].map(d=>`<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:13px;font-weight:500">${d.d}</span><span style="font-size:12px;color:var(--text-muted)">${d.c}</span></div><div class="progress-bar"><div class="progress-fill" style="width:${d.p}%"></div></div></div>`).join('')}
    </div>
  </div>
  <div style="display:flex;gap:12px;margin-top:20px;flex-wrap:wrap">
    <button class="btn-primary" onclick="showToast('Export PDF...','success')">📄 PDF</button>
    <button class="btn-outline" onclick="showToast('Export Excel...','success')">📊 Excel</button>
    <button class="btn-outline" onclick="showToast('Email envoyé...','success')">✉️ Email</button>
  </div>`;
}

function renderSecurity(){
  return `<div class="page-header"><h2>Rôles & Sécurité</h2></div>
  <div class="grid-2">
    <div class="card"><div class="card-header"><div class="card-title">Permissions par Rôle</div></div>
      ${[{r:'Super Admin',p:['Accès Total','Gérer Admins','Paramètres Système']},{r:'Admin / Pasteur',p:['Gérer Membres','Publier Annonces','Voir Rapports']},{r:'Chef de Département',p:['Gérer Département','Annonces Dept.']},{r:'Membre',p:['Voir Contenu','Inscrire Événements','Soumettre Requêtes']}].map(r=>`<div style="margin-bottom:16px;padding:14px;border-radius:var(--radius);background:var(--cream);border:1px solid var(--cream-2)"><div style="font-size:14px;font-weight:600;margin-bottom:8px">${r.r}</div>${r.p.map(p=>`<span class="badge badge-active" style="margin-right:6px;margin-bottom:4px">✓ ${p}</span>`).join('')}</div>`).join('')}
    </div>
    <div class="card"><div class="card-header"><div class="card-title">Activité Récente</div></div>
      ${[{a:'Réinitialisation mot de passe',u:'Emma Kwame',t:'Il y a 2 min',c:'warning'},{a:'Nouvel admin ajouté',u:'Pasteur David',t:'Il y a 1h',c:'info'},{a:'Compte créé',u:'Jean Doe',t:'Il y a 3h',c:'success'},{a:'Connexion échouée',u:'Inconnu',t:'Il y a 5h',c:'danger'}].map(a=>`<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--cream-2)"><div style="width:8px;height:8px;border-radius:50%;background:var(--${a.c});flex-shrink:0"></div><div style="flex:1"><div style="font-size:13px;font-weight:500">${a.a}</div><div style="font-size:11px;color:var(--text-muted)">${a.u}</div></div><span style="font-size:11px;color:var(--text-light)">${a.t}</span></div>`).join('')}
      <button class="btn-primary btn-sm" style="width:100%;margin-top:16px" onclick="showToast('Téléchargement...')">Télécharger Journal</button>
    </div>
  </div>`;
}

function openModal(title,content){document.getElementById('modalTitle').textContent=title;document.getElementById('modalBody').innerHTML=content;document.getElementById('modal').classList.remove('hidden');}
function closeModal(){document.getElementById('modal').classList.add('hidden');}
document.getElementById('modal').addEventListener('click',function(e){if(e.target===this)closeModal();});
function showToast(msg,type=''){const t=document.getElementById('toast');t.textContent=msg;t.className='toast '+type;t.classList.remove('hidden');clearTimeout(window._toastTimer);window._toastTimer=setTimeout(()=>t.classList.add('hidden'),3000);}
function animateBars(){setTimeout(()=>{document.querySelectorAll('.progress-fill').forEach(bar=>{const w=bar.style.width;bar.style.width='0';setTimeout(()=>{bar.style.width=w;},50);});},100);}
