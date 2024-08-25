const readline = require('readline-sync');
const {
    adicionarPaciente,
    atenderPaciente,
    abrirFecharConsultorio,
    mostrarSituacao
} = require('./consultorio');
const {
    logOperation
} = require('./log');

function menu() {
    while (true) {
        console.log('\n Menu: \n');
        console.log('1. Chegada de um novo paciente');
        console.log('2. Atendimento de um paciente');
        console.log('3. Abertura/Fechamento de um consultorio');
        console.log('4. Exibir situação atual');
        console.log('5. Sair');

        const escolha = readline.question('\nEscolha uma opcao: \n');

        if (escolha === '1') {
            const consultorio = readline.question('Numero do consultorio: ');
            const prioritario = readline.keyInYNStrict('O paciente é prioritario? ');
            const numero = readline.question('Numero do paciente: ');
            adicionarPaciente(consultorio, prioritario, numero);
            logOperation(`INC ${prioritario ? 'P' : 'N'} ${numero} - ${consultorio}`);
        } else if (escolha === '2') {
            const consultorio = readline.question('Numero do consultorio: ');
            const paciente = atenderPaciente(consultorio);
            if (paciente) {
                logOperation(`ATD ${paciente.data.numero} - ${consultorio}`);
            } else {
                console.log('Nao ha pacientes para atender.');
            }
        } else if (escolha === '3') {
            const consultorio = readline.question('Numero do consultorio: ');
            const abrir = readline.keyInYNStrict('Abrir consultorio? ');
            abrirFecharConsultorio(consultorio, abrir);
            logOperation(`${abrir ? 'ABR' : 'FECH'} ${consultorio}`);
        } else if (escolha === '4') {
            mostrarSituacao();
        } else if (escolha === '5') {
            console.log('Saindo...');
            break;
        } else {
            console.log('Opcao invalida.');
        }
    }
}

menu();