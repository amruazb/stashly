// Global variables
let currentUser = null;
let currentBudget = 500; // Default budget
let spent = { needs: 0, wants: 0 };
let saved = 0;
let userCoins = 0;
let userStreak = 0;
let currentCurrency = 'AED';
let currentLanguage = 'en';
let goals = [];
let achievements = [];
let isRecording = false;

// Translations
const translations = {
    en: {
        slogan: "Stash Your Cash",
        description: "AI-powered budget management for smart students. Master the 50/30/20 rule and achieve your financial goals!",
        get_started: "Get Started",
        learn_more: "Learn More",
        scan_qr: "Scan QR Code to Access",
        dashboard: "Dashboard",
        goals: "Goals",
        rewards: "Rewards",
        ai_assistant: "AI Assistant",
        support: "Support",
        login: "Login",
        signup: "Sign Up",
        email: "Email",
        password: "Password",
        name: "Name",
        age: "Age",
        select_gender: "Select Gender",
        male: "Male",
        female: "Female",
        choose_avatar: "Choose Your Avatar",
        coins: "Coins",
        streak: "Streak",
        piggy_happy: "I'm happy when you save!",
        set_monthly_budget: "Set Your Monthly Pocket Money",
        set_budget: "Set Budget",
        needs: "Needs (50%)",
        wants: "Wants (30%)",
        savings: "Savings (20%)",
        everyday_actions: "Everyday Actions",
        add_expense: "Add Expense",
        add_savings: "Add to Savings",
        view_history: "View History",
        add_goal: "Add Goal",
        achievements: "Achievements",
        redeem: "Redeem",
        pizza_discount: "5% off your order",
        apple_discount: "10% off accessories",
        sephora_discount: "15% off beauty products",
        cinema_discount: "20% off movie tickets",
        ai_welcome: "Hi! I'm your AI budget assistant. Ask me anything about managing your money!",
        voice_message: "Voice Message",
        upload_image: "Upload Image",
        ask_budgeting: "Ask me about budgeting...",
        contact_us: "Contact Us",
        email_support: "Email Support",
        faq: "FAQ",
        common_questions: "Common questions and answers",
        call_now: "Call Now",
        send_email: "Send Email",
        view_faq: "View FAQ",
        select_category: "Select Category",
        description: "Description",
        goal_title: "Goal Title",
        target_amount: "Target Amount"
    },
    ar: {
        slogan: "احفظ أموالك",
        description: "إدارة الميزانية بالذكاء الاصطناعي للطلاب الأذكياء. أتقن قاعدة 50/30/20 وحقق أهدافك المالية!",
        get_started: "ابدأ الآن",
        learn_more: "اعرف المزيد",
        scan_qr: "امسح رمز QR للوصول",
        dashboard: "لوحة التحكم",
        goals: "الأهداف",
        rewards: "المكافآت",
        ai_assistant: "المساعد الذكي",
        support: "الدعم",
        login: "تسجيل الدخول",
        signup: "إنشاء حساب",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        name: "الاسم",
        age: "العمر",
        select_gender: "اختر الجنس",
        male: "ذكر",
        female: "أنثى",
        choose_avatar: "اختر الصورة الرمزية",
        coins: "العملات",
        streak: "السلسلة",
        piggy_happy: "أنا سعيد عندما توفر!",
        set_monthly_budget: "حدد مصروفك الشهري",
        set_budget: "حدد الميزانية",
        needs: "الحاجات (50%)",
        wants: "الرغبات (30%)",
        savings: "المدخرات (20%)",
        everyday_actions: "الأعمال اليومية",
        add_expense: "إضافة مصروف",
        add_savings: "إضافة للمدخرات",
        view_history: "عرض السجل"
    },
    ur: {
        slogan: "اپنا پیسہ بچائیں",
        description: "ذہین طلباء کے لیے AI سے چلنے والا بجٹ منیجمنٹ۔ 50/30/20 اصول میں مہارت حاصل کریں اور اپنے مالی اہداف حاصل کریں!",
        get_started: "شروع کریں",
        learn_more: "مزید جانیں",
        scan_qr: "رسائی کے لیے QR کوڈ اسکین کریں",
        dashboard: "ڈیش بورڈ",
        goals: "اہداف",
        rewards: "انعامات",
        ai_assistant: "AI اسسٹنٹ",
        support: "سپورٹ",
        login: "لاگ ان",
        signup: "سائن اپ",
        email: "ای میل",
        password: "پاس ورڈ",
        name: "نام",
        age: "عمر",
        select_gender: "جنس منتخب کریں",
        male: "مرد",
        female: "عورت",
        choose_avatar: "اپنا اوتار منتخب کریں",
        coins: "سکے",
        streak: "سلسلہ",
        piggy_happy: "جب آپ بچت کرتے ہیں تو میں خوش ہوں!",
        set_monthly_budget: "اپنی ماہانہ جیب خرچی مقرر کریں",
        set_budget: "بجٹ مقرر کریں",
        needs: "ضروریات (50%)",
        wants: "خواہشات (30%)",
        savings: "بچت (20%)",
        everyday_actions: "روزانہ کے کام",
        add_expense: "خرچ شامل کریں",
        add_savings: "بچت میں شامل کریں",
        view_history: "تاریخ دیکھیں"
    }
};

// Currency symbols
const currencySymbols = {
    'AED': 'AED',
    'USD': '$',
    'PKR': '₨'
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    generateQR();
    updateTranslations();
    checkAuthStatus();
});

function initializeApp() {
    // Load saved data from localStorage
    loadUserData();
    updateUI();
    updatePiggyBank();
}

function setupEventListeners() {
    // Theme toggle
    document.getElementById('theme-icon').addEventListener('click', toggleTheme);
    
    // Language selector
    document.getElementById('language-select').addEventListener('change', changeLanguage);
    
    // Currency selector
    document.getElementById('currency-select').addEventListener('change', changeCurrency);
    
    // Navigation
    setupNavigation();
    
    // Auth buttons
    document.getElementById('get-started').addEventListener('click', showAuthModal);
    
    // Budget setup
    document.getElementById('set-budget').addEventListener('click', setBudget);
    
    // Daily actions
    document.getElementById('add-expense').addEventListener('click', showExpenseModal);
    document.getElementById('add-savings').addEventListener('click', addSavings);
    document.getElementById('view-history').addEventListener('click', viewHistory);
    
    // Goals
    document.getElementById('add-goal').addEventListener('click', showGoalModal);
    
    // AI Chat
    document.getElementById('send-message').addEventListener('click', sendMessage);
    document.getElementById('chat-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });
    
    // Voice and image features
    document.getElementById('voice-btn').addEventListener('click', toggleVoiceRecording);
    document.getElementById('image-btn').addEventListener('click', () => {
        document.getElementById('image-input').click();
    });
    document.getElementById('image-input').addEventListener('change', handleImageUpload);
    
    // Modal controls
    setupModals();
    
    // Reward buttons
    setupRewardButtons();
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
}

function changeLanguage() {
    currentLanguage = document.getElementById('language-select').value;
    localStorage.setItem('language', currentLanguage);
    updateTranslations();
}

function changeCurrency() {
    currentCurrency = document.getElementById('currency-select').value;
    localStorage.setItem('currency', currentCurrency);
    updateCurrencyDisplay();
    updateUI();
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });
}

function updateCurrencyDisplay() {
    const currencySymbol = currencySymbols[currentCurrency];
    document.getElementById('currency-symbol').textContent = currencySymbol;
    
    // Update all currency displays
    document.querySelectorAll('.currency-display').forEach(element => {
        element.textContent = currencySymbol;
    });
}

function generateQR() {
    const qr = new QRious({
        element: document.getElementById('qr-canvas'),
        value: window.location.href,
        size: 150,
        background: 'white',
        foreground: '#6C63FF'
    });
}

function checkAuthStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        document.getElementById('user-avatar').textContent = currentUser.avatar || '👨‍🎓';
        showSection('dashboard');
    } else {
        showSection('welcome');
    }
}

function showAuthModal() {
    document.getElementById('auth-modal').classList.add('active');
}

function setupModals() {
    // Close buttons
    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });
    
    // Click outside to close
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Auth tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            switchAuthTab(tab);
        });
    });
    
    // Avatar selection
    document.querySelectorAll('.avatar-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Form submissions
    document.getElementById('signup-form').addEventListener('submit', handleSignup);
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('expense-form').addEventListener('submit', handleExpenseSubmit);
    document.getElementById('goal-form').addEventListener('submit', handleGoalSubmit);
}

function switchAuthTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    document.getElementById(`${tab}-form`).classList.add('active');
}

function handleSignup(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const selectedAvatar = document.querySelector('.avatar-option.selected');
    
    const userData = {
        name: document.getElementById('username').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        email: e.target.querySelector('input[type="email"]').value,
        avatar: selectedAvatar ? selectedAvatar.textContent : '👨‍🎓'
    };
    
    currentUser = userData;
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    document.getElementById('auth-modal').classList.remove('active');
    document.getElementById('user-avatar').textContent = userData.avatar;
    showSection('dashboard');
    
    // Welcome bonus
    userCoins += 100;
    userStreak = 1;
    updateUserStats();
    showNotification('Welcome! You earned 100 coins as a signup bonus!');
}

function handleLogin(e) {
    e.preventDefault();
    // Simulate login
    currentUser = {
        name: 'Demo User',
        avatar: '👨‍🎓'
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    document.getElementById('auth-modal').classList.remove('active');
    document.getElementById('user-avatar').textContent = currentUser.avatar;
    showSection('dashboard');
}

function setBudget() {
    const budgetInput = document.getElementById('pocket-money');
    const newBudget = parseFloat(budgetInput.value);
    
    if (newBudget > 0) {
        currentBudget = newBudget;
        localStorage.setItem('currentBudget', currentBudget);
        updateUI();
        updatePiggyBank();
        showNotification(`Budget set to ${currentBudget} ${currentCurrency}!`);
    }
}

function updateUI() {
    const needs = currentBudget * 0.5;
    const wants = currentBudget * 0.3;
    const savings = currentBudget * 0.2;
    
    const currencySymbol = currencySymbols[currentCurrency];
    
    // Update budget cards
    document.getElementById('needs-amount').textContent = `${needs} ${currencySymbol}`;
    document.getElementById('wants-amount').textContent = `${wants} ${currencySymbol}`;
    document.getElementById('savings-amount').textContent = `${savings} ${currencySymbol}`;
    
    // Update remaining amounts
    const needsRemaining = Math.max(0, needs - spent.needs);
    const wantsRemaining = Math.max(0, wants - spent.wants);
    
    document.getElementById('needs-remaining').textContent = `Remaining: ${needsRemaining} ${currencySymbol}`;
    document.getElementById('wants-remaining').textContent = `Remaining: ${wantsRemaining} ${currencySymbol}`;
    document.getElementById('savings-remaining').textContent = `Saved: ${saved} ${currencySymbol}`;
    
    // Update progress bars
    updateProgress('needs', spent.needs, needs);
    updateProgress('wants', spent.wants, wants);
    updateProgress('savings', saved, savings);
    
    updateUserStats();
}

function updateProgress(category, spent, total) {
    const progressElement = document.getElementById(`${category}-progress`);
    const percentage = Math.min((spent / total) * 100, 100);
    progressElement.style.width = `${percentage}%`;
}

function updateUserStats() {
    document.getElementById('user-coins').textContent = userCoins;
    document.getElementById('user-streak').textContent = userStreak;
    document.getElementById('rewards-coins').textContent = userCoins;
    
    // Update reward buttons
    updateRewardButtons();
}

function updateRewardButtons() {
    document.querySelectorAll('.reward-card').forEach(card => {
        const cost = parseInt(card.getAttribute('data-cost'));
        const button = card.querySelector('.reward-btn');
        
        if (userCoins >= cost) {
            card.classList.remove('disabled');
            button.disabled = false;
        } else {
            card.classList.add('disabled');
            button.disabled = true;
        }
    });
}

function setupRewardButtons() {
    document.querySelectorAll('.reward-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.reward-card');
            const cost = parseInt(card.getAttribute('data-cost'));
            
            if (userCoins >= cost) {
                userCoins -= cost;
                updateUserStats();
                showNotification('Reward redeemed successfully!');
            }
        });
    });
}

function showExpenseModal() {
    document.getElementById('expense-modal').classList.add('active');
}

function handleExpenseSubmit(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;
    const description = document.getElementById('expense-description').value;
    
    if (amount > 0 && category) {
        spent[category] += amount;
        localStorage.setItem('spent', JSON.stringify(spent));
        
        updateUI();
        updatePiggyBank();
        updateStreak();
        
        document.getElementById('expense-modal').classList.remove('active');
        document.getElementById('expense-form').reset();
        
        showNotification(`Added ${amount} ${currencySymbols[currentCurrency]} to ${category}`);
    }
}

function addSavings() {
    const amount = prompt(`How much would you like to save? (${currencySymbols[currentCurrency]})`);
    const savingsAmount = parseFloat(amount);
    
    if (savingsAmount > 0) {
        saved += savingsAmount;
        localStorage.setItem('saved', saved);
        
        // Award coins for saving
        const coinsEarned = Math.floor(savingsAmount / 10);
        userCoins += Math.max(10, coinsEarned);
        
        updateUI();
        updatePiggyBank();
        updateStreak();
        
        showNotification(`Great! You saved ${savingsAmount} ${currencySymbols[currentCurrency]} and earned ${Math.max(10, coinsEarned)} coins!`);
    }
}

function viewHistory() {
    // Simple history display
    const history = `
        Current Budget: ${currentBudget} ${currencySymbols[currentCurrency]}
        Needs Spent: ${spent.needs} ${currencySymbols[currentCurrency]}
        Wants Spent: ${spent.wants} ${currencySymbols[currentCurrency]}
        Total Saved: ${saved} ${currencySymbols[currentCurrency]}
        Coins: ${userCoins}
        Streak: ${userStreak} days
    `;
    alert(history);
}

function updatePiggyBank() {
    const piggyBank = document.getElementById('piggy-bank');
    const piggyMessage = document.getElementById('piggy-message');
    
    const savingsPercentage = (saved / (currentBudget * 0.2)) * 100;
    
    if (savingsPercentage >= 100) {
        piggyBank.style.transform = 'scale(1.3)';
        piggyMessage.textContent = "Amazing! I'm so full and happy!";
        piggyBank.style.filter = 'hue-rotate(60deg)';
    } else if (savingsPercentage >= 50) {
        piggyBank.style.transform = 'scale(1.15)';
        piggyMessage.textContent = "Great job! Keep saving!";
        piggyBank.style.filter = 'hue-rotate(30deg)';
    } else if (savingsPercentage >= 25) {
        piggyBank.style.transform = 'scale(1.05)';
        piggyMessage.textContent = "Good start! I'm getting happier!";
        piggyBank.style.filter = 'hue-rotate(15deg)';
    } else {
        piggyBank.style.transform = 'scale(1)';
        piggyMessage.textContent = "I'm happy when you save!";
        piggyBank.style.filter = 'none';
    }
}

function updateStreak() {
    const lastActivity = localStorage.getItem('lastActivity');
    const today = new Date().toDateString();
    
    if (lastActivity !== today) {
        if (lastActivity) {
            const lastDate = new Date(lastActivity);
            const todayDate = new Date(today);
            const diffTime = todayDate - lastDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                userStreak += 1;
            } else if (diffDays > 1) {
                userStreak = 1;
            }
        } else {
            userStreak = 1;
        }
        
        localStorage.setItem('lastActivity', today);
        localStorage.setItem('userStreak', userStreak);
        
        // Streak bonus
        if (userStreak % 7 === 0) {
            userCoins += 50;
            showNotification(`7-day streak bonus! You earned 50 coins!`);
        }
    }
}

function showGoalModal() {
    document.getElementById('goal-modal').classList.add('active');
}

function handleGoalSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('goal-title').value;
    const amount = parseFloat(document.getElementById('goal-amount').value);
    const date = document.getElementById('goal-date').value;
    const description = document.getElementById('goal-description').value;
    
    const goal = {
        id: Date.now(),
        title,
        amount,
        date,
        description,
        progress: 0,
        completed: false
    };
    
    goals.push(goal);
    localStorage.setItem('goals', JSON.stringify(goals));
    
    document.getElementById('goal-modal').classList.remove('active');
    document.getElementById('goal-form').reset();
    
    updateGoalsDisplay();
    showNotification('Goal added successfully!');
}

function updateGoalsDisplay() {
    const goalsList = document.getElementById('goals-list');
    goalsList.innerHTML = '';
    
    goals.forEach(goal => {
        const goalCard = createGoalCard(goal);
        goalsList.appendChild(goalCard);
    });
}

function createGoalCard(goal) {
    const card = document.createElement('div');
    card.className = 'goal-card';
    card.innerHTML = `
        <h4>${goal.title}</h4>
        <div class="goal-amount">${goal.amount} ${currencySymbols[currentCurrency]}</div>
        <div class="goal-date">Target: ${goal.date}</div>
        <div class="goal-progress">
            <div class="progress-bar">
                <div class="progress" style="width: ${(goal.progress / goal.amount) * 100}%"></div>
            </div>
        </div>
        <div class="goal-actions">
            <button class="edit-btn" onclick="editGoal(${goal.id})">Edit</button>
            <button class="delete-btn" onclick="deleteGoal(${goal.id})">Delete</button>
            ${!goal.completed ? `<button class="complete-btn" onclick="completeGoal(${goal.id})">Complete</button>` : ''}
        </div>
    `;
    return card;
}

function editGoal(goalId) {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
        document.getElementById('goal-title').value = goal.title;
        document.getElementById('goal-amount').value = goal.amount;
        document.getElementById('goal-date').value = goal.date;
        document.getElementById('goal-description').value = goal.description;
        
        // Remove the old goal and show modal for editing
        deleteGoal(goalId);
        showGoalModal();
    }
}

function deleteGoal(goalId) {
    goals = goals.filter(g => g.id !== goalId);
    localStorage.setItem('goals', JSON.stringify(goals));
    updateGoalsDisplay();
    showNotification('Goal deleted successfully!');
}

function completeGoal(goalId) {
    const goalIndex = goals.findIndex(g => g.id === goalId);
    if (goalIndex !== -1) {
        goals[goalIndex].completed = true;
        goals[goalIndex].progress = goals[goalIndex].amount;
        
        // Move to achievements
        const achievement = {
            id: Date.now(),
            title: goals[goalIndex].title,
            description: `Completed goal: ${goals[goalIndex].title}`,
            icon: '🎯',
            coinsEarned: 100
        };
        
        achievements.push(achievement);
        userCoins += 100;
        
        // Remove from goals
        goals.splice(goalIndex, 1);
        
        localStorage.setItem('goals', JSON.stringify(goals));
        localStorage.setItem('achievements', JSON.stringify(achievements));
        localStorage.setItem('userCoins', userCoins);
        
        updateGoalsDisplay();
        updateAchievementsDisplay();
        updateUserStats();
        
        showNotification('🎉 Goal completed! You earned 100 coins!');
    }
}

function updateAchievementsDisplay() {
    const achievementsList = document.getElementById('achievements-list');
    achievementsList.innerHTML = '';
    
    achievements.forEach(achievement => {
        const achievementCard = document.createElement('div');
        achievementCard.className = 'achievement-card';
        achievementCard.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <h4>${achievement.title}</h4>
            <p>+${achievement.coinsEarned} coins</p>
        `;
        achievementsList.appendChild(achievementCard);
    });
}

// AI Chat functionality
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        input.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const response = generateAIResponse(message);
            addMessage(response, 'ai');
        }, 1000);
    }
}

function addMessage(content, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = sender === 'user' ? currentUser?.avatar || '👤' : '🤖';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${content}</p>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('save') || lowerMessage.includes('saving')) {
        return "Great question about saving! Try the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings. Start small and be consistent!";
    } else if (lowerMessage.includes('budget')) {
        return `Based on your current budget of ${currentBudget} ${currencySymbols[currentCurrency]}, you should allocate ${currentBudget * 0.5} for needs, ${currentBudget * 0.3} for wants, and ${currentBudget * 0.2} for savings.`;
    } else if (lowerMessage.includes('goal')) {
        return "Setting financial goals is awesome! Break them into smaller, achievable milestones. Track your progress and celebrate when you reach each milestone!";
    } else if (lowerMessage.includes('spend') || lowerMessage.includes('spending')) {
        return "Before spending, ask yourself: Is this a need or a want? Can I afford it without affecting my savings goal? Try waiting 24 hours before making non-essential purchases!";
    } else {
        return "I'm here to help with your budget! You can ask me about saving money, setting goals, managing expenses, or the 50/30/20 rule. What would you like to know?";
    }
}

function toggleVoiceRecording() {
    const voiceBtn = document.getElementById('voice-btn');
    
    if (!isRecording) {
        startVoiceRecording();
        voiceBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Recording';
        voiceBtn.style.background = 'var(--error-color)';
        isRecording = true;
    } else {
        stopVoiceRecording();
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i> Voice Message';
        voiceBtn.style.background = '';
        isRecording = false;
    }
}

function startVoiceRecording() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = currentLanguage === 'ar' ? 'ar-SA' : currentLanguage === 'ur' ? 'ur-PK' : 'en-US';
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            document.getElementById('chat-input').value = transcript;
            stopVoiceRecording();
        };
        
        recognition.onerror = function(event) {
            showNotification('Voice recognition error: ' + event.error);
            stopVoiceRecording();
        };
        
        recognition.start();
        window.currentRecognition = recognition;
    } else {
        showNotification('Voice recognition not supported in this browser');
    }
}

function stopVoiceRecording() {
    if (window.currentRecognition) {
        window.currentRecognition.stop();
    }
    const voiceBtn = document.getElementById('voice-btn');
    voiceBtn.innerHTML = '<i class="fas fa-microphone"></i> Voice Message';
    voiceBtn.style.background = '';
    isRecording = false;
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageMessage = `[Image uploaded: ${file.name}] - I can see you've uploaded an image! I can help analyze receipts, bills, or spending-related images. What would you like to know about this image?`;
            addMessage(imageMessage, 'ai');
        };
        reader.readAsDataURL(file);
    }
}

function showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function loadUserData() {
    // Load saved data from localStorage
    const savedBudget = localStorage.getItem('currentBudget');
    const savedSpent = localStorage.getItem('spent');
    const savedSaved = localStorage.getItem('saved');
    const savedCoins = localStorage.getItem('userCoins');
    const savedStreak = localStorage.getItem('userStreak');
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');
    const savedCurrency = localStorage.getItem('currency');
    const savedGoals = localStorage.getItem('goals');
    const savedAchievements = localStorage.getItem('achievements');
    
    if (savedBudget) currentBudget = parseFloat(savedBudget);
    if (savedSpent) spent = JSON.parse(savedSpent);
    if (savedSaved) saved = parseFloat(savedSaved);
    if (savedCoins) userCoins = parseInt(savedCoins);
    if (savedStreak) userStreak = parseInt(savedStreak);
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        document.getElementById('language-select').value = currentLanguage;
    }
    if (savedCurrency) {
        currentCurrency = savedCurrency;
        document.getElementById('currency-select').value = currentCurrency;
    }
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        document.getElementById('theme-icon').className = 'fas fa-sun';
    }
    if (savedGoals) {
        goals = JSON.parse(savedGoals);
        updateGoalsDisplay();
    }
    if (savedAchievements) {
        achievements = JSON.parse(savedAchievements);
        updateAchievementsDisplay();
    }
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);