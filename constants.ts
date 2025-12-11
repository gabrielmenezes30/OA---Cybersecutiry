import { Mission, QuestionType } from './types';

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'escape_room',
    title: 'Escape Room: Protocolo Zero',
    description: 'Nível de Ameaça: Crítico. Você está trancado no Data Center principal. O sistema de defesa ativou 10 bloqueios de segurança. Você precisa provar que é o Administrador estudando os 5 Módulos de Segurança e resolvendo os desafios.',
    difficulty: 'Advanced',
    durationMinutes: 45,
    modules: [
      {
        id: 'mod_logic',
        title: 'Módulo 1: Lógica & Credenciais',
        summary: 'Fundamentos de portas lógicas e higiene de senhas.',
        icon: 'cpu',
        content: [
          {
            type: 'text',
            title: 'Lógica Booleana no Hardware',
            content: 'Os processadores tomam decisões baseadas em portas lógicas. Para segurança física e lógica, dois operadores são essenciais:\n\n1. AND (E): Uma porta de alta segurança muitas vezes exige duas chaves simultâneas. Retorna 1 (Verdadeiro) APENAS se Entrada A e Entrada B forem 1.\n2. OR (OU): Retorna 1 se qualquer uma das entradas for 1. Menos restritivo.'
          },
          {
            type: 'code',
            title: 'Tabela Verdade: AND',
            content: 'A | B | Saída\n0 | 0 | 0\n0 | 1 | 0\n1 | 0 | 0\n1 | 1 | 1  <-- A única combinação que abre a porta.'
          },
          {
            type: 'text',
            title: 'Entropia de Senhas',
            content: 'Senhas curtas são triviais para computadores modernos. O padrão NIST 800-63b recomenda foco na longueur (comprimento) e complexidade.\n\nRegra do Sistema Atual:\n- Mínimo 8 caracteres\n- Pelo menos 1 Letra Maiúscula [A-Z]\n- Pelo menos 1 Número [0-9]\n\nIsso força um espaço de busca exponencialmente maior para ataques de força bruta.'
          }
        ],
        references: [
          { title: 'NIST Special Publication 800-63B', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
          { title: 'Khan Academy: Logic Gates', url: 'https://www.khanacademy.org/computing' }
        ]
      },
      {
        id: 'mod_social',
        title: 'Módulo 2: Engenharia Social',
        summary: 'Identificação de Phishing e segurança física (Tailgating).',
        icon: 'users',
        content: [
          {
            type: 'text',
            title: 'O Fator Humano',
            content: 'A Engenharia Social explora a psicologia humana, não falhas de software. É mais fácil enganar um usuário para entregar sua senha do que quebrar a criptografia.'
          },
          {
            type: 'tip',
            title: 'Anatomia de um Phishing',
            content: '1. Senso de Urgência: "Sua conta será bloqueada AGORA". O medo faz o cérebro ignorar detalhes lógicos.\n2. Remetente Forjado: "suporte@google-security-update.tk". Sempre verifique o domínio real.\n3. Links Obscuros: Passe o mouse sobre o link sem clicar para ver o destino real.'
          },
          {
            type: 'text',
            title: 'Segurança Física: Tailgating',
            content: 'Tailgating (ou "Carona") ocorre quando uma pessoa não autorizada segue uma autorizada por uma porta segura. A cortesia de "segurar a porta" é uma vulnerabilidade crítica em Data Centers.'
          }
        ],
        references: [
          { title: 'OWASP Social Engineering', url: 'https://owasp.org/www-community/attacks/Social_Engineering' },
          { title: 'Google Phishing Quiz', url: 'https://phishingquiz.withgoogle.com/' }
        ]
      },
      {
        id: 'mod_network',
        title: 'Módulo 3: Redes & Criptografia',
        summary: 'Portas seguras, HTTPs e chaves assimétricas.',
        icon: 'lock',
        content: [
          {
            type: 'text',
            title: 'Portas de Comunicação',
            content: 'Servidores escutam em "portas" numeradas. O uso de portas padrão ajuda na configuração de Firewalls:\n- Porta 80: HTTP (Texto plano, inseguro).\n- Porta 443: HTTPS (Criptografado com TLS/SSL, seguro).\n- Porta 22: SSH (Administração remota segura).'
          },
          {
            type: 'code',
            title: 'Criptografia de Chave Pública (Assimétrica)',
            content: '// Cenário: Alice quer enviar um segredo para Bob.\n\n1. Bob cria um par de chaves: Pública e Privada.\n2. Bob dá a Pública para todo mundo.\n3. Alice usa a PÚBLICA de Bob para encriptar a mensagem.\n4. AGORA, APENAS a chave PRIVADA de Bob pode desencriptar.\n\nRegra de Ouro: Pública encripta, Privada desencripta (para confidencialidade).'
          }
        ],
        references: [
          { title: 'Cloudflare: How SSL/TLS Works', url: 'https://www.cloudflare.com/learning/ssl/what-is-ssl/' }
        ]
      },
      {
        id: 'mod_identity',
        title: 'Módulo 4: Identidade & Privacidade',
        summary: 'MFA, Fatores de Autenticação e PII.',
        icon: 'fingerprint',
        content: [
          {
            type: 'text',
            title: 'Autenticação Multifator (MFA)',
            content: 'Para provar quem você é, use fatores de categorias diferentes. Usar duas senhas não é MFA, é apenas dois fatores de "Conhecimento".'
          },
          {
            type: 'tip',
            title: 'Os 3 Fatores Universais',
            content: '1. Conhecimento: Algo que você sabe (Senha, PIN).\n2. Posse: Algo que você tem (Celular, Token USB, Smartcard).\n3. Inerência: Algo que você é (Biometria: Digital, Íris).'
          },
          {
            type: 'text',
            title: 'PII (Personally Identifiable Information)',
            content: 'Dados que identificam unicamente uma pessoa (CPF, RG, Biometria, Histórico Médico) são regulados por leis como LGPD/GDPR. Vazamento desses dados resulta em multas milionárias.'
          }
        ],
        references: [
          { title: 'Microsoft Security: What is MFA?', url: 'https://www.microsoft.com/en-us/security/business/security-101/what-is-multifactor-authentication-mfa' }
        ]
      },
      {
        id: 'mod_response',
        title: 'Módulo 5: Resposta a Incidentes',
        summary: 'Malware e contenção de danos.',
        icon: 'shield-alert',
        content: [
          {
            type: 'text',
            title: 'Tipos de Malware',
            content: '- Ransomware: Sequestra dados (encripta) e pede resgate.\n- Worm: Se replica pela rede automaticamente.\n- Trojan: Se disfarça de software legítimo.'
          },
          {
            type: 'code',
            title: 'Protocolo de Contenção (PICERL)',
            content: '1. Preparation (Preparação)\n2. Identification (Identificação)\n3. Containment (Contenção) <- FASE CRÍTICA\n\nNa Contenção: O objetivo é limitar o dano. Se um host está infectado com um Worm, DESCONECTE A REDE (Cabo/Wi-Fi) imediatamente. Não desligue a energia se possível (para preservar evidências na RAM), mas isole a comunicação.'
          }
        ],
        references: [
          { title: 'SANS Institute: Incident Handler Handbook', url: 'https://www.sans.org/white-papers/33901/' }
        ]
      }
    ],
    questions: [
      // Level 1: Logic
      {
        id: 'q1',
        type: QuestionType.OPEN_ENDED,
        prompt: 'Bloqueio 1/10: O Portão Lógico',
        context: 'O display exibe: "INPUT A=1, INPUT B=1. Qual operador resulta em 1 (Verdadeiro) apenas neste cenário?"',
        validationRegex: '(?i)^(E|AND)$',
        validationError: 'Erro de Lógica. Consulte o Módulo 1: Lógica & Credenciais.',
        correctAnswerCriteria: 'Operador AND/E.'
      },
      // Level 2: Phishing
      {
        id: 'q2',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'Bloqueio 2/10: O E-mail Bomba',
        context: 'Consulte o Módulo 2. Identifique o e-mail seguro para liberar o terminal.',
        options: [
          { 
            id: 'opt_phishing', 
            text: '[URGENTE] Sua conta será deletada em 10min! Acesse: support-google-security.tk', 
            isCorrect: false, 
            explanation: 'Game Over. Você caiu no senso de urgência e domínio falso.' 
          },
          { 
            id: 'opt_safe', 
            text: '[RH] Informativo sobre feriados de 2024. Nenhum clique necessário.', 
            isCorrect: true, 
            explanation: 'Correto. E-mail informativo sem pressão.' 
          }
        ]
      },
      // Level 3: Password Regex
      {
        id: 'q3',
        type: QuestionType.OPEN_ENDED,
        prompt: 'Bloqueio 3/10: Redefinição de Credencial',
        context: 'Consulte o Módulo 1. Crie uma senha de Admin que atenda aos 3 requisitos listados na seção "Entropia de Senhas".',
        validationRegex: '(?=.*[A-Z])(?=.*[0-9]).{8,}',
        validationError: 'Senha Fraca. Requer: 8+ chars, Maiúscula e Número.',
        correctAnswerCriteria: 'Senha forte.'
      },
      // Level 4: MFA
      {
        id: 'q4',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'Bloqueio 4/10: Autenticação de Dois Fatores',
        context: 'Consulte o Módulo 4. O sistema exige MFA real. Qual a melhor combinação?',
        options: [
          { id: 'a', text: 'Senha + Pergunta Secreta (Nome da Mãe)', isCorrect: false, explanation: 'Inseguro. Ambos são "Conhecimento".' },
          { id: 'b', text: 'Senha + Token no App Autenticador', isCorrect: true, explanation: 'Correto! Conhecimento (Senha) + Posse (Celular/Token).' },
          { id: 'c', text: 'PIN + Data de Nascimento', isCorrect: false, explanation: 'Inseguro. Ambos são "Conhecimento".' }
        ]
      },
      // Level 5: Ports
      {
        id: 'q5',
        type: QuestionType.OPEN_ENDED,
        prompt: 'Bloqueio 5/10: Configuração de Firewall',
        context: 'Consulte o Módulo 3. O tráfego web seguro está bloqueado. Digite o número da porta padrão para HTTPS.',
        validationRegex: '^443$',
        validationError: 'Porta incorreta. HTTP é 80, mas qual é o seguro?',
        correctAnswerCriteria: 'Porta 443.'
      },
      // Level 6: Encryption Keys
      {
        id: 'q6',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'Bloqueio 6/10: Canal Criptografado',
        context: 'Consulte o Módulo 3. Você precisa ENVIAR um arquivo confidencial para a Diretora. Que chave você usa para encriptar?',
        options: [
          { id: 'a', text: 'Sua Chave Privada', isCorrect: false, explanation: 'Não. Isso serve para assinar, não para esconder.' },
          { id: 'b', text: 'Chave Pública da Diretora', isCorrect: true, explanation: 'Correto! Assim, só a Chave Privada dela poderá descriptografar.' },
          { id: 'c', text: 'Sua Chave Pública', isCorrect: false, explanation: 'Não. Você estaria encriptando para si mesmo.' }
        ]
      },
      // Level 7: Malware Identification
      {
        id: 'q7',
        type: QuestionType.OPEN_ENDED,
        prompt: 'Bloqueio 7/10: Diagnóstico de Infecção',
        context: 'Consulte o Módulo 5. Alerta: "ARQUIVOS CRIPTOGRAFADOS. PAGUE RESGATE". Qual o nome deste malware?',
        validationRegex: '(?i)RANSOMWARE',
        validationError: 'Incorreto. É o malware que pede "Resgate".',
        correctAnswerCriteria: 'Ransomware'
      },
      // Level 8: PII / Privacy
      {
        id: 'q8',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'Bloqueio 8/10: Vazamento de Dados',
        context: 'Consulte o Módulo 4. Qual campo abaixo representa uma violação grave de PII (Dados Pessoais) se exposto?',
        options: [
          { id: 'a', text: 'ID do Produto', isCorrect: false, explanation: 'Dado genérico.' },
          { id: 'b', text: 'CPF do Cliente', isCorrect: true, explanation: 'Correto! O CPF identifica unicamente a pessoa.' },
          { id: 'c', text: 'Data da Compra', isCorrect: false, explanation: 'Dado transacional.' }
        ]
      },
      // Level 9: Physical Security
      {
        id: 'q9',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'Bloqueio 9/10: Acesso Físico',
        context: 'Consulte o Módulo 2. Um estranho pede para você segurar a porta do Datacenter. O que você faz?',
        options: [
          { id: 'a', text: 'Seguro a porta (Gentileza)', isCorrect: false, explanation: 'ERRO. Tailgating é proibido.' },
          { id: 'b', text: 'Não abro e indico a segurança', isCorrect: true, explanation: 'Perfeito. Segurança vem antes da cortesia.' }
        ]
      },
      // Level 10: Incident Response
      {
        id: 'q10',
        type: QuestionType.MULTIPLE_CHOICE,
        prompt: 'Bloqueio 10/10: Protocolo de Contenção',
        context: 'Consulte o Módulo 5. Um Worm está se espalhando na rede. Qual a PRIMEIRA ação de contenção?',
        options: [
          { id: 'a', text: 'Descobrir o culpado', isCorrect: false, explanation: 'Irrelevante no momento.' },
          { id: 'b', text: 'Desconectar o cabo de rede (Isolar)', isCorrect: true, explanation: 'Correto! Pare a propagação imediatamente.' },
          { id: 'c', text: 'Formatar o PC', isCorrect: false, explanation: 'Perde evidências.' }
        ]
      }
    ]
  }
];
