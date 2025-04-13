const STORAGE_KEY = 'smartGoals';

export class GoalTracker {
    constructor() {
        this.goals = [];
        this.currentGoalId = null;
        
        // DOM Elements
        this.elements = {
            goalInput: document.getElementById('goalInput'),
            goalCategory: document.getElementById('goalCategory'),
            addGoalBtn: document.getElementById('addGoal'),
            goalsContainer: document.getElementById('goalsContainer'),
            milestoneModal: document.getElementById('milestoneModal'),
            milestoneForm: document.getElementById('milestoneForm'),
            cancelMilestone: document.getElementById('cancelMilestone'),
            toast: document.getElementById('toast')
        };

        // Style Configuration
        this.config = {
            categories: {
                work: { bg: 'bg-blue-100', text: 'text-blue-800', emoji: '🏢' },
                personal: { bg: 'bg-purple-100', text: 'text-purple-800', emoji: '👨👩👧👦' }
            }
        };
    }

    async init() {
        await this.loadGoals();
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Goal Creation
        this.elements.addGoalBtn.addEventListener('click', this.handleAddGoal);
        this.elements.goalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleAddGoal(e);
        });

        // Milestone Management
        this.elements.milestoneForm.addEventListener('submit', this.handleAddMilestone);
        this.elements.cancelMilestone.addEventListener('click', this.closeModal);

        // Goal Interactions
        this.elements.goalsContainer.addEventListener('click', (e) => {
            const target = e.target;
            const goalEl = target.closest('.goal-item');
            
            if (!goalEl) return;
            const goalId = goalEl.dataset.id;

            if (target.classList.contains('delete-goal')) {
                this.deleteGoal(goalId);
            }
            
            if (target.classList.contains('add-milestone')) {
                this.openModal(goalId);
            }
        });
    }

    handleAddGoal = async (e) => {
        e.preventDefault();
        const title = this.elements.goalInput.value.trim();
        const category = this.elements.goalCategory.value;

        if (!title) {
            this.showToast('Judul goal tidak boleh kosong!', 'error');
            return;
        }

        const newGoal = {
            id: Date.now().toString(),
            title,
            category,
            milestones: [],
            createdAt: new Date().toISOString()
        };

        try {
            this.goals.push(newGoal);
            await this.saveGoals();
            this.render();
            this.elements.goalInput.value = '';
            this.showToast('Goal berhasil ditambahkan 🎉', 'success');
        } catch (error) {
            this.showToast('Gagal menyimpan goal', 'error');
        }
    };

    handleAddMilestone = async (e) => {
        e.preventDefault();
        const title = document.getElementById('milestoneTitle').value.trim();
        const date = document.getElementById('milestoneDate').value;

        if (!title || !date) {
            this.showToast('Harap isi semua field!', 'error');
            return;
        }

        const newMilestone = {
            id: Date.now().toString(),
            title,
            date,
            completed: false
        };

        try {
            const goal = this.goals.find(g => g.id === this.currentGoalId);
            goal.milestones.push(newMilestone);
            await this.saveGoals();
            this.render();
            this.closeModal();
            this.showToast('Milestone ditambahkan! 📌', 'success');
        } catch (error) {
            this.showToast('Gagal menambahkan milestone', 'error');
        }
    };

    deleteGoal = async (goalId) => {
        if (!confirm('Yakin ingin menghapus goal ini?')) return;
        
        this.goals = this.goals.filter(g => g.id !== goalId);
        await this.saveGoals();
        this.render();
        this.showToast('Goal dihapus 🗑️', 'warning');
    };

    // Helper Methods
    async loadGoals() {
        const data = localStorage.getItem(STORAGE_KEY);
        this.goals = data ? JSON.parse(data) : [];
    }

    async saveGoals() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.goals));
    }

    calculateProgress(goal) {
        const completed = goal.milestones.filter(m => m.completed).length;
        return goal.milestones.length > 0 
            ? Math.round((completed / goal.milestones.length) * 100)
            : 0;
    }

    openModal = (goalId) => {
        this.currentGoalId = goalId;
        this.elements.milestoneModal.classList.remove('hidden');
    };

    closeModal = () => {
        this.elements.milestoneModal.classList.add('hidden');
        this.elements.milestoneForm.reset();
    };

    showToast = (message, type = 'info') => {
        const toast = this.elements.toast;
        const typeStyles = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-gray-800'
        };

        toast.className = `toast ${typeStyles[type]} fixed bottom-4 right-4 text-white px-6 py-3 rounded-lg`;
        toast.textContent = message;
        toast.classList.remove('hidden');
        
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    };

    // Rendering
    render() {
        this.elements.goalsContainer.innerHTML = this.goals.map(goal => {
            const progress = this.calculateProgress(goal);
            const category = this.config.categories[goal.category];

            return `
                <div class="goal-item bg-white rounded-xl shadow-sm p-4 border border-gray-200" data-id="${goal.id}">
                    <div class="flex justify-between items-start mb-4">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="${category.bg} ${category.text} px-3 py-1 rounded-full text-sm">
                                    ${category.emoji} ${goal.category}
                                </span>
                                <h3 class="font-semibold text-lg">${goal.title}</h3>
                            </div>
                            ${this.renderProgressBar(progress)}
                        </div>
                        <div class="flex items-center gap-2">
                            <button class="add-milestone text-indigo-600">➕</button>
                            <button class="delete-goal text-red-500">🗑️</button>
                        </div>
                    </div>
                    ${this.renderMilestones(goal.milestones)}
                </div>
            `;
        }).join('');
    }

    renderProgressBar(progress) {
        return `
            <div class="relative pt-2">
                <div class="h-2 bg-gray-200 rounded-full">
                    <div class="h-2 bg-indigo-500 rounded-full transition-all duration-500" 
                         style="width: ${progress}%"></div>
                </div>
                <span class="text-xs text-gray-500 absolute top-0 right-0">${progress}%</span>
            </div>
        `;
    }

    renderMilestones(milestones) {
        if (!milestones.length) return '<p class="text-gray-400 text-sm mt-2">Belum ada milestone</p>';
        
        return `
            <div class="ml-6 border-l-2 border-gray-200 pl-4 mt-4">
                ${milestones.map((m, index) => `
                    <div class="relative pb-4">
                        ${index < milestones.length - 1 ? 
                            '<div class="absolute left-[-5px] top-4 bottom-0 w-1 bg-gray-200"></div>' : ''}
                        <div class="flex items-center gap-3">
                            <div class="w-4 h-4 rounded-full ${m.completed ? 'bg-green-500' : 'bg-gray-300'} 
                                 timeline-dot absolute left-[-11px]"></div>
                            <div class="flex-1">
                                <p class="text-sm">${m.title}</p>
                                <p class="text-xs text-gray-500 mt-1">
                                    📅 ${new Date(m.date).toLocaleDateString('id-ID')}
                                </p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}