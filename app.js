// NUSAM - Sistema de Gestão de Saúde Mental
// Progressive Web App para Psicóloga do SUS

// ============================================================================
// SISTEMA DE PERSISTÊNCIA DE DADOS
// ============================================================================

// STORAGE KEYS PARA ORGANIZAÇÃO DOS DADOS
const STORAGE_KEYS = {
    PACIENTES: 'saudemental_pacientes',
    DOCUMENTOS: 'saudemental_documentos', 
    CONFIGURACOES: 'saudemental_configuracoes',
    USUARIOS: 'saudemental_usuarios',
    BACKUP: 'saudemental_backup',
    ULTIMA_ATUALIZACAO: 'saudemental_ultima_atualizacao'
};

// SISTEMA DE PERSISTÊNCIA USANDO VARIÁVEIS JAVASCRIPT
class DataPersistence {
    constructor() {
        this.data = {
            pacientes: [],
            documentos: [],
            configuracoes: {},
            usuarios: [],
            backup: null,
            ultimaAtualizacao: new Date().toISOString()
        };
        this.initialized = false;
        this.loadFromLocalStorage(); // NOVA LINHA: Carrega dados ao iniciar
    }

    // NOVO MÉTODO: Carregar do localStorage
    loadFromLocalStorage() {
        try {
            const pacientesData = localStorage.getItem(STORAGE_KEYS.PACIENTES);
            const documentosData = localStorage.getItem(STORAGE_KEYS.DOCUMENTOS);
            const configData = localStorage.getItem(STORAGE_KEYS.CONFIGURACOES);
            
            if (pacientesData) {
                this.data.pacientes = JSON.parse(pacientesData);
            }
            if (documentosData) {
                this.data.documentos = JSON.parse(documentosData);
            }
            if (configData) {
                this.data.configuracoes = JSON.parse(configData);
            }
            
            console.log('✅ Dados carregados do localStorage');
        } catch (error) {
            console.warn('⚠️ localStorage não disponível, usando memória:', error);
        }
    }

    // MÉTODO ATUALIZADO: Salvar dados de pacientes
    salvarPacientes(pacientes) {
        this.data.pacientes = [...pacientes];
        this.data.ultimaAtualizacao = new Date().toISOString();
        
        try {
            localStorage.setItem(STORAGE_KEYS.PACIENTES, JSON.stringify(this.data.pacientes));
            localStorage.setItem(STORAGE_KEYS.ULTIMA_ATUALIZACAO, this.data.ultimaAtualizacao);
            console.log('✅ Pacientes salvos no localStorage:', this.data.pacientes.length);
        } catch (error) {
            console.warn('⚠️ Erro ao salvar no localStorage:', error);
        }
        return true;
    }

    // MÉTODO ATUALIZADO: Carregar dados de pacientes
    carregarPacientes() {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.PACIENTES);
            if (data) {
                this.data.pacientes = JSON.parse(data);
            }
        } catch (error) {
            console.warn('⚠️ Erro ao carregar do localStorage:', error);
        }
        return [...this.data.pacientes];
    }

    // MÉTODO ATUALIZADO: Salvar documentos
    salvarDocumentos(documentos) {
        this.data.documentos = [...documentos];
        this.data.ultimaAtualizacao = new Date().toISOString();
        
        try {
            localStorage.setItem(STORAGE_KEYS.DOCUMENTOS, JSON.stringify(this.data.documentos));
            localStorage.setItem(STORAGE_KEYS.ULTIMA_ATUALIZACAO, this.data.ultimaAtualizacao);
            console.log('✅ Documentos salvos no localStorage:', this.data.documentos.length);
        } catch (error) {
            console.warn('⚠️ Erro ao salvar documentos:', error);
        }
        return true;
    }

    // MÉTODO ATUALIZADO: Carregar documentos
    carregarDocumentos() {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.DOCUMENTOS);
            if (data) {
                this.data.documentos = JSON.parse(data);
            }
        } catch (error) {
            console.warn('⚠️ Erro ao carregar documentos:', error);
        }
        return [...this.data.documentos];
    }

    // MÉTODO ATUALIZADO: Salvar configurações
    salvarConfiguracoes(config) {
        this.data.configuracoes = {...config};
        this.data.ultimaAtualizacao = new Date().toISOString();
        
        try {
            localStorage.setItem(STORAGE_KEYS.CONFIGURACOES, JSON.stringify(this.data.configuracoes));
            localStorage.setItem(STORAGE_KEYS.ULTIMA_ATUALIZACAO, this.data.ultimaAtualizacao);
            console.log('✅ Configurações salvas no localStorage');
        } catch (error) {
            console.warn('⚠️ Erro ao salvar configurações:', error);
        }
        return true;
    }

    // MÉTODO ATUALIZADO: Carregar configurações
    carregarConfiguracoes() {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.CONFIGURACOES);
            if (data) {
                this.data.configuracoes = JSON.parse(data);
            }
        } catch (error) {
            console.warn('⚠️ Erro ao carregar configurações:', error);
        }
        return {...this.data.configuracoes};
    }

    // NOVO MÉTODO: Limpar todos os dados
    limparDados() {
        try {
            localStorage.removeItem(STORAGE_KEYS.PACIENTES);
            localStorage.removeItem(STORAGE_KEYS.DOCUMENTOS);
            localStorage.removeItem(STORAGE_KEYS.CONFIGURACOES);
            localStorage.removeItem(STORAGE_KEYS.ULTIMA_ATUALIZACAO);
            this.data = {
                pacientes: [],
                documentos: [],
                configuracoes: {},
                usuarios: [],
                backup: null,
                ultimaAtualizacao: new Date().toISOString()
            };
            console.log('✅ Dados limpos do localStorage');
        } catch (error) {
            console.warn('⚠️ Erro ao limpar dados:', error);
        }
    }

    // MÉTODO ATUALIZADO: Criar backup dos dados
    criarBackup() {
        this.data.backup = {
            timestamp: new Date().toISOString(),
            pacientes: [...this.data.pacientes],
            documentos: [...this.data.documentos],
            configuracoes: {...this.data.configuracoes}
        };
        
        try {
            localStorage.setItem(STORAGE_KEYS.BACKUP, JSON.stringify(this.data.backup));
            console.log('✅ Backup criado e salvo no localStorage');
        } catch (error) {
            console.warn('⚠️ Erro ao criar backup:', error);
        }
        return this.data.backup;
    }

    // MÉTODO ATUALIZADO: Inicializar dados com dados padrão
    inicializarDados(pacientesPadrao, documentosPadrao, configPadrao) {
        // Verifica se já existem dados no localStorage
        const dadosExistentes = localStorage.getItem(STORAGE_KEYS.PACIENTES);
        
        if (!dadosExistentes && !this.initialized) {
            this.data.pacientes = [...pacientesPadrao];
            this.data.documentos = [...documentosPadrao];
            this.data.configuracoes = {...configPadrao};
            this.data.ultimaAtualizacao = new Date().toISOString();
            
            // Salva dados iniciais no localStorage
            this.salvarPacientes(this.data.pacientes);
            this.salvarDocumentos(this.data.documentos);
            this.salvarConfiguracoes(this.data.configuracoes);
            
            this.initialized = true;
            console.log('✅ Dados inicializados com dados padrão e salvos no localStorage');
        } else {
            console.log('✅ Dados já existem no localStorage, carregando...');
            this.loadFromLocalStorage();
        }
    }

    // Obter estatísticas dos dados
    obterEstatisticas() {
        return {
            totalPacientes: this.data.pacientes.length,
            totalDocumentos: this.data.documentos.length,
            ultimaAtualizacao: this.data.ultimaAtualizacao,
            backupDisponivel: !!this.data.backup
        };
    }
}

// Instância global do sistema de persistência
const dataPersistence = new DataPersistence();

// --- ARRAYS GLOBAIS E PERSISTÊNCIA ---
let documents = dataPersistence.carregarDocumentos();
let patients = dataPersistence.carregarPacientes(); // Garante consistência se usar dataPersistence!

window.documents = documents;
window.patients = patients;

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
    });
}

function getFileTypeLabel(mimeType) {
    const typeMap = {
        'application/pdf': 'PDF',
        'application/msword': 'DOC',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
        'image/jpeg': 'Imagem',
        'image/jpg': 'Imagem',
        'image/png': 'Imagem'
    };
    return typeMap[mimeType] || 'Documento';
}

function formatFileSize(bytes) {
    if (!bytes) return '0 Bytes';
    const k = 1024, sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}


// ============================================================================
// DADOS INICIAIS E CONFIGURAÇÕES
// ============================================================================

// Dados dos usuários do sistema
const users = [
    {
        username: 'admin',
        password: 'admin123',
        nome: 'Sarah Jayane',
        perfil: 'Psicóloga',
        crp: '11/12345'
    },
    {
        username: 'estagiario',
        password: 'estagio123',
        nome: 'Pablo Rocha',
        perfil: 'Estagiário'
    }
];



// Configurações editáveis da unidade
let unitSettings = {
    nomeUnidade: 'Núcleo de Saúde Mental - Alcântaras/CE',
    responsavelTecnico: 'Sarah Jayane',
    crpResponsavel: '11/12345',
    telefoneContato: '(85) 3366-1234',
    enderecoUnidade: 'Rua da Saúde, 100 - Centro, Alcântaras/CE',
    emailContato: 'saudemental@alcantaras.ce.gov.br'
};



// Opções do sistema com dados reais de Alcântaras/CE
const systemOptions = {
    postosSaude: [
        'FRANCISCO MACHADO ALCANTARA',
        'DOUTOR SHIGUEO NAKAMURA',
        'JOAQUIM XIMENES CARVALHO',
        'HOSPITAL ANTONIO ROCHA FREIRE',
        'SITIO SAQUINHO',
        'RAIMUNDO NONATO - Carmolândia',
        'VEREADOR JOSE REINALDO',
        'RAIMUNDO NONATO - Bonfim'
    ],
    
    statusAcompanhamento: [
        'Em acompanhamento',
        'Melhora significativa',
        'Alta terapêutica',
        'Estável',
        'Em recuperação',
        'Faltoso',
        'Encaminhado para CAPS'
    ]
};

// Estado global da aplicação
let appState = {
    currentUser: null,
    currentView: 'dashboard',
    currentPatientId: null,
    isEditingPatient: false,
    filteredPatients: [],
    sidebarOpen: false,
    theme: 'light',
    currentDocumentId: null
};

// Variável global para armazenar dados simulados de documentos
let documentDataStore = new Map();

// ============================================================================
// UTILITÁRIOS E HELPERS
// ============================================================================

// Função para atualizar indicadores visuais de persistência
function updatePersistenceIndicators() {
    try {
        const stats = dataPersistence.obterEstatisticas();
        
        // Atualizar indicador no cabeçalho
        const persistenceIndicator = document.getElementById('persistenceIndicator');
        if (persistenceIndicator) {
            persistenceIndicator.innerHTML = `
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <ellipse cx="12" cy="5" rx="9" ry="3"/>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                </svg>
                <span>Salvos: ${stats.totalPacientes}P/${stats.totalDocumentos}D</span>
            `;
            persistenceIndicator.title = `Sistema ativo - ${stats.totalPacientes} pacientes e ${stats.totalDocumentos} documentos salvos. Última atualização: ${new Date(stats.ultimaAtualizacao).toLocaleTimeString('pt-BR')}`;
        }
        
        // Atualizar status na página de configurações
        const dataStatusInfo = document.getElementById('dataStatusInfo');
        if (dataStatusInfo) {
            dataStatusInfo.textContent = `✅ ${stats.totalPacientes} Pacientes + ${stats.totalDocumentos} Documentos SALVOS`;
        }
        
    } catch (error) {
        console.error('Erro ao atualizar indicadores:', error);
    }
}

// Função para mostrar notificações toast
function showToast(message, type = 'success', duration = 3000) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    
    const icons = {
        success: `<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>`,
        error: `<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>`,
        warning: `<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <point cx="12" cy="17"/>
                  </svg>`
    };
    
    toast.innerHTML = `
        ${icons[type] || icons.success}
        <div class="toast-content">
            <strong>${message}</strong>
        </div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in-out forwards';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

// Função para formatar data
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Função para gerar ID único
function generateId() {
    return Math.max(...patients.map(p => p.id), 0) + 1;
}

// Função para validar telefone
function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

// ============================================================================
// PWA E INSTALAÇÃO
// ============================================================================

let deferredPrompt;
let installPromptShown = false;

// Evento para capturar o prompt do navegador
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Exibe prompt após 30 segundos
    setTimeout(() => {
        if (!installPromptShown) {
            showInstallPrompt();
        }
    }, 30000);
});

function showInstallPrompt() {
    const prompt = document.getElementById('installPrompt');
    if (prompt) prompt.classList.remove('hidden');
    installPromptShown = true;
}

function dismissInstallPrompt() {
    const prompt = document.getElementById('installPrompt');
    if (prompt) prompt.classList.add('hidden');
}

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((result) => {
            if (result.outcome === 'accepted') {
                showToast('Aplicativo instalado com sucesso!');
            }
            deferredPrompt = null;
            dismissInstallPrompt();
        });
    } else {
        showToast('Instalação não disponível neste momento', 'warning');
        dismissInstallPrompt();
    }
}

// Registro simulado do service worker para habilitar prompt do navegador
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('Service Worker registrado!'));
  });
}


// ============================================================================
// AUTENTICAÇÃO
// ============================================================================

function login(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        appState.currentUser = user;
        document.getElementById('userName').textContent = user.nome;
        
        // Esconder tela de login e mostrar app principal
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        
        // Inicializar dashboard
        showDashboard();
        updateDashboardStats();
        loadActivityList();
        
        showToast(`Bem-vindo(a), ${user.nome}!`);
    } else {
        showToast('Usuário ou senha incorretos', 'error');
    }
}

function logout() {
    appState.currentUser = null;
    appState.currentView = 'dashboard';
    
    // Limpar formulários
    document.getElementById('loginForm').reset();
    
    // Mostrar tela de login e esconder app principal
    document.getElementById('mainApp').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    
    // Fechar menu de usuário
    document.querySelector('.user-dropdown').classList.add('hidden');
    
    showToast('Logout realizado com sucesso');
}

// ============================================================================
// NAVEGAÇÃO E INTERFACE
// ============================================================================

function showView(viewId) {
    // Esconder todas as views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Mostrar view solicitada
    document.getElementById(viewId + 'View').classList.add('active');
    
    // Atualizar navegação ativa
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Atualizar breadcrumb
    const breadcrumbTexts = {
        'dashboard': 'Dashboard',
        'patients': 'Gestão de Pacientes',
        'patientForm': appState.isEditingPatient ? 'Editar Paciente' : 'Novo Paciente',
        'patientDetail': 'Detalhes do Paciente',
        'reports': 'Relatórios',
        'documents': 'Documentos',
        'settings': 'Configurações'
    };
    
    document.getElementById('breadcrumbText').textContent = breadcrumbTexts[viewId] || 'Dashboard';
    appState.currentView = viewId;
    
    // Fechar sidebar em mobile
    if (window.innerWidth <= 1024) {
        document.querySelector('.sidebar').classList.remove('open');
        appState.sidebarOpen = false;
    }
}

function showDashboard() {
    showView('dashboard');
    document.querySelector('[onclick="showDashboard()"]').classList.add('active');
    updateDashboardStats();
    loadActivityList();
    initChart();
}

function showPatients() {
    showView('patients');
    document.querySelector('[onclick="showPatients()"]').classList.add('active');
    loadPatientsList();
}

function showAddPatient() {
    appState.isEditingPatient = false;
    appState.currentPatientId = null;
    showView('patientForm');
    document.getElementById('patientFormTitle').textContent = 'Novo Paciente';
    document.getElementById('patientForm').reset();
}

function showReports() {
    showView('reports');
    document.querySelector('[onclick="showReports()"]').classList.add('active');
    initChart();
}

function showDocuments() {
    showView('documents');
    document.querySelector('[onclick="showDocuments()"]').classList.add('active');
    loadDocumentsList();
    populateDocumentPatientFilter();
    renderDocumentsList();

}

function showSettings() {
    showView('settings');
    document.querySelector('[onclick="showSettings()"]').classList.add('active');
    updateSettingsDisplay();
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    appState.sidebarOpen = !appState.sidebarOpen;
    
    if (appState.sidebarOpen) {
        sidebar.classList.add('open');
    } else {
        sidebar.classList.remove('open');
    }
}

function toggleUserMenu() {
    const dropdown = document.querySelector('.user-dropdown');
    dropdown.classList.toggle('hidden');
}

// Fechar dropdown ao clicar fora
document.addEventListener('click', (e) => {
    const userMenu = document.querySelector('.user-menu');
    const dropdown = document.querySelector('.user-dropdown');
    
    if (!userMenu.contains(e.target)) {
        dropdown.classList.add('hidden');
    }
});

// ============================================================================
// TEMA E MODO ESCURO
// ============================================================================

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-color-scheme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-color-scheme', newTheme);
    appState.theme = newTheme;
    
    showToast(`Tema ${newTheme === 'dark' ? 'escuro' : 'claro'} ativado`);
}

// Inicializar tema baseado na preferência do sistema
function initTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = prefersDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-color-scheme', theme);
    appState.theme = theme;
}

// ============================================================================
// DASHBOARD
// ============================================================================

function updateDashboardStats() {
    const totalPatients = patients.length;
    const activeFollowUps = patients.filter(p => p.status === 'Em acompanhamento').length;
    const significantImprovement = patients.filter(p => p.status === 'Melhora significativa').length;
    const documentsCount = documents.length;
    
    document.getElementById('totalPatients').textContent = totalPatients;
    document.getElementById('activeFollowUps').textContent = activeFollowUps;
    document.getElementById('significantImprovement').textContent = significantImprovement;
    document.getElementById('documentsCount').textContent = documentsCount;
    
    // Atualizar indicador de persistência no console
    const stats = dataPersistence.obterEstatisticas();
    console.log(`📊 Stats atualizadas - Pacientes: ${stats.totalPacientes}, Documentos: ${stats.totalDocumentos}`);
    
    // Atualizar indicadores visuais
    updatePersistenceIndicators();
}

function timeAgo(dateString) {
    const data = new Date(dateString);
    const diff = Math.floor((Date.now() - data.getTime()) / 1000);
    if (diff < 60) return 'Agora mesmo';
    if (diff < 3600) return `${Math.floor(diff/60)} min atrás`;
    if (diff < 86400) return `${Math.floor(diff/3600)} h atrás`;
    return `${Math.floor(diff/86400)} dia${Math.floor(diff/86400) > 1 ? 's' : ''} atrás`;
}

function loadActivityList() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;

    // Gera dinamicamente
    const stats = dataPersistence.obterEstatisticas();
    const pacientesOrdenados = [...patients].sort((a, b) =>
        new Date(b.data_ultima_edicao || b.data_cadastro) - new Date(a.data_ultima_edicao || a.data_cadastro)
    );
    const documentosOrdenados = [...documents].sort((a, b) =>
        new Date(b.uploadDate) - new Date(a.uploadDate)
    );

    // Coleta últimas ações de pacientes e documentos
    const ativsPacientes = pacientesOrdenados.slice(0, 3).map(p => ({
        type: 'patient',
        title: (p.data_cadastro === p.data_ultima_edicao || !p.data_ultima_edicao) ? 'Paciente cadastrado' : 'Paciente atualizado',
        description: `${p.nome} - ${p.posto_saude}`,
        time: timeAgo(p.data_ultima_edicao || p.data_cadastro),
        icon: 'user-plus'
    }));

    const ativsDocs = documentosOrdenados.slice(0, 2).map(d => ({
        type: 'document',
        title: 'Documento anexado',
        description: `${d.title} - ${d.patientName}`,
        time: timeAgo(d.uploadDate),
        icon: 'file-plus'
    }));

    // Ação de relatório (exemplo: última geração foi alteração da dashboard)
    const relatorio = {
        type: 'report',
        title: 'Sistema de persistência ativo',
        description: `${stats.totalPacientes} pacientes e ${stats.totalDocumentos} documentos salvos`,
        time: timeAgo(stats.ultimaAtualizacao),
        icon: 'database'
    };

    // Ícones já existem na sua função atual
    const icons = {
        'user-plus': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
        'file-plus': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`,
        'download': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
        'check-circle': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>`,
        'database': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`
    };

    // Monta lista final de atividades
    const todasAtividades = [relatorio, ...ativsPacientes, ...ativsDocs];

    activityList.innerHTML = todasAtividades.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">${icons[activity.icon]}</div>
            <div class="activity-content">
                <p><strong>${activity.title}</strong></p>
                <p>${activity.description}</p>
                <small>${activity.time}</small>
            </div>
        </div>
    `).join('');
}


// ============================================================================
// AUTOCOMPLETE ACS
// ============================================================================

function setupAcsAutocomplete(input) {
    let suggestionsList = null;
    
    function createSuggestionsList() {
        suggestionsList = document.createElement('div');
        suggestionsList.className = 'acs-suggestions';
        suggestionsList.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-top: none;
            border-radius: 0 0 var(--radius-base) var(--radius-base);
            max-height: 200px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
            box-shadow: var(--shadow-md);
        `;
        
        input.parentNode.style.position = 'relative';
        input.parentNode.appendChild(suggestionsList);
    }
    
    function getAcsSuggestions(term) {
        const uniqueAcs = [...new Set(patients.map(p => p.acs_responsavel))]
            .filter(acs => acs.toLowerCase().includes(term.toLowerCase()))
            .sort();
        return uniqueAcs;
    }
    
    function showSuggestions(suggestions) {
        if (!suggestionsList) createSuggestionsList();
        
        if (suggestions.length === 0) {
            suggestionsList.style.display = 'none';
            return;
        }
        
        suggestionsList.innerHTML = suggestions.map(acs => `
            <div class="acs-suggestion" style="
                padding: var(--space-8) var(--space-12);
                cursor: pointer;
                transition: background var(--duration-fast) var(--ease-standard);
                border-bottom: 1px solid var(--color-border);
            " onmouseover="this.style.background='var(--color-secondary)'" 
               onmouseout="this.style.background='transparent'" 
               onclick="selectAcs('${acs}')">
                ${acs}
            </div>
        `).join('');
        
        suggestionsList.style.display = 'block';
    }
    
    function hideSuggestions() {
        if (suggestionsList) {
            suggestionsList.style.display = 'none';
        }
    }
    
    input.addEventListener('input', (e) => {
        const term = e.target.value.trim();
        if (term.length >= 2) {
            const suggestions = getAcsSuggestions(term);
            showSuggestions(suggestions);
        } else {
            hideSuggestions();
        }
    });
    
    input.addEventListener('blur', () => {
        // Delay para permitir clique na sugestão
        setTimeout(hideSuggestions, 150);
    });
    
    input.addEventListener('focus', (e) => {
        const term = e.target.value.trim();
        if (term.length >= 2) {
            const suggestions = getAcsSuggestions(term);
            showSuggestions(suggestions);
        }
    });
    
    // Função global para selecionar ACS
    window.selectAcs = function(acsName) {
        input.value = acsName;
        hideSuggestions();
        input.focus();
    };
}

// ============================================================================
// GESTÃO DE PACIENTES
// ============================================================================

function loadPatientsList() {
    appState.filteredPatients = [...patients];
    renderPatientsList();
}

function renderPatientsList() {
    const patientsList = document.getElementById('patientsList');
    
    if (appState.filteredPatients.length === 0) {
        patientsList.innerHTML = `
            <div class="card">
                <div class="card__body" style="text-align: center; padding: 3rem;">
                    <p style="color: var(--color-text-secondary);">Nenhum paciente encontrado com os filtros aplicados.</p>
                    <button class="btn btn--primary" onclick="showAddPatient()">
                        Cadastrar Primeiro Paciente
                    </button>
                </div>
            </div>
        `;
        return;
    }
    
    patientsList.innerHTML = appState.filteredPatients.map(patient => {
        const statusClass = {
            'Em acompanhamento': 'info',
            'Melhora significativa': 'success',
            'Alta terapêutica': 'success',
            'Faltoso': 'warning',
            'Encaminhado para CAPS': 'error'
        }[patient.status] || 'info';
        
        return `
            <div class="patient-card" onclick="showPatientDetail(${patient.id})">
                <div class="patient-header">
                    <div class="patient-info">
                        <h3>${patient.nome}</h3>
                        <p class="patient-meta">${patient.idade} anos • ${patient.sexo} • ${formatDate(patient.data_cadastro)}</p>
                    </div>
                    <div class="status status--${statusClass}">${patient.status}</div>
                </div>
                <div class="patient-content">
                    <div class="patient-detail">
                        <strong>Posto de Saúde:</strong>
                        <span>${patient.posto_saude}</span>
                    </div>
                    <div class="patient-detail">
                        <strong>ACS:</strong>
                        <span>${patient.acs_responsavel}</span>
                    </div>
                    <div class="patient-detail">
                        <strong>Telefone:</strong>
                        <span>${patient.telefone}</span>
                    </div>
                    <div class="patient-detail">
                        <strong>Queixa Principal:</strong>
                        <span>${patient.queixa_principal.length > 50 ? patient.queixa_principal.substring(0, 50) + '...' : patient.queixa_principal}</span>
                    </div>
                </div>
                <div class="patient-actions" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--color-border); display: flex; gap: 0.5rem; justify-content: flex-end;">
                    <button class="btn btn--outline btn--sm" onclick="event.stopPropagation(); editPatient(${patient.id})" title="Editar paciente">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Editar
                    </button>
                    <button class="btn btn--outline btn--sm" onclick="event.stopPropagation(); deletePatient(${patient.id})" style="color: var(--color-error); border-color: var(--color-error);" title="Excluir paciente">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3,6 5,6 21,6"/>
                            <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"/>
                        </svg>
                        Excluir
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

window.deletePatient = function(id) {
    if (!confirm('Deseja realmente excluir este paciente?')) return;
    const idx = patients.findIndex(p => p.id === id);
    if (idx === -1) {
        showToast('Paciente não encontrado!', 'error');
        return;
    }
    patients.splice(idx, 1);
    if (Array.isArray(appState.filteredPatients)) {
        appState.filteredPatients = [...patients];
    }
    if (dataPersistence && typeof dataPersistence.salvarPacientes === 'function') {
        dataPersistence.salvarPacientes(patients);
    }
    showToast('Paciente excluído com sucesso!', 'success');
    renderPatientsList();
};

function deletePatient(id) {
    if (!confirm('Deseja realmente excluir este paciente?')) return;
    // Removendo do array global de pacientes:
    const idx = patients.findIndex(p => p.id === id);
    if (idx === -1) {
        showToast('Paciente não encontrado!', 'error');
        return;
    }
    patients.splice(idx, 1);
    // Opcional: Atualize o estado filtrado se usar filtragem
    appState.filteredPatients = patients.filter(/* sua lógica de filtro, ou = [...patients] */);
    // Salve no persistente:
    if (dataPersistence && dataPersistence.salvarPacientes) {
        dataPersistence.salvarPacientes(patients);
    }
    showToast('Paciente excluído com sucesso!', 'success');
    renderPatientsList(); // Isso recarrega a lista após alterar.
}

function filterPatients() {
    const searchTerm = document.getElementById('patientSearch').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const unitFilter = document.getElementById('unitFilter').value;
    const acsFilter = document.getElementById('acsFilter').value.toLowerCase();
    
    appState.filteredPatients = patients.filter(patient => {
        const matchesSearch = !searchTerm || 
            patient.nome.toLowerCase().includes(searchTerm) ||
            patient.telefone.includes(searchTerm) ||
            patient.endereco.toLowerCase().includes(searchTerm);
            
        const matchesStatus = !statusFilter || patient.status === statusFilter;
        const matchesUnit = !unitFilter || patient.posto_saude === unitFilter;
        const matchesAcs = !acsFilter || patient.acs_responsavel.toLowerCase().includes(acsFilter);
        
        return matchesSearch && matchesStatus && matchesUnit && matchesAcs;
    });
    
    renderPatientsList();
}

function savePatient(event) {
    event.preventDefault();
    
    // Mostrar feedback de salvamento
    showToast('Salvando paciente...', 'info', 1000);
    
    const formData = {
        nome: document.getElementById('patientNome').value,
        idade: parseInt(document.getElementById('patientIdade').value),
        sexo: document.getElementById('patientSexo').value,
        telefone: formatPhone(document.getElementById('patientTelefone').value),
        endereco: document.getElementById('patientEndereco').value,
        posto_saude: document.getElementById('patientPostoSaude').value,
        acs_responsavel: document.getElementById('patientAcsResponsavel').value.trim(),
        queixa_principal: document.getElementById('patientQueixaPrincipal').value,
        historico_familiar: document.getElementById('patientHistoricoFamiliar').value,
        historico_saude_mental: document.getElementById('patientHistoricoSaudeMental').value,
        tratamentos_anteriores: document.getElementById('patientTratamentosAnteriores').value,
        fatores_risco: document.getElementById('patientFatoresRisco').value,
        fatores_protecao: document.getElementById('patientFatoresProtecao').value,
        evolucao: document.getElementById('patientEvolucao').value,
        conduta: document.getElementById('patientConduta').value,
        observacoes: document.getElementById('patientObservacoes').value,
        status: document.getElementById('patientStatus').value
    };
    
    try {
        if (appState.isEditingPatient) {
            // Editar paciente existente
            const patientIndex = patients.findIndex(p => p.id === appState.currentPatientId);
            if (patientIndex !== -1) {
                patients[patientIndex] = {
                    ...patients[patientIndex],
                    ...formData,
                    data_ultima_edicao: new Date().toISOString().split('T')[0]
                };
                
                // SALVAR IMEDIATAMENTE NO SISTEMA DE PERSISTÊNCIA
                dataPersistence.salvarPacientes(patients);
                
                // Atualizar indicadores visuais
                updatePersistenceIndicators();
                
                showToast('✅ Paciente atualizado e salvo com sucesso!', 'success');
                console.log(`✅ Paciente ${formData.nome} atualizado e persistido`);
            }
        } else {
            // Criar novo paciente
            const newPatient = {
                id: generateId(),
                ...formData,
                data_cadastro: new Date().toISOString().split('T')[0],
                data_ultima_edicao: new Date().toISOString().split('T')[0]
            };
            patients.push(newPatient);
            
            // SALVAR IMEDIATAMENTE NO SISTEMA DE PERSISTÊNCIA
            dataPersistence.salvarPacientes(patients);
            
            // Atualizar indicadores visuais
            updatePersistenceIndicators();
            
            showToast('✅ Novo paciente cadastrado e salvo com sucesso!', 'success');
            console.log(`✅ Novo paciente ${formData.nome} criado e persistido`);
        }
        
        // Criar backup automático
        dataPersistence.criarBackup();
        
        // Atualizar dashboard e voltar para lista
        updateDashboardStats();
        showPatients();
        
    } catch (error) {
        console.error('❌ Erro ao salvar paciente:', error);
        showToast('❌ Erro ao salvar paciente. Tente novamente.', 'error');
    }
}

function editPatient(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;
    
    appState.isEditingPatient = true;
    appState.currentPatientId = patientId;
    
    // Preencher formulário
    document.getElementById('patientNome').value = patient.nome;
    document.getElementById('patientIdade').value = patient.idade;
    document.getElementById('patientSexo').value = patient.sexo;
    document.getElementById('patientTelefone').value = patient.telefone;
    document.getElementById('patientEndereco').value = patient.endereco;
    document.getElementById('patientPostoSaude').value = patient.posto_saude;
    document.getElementById('patientAcsResponsavel').value = patient.acs_responsavel;
    document.getElementById('patientQueixaPrincipal').value = patient.queixa_principal;
    document.getElementById('patientHistoricoFamiliar').value = patient.historico_familiar;
    document.getElementById('patientHistoricoSaudeMental').value = patient.historico_saude_mental;
    document.getElementById('patientTratamentosAnteriores').value = patient.tratamentos_anteriores;
    document.getElementById('patientFatoresRisco').value = patient.fatores_risco;
    document.getElementById('patientFatoresProtecao').value = patient.fatores_protecao;
    document.getElementById('patientEvolucao').value = patient.evolucao;
    document.getElementById('patientConduta').value = patient.conduta;
    document.getElementById('patientObservacoes').value = patient.observacoes || '';
    document.getElementById('patientStatus').value = patient.status;
    
    showView('patientForm');
    document.getElementById('patientFormTitle').textContent = 'Editar Paciente';
}

// Adicionar variável global para o paciente atual
let currentPatientId = null;

function showPatientDetail(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;
    
    appState.currentPatientId = patientId;
    currentPatientId = patientId; // Para uso global
    
    document.getElementById('patientDetailName').textContent = patient.nome;
    
    const statusClass = {
        'Em acompanhamento': 'info',
        'Melhora significativa': 'success',
        'Alta terapêutica': 'success',
        'Faltoso': 'warning',
        'Encaminhado para CAPS': 'error'
    }[patient.status] || 'info';
    
    const patientDocuments = documents.filter(d => d.patientId === patientId);
    
    document.getElementById('patientDetailContent').innerHTML = `
        <div class="detail-section">
            <h3>Dados Pessoais</h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <strong>Nome Completo:</strong>
                    <span>${patient.nome}</span>
                </div>
                <div class="detail-item">
                    <strong>Idade:</strong>
                    <span>${patient.idade} anos</span>
                </div>
                <div class="detail-item">
                    <strong>Sexo:</strong>
                    <span>${patient.sexo}</span>
                </div>
                <div class="detail-item">
                    <strong>Telefone:</strong>
                    <span>${patient.telefone}</span>
                </div>
                <div class="detail-item detail-full">
                    <strong>Endereço:</strong>
                    <span>${patient.endereco}</span>
                </div>
            </div>
        </div>
        
        <div class="detail-section">
            <h3>Informações do SUS</h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <strong>Posto de Saúde:</strong>
                    <span>${patient.posto_saude}</span>
                </div>
                <div class="detail-item">
                    <strong>ACS Responsável:</strong>
                    <span>${patient.acs_responsavel}</span>
                </div>
                <div class="detail-item">
                    <strong>Status do Acompanhamento:</strong>
                    <div class="status status--${statusClass}">${patient.status}</div>
                </div>
            </div>
        </div>
        
        <div class="detail-section">
            <h3>Informações Clínicas</h3>
            <div class="detail-grid">
                <div class="detail-item detail-full">
                    <strong>Queixa Principal:</strong>
                    <span>${patient.queixa_principal}</span>
                </div>
                <div class="detail-item detail-full">
                    <strong>Histórico Familiar:</strong>
                    <span>${patient.historico_familiar || 'Não informado'}</span>
                </div>
                <div class="detail-item detail-full">
                    <strong>Histórico de Saúde Mental:</strong>
                    <span>${patient.historico_saude_mental || 'Não informado'}</span>
                </div>
                <div class="detail-item detail-full">
                    <strong>Tratamentos Anteriores:</strong>
                    <span>${patient.tratamentos_anteriores || 'Não informado'}</span>
                </div>
                <div class="detail-item">
                    <strong>Fatores de Risco:</strong>
                    <span>${patient.fatores_risco || 'Não informado'}</span>
                </div>
                <div class="detail-item">
                    <strong>Fatores de Proteção:</strong>
                    <span>${patient.fatores_protecao || 'Não informado'}</span>
                </div>
                <div class="detail-item detail-full">
                    <strong>Evolução:</strong>
                    <span>${patient.evolucao || 'Não informado'}</span>
                </div>
                <div class="detail-item detail-full">
                    <strong>Conduta:</strong>
                    <span>${patient.conduta || 'Não informado'}</span>
                </div>
                ${patient.observacoes ? `
                    <div class="detail-item detail-full">
                        <strong>Observações:</strong>
                        <span>${patient.observacoes}</span>
                    </div>
                ` : ''}
                <div class="detail-item">
                    <strong>Data de Cadastro:</strong>
                    <span>${formatDate(patient.data_cadastro)}</span>
                </div>
            </div>
        </div>
        
        <div class="detail-section">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h3>Documentos (${patientDocuments.length})</h3>
                <button class="btn btn--primary btn--sm" onclick="showUploadDocumentForPatient(${patientId})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17,8 12,3 7,8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    Anexar Documento
                </button>
            </div>
            
            <!-- Área de upload drag & drop -->
            <div id="dropZone-${patientId}" class="drop-zone" style="
                border: 2px dashed var(--color-border);
                border-radius: var(--radius-base);
                padding: 2rem;
                text-align: center;
                background: var(--color-bg-1);
                margin-bottom: 1rem;
                transition: all 0.3s ease;
                cursor: pointer;
            " onclick="document.getElementById('fileInput-${patientId}').click()">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" style="margin-bottom: 1rem;">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17,8 12,3 7,8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <p style="margin: 0; color: var(--color-text);">Clique aqui ou arraste arquivos para fazer upload</p>
                <small style="color: var(--color-text-secondary);">PDF, DOC, DOCX, JPG, PNG (máx. 16MB)</small>
                <input type="file" id="fileInput-${patientId}" style="display: none;" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onchange="handleFileUpload(this, ${patientId})">
            </div>
            
            <!-- Lista de documentos -->
            <div class="documents-list">
                ${patientDocuments.length > 0 ? patientDocuments.map(doc => `
                    <div class="document-item">
                        <div class="document-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14,2 14,8 20,8"/>
                            </svg>
                        </div>
                        <div class="document-content">
                            <h4>${doc.title}</h4>
                            <p>${doc.fileName} • ${doc.size} • ${formatDate(doc.uploadDate)}</p>
                            <p>${doc.description}</p>
                        </div>
                        <div class="document-actions">
                            <button class="btn btn--outline btn--sm" onclick="viewDocument(${doc.id})">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                                Visualizar
                            </button>
                            <button class="btn btn--outline btn--sm" onclick="downloadDocument(${doc.id})">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                    <polyline points="7,10 12,15 17,10"/>
                                    <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                                Baixar
                            </button>
                            <button class="btn btn--outline btn--sm" onclick="deleteDocument(${doc.id})" style="color: var(--color-error); border-color: var(--color-error);">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3,6 5,6 21,6"/>
                                    <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"/>
                                </svg>
                                Excluir
                            </button>
                        </div>
                    </div>
                `).join('') : '<p style="text-align: center; color: var(--color-text-secondary); padding: 2rem;">Nenhum documento anexado ainda.</p>'}
            </div>
        </div>
    `;
    
    showView('patientDetail');
}

// Função para corrigir o botão de editar paciente
function editPatientFromDetail() {
    if (appState.currentPatientId) {
        editPatient(appState.currentPatientId);
    } else {
        showToast('Erro: ID do paciente não encontrado', 'error');
    }
}

// Função para gerar relatório do paciente atual
function generateCurrentPatientReport() {
    if (appState.currentPatientId) {
        generatePatientReport(appState.currentPatientId);
    } else {
        showToast('Erro: ID do paciente não encontrado', 'error');
    }
}


function renderDocumentsList() {
    const documentsList = document.getElementById('documentsList');
    const searchTerm = (document.getElementById('documentSearch')?.value || '').toLowerCase();
    const patientFilter = document.getElementById('documentPatientFilter')?.value || '';

    let filtered = Array.isArray(documents) ? [...documents] : [];
    if (patientFilter) filtered = filtered.filter(doc => String(doc.patientId) === String(patientFilter));
    if (searchTerm)
        filtered = filtered.filter(doc =>
            (doc.title || '').toLowerCase().includes(searchTerm) ||
            (doc.patientName || '').toLowerCase().includes(searchTerm) ||
            (doc.description || '').toLowerCase().includes(searchTerm)
        );

    if (!documentsList) return;
    if (filtered.length === 0) {
        documentsList.innerHTML = `<div class="card"><div class="card__body" style="text-align:center;padding:3rem;">Nenhum documento encontrado.</div></div>`;
        return;
    }

    documentsList.innerHTML = filtered.map(doc => `
  <div class="document-item">
    <div class="document-content">
      <h4>${doc.title || ''}</h4>
      <p><strong>Paciente:</strong> ${doc.patientName || ''}</p>
      <p>${doc.fileName || ''} • ${doc.fileType || ''} • ${doc.size || ''} • ${(typeof formatDate === "function" ? formatDate(doc.uploadDate) : (doc.uploadDate||''))}</p>
      <p>${doc.description || ''}</p>
    </div>
    <div class="document-actions">
      <button class="btn btn--outline btn--sm" onclick="previewDocument(${doc.id})">Visualizar</button>
      <button class="btn btn--outline btn--sm" onclick="downloadDocument(${doc.id})">Download</button>
      <button class="btn btn--outline btn--sm btn--error" onclick="deleteDocument(${doc.id})">Excluir</button>
    </div>
  </div>
`).join('');

console.log('renderDocumentsList executada!')
    
}

window.deleteDocument = function(id) {
    if (!confirm('Deseja realmente excluir este documento?')) return;
    documents = documents.filter(d => d.id !== id);
    if (dataPersistence && typeof dataPersistence.salvarDocumentos === 'function') {
        dataPersistence.salvarDocumentos(documents);
    }
    renderDocumentsList();
};


function deleteDocument(id) {
    documents = documents.filter(d => d.id !== id);
    if (dataPersistence && typeof dataPersistence.salvarDocumentos === 'function') {
        dataPersistence.salvarDocumentos(documents);
    }
    renderDocumentsList();
}




// ============================================================================
// DOCUMENTOS
// ============================================================================

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

function loadDocumentsList() {
    const documentsList = document.getElementById('documentsList');
    
    if (documents.length === 0) {
        documentsList.innerHTML = `
            <div class="card">
                <div class="card__body" style="text-align: center; padding: 3rem;">
                    <p style="color: var(--color-text-secondary);">Nenhum documento encontrado.</p>
                    <button class="btn btn--primary" onclick="showUploadDocument()">
                        Enviar Primeiro Documento
                    </button>
                </div>
            </div>
        `;
        return;
    }
    
    documentsList.innerHTML = documents.map(doc => `
        <div class="document-item">
            <div class="document-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                </svg>
            </div>
            <div class="document-content">
                <h4>${doc.title}</h4>
                <p><strong>Paciente:</strong> ${doc.patientName}</p>
                <p>${doc.fileName} • ${doc.fileType} • ${doc.size} • ${formatDate(doc.uploadDate)}</p>
                <p>${doc.description}</p>
            </div>
            <div class="document-actions">
                <button class="btn btn--outline btn--sm" onclick="viewDocument(${doc.id})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                    Visualizar
                </button>
                                <button class="btn btn--outline btn--sm" onclick="downloadDocument(${doc.id})">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="7,10 12,15 17,10"/>
                                        <line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                    Download
                                </button>
            </div>
        </div>
    `).join('');
}

function populateDocumentPatientFilter() {
    const select = document.getElementById('documentPatientFilter');
    select.innerHTML = '<option value="">Todos os pacientes</option>';
    
    patients.forEach(patient => {
        const option = document.createElement('option');
        option.value = patient.id;
        option.textContent = patient.nome;
        select.appendChild(option);
    });
}

function filterDocuments() {
    const searchTerm = document.getElementById('documentSearch').value.toLowerCase();
    const patientFilter = document.getElementById('documentPatientFilter').value;
    
    const filteredDocs = documents.filter(doc => {
        const matchesSearch = !searchTerm || 
            doc.title.toLowerCase().includes(searchTerm) ||
            doc.patientName.toLowerCase().includes(searchTerm) ||
            doc.description.toLowerCase().includes(searchTerm);
            
        const matchesPatient = !patientFilter || doc.patientId.toString() === patientFilter;
        
        return matchesSearch && matchesPatient;
    });
    
    const documentsList = document.getElementById('documentsList');
    
    if (filteredDocs.length === 0) {
        documentsList.innerHTML = `
            <div class="card">
                <div class="card__body" style="text-align: center; padding: 3rem;">
                    <p style="color: var(--color-text-secondary);">Nenhum documento encontrado com os filtros aplicados.</p>
                </div>
            </div>
        `;
        return;
    }
    
    documentsList.innerHTML = filteredDocs.map(doc => `
        <div class="document-item">
            <div class="document-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                </svg>
            </div>
            <div class="document-content">
                <h4>${doc.title}</h4>
                <p><strong>Paciente:</strong> ${doc.patientName}</p>
                <p>${doc.fileName} • ${doc.fileType} • ${doc.size} • ${formatDate(doc.uploadDate)}</p>
                <p>${doc.description}</p>
            </div>
            <div class="document-actions">
                <button class="btn btn--outline btn--sm" onclick="viewDocument(${doc.id})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                    Visualizar
                </button>
                <button class="btn btn--outline btn--sm" onclick="downloadDocument(${doc.id})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7,10 12,15 17,10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download
                </button>
            </div>
        </div>
    `).join('');
}

function showUploadDocument() {
    // Popular select de pacientes
    const select = document.getElementById('docPatient');
    select.innerHTML = '<option value="">Selecione o paciente...</option>';
    
    patients.forEach(patient => {
        const option = document.createElement('option');
        option.value = patient.id;
        option.textContent = patient.nome;
        select.appendChild(option);
    });
    
    document.getElementById('documentModal').classList.remove('hidden');
}

function closeDocumentModal() {
    document.getElementById('documentModal').classList.add('hidden');
    document.getElementById('documentForm').reset();
}

async function uploadDocument() {
    const patientId = document.getElementById('docPatient').value;
    const title = document.getElementById('docTitle').value;
    const file = document.getElementById('docFile').files[0];
    const description = document.getElementById('docDescription').value;
    if (!patientId || !title || !file) {
        showToast('Por favor, preencha todos os campos obrigatórios', 'error');
        return;
    }
    const patient = patients.find(p => p.id === parseInt(patientId));
    if (!patient) {
        showToast('Paciente não encontrado', 'error');
        return;
    }
    showToast('Enviando documento...', 'info', 1000);

    try {
        const fileContent = await readFileAsDataURL(file); // <- ESSENCIAL
        const newDocument = {
            id: Math.max(...documents.map(d => d.id), 0) + 1,
            patientId: parseInt(patientId),
            patientName: patient.nome,
            title: title,
            fileName: file.name,
            fileType: file.type.includes('pdf') ? 'PDF'
                    : file.type.includes('image') ? 'Imagem' : 'Documento',
            fileExtension: file.name.split('.').pop().toUpperCase(),
            mimeType: file.type,
            description: description,
            uploadDate: new Date().toISOString().split('T')[0],
            size: `${(file.size / 1024).toFixed(0)} KB`,
            fileContent // <- ISSO permite visualizar e baixar direito!
        };
        documents.push(newDocument);
        dataPersistence.salvarDocumentos(documents);
        updatePersistenceIndicators();
        showToast('✅ Documento enviado e salvo com sucesso!', 'success');
        console.log(`✅ Documento ${title} enviado para paciente ${patient.nome} e persistido`);
        dataPersistence.criarBackup();
        closeDocumentModal();
        loadDocumentsList();
        updateDashboardStats();
    } catch (error) {
        console.error('❌ Erro ao enviar documento:', error);
        showToast('❌ Erro ao enviar documento. Tente novamente.', 'error');
    }
}

function viewDocument(docId) {
    const doc = documents.find(d => d.id === docId);
    if (!doc) {
        showToast('Documento não encontrado', 'error');
        return;
    }
    appState.currentDocumentId = docId;
    document.getElementById('viewerDocTitle').textContent = doc.title;
    const viewerContent = document.getElementById('documentViewerContent');
    // PDF REAL:
    if (doc.mimeType === 'application/pdf' || doc.fileType === 'PDF' || doc.fileExtension === 'PDF') {
        viewerContent.innerHTML = `
            <iframe class="document-viewer-content" src="${doc.fileContent}" style="width:100%;height:60vh;border:none;" title="${doc.title}">
                <p style="padding:2rem;text-align:center;color:var(--color-text-secondary);">
                  Seu navegador não suporta PDF.<button class="btn btn--primary" onclick="downloadCurrentDocument()">Baixar Documento</button>
                </p>
            </iframe>
        `;
    }
    // IMAGEM REAL:
    else if (
        doc.fileType === 'Imagem' ||
        (doc.fileName && doc.fileName.match(/\.(jpg|jpeg|png|gif)$/i)) ||
        (doc.mimeType && doc.mimeType.startsWith('image/'))
    ) {
        viewerContent.innerHTML = `
            <div style="position:relative;display:flex;align-items:center;justify-content:center;">
                <div class="zoom-controls" style="position:absolute;left:1rem;top:1rem;z-index:10;">
                    <button class="zoom-btn" onclick="zoomImage(0.8)" title="Diminuir zoom">-</button>
                    <button class="zoom-btn" onclick="zoomImage(1.2)" title="Aumentar zoom">+</button>
                </div>
                <img id="viewerImage" class="document-viewer-image" src="${doc.fileContent}" alt="${doc.title}" style="max-width:90%;max-height:90%;transform:scale(1);">
            </div>
        `;
        window.currentZoom = 1;
    }
    // TEXTO/OUTRO
    else {
        viewerContent.innerHTML = `
            <div class="document-viewer-text" style="padding:2rem;text-align:center;">
                <h3>${doc.title}</h3>
                <p><strong>Paciente:</strong> ${doc.patientName || ''}</p>
                <p><strong>Data:</strong> ${formatDate(doc.uploadDate) || ''}</p>
                <p><strong>Descrição:</strong> ${doc.description || ''}</p>
                <hr>
                <h4>Tipo de arquivo:</h4>
                <p>${doc.fileType || doc.fileExtension || doc.mimeType || 'Desconhecido'}</p>
                <br>
                <button class="btn btn--primary" onclick="downloadCurrentDocument()">Baixar Arquivo</button>
            </div>
        `;
    }
    document.getElementById('documentViewerModal').classList.remove('hidden');
    showToast('Documento carregado para visualização');
}

function downloadDocument(docId) {
    const doc = documents.find(d => d.id === docId);
    if (!doc) {
        showToast('Documento não encontrado', 'error');
        return;
    }

    try {
        // SEMPRE usar o campo 'fileContent' (Data URL salvo no upload)
        if (doc.fileContent) {
            // Criar link e simular clique para download
            const a = document.createElement('a');
            a.href = doc.fileContent;
            a.download = doc.fileName; // Preserva o nome e extensão originais
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();

            setTimeout(() => {
                document.body.removeChild(a);
            }, 100);

            showToast(`Download iniciado: ${doc.fileName}`, 'success');
        } else {
            showToast('Arquivo original não disponível para download.', 'error');
        }
    } catch (error) {
        console.error('Erro no download:', error);
        showToast('Erro ao fazer download do documento. Tente novamente.', 'error');
    }
}



// NOVAS FUNÇÕES PARA UPLOAD DE DOCUMENTOS NA FICHA DO PACIENTE

// Função para mostrar modal de upload para paciente específico
function showUploadDocumentForPatient(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) {
        showToast('Paciente não encontrado', 'error');
        return;
    }
    
    // Pré-selecionar o paciente no modal
    const select = document.getElementById('docPatient');
    select.innerHTML = '<option value="">Selecione o paciente...</option>';
    
    patients.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        option.textContent = p.nome;
        if (p.id === patientId) {
            option.selected = true;
        }
        select.appendChild(option);
    });
    
    document.getElementById('documentModal').classList.remove('hidden');
}

// Função para gerenciar upload de arquivos na ficha
function handleFileUpload(input, patientId) {
    const file = input.files[0];
    if (!file) return;
    
    // Validar tamanho (16MB)
    if (file.size > 16 * 1024 * 1024) {
        showToast('Arquivo muito grande. Máximo 16MB permitido.', 'error');
        input.value = '';
        return;
    }
    
    // Validar tipo
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
        showToast('Tipo de arquivo não suportado. Use PDF, DOC, DOCX, JPG ou PNG.', 'error');
        input.value = '';
        return;
    }
    
    const patient = patients.find(p => p.id === patientId);
    if (!patient) {
        showToast('Paciente não encontrado', 'error');
        return;
    }
    
    // Simular upload e criar documento
    uploadDocumentDirectly(file, patientId, patient.nome);
    input.value = ''; // Limpar input
}

// Função para upload direto de documento
async function uploadDocumentDirectly(file, patientId, patientName, title = '', description = '') {
    showToast('Processando upload...', 'info', 1000);

    try {
        const fileContent = await readFileAsDataURL(file); // Lê arquivo para DataURL!
        const newDocument = {
            id: Math.max(...documents.map(d => d.id), 0) + 1,
            patientId: parseInt(patientId),
            patientName: patientName,
            title: title || file.name,
            fileName: file.name,
            fileType: file.type.includes('pdf') ? 'PDF'
                    : file.type.includes('image') ? 'Imagem' : 'Documento',
            fileExtension: file.name.split('.').pop().toUpperCase(),
            mimeType: file.type,
            description: description || '',
            uploadDate: new Date().toISOString().split('T')[0],
            size: `${(file.size / 1024).toFixed(0)} KB`,
            fileContent // ESSENCIAL para visualizar/baixar depois!
        };

        documents.push(newDocument);
        dataPersistence.salvarDocumentos(documents);
        updatePersistenceIndicators();
        // Se necessário, atualizar visualização do paciente (opcional)
        if (typeof showPatientDetail === 'function') showPatientDetail(patientId);

        showToast('✅ Documento anexado e salvo com sucesso!', 'success');
        console.log(`✅ Documento ${file.name} anexado ao paciente ${patientName} e persistido`);

        if (dataPersistence.criarBackup) dataPersistence.criarBackup();
        if (typeof updateDashboardStats === 'function') updateDashboardStats();

    } catch (error) {
        console.error('❌ Erro ao anexar documento:', error);
        showToast('❌ Erro ao anexar documento. Tente novamente.', 'error');
    }
}

// Função para obter tipo de arquivo
function getFileType(mimeType) {
    if (mimeType.includes('pdf')) return 'PDF';
    if (mimeType.includes('image')) return 'Imagem';
    if (mimeType.includes('word') || mimeType.includes('document')) return 'Documento';
    return 'Arquivo';
}

// Função para excluir documento
function deleteDocument(docId) {
    if (confirm('Tem certeza que deseja excluir este documento? Esta ação não pode ser desfeita.')) {
        try {
            const docIndex = documents.findIndex(d => d.id === docId);
            if (docIndex !== -1) {
                const doc = documents[docIndex];
                documents.splice(docIndex, 1);
                
                // SALVAR IMEDIATAMENTE NO SISTEMA DE PERSISTÊNCIA
                dataPersistence.salvarDocumentos(documents);
                
                // Atualizar indicadores visuais
                updatePersistenceIndicators();
                
                // Atualizar visualização se estiver na ficha do paciente
                if (appState.currentPatientId) {
                    showPatientDetail(appState.currentPatientId);
                }
                
                // Atualizar lista de documentos se estiver na página de documentos
                if (appState.currentView === 'documents') {
                    loadDocumentsList();
                }
                
                showToast(`✅ Documento "${doc.title}" excluído e salvo com sucesso!`, 'success');
                console.log(`✅ Documento ${doc.title} excluído e alteração persistida`);
                
                // Criar backup automático
                dataPersistence.criarBackup();
                
                updateDashboardStats();
            } else {
                showToast('❌ Documento não encontrado', 'error');
            }
        } catch (error) {
            console.error('❌ Erro ao excluir documento:', error);
            showToast('❌ Erro ao excluir documento. Tente novamente.', 'error');
        }
    }
}

// Função para fechar o visualizador de documentos
function closeDocumentViewer() {
    document.getElementById('documentViewerModal').classList.add('hidden');
    appState.currentDocumentId = null;
}

// Função para zoom na imagem
let currentZoom = 1;
function zoomImage(factor) {
    const image = document.getElementById('viewerImage');
    if (image) {
        currentZoom *= factor;
        // Limitar o zoom entre 0.1 e 5
        currentZoom = Math.max(0.1, Math.min(5, currentZoom));
        image.style.transform = `scale(${currentZoom})`;
    }
}




// ============================================================================
// RELATÓRIOS E PDF
// ============================================================================

function generatePatientReport(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) {
        showToast('Paciente não encontrado', 'error');
        return;
    }

    const reportWindow = window.open('', '_blank');
    
    const reportHTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório - ${patient.nome}</title>
    <link rel="stylesheet" href="style.css">
    <style>
        /* Estilos inline para garantir que funcionem mesmo sem CSS externo */
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            margin: 0;
            padding: 0;
            background: white;
        }
        .report-container {
            max-width: 210mm;
            margin: 0 auto;
            padding: 20mm;
        }
    </style>
</head>
<body>
    <div class="report-container">
        
        <!-- CABEÇALHO CORRIGIDO COM CLASSE .report-header -->
        <div class="report-header">
            <h1>Relatório de Acompanhamento Psicológico</h1>
            <p><strong>Unidade:</strong> ${unitSettings.nomeUnidade}</p>
            <p><strong>Responsável Técnico:</strong> ${unitSettings.responsavelTecnico} - CRP: ${unitSettings.crpResponsavel}</p>
            <p><strong>Data de Emissão:</strong> ${formatDate(new Date().toISOString().split('T')[0])}</p>
        </div>

        <!-- CONTEÚDO DO RELATÓRIO COM CLASSE .report-content -->
        <div class="report-content">
            
            <!-- Seção: Dados do Paciente -->
            <div class="report-section">
                <h2>Dados do Paciente</h2>
                <div class="report-info-grid">
                    <div class="report-info-item">
                        <strong>Nome Completo</strong>
                        <span>${patient.nome}</span>
                    </div>
                    <div class="report-info-item">
                        <strong>Idade</strong>
                        <span>${patient.idade} anos</span>
                    </div>
                    <div class="report-info-item">
                        <strong>Sexo</strong>
                        <span>${patient.sexo}</span>
                    </div>
                    <div class="report-info-item">
                        <strong>Telefone</strong>
                        <span>${patient.telefone}</span>
                    </div>
                    <div class="report-info-item">
                        <strong>Endereço</strong>
                        <span>${patient.endereco}</span>
                    </div>
                    <div class="report-info-item">
                        <strong>Data de Cadastro</strong>
                        <span>${formatDate(patient.data_cadastro)}</span>
                    </div>
                </div>
            </div>

            <!-- Seção: Informações de Acompanhamento -->
            <div class="report-section">
                <h2>Informações de Acompanhamento</h2>
                <div class="report-info-grid">
                    <div class="report-info-item">
                        <strong>Posto de Saúde</strong>
                        <span>${patient.posto_saude}</span>
                    </div>
                    <div class="report-info-item">
                        <strong>ACS Responsável</strong>
                        <span>${patient.acs_responsavel}</span>
                    </div>
                    <div class="report-info-item">
                        <strong>Status Atual</strong>
                        <span>${patient.status}</span>
                    </div>
                </div>
            </div>

            <!-- Seção: Avaliação Clínica -->
            <div class="report-section">
                <h2>Avaliação Clínica</h2>
                
                <h3>Queixa Principal</h3>
                <p>${patient.queixa_principal}</p>

                <h3>Histórico Familiar</h3>
                <p>${patient.historico_familiar}</p>

                <h3>Histórico de Saúde Mental</h3>
                <p>${patient.historico_saude_mental}</p>

                <h3>Tratamentos Anteriores</h3>
                <p>${patient.tratamentos_anteriores}</p>
            </div>

            <!-- Seção: Análise de Risco e Proteção -->
            <div class="report-section">
                <h2>Análise de Risco e Proteção</h2>
                
                <h3>Fatores de Risco</h3>
                <p>${patient.fatores_risco}</p>

                <h3>Fatores de Proteção</h3>
                <p>${patient.fatores_protecao}</p>
            </div>

            <!-- Seção: Evolução e Conduta -->
            <div class="report-section">
                <h2>Evolução e Conduta</h2>
                
                <h3>Evolução do Quadro</h3>
                <p>${patient.evolucao}</p>

                <h3>Conduta Terapêutica</h3>
                <p>${patient.conduta}</p>

                <h3>Observações Adicionais</h3>
                <p>${patient.observacoes}</p>
            </div>

        </div>

        <!-- RODAPÉ CORRIGIDO COM CLASSE .report-footer -->
        <div class="report-footer">
            <p><strong>Documento gerado em:</strong> ${new Date().toLocaleString('pt-BR')}</p>
            <p><strong>Sistema:</strong> NUSAM - Núcleo de Saúde Mental</p>
            <p><strong>Contato:</strong> ${unitSettings.telefoneContato} | ${unitSettings.emailContato}</p>
            <p style="margin-top: 12px; font-size: 10px; opacity: 0.7;">
                Este documento é confidencial e destina-se exclusivamente ao uso profissional.
            </p>
        </div>

    </div>

    <script>
        // Aguarda carregamento completo e então oferece impressão
        window.onload = function() {
            setTimeout(function() {
                window.print();
            }, 500);
        };
        
        // Opcional: Fechar após impressão
        window.onafterprint = function() {
            // Descomente a linha abaixo se quiser fechar automaticamente após imprimir
            // window.close();
        };
    </script>
</body>
</html>
    `;

    reportWindow.document.write(reportHTML);
    reportWindow.document.close();
}

// Função fallback para gerar relatório em texto
function generateTextReport(patient) {
    const patientDocs = documents.filter(d => d.patientId === patient.id);
    
    const textContent = `RELATÓRIO INDIVIDUAL DO PACIENTE\n${'='.repeat(60)}\n\n` +
        `DADOS PESSOAIS\n` +
        `-`.repeat(20) + `\n` +
        `Nome: ${patient.nome}\n` +
        `Idade: ${patient.idade} anos\n` +
        `Sexo: ${patient.sexo}\n` +
        `Telefone: ${patient.telefone}\n` +
        `Endereço: ${patient.endereco}\n\n` +
        
        `INFORMAÇÕES DO SUS\n` +
        `-`.repeat(20) + `\n` +
        `Posto de Saúde: ${patient.posto_saude}\n` +
        `ACS Responsável: ${patient.acs_responsavel}\n` +
        `Status: ${patient.status}\n` +
        `Data de Cadastro: ${formatDate(patient.data_cadastro)}\n\n` +
        
        `INFORMAÇÕES CLÍNICAS\n` +
        `-`.repeat(20) + `\n` +
        `Queixa Principal: ${patient.queixa_principal}\n` +
        `Histórico Familiar: ${patient.historico_familiar || 'Não informado'}\n` +
        `Histórico de Saúde Mental: ${patient.historico_saude_mental || 'Não informado'}\n` +
        `Tratamentos Anteriores: ${patient.tratamentos_anteriores || 'Não informado'}\n` +
        `Fatores de Risco: ${patient.fatores_risco || 'Não informado'}\n` +
        `Fatores de Proteção: ${patient.fatores_protecao || 'Não informado'}\n` +
        `Evolução: ${patient.evolucao || 'Não informado'}\n` +
        `Conduta: ${patient.conduta || 'Não informado'}\n` +
        `Observações: ${patient.observacoes || 'Não informado'}\n\n` +
        
        (patientDocs.length > 0 ? 
            `DOCUMENTOS ANEXADOS (${patientDocs.length})\n` +
            `-`.repeat(30) + `\n` +
            patientDocs.map((doc, i) => 
                `${i + 1}. ${doc.title}\n` +
                `   Arquivo: ${doc.fileName}\n` +
                `   Data: ${formatDate(doc.uploadDate)}\n` +
                `   Descrição: ${doc.description}\n`
            ).join('\n') + '\n\n' 
            : '') +
        
        `${'='.repeat(60)}\n` +
        `${unitSettings.nomeUnidade}\n` +
        `${unitSettings.responsavelTecnico} - CRP ${unitSettings.crpResponsavel}\n` +
        `${unitSettings.telefoneContato} | ${unitSettings.emailContato}\n` +
        `${unitSettings.enderecoUnidade}\n` +
        `Relatório gerado em: ${new Date().toLocaleString('pt-BR')}`;
    
    // Criar e baixar arquivo de texto
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_${patient.nome.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

function generateGeneralReport() {
    const reportWindow = window.open('', '_blank');
    const totalPacientes = patients.length;
    const emAcompanhamento = patients.filter(p => p.status === 'Em acompanhamento').length;
    const melhoraSignificativa = patients.filter(p => p.status === 'Melhora significativa').length;
    const alta = patients.filter(p => p.status === 'Alta terapêutica').length;
    const hoje = formatDate(new Date().toISOString().split('T')[0]);

    const reportHTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório Geral de Pacientes</title>
    <link rel="stylesheet" href="style.css">
    <style>
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 0; background: white; }
        .report-container { max-width: 210mm; margin: 0 auto; padding: 20mm; }
    </style>
</head>
<body>
    <div class="report-container">
        <div class="report-header">
            <h1>Relatório Geral de Pacientes</h1>
            <p><strong>Unidade:</strong> ${unitSettings.nomeUnidade}</p>
            <p><strong>Responsável Técnico:</strong> ${unitSettings.responsavelTecnico} - CRP: ${unitSettings.crpResponsavel}</p>
            <p><strong>Data de Emissão:</strong> ${hoje}</p>
        </div>
        <div class="report-content">
            <div class="report-section">
                <h2>Estatísticas Gerais</h2>
                <div class="report-info-grid">
                    <div class="report-info-item"><strong>Total de Pacientes</strong><span>${totalPacientes}</span></div>
                    <div class="report-info-item"><strong>Em Acompanhamento</strong><span>${emAcompanhamento}</span></div>
                    <div class="report-info-item"><strong>Melhora Significativa</strong><span>${melhoraSignificativa}</span></div>
                    <div class="report-info-item"><strong>Alta Terapêutica</strong><span>${alta}</span></div>
                </div>
            </div>
            <div class="report-section">
                <h2>Lista de Pacientes</h2>
                <ul>
                    ${patients.map((p, i) => `
                        <li>
                            <strong>${i + 1}. ${p.nome}</strong> - ${p.idade} anos - ${p.status}<br>
                            UBS: ${p.posto_saude} | ACS: ${p.acs_responsavel}
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
        <div class="report-footer">
            <p><strong>Documento gerado em:</strong> ${new Date().toLocaleString('pt-BR')}</p>
            <p><strong>Sistema:</strong> NUSAM - Núcleo de Saúde Mental</p>
            <p><strong>Contato:</strong> ${unitSettings.telefoneContato} | ${unitSettings.emailContato}</p>
            <p style="margin-top: 12px; font-size: 10px; opacity: 0.7;">Este documento é confidencial e destina-se exclusivamente ao uso profissional.</p>
        </div>
    </div>
    <script>
        window.onload = function() { setTimeout(() => window.print(), 500); };
        window.onafterprint = function() { /* window.close(); */ };
    </script>
</body>
</html>
    `;
    reportWindow.document.write(reportHTML);
    reportWindow.document.close();
}

function generateUBSReport() {
    const reportWindow = window.open('', '_blank');
    const hoje = formatDate(new Date().toISOString().split('T')[0]);
    const postos = systemOptions.postosSaude || [];

    const reportHTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório por Posto de Saúde</title>
    <link rel="stylesheet" href="style.css">
    <style>
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 0; background: white; }
        .report-container { max-width: 210mm; margin: 0 auto; padding: 20mm; }
    </style>
</head>
<body>
    <div class="report-container">
        <div class="report-header">
            <h1>Relatório por Posto de Saúde</h1>
            <p><strong>Unidade:</strong> ${unitSettings.nomeUnidade}</p>
            <p><strong>Responsável Técnico:</strong> ${unitSettings.responsavelTecnico} - CRP: ${unitSettings.crpResponsavel}</p>
            <p><strong>Data de Emissão:</strong> ${hoje}</p>
        </div>
        <div class="report-content">
            <div class="report-section">
                <h2>Distribuição de Pacientes por Posto de Saúde</h2>
                ${postos.map(posto => {
                    const postoPatients = patients.filter(p => p.posto_saude === posto);
                    return `
                        <div style="margin-bottom:1.5em;">
                            <h3>${posto}</h3>
                            <p>Total de pacientes: <strong>${postoPatients.length}</strong></p>
                            <ul>
                                ${postoPatients.map(pt => `
                                    <li>
                                        <strong>${pt.nome}</strong> - ${pt.status} | ACS: ${pt.acs_responsavel}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
        <div class="report-footer">
            <p><strong>Documento gerado em:</strong> ${new Date().toLocaleString('pt-BR')}</p>
            <p><strong>Sistema:</strong> NUSAM - Núcleo de Saúde Mental</p>
            <p><strong>Contato:</strong> ${unitSettings.telefoneContato} | ${unitSettings.emailContato}</p>
            <p style="margin-top: 12px; font-size: 10px; opacity: 0.7;">Este documento é confidencial e destina-se exclusivamente ao uso profissional.</p>
        </div>
    </div>
    <script>
        window.onload = function() { setTimeout(() => window.print(), 500); };
        window.onafterprint = function() { /* window.close(); */ };
    </script>
</body>
</html>
    `;
    reportWindow.document.write(reportHTML);
    reportWindow.document.close();
}


function generateStatusReport() {
    const reportWindow = window.open('', '_blank');
    const hoje = formatDate(new Date().toISOString().split('T')[0]);
    const statusList = systemOptions.statusAcompanhamento || [];

    const reportHTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório por Status de Acompanhamento</title>
    <link rel="stylesheet" href="style.css">
    <style>
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 0; background: white; }
        .report-container { max-width: 210mm; margin: 0 auto; padding: 20mm; }
    </style>
</head>
<body>
    <div class="report-container">
        <div class="report-header">
            <h1>Relatório por Status de Acompanhamento</h1>
            <p><strong>Unidade:</strong> ${unitSettings.nomeUnidade}</p>
            <p><strong>Responsável Técnico:</strong> ${unitSettings.responsavelTecnico} - CRP: ${unitSettings.crpResponsavel}</p>
            <p><strong>Data de Emissão:</strong> ${hoje}</p>
        </div>
        <div class="report-content">
            <div class="report-section">
                <h2>Distribuição de Pacientes por Status</h2>
                ${statusList.map(status => {
                    const patientsByStatus = patients.filter(p => p.status === status);
                    return `
                        <div style="margin-bottom:1.5em;">
                            <h3>${status} (${patientsByStatus.length})</h3>
                            <ul>
                                ${patientsByStatus.map(p => `
                                    <li>
                                        <strong>${p.nome}</strong> - ${p.posto_saude} | ACS: ${p.acs_responsavel}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
        <div class="report-footer">
            <p><strong>Documento gerado em:</strong> ${new Date().toLocaleString('pt-BR')}</p>
            <p><strong>Sistema:</strong> NUSAM - Núcleo de Saúde Mental</p>
            <p><strong>Contato:</strong> ${unitSettings.telefoneContato} | ${unitSettings.emailContato}</p>
            <p style="margin-top: 12px; font-size: 10px; opacity: 0.7;">Este documento é confidencial e destina-se exclusivamente ao uso profissional.</p>
        </div>
    </div>
    <script>
        window.onload = function() { setTimeout(() => window.print(), 500); };
        window.onafterprint = function() { /* window.close(); */ };
    </script>
</body>
</html>
    `;
    reportWindow.document.write(reportHTML);
    reportWindow.document.close();
}


// ============================================================================
// GRÁFICOS E ESTATÍSTICAS
// ============================================================================

let statusChart;

function initChart() {
    const ctx = document.getElementById('statusChart');
    if (!ctx) return;
    
    // Destruir gráfico existente
    if (statusChart) {
        statusChart.destroy();
    }
    
    // Dados para o gráfico
    const statusData = {};
    systemOptions.statusAcompanhamento.forEach(status => {
        statusData[status] = patients.filter(p => p.status === status).length;
    });
    
    const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'];
    
    statusChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(statusData),
            datasets: [{
                data: Object.values(statusData),
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: 'var(--color-surface)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        },
                        color: 'var(--color-text)'
                    }
                },
                title: {
                    display: true,
                    text: 'Distribuição por Status de Acompanhamento',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: 'var(--color-text)'
                }
            }
        }
    });
}

// ============================================================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ============================================================================

function initApp() {
    console.log('🚀 Inicializando NUSAM com sistema de persistência...');
    
    // INICIALIZAR SISTEMA DE PERSISTÊNCIA COM DADOS PADRÃO
    dataPersistence.inicializarDados(patients, documents, unitSettings);
    
    // CARREGAR DADOS PERSISTIDOS
    try {
        const pacientesSalvos = dataPersistence.carregarPacientes();
        const documentosSalvos = dataPersistence.carregarDocumentos();
        const configSalvas = dataPersistence.carregarConfiguracoes();
        
        // Sobrescrever dados com dados persistidos se existirem
        if (pacientesSalvos.length > 0) {
            patients.splice(0, patients.length, ...pacientesSalvos);
            console.log(`✅ ${pacientesSalvos.length} pacientes carregados da persistência`);
        }
        
        if (documentosSalvos.length > 0) {
            documents.splice(0, documents.length, ...documentosSalvos);
            console.log(`✅ ${documentosSalvos.length} documentos carregados da persistência`);
        }
        
        if (Object.keys(configSalvas).length > 0) {
            Object.assign(unitSettings, configSalvas);
            console.log('✅ Configurações carregadas da persistência');
        }
        
        const stats = dataPersistence.obterEstatisticas();
        console.log('📊 Estatísticas de dados:', stats);
        
    } catch (error) {
        console.error('❌ Erro ao carregar dados persistidos:', error);
        showToast('Alguns dados podem não ter sido carregados corretamente', 'warning');
    }
    
    // Inicializar tema
    initTheme();
    
    // Configurar event listeners
    document.getElementById('loginForm').addEventListener('submit', login);
    document.getElementById('patientForm').addEventListener('submit', savePatient);
    
    // Configurar formatação automática de telefone
    const phoneInput = document.getElementById('patientTelefone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = formatPhone(e.target.value);
        });
    }
    
    // Configurar formatação automática de telefone nas configurações
    const settingsPhoneInput = document.getElementById('editTelefoneContato');
    if (settingsPhoneInput) {
        settingsPhoneInput.addEventListener('input', (e) => {
            e.target.value = formatPhone(e.target.value);
        });
    }
    
    // Configurar autocomplete para ACS
    const acsInput = document.getElementById('patientAcsResponsavel');
    if (acsInput) {
        setupAcsAutocomplete(acsInput);
    }
    
    // Fechar sidebar ao clicar fora em mobile
    document.addEventListener('click', (e) => {
        const sidebar = document.querySelector('.sidebar');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (window.innerWidth <= 1024 && 
            appState.sidebarOpen && 
            !sidebar.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleSidebar();
        }
    });
    
    // Configurar redimensionamento da janela
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && appState.sidebarOpen) {
            document.querySelector('.sidebar').classList.remove('open');
            appState.sidebarOpen = false;
        }
    });
    
    // Inicializar display das configurações
    updateSettingsDisplay();
    
    // Mostrar tela de loading e depois login
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
        document.getElementById('loginScreen').classList.remove('hidden');
    }, 2000);
    
    // Exibir status do sistema de persistência
    const stats = dataPersistence.obterEstatisticas();
    console.log('✅ NUSAM - Sistema inicializado com sucesso');
    console.log('📊 Status da persistência:', stats);
    
    // Notificar usuário sobre o sistema de persistência
    setTimeout(() => {
        console.log('🔄 Sistema de persistência ativo - Dados são salvos automaticamente');
    }, 3000);
}

// ============================================================================
// CONFIGURAÇÕES EDITÁVEIS
// ============================================================================

// Função para abrir modal de edição das configurações
function openSettingsEdit() {
    // Preencher formulário com dados atuais
    document.getElementById('editNomeUnidade').value = unitSettings.nomeUnidade;
    document.getElementById('editResponsavelTecnico').value = unitSettings.responsavelTecnico;
    document.getElementById('editCrpResponsavel').value = unitSettings.crpResponsavel;
    document.getElementById('editTelefoneContato').value = unitSettings.telefoneContato;
    document.getElementById('editEnderecoUnidade').value = unitSettings.enderecoUnidade;
    document.getElementById('editEmailContato').value = unitSettings.emailContato;
    
    // Mostrar modal
    document.getElementById('settingsEditModal').classList.remove('hidden');
}

// Função para fechar modal de edição das configurações
function closeSettingsEdit() {
    document.getElementById('settingsEditModal').classList.add('hidden');
    document.getElementById('settingsEditForm').reset();
}

// Função para salvar as alterações das configurações
function saveSettingsEdit() {
    // Mostrar feedback de salvamento
    showToast('Salvando configurações...', 'info', 1000);
    
    // Validar campos obrigatórios
    const nomeUnidade = document.getElementById('editNomeUnidade').value.trim();
    const responsavelTecnico = document.getElementById('editResponsavelTecnico').value.trim();
    const enderecoUnidade = document.getElementById('editEnderecoUnidade').value.trim();
    
    if (!nomeUnidade || !responsavelTecnico || !enderecoUnidade) {
        showToast('Por favor, preencha todos os campos obrigatórios', 'error');
        return;
    }
    
    // Validar telefone (formato brasileiro)
    const telefone = document.getElementById('editTelefoneContato').value.trim();
    if (telefone && !telefone.match(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)) {
        showToast('Formato de telefone inválido. Use: (85) 3366-1234', 'error');
        return;
    }
    
    // Validar email
    const email = document.getElementById('editEmailContato').value.trim();
    if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showToast('Formato de email inválido', 'error');
        return;
    }
    
    try {
        // Atualizar configurações
        unitSettings.nomeUnidade = nomeUnidade;
        unitSettings.responsavelTecnico = responsavelTecnico;
        unitSettings.crpResponsavel = document.getElementById('editCrpResponsavel').value.trim();
        unitSettings.telefoneContato = telefone;
        unitSettings.enderecoUnidade = enderecoUnidade;
        unitSettings.emailContato = email;
        
        // SALVAR IMEDIATAMENTE NO SISTEMA DE PERSISTÊNCIA
        dataPersistence.salvarConfiguracoes(unitSettings);
        
        // Atualizar indicadores visuais
        updatePersistenceIndicators();
        
        // Atualizar display na tela de configurações
        updateSettingsDisplay();
        
        // Fechar modal
        closeSettingsEdit();
        
        showToast('✅ Configurações atualizadas e salvas com sucesso!', 'success');
        console.log('✅ Configurações da unidade atualizadas e persistidas');
        
        // Criar backup automático
        dataPersistence.criarBackup();
        
    } catch (error) {
        console.error('❌ Erro ao salvar configurações:', error);
        showToast('❌ Erro ao salvar configurações. Tente novamente.', 'error');
    }
}

// Função para atualizar o display das configurações na tela
function updateSettingsDisplay() {
    document.getElementById('displayNomeUnidade').textContent = unitSettings.nomeUnidade;
    document.getElementById('displayResponsavelTecnico').textContent = unitSettings.responsavelTecnico;
    document.getElementById('displayCrpResponsavel').textContent = unitSettings.crpResponsavel;
    document.getElementById('displayTelefoneContato').textContent = unitSettings.telefoneContato;
    document.getElementById('displayEnderecoUnidade').textContent = unitSettings.enderecoUnidade;
    document.getElementById('displayEmailContato').textContent = unitSettings.emailContato;
}

// Funções auxiliares para perfil e configurações
function showProfile() {
    const user = appState.currentUser;
    if (user) {
        showToast(`Perfil: ${user.nome} - ${user.perfil}`, 'info');
    }
    document.querySelector('.user-dropdown').classList.add('hidden');
}

// Inicializar aplicação quando DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

document.addEventListener('DOMContentLoaded', function() {
    populateDocumentPatientFilter();
    renderDocumentsList();
});

