/* ===== GRACEPOINT i18n TRANSLATIONS ===== */

let currentLang = 'fr'; // default

const T = {
  en: {
    // ===== AUTH =====
    signIn: 'Sign In', register: 'Register', emailAddress: 'Email Address',
    password: 'Password', rememberMe: 'Remember me', forgotPassword: 'Forgot password?',
    signInBtn: 'Sign In', createAccount: 'Create Account', demoAccounts: 'Demo Accounts:',
    memberDemo: '👤 Member Demo', adminDemo: '🛡️ Admin Demo',
    firstName: 'First Name', lastName: 'Last Name', phoneNumber: 'Phone Number',
    department: 'Department', selectDept: 'Select Department',
    worshipTeam: 'Worship Team', youthMinistry: 'Youth Ministry',
    childrensChurch: "Children's Church", ushering: 'Ushering',
    mediatech: 'Media & Tech', prayerTeam: 'Prayer Team', generalMember: 'General Member',
    portalSubtitle: 'Church Portal',

    // ===== NAV SECTIONS =====
    navMain: 'Main', navChurch: 'Church', navPersonal: 'Personal',
    navOverview: 'Overview', navManagement: 'Management', navFinance: 'Finance & Admin', navSystem: 'System',

    // ===== NAV ITEMS =====
    navDashboard: 'Dashboard', navProfile: 'My Profile', navCalendar: 'Calendar',
    navEvents: 'Events', navSermons: 'Sermon Library', navSchedule: 'Service Schedule',
    navAnnouncements: 'Announcements', navAttendance: 'My Attendance',
    navGiving: 'Giving / Tithes', navProjects: 'Church Projects',
    navPrayer: 'Prayer Requests', navMessages: 'Message Admin', navBible: 'The Bible',
    navMembers: 'Member Management', navPartners: 'Partners',
    navReports: 'Reports & Analytics', navSecurity: 'Roles & Security',
    navMgmtAttendance: 'Attendance', navMgmtGiving: 'Finance & Giving',
    navMgmtMessages: 'Communications',

    // ===== TOP BAR =====
    administrator: 'Administrator', member: 'Member', signOut: '⬡ Sign Out',

    // ===== PAGE TITLES =====
    titleDashboard: 'Dashboard', titleProfile: 'My Profile', titleCalendar: 'Calendar',
    titleEvents: 'Events', titleSermons: 'Sermon Library', titleSchedule: 'Service Schedule',
    titleAnnouncements: 'Announcements', titleAttendance: 'Attendance',
    titleGiving: 'Giving & Tithes', titleProjects: "Church Projects",
    titlePrayer: 'Prayer Requests', titleMessages: 'Messages', titleBible: 'The Bible',
    titleMembers: 'Member Management', titlePartners: 'Partners',
    titleReports: 'Reports & Analytics', titleSecurity: 'Roles & Security',

    // ===== DASHBOARD =====
    goodMorning: 'Good morning',
    welcomeBack: 'Welcome back to the GracePoint Portal',
    adminDashTitle: 'Admin Dashboard',
    churchOverview: 'Church overview and management center',
    servicesAttended: 'Services Attended', upcomingEvents: 'Upcoming Events',
    sermonsWatched: 'Sermons Watched', totalGiven: 'Total Given (2025)',
    thisMonth: 'this month', totalMembers: 'Total Members',
    attendanceRate: 'Attendance Rate', monthlyGiving: 'Monthly Giving',
    eventsThisMonth: 'Events This Month',
    newThisMonth: '↑ new this month', vsLastMonth: '↑ vs last month',
    recentMembers: 'Recent Members', viewAll: 'View All',
    recentSermons: 'Recent Sermons', upcomingEventsCard: 'Upcoming Events',
    latestAnnouncements: 'Latest Announcements',

    // ===== STATS =====
    attendanceThisMonth: 'Attendance This Month',
    monthlyRevenue: 'Monthly Revenue (FCFA)',

    // ===== CALENDAR =====
    calendarTitle: "Church Calendar", calendarSub: 'Upcoming events and programs',
    addEvent: '+ Add Event', today: "Today",
    eventsOf: 'Events of', noEvents: 'No events this month',
    registered: '✓ Registered', register: 'Register',
    months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    days: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],

    // ===== EVENTS =====
    eventsTitle: 'Events', eventsSub: 'Upcoming programs and activities',
    createEvent: '+ Create Event', registerEvent: "Register",
    registeredBadge: '✓ Registered', createEventModal: 'Create New Event',
    eventTitle: 'Event Title', eventDate: 'Date', eventTime: 'Time',
    eventLocation: 'Location', eventDesc: 'Description', eventCreate: 'Create Event',
    dateTime: 'Date & Time', registerForEvent: 'Register for This Event',
    alreadyRegistered: '✓ You are registered for this event',
    registeredToast: 'Registered for', viewEvent: 'View',

    // ===== SERMONS =====
    sermonsTitle: 'Sermon Library', sermonsSub: 'Messages from our shepherds',
    uploadSermon: '+ Upload', searchSermons: 'Search by topic, speaker...',
    playSermon: '▶ Play', downloadNotes: '📄 Notes', deleteSermon: '🗑',
    uploadSermonModal: 'Upload Sermon', sermonTitleLabel: 'Sermon Title',
    speakerLabel: 'Speaker', topicLabel: 'Topic', typeLabel: 'Type',
    uploadFile: 'Upload File', uploadBtn: 'Upload Sermon',
    topicAll: 'All', topicFaith: 'Faith', topicPurpose: 'Purpose',
    topicGrace: 'Grace', topicPrayer: 'Prayer', topicSpirit: 'Holy Spirit',

    // ===== SCHEDULE =====
    scheduleTitle: 'Service Schedule', scheduleSub: "This Sunday's program",
    editSchedule: 'Edit Schedule', sundayService: 'Sunday Morning Service',

    // ===== ANNOUNCEMENTS =====
    announcementsTitle: 'Announcements', announcementsSub: 'Church notices and updates',
    postAnnouncement: '+ Post Announcement', urgent: '🚨 Urgent',
    editAnn: 'Edit', deleteAnn: 'Delete', postAnnModal: 'Post Announcement',
    annTitle: 'Title', annMessage: 'Message', annDept: 'Department',
    annPriority: 'Priority', annNormal: 'Normal', annUrgent: 'Urgent',
    annAll: 'All', postBtn: 'Post Announcement', allDepts: 'All',

    // ===== ATTENDANCE =====
    attendanceMgmt: 'Attendance Management', myAttendance: 'My Attendance',
    avgAttendance: 'Average Attendance', lastSunday: 'Last Sunday Count',
    visitorsMonth: 'Visitors This Month', absentLastSunday: 'Absent Last Sunday',
    attendanceHeatmap: 'Attendance Heatmap (2025)', servicesAttendedSummary: 'services attended',
    summary: 'Summary', exportBtn: 'Export',
    servicesThisYear: 'Services This Year', present: 'Present',
    absent: 'Absent', currentStreak: 'Current Streak', weeks: 'weeks',
    presentLabel: 'Present', absentLabel: 'Absent',

    // ===== GIVING =====
    givingTitle: 'Giving & Tithes', financeTitle: 'Finance & Giving',
    totalThisMonth: 'Total This Month', tithes: 'Tithes',
    offerings: 'Offerings', specialDonations: 'Special Donations',
    makeGift: 'Make a Gift', givingType: 'Giving Type',
    paymentMethod: 'Payment Method', giveNow: 'Give Now',
    customAmount: 'Custom Amount', customAmountLabel: 'Enter amount (FCFA)...',
    givingHistory: 'Giving History', downloadStatement: '📄 Statement',
    tithe: 'Tithe', offering: 'Offering', firstFruits: 'First Fruits',
    buildingFund: 'Building Fund', missions: 'Missions', projectDonation: 'Project Donation',
    mobileMoney: 'Mobile Money (MTN)', orangeMoney: 'Mobile Money (Orange)',
    bankTransfer: 'Bank Transfer', cash: 'Cash (Mark as Given)',
    customOther: 'Custom',

    // ===== PROJECTS =====
    projectsTitle: "Church Projects", projectsSub: 'Active fundraising and development projects',
    newProject: '+ New Project', contribute: 'Contribute', updates: 'Updates',
    raised: 'raised', goal: 'Goal',

    // ===== PARTNERS =====
    partnersTitle: 'Partners & Sponsors', addPartner: '+ Add Partner',
    partnerType: 'Type', contribution: 'Contribution', since: 'Since',
    viewHistory: 'View History', sponsor: 'Sponsor', partner: 'Partner', donor: 'Donor',
    perMonth: 'mo', oneTime: 'one-time',

    // ===== PRAYER =====
    prayerTitle: 'Prayer Requests', prayerSub: 'Submit and view prayer requests',
    submitRequest: '+ Submit Request', submitPrayerModal: 'Submit Prayer Request',
    category: 'Category', yourRequest: 'Your Request',
    prayerPlaceholder: 'Share your prayer request...', anonymous: 'Post anonymously',
    submitBtn: 'Submit Request', respondBtn: 'Respond', prayBtn: "I'm Praying",
    health: 'Health & Healing', family: 'Family', career: 'Career',
    finance: 'Finance', spiritual: 'Spiritual Growth', other: 'Other',
    prayingToast: 'Praying 🙏',

    // ===== MESSAGES =====
    messagesTitle: 'Message Center',
    memberMessageSub: 'Send a message to the administration',
    adminMessageSub: 'Manage all communications',
    typeMessage: 'Type your message...', send: 'Send',
    autoReply: "Thank you for your message. The administration will respond shortly.",

    // ===== BIBLE =====
    bibleTitle: 'The Bible — KJV', bibleSub: 'Old and New Testament — 66 books',
    verseOfDay: 'Verse of the Day', nextVerse: 'Next Verse →',
    searchPassage: 'Search a Passage', searchBible: 'Search a verse, book...',
    searchBtn: 'Search', popularChapters: '⭐ Popular Chapters',
    oldTestament: '📜 Old Testament', newTestament: '✝️ New Testament',
    otBooks: '39 books', ntBooks: '27 books', chooseChapter: 'Choose a Chapter',
    backBtn: '← Back', allBooks: '📚 All Books', chooseChapterBtn: 'Choose Chapter',
    noResults: 'No results found for',
    booksLabel: 'Books', versesLabel: 'Verse(s)', moreResults: 'more results',
    unavailableText: 'Select a featured chapter to display full text, or use Search to find specific verses. Gold chapters indicate available content.',

    // ===== PROFILE =====
    profileTitle: 'My Profile', editProfile: 'Edit Profile',
    personalInfo: 'Personal Information', quickStats: 'Quick Stats',
    fullName: 'Full Name', email: 'Email Address', phone: 'Phone Number',
    address: 'Address', dept: 'Department', memberSince: 'Member Since',
    saveChanges: 'Save Changes', editProfileModal: 'Edit Profile',

    // ===== MEMBERS =====
    membersTitle: 'Member Management', searchMembers: 'Search members...',
    addMember: '+ Add Member', addMemberModal: 'Add New Member',
    name: 'Name', joined: 'Joined', role: 'Role', status: 'Status', actions: 'Actions',
    edit: 'Edit', delete: 'Delete', active: 'Active', pending: 'Pending', inactive: 'Inactive',
    admin: 'Admin', addBtn: 'Add Member',

    // ===== REPORTS =====
    reportsTitle: 'Reports & Analytics', reportsSub: 'Church growth and financial analytics',
    memberGrowth: '+23%', memberGrowthLabel: 'Member Growth (YoY)',
    totalRevenue: 'Total Revenue (2025)', projectAchievement: 'Project Goal Achievement',
    missionSupported: 'Missions Supported', growthChart: 'Membership Growth',
    deptBreakdown: 'Department Breakdown',
    exportPDF: '📄 Export PDF', exportExcel: '📊 Export Excel', emailReport: '✉️ Email Report',

    // ===== SECURITY =====
    securityTitle: 'Roles & Security', securitySub: 'Manage user access and permissions',
    rolePermissions: 'Role Permissions', recentActivity: 'Recent Activity',
    superAdmin: 'Super Admin', adminPastor: 'Admin / Pastor',
    deptHead: 'Department Head', memberRole: 'Member',
    permAll: 'All Access', permManageAdmins: 'Manage Admins', permSettings: 'System Settings',
    permManageMembers: 'Manage Members', permPostAnn: 'Post Announcements',
    permViewReports: 'View Reports', permManageDept: 'Manage Department',
    permDeptAnn: 'Dept. Announcements', permViewContent: 'View Content',
    permRegEvents: 'Register Events', permSubmitReq: 'Submit Requests',
    downloadLog: 'Download Full Log',
  },

  fr: {
    // ===== AUTH =====
    signIn: 'Connexion', register: "S'inscrire", emailAddress: 'Adresse Email',
    password: 'Mot de Passe', rememberMe: 'Se souvenir de moi', forgotPassword: 'Mot de passe oublié?',
    signInBtn: 'Se Connecter', createAccount: 'Créer un Compte', demoAccounts: 'Comptes Démo:',
    memberDemo: '👤 Démo Membre', adminDemo: '🛡️ Démo Admin',
    firstName: 'Prénom', lastName: 'Nom', phoneNumber: 'Numéro de Téléphone',
    department: 'Département', selectDept: 'Sélectionner le Département',
    worshipTeam: 'Équipe de Louange', youthMinistry: 'Ministère Jeunesse',
    childrensChurch: 'École du Dimanche', ushering: 'Accueil',
    mediatech: 'Médias & Tech', prayerTeam: 'Équipe de Prière', generalMember: 'Membre Général',
    portalSubtitle: 'Portail Église',

    // ===== NAV SECTIONS =====
    navMain: 'Principal', navChurch: 'Église', navPersonal: 'Personnel',
    navOverview: "Vue d'ensemble", navManagement: 'Gestion', navFinance: 'Finance & Admin', navSystem: 'Système',

    // ===== NAV ITEMS =====
    navDashboard: 'Tableau de Bord', navProfile: 'Mon Profil', navCalendar: 'Calendrier',
    navEvents: 'Événements', navSermons: 'Bibliothèque', navSchedule: 'Programme',
    navAnnouncements: 'Annonces', navAttendance: 'Mon Assiduité',
    navGiving: 'Offrandes / Dîmes', navProjects: "Projets d'Église",
    navPrayer: 'Requêtes de Prière', navMessages: 'Messages Admin', navBible: 'La Bible',
    navMembers: 'Gestion Membres', navPartners: 'Partenaires',
    navReports: 'Rapports & Analyses', navSecurity: 'Rôles & Sécurité',
    navMgmtAttendance: 'Assiduité', navMgmtGiving: 'Finance & Offrandes',
    navMgmtMessages: 'Communications',

    // ===== TOP BAR =====
    administrator: 'Administrateur', member: 'Membre', signOut: '⬡ Déconnexion',

    // ===== PAGE TITLES =====
    titleDashboard: 'Tableau de Bord', titleProfile: 'Mon Profil', titleCalendar: 'Calendrier',
    titleEvents: 'Événements', titleSermons: 'Bibliothèque de Sermons', titleSchedule: 'Programme du Culte',
    titleAnnouncements: 'Annonces', titleAttendance: 'Assiduité',
    titleGiving: 'Offrandes & Dîmes', titleProjects: "Projets d'Église",
    titlePrayer: 'Requêtes de Prière', titleMessages: 'Messages', titleBible: 'La Bible',
    titleMembers: 'Gestion des Membres', titlePartners: 'Partenaires',
    titleReports: 'Rapports & Analyses', titleSecurity: 'Rôles & Sécurité',

    // ===== DASHBOARD =====
    goodMorning: 'Bonjour',
    welcomeBack: 'Bienvenue sur le Portail GracePoint',
    adminDashTitle: 'Tableau de Bord Admin',
    churchOverview: "Vue d'ensemble de l'église",
    servicesAttended: 'Cultes Assistés', upcomingEvents: 'Événements à Venir',
    sermonsWatched: 'Sermons Écoutés', totalGiven: 'Total Donné (2025)',
    thisMonth: 'ce mois', totalMembers: 'Membres Totaux',
    attendanceRate: "Taux d'Assiduité", monthlyGiving: 'Offrandes du Mois',
    eventsThisMonth: 'Événements ce Mois',
    newThisMonth: '↑ nouveaux ce mois', vsLastMonth: '↑ vs mois dernier',
    recentMembers: 'Membres Récents', viewAll: 'Voir Tout',
    recentSermons: 'Sermons Récents', upcomingEventsCard: 'Prochains Événements',
    latestAnnouncements: 'Dernières Annonces',

    // ===== STATS =====
    attendanceThisMonth: 'Assiduité ce Mois',
    monthlyRevenue: 'Revenus Mensuels (FCFA)',

    // ===== CALENDAR =====
    calendarTitle: "Calendrier de l'Église", calendarSub: 'Événements et programmes à venir',
    addEvent: '+ Ajouter Événement', today: "Aujourd'hui",
    eventsOf: 'Événements de', noEvents: 'Aucun événement ce mois-ci',
    registered: '✓ Inscrit', register: "S'inscrire",
    months: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    days: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],

    // ===== EVENTS =====
    eventsTitle: 'Événements', eventsSub: 'Programmes et activités à venir',
    createEvent: '+ Créer Événement', registerEvent: "S'inscrire",
    registeredBadge: '✓ Inscrit', createEventModal: 'Créer un Nouvel Événement',
    eventTitle: "Titre de l'Événement", eventDate: 'Date', eventTime: 'Heure',
    eventLocation: 'Lieu', eventDesc: 'Description', eventCreate: 'Créer Événement',
    dateTime: 'Date & Heure', registerForEvent: "S'inscrire à cet Événement",
    alreadyRegistered: '✓ Vous êtes inscrit à cet événement',
    registeredToast: 'Inscrit à',

    // ===== SERMONS =====
    sermonsTitle: 'Bibliothèque de Sermons', sermonsSub: 'Messages de nos bergers',
    uploadSermon: '+ Télécharger', searchSermons: 'Sujet, orateur...',
    playSermon: '▶ Lire', downloadNotes: '📄 Notes', deleteSermon: '🗑',
    uploadSermonModal: 'Télécharger Sermon', sermonTitleLabel: 'Titre du Sermon',
    speakerLabel: 'Orateur', topicLabel: 'Sujet', typeLabel: 'Type',
    uploadFile: 'Fichier', uploadBtn: 'Télécharger',
    topicAll: 'Tous', topicFaith: 'Foi', topicPurpose: 'Destinée',
    topicGrace: 'Grâce', topicPrayer: 'Prière', topicSpirit: 'Saint-Esprit',

    // ===== SCHEDULE =====
    scheduleTitle: 'Programme du Culte', scheduleSub: 'Programme du Dimanche',
    editSchedule: 'Modifier', sundayService: 'Culte du Dimanche Matin',

    // ===== ANNOUNCEMENTS =====
    announcementsTitle: 'Annonces', announcementsSub: "Avis et mises à jour de l'église",
    postAnnouncement: '+ Publier Annonce', urgent: '🚨 Urgent',
    editAnn: 'Modifier', deleteAnn: 'Supprimer', postAnnModal: 'Publier une Annonce',
    annTitle: 'Titre', annMessage: 'Message', annDept: 'Département',
    annPriority: 'Priorité', annNormal: 'Normale', annUrgent: 'Urgente',
    annAll: 'Tous', postBtn: 'Publier', allDepts: 'Tous',

    // ===== ATTENDANCE =====
    attendanceMgmt: "Gestion de l'Assiduité", myAttendance: 'Mon Assiduité',
    avgAttendance: 'Assiduité Moyenne', lastSunday: 'Présents Dimanche Dernier',
    visitorsMonth: 'Visiteurs ce Mois', absentLastSunday: 'Absents Dimanche Dernier',
    attendanceHeatmap: 'Carte de Présence (2025)', servicesAttendedSummary: 'cultes assistés',
    summary: 'Résumé', exportBtn: 'Exporter',
    servicesThisYear: 'Cultes cette Année', present: 'Présent(e)',
    absent: 'Absent(e)', currentStreak: 'Série Actuelle', weeks: 'semaines',
    presentLabel: 'Présent', absentLabel: 'Absent',

    // ===== GIVING =====
    givingTitle: 'Offrandes & Dîmes', financeTitle: 'Finance & Offrandes',
    totalThisMonth: 'Total ce Mois', tithes: 'Dîmes',
    offerings: 'Offrandes', specialDonations: 'Dons Spéciaux',
    makeGift: 'Faire un Don', givingType: "Type d'Offrande",
    paymentMethod: 'Mode de Paiement', giveNow: 'Donner Maintenant',
    customAmount: 'Montant Personnalisé', customAmountLabel: 'Entrez le montant en FCFA...',
    givingHistory: 'Historique des Dons', downloadStatement: '📄 Relevé',
    tithe: 'Dîme', offering: 'Offrande', firstFruits: 'Prémices',
    buildingFund: 'Fonds de Construction', missions: 'Missions', projectDonation: 'Don pour Projet',
    mobileMoney: 'Mobile Money (MTN)', orangeMoney: 'Mobile Money (Orange)',
    bankTransfer: 'Virement Bancaire', cash: 'Espèces (Marquer comme Donné)',
    customOther: 'Autre',

    // ===== PROJECTS =====
    projectsTitle: "Projets de l'Église", projectsSub: 'Projets actifs de développement',
    newProject: '+ Nouveau Projet', contribute: 'Contribuer', updates: 'Mises à jour',
    raised: 'collectés', goal: 'Objectif',

    // ===== PARTNERS =====
    partnersTitle: 'Partenaires & Sponsors', addPartner: '+ Ajouter Partenaire',
    partnerType: 'Type', contribution: 'Contribution', since: 'Depuis',
    viewHistory: 'Voir Historique', sponsor: 'Sponsor', partner: 'Partenaire', donor: 'Donateur',
    perMonth: 'mois', oneTime: 'unique',

    // ===== PRAYER =====
    prayerTitle: 'Requêtes de Prière', prayerSub: 'Soumettre et voir les requêtes',
    submitRequest: '+ Soumettre Requête', submitPrayerModal: 'Soumettre une Requête de Prière',
    category: 'Catégorie', yourRequest: 'Votre Requête',
    prayerPlaceholder: 'Partagez votre requête de prière...', anonymous: 'Publier anonymement',
    submitBtn: 'Soumettre', respondBtn: 'Répondre', prayBtn: 'Je Prie',
    health: 'Santé & Guérison', family: 'Famille', career: 'Carrière',
    finance: 'Finances', spiritual: 'Croissance Spirituelle', other: 'Autre',
    prayingToast: 'Je prie 🙏',

    // ===== MESSAGES =====
    messagesTitle: 'Centre de Messages',
    memberMessageSub: "Envoyer un message à l'administration",
    adminMessageSub: 'Gérer toutes les communications',
    typeMessage: 'Tapez votre message...', send: 'Envoyer',
    autoReply: "Merci pour votre message. L'administration vous répondra sous peu.",

    // ===== BIBLE =====
    bibleTitle: 'La Bible — KJV', bibleSub: 'Ancien et Nouveau Testament — 66 livres',
    verseOfDay: 'Verset du Jour', nextVerse: 'Verset Suivant →',
    searchPassage: 'Rechercher un Passage', searchBible: 'Rechercher verset, livre...',
    searchBtn: 'Rechercher', popularChapters: '⭐ Chapitres Populaires',
    oldTestament: '📜 Ancien Testament', newTestament: '✝️ Nouveau Testament',
    otBooks: '39 livres', ntBooks: '27 livres', chooseChapter: 'Choisir un Chapitre',
    backBtn: '← Retour', allBooks: '📚 Tous les Livres', chooseChapterBtn: 'Choisir Chapitre',
    noResults: 'Aucun résultat pour',
    booksLabel: 'Livres', versesLabel: 'Verset(s)', moreResults: 'autres résultats',
    unavailableText: "Sélectionnez un chapitre en vedette pour afficher le texte intégral, ou utilisez la Recherche. Les chapitres en or indiquent du contenu disponible.",

    // ===== PROFILE =====
    profileTitle: 'Mon Profil', editProfile: 'Modifier Profil',
    personalInfo: 'Informations Personnelles', quickStats: 'Statistiques Rapides',
    fullName: 'Nom Complet', email: 'Adresse Email', phone: 'Téléphone',
    address: 'Adresse', dept: 'Département', memberSince: 'Membre Depuis',
    saveChanges: 'Sauvegarder', editProfileModal: 'Modifier le Profil',

    // ===== MEMBERS =====
    membersTitle: 'Gestion des Membres', searchMembers: 'Rechercher membres...',
    addMember: '+ Ajouter Membre', addMemberModal: 'Ajouter un Nouveau Membre',
    name: 'Nom', joined: 'Inscription', role: 'Rôle', status: 'Statut', actions: 'Actions',
    edit: 'Modifier', delete: 'Supprimer', active: 'Actif', pending: 'En attente', inactive: 'Inactif',
    admin: 'Admin', addBtn: 'Ajouter Membre',

    // ===== REPORTS =====
    reportsTitle: 'Rapports & Analyses', reportsSub: 'Croissance et analyses financières',
    memberGrowth: '+23%', memberGrowthLabel: 'Croissance Membres (annuel)',
    totalRevenue: 'Revenus Totaux (2025)', projectAchievement: 'Objectifs de Projets Atteints',
    missionSupported: 'Missions Soutenues', growthChart: 'Croissance des Membres',
    deptBreakdown: 'Par Département',
    exportPDF: '📄 Exporter PDF', exportExcel: '📊 Exporter Excel', emailReport: '✉️ Envoyer par Email',

    // ===== SECURITY =====
    securityTitle: 'Rôles & Sécurité', securitySub: 'Gérer les accès et les permissions',
    rolePermissions: 'Permissions par Rôle', recentActivity: 'Activité Récente',
    superAdmin: 'Super Admin', adminPastor: 'Admin / Pasteur',
    deptHead: 'Chef de Département', memberRole: 'Membre',
    permAll: 'Accès Total', permManageAdmins: 'Gérer Admins', permSettings: 'Paramètres Système',
    permManageMembers: 'Gérer Membres', permPostAnn: 'Publier Annonces',
    permViewReports: 'Voir Rapports', permManageDept: 'Gérer Département',
    permDeptAnn: 'Annonces Dept.', permViewContent: 'Voir Contenu',
    permRegEvents: 'Inscrire Événements', permSubmitReq: 'Soumettre Requêtes',
    downloadLog: 'Télécharger Journal',
  }
};

// Helper — get translation
function t(key) {
  return (T[currentLang] && T[currentLang][key]) || (T['en'][key]) || key;
}

// Toggle language
function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'fr' : 'en';
  updateLangToggleUI();
  applyTranslationsToStaticDOM();
  // Re-render current page if app is active
  if (currentUser) {
    showPage(currentPage);
    initApp(); // refresh sidebar labels
  }
}

function updateLangToggleUI() {
  const btn = document.getElementById('langToggleBtn');
  const btnAuth = document.getElementById('langToggleBtnAuth');
  const label = currentLang === 'en' ? '🇫🇷 FR' : '🇬🇧 EN';
  if (btn) btn.innerHTML = label;
  if (btnAuth) btnAuth.innerHTML = label;
}

// Apply translations to static DOM elements (auth page, sidebar footer, etc.)
function applyTranslationsToStaticDOM() {
  // Auth tabs
  const tabs = document.querySelectorAll('.auth-tab');
  if (tabs[0]) tabs[0].textContent = t('signIn');
  if (tabs[1]) tabs[1].textContent = t('register');

  // Login form labels
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    const labels = loginForm.querySelectorAll('label');
    if (labels[0]) labels[0].textContent = t('emailAddress');
    if (labels[1]) labels[1].textContent = t('password');
    const checkLabel = loginForm.querySelector('.checkbox-label');
    if (checkLabel) checkLabel.childNodes[1] && (checkLabel.childNodes[1].textContent = ' ' + t('rememberMe'));
    const forgot = loginForm.querySelector('.forgot-link');
    if (forgot) forgot.textContent = t('forgotPassword');
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.textContent = t('signInBtn');
    const demoP = loginForm.querySelector('.demo-accounts p');
    if (demoP) demoP.textContent = t('demoAccounts');
    const demoBtns = loginForm.querySelectorAll('.demo-btn');
    if (demoBtns[0]) demoBtns[0].textContent = t('memberDemo');
    if (demoBtns[1]) demoBtns[1].textContent = t('adminDemo');
  }

  // Register form
  const regForm = document.getElementById('registerForm');
  if (regForm) {
    const labels = regForm.querySelectorAll('label');
    const labelKeys = ['firstName','lastName','emailAddress','phoneNumber','password','department'];
    labels.forEach((l, i) => { if (labelKeys[i]) l.textContent = t(labelKeys[i]); });
    const submitBtn = regForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.textContent = t('createAccount');
    const opts = regForm.querySelectorAll('select option');
    const deptKeys = ['selectDept','worshipTeam','youthMinistry','childrensChurch','ushering','mediatech','prayerTeam','generalMember'];
    opts.forEach((o, i) => { if (deptKeys[i]) o.textContent = t(deptKeys[i]); });
  }

  // Sidebar portal subtitle
  const portalSub = document.querySelector('.sidebar-logo p');
  if (portalSub) portalSub.textContent = t('portalSubtitle');

  // Sidebar logout
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) logoutBtn.textContent = t('signOut');

  // Role badge
  const roleBadge = document.getElementById('sidebarRole');
  if (roleBadge && currentUser) {
    roleBadge.textContent = currentUser.role === 'admin' ? t('administrator') : t('member');
  }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
  updateLangToggleUI();
  applyTranslationsToStaticDOM();
});
