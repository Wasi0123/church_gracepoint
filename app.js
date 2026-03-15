/* ===== GRACEPOINT CHURCH MANAGEMENT SYSTEM ===== */

// ===== STATE =====
let currentUser = null;
let currentPage = 'dashboard';

// ===== DEMO DATA =====
const DEMO_USERS = {
  member: {
    id: 'MBR-2024-001', name: 'Sarah Johnson', email: 'sarah@church.com',
    role: 'member', initials: 'SJ', phone: '+1 555 234 5678',
    department: 'Worship Team', joinDate: 'January 2022',
    address: '123 Grace Street, Springfield'
  },
  admin: {
    id: 'ADM-2024-001', name: 'Pastor David Osei', email: 'pastor@church.com',
    role: 'admin', initials: 'DO', phone: '+1 555 100 2000',
    department: 'Leadership', joinDate: 'March 2018',
    address: '456 Faith Avenue, Springfield'
  }
};

const MEMBERS = [
  { id:'MBR-001', name:'Sarah Johnson', email:'sarah@church.com', dept:'Worship', joined:'Jan 2022', status:'active', role:'member', initials:'SJ' },
  { id:'MBR-002', name:'Emmanuel Kwame', email:'emma@church.com', dept:'Youth Ministry', joined:'Mar 2023', status:'active', role:'member', initials:'EK' },
  { id:'MBR-003', name:'Grace Mensah', email:'grace@church.com', dept:'Ushering', joined:'Jul 2021', status:'active', role:'member', initials:'GM' },
  { id:'MBR-004', name:'James Boateng', email:'james@church.com', dept:'Media', joined:'Sep 2022', status:'pending', role:'member', initials:'JB' },
  { id:'MBR-005', name:'Abena Asamoah', email:'abena@church.com', dept:'Prayer Team', joined:'Feb 2020', status:'active', role:'admin', initials:'AA' },
  { id:'MBR-006', name:'Michael Owusu', email:'michael@church.com', dept:'Children Church', joined:'Nov 2023', status:'inactive', role:'member', initials:'MO' },
];

const EVENTS = [
  { id:1, title:'Sunday Worship Service', date:'Mar 23', day:23, month:'Mar', time:'9:00 AM', location:'Main Sanctuary', emoji:'🙏', registered:true, desc:'Join us for our weekly Sunday worship service with praise, prayer, and the Word.' },
  { id:2, title:'Youth Night Vigil', date:'Mar 28', day:28, month:'Mar', time:'8:00 PM', location:'Youth Hall', emoji:'🌙', registered:false, desc:'An all-night prayer and worship session specifically for the youth.' },
  { id:3, title:'Easter Celebration', date:'Apr 5', day:5, month:'Apr', time:'10:00 AM', location:'Main Sanctuary', emoji:'✝️', registered:false, desc:'A special Easter celebration service with the full choir and drama.' },
  { id:4, title:'Community Outreach', date:'Apr 12', day:12, month:'Apr', time:'8:00 AM', location:'City Park', emoji:'❤️', registered:false, desc:'Community feeding and evangelism outreach at City Park.' },
  { id:5, title:'Leadership Summit', date:'Apr 19', day:19, month:'Apr', time:'9:00 AM', location:'Conference Room', emoji:'📖', registered:true, desc:'Annual leadership training for all department heads and ministers.' },
  { id:6, title:'Prayer and Fasting Week', date:'May 1', day:1, month:'May', time:'6:00 AM', location:'Prayer Room', emoji:'🕊️', registered:false, desc:'A week-long corporate fast with daily prayer sessions.' },
];

const SERMONS = [
  { id:1, title:'Walking in God\'s Purpose', speaker:'Pastor David Osei', date:'Mar 16, 2025', duration:'48 min', topic:'Purpose', type:'video', emoji:'🎬' },
  { id:2, title:'The Power of Faith', speaker:'Evang. Mary Asante', date:'Mar 9, 2025', duration:'52 min', topic:'Faith', type:'audio', emoji:'🎵' },
  { id:3, title:'Grace and Redemption', speaker:'Pastor David Osei', date:'Mar 2, 2025', duration:'45 min', topic:'Grace', type:'video', emoji:'🎬' },
  { id:4, title:'Praying Without Ceasing', speaker:'Elder John Frimpong', date:'Feb 23, 2025', duration:'38 min', topic:'Prayer', type:'audio', emoji:'🎵' },
  { id:5, title:'Fruits of the Spirit', speaker:'Deacon Ruth Aidoo', date:'Feb 16, 2025', duration:'41 min', topic:'Holy Spirit', type:'video', emoji:'🎬' },
];

const ANNOUNCEMENTS = [
  { id:1, title:'Easter Service Times Changed', body:'Please note that our Easter Sunday service will begin at 8:00 AM instead of 9:00 AM. Doors open at 7:30 AM. Kindly arrive early as we expect a large congregation.', date:'Mar 15', urgent:true, dept:'All' },
  { id:2, title:'Choir Auditions Open', body:'The music ministry is inviting all members with vocal abilities to audition for the main choir. Auditions will be held every Tuesday from 5–7 PM in the Music Room.', date:'Mar 12', urgent:false, dept:'Worship Team' },
  { id:3, title:'Children\'s Church Volunteers Needed', body:'We are looking for dedicated volunteers to support our children\'s ministry on Sundays. If you are passionate about children, please contact Sister Abena.', date:'Mar 10', urgent:false, dept:'Children\'s Church' },
  { id:4, title:'Annual Budget Meeting', body:'All church members are invited to the annual budget review and planning meeting on April 2nd at 4 PM in the main hall. Attendance is strongly encouraged.', date:'Mar 8', urgent:false, dept:'All' },
];

const PROJECTS = [
  { id:1, title:'Church Building Renovation', desc:'Expanding the main sanctuary to accommodate our growing congregation. Phase 2 includes new seating and acoustic upgrades.', emoji:'🏛️', target:150000, raised:97000, updates:8 },
  { id:2, title:'School Sponsorship Fund', desc:'Providing scholarships for 50 children of church members who cannot afford secondary school fees.', emoji:'📚', target:30000, raised:22500, updates:5 },
  { id:3, title:'Community Borehole Project', desc:'Providing clean drinking water to three villages near our church community. Currently drilling the second borehole.', emoji:'💧', target:45000, raised:31000, updates:12 },
];

const SCHEDULE = [
  { time:'8:00', name:'Praise & Worship', preacher:'Worship Team', tag:'Sunday' },
  { time:'8:45', name:'Announcements', preacher:'Church Secretary', tag:'Sunday' },
  { time:'9:00', name:'Main Sermon', preacher:'Pastor David Osei', tag:'Sunday' },
  { time:'10:30', name:'Altar Call & Prayer', preacher:'Elder John Frimpong', tag:'Sunday' },
  { time:'11:00', name:'Offering & Tithes', preacher:'Deacon Michael Boateng', tag:'Sunday' },
  { time:'11:30', name:'Closing Prayers', preacher:'Pastor David Osei', tag:'Sunday' },
];

const PRAYER_REQUESTS = [
  { from:'Emmanuel K.', time:'2 hours ago', body:'Please pray for my upcoming job interview on Thursday. I believe God will open this door.', tag:'Career' },
  { from:'Grace M.', time:'5 hours ago', body:'Requesting prayer for my mother who is recovering from surgery. Trusting God for complete healing.', tag:'Health' },
  { from:'Anonymous', time:'1 day ago', body:'Prayer for my family to be reconciled. We have been estranged for two years and I believe God can restore us.', tag:'Family' },
];

const BIBLE_VERSES = [
  { verse: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.', ref: 'Jeremiah 29:11' },
  { verse: 'I can do all this through him who gives me strength.', ref: 'Philippians 4:13' },
  { verse: 'The Lord is my shepherd, I lack nothing.', ref: 'Psalm 23:1' },
  { verse: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.', ref: 'Proverbs 3:5-6' },
  { verse: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.', ref: 'John 3:16' },
];

// ===== NAV CONFIG =====
const MEMBER_NAV = [
  { section: 'Main' },
  { id:'dashboard', label:'Dashboard', icon:'⊞' },
  { id:'profile', label:'My Profile', icon:'👤' },
  { section: 'Church' },
  { id:'events', label:'Events', icon:'📅' },
  { id:'sermons', label:'Sermon Library', icon:'🎵' },
  { id:'schedule', label:'Service Schedule', icon:'🕐' },
  { id:'announcements', label:'Announcements', icon:'📢', badge:2 },
  { section: 'Personal' },
  { id:'attendance', label:'My Attendance', icon:'✅' },
  { id:'giving', label:'Giving / Tithes', icon:'💛' },
  { id:'projects', label:'Church Projects', icon:'🏗️' },
  { id:'prayer', label:'Prayer Requests', icon:'🙏' },
  { id:'messages', label:'Message Admin', icon:'✉️' },
  { id:'bible', label:'Bible & Devotional', icon:'📖' },
];

const ADMIN_NAV = [
  { section: 'Overview' },
  { id:'dashboard', label:'Dashboard', icon:'⊞' },
  { id:'profile', label:'My Profile', icon:'👤' },
  { section: 'Management' },
  { id:'members', label:'Member Management', icon:'👥' },
  { id:'events', label:'Events', icon:'📅' },
  { id:'sermons', label:'Sermon Library', icon:'🎵' },
  { id:'schedule', label:'Service Schedule', icon:'🕐' },
  { id:'announcements', label:'Announcements', icon:'📢' },
  { section: 'Finance & Admin' },
  { id:'attendance', label:'Attendance', icon:'✅' },
  { id:'giving', label:'Finance & Giving', icon:'💛' },
  { id:'projects', label:'Projects', icon:'🏗️' },
  { id:'partners', label:'Partners', icon:'🤝' },
  { id:'prayer', label:'Prayer Requests', icon:'🙏' },
  { id:'messages', label:'Communications', icon:'✉️' },
  { section: 'System' },
  { id:'reports', label:'Reports & Analytics', icon:'📊' },
  { id:'security', label:'Roles & Security', icon:'🛡️' },
  { id:'bible', label:'Bible & Devotional', icon:'📖' },
];

// ===== AUTH =====
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach((t, i) => {
    t.classList.toggle('active', (tab === 'login' && i === 0) || (tab === 'register' && i === 1));
  });
  document.getElementById('loginForm').classList.toggle('hidden', tab !== 'login');
  document.getElementById('registerForm').classList.toggle('hidden', tab !== 'register');
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  if (email.includes('admin') || email.includes('pastor')) {
    loginAs('admin');
  } else {
    loginAs('member');
  }
}

function handleRegister(e) {
  e.preventDefault();
  loginAs('member');
  showToast('Account created successfully! Welcome to GracePoint 🙏', 'success');
}

function demoLogin(role) {
  loginAs(role);
}

function loginAs(role) {
  currentUser = { ...DEMO_USERS[role] };
  document.getElementById('authOverlay').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  initApp();
  showPage('dashboard');
}

function handleLogout() {
  currentUser = null;
  document.getElementById('app').classList.add('hidden');
  document.getElementById('authOverlay').classList.remove('hidden');
  document.getElementById('loginEmail').value = '';
  document.getElementById('loginPassword').value = '';
  if (window.innerWidth < 900) closeSidebar();
}

// ===== APP INIT =====
function initApp() {
  const initials = currentUser.initials;
  document.getElementById('sidebarAvatar').textContent = initials;
  document.getElementById('topAvatar').textContent = initials;
  document.getElementById('sidebarName').textContent = currentUser.name;
  const roleBadge = document.getElementById('sidebarRole');
  roleBadge.textContent = currentUser.role === 'admin' ? 'Administrator' : 'Member';
  roleBadge.className = 'role-badge ' + (currentUser.role === 'admin' ? 'admin' : '');
  buildNav();
}

function buildNav() {
  const nav = document.getElementById('sidebarNav');
  const items = currentUser.role === 'admin' ? ADMIN_NAV : MEMBER_NAV;
  nav.innerHTML = items.map(item => {
    if (item.section) return `<div class="nav-section-label">${item.section}</div>`;
    const badge = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
    return `<button class="nav-item" id="nav-${item.id}" onclick="showPage('${item.id}')">
      <span class="nav-icon">${item.icon}</span> ${item.label} ${badge}
    </button>`;
  }).join('');
}

// ===== NAVIGATION =====
function showPage(pageId) {
  currentPage = pageId;
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const activeNav = document.getElementById('nav-' + pageId);
  if (activeNav) activeNav.classList.add('active');

  const pages = {
    dashboard: currentUser.role === 'admin' ? renderAdminDashboard : renderMemberDashboard,
    profile: renderProfile,
    events: renderEvents,
    sermons: renderSermons,
    schedule: renderSchedule,
    announcements: renderAnnouncements,
    attendance: renderAttendance,
    giving: renderGiving,
    projects: renderProjects,
    prayer: renderPrayer,
    messages: renderMessages,
    bible: renderBible,
    members: renderMembers,
    partners: renderPartners,
    reports: renderReports,
    security: renderSecurity,
  };

  const titleMap = {
    dashboard:'Dashboard', profile:'My Profile', events:'Events',
    sermons:'Sermon Library', schedule:'Service Schedule', announcements:'Announcements',
    attendance:'Attendance', giving:'Giving & Tithes', projects:'Church Projects',
    prayer:'Prayer Requests', messages:'Messages', bible:'Bible & Devotional',
    members:'Member Management', partners:'Partners', reports:'Reports & Analytics',
    security:'Roles & Security'
  };

  document.getElementById('pageTitle').textContent = titleMap[pageId] || pageId;
  const container = document.getElementById('pageContainer');
  const fn = pages[pageId];
  if (fn) {
    container.innerHTML = `<div class="page-in">${fn()}</div>`;
    animateBars();
  }
  if (window.innerWidth < 900) closeSidebar();
}

// ===== SIDEBAR TOGGLE =====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
}

// ===== PAGES =====

function renderMemberDashboard() {
  const verse = BIBLE_VERSES[Math.floor(Math.random() * BIBLE_VERSES.length)];
  return `
  <div class="page-header">
    <h2>Good morning, ${currentUser.name.split(' ')[0]} 👋</h2>
    <p>Welcome back to GracePoint Church Portal</p>
  </div>

  <div class="stats-grid stagger">
    <div class="stat-card gold">
      <div class="stat-icon gold">🙏</div>
      <div class="stat-value">24</div>
      <div class="stat-label">Services Attended</div>
      <div class="stat-change">↑ 4 this month</div>
    </div>
    <div class="stat-card green">
      <div class="stat-icon green">📅</div>
      <div class="stat-value">3</div>
      <div class="stat-label">Upcoming Events</div>
    </div>
    <div class="stat-card blue">
      <div class="stat-icon blue">🎵</div>
      <div class="stat-value">12</div>
      <div class="stat-label">Sermons Watched</div>
    </div>
    <div class="stat-card orange">
      <div class="stat-icon orange">💛</div>
      <div class="stat-value">$1,200</div>
      <div class="stat-label">Total Given (2025)</div>
    </div>
  </div>

  <div class="bible-verse-card" style="margin-bottom:24px">
    <div class="bible-verse">"${verse.verse}"</div>
    <div class="bible-ref">— ${verse.ref}</div>
  </div>

  <div class="grid-2" style="gap:20px">
    <div class="card">
      <div class="card-header">
        <div class="card-title">Upcoming Events</div>
        <button class="btn-outline btn-sm" onclick="showPage('events')">View All</button>
      </div>
      ${EVENTS.slice(0,3).map(e => `
        <div class="schedule-item" style="margin-bottom:8px">
          <div class="sermon-thumb" style="width:42px;height:42px;font-size:18px">${e.emoji}</div>
          <div class="schedule-info">
            <div class="schedule-name">${e.title}</div>
            <div class="schedule-preacher">${e.date} • ${e.time} • ${e.location}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">Latest Announcements</div>
        <button class="btn-outline btn-sm" onclick="showPage('announcements')">View All</button>
      </div>
      ${ANNOUNCEMENTS.slice(0,3).map(a => `
        <div style="padding:10px 0; border-bottom:1px solid var(--cream-2)">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
            ${a.urgent ? '<span class="badge" style="background:rgba(224,82,82,0.12);color:var(--danger)">Urgent</span>' : ''}
            <span style="font-size:13px;font-weight:500">${a.title}</span>
          </div>
          <div style="font-size:12px;color:var(--text-muted)">${a.body.substring(0,80)}...</div>
        </div>
      `).join('')}
    </div>
  </div>

  <div class="card" style="margin-top:20px">
    <div class="card-header">
      <div class="card-title">Recent Sermons</div>
      <button class="btn-outline btn-sm" onclick="showPage('sermons')">View All</button>
    </div>
    <div class="sermon-list">
      ${SERMONS.slice(0,3).map(s => `
        <div class="sermon-item">
          <div class="sermon-thumb">${s.emoji}</div>
          <div class="sermon-info">
            <div class="sermon-title">${s.title}</div>
            <div class="sermon-meta">${s.speaker} • ${s.date} • ${s.duration}</div>
          </div>
          <div class="sermon-actions">
            <button class="btn-outline btn-sm">▶ Play</button>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

function renderAdminDashboard() {
  return `
  <div class="page-header">
    <h2>Admin Dashboard</h2>
    <p>Church overview and management center</p>
  </div>

  <div class="stats-grid stagger">
    <div class="stat-card gold">
      <div class="stat-icon gold">👥</div>
      <div class="stat-value">842</div>
      <div class="stat-label">Total Members</div>
      <div class="stat-change">↑ 23 new this month</div>
    </div>
    <div class="stat-card green">
      <div class="stat-icon green">✅</div>
      <div class="stat-value">78%</div>
      <div class="stat-label">Attendance Rate</div>
      <div class="stat-change">↑ 5% vs last month</div>
    </div>
    <div class="stat-card blue">
      <div class="stat-icon blue">💰</div>
      <div class="stat-value">$48.2K</div>
      <div class="stat-label">Monthly Giving</div>
      <div class="stat-change">↑ $4.2K vs last month</div>
    </div>
    <div class="stat-card orange">
      <div class="stat-icon orange">📅</div>
      <div class="stat-value">6</div>
      <div class="stat-label">Events This Month</div>
    </div>
  </div>

  <div class="grid-2" style="gap:20px;margin-bottom:20px">
    <div class="card">
      <div class="card-header">
        <div class="card-title">Attendance This Month</div>
      </div>
      <div class="chart-bars" id="attendanceChart">
        ${[65,72,88,58,70,85,78,90,65,75,80,92].map((h, i) => 
          `<div class="chart-bar" style="height:${h}%" data-value="${Math.round(h*8)}"></div>`
        ).join('')}
      </div>
      <div class="chart-labels">
        ${['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12'].map(l => `<span>${l}</span>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title">Monthly Revenue</div>
      </div>
      <div class="chart-bars" id="revenueChart">
        ${[40,55,70,48,62,78,65,82,58,72,88,76].map((h, i) => 
          `<div class="chart-bar secondary" style="height:${h}%" data-value="$${Math.round(h*500)}"></div>`
        ).join('')}
      </div>
      <div class="chart-labels">
        ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(l => `<span>${l}</span>`).join('')}
      </div>
    </div>
  </div>

  <div class="grid-2" style="gap:20px">
    <div class="card">
      <div class="card-header">
        <div class="card-title">Recent Members</div>
        <button class="btn-outline btn-sm" onclick="showPage('members')">View All</button>
      </div>
      <div class="table-container">
        <table>
          <thead><tr><th>Name</th><th>Dept</th><th>Status</th></tr></thead>
          <tbody>
            ${MEMBERS.slice(0,4).map(m => `
              <tr>
                <td><div class="td-avatar">
                  <div class="td-avatar-circle">${m.initials}</div>
                  <div>
                    <div style="font-weight:500">${m.name}</div>
                    <div style="font-size:11px;color:var(--text-light)">${m.id}</div>
                  </div>
                </div></td>
                <td style="font-size:13px;color:var(--text-muted)">${m.dept}</td>
                <td><span class="badge badge-${m.status}">${m.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title">Prayer Requests</div>
        <button class="btn-outline btn-sm" onclick="showPage('prayer')">Manage</button>
      </div>
      ${PRAYER_REQUESTS.map(p => `
        <div class="prayer-item">
          <div class="prayer-header">
            <span class="prayer-from">${p.from}</span>
            <span class="prayer-time">${p.time}</span>
          </div>
          <div class="prayer-body">${p.body.substring(0,90)}...</div>
          <span class="prayer-tag">🙏 ${p.tag}</span>
        </div>
      `).join('')}
    </div>
  </div>`;
}

function renderMembers() {
  return `
  <div class="page-header-row">
    <div class="page-header" style="margin-bottom:0">
      <h2>Member Management</h2>
      <p>${MEMBERS.length} registered members</p>
    </div>
    <div class="toolbar">
      <div class="search-bar">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="Search members..." oninput="filterMembers(this.value)">
      </div>
      <button class="btn-primary" onclick="openAddMember()">+ Add Member</button>
    </div>
  </div>

  <div class="card" style="margin-top:20px">
    <div class="table-container">
      <table id="membersTable">
        <thead><tr>
          <th>Member</th><th>Department</th><th>Joined</th><th>Role</th><th>Status</th><th>Actions</th>
        </tr></thead>
        <tbody>
          ${MEMBERS.map(m => `
            <tr>
              <td><div class="td-avatar">
                <div class="td-avatar-circle">${m.initials}</div>
                <div>
                  <div style="font-weight:500">${m.name}</div>
                  <div style="font-size:11px;color:var(--text-light)">${m.id} • ${m.email}</div>
                </div>
              </div></td>
              <td>${m.dept}</td>
              <td style="color:var(--text-muted);font-size:13px">${m.joined}</td>
              <td><span class="badge badge-${m.role}">${m.role}</span></td>
              <td><span class="badge badge-${m.status}">${m.status}</span></td>
              <td>
                <div style="display:flex;gap:6px">
                  <button class="btn-outline btn-sm" onclick="showToast('Editing ${m.name}...')">Edit</button>
                  <button class="btn-outline btn-sm btn-danger" onclick="showToast('Member removed','error')">Delete</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function filterMembers(q) {
  const rows = document.querySelectorAll('#membersTable tbody tr');
  rows.forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q.toLowerCase()) ? '' : 'none';
  });
}

function openAddMember() {
  openModal('Add New Member', `
    <div class="auth-form">
      <div class="form-row-two">
        <div class="form-group"><label>First Name</label><input type="text" placeholder="John"></div>
        <div class="form-group"><label>Last Name</label><input type="text" placeholder="Doe"></div>
      </div>
      <div class="form-group"><label>Email</label><input type="email" placeholder="john@email.com"></div>
      <div class="form-group"><label>Phone</label><input type="tel" placeholder="+1 234 567 8900"></div>
      <div class="form-group"><label>Department</label>
        <select>
          <option>Worship Team</option><option>Youth Ministry</option>
          <option>Children's Church</option><option>Ushering</option>
          <option>Media & Tech</option><option>Prayer Team</option>
        </select>
      </div>
      <div class="form-group"><label>Role</label>
        <select><option>member</option><option>admin</option></select>
      </div>
      <button class="btn-primary full" onclick="closeModal();showToast('Member added successfully! 🎉','success')">Add Member</button>
    </div>
  `);
}

function renderEvents() {
  return `
  <div class="page-header-row">
    <div class="page-header" style="margin-bottom:0">
      <h2>Events</h2>
      <p>Upcoming church events and programs</p>
    </div>
    ${currentUser.role === 'admin' ? `<button class="btn-primary" onclick="openCreateEvent()">+ Create Event</button>` : ''}
  </div>
  <div class="events-grid stagger" style="margin-top:20px">
    ${EVENTS.map(e => `
      <div class="event-card" onclick="viewEvent(${e.id})">
        <div class="event-banner" style="background:linear-gradient(135deg,#f5e9c8,#e8d4a0)">
          <div class="event-banner-bg">${e.emoji}</div>
          <div class="event-date-chip">
            <div class="date-day">${e.day}</div>
            <div class="date-month">${e.month}</div>
          </div>
        </div>
        <div class="event-body">
          <div class="event-title">${e.title}</div>
          <div class="event-meta">
            <span>🕐 ${e.time}</span>
            <span>📍 ${e.location}</span>
          </div>
          ${e.registered 
            ? `<span class="badge badge-active">✓ Registered</span>`
            : `<button class="btn-primary btn-sm" onclick="event.stopPropagation();registerEvent(${e.id})">Register</button>`
          }
        </div>
      </div>
    `).join('')}
  </div>`;
}

function viewEvent(id) {
  const e = EVENTS.find(ev => ev.id === id);
  if (!e) return;
  openModal(e.title, `
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;padding:20px;background:var(--cream);border-radius:var(--radius)">
      <span style="font-size:48px">${e.emoji}</span>
      <div>
        <div style="font-size:13px;color:var(--text-muted)">Date & Time</div>
        <div style="font-size:16px;font-weight:600">${e.date} at ${e.time}</div>
        <div style="font-size:13px;color:var(--text-muted);margin-top:4px">📍 ${e.location}</div>
      </div>
    </div>
    <p style="font-size:14px;color:var(--text-muted);line-height:1.7;margin-bottom:20px">${e.desc}</p>
    ${!e.registered 
      ? `<button class="btn-primary full" onclick="registerEvent(${e.id});closeModal()">Register for This Event</button>`
      : `<div style="text-align:center;padding:14px;background:rgba(76,175,114,0.08);border-radius:var(--radius);color:var(--success);font-weight:500">✓ You are registered for this event</div>`
    }
  `);
}

function registerEvent(id) {
  const e = EVENTS.find(ev => ev.id === id);
  if (e) { e.registered = true; showToast(`Registered for "${e.title}"! 🎉`, 'success'); showPage('events'); }
}

function openCreateEvent() {
  openModal('Create New Event', `
    <div class="auth-form">
      <div class="form-group"><label>Event Title</label><input type="text" placeholder="Event name..."></div>
      <div class="form-row-two">
        <div class="form-group"><label>Date</label><input type="date"></div>
        <div class="form-group"><label>Time</label><input type="time"></div>
      </div>
      <div class="form-group"><label>Location</label><input type="text" placeholder="Main Sanctuary..."></div>
      <div class="form-group"><label>Description</label><textarea rows="3" placeholder="Event description..."></textarea></div>
      <button class="btn-primary full" onclick="closeModal();showToast('Event created successfully! 📅','success')">Create Event</button>
    </div>
  `);
}

function renderSermons() {
  return `
  <div class="page-header-row">
    <div class="page-header" style="margin-bottom:0">
      <h2>Sermon Library</h2>
      <p>Messages from our shepherds</p>
    </div>
    <div class="toolbar">
      <div class="search-bar">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="Search by topic, speaker...">
      </div>
      ${currentUser.role === 'admin' ? `<button class="btn-primary" onclick="openModal('Upload Sermon', uploadSermonForm())">+ Upload</button>` : ''}
    </div>
  </div>

  <div style="display:flex;gap:8px;margin:20px 0;flex-wrap:wrap">
    ${['All','Faith','Purpose','Grace','Prayer','Holy Spirit'].map((t,i) => 
      `<button class="btn-outline btn-sm ${i===0?'active':''}" style="${i===0?'background:var(--gold);color:var(--dark);border-color:var(--gold)':''}" 
       onclick="document.querySelectorAll('.topic-filter').forEach(b=>b.style.background='');this.style.background='var(--gold)';this.style.color='var(--dark)';this.style.borderColor='var(--gold)'">${t}</button>`
    ).join('')}
  </div>

  <div class="sermon-list stagger">
    ${SERMONS.map(s => `
      <div class="sermon-item">
        <div class="sermon-thumb">${s.emoji}</div>
        <div class="sermon-info">
          <div class="sermon-title">${s.title}</div>
          <div class="sermon-meta">${s.speaker} • ${s.date} • ${s.duration} • <span class="badge badge-${s.type==='video'?'admin':'member'}">${s.type}</span></div>
        </div>
        <div class="sermon-actions">
          <button class="btn-outline btn-sm" onclick="showToast('Playing: ${s.title}...')">▶ Play</button>
          <button class="btn-outline btn-sm" onclick="showToast('Downloading notes...')">📄 Notes</button>
          ${currentUser.role==='admin'?`<button class="btn-outline btn-sm btn-danger" onclick="showToast('Sermon deleted','error')">🗑</button>`:''}
        </div>
      </div>
    `).join('')}
  </div>`;
}

function uploadSermonForm() {
  return `<div class="auth-form">
    <div class="form-group"><label>Sermon Title</label><input type="text" placeholder="Title..."></div>
    <div class="form-group"><label>Speaker</label><input type="text" placeholder="Speaker name..."></div>
    <div class="form-row-two">
      <div class="form-group"><label>Date</label><input type="date"></div>
      <div class="form-group"><label>Topic</label><input type="text" placeholder="Topic..."></div>
    </div>
    <div class="form-group"><label>Type</label><select><option>Audio</option><option>Video</option></select></div>
    <div class="form-group"><label>Upload File</label><input type="file" accept="audio/*,video/*"></div>
    <button class="btn-primary full" onclick="closeModal();showToast('Sermon uploaded successfully! 🎬','success')">Upload Sermon</button>
  </div>`;
}

function renderSchedule() {
  return `
  <div class="page-header-row">
    <div class="page-header" style="margin-bottom:0">
      <h2>Service Schedule</h2>
      <p>This Sunday's program order</p>
    </div>
    ${currentUser.role==='admin'?`<button class="btn-primary" onclick="showToast('Schedule editor opened')">Edit Schedule</button>`:''}
  </div>

  <div class="card" style="margin-top:20px;margin-bottom:20px">
    <div style="display:flex;align-items:center;gap:16px;padding-bottom:20px;border-bottom:1px solid var(--cream-2);margin-bottom:20px">
      <div style="width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,var(--gold),var(--gold-light));display:flex;align-items:center;justify-content:center;font-size:24px">📖</div>
      <div>
        <div style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600">Sunday Morning Service</div>
        <div style="font-size:13px;color:var(--text-muted)">March 23, 2025 • Main Sanctuary • 8:00 AM</div>
      </div>
    </div>
    <div class="schedule-list">
      ${SCHEDULE.map(s => `
        <div class="schedule-item">
          <div class="schedule-time">${s.time}</div>
          <div class="schedule-info">
            <div class="schedule-name">${s.name}</div>
            <div class="schedule-preacher">${s.preacher}</div>
          </div>
          <span class="badge badge-active">${s.tag}</span>
        </div>
      `).join('')}
    </div>
  </div>`;
}

function renderAnnouncements() {
  return `
  <div class="page-header-row">
    <div class="page-header" style="margin-bottom:0">
      <h2>Announcements</h2>
      <p>Church notices and updates</p>
    </div>
    ${currentUser.role==='admin'?`<button class="btn-primary" onclick="openPostAnnouncement()">+ Post Announcement</button>`:''}
  </div>

  <div class="announcement-list stagger" style="margin-top:20px">
    ${ANNOUNCEMENTS.map(a => `
      <div class="announcement-item ${a.urgent?'urgent':''}">
        <div class="ann-header">
          <div>
            ${a.urgent?`<span class="badge" style="background:rgba(224,82,82,0.12);color:var(--danger);margin-bottom:6px;display:inline-flex">🚨 Urgent</span><br>`:''}
            <div class="ann-title">${a.title}</div>
          </div>
          <div style="text-align:right">
            <div class="ann-date">${a.date}</div>
            <span class="badge badge-member" style="margin-top:4px">${a.dept}</span>
          </div>
        </div>
        <div class="ann-body">${a.body}</div>
        ${currentUser.role==='admin'?`
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="btn-outline btn-sm" onclick="showToast('Editing announcement...')">Edit</button>
            <button class="btn-outline btn-sm btn-danger" onclick="showToast('Announcement deleted','error')">Delete</button>
          </div>
        `:''}
      </div>
    `).join('')}
  </div>`;
}

function openPostAnnouncement() {
  openModal('Post Announcement', `
    <div class="auth-form">
      <div class="form-group"><label>Title</label><input type="text" placeholder="Announcement title..."></div>
      <div class="form-group"><label>Message</label><textarea rows="4" placeholder="Write your announcement..."></textarea></div>
      <div class="form-row-two">
        <div class="form-group"><label>Department</label>
          <select><option>All</option><option>Worship Team</option><option>Youth Ministry</option><option>Children's Church</option></select>
        </div>
        <div class="form-group"><label>Priority</label>
          <select><option>Normal</option><option>Urgent</option></select>
        </div>
      </div>
      <button class="btn-primary full" onclick="closeModal();showToast('Announcement posted! 📢','success')">Post Announcement</button>
    </div>
  `);
}

function renderAttendance() {
  const weeks = Array.from({length:48}, (_, i) => Math.random() > 0.25);
  return `
  <div class="page-header">
    <h2>${currentUser.role==='admin'?'Attendance Management':'My Attendance'}</h2>
    <p>${currentUser.role==='admin'?'Track and report member attendance':'Your personal attendance history'}</p>
  </div>

  ${currentUser.role==='admin' ? `
  <div class="stats-grid" style="margin-bottom:20px">
    <div class="stat-card gold"><div class="stat-icon gold">📊</div><div class="stat-value">78%</div><div class="stat-label">Average Attendance</div></div>
    <div class="stat-card green"><div class="stat-icon green">👥</div><div class="stat-value">656</div><div class="stat-label">Last Sunday Count</div></div>
    <div class="stat-card blue"><div class="stat-icon blue">📈</div><div class="stat-value">+42</div><div class="stat-label">Visitors This Month</div></div>
    <div class="stat-card orange"><div class="stat-icon orange">⬇️</div><div class="stat-value">186</div><div class="stat-label">Absent Last Sunday</div></div>
  </div>
  ` : ''}

  <div class="grid-2">
    <div class="card">
      <div class="card-header">
        <div class="card-title">Attendance Heatmap (2025)</div>
        <span style="font-size:12px;color:var(--text-muted)">${weeks.filter(Boolean).length} services attended</span>
      </div>
      <div style="display:flex;gap:4px;flex-wrap:wrap">
        ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => `<div style="width:calc(14.28% - 4px);font-size:10px;text-align:center;color:var(--text-light);padding:2px 0">${d}</div>`).join('')}
        ${weeks.map(present => `
          <div style="width:calc(14.28% - 4px);aspect-ratio:1;border-radius:3px;background:${present?'var(--gold)':'var(--cream-2)'};opacity:${present?'1':'0.6'}"></div>
        `).join('')}
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-top:12px;font-size:11px;color:var(--text-muted)">
        <div style="width:12px;height:12px;border-radius:2px;background:var(--cream-2)"></div> Absent
        <div style="width:12px;height:12px;border-radius:2px;background:var(--gold)"></div> Present
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title">Summary</div>
        ${currentUser.role==='admin'?`<button class="btn-primary btn-sm" onclick="showToast('Exporting report...')">Export</button>`:''}
      </div>
      ${[
        {label:'Services This Year',value:'48',pct:null},
        {label:'Attended',value:`${weeks.filter(Boolean).length}`,pct:Math.round(weeks.filter(Boolean).length/48*100)},
        {label:'Missed',value:`${weeks.filter(v=>!v).length}`,pct:null},
        {label:'Streak (Current)',value:'4 weeks',pct:null},
      ].map(s => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--cream-2)">
          <span style="font-size:13px;color:var(--text-muted)">${s.label}</span>
          <div style="text-align:right">
            <span style="font-size:15px;font-weight:600">${s.value}</span>
            ${s.pct!==null?`<span style="font-size:11px;color:var(--success);margin-left:6px">${s.pct}%</span>`:''}
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

function renderGiving() {
  return `
  <div class="page-header">
    <h2>${currentUser.role==='admin'?'Finance & Giving':'Giving & Tithes'}</h2>
  </div>

  ${currentUser.role==='admin' ? `
  <div class="stats-grid" style="margin-bottom:20px">
    <div class="stat-card gold"><div class="stat-icon gold">💰</div><div class="stat-value">$48.2K</div><div class="stat-label">Total This Month</div><div class="stat-change">↑ $4.2K vs last month</div></div>
    <div class="stat-card green"><div class="stat-icon green">🙏</div><div class="stat-value">$22.1K</div><div class="stat-label">Tithes</div></div>
    <div class="stat-card blue"><div class="stat-icon blue">💛</div><div class="stat-value">$18.4K</div><div class="stat-label">Offerings</div></div>
    <div class="stat-card orange"><div class="stat-icon orange">📊</div><div class="stat-value">$7.7K</div><div class="stat-label">Donations</div></div>
  </div>
  ` : ''}

  <div class="grid-2">
    <div class="card">
      <div class="card-header"><div class="card-title">Make a Gift</div></div>
      <div class="giving-options" id="amountOptions">
        ${[50,100,200,500,1000,'Custom'].map(a => `
          <div class="amount-chip ${a===100?'selected':''}" onclick="selectAmount('${a}', this)">
            ${typeof a === 'number' ? `$${a}` : a}
            ${a==='Custom'?`<p>Enter amount</p>`:''}
          </div>
        `).join('')}
      </div>
      <div class="form-group" id="customAmountField" style="display:none;margin-bottom:16px">
        <label>Custom Amount</label>
        <input type="number" placeholder="Enter amount...">
      </div>
      <div class="form-group" style="margin-bottom:16px">
        <label>Giving Type</label>
        <select>
          <option>Tithe</option>
          <option>Offering</option>
          <option>First Fruits</option>
          <option>Building Fund</option>
          <option>Missions</option>
          <option>Project Donation</option>
        </select>
      </div>
      <div class="form-group" style="margin-bottom:20px">
        <label>Payment Method</label>
        <select>
          <option>Bank Transfer</option>
          <option>Mobile Money</option>
          <option>Credit/Debit Card</option>
          <option>Cash (Mark as Given)</option>
        </select>
      </div>
      <button class="btn-primary full" onclick="showToast('Payment processed! Thank you for your generosity 🙏','success')">Give Now</button>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title">Giving History</div>
        <button class="btn-outline btn-sm" onclick="showToast('Downloading statement...')">📄 Statement</button>
      </div>
      <div class="table-container">
        <table>
          <thead><tr><th>Date</th><th>Type</th><th>Amount</th></tr></thead>
          <tbody>
            ${[
              {date:'Mar 16',type:'Tithe',amount:'$120'},
              {date:'Mar 9',type:'Offering',amount:'$50'},
              {date:'Mar 2',type:'Building Fund',amount:'$200'},
              {date:'Feb 23',type:'Tithe',amount:'$120'},
              {date:'Feb 16',type:'Offering',amount:'$50'},
            ].map(r => `
              <tr>
                <td style="font-size:13px">${r.date}</td>
                <td><span class="badge badge-member">${r.type}</span></td>
                <td style="font-weight:600;color:var(--success)">${r.amount}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function selectAmount(val, el) {
  document.querySelectorAll('.amount-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('customAmountField').style.display = val === 'Custom' ? 'flex' : 'none';
}

function renderProjects() {
  return `
  <div class="page-header-row">
    <div class="page-header" style="margin-bottom:0">
      <h2>Church Projects</h2>
      <p>Active fundraising and development projects</p>
    </div>
    ${currentUser.role==='admin'?`<button class="btn-primary" onclick="showToast('Project creator opened')">+ New Project</button>`:''}
  </div>

  <div class="grid-3 stagger" style="margin-top:20px">
    ${PROJECTS.map(p => {
      const pct = Math.round(p.raised/p.target*100);
      return `
        <div class="project-card">
          <div class="project-img">${p.emoji}</div>
          <div class="project-title">${p.title}</div>
          <div class="project-desc">${p.desc}</div>
          <div class="project-progress">
            <div class="project-progress-label">
              <span>$${p.raised.toLocaleString()} raised</span>
              <span>${pct}%</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
            <div style="font-size:11px;color:var(--text-light);margin-top:4px">Goal: $${p.target.toLocaleString()}</div>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn-primary btn-sm" onclick="showToast('Redirecting to payment...','success')" style="flex:1">Contribute</button>
            <button class="btn-outline btn-sm" onclick="showToast('Loading ${p.updates} updates...')">Updates (${p.updates})</button>
          </div>
        </div>
      `;
    }).join('')}
  </div>`;
}

function renderPartners() {
  const partners = [
    {name:'Grace Foundation', type:'Sponsor', contribution:'$5,000/mo', joined:'Jan 2024', initials:'GF'},
    {name:'Emmanuel Corp', type:'Partner', contribution:'$2,500/mo', joined:'Mar 2023', initials:'EC'},
    {name:'Livingstone Trust', type:'Donor', contribution:'$10,000 (one-time)', joined:'Dec 2023', initials:'LT'},
  ];
  return `
  <div class="page-header-row">
    <div class="page-header" style="margin-bottom:0"><h2>Partners & Sponsors</h2></div>
    <button class="btn-primary" onclick="showToast('Adding new partner...')">+ Add Partner</button>
  </div>
  <div class="card" style="margin-top:20px">
    <div class="table-container">
      <table>
        <thead><tr><th>Partner</th><th>Type</th><th>Contribution</th><th>Since</th><th>Actions</th></tr></thead>
        <tbody>
          ${partners.map(p => `<tr>
            <td><div class="td-avatar">
              <div class="td-avatar-circle" style="background:var(--info)">${p.initials}</div>
              <span>${p.name}</span>
            </div></td>
            <td><span class="badge badge-admin">${p.type}</span></td>
            <td style="font-weight:600;color:var(--success)">${p.contribution}</td>
            <td style="color:var(--text-muted);font-size:13px">${p.joined}</td>
            <td><button class="btn-outline btn-sm" onclick="showToast('Viewing partner history...')">View History</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function renderPrayer() {
  return `
  <div class="page-header-row">
    <div class="page-header" style="margin-bottom:0">
      <h2>Prayer Requests</h2>
      <p>Submit and view prayer requests</p>
    </div>
    <button class="btn-primary" onclick="openPrayerForm()">+ Submit Request</button>
  </div>
  <div style="margin-top:20px">
    ${PRAYER_REQUESTS.map(p => `
      <div class="prayer-item">
        <div class="prayer-header">
          <div style="display:flex;align-items:center;gap:8px">
            <div class="td-avatar-circle" style="width:28px;height:28px;font-size:11px">${p.from.split(' ').map(n=>n[0]).join('')}</div>
            <span class="prayer-from">${p.from}</span>
          </div>
          <span class="prayer-time">${p.time}</span>
        </div>
        <div class="prayer-body">${p.body}</div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px">
          <span class="prayer-tag">🙏 ${p.tag}</span>
          ${currentUser.role==='admin'?`<button class="btn-outline btn-sm" onclick="showToast('Opening reply...')">Respond</button>`:`<button class="btn-outline btn-sm" onclick="showToast('Praying 🙏')">I\'m Praying</button>`}
        </div>
      </div>
    `).join('')}
  </div>`;
}

function openPrayerForm() {
  openModal('Submit Prayer Request', `
    <div class="auth-form">
      <div class="form-group"><label>Category</label>
        <select>
          <option>Health & Healing</option><option>Family</option>
          <option>Career</option><option>Finance</option>
          <option>Spiritual Growth</option><option>Other</option>
        </select>
      </div>
      <div class="form-group"><label>Your Request</label>
        <textarea rows="5" placeholder="Share your prayer request..."></textarea>
      </div>
      <div class="form-group">
        <label class="checkbox-label"><input type="checkbox"> Post anonymously</label>
      </div>
      <button class="btn-primary full" onclick="closeModal();showToast('Prayer request submitted! 🙏','success')">Submit Request</button>
    </div>
  `);
}

function renderMessages() {
  const msgs = [
    {text:'Hello! I have a question about the upcoming Easter service.',sent:true,time:'10:32 AM'},
    {text:'Hello! Thank you for reaching out. The Easter service will begin at 8:00 AM. Please arrive by 7:30 AM.',sent:false,time:'10:45 AM'},
    {text:'Thank you Pastor. Will there be a special program for children?',sent:true,time:'11:02 AM'},
    {text:'Yes! Children\'s Church will run simultaneously with the main service in the Children\'s Hall.',sent:false,time:'11:15 AM'},
  ];
  return `
  <div class="page-header">
    <h2>Message Center</h2>
    <p>${currentUser.role==='admin'?'Manage all communications':'Send a message to the administration'}</p>
  </div>
  <div class="card">
    <div class="msg-thread" id="msgThread">
      ${msgs.map(m => `
        <div>
          <div class="msg-bubble ${m.sent?'sent':'received'}">${m.text}</div>
          <div class="msg-time" style="text-align:${m.sent?'right':'left'}">${m.time}</div>
        </div>
      `).join('')}
    </div>
    <div class="msg-input-row">
      <input type="text" id="msgInput" placeholder="Type your message..." onkeydown="if(event.key==='Enter')sendMessage()">
      <button class="btn-primary" onclick="sendMessage()">Send</button>
    </div>
  </div>`;
}

function sendMessage() {
  const input = document.getElementById('msgInput');
  if (!input || !input.value.trim()) return;
  const thread = document.getElementById('msgThread');
  const now = new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  const div = document.createElement('div');
  div.innerHTML = `<div class="msg-bubble sent">${input.value}</div><div class="msg-time" style="text-align:right">${now}</div>`;
  thread.appendChild(div);
  input.value = '';
  thread.scrollTop = thread.scrollHeight;
  setTimeout(() => {
    const reply = document.createElement('div');
    reply.innerHTML = `<div class="msg-bubble received">Thank you for your message. The administration will respond shortly.</div><div class="msg-time">${now}</div>`;
    thread.appendChild(reply);
    thread.scrollTop = thread.scrollHeight;
  }, 1200);
}

function renderBible() {
  const verse = BIBLE_VERSES[Math.floor(Math.random() * BIBLE_VERSES.length)];
  const devotionals = [
    {title:'Walking in Faith',reading:'Hebrews 11:1-6',summary:'Faith is the substance of things hoped for and the evidence of things not seen. Today we explore what it means to truly walk by faith.'},
    {title:'The Power of Prayer',reading:'Matthew 6:5-15',summary:'Jesus gives us a model for prayer. Discover how consistent, heartfelt prayer transforms not just our circumstances, but our character.'},
    {title:'Love One Another',reading:'John 13:34-35',summary:'The greatest commandment is to love. This week\'s devotional explores how love is the distinguishing mark of every true believer.'},
  ];
  return `
  <div class="page-header"><h2>Bible & Devotional</h2><p>Daily scripture and devotional readings</p></div>

  <div class="bible-verse-card" style="margin-bottom:24px">
    <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:var(--gold);margin-bottom:12px">Verse of the Day</div>
    <div class="bible-verse">"${verse.verse}"</div>
    <div class="bible-ref">— ${verse.ref}</div>
    <button onclick="document.querySelector('.bible-verse').innerHTML=BIBLE_VERSES[Math.floor(Math.random()*BIBLE_VERSES.length)].verse;document.querySelector('.bible-ref').innerHTML='— '+BIBLE_VERSES[Math.floor(Math.random()*BIBLE_VERSES.length)].ref" 
      style="margin-top:16px;padding:8px 16px;border:1px solid rgba(201,168,76,0.3);background:transparent;border-radius:8px;color:var(--gold);cursor:pointer;font-size:12px">
      Next Verse →
    </button>
  </div>

  <div class="card-title" style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;margin-bottom:16px">This Week's Devotionals</div>
  <div class="sermon-list stagger">
    ${devotionals.map((d,i) => `
      <div class="sermon-item" onclick="openModal('${d.title}','<div style=\\"padding:4px\\"><div style=\\"font-size:13px;color:var(--gold);margin-bottom:12px\\">📖 ${d.reading}</div><p style=\\"font-size:14px;color:var(--text-muted);line-height:1.7\\">${d.summary}</p></div>')">
        <div class="sermon-thumb" style="background:linear-gradient(135deg,var(--dark-2),var(--dark-4))">📖</div>
        <div class="sermon-info">
          <div class="sermon-title">${d.title}</div>
          <div class="sermon-meta">Daily Reading • ${d.reading}</div>
        </div>
        <button class="btn-outline btn-sm">Read →</button>
      </div>
    `).join('')}
  </div>`;
}

function renderProfile() {
  const u = currentUser;
  return `
  <div class="profile-hero">
    <div class="profile-avatar">${u.initials}</div>
    <div class="profile-details">
      <h2>${u.name}</h2>
      <p>${u.department} • ${u.role === 'admin' ? 'Administrator' : 'Member'}</p>
      <div class="profile-id">🆔 ${u.id}</div>
    </div>
    <button class="btn-outline btn-sm" style="margin-left:auto" onclick="openEditProfile()">Edit Profile</button>
  </div>

  <div class="grid-2">
    <div class="card">
      <div class="card-header"><div class="card-title">Personal Information</div></div>
      ${[
        {label:'Full Name', value:u.name},
        {label:'Email Address', value:u.email},
        {label:'Phone Number', value:u.phone},
        {label:'Address', value:u.address},
        {label:'Department', value:u.department},
        {label:'Member Since', value:u.joinDate},
      ].map(info => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--cream-2)">
          <span style="font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-light)">${info.label}</span>
          <span style="font-size:14px;font-weight:500">${info.value}</span>
        </div>
      `).join('')}
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">Quick Stats</div></div>
      ${[
        {label:'Services Attended', value:'24', icon:'✅'},
        {label:'Total Given (2025)', value:'$1,200', icon:'💛'},
        {label:'Events Registered', value:'3', icon:'📅'},
        {label:'Sermons Watched', value:'12', icon:'🎵'},
        {label:'Prayer Requests', value:'2', icon:'🙏'},
      ].map(s => `
        <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--cream-2)">
          <span style="font-size:20px">${s.icon}</span>
          <div>
            <div style="font-size:14px;font-weight:600">${s.value}</div>
            <div style="font-size:12px;color:var(--text-muted)">${s.label}</div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

function openEditProfile() {
  openModal('Edit Profile', `
    <div class="auth-form">
      <div class="form-row-two">
        <div class="form-group"><label>First Name</label><input type="text" value="${currentUser.name.split(' ')[0]}"></div>
        <div class="form-group"><label>Last Name</label><input type="text" value="${currentUser.name.split(' ')[1]||''}"></div>
      </div>
      <div class="form-group"><label>Email</label><input type="email" value="${currentUser.email}"></div>
      <div class="form-group"><label>Phone</label><input type="tel" value="${currentUser.phone}"></div>
      <div class="form-group"><label>Address</label><input type="text" value="${currentUser.address}"></div>
      <button class="btn-primary full" onclick="closeModal();showToast('Profile updated successfully! ✓','success')">Save Changes</button>
    </div>
  `);
}

function renderReports() {
  return `
  <div class="page-header"><h2>Reports & Analytics</h2><p>Church growth and financial analytics</p></div>
  <div class="stats-grid" style="margin-bottom:24px">
    <div class="stat-card gold"><div class="stat-icon gold">📈</div><div class="stat-value">+23%</div><div class="stat-label">Member Growth (YoY)</div></div>
    <div class="stat-card green"><div class="stat-icon green">💰</div><div class="stat-value">$542K</div><div class="stat-label">Total Revenue (2025)</div></div>
    <div class="stat-card blue"><div class="stat-icon blue">🎯</div><div class="stat-value">94%</div><div class="stat-label">Project Goal Achievement</div></div>
    <div class="stat-card orange"><div class="stat-icon orange">🌍</div><div class="stat-value">12</div><div class="stat-label">Missions Supported</div></div>
  </div>
  <div class="grid-2">
    <div class="card">
      <div class="card-header"><div class="card-title">Membership Growth</div></div>
      <div class="chart-bars" id="growthChart">
        ${[55,58,60,64,68,70,71,74,78,80,83,86].map((h, i) => 
          `<div class="chart-bar" style="height:${h}%" data-value="${Math.round(h*10)} members"></div>`
        ).join('')}
      </div>
      <div class="chart-labels">
        ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(l => `<span>${l}</span>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">Department Breakdown</div></div>
      ${[
        {dept:'Worship Team',count:124,pct:75},
        {dept:'Youth Ministry',count:210,pct:92},
        {dept:'Children\'s Church',count:98,pct:60},
        {dept:'Prayer Team',count:86,pct:80},
        {dept:'Media & Tech',count:45,pct:55},
        {dept:'Ushering',count:72,pct:68},
      ].map(d => `
        <div style="margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;margin-bottom:6px">
            <span style="font-size:13px;font-weight:500">${d.dept}</span>
            <span style="font-size:12px;color:var(--text-muted)">${d.count} members</span>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width:${d.pct}%"></div></div>
        </div>
      `).join('')}
    </div>
  </div>
  <div style="display:flex;gap:12px;margin-top:20px;flex-wrap:wrap">
    <button class="btn-primary" onclick="showToast('Generating PDF report...','success')">📄 Export PDF</button>
    <button class="btn-outline" onclick="showToast('Exporting to Excel...','success')">📊 Export Excel</button>
    <button class="btn-outline" onclick="showToast('Sending report via email...','success')">✉️ Email Report</button>
  </div>`;
}

function renderSecurity() {
  return `
  <div class="page-header"><h2>Roles & Security</h2><p>Manage user access and permissions</p></div>
  <div class="grid-2">
    <div class="card">
      <div class="card-header"><div class="card-title">Role Permissions</div></div>
      ${[
        {role:'Super Admin', perms:['All Access','Manage Admins','System Settings']},
        {role:'Admin / Pastor', perms:['Manage Members','Post Announcements','View Reports']},
        {role:'Department Head', perms:['Manage Department','Post Dept. Announcements']},
        {role:'Member', perms:['View Content','Register Events','Submit Requests']},
      ].map(r => `
        <div style="margin-bottom:16px;padding:14px;border-radius:var(--radius);background:var(--cream);border:1px solid var(--cream-2)">
          <div style="font-size:14px;font-weight:600;margin-bottom:8px">${r.role}</div>
          ${r.perms.map(p => `<span class="badge badge-active" style="margin-right:6px;margin-bottom:4px">✓ ${p}</span>`).join('')}
        </div>
      `).join('')}
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">Recent Activity</div></div>
      ${[
        {action:'Password reset', user:'Emma Kwame', time:'2 min ago', type:'warning'},
        {action:'New admin added', user:'Pastor David', time:'1 hour ago', type:'info'},
        {action:'Member account created', user:'John Doe', time:'3 hours ago', type:'success'},
        {action:'Failed login attempt', user:'Unknown', time:'5 hours ago', type:'danger'},
      ].map(a => `
        <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--cream-2)">
          <div style="width:8px;height:8px;border-radius:50%;background:var(--${a.type});flex-shrink:0"></div>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:500">${a.action}</div>
            <div style="font-size:11px;color:var(--text-muted)">${a.user}</div>
          </div>
          <span style="font-size:11px;color:var(--text-light)">${a.time}</span>
        </div>
      `).join('')}
      <button class="btn-primary btn-sm" style="width:100%;margin-top:16px" onclick="showToast('Downloading security log...')">Download Full Log</button>
    </div>
  </div>`;
}

// ===== MODAL =====
function openModal(title, content) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = content;
  document.getElementById('modal').classList.remove('hidden');
}
function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}
document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// ===== TOAST =====
function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast ' + type;
  toast.classList.remove('hidden');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.add('hidden'), 3000);
}

// ===== ANIMATE BARS =====
function animateBars() {
  setTimeout(() => {
    document.querySelectorAll('.progress-fill').forEach(bar => {
      const w = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => { bar.style.width = w; }, 50);
    });
  }, 100);
}
