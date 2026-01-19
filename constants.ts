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
            content: 'Os processadores tomam decisões baseadas em portas lógicas. Para segurança física e lógica, dois operadores são essenciais:\n\n1. AND (E): Uma porta de alta segurança muitas vezes exige duas chaves simultâneas. Retorna 1 (Verdadeiro) APENAS se Entrada A E Entrada B forem 1. Exemplo prático: Para acessar uma ala restrita, você precisa ter ID válido AND estar na lista de acesso aprovado. Se um requisito falhar, acesso negado.\n\n2. OR (OU): Retorna 1 se QUALQUER uma das entradas for 1. Menos restritivo. Exemplo: Sistema de alarme que dispara se há movimento OR detecção de vidro quebrado.\n\n3. NOT (NÃO): Inverte o resultado. Se entrada é 1, saída é 0 e vice-versa.\n\n4. NAND, NOR, XOR: Combinações mais complexas usadas em sistemas críticos.\n\nEstas operações formam a base de toda computação moderna. Sem entendê-las, você não consegue compreender como sistemas de segurança funcionam.'
          },
          {
            type: 'code',
            title: 'Tabela Verdade Completa: AND, OR, NOT',
            content: 'AND (E):\nA | B | Saída\n0 | 0 | 0\n0 | 1 | 0\n1 | 0 | 0\n1 | 1 | 1  <-- A única combinação que retorna Verdadeiro\n\nOR (OU):\nA | B | Saída\n0 | 0 | 0\n0 | 1 | 1\n1 | 0 | 1\n1 | 1 | 1  <-- Retorna Verdadeiro se qualquer entrada for 1\n\nNOT (NÃO):\nA | Saída\n0 | 1\n1 | 0  <-- Simplesmente inverte'
          },
          {
            type: 'text',
            title: 'Por que a Força Bruta é um Problema',
            content: 'Um computador moderno consegue testar 1 BILHÃO de senhas por segundo. Se sua senha tem apenas 4 caracteres, ela será quebrada em milissegundos. Vamos aos números:\n\n- 4 caracteres (apenas letras): 26^4 = 456.976 possibilidades. Tempo para quebrar: < 1 milissegundo\n- 8 caracteres (letras): 26^8 = 208 bilhões. Tempo: ~3 minutos\n- 8 caracteres (letras + números + símbolos): 94^8 = 6,1 quatrilhões. Tempo: ~200 anos\n\nO comprimento (longueur) é EXPONENCIAL. Cada caractere adicional multiplica a dificuldade.'
          },
          {
            type: 'text',
            title: 'Entropia de Senhas (NIST 800-63B)',
            content: 'Senhas curtas são triviais para computadores modernos. O padrão NIST 800-63b (publicado pelo governo americano) recomenda foco na longueur (comprimento) e complexidade.\n\nRegra do Sistema Atual:\n- Mínimo 8 caracteres (quanto mais, melhor)\n- Pelo menos 1 Letra Maiúscula [A-Z] (aumenta espaço de busca)\n- Pelo menos 1 Número [0-9] (aumenta espaço de busca)\n- Optinal: Símbolos especiais (!@#$%^&*) (aumenta MUITO o espaço de busca)\n\nIsso força um espaço de busca exponencialmente maior para ataques de força bruta.\n\nExemplos de Senhas FRACAS:\n- "senha123" (comum, previsível)\n- "12345678" (apenas números, sequencial)\n- "Abcdefgh" (padrão óbvio)\n\nExemplos de Senhas FORTES:\n- "Gat0sDaNoite#2024" (comprimento, maiúscula, número, símbolo)\n- "P@ssw0rdSegur0Em2024!" (complexidade alta)\n\nDica EXTRA: Usar frases/padrões memoráveis aumenta a entropia sem sacrificar a memória.'
          }
        ],
        references: [
          { title: 'NIST Special Publication 800-63B', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
          { title: 'Khan Academy: Logic Gates', url: 'https://www.khanacademy.org/computing' },
          { title: 'How I Cracked Your Password', url: 'https://howsecureismypassword.net/' }
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
            content: 'A Engenharia Social explora a psicologia humana, não falhas de software. É mais fácil enganar um usuário para entregar sua senha do que quebrar a criptografia.\n\nPor quê? Porque humanos têm vieses cognitivos:\n- Confiam em figuras de autoridade\n- Agem por medo ou urgência\n- Querem ajudar o próximo\n- Ignoram detalhes quando estressados\n\nEstatísticas: 90% dos ataques hacker começam com Engenharia Social, não com código malicioso.'
          },
          {
            type: 'tip',
            title: 'Anatomia Completa de um Ataque Phishing',
            content: '1. RECONNAISSANCE (Reconhecimento)\n   - Atacante pesquisa vítima nas redes sociais\n   - Identifica padrões: "Trabalha na empresa X, usa Gmail, segue página Y"\n   - Cria falso perfil de vendedor/suporte compatível\n\n2. BAIT (Isca)\n   - E-mail chega com domínio falso: "suporte@google-security-update.tk"\n   - Conteúdo parece legítimo porque imita template real\n   - Inclui logo da empresa (copiado do site oficial)\n\n3. SENSO DE URGÊNCIA\n   - "Sua conta será bloqueada em 10 MINUTOS"\n   - "Clique agora ou perderá acesso"\n   - O medo faz o cérebro ignorar detalhes lógicos\n   - Córtex pré-frontal (raciocínio) é desativado\n\n4. CALL TO ACTION\n   - Link para "confirmar identidade"\n   - Formulário falso coleta senha\n   - Pode instalar malware\n\n5. EXTRAÇÃO DE DADOS\n   - Atacante acessa conta real\n   - Rouba informações, contatos, dados de pagamento\n   - Usa conta para enviar mais phishing'
          },
          {
            type: 'text',
            title: 'Como Identificar Phishing',
            content: 'VERIFIQUE SEMPRE (3 passos):\n\n1. DOMÍNIO: Passe o mouse sobre o link SEM CLICAR. No Gmail, clique em "..." e veja "Show original". Procure por:\n   - Domínios semelhantes mas ligeiramente diferentes: "google.com" vs "goog1e.com" (número 1 no lugar da letra i)\n   - Domínios genéricos: "suporte123.com" em vez de "suporte.seuempresa.com"\n   - Certificados SSL falsos: Acesse pelo navegador e veja se o cadeado está presente\n\n2. REMETENTE: Verifique o endereço completo:\n   - Legítimo: "suporte@empresa.com.br"\n   - Falso: "suporte@empresa.com.br.malware.com" (domínio escondido no fim)\n   - Falso: "suporte@suporte-empresa.com" (hífen extra)\n\n3. CONTEÚDO: Procure por sinais de urgência artificial:\n   - Muitos pontos de exclamação: "ATIVE AGORA!!!"\n   - Ameaças: "Sua conta será deletada"\n   - Ofertas impossíveis: "Ganhe R$ 10 mil clicando aqui"\n   - Erros de português/inglês: Empresas grandes revisam textos'
          },
          {
            type: 'text',
            title: 'Segurança Física: Tailgating',
            content: 'Tailgating (ou "Carona") ocorre quando uma pessoa não autorizada segue uma autorizada por uma porta segura. Estatísticas mostram que 80% dos Data Centers sofrem ao menos um incidente de tailgating por ano.\n\nCENÁRIO COMUM:\n1. Você sai do Data Center com uma caixa\n2. Alguém grita: "Segura a porta aí, vou entrar logo!"\n3. Você segura (por educação)\n4. A pessoa passa, e você nem sabe quem é\n5. Ela conecta um pendrive infectado nos servidores\n\nCOMO MITIGAR:\n- Nunca segure porta fechada para estranhos\n- Diga: "Use seu crachá"\n- Se não tem crachá: "Procure a segurança"\n- Crachás expirados = NEGUE ACESSO\n- Use catraca eletrônica (1 pessoa por ID)\n- CCTV monitorando entradas\n\nREGRA DE OURO: Segurança > Educação.'
          }
        ],
        references: [
          { title: 'OWASP Social Engineering', url: 'https://owasp.org/www-community/attacks/Social_Engineering' },
          { title: 'Google Phishing Quiz', url: 'https://phishingquiz.withgoogle.com/' },
          { title: 'FBI: Business Email Compromise', url: 'https://www.fbi.gov/investigate/cyber/business-email-compromise' }
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
            title: 'Portas de Comunicação (TCP/UDP)',
            content: 'Servidores escutam em "portas" numeradas (0-65535). Pense em um edifício com múltiplas janelas. Cada janela é uma porta. Um cliente se conecta a uma porta específica para conversar com um serviço específico.\n\nPORTAS PADRÃO (Well-Known Ports 0-1023):\n\n- Porta 20/21: FTP (Transferência de Arquivos - INSEGURO, dados em texto plano)\n- Porta 22: SSH (Administração remota segura com criptografia)\n- Porta 25: SMTP (Envio de E-mail)\n- Porta 53: DNS (Resolução de nomes de domínio)\n- Porta 80: HTTP (Texto plano, inseguro, web comum)\n- Porta 443: HTTPS (Criptografado com TLS/SSL, web segura) <- USE SEMPRE\n- Porta 3306: MySQL (Banco de dados)\n- Porta 5432: PostgreSQL (Banco de dados)\n- Porta 8080: Proxy/Apps alternativas\n\nFIREWALL: Bloqueia portas não autorizadas. Exemplo:\n- Bloquear porta 22 de fora do escritório = Previne acesso SSH não autorizado\n- Permitir apenas porta 443 = Apenas HTTPS permitido\n- Bloquear porta 23 (Telnet antigo) = Evita transmissão de senhas em texto plano'
          },
          {
            type: 'text',
            title: 'HTTP vs HTTPS',
            content: 'HTTP (HyperText Transfer Protocol):\n- Texto PLANO (não criptografado)\n- Qualquer um na rede pode LER a comunicação\n- Um atacante no café WiFi pode ver sua senha\n- Exemplo: http://seubank.com login envia senha em texto plano\n\nHTTPS (HTTP Secure):\n- Criptografado com TLS/SSL\n- Mesmo que alguém intercepte, vê apenas "blá blá blá criptografado"\n- Certificado digital identifica o servidor\n- Exemplo: https://seubank.com envia senha criptografada\n\nCERTIFICADO SSL/TLS:\n- Emitido por autoridade certificadora confiável (DigiCert, Sectigo, Let\'s Encrypt)\n- Prova que o site é legítimo: "Este é realmente amazon.com"\n- Sem certificado = Aviso de "Site não seguro"\n- Certificados expirados = Aviso vermelho no navegador'
          },
          {
            type: 'code',
            title: 'Fluxo de Criptografia de Chave Pública (Assimétrica)',
            content: '// Cenário: Alice quer enviar um segredo para Bob de forma segura.\n\n--- GERAÇÃO DE CHAVES (Bob faz isso UMA VEZ) ---\n1. Bob cria um par de chaves:\n   - Chave PÚBLICA: "Bob-Public-Key-12345" (Pode ser vista por qualquer um)\n   - Chave PRIVADA: "Bob-Private-Key-SECRETO" (Apenas Bob tem, NUNCA compartilha)\n\n--- ENVIO DE MENSAGEM SECRETA ---\n2. Alice obtém a CHAVE PÚBLICA de Bob (de um site, diretório público, etc.)\n3. Alice escreve: "Banco principal quebrado, transferir dinheiro para conta Y"\n4. Alice ENCRIPTA com a chave pública de Bob:\n   Input: "Banco principal quebrado..."\n   Chave: Bob-Public-Key-12345\n   Output: "A7S8D9F0G1H2J3K4L5Z6X7C8V9B0N1M2Q3W4E5..." (criptografado)\n\n5. Alice ENVIA esta mensagem criptografada (seguro, não importa quem veja)\n\n--- RECEBIMENTO E DESCRIPTOGRAFIA ---\n6. Bob recebe: "A7S8D9F0G1H2J3K4L5Z6X7C8V9B0N1M2Q3W4E5..."\n7. Apenas Bob tem a chave PRIVADA\n8. Bob DESENCRIPTA:\n   Input: "A7S8D9F0G1H2J3K4L5Z6X7C8V9B0N1M2Q3W4E5..."\n   Chave: Bob-Private-Key-SECRETO\n   Output: "Banco principal quebrado..."\n\n--- REGRA DE OURO ---\nPública ENCRIPTA → Privada DESENCRIPTA (para confidencialidade)\nPrivada ASSINA → Pública VERIFICA (para autenticidade)\n\nAnalogia: Pública é como um cadeado aberto que qualquer um consegue fechar. Privada é a chave que APENAS você tem para abrir.'
          },
          {
            type: 'text',
            title: 'TLS Handshake (Como HTTPS Funciona)',
            content: 'Quando você acessa https://example.com, acontece isto:\n\n1. CLIENT HELLO\n   - Navegador diz: "Oi, quero versão TLS 1.3, estes são os algoritmos que apoio"\n\n2. SERVER HELLO\n   - Servidor responde com certificado SSL e chave pública\n   - Navegador verifica o certificado: "Este site é realmente example.com? Está expirado?"\n\n3. KEY EXCHANGE\n   - Cliente e servidor trocam chaves usando Diffie-Hellman\n   - Criam uma "chave de sessão" comum (criptografia simétrica para ser rápida)\n\n4. FINISHED\n   - Handshake termina\n   - Todos os dados seguintes são encriptados com a chave de sessão\n   - Tempo total: ~100-500ms\n\nRESULTADO: Conexão é segura, criptografada, autenticada.'
          }
        ],
        references: [
          { title: 'Cloudflare: How SSL/TLS Works', url: 'https://www.cloudflare.com/learning/ssl/what-is-ssl/' },
          { title: 'Mozilla: HTTPS Everywhere', url: 'https://www.eff.org/https-everywhere' },
          { title: 'RSA Cryptography Explained', url: 'https://www.youtube.com/watch?v=4zahvcJ9glg' }
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
            content: 'Autenticação é PROVAR quem você é. O problema: Uma senha pode ser roubada.\n\nSOLUÇÃO: MFA (Autenticação Multifator) exige que você prove quem é com MÚLTIPLOS métodos simultâneos.\n\nPOR QUÊ MFA?\n- 99,9% dos ataques de conta são bloqueados com MFA\n- Mesmo que sua senha vaze, o atacante não consegue entrar (precisa do segundo fator)\n\nIMPORTANTE: Usar duas senhas = NÃO é MFA. São dois fatores do mesmo tipo ("Conhecimento").\nExemplo RUIM: Senha + Pergunta Secreta. Ambas podem ser bruteforce.'
          },
          {
            type: 'tip',
            title: 'Os 3 Fatores Universais de Autenticação',
            content: '1. CONHECIMENTO (Something you know)\n   - Senha, PIN, Pergunta secreta\n   - Problema: Pode ser adivinhado ou bruteforce\n   - Exemplos: senha123, CEP da cidade natal\n\n2. POSSE (Something you have)\n   - Celular (SMS/App), Token USB, Smartcard, Badge\n   - Problema: Pode ser roubado, perder, bateria descarregar\n   - Exemplos: Código TOTP no Google Authenticator, Whatsapp no celular\n\n3. INERÊNCIA (Something you are)\n   - Biometria: Digital (impressão), Íris, Face, Voz\n   - Problema: Difícil de mudar se comprometida (não pode trocar impressão digital)\n   - Exemplos: Face ID no iPhone, Leitor de Digital no Samsung\n\nMFA FORTE: Combina fatores DIFERENTES\n- Senha (Conhecimento) + TOTP App (Posse) = FORTE\n- Senha (Conhecimento) + SMS (Posse) = BOM (SMS tem riscos)\n- Senha (Conhecimento) + Face ID (Inerência) = MUITO FORTE'
          },
          {
            type: 'text',
            title: 'Tipos de MFA Disponíveis',
            content: 'MÉTODO 1: TOTP (Time-based One-Time Password)\n- Apps: Google Authenticator, Microsoft Authenticator, Authy\n- Gera código de 6 dígitos que muda a cada 30 segundos\n- Funciona OFFLINE, não precisa de internet\n- Muito seguro: Código é gerado localmente\n- Desvantagem: Se perder celular, pode ficar travado\n\nMÉTODO 2: SMS/WhatsApp\n- Recebe código por texto\n- Problema: SIM Swap (atacante consegue seu número de telefone)\n- Ainda melhor que nada, mas não é ideal\n\nMÉTODO 3: E-mail\n- Link de confirmação ou código enviado por e-mail\n- Segurança depende da segurança do e-mail\n\nMÉTODO 4: Biometria\n- Impressão digital, Face ID, Íris\n- Muito rápido e seguro\n- Padrão em smartphones modernos\n\nMÉTODO 5: Chaves de Segurança Física\n- Pequeno dispositivo USB (YubiKey, etc.)\n- Máximo nível de segurança\n- Ideal para executivos e administradores\n\nRECOMENDAÇÃO: Use TOTP como padrão. Seja SMS se TOTP não funcionar. Biometria para celular.'
          },
          {
            type: 'text',
            title: 'PII (Personally Identifiable Information)',
            content: 'PII é QUALQUER informação que identifica unicamente uma pessoa. Vazamento causa danos imensos.\n\nDATOS CONSIDERADOS PII:\n\n1. IDENTIFICADORES DIRETOS\n   - CPF / SSN (EUA)\n   - Número de passaporte\n   - Número de carteira de identidade (RG)\n   - Número de carteira de motorista\n\n2. IDENTIFICADORES ÚNICOS BIOMÉTRICOS\n   - Impressão digital (de verdade, não foto)\n   - Scan de íris\n   - Dados de reconhecimento facial\n\n3. DADOS FINANCEIROS\n   - Número de cartão de crédito\n   - Número de conta bancária\n   - IBAN\n   - Dados de investimento\n\n4. DADOS DE SAÚDE\n   - Histórico médico\n   - Prescrições\n   - Diagnósticos\n   - Dados genéticos (DNA)\n\n5. DADOS DE CONTATO\n   - E-mail pessoal\n   - Número de telefone celular\n\n6. DADOS DEMOGRÁFICOS (em combinação)\n   - Nome + Data de nascimento + Cidade = Pode identificar\n   - Data de nascimento + Local de nascimento = Pode identificar\n\nREGULAÇÕES:\n- LGPD (Brasil): Multa até 2% do faturamento ou R$ 50 milhões por violação\n- GDPR (Europa): Multa até €20 milhões ou 4% do faturamento global\n- CCPA (Califórnia): Até $7.500 por violação\n\nEXEMPLO REAL: Vazamento da Equifax (2017) = 147 milhões de pessoas afetadas = $700 milhões de indenização.'
          },
          {
            type: 'text',
            title: 'Proteção de PII (Melhores Práticas)',
            content: '1. MINIMIZAÇÃO\n   - Colete APENAS dados necessários\n   - Não armazene CPF se não precisa\n   - Delete dados quando não precisa mais (LGPD requer)\n\n2. ENCRIPTAÇÃO\n   - Dados em repouso (banco de dados): AES-256\n   - Dados em trânsito (rede): TLS 1.3\n\n3. CONTROLE DE ACESSO\n   - Apenas funcionários autorizados acessam\n   - Logs de quem acessou o quê\n   - Revogar acesso quando sai da empresa\n\n4. SEGREGAÇÃO\n   - Separar dados de clientes em banco diferente\n   - Sistema de billing separado de dados pessoais\n\n5. BACKUP SEGURO\n   - Cópia encriptada\n   - Armazenada em local seguro\n   - Testada regularmente\n\n6. AUDITORIAS\n   - Teste de penetração anual\n   - Varredura de vulnerabilidades\n   - Compliance com LGPD/GDPR'
          }
        ],
        references: [
          { title: 'Microsoft Security: What is MFA?', url: 'https://www.microsoft.com/en-us/security/business/security-101/what-is-multifactor-authentication-mfa' },
          { title: 'LGPD Official', url: 'https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd' },
          { title: 'OWASP: Authentication Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html' }
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
            title: 'Classificação de Malware',
            content: 'Malware = Qualquer software com intenção maliciosa. Aqui estão os tipos principais:\n\n1. RANSOMWARE\n   - Encripta seus arquivos\n   - Exibe mensagem: "Seus arquivos foram bloqueados. Pague em Bitcoin para recuperar"\n   - Exemplos: WannaCry, Ryuk, NotPetya\n   - Propagação: Email phishing, vulnerabilidades não corrigidas\n   - Dano: Perda total de acesso aos arquivos até pagar (ou restaurar backup)\n   - Prevenção: Backup regular (desconectado de rede), patches de segurança\n\n2. WORM\n   - Se replica AUTOMATICAMENTE pela rede\n   - Não precisa de interação humana\n   - Exemplo: Um worm infecta seu PC, se auto-copia para todos os contatos de email, que se infectam e replicam novamente\n   - Exemplos históricos: ILOVEYOU, Melissa, Conficker\n   - Dano: Congestion de rede, consumo de banda, indisponibilidade de serviços\n   - Diferença do Vírus: Vírus precisa de arquivo hospedeiro; Worm não\n\n3. TROJAN / CAVALO DE TROIA\n   - Se disfarça de software legítimo\n   - Exemplo: "adobe-installer.exe" que na verdade é malware\n   - Requer clique do usuário para instalar\n   - Exemplos: Zeus, Emotet, Agent Tesla\n   - Dano: Roubo de senhas, logging de teclado (keylogger), acesso remoto (RAT)\n   - Prevenção: Não baixar de sites duvidosos, verificar assinatura digital\n\n4. SPYWARE\n   - Monitora ações do usuário\n   - Envia dados para atacante: histórico de navegação, senhas digitadas, webcam\n   - Geralmente instalado via Trojan ou download malicioso\n   - Dano: Roubo de dados pessoais, privacidade violada\n\n5. ADWARE\n   - Mostra anúncios indesejados\n   - Menos perigoso, mas irritante\n   - Pode redirecionar a sites de phishing\n\n6. BOTNET\n   - Computador ou rede de computadores controlados remotamente\n   - Atacante comanda centenas de PCs para:\n     * DDoS (ataque distribuído)\n     * Enviar spam\n     * Minerar criptomoedas\n   - Exemplo: Mirai (botnet de IoT que atacou Twitter, Netflix em 2016)\n\n7. ROOTKIT\n   - Software que obtém acesso ROOT (privilégios máximos)\n   - Muito difícil de detectar\n   - Pode desabilitar antivírus\n   - Praticamente impossível remover sem formatar SO'
          },
          {
            type: 'code',
            title: 'Protocolo PICERL: Resposta a Incidentes',
            content: 'Padrão da indústria para lidar com incidentes de segurança:\n\n1. PREPARATION (Preparação)\n   - Antes do incidente:\n   * Treinar time de segurança\n   * Documentar procedimentos\n   * Ter ferramentas prontas (sniffer, antivírus, scanner)\n   * Backups regulares testados\n   * Redundância (failover systems)\n   * Monitoramento 24/7 (SIEM, alertas)\n\n2. IDENTIFICATION (Identificação)\n   - Detectar que há incidente:\n   * Alerta do IDS/IPS\n   * Usuário relata: "Meu PC está lento / comportando estranho"\n   * Antivírus detecta arquivo suspeito\n   * Análise de logs mostra comportamento anômalo\n   * Ações: Confirmar, coletar evidências, estimar escopo\n\n3. CONTAINMENT (CONTENÇÃO) <- FASE CRÍTICA\n   - Parar a propagação:\n   * SHORT-TERM: Desconectar cabo de rede (não Wi-Fi, pode reconectar).\n   * Isolar o host: Quarentena de rede (VLAN isolada).\n   * Matar processo suspeito (Gerenciador de Tarefas).\n   * Bloquear conta de usuário infectada.\n   * Desabilitar credenciais comprometidas.\n   * NÃO desligue a máquina ainda (need RAM para análise).\n\n4. ERADICATION (Erradicação)\n   - Remover malware:\n   * Verificação completa com antivírus offline\n   * Remoção manual se necessário\n   * Patch de vulnerabilidades exploradas\n   * Mudar senhas de contas afetadas\n   * Remover backdoors/ferramentas deixadas por atacante\n\n5. RECOVERY (Recuperação)\n   - Voltar ao normal:\n   * Restaurar do backup (se tiver e estiver limpo)\n   * Reimplementar restrições de acesso\n   * Testar se sistema funciona\n   * Recolocar em produção gradualmente\n   * Monitorar por re-infecção\n\n6. LESSONS LEARNED\n   - Pós-incidente:\n   * Reunião com time\n   * Como foi descoberto?\n   * Quanto tempo levou para detectar/conter?\n   * Que falhas permitiram o incidente?\n   * Como evitar no futuro?\n   * Documentar em relatório\n   * Treinar time com base nos aprendizados\n\nEXEMPLO REAL - WannaCry:\nSegunda-feira 8:00 AM: Funcionário clica em email com anexo malicioso\n9:00 AM: Primeira máquina infectada, pero isolada em VLAN\n10:30 AM: Detectado worm na rede, Contenção ativada, 200 máquinas desconectadas\n11:00 AM: Antivírus offline roda em todas as máquinas afetadas\n15:00: Máquinas limpas e replicadas do backup\n16:00: Sistema voltar online\nTerça: Patch de vulnerabilidade instalado em todas as máquinas'
          },
          {
            type: 'text',
            title: 'Sinais de Compromisso: Como Detectar Malware',
            content: 'Se você suspeita que está infectado, procure por:\n\n1. PERFORMANCE\n   - PC mais lento que o normal\n   - Alto uso de CPU/Memória sem explicação (Ctrl+Shift+Esc → Gerenciador de Tarefas)\n   - Disco rígido funcionando constantemente (LED aceso)\n   - Conexão de rede lenta\n\n2. COMPORTAMENTO ESTRANHO\n   - Navegador abre abas/popups aleatoriamente\n   - Página inicial do navegador mudada\n   - Notificações de antivírus repetidas\n   - Sons estranhos/buzzing do PC\n   - Tela travando aleatoriamente\n\n3. APARÊNCIA\n   - Áreas de trabalho preenchidas com ícones estranhos\n   - Arquivos/pastas que não criou\n   - Nomes de arquivo aleatórios em Downloads\n   - Desktop fundo preto com mensagem de aviso (fake antivirus scareware)\n\n4. ACESSO/AUTENTICAÇÃO\n   - Não consegue logar na conta\n   - Senha foi mudada sem você ter feito\n   - Aplicações de banco bloqueadas\n   - Celular conectado por USB desconecta sozinho\n\n5. REDE\n   - Atividade de rede anômala (mesmo offline, dados sendo enviados)\n   - Conexão a IPs estranhos (verificar em netstat -an)\n   - Router reiniciando sozinho\n   - Vizinhos reclamando de conexão lenta\n\n6. ARQUIVO\n   - Arquivos desaparecidos\n   - Todos os arquivos com extensão .locked, .encrypted, .help2019\n   - Arquivos duplicados\n   - Timestamp dos arquivos mudou para datas recentes'
          },
          {
            type: 'text',
            title: 'Passos de Emergência se Estiver Infectado',
            content: 'SE DESCOBRIR INFECÇÃO AGORA:\n\n1. ISOLAMENTO IMEDIATO (30 segundos)\n   ☐ DESCONECTE O CABO DE REDE (Ethernet). Se apenas Wi-Fi, desligue.\n   ☐ Não use a máquina para nada de importante ainda.\n\n2. NÃO FAÇA ESTAS COISAS\n   ☐ Não reinicie se houver aviso de "atualizações pendentes"\n   ☐ Não baixe ferramentas de limpeza da internet (podem ser fake)\n   ☐ Não abra .exe de sites aleatórios\n   ☐ Não confie em pop-ups dizendo "Seu PC está infectado! Clique aqui"\n\n3. VERIFICAÇÃO OFFLINE\n   ☐ Boot em modo seguro (F8 no iniciar, ou Shift+Reiniciar → Troubleshoot)\n   ☐ Baixe antivírus offline em outro PC\n      * Malwarebytes: malwarebytes.com/downloads\n      * Kaspersky Rescue Disk: kaspersky.com/rescue-disk\n      * Windows Defender Offline: microsoft.com/security/scanner\n   ☐ Crie pendrive bootável com ferramenta\n   ☐ Boot deste pendrive\n   ☐ Rode verificação completa (pode levar 2-4 horas)\n\n4. DECISÃO\n   ☐ Se vírus removido com sucesso: Mude todas as senhas (de outro PC), restaure backups\n   ☐ Se infecção persistir: Backup dos arquivos pessoais para pendrive (após desinfecção com Windows Defender Offline), depois formato limpo com Windows/Linux\n\n5. APÓS LIMPEZA\n   ☐ Instale patches de SO (Microsoft Update)\n   ☐ Instale antivírus real (Windows Defender é suficiente para maioria)\n   ☐ Ative backup automático\n   ☐ Configure firewall\n   ☐ Restaure backups pessoais após verificação'
          }
        ],
        references: [
          { title: 'SANS Institute: Incident Handler Handbook', url: 'https://www.sans.org/white-papers/33901/' },
          { title: 'NIST: Cybersecurity Incident Handling', url: 'https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final' },
          { title: 'OWASP: Incident Response Planning', url: 'https://owasp.org/www-community/controls/Incident_response' }
        ]
      }
    ],
    questions: [
      {
        id: 'q1',
        type: QuestionType.OPEN_ENDED,
        prompt: 'Bloqueio 1/10: O Portão Lógico',
        context: 'O display exibe: "INPUT A=1, INPUT B=1. Qual operador resulta em 1 (Verdadeiro) apenas neste cenário?"',
        validationRegex: '(?i)^(E|AND)$',
        validationError: 'Erro de Lógica. Consulte o Módulo 1: Lógica & Credenciais.',
        correctAnswerCriteria: 'Operador AND/E.'
      },
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
      {
        id: 'q3',
        type: QuestionType.OPEN_ENDED,
        prompt: 'Bloqueio 3/10: Redefinição de Credencial',
        context: 'Consulte o Módulo 1. Crie uma senha de Admin que atenda aos 3 requisitos listados na seção "Entropia de Senhas".',
        validationRegex: '(?=.*[A-Z])(?=.*[0-9]).{8,}',
        validationError: 'Senha Fraca. Requer: 8+ chars, Maiúscula e Número.',
        correctAnswerCriteria: 'Senha forte.'
      },
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
      {
        id: 'q5',
        type: QuestionType.OPEN_ENDED,
        prompt: 'Bloqueio 5/10: Configuração de Firewall',
        context: 'Consulte o Módulo 3. O tráfego web seguro está bloqueado. Digite o número da porta padrão para HTTPS.',
        validationRegex: '^443$',
        validationError: 'Porta incorreta. HTTP é 80, mas qual é o seguro?',
        correctAnswerCriteria: 'Porta 443.'
      },
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
      {
        id: 'q7',
        type: QuestionType.OPEN_ENDED,
        prompt: 'Bloqueio 7/10: Diagnóstico de Infecção',
        context: 'Consulte o Módulo 5. Alerta: "ARQUIVOS CRIPTOGRAFADOS. PAGUE RESGATE". Qual o nome deste malware?',
        validationRegex: '(?i)RANSOMWARE',
        validationError: 'Incorreto. É o malware que pede "Resgate".',
        correctAnswerCriteria: 'Ransomware'
      },
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
