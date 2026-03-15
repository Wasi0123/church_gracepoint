/* ===== GRACEPOINT CHURCH MANAGEMENT SYSTEM ===== */

// ===== CFA FRANC =====
function cfa(amount) {
  return new Intl.NumberFormat('fr-FR',{style:'currency',currency:'XAF',minimumFractionDigits:0,maximumFractionDigits:0}).format(amount).replace('XAF','FCFA').trim();
}

// ===== STATE =====
let currentUser=null, currentPage='dashboard';
let calendarState={year:new Date().getFullYear(),month:new Date().getMonth()};
let bibleState={book:null,chapter:1};

// ===== DATA =====
const DEMO_USERS={
  member:{id:'MBR-2024-001',name:'Sarah Johnson',email:'sarah@church.com',role:'member',initials:'SJ',phone:'+237 699 234 567',department:{en:'Worship Team',fr:'Louange'},joinDate:{en:'January 2022',fr:'Janvier 2022'},address:'Rue de la Paix, Douala'},
  admin:{id:'ADM-2024-001',name:'Pasteur David Osei',email:'pastor@church.com',role:'admin',initials:'DO',phone:'+237 677 100 200',department:{en:'Leadership',fr:'Leadership'},joinDate:{en:'March 2018',fr:'Mars 2018'},address:'Avenue de la Liberté, Yaoundé'}
};
const MEMBERS=[
  {id:'MBR-001',name:'Sarah Johnson',email:'sarah@church.com',dept:{en:'Worship',fr:'Louange'},joined:'Jan 2022',status:'active',role:'member',initials:'SJ'},
  {id:'MBR-002',name:'Emmanuel Kwame',email:'emma@church.com',dept:{en:'Youth Ministry',fr:'Jeunesse'},joined:'Mar 2023',status:'active',role:'member',initials:'EK'},
  {id:'MBR-003',name:'Grace Mensah',email:'grace@church.com',dept:{en:'Ushering',fr:'Accueil'},joined:'Jul 2021',status:'active',role:'member',initials:'GM'},
  {id:'MBR-004',name:'James Boateng',email:'james@church.com',dept:{en:'Media',fr:'Médias'},joined:'Sep 2022',status:'pending',role:'member',initials:'JB'},
  {id:'MBR-005',name:'Abena Asamoah',email:'abena@church.com',dept:{en:'Prayer Team',fr:'Prière'},joined:'Feb 2020',status:'active',role:'admin',initials:'AA'},
  {id:'MBR-006',name:'Michael Owusu',email:'michael@church.com',dept:{en:"Children's Church",fr:'École du Dimanche'},joined:'Nov 2023',status:'inactive',role:'member',initials:'MO'},
];
const EVENTS=[
  {id:1,title:{en:'Sunday Worship Service',fr:'Culte du Dimanche'},date:'Mar 23',day:23,month:'Mar',time:'9:00',location:{en:'Main Sanctuary',fr:'Sanctuaire Principal'},emoji:'🙏',registered:true,desc:{en:'Join us for our weekly Sunday worship service.',fr:'Rejoignez-nous pour notre culte dominical hebdomadaire.'},calYear:2025,calMonth:2,calDay:23},
  {id:2,title:{en:'Youth Night Vigil',fr:'Veillée Jeunesse'},date:'Mar 28',day:28,month:'Mar',time:'20:00',location:{en:'Youth Hall',fr:'Salle Jeunesse'},emoji:'🌙',registered:false,desc:{en:'An all-night prayer and worship session for youth.',fr:'Une nuit de prière et de louange pour les jeunes.'},calYear:2025,calMonth:2,calDay:28},
  {id:3,title:{en:'Easter Celebration',fr:'Célébration de Pâques'},date:'Apr 5',day:5,month:'Apr',time:'10:00',location:{en:'Main Sanctuary',fr:'Sanctuaire Principal'},emoji:'✝️',registered:false,desc:{en:'Special Easter service with full choir and drama.',fr:'Service spécial de Pâques avec chorale et sketches.'},calYear:2025,calMonth:3,calDay:5},
  {id:4,title:{en:'Community Outreach',fr:'Mission Communautaire'},date:'Apr 12',day:12,month:'Apr',time:'8:00',location:{en:'City Park',fr:'Parc Municipal'},emoji:'❤️',registered:false,desc:{en:'Community feeding and evangelism outreach.',fr:'Distribution de nourriture et évangélisation.'},calYear:2025,calMonth:3,calDay:12},
  {id:5,title:{en:'Leadership Summit',fr:'Sommet Leadership'},date:'Apr 19',day:19,month:'Apr',time:'9:00',location:{en:'Conference Room',fr:'Salle de Conférence'},emoji:'📖',registered:true,desc:{en:'Annual leadership training for department heads.',fr:'Formation annuelle pour les responsables de départements.'},calYear:2025,calMonth:3,calDay:19},
  {id:6,title:{en:'Prayer and Fasting Week',fr:'Semaine de Jeûne'},date:'May 1',day:1,month:'May',time:'6:00',location:{en:'Prayer Room',fr:'Salle de Prière'},emoji:'🕊️',registered:false,desc:{en:'A week-long corporate fast with daily prayer sessions.',fr:'Semaine de jeûne collectif avec prières quotidiennes.'},calYear:2025,calMonth:4,calDay:1},
];
const SERMONS=[
  {id:1,title:{en:"Walking in God's Purpose",fr:'Marcher dans la Destinée de Dieu'},speaker:'Pasteur David Osei',date:{en:'Mar 16, 2025',fr:'16 Mar 2025'},duration:'48 min',type:'video',emoji:'🎬'},
  {id:2,title:{en:'The Power of Faith',fr:'La Puissance de la Foi'},speaker:'Évang. Marie Asante',date:{en:'Mar 9, 2025',fr:'9 Mar 2025'},duration:'52 min',type:'audio',emoji:'🎵'},
  {id:3,title:{en:'Grace and Redemption',fr:'Grâce et Rédemption'},speaker:'Pasteur David Osei',date:{en:'Mar 2, 2025',fr:'2 Mar 2025'},duration:'45 min',type:'video',emoji:'🎬'},
  {id:4,title:{en:'Praying Without Ceasing',fr:'Prier Sans Cesse'},speaker:'Ancien Jean Frimpong',date:{en:'Feb 23, 2025',fr:'23 Fév 2025'},duration:'38 min',type:'audio',emoji:'🎵'},
  {id:5,title:{en:"Fruits of the Spirit",fr:"Les Fruits de l'Esprit"},speaker:'Diacre Ruth Aidoo',date:{en:'Feb 16, 2025',fr:'16 Fév 2025'},duration:'41 min',type:'video',emoji:'🎬'},
];
const ANNOUNCEMENTS=[
  {id:1,title:{en:'Easter Service Times Changed',fr:'Horaires de Pâques Modifiés'},body:{en:'Please note that our Easter Sunday service will begin at 8:00 AM instead of 9:00 AM. Doors open at 7:30 AM.',fr:'Veuillez noter que notre culte du dimanche de Pâques commencera à 8h00 au lieu de 9h00.'},date:'15 Mar',urgent:true,dept:{en:'All',fr:'Tous'}},
  {id:2,title:{en:'Choir Auditions Open',fr:'Auditions pour la Chorale'},body:{en:'The music ministry is inviting all members with vocal abilities to audition for the main choir. Auditions every Tuesday from 5–7 PM.',fr:'Le ministère de la musique invite tous les membres à auditionner pour la chorale. Chaque mardi de 17h à 19h.'},date:'12 Mar',urgent:false,dept:{en:'Worship Team',fr:'Louange'}},
  {id:3,title:{en:"Children's Church Volunteers",fr:"Bénévoles pour l'École du Dimanche"},body:{en:'We are looking for dedicated volunteers for our children\'s ministry on Sundays.',fr:'Nous cherchons des bénévoles dévoués pour notre ministère des enfants le dimanche.'},date:'10 Mar',urgent:false,dept:{en:"Children's Church",fr:"École du Dimanche"}},
  {id:4,title:{en:'Annual Budget Meeting',fr:'Réunion Budgétaire Annuelle'},body:{en:'All members are invited to the annual budget review meeting on April 2nd at 4 PM.',fr:'Tous les membres sont invités à la réunion budgétaire le 2 avril à 16h.'},date:'8 Mar',urgent:false,dept:{en:'All',fr:'Tous'}},
];
const PROJECTS=[
  {id:1,title:{en:'Church Building Renovation',fr:'Rénovation du Sanctuaire'},desc:{en:'Expanding the main sanctuary to accommodate our growing congregation.',fr:'Expansion du sanctuaire principal pour accueillir notre congrégation croissante.'},emoji:'🏛️',target:90000000,raised:58200000,updates:8},
  {id:2,title:{en:'School Sponsorship Fund',fr:'Fonds de Bourses Scolaires'},desc:{en:'Providing scholarships for 50 children of church members.',fr:'Attribution de bourses à 50 enfants de membres.'},emoji:'📚',target:18000000,raised:13500000,updates:5},
  {id:3,title:{en:'Community Borehole Project',fr:'Projet Forage Communautaire'},desc:{en:'Providing clean drinking water to three villages near our church.',fr:"Fournir de l'eau potable à trois villages près de notre communauté."},emoji:'💧',target:27000000,raised:18600000,updates:12},
];
const SCHEDULE=[
  {time:'8:00',name:{en:'Praise & Worship',fr:'Louange et Adoration'},preacher:{en:'Worship Team',fr:"Équipe de Louange"}},
  {time:'8:45',name:{en:'Announcements',fr:'Annonces'},preacher:{en:'Church Secretary',fr:"Secrétaire d'Église"}},
  {time:'9:00',name:{en:'Main Sermon',fr:'Message Principal'},preacher:'Pasteur David Osei'},
  {time:'10:30',name:{en:'Altar Call & Prayer',fr:"Appel à l'Autel & Prière"},preacher:'Ancien Jean Frimpong'},
  {time:'11:00',name:{en:'Offering & Tithes',fr:'Offrandes et Dîmes'},preacher:'Diacre Michel Boateng'},
  {time:'11:30',name:{en:'Closing Prayers',fr:'Prières de Clôture'},preacher:'Pasteur David Osei'},
];
const PRAYER_REQUESTS=[
  {from:'Emmanuel K.',time:{en:'2 hours ago',fr:'Il y a 2 heures'},body:{en:"Please pray for my upcoming job interview on Thursday.",fr:"Priez pour mon entretien d'embauche jeudi."},tag:{en:'Career',fr:'Carrière'}},
  {from:'Grace M.',time:{en:'5 hours ago',fr:'Il y a 5 heures'},body:{en:'Requesting prayer for my mother recovering from surgery.',fr:"Demande de prière pour ma mère qui se remet d'une opération."},tag:{en:'Health',fr:'Santé'}},
  {from:{en:'Anonymous',fr:'Anonyme'},time:{en:'1 day ago',fr:'Il y a 1 jour'},body:{en:'Prayer for my family to be reconciled.',fr:'Prière pour la réconciliation de ma famille.'},tag:{en:'Family',fr:'Famille'}},
];
const BIBLE_VERSES={
  en:[
    {verse:"For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",ref:'Jeremiah 29:11'},
    {verse:"I can do all this through him who gives me strength.",ref:'Philippians 4:13'},
    {verse:"The Lord is my shepherd, I lack nothing.",ref:'Psalm 23:1'},
    {verse:"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",ref:'Proverbs 3:5-6'},
    {verse:"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",ref:'John 3:16'},
    {verse:"But those who hope in the Lord will renew their strength. They will soar on wings like eagles.",ref:'Isaiah 40:31'},
  ],
  fr:[
    {verse:"Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur.",ref:'Jérémie 29:11'},
    {verse:'Je puis tout par celui qui me fortifie.',ref:'Philippiens 4:13'},
    {verse:"L'Éternel est mon berger: je ne manquerai de rien.",ref:'Psaumes 23:1'},
    {verse:"Confie-toi en l'Éternel de tout ton cœur, Et ne t'appuie pas sur ta sagesse; Reconnais-le dans toutes tes voies, Et il aplanira tes sentiers.",ref:'Proverbes 3:5-6'},
    {verse:"Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",ref:'Jean 3:16'},
    {verse:"Mais ceux qui se confient en l'Éternel renouvellent leurs forces. Ils prennent le vol comme les aigles.",ref:'Ésaïe 40:31'},
  ]
};

// Helper: bilingual text field
function L(field) {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[currentLang] || field['en'] || '';
}

// ===== NAV =====
function getMemberNav() {
  return [
    {section:t('navMain')},
    {id:'dashboard',label:t('navDashboard'),icon:'⊞'},
    {id:'profile',label:t('navProfile'),icon:'👤'},
    {section:t('navChurch')},
    {id:'calendar',label:t('navCalendar'),icon:'📆'},
    {id:'events',label:t('navEvents'),icon:'📅'},
    {id:'sermons',label:t('navSermons'),icon:'🎵'},
    {id:'schedule',label:t('navSchedule'),icon:'🕐'},
    {id:'announcements',label:t('navAnnouncements'),icon:'📢',badge:2},
    {section:t('navPersonal')},
    {id:'attendance',label:t('navAttendance'),icon:'✅'},
    {id:'giving',label:t('navGiving'),icon:'💛'},
    {id:'projects',label:t('navProjects'),icon:'🏗️'},
    {id:'prayer',label:t('navPrayer'),icon:'🙏'},
    {id:'messages',label:t('navMessages'),icon:'✉️'},
    {id:'bible',label:t('navBible'),icon:'📖'},
  ];
}
function getAdminNav() {
  return [
    {section:t('navOverview')},
    {id:'dashboard',label:t('navDashboard'),icon:'⊞'},
    {id:'profile',label:t('navProfile'),icon:'👤'},
    {section:t('navManagement')},
    {id:'calendar',label:t('navCalendar'),icon:'📆'},
    {id:'members',label:t('navMembers'),icon:'👥'},
    {id:'events',label:t('navEvents'),icon:'📅'},
    {id:'sermons',label:t('navSermons'),icon:'🎵'},
    {id:'schedule',label:t('navSchedule'),icon:'🕐'},
    {id:'announcements',label:t('navAnnouncements'),icon:'📢'},
    {section:t('navFinance')},
    {id:'attendance',label:t('navMgmtAttendance'),icon:'✅'},
    {id:'giving',label:t('navMgmtGiving'),icon:'💛'},
    {id:'projects',label:t('navProjects'),icon:'🏗️'},
    {id:'partners',label:t('navPartners'),icon:'🤝'},
    {id:'prayer',label:t('navPrayer'),icon:'🙏'},
    {id:'messages',label:t('navMgmtMessages'),icon:'✉️'},
    {section:t('navSystem')},
    {id:'reports',label:t('navReports'),icon:'📊'},
    {id:'security',label:t('navSecurity'),icon:'🛡️'},
    {id:'bible',label:t('navBible'),icon:'📖'},
  ];
}

// ===== AUTH =====
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach((b,i)=>b.classList.toggle('active',(tab==='login'&&i===0)||(tab==='register'&&i===1)));
  document.getElementById('loginForm').classList.toggle('hidden',tab!=='login');
  document.getElementById('registerForm').classList.toggle('hidden',tab!=='register');
}
function handleLogin(e){e.preventDefault();loginAs(document.getElementById('loginEmail').value.includes('admin')||document.getElementById('loginEmail').value.includes('pastor')?'admin':'member');}
function handleRegister(e){e.preventDefault();loginAs('member');showToast(currentLang==='fr'?'Compte créé! Bienvenue 🙏':'Account created! Welcome 🙏','success');}
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
  applyTranslationsToStaticDOM();
}

function initApp(){
  ['sidebarAvatar','topAvatar'].forEach(id=>document.getElementById(id).textContent=currentUser.initials);
  document.getElementById('sidebarName').textContent=currentUser.name;
  const rb=document.getElementById('sidebarRole');
  rb.textContent=currentUser.role==='admin'?t('administrator'):t('member');
  rb.className='role-badge '+(currentUser.role==='admin'?'admin':'');
  const sub=document.querySelector('.sidebar-logo p');
  if(sub)sub.textContent=t('portalSubtitle');
  const lo=document.querySelector('.logout-btn');
  if(lo)lo.textContent=t('signOut');
  buildNav();
}
function buildNav(){
  const nav=document.getElementById('sidebarNav');
  const items=currentUser.role==='admin'?getAdminNav():getMemberNav();
  nav.innerHTML=items.map(item=>{
    if(item.section)return `<div class="nav-section-label">${item.section}</div>`;
    const badge=item.badge?`<span class="nav-badge">${item.badge}</span>`:'';
    return `<button class="nav-item${currentPage===item.id?' active':''}" id="nav-${item.id}" onclick="showPage('${item.id}')"><span class="nav-icon">${item.icon}</span>${item.label}${badge}</button>`;
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
  const titleKeys={dashboard:'titleDashboard',profile:'titleProfile',calendar:'titleCalendar',events:'titleEvents',
    sermons:'titleSermons',schedule:'titleSchedule',announcements:'titleAnnouncements',attendance:'titleAttendance',
    giving:'titleGiving',projects:'titleProjects',prayer:'titlePrayer',messages:'titleMessages',bible:'titleBible',
    members:'titleMembers',partners:'titlePartners',reports:'titleReports',security:'titleSecurity'};
  document.getElementById('pageTitle').textContent=t(titleKeys[pageId]||'titleDashboard');
  const fn=pages[pageId];
  if(fn)document.getElementById('pageContainer').innerHTML=`<div class="page-in">${fn()}</div>`;
  animateBars();
  if(window.innerWidth<900)closeSidebar();
}
function toggleSidebar(){document.getElementById('sidebar').classList.toggle('open');}
function closeSidebar(){document.getElementById('sidebar').classList.remove('open');}

// ===== CALENDAR =====
function renderCalendar(){
  return `<div class="page-header-row">
    <div class="page-header" style="margin-bottom:0"><h2>${t('calendarTitle')}</h2><p>${t('calendarSub')}</p></div>
    ${currentUser.role==='admin'?`<button class="btn-primary" onclick="openCreateEvent()">${t('addEvent')}</button>`:''}
  </div>
  <div style="margin-top:20px" id="calendarRoot">${buildCalHTML()}</div>`;
}
function buildCalHTML(){
  const {year,month}=calendarState;
  const months=t('months'); const days=t('days');
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
      ${de.map(e=>`<div class="cal-event-dot">${e.emoji} <span>${L(e.title)}</span></div>`).join('')}
    </div>`;
  }
  return `<div class="card" style="margin-bottom:20px">
    <div class="cal-header">
      <button class="cal-nav-btn" onclick="calNav(-1)">‹</button>
      <div class="cal-title">${months[month]} ${year}</div>
      <button class="cal-nav-btn" onclick="calNav(1)">›</button>
      <button class="btn-outline btn-sm" onclick="calGoToday()">${t('today')}</button>
    </div>
    <div class="cal-grid">${days.map(d=>`<div class="cal-head">${d}</div>`).join('')}${cells}</div>
  </div>
  <div class="card"><div class="card-header"><div class="card-title">${t('eventsOf')} ${months[month]}</div></div>
    ${monthEvents.length===0?`<div style="text-align:center;padding:30px;color:var(--text-muted)">${t('noEvents')}</div>`:
    monthEvents.map(e=>`<div class="schedule-item" style="cursor:pointer;margin-bottom:8px" onclick="viewEvent(${e.id})">
      <div style="width:42px;height:42px;border-radius:10px;background:linear-gradient(135deg,var(--gold),var(--gold-light));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">${e.emoji}</div>
      <div class="schedule-info"><div class="schedule-name">${L(e.title)}</div><div class="schedule-preacher">${e.date} • ${e.time} • ${L(e.location)}</div></div>
      ${e.registered?`<span class="badge badge-active">${t('registered')}</span>`:`<button class="btn-primary btn-sm" onclick="event.stopPropagation();registerEvent(${e.id})">${t('register')}</button>`}
    </div>`).join('')}
  </div>`;
}
function calNav(dir){calendarState.month+=dir;if(calendarState.month>11){calendarState.month=0;calendarState.year++;}if(calendarState.month<0){calendarState.month=11;calendarState.year--;}const root=document.getElementById('calendarRoot');if(root)root.innerHTML=buildCalHTML();}
function calGoToday(){const now=new Date();calendarState.year=now.getFullYear();calendarState.month=now.getMonth();const root=document.getElementById('calendarRoot');if(root)root.innerHTML=buildCalHTML();}
function calDayClick(day){
  const {year,month}=calendarState;const de=EVENTS.filter(e=>e.calYear===year&&e.calMonth===month&&e.calDay===day);
  if(!de.length){if(currentUser.role==='admin')showToast(`${day} ${t('months')[month]}`);return;}
  if(de.length===1){viewEvent(de[0].id);return;}
  openModal(`${de[0].date}`,de.map(e=>`<div class="schedule-item" style="cursor:pointer;margin-bottom:8px" onclick="closeModal();viewEvent(${e.id})"><div style="width:36px;height:36px;border-radius:8px;background:var(--gold-pale);display:flex;align-items:center;justify-content:center;font-size:16px">${e.emoji}</div><div><div style="font-weight:500">${L(e.title)}</div><div style="font-size:12px;color:var(--text-muted)">${e.time} • ${L(e.location)}</div></div></div>`).join(''));
}

// ===== EVENTS =====
function renderEvents(){
  return `<div class="page-header-row">
    <div class="page-header" style="margin-bottom:0"><h2>${t('eventsTitle')}</h2><p>${t('eventsSub')}</p></div>
    ${currentUser.role==='admin'?`<button class="btn-primary" onclick="openCreateEvent()">${t('createEvent')}</button>`:''}
  </div>
  <div class="events-grid stagger" style="margin-top:20px">
    ${EVENTS.map(e=>`<div class="event-card" onclick="viewEvent(${e.id})">
      <div class="event-banner" style="background:linear-gradient(135deg,#f5e9c8,#e8d4a0)"><div class="event-banner-bg">${e.emoji}</div>
        <div class="event-date-chip"><div class="date-day">${e.day}</div><div class="date-month">${e.month}</div></div>
      </div>
      <div class="event-body"><div class="event-title">${L(e.title)}</div><div class="event-meta"><span>🕐 ${e.time}</span><span>📍 ${L(e.location)}</span></div>
        ${e.registered?`<span class="badge badge-active">${t('registeredBadge')}</span>`:`<button class="btn-primary btn-sm" onclick="event.stopPropagation();registerEvent(${e.id})">${t('registerEvent')}</button>`}
      </div>
    </div>`).join('')}
  </div>`;
}
function viewEvent(id){
  const e=EVENTS.find(ev=>ev.id===id);if(!e)return;
  openModal(L(e.title),`<div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;padding:20px;background:var(--cream);border-radius:var(--radius)">
    <span style="font-size:48px">${e.emoji}</span>
    <div><div style="font-size:13px;color:var(--text-muted)">${t('dateTime')}</div><div style="font-size:16px;font-weight:600">${e.date} • ${e.time}</div><div style="font-size:13px;color:var(--text-muted);margin-top:4px">📍 ${L(e.location)}</div></div>
  </div>
  <p style="font-size:14px;color:var(--text-muted);line-height:1.7;margin-bottom:20px">${L(e.desc)}</p>
  ${!e.registered?`<button class="btn-primary full" onclick="registerEvent(${e.id});closeModal()">${t('registerForEvent')}</button>`:`<div style="text-align:center;padding:14px;background:rgba(76,175,114,0.08);border-radius:var(--radius);color:var(--success);font-weight:500">${t('alreadyRegistered')}</div>`}`);
}
function registerEvent(id){const e=EVENTS.find(ev=>ev.id===id);if(e){e.registered=true;showToast(`${t('registeredToast')} "${L(e.title)}"! 🎉`,'success');showPage('events');}}
function openCreateEvent(){
  openModal(t('createEventModal'),`<div class="auth-form">
    <div class="form-group"><label>${t('eventTitle')}</label><input type="text"></div>
    <div class="form-row-two"><div class="form-group"><label>${t('eventDate')}</label><input type="date"></div><div class="form-group"><label>${t('eventTime')}</label><input type="time"></div></div>
    <div class="form-group"><label>${t('eventLocation')}</label><input type="text"></div>
    <div class="form-group"><label>${t('eventDesc')}</label><textarea rows="3"></textarea></div>
    <button class="btn-primary full" onclick="closeModal();showToast('✓','success')">${t('eventCreate')}</button>
  </div>`);
}

// ===== SERMONS =====
function renderSermons(){
  const topics=[t('topicAll'),t('topicFaith'),t('topicPurpose'),t('topicGrace'),t('topicPrayer'),t('topicSpirit')];
  return `<div class="page-header-row">
    <div class="page-header" style="margin-bottom:0"><h2>${t('sermonsTitle')}</h2><p>${t('sermonsSub')}</p></div>
    <div class="toolbar"><div class="search-bar"><span class="search-icon">🔍</span><input type="text" placeholder="${t('searchSermons')}"></div>
    ${currentUser.role==='admin'?`<button class="btn-primary" onclick="openModal('${t('uploadSermonModal')}','<div class=auth-form><div class=form-group><label>${t('sermonTitleLabel')}</label><input type=text></div><div class=form-group><label>${t('speakerLabel')}</label><input type=text></div><button class=btn-primary onclick=closeModal()>${t('uploadBtn')}</button></div>')">${t('uploadSermon')}</button>`:''}
    </div>
  </div>
  <div style="display:flex;gap:8px;margin:20px 0;flex-wrap:wrap">
    ${topics.map((t2,i)=>`<button class="btn-outline btn-sm" style="${i===0?'background:var(--gold);color:var(--dark);border-color:var(--gold)':''}">${t2}</button>`).join('')}
  </div>
  <div class="sermon-list stagger">
    ${SERMONS.map(s=>`<div class="sermon-item"><div class="sermon-thumb">${s.emoji}</div>
      <div class="sermon-info"><div class="sermon-title">${L(s.title)}</div><div class="sermon-meta">${s.speaker} • ${L(s.date)} • ${s.duration}</div></div>
      <div class="sermon-actions">
        <button class="btn-outline btn-sm" onclick="showToast('▶ ...')">${t('playSermon')}</button>
        <button class="btn-outline btn-sm" onclick="showToast('📄 ...')">${t('downloadNotes')}</button>
        ${currentUser.role==='admin'?`<button class="btn-outline btn-sm btn-danger" onclick="showToast('','error')">${t('deleteSermon')}</button>`:''}
      </div>
    </div>`).join('')}
  </div>`;
}

// ===== SCHEDULE =====
function renderSchedule(){
  return `<div class="page-header-row">
    <div class="page-header" style="margin-bottom:0"><h2>${t('scheduleTitle')}</h2><p>${t('scheduleSub')}</p></div>
    ${currentUser.role==='admin'?`<button class="btn-primary" onclick="showToast('...')">${t('editSchedule')}</button>`:''}
  </div>
  <div class="card" style="margin-top:20px">
    <div style="display:flex;align-items:center;gap:16px;padding-bottom:20px;border-bottom:1px solid var(--cream-2);margin-bottom:20px">
      <div style="width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,var(--gold),var(--gold-light));display:flex;align-items:center;justify-content:center;font-size:24px">📖</div>
      <div><div style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600">${t('sundayService')}</div><div style="font-size:13px;color:var(--text-muted)">23 ${t('months')[2]} 2025 • ${currentLang==='fr'?'Sanctuaire Principal':'Main Sanctuary'} • 8:00</div></div>
    </div>
    <div class="schedule-list">${SCHEDULE.map(s=>`<div class="schedule-item"><div class="schedule-time">${s.time}</div><div class="schedule-info"><div class="schedule-name">${L(s.name)}</div><div class="schedule-preacher">${L(s.preacher)}</div></div><span class="badge badge-active">${currentLang==='fr'?'Dimanche':'Sunday'}</span></div>`).join('')}</div>
  </div>`;
}

// ===== ANNOUNCEMENTS =====
function renderAnnouncements(){
  return `<div class="page-header-row">
    <div class="page-header" style="margin-bottom:0"><h2>${t('announcementsTitle')}</h2><p>${t('announcementsSub')}</p></div>
    ${currentUser.role==='admin'?`<button class="btn-primary" onclick="openPostAnnouncement()">${t('postAnnouncement')}</button>`:''}
  </div>
  <div class="announcement-list stagger" style="margin-top:20px">
    ${ANNOUNCEMENTS.map(a=>`<div class="announcement-item ${a.urgent?'urgent':''}">
      <div class="ann-header">
        <div>${a.urgent?`<span class="badge" style="background:rgba(224,82,82,0.12);color:var(--danger);margin-bottom:6px;display:inline-flex">${t('urgent')}</span><br>`:''}
        <div class="ann-title">${L(a.title)}</div></div>
        <div style="text-align:right"><div class="ann-date">${a.date}</div><span class="badge badge-member" style="margin-top:4px">${L(a.dept)}</span></div>
      </div>
      <div class="ann-body">${L(a.body)}</div>
      ${currentUser.role==='admin'?`<div style="display:flex;gap:8px;margin-top:12px"><button class="btn-outline btn-sm" onclick="showToast('...')">${t('editAnn')}</button><button class="btn-outline btn-sm btn-danger" onclick="showToast('','error')">${t('deleteAnn')}</button></div>`:''}
    </div>`).join('')}
  </div>`;
}
function openPostAnnouncement(){
  openModal(t('postAnnModal'),`<div class="auth-form">
    <div class="form-group"><label>${t('annTitle')}</label><input type="text"></div>
    <div class="form-group"><label>${t('annMessage')}</label><textarea rows="4"></textarea></div>
    <div class="form-row-two">
      <div class="form-group"><label>${t('annDept')}</label><select><option>${t('allDepts')}</option></select></div>
      <div class="form-group"><label>${t('annPriority')}</label><select><option>${t('annNormal')}</option><option>${t('annUrgent')}</option></select></div>
    </div>
    <button class="btn-primary full" onclick="closeModal();showToast('✓','success')">${t('postBtn')}</button>
  </div>`);
}

// ===== ATTENDANCE =====
function renderAttendance(){
  const weeks=Array.from({length:48},()=>Math.random()>0.25);
  const days=t('days');
  return `<div class="page-header"><h2>${currentUser.role==='admin'?t('attendanceMgmt'):t('myAttendance')}</h2></div>
  ${currentUser.role==='admin'?`<div class="stats-grid" style="margin-bottom:20px">
    <div class="stat-card gold"><div class="stat-icon gold">📊</div><div class="stat-value">78%</div><div class="stat-label">${t('avgAttendance')}</div></div>
    <div class="stat-card green"><div class="stat-icon green">👥</div><div class="stat-value">656</div><div class="stat-label">${t('lastSunday')}</div></div>
    <div class="stat-card blue"><div class="stat-icon blue">📈</div><div class="stat-value">+42</div><div class="stat-label">${t('visitorsMonth')}</div></div>
    <div class="stat-card orange"><div class="stat-icon orange">⬇️</div><div class="stat-value">186</div><div class="stat-label">${t('absentLastSunday')}</div></div>
  </div>`:''}
  <div class="grid-2">
    <div class="card"><div class="card-header"><div class="card-title">${t('attendanceHeatmap')}</div><span style="font-size:12px;color:var(--text-muted)">${weeks.filter(Boolean).length} ${t('servicesAttendedSummary')}</span></div>
      <div style="display:flex;gap:4px;flex-wrap:wrap">
        ${days.map(d=>`<div style="width:calc(14.28% - 4px);font-size:10px;text-align:center;color:var(--text-light);padding:2px 0">${d}</div>`).join('')}
        ${weeks.map(p=>`<div style="width:calc(14.28% - 4px);aspect-ratio:1;border-radius:3px;background:${p?'var(--gold)':'var(--cream-2)'};opacity:${p?1:0.6}"></div>`).join('')}
      </div>
      <div style="display:flex;gap:8px;margin-top:12px;font-size:11px;color:var(--text-muted)">
        <div style="width:12px;height:12px;border-radius:2px;background:var(--cream-2)"></div>${t('absentLabel')}
        <div style="width:12px;height:12px;border-radius:2px;background:var(--gold);margin-left:8px"></div>${t('presentLabel')}
      </div>
    </div>
    <div class="card"><div class="card-header"><div class="card-title">${t('summary')}</div>${currentUser.role==='admin'?`<button class="btn-primary btn-sm" onclick="showToast('...')">${t('exportBtn')}</button>`:''}</div>
      ${[{l:t('servicesThisYear'),v:'48',p:null},{l:t('present'),v:`${weeks.filter(Boolean).length}`,p:Math.round(weeks.filter(Boolean).length/48*100)},{l:t('absent'),v:`${weeks.filter(v=>!v).length}`,p:null},{l:t('currentStreak'),v:`4 ${t('weeks')}`,p:null}].map(s=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--cream-2)"><span style="font-size:13px;color:var(--text-muted)">${s.l}</span><div><span style="font-size:15px;font-weight:600">${s.v}</span>${s.p!==null?`<span style="font-size:11px;color:var(--success);margin-left:6px">${s.p}%</span>`:''}</div></div>`).join('')}
    </div>
  </div>`;
}

// ===== GIVING =====
function renderGiving(){
  const amounts=[30000,50000,100000,200000,500000,t('customOther')];
  return `<div class="page-header"><h2>${currentUser.role==='admin'?t('financeTitle'):t('givingTitle')}</h2></div>
  ${currentUser.role==='admin'?`<div class="stats-grid" style="margin-bottom:20px">
    <div class="stat-card gold"><div class="stat-icon gold">💰</div><div class="stat-value" style="font-size:18px">${cfa(28920000)}</div><div class="stat-label">${t('totalThisMonth')}</div></div>
    <div class="stat-card green"><div class="stat-icon green">🙏</div><div class="stat-value" style="font-size:18px">${cfa(13260000)}</div><div class="stat-label">${t('tithes')}</div></div>
    <div class="stat-card blue"><div class="stat-icon blue">💛</div><div class="stat-value" style="font-size:18px">${cfa(11040000)}</div><div class="stat-label">${t('offerings')}</div></div>
    <div class="stat-card orange"><div class="stat-icon orange">📊</div><div class="stat-value" style="font-size:18px">${cfa(4620000)}</div><div class="stat-label">${t('specialDonations')}</div></div>
  </div>`:''}
  <div class="grid-2">
    <div class="card"><div class="card-header"><div class="card-title">${t('makeGift')}</div></div>
      <div class="giving-options" id="amountOptions">
        ${amounts.map((a,i)=>`<div class="amount-chip ${i===1?'selected':''}" onclick="selectAmount('${a}',this)">${typeof a==='number'?cfa(a):a}${a===t('customOther')?`<p>${t('customAmountLabel').substring(0,15)}...</p>`:''}</div>`).join('')}
      </div>
      <div class="form-group" id="customAmountField" style="display:none;margin-bottom:16px"><label>${t('customAmount')}</label><input type="number" placeholder="${t('customAmountLabel')}"></div>
      <div class="form-group" style="margin-bottom:16px"><label>${t('givingType')}</label>
        <select><option>${t('tithe')}</option><option>${t('offering')}</option><option>${t('firstFruits')}</option><option>${t('buildingFund')}</option><option>${t('missions')}</option><option>${t('projectDonation')}</option></select>
      </div>
      <div class="form-group" style="margin-bottom:20px"><label>${t('paymentMethod')}</label>
        <select><option>${t('mobileMoney')}</option><option>${t('orangeMoney')}</option><option>${t('bankTransfer')}</option><option>${t('cash')}</option></select>
      </div>
      <button class="btn-primary full" onclick="showToast(currentLang==='fr'?'Paiement traité! Merci 🙏':'Payment processed! Thank you 🙏','success')">${t('giveNow')}</button>
    </div>
    <div class="card"><div class="card-header"><div class="card-title">${t('givingHistory')}</div><button class="btn-outline btn-sm" onclick="showToast('...')">${t('downloadStatement')}</button></div>
      <div class="table-container"><table><thead><tr><th>${currentLang==='fr'?'Date':'Date'}</th><th>Type</th><th>${currentLang==='fr'?'Montant':'Amount'}</th></tr></thead><tbody>
        ${[{d:'16 Mar',t2:t('tithe'),a:72000},{d:'9 Mar',t2:t('offering'),a:30000},{d:'2 Mar',t2:t('buildingFund'),a:120000},{d:'23 Fév',t2:t('tithe'),a:72000},{d:'16 Fév',t2:t('offering'),a:30000}]
          .map(r=>`<tr><td style="font-size:13px">${r.d}</td><td><span class="badge badge-member">${r.t2}</span></td><td style="font-weight:600;color:var(--success)">${cfa(r.a)}</td></tr>`).join('')}
      </tbody></table></div>
    </div>
  </div>`;
}
function selectAmount(val,el){document.querySelectorAll('.amount-chip').forEach(c=>c.classList.remove('selected'));el.classList.add('selected');document.getElementById('customAmountField').style.display=(val===t('customOther')||val==='Custom'||val==='Autre')?'flex':'none';}

// ===== PROJECTS =====
function renderProjects(){
  return `<div class="page-header-row">
    <div class="page-header" style="margin-bottom:0"><h2>${t('projectsTitle')}</h2><p>${t('projectsSub')}</p></div>
    ${currentUser.role==='admin'?`<button class="btn-primary" onclick="showToast('...')">${t('newProject')}</button>`:''}
  </div>
  <div class="grid-3 stagger" style="margin-top:20px">
    ${PROJECTS.map(p=>{const pct=Math.round(p.raised/p.target*100);return `<div class="project-card">
      <div class="project-img">${p.emoji}</div>
      <div class="project-title">${L(p.title)}</div>
      <div class="project-desc">${L(p.desc)}</div>
      <div class="project-progress">
        <div class="project-progress-label"><span>${cfa(p.raised)} ${t('raised')}</span><span>${pct}%</span></div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        <div style="font-size:11px;color:var(--text-light);margin-top:4px">${t('goal')}: ${cfa(p.target)}</div>
      </div>
      <div style="display:flex;gap:8px"><button class="btn-primary btn-sm" style="flex:1" onclick="showToast('...','success')">${t('contribute')}</button><button class="btn-outline btn-sm" onclick="showToast('...')">${t('updates')} (${p.updates})</button></div>
    </div>`;}).join('')}
  </div>`;
}

// ===== PARTNERS =====
function renderPartners(){
  const partners=[
    {name:'Fondation Grâce / Grace Foundation',type:t('sponsor'),a:3000000,f:t('perMonth'),joined:'Jan 2024',i:'FG'},
    {name:'Emmanuel Corp',type:t('partner'),a:1500000,f:t('perMonth'),joined:'Mar 2023',i:'EC'},
    {name:'Livingstone Trust',type:t('donor'),a:6000000,f:t('oneTime'),joined:currentLang==='fr'?'Déc 2023':'Dec 2023',i:'LT'},
  ];
  return `<div class="page-header-row"><div class="page-header" style="margin-bottom:0"><h2>${t('partnersTitle')}</h2></div><button class="btn-primary" onclick="showToast('...')">${t('addPartner')}</button></div>
  <div class="card" style="margin-top:20px"><div class="table-container"><table>
    <thead><tr><th>${currentLang==='fr'?'Partenaire':'Partner'}</th><th>${t('partnerType')}</th><th>${t('contribution')}</th><th>${t('since')}</th><th>${currentLang==='fr'?'Actions':'Actions'}</th></tr></thead>
    <tbody>${partners.map(p=>`<tr><td><div class="td-avatar"><div class="td-avatar-circle" style="background:var(--info)">${p.i}</div><span>${p.name}</span></div></td><td><span class="badge badge-admin">${p.type}</span></td><td style="font-weight:600;color:var(--success)">${cfa(p.a)}/${p.f}</td><td style="color:var(--text-muted);font-size:13px">${p.joined}</td><td><button class="btn-outline btn-sm" onclick="showToast('...')">${t('viewHistory')}</button></td></tr>`).join('')}
    </tbody></table></div></div>`;
}

// ===== PRAYER =====
function renderPrayer(){
  return `<div class="page-header-row">
    <div class="page-header" style="margin-bottom:0"><h2>${t('prayerTitle')}</h2><p>${t('prayerSub')}</p></div>
    <button class="btn-primary" onclick="openPrayerForm()">${t('submitRequest')}</button>
  </div>
  <div style="margin-top:20px">
    ${PRAYER_REQUESTS.map(p=>`<div class="prayer-item">
      <div class="prayer-header"><div style="display:flex;align-items:center;gap:8px"><div class="td-avatar-circle" style="width:28px;height:28px;font-size:11px">${L(p.from).split(' ').map(n=>n[0]).join('')}</div><span class="prayer-from">${L(p.from)}</span></div><span class="prayer-time">${L(p.time)}</span></div>
      <div class="prayer-body">${L(p.body)}</div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px"><span class="prayer-tag">🙏 ${L(p.tag)}</span>
        ${currentUser.role==='admin'?`<button class="btn-outline btn-sm" onclick="showToast('...')">${t('respondBtn')}</button>`:`<button class="btn-outline btn-sm" onclick="showToast(t('prayingToast'))">${t('prayBtn')}</button>`}
      </div>
    </div>`).join('')}
  </div>`;
}
function openPrayerForm(){
  openModal(t('submitPrayerModal'),`<div class="auth-form">
    <div class="form-group"><label>${t('category')}</label><select><option>${t('health')}</option><option>${t('family')}</option><option>${t('career')}</option><option>${t('finance')}</option><option>${t('spiritual')}</option><option>${t('other')}</option></select></div>
    <div class="form-group"><label>${t('yourRequest')}</label><textarea rows="5" placeholder="${t('prayerPlaceholder')}"></textarea></div>
    <div class="form-group"><label class="checkbox-label"><input type="checkbox"> ${t('anonymous')}</label></div>
    <button class="btn-primary full" onclick="closeModal();showToast('🙏','success')">${t('submitBtn')}</button>
  </div>`);
}

// ===== MESSAGES =====
function renderMessages(){
  const msgs_en=[
    {txt:"Hello! I have a question about the upcoming Easter service.",s:true,time:'10:32'},
    {txt:'Hello! The Easter service will begin at 8:00 AM. Please arrive at 7:30 AM.',s:false,time:'10:45'},
    {txt:'Thank you. Will there be a special program for children?',s:true,time:'11:02'},
    {txt:"Yes! Children's Church will run simultaneously in the Children's Hall.",s:false,time:'11:15'},
  ];
  const msgs_fr=[
    {txt:"Bonjour! J'ai une question sur le culte de Pâques.",s:true,time:'10:32'},
    {txt:'Bonjour! Le culte de Pâques commence à 8h00. Arrivez à 7h30.',s:false,time:'10:45'},
    {txt:'Merci Pasteur. Y aura-t-il un programme pour les enfants?',s:true,time:'11:02'},
    {txt:"Oui! L'École du Dimanche se tiendra en parallèle dans la Salle des Enfants.",s:false,time:'11:15'},
  ];
  const msgs=currentLang==='fr'?msgs_fr:msgs_en;
  return `<div class="page-header"><h2>${t('messagesTitle')}</h2><p>${currentUser.role==='admin'?t('adminMessageSub'):t('memberMessageSub')}</p></div>
  <div class="card"><div class="msg-thread" id="msgThread">
    ${msgs.map(m=>`<div><div class="msg-bubble ${m.s?'sent':'received'}">${m.txt}</div><div class="msg-time" style="text-align:${m.s?'right':'left'}">${m.time}</div></div>`).join('')}
  </div>
  <div class="msg-input-row"><input type="text" id="msgInput" placeholder="${t('typeMessage')}" onkeydown="if(event.key==='Enter')sendMessage()"><button class="btn-primary" onclick="sendMessage()">${t('send')}</button></div>
  </div>`;
}
function sendMessage(){
  const input=document.getElementById('msgInput');if(!input||!input.value.trim())return;
  const thread=document.getElementById('msgThread');const now=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
  const div=document.createElement('div');div.innerHTML=`<div class="msg-bubble sent">${input.value}</div><div class="msg-time" style="text-align:right">${now}</div>`;
  thread.appendChild(div);input.value='';thread.scrollTop=thread.scrollHeight;
  setTimeout(()=>{const reply=document.createElement('div');reply.innerHTML=`<div class="msg-bubble received">${t('autoReply')}</div><div class="msg-time">${now}</div>`;thread.appendChild(reply);thread.scrollTop=thread.scrollHeight;},1200);
}

// ===== BIBLE =====
function renderBible(){if(bibleState.book)return renderBibleChapter();return renderBibleHome();}
function renderBibleHome(){
  const verses=BIBLE_VERSES[currentLang]||BIBLE_VERSES.fr;
  const verse=verses[Math.floor(Math.random()*verses.length)];
  return `<div class="page-header"><h2>${t('bibleTitle')}</h2><p>${t('bibleSub')}</p></div>
  <div class="bible-verse-card" style="margin-bottom:24px">
    <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:var(--gold);margin-bottom:12px">${t('verseOfDay')}</div>
    <div class="bible-verse" id="dailyVerse">"${verse.verse}"</div>
    <div class="bible-ref" id="dailyRef">— ${verse.ref}</div>
    <button onclick="refreshVerse()" style="margin-top:16px;padding:8px 16px;border:1px solid rgba(201,168,76,0.3);background:transparent;border-radius:8px;color:var(--gold);cursor:pointer;font-size:12px">${t('nextVerse')}</button>
  </div>
  <div class="card" style="margin-bottom:20px">
    <div class="card-header"><div class="card-title">${t('searchPassage')}</div></div>
    <div style="display:flex;gap:10px;flex-wrap:wrap"><div class="search-bar" style="flex:1;min-width:200px"><span class="search-icon">🔍</span><input type="text" id="bsearch" placeholder="${t('searchBible')}" style="width:100%"></div><button class="btn-primary" onclick="doBibleSearch()">${t('searchBtn')}</button></div>
    <div id="bibleSearchResults"></div>
  </div>
  <div style="margin-bottom:20px">
    <div class="card-title" style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;margin-bottom:16px">${t('popularChapters')}</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px">
      ${FEATURED_CHAPTERS.map(fc=>`<div class="schedule-item" style="cursor:pointer;flex-direction:column;align-items:flex-start;gap:4px" onclick="openBibleChapter('${fc.key}')"><div style="font-size:15px;font-weight:600">${fc.label}</div><div style="font-size:12px;color:var(--text-muted)">${fc.desc}</div></div>`).join('')}
    </div>
  </div>
  <div class="grid-2">
    <div class="card"><div class="card-header"><div class="card-title">${t('oldTestament')}</div><span style="font-size:12px;color:var(--text-muted)">${t('otBooks')}</span></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;max-height:350px;overflow-y:auto">${BIBLE_BOOKS.OT.map(b=>`<button class="book-btn" onclick="selectBibleBook('${b.id}','${b.name}',${b.chapters})"><div>${b.name}</div><div style="font-size:10px;color:var(--text-light)">${b.chapters} ${currentLang==='fr'?'ch.':'ch.'}</div></button>`).join('')}</div></div>
    <div class="card"><div class="card-header"><div class="card-title">${t('newTestament')}</div><span style="font-size:12px;color:var(--text-muted)">${t('ntBooks')}</span></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;max-height:350px;overflow-y:auto">${BIBLE_BOOKS.NT.map(b=>`<button class="book-btn" onclick="selectBibleBook('${b.id}','${b.name}',${b.chapters})"><div>${b.name}</div><div style="font-size:10px;color:var(--text-light)">${b.chapters} ${currentLang==='fr'?'ch.':'ch.'}</div></button>`).join('')}</div></div>
  </div>`;
}
function refreshVerse(){
  const verses=BIBLE_VERSES[currentLang]||BIBLE_VERSES.fr;
  const v=verses[Math.floor(Math.random()*verses.length)];
  const el=document.getElementById('dailyVerse'),ref=document.getElementById('dailyRef');
  if(el)el.textContent=`"${v.verse}"`;if(ref)ref.textContent=`— ${v.ref}`;
}
function selectBibleBook(id,name,chapters){
  openModal(`${name} — ${t('chooseChapter')}`,`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(52px,1fr));gap:8px;padding:8px 0;max-height:400px;overflow-y:auto">
    ${Array.from({length:chapters},(_,i)=>i+1).map(c=>`<button class="chap-btn" onclick="closeModal();openBibleChapter('${id}-${c}')">${c}</button>`).join('')}
  </div>`);
}
function openBibleChapter(key){bibleState.book=key;const container=document.getElementById('pageContainer');if(container)container.innerHTML=`<div class="page-in">${renderBibleChapter()}</div>`;}
function renderBibleChapter(){
  const key=bibleState.book;const data=BIBLE_TEXT[key];
  const [bookId,chapNum]=key.split('-');const allBooks=[...BIBLE_BOOKS.OT,...BIBLE_BOOKS.NT];
  const book=allBooks.find(b=>b.id===bookId);const chap=parseInt(chapNum);
  const navRow=`<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;flex-wrap:wrap">
    <button onclick="bibleState.book=null;showPage('bible')" class="btn-outline btn-sm">${t('backBtn')}</button>
    ${chap>1?`<button class="btn-outline btn-sm" onclick="openBibleChapter('${bookId}-${chap-1}')">‹ Ch. ${chap-1}</button>`:''}
    ${book&&chap<book.chapters?`<button class="btn-outline btn-sm" onclick="openBibleChapter('${bookId}-${chap+1}')">Ch. ${chap+1} ›</button>`:''}
    ${book?`<button class="btn-outline btn-sm" onclick="selectBibleBook('${bookId}','${book.name}',${book.chapters})">${t('chooseChapterBtn')}</button>`:''}
    <button class="btn-outline btn-sm" onclick="bibleState.book=null;showPage('bible')">${t('allBooks')}</button>
  </div>`;
  if(data)return `${navRow}<div style="margin-bottom:16px"><div style="font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700">${data.title}</div><div style="font-size:14px;color:var(--text-muted);font-style:italic">${data.subtitle}</div></div><div class="card"><div style="max-height:600px;overflow-y:auto;padding-right:8px">${data.verses.map((v,i)=>`<div class="verse-row" onclick="highlightVerse(this)" onmouseover="if(!this.classList.contains('highlighted'))this.style.background='rgba(201,168,76,0.04)'" onmouseout="if(!this.classList.contains('highlighted'))this.style.background=''"><span class="verse-num">${i+1}</span><span class="verse-text">${v}</span></div>`).join('')}</div></div>`;
  if(book)return `${navRow}<div style="margin-bottom:16px"><div style="font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700">${book.name} — ${currentLang==='fr'?'Chapitre':'Chapter'} ${chap}</div></div><div class="bible-verse-card" style="margin-bottom:20px"><div style="font-size:14px;color:var(--gold-light);margin-bottom:8px">📖 ${book.name} ${chap}</div><div style="font-size:14px;color:var(--cream-2);line-height:1.7">${t('unavailableText')}</div></div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(52px,1fr));gap:8px">${Array.from({length:book.chapters},(_,i)=>i+1).map(c=>{const has=!!BIBLE_TEXT[`${bookId}-${c}`];return `<button class="chap-btn ${has?'has-text':''}" onclick="openBibleChapter('${bookId}-${c}')">${c}</button>`;}).join('')}</div>`;
  return navRow;
}
function highlightVerse(el){document.querySelectorAll('.verse-row.highlighted').forEach(v=>{v.classList.remove('highlighted');v.style.cssText='';});el.classList.add('highlighted');el.style.background='rgba(201,168,76,0.1)';el.style.borderRadius='8px';}
function doBibleSearch(){
  const q=document.getElementById('bsearch')?.value?.toLowerCase().trim();const container=document.getElementById('bibleSearchResults');
  if(!q||!container)return;
  const results=[];Object.entries(BIBLE_TEXT).forEach(([key,chap])=>{chap.verses.forEach((verse,idx)=>{if(verse.toLowerCase().includes(q))results.push({key,title:chap.title,verse,idx:idx+1});});});
  const allBooks=[...BIBLE_BOOKS.OT,...BIBLE_BOOKS.NT];const bookMatches=allBooks.filter(b=>b.name.toLowerCase().includes(q));
  if(!results.length&&!bookMatches.length){container.innerHTML=`<div style="padding:16px;color:var(--text-muted);font-size:13px">${t('noResults')} "${q}"</div>`;return;}
  container.innerHTML=`<div style="padding-top:16px">
    ${bookMatches.length?`<div style="font-size:12px;color:var(--text-light);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.08em">${t('booksLabel')}</div><div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">${bookMatches.map(b=>`<button class="btn-outline btn-sm" onclick="selectBibleBook('${b.id}','${b.name}',${b.chapters})">${b.name}</button>`).join('')}</div>`:''}
    ${results.length?`<div style="font-size:12px;color:var(--text-light);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.08em">${results.length} ${t('versesLabel')}</div>${results.slice(0,10).map(r=>`<div style="padding:12px;margin-bottom:8px;border-radius:var(--radius);background:var(--cream);border:1px solid var(--cream-2);cursor:pointer" onclick="openBibleChapter('${r.key}')"><div style="font-size:12px;color:var(--gold);font-weight:600;margin-bottom:4px">${r.title} v.${r.idx}</div><div style="font-size:13px;line-height:1.5">${r.verse.replace(new RegExp(q,'gi'),m=>`<mark style="background:rgba(201,168,76,0.3);padding:0 2px;border-radius:2px">${m}</mark>`)}</div></div>`).join('')}${results.length>10?`<div style="font-size:12px;color:var(--text-muted);text-align:center;padding:8px">... ${t('moreResults').replace ? results.length-10+' '+t('moreResults') : ''}</div>`:''}`:''}
  </div>`;
}

// ===== DASHBOARDS =====
function renderMemberDashboard(){
  const verses=BIBLE_VERSES[currentLang]||BIBLE_VERSES.fr;const verse=verses[Math.floor(Math.random()*verses.length)];
  return `<div class="page-header"><h2>${t('goodMorning')}, ${currentUser.name.split(' ')[0]} 👋</h2><p>${t('welcomeBack')}</p></div>
  <div class="stats-grid stagger">
    <div class="stat-card gold"><div class="stat-icon gold">🙏</div><div class="stat-value">24</div><div class="stat-label">${t('servicesAttended')}</div><div class="stat-change">↑ 4 ${t('thisMonth')}</div></div>
    <div class="stat-card green"><div class="stat-icon green">📅</div><div class="stat-value">3</div><div class="stat-label">${t('upcomingEvents')}</div></div>
    <div class="stat-card blue"><div class="stat-icon blue">🎵</div><div class="stat-value">12</div><div class="stat-label">${t('sermonsWatched')}</div></div>
    <div class="stat-card orange"><div class="stat-icon orange">💛</div><div class="stat-value">${cfa(720000)}</div><div class="stat-label">${t('totalGiven')}</div></div>
  </div>
  <div class="bible-verse-card" style="margin-bottom:24px"><div class="bible-verse">"${verse.verse}"</div><div class="bible-ref">— ${verse.ref}</div></div>
  <div class="grid-2" style="gap:20px">
    <div class="card"><div class="card-header"><div class="card-title">${t('upcomingEventsCard')}</div><button class="btn-outline btn-sm" onclick="showPage('events')">${t('viewAll')}</button></div>
      ${EVENTS.slice(0,3).map(e=>`<div class="schedule-item" style="margin-bottom:8px"><div class="sermon-thumb" style="width:42px;height:42px;font-size:18px">${e.emoji}</div><div class="schedule-info"><div class="schedule-name">${L(e.title)}</div><div class="schedule-preacher">${e.date} • ${e.time}</div></div></div>`).join('')}
    </div>
    <div class="card"><div class="card-header"><div class="card-title">${t('latestAnnouncements')}</div><button class="btn-outline btn-sm" onclick="showPage('announcements')">${t('viewAll')}</button></div>
      ${ANNOUNCEMENTS.slice(0,3).map(a=>`<div style="padding:10px 0;border-bottom:1px solid var(--cream-2)">${a.urgent?`<span class="badge" style="background:rgba(224,82,82,0.12);color:var(--danger);margin-bottom:4px;display:inline-flex">${t('urgent')}</span><br>`:''}<span style="font-size:13px;font-weight:500">${L(a.title)}</span><div style="font-size:12px;color:var(--text-muted);margin-top:2px">${L(a.body).substring(0,80)}...</div></div>`).join('')}
    </div>
  </div>
  <div class="card" style="margin-top:20px"><div class="card-header"><div class="card-title">${t('recentSermons')}</div><button class="btn-outline btn-sm" onclick="showPage('sermons')">${t('viewAll')}</button></div>
    <div class="sermon-list">${SERMONS.slice(0,3).map(s=>`<div class="sermon-item"><div class="sermon-thumb">${s.emoji}</div><div class="sermon-info"><div class="sermon-title">${L(s.title)}</div><div class="sermon-meta">${s.speaker} • ${L(s.date)}</div></div><button class="btn-outline btn-sm">${t('playSermon')}</button></div>`).join('')}</div>
  </div>`;
}
function renderAdminDashboard(){
  return `<div class="page-header"><h2>${t('adminDashTitle')}</h2><p>${t('churchOverview')}</p></div>
  <div class="stats-grid stagger">
    <div class="stat-card gold"><div class="stat-icon gold">👥</div><div class="stat-value">842</div><div class="stat-label">${t('totalMembers')}</div><div class="stat-change">↑ 23 ${t('newThisMonth')}</div></div>
    <div class="stat-card green"><div class="stat-icon green">✅</div><div class="stat-value">78%</div><div class="stat-label">${t('attendanceRate')}</div><div class="stat-change">↑ 5% ${t('vsLastMonth')}</div></div>
    <div class="stat-card blue"><div class="stat-icon blue">💰</div><div class="stat-value" style="font-size:18px">${cfa(28920000)}</div><div class="stat-label">${t('monthlyGiving')}</div></div>
    <div class="stat-card orange"><div class="stat-icon orange">📅</div><div class="stat-value">6</div><div class="stat-label">${t('eventsThisMonth')}</div></div>
  </div>
  <div class="grid-2" style="gap:20px;margin-bottom:20px">
    <div class="card"><div class="card-header"><div class="card-title">${t('attendanceThisMonth')}</div></div>
      <div class="chart-bars">${[65,72,88,58,70,85,78,90,65,75,80,92].map(h=>`<div class="chart-bar" style="height:${h}%" data-value="${Math.round(h*8)}"></div>`).join('')}</div>
      <div class="chart-labels">${(currentLang==='fr'?['S1','S2','S3','S4','S5','S6','S7','S8','S9','S10','S11','S12']:['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12']).map(l=>`<span>${l}</span>`).join('')}</div>
    </div>
    <div class="card"><div class="card-header"><div class="card-title">${t('monthlyRevenue')}</div></div>
      <div class="chart-bars">${[40,55,70,48,62,78,65,82,58,72,88,76].map(h=>`<div class="chart-bar secondary" style="height:${h}%" data-value="${cfa(h*300000)}"></div>`).join('')}</div>
      <div class="chart-labels">${(currentLang==='fr'?['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc']:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']).map(l=>`<span>${l}</span>`).join('')}</div>
    </div>
  </div>
  <div class="grid-2" style="gap:20px">
    <div class="card"><div class="card-header"><div class="card-title">${t('recentMembers')}</div><button class="btn-outline btn-sm" onclick="showPage('members')">${t('viewAll')}</button></div>
      <div class="table-container"><table><thead><tr><th>${currentLang==='fr'?'Nom':'Name'}</th><th>${currentLang==='fr'?'Départ.':'Dept.'}</th><th>${t('status')}</th></tr></thead><tbody>
        ${MEMBERS.slice(0,4).map(m=>`<tr><td><div class="td-avatar"><div class="td-avatar-circle">${m.initials}</div><div><div style="font-weight:500">${m.name}</div><div style="font-size:11px;color:var(--text-light)">${m.id}</div></div></div></td><td>${L(m.dept)}</td><td><span class="badge badge-${m.status}">${m.status==='active'?t('active'):m.status==='pending'?t('pending'):t('inactive')}</span></td></tr>`).join('')}
      </tbody></table></div>
    </div>
    <div class="card"><div class="card-header"><div class="card-title">${t('prayerTitle')}</div><button class="btn-outline btn-sm" onclick="showPage('prayer')">${currentLang==='fr'?'Gérer':'Manage'}</button></div>
      ${PRAYER_REQUESTS.map(p=>`<div class="prayer-item"><div class="prayer-header"><span class="prayer-from">${L(p.from)}</span><span class="prayer-time">${L(p.time)}</span></div><div class="prayer-body">${L(p.body).substring(0,90)}...</div><span class="prayer-tag">🙏 ${L(p.tag)}</span></div>`).join('')}
    </div>
  </div>`;
}

// ===== MEMBERS =====
function renderMembers(){
  return `<div class="page-header-row">
    <div class="page-header" style="margin-bottom:0"><h2>${t('membersTitle')}</h2><p>${MEMBERS.length} ${currentLang==='fr'?'membres enregistrés':'registered members'}</p></div>
    <div class="toolbar"><div class="search-bar"><span class="search-icon">🔍</span><input type="text" placeholder="${t('searchMembers')}" oninput="filterMembers(this.value)"></div>
    <button class="btn-primary" onclick="openAddMember()">${t('addMember')}</button></div>
  </div>
  <div class="card" style="margin-top:20px"><div class="table-container"><table id="membersTable">
    <thead><tr><th>${currentLang==='fr'?'Membre':'Member'}</th><th>${currentLang==='fr'?'Département':'Department'}</th><th>${t('joined')}</th><th>${t('role')}</th><th>${t('status')}</th><th>${t('actions')}</th></tr></thead>
    <tbody>${MEMBERS.map(m=>`<tr>
      <td><div class="td-avatar"><div class="td-avatar-circle">${m.initials}</div><div><div style="font-weight:500">${m.name}</div><div style="font-size:11px;color:var(--text-light)">${m.id}</div></div></div></td>
      <td>${L(m.dept)}</td><td style="color:var(--text-muted);font-size:13px">${m.joined}</td>
      <td><span class="badge badge-${m.role}">${m.role==='admin'?t('admin'):t('member')}</span></td>
      <td><span class="badge badge-${m.status}">${m.status==='active'?t('active'):m.status==='pending'?t('pending'):t('inactive')}</span></td>
      <td><div style="display:flex;gap:6px"><button class="btn-outline btn-sm" onclick="showToast('...')">${t('edit')}</button><button class="btn-outline btn-sm btn-danger" onclick="showToast('','error')">${t('delete')}</button></div></td>
    </tr>`).join('')}</tbody>
  </table></div></div>`;
}
function filterMembers(q){document.querySelectorAll('#membersTable tbody tr').forEach(r=>r.style.display=r.textContent.toLowerCase().includes(q.toLowerCase())?'':'none');}
function openAddMember(){
  openModal(t('addMemberModal'),`<div class="auth-form">
    <div class="form-row-two"><div class="form-group"><label>${t('firstName')}</label><input type="text"></div><div class="form-group"><label>${t('lastName')}</label><input type="text"></div></div>
    <div class="form-group"><label>${t('email')}</label><input type="email"></div>
    <div class="form-group"><label>${t('phone')}</label><input type="tel" placeholder="+237 6XX XXX XXX"></div>
    <div class="form-group"><label>${t('department')}</label><select><option>${t('worshipTeam')}</option><option>${t('youthMinistry')}</option><option>${t('childrensChurch')}</option><option>${t('ushering')}</option><option>${t('mediatech')}</option><option>${t('prayerTeam')}</option></select></div>
    <button class="btn-primary full" onclick="closeModal();showToast('✓','success')">${t('addBtn')}</button>
  </div>`);
}

// ===== PROFILE =====
function renderProfile(){
  const u=currentUser;
  return `<div class="profile-hero">
    <div class="profile-avatar">${u.initials}</div>
    <div class="profile-details"><h2>${u.name}</h2><p>${L(u.department)} • ${u.role==='admin'?t('administrator'):t('member')}</p><div class="profile-id">🆔 ${u.id}</div></div>
    <button class="btn-outline btn-sm" style="margin-left:auto" onclick="openEditProfile()">${t('editProfile')}</button>
  </div>
  <div class="grid-2">
    <div class="card"><div class="card-header"><div class="card-title">${t('personalInfo')}</div></div>
      ${[{l:t('fullName'),v:u.name},{l:t('email'),v:u.email},{l:t('phone'),v:u.phone},{l:t('address'),v:u.address},{l:t('dept'),v:L(u.department)},{l:t('memberSince'),v:L(u.joinDate)}].map(i=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--cream-2)"><span style="font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-light)">${i.l}</span><span style="font-size:14px;font-weight:500">${i.v}</span></div>`).join('')}
    </div>
    <div class="card"><div class="card-header"><div class="card-title">${t('quickStats')}</div></div>
      ${[{l:t('servicesAttended'),v:'24',i:'✅'},{l:t('totalGiven'),v:cfa(720000),i:'💛'},{l:t('upcomingEvents'),v:'3',i:'📅'},{l:t('sermonsWatched'),v:'12',i:'🎵'},{l:t('prayerTitle'),v:'2',i:'🙏'}].map(s=>`<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--cream-2)"><span style="font-size:20px">${s.i}</span><div><div style="font-size:14px;font-weight:600">${s.v}</div><div style="font-size:12px;color:var(--text-muted)">${s.l}</div></div></div>`).join('')}
    </div>
  </div>`;
}
function openEditProfile(){
  openModal(t('editProfileModal'),`<div class="auth-form">
    <div class="form-row-two"><div class="form-group"><label>${t('firstName')}</label><input type="text" value="${currentUser.name.split(' ')[0]}"></div><div class="form-group"><label>${t('lastName')}</label><input type="text" value="${currentUser.name.split(' ')[1]||''}"></div></div>
    <div class="form-group"><label>${t('email')}</label><input type="email" value="${currentUser.email}"></div>
    <div class="form-group"><label>${t('phone')}</label><input type="tel" value="${currentUser.phone}"></div>
    <div class="form-group"><label>${t('address')}</label><input type="text" value="${currentUser.address}"></div>
    <button class="btn-primary full" onclick="closeModal();showToast('✓','success')">${t('saveChanges')}</button>
  </div>`);
}

// ===== REPORTS =====
function renderReports(){
  return `<div class="page-header"><h2>${t('reportsTitle')}</h2><p>${t('reportsSub')}</p></div>
  <div class="stats-grid" style="margin-bottom:24px">
    <div class="stat-card gold"><div class="stat-icon gold">📈</div><div class="stat-value">${t('memberGrowth')}</div><div class="stat-label">${t('memberGrowthLabel')}</div></div>
    <div class="stat-card green"><div class="stat-icon green">💰</div><div class="stat-value" style="font-size:16px">${cfa(325200000)}</div><div class="stat-label">${t('totalRevenue')}</div></div>
    <div class="stat-card blue"><div class="stat-icon blue">🎯</div><div class="stat-value">94%</div><div class="stat-label">${t('projectAchievement')}</div></div>
    <div class="stat-card orange"><div class="stat-icon orange">🌍</div><div class="stat-value">12</div><div class="stat-label">${t('missionSupported')}</div></div>
  </div>
  <div class="grid-2">
    <div class="card"><div class="card-header"><div class="card-title">${t('growthChart')}</div></div>
      <div class="chart-bars">${[55,58,60,64,68,70,71,74,78,80,83,86].map(h=>`<div class="chart-bar" style="height:${h}%" data-value="${Math.round(h*10)}"></div>`).join('')}</div>
      <div class="chart-labels">${(currentLang==='fr'?['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc']:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']).map(l=>`<span>${l}</span>`).join('')}</div>
    </div>
    <div class="card"><div class="card-header"><div class="card-title">${t('deptBreakdown')}</div></div>
      ${[{d:{en:'Worship',fr:'Louange'},c:124,p:75},{d:{en:'Youth Ministry',fr:'Jeunesse'},c:210,p:92},{d:{en:"Children's Church",fr:"École du Dimanche"},c:98,p:60},{d:{en:'Prayer Team',fr:'Prière'},c:86,p:80},{d:{en:'Media',fr:'Médias'},c:45,p:55},{d:{en:'Ushering',fr:'Accueil'},c:72,p:68}].map(d=>`<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:13px;font-weight:500">${L(d.d)}</span><span style="font-size:12px;color:var(--text-muted)">${d.c}</span></div><div class="progress-bar"><div class="progress-fill" style="width:${d.p}%"></div></div></div>`).join('')}
    </div>
  </div>
  <div style="display:flex;gap:12px;margin-top:20px;flex-wrap:wrap">
    <button class="btn-primary" onclick="showToast('...','success')">${t('exportPDF')}</button>
    <button class="btn-outline" onclick="showToast('...','success')">${t('exportExcel')}</button>
    <button class="btn-outline" onclick="showToast('...','success')">${t('emailReport')}</button>
  </div>`;
}

// ===== SECURITY =====
function renderSecurity(){
  return `<div class="page-header"><h2>${t('securityTitle')}</h2><p>${t('securitySub')}</p></div>
  <div class="grid-2">
    <div class="card"><div class="card-header"><div class="card-title">${t('rolePermissions')}</div></div>
      ${[{r:t('superAdmin'),p:[t('permAll'),t('permManageAdmins'),t('permSettings')]},{r:t('adminPastor'),p:[t('permManageMembers'),t('permPostAnn'),t('permViewReports')]},{r:t('deptHead'),p:[t('permManageDept'),t('permDeptAnn')]},{r:t('memberRole'),p:[t('permViewContent'),t('permRegEvents'),t('permSubmitReq')]}].map(r=>`<div style="margin-bottom:16px;padding:14px;border-radius:var(--radius);background:var(--cream);border:1px solid var(--cream-2)"><div style="font-size:14px;font-weight:600;margin-bottom:8px">${r.r}</div>${r.p.map(p=>`<span class="badge badge-active" style="margin-right:6px;margin-bottom:4px">✓ ${p}</span>`).join('')}</div>`).join('')}
    </div>
    <div class="card"><div class="card-header"><div class="card-title">${t('recentActivity')}</div></div>
      ${[{a:{en:'Password reset',fr:'Réinitialisation mot de passe'},u:'Emma Kwame',time:{en:'2 min ago',fr:'Il y a 2 min'},c:'warning'},{a:{en:'New admin added',fr:'Nouvel admin ajouté'},u:'Pastor David',time:{en:'1 hour ago',fr:'Il y a 1h'},c:'info'},{a:{en:'Account created',fr:'Compte créé'},u:'Jean Doe',time:{en:'3 hours ago',fr:'Il y a 3h'},c:'success'},{a:{en:'Failed login attempt',fr:'Connexion échouée'},u:{en:'Unknown',fr:'Inconnu'},time:{en:'5 hours ago',fr:'Il y a 5h'},c:'danger'}].map(a=>`<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--cream-2)"><div style="width:8px;height:8px;border-radius:50%;background:var(--${a.c});flex-shrink:0"></div><div style="flex:1"><div style="font-size:13px;font-weight:500">${L(a.a)}</div><div style="font-size:11px;color:var(--text-muted)">${L(a.u)}</div></div><span style="font-size:11px;color:var(--text-light)">${L(a.time)}</span></div>`).join('')}
      <button class="btn-primary btn-sm" style="width:100%;margin-top:16px" onclick="showToast('...')">${t('downloadLog')}</button>
    </div>
  </div>`;
}

function openModal(title,content){document.getElementById('modalTitle').textContent=title;document.getElementById('modalBody').innerHTML=content;document.getElementById('modal').classList.remove('hidden');}
function closeModal(){document.getElementById('modal').classList.add('hidden');}
document.getElementById('modal').addEventListener('click',function(e){if(e.target===this)closeModal();});
function showToast(msg,type=''){const to=document.getElementById('toast');to.textContent=msg;to.className='toast '+type;to.classList.remove('hidden');clearTimeout(window._tt);window._tt=setTimeout(()=>to.classList.add('hidden'),3000);}
function animateBars(){setTimeout(()=>{document.querySelectorAll('.progress-fill').forEach(bar=>{const w=bar.style.width;bar.style.width='0';setTimeout(()=>{bar.style.width=w;},50);});},100);}
