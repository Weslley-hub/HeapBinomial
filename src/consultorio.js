const BinomialHeap = require('./binomialHeap');

const consultorios = {
    1: {
        prioritario: new BinomialHeap(),
        naoPrioritario: new BinomialHeap(),
        aberto: false
    },
    2: {
        prioritario: new BinomialHeap(),
        naoPrioritario: new BinomialHeap(),
        aberto: false
    },
    3: {
        prioritario: new BinomialHeap(),
        naoPrioritario: new BinomialHeap(),
        aberto: false
    },
    4: {
        prioritario: new BinomialHeap(),
        naoPrioritario: new BinomialHeap(),
        aberto: false
    }
};

function adicionarPaciente(consultorio, prioritario, numero) {
    if (!consultorios[consultorio].aberto) {
        console.log(`O consultorio ${consultorio} esta fechado. Nao e possivel adicionar o paciente.`);
        return;
    }

    if (prioritario) {
        consultorios[consultorio].prioritario.insert(numero, { numero });
    } else {
        consultorios[consultorio].naoPrioritario.insert(numero, { numero });
    }

    console.log(`Paciente ${numero} adicionado ao consultorio ${consultorio} (${prioritario ? 'Prioritario' : 'Nao Prioritario'}).`);
}

function atenderPaciente(consultorio) {
    let paciente = consultorios[consultorio].prioritario.extractMin();
    if (!paciente) {
        paciente = consultorios[consultorio].naoPrioritario.extractMin();
    }
    return paciente;
}

function abrirFecharConsultorio(id, abrir) {
    const consultorio = consultorios[id];

    if (!consultorio) {
        console.log(`consultorio com ID ${id} nao encontrado.`);
        return;
    }

    const consultoriosAbertos = Object.values(consultorios).filter(c => c.aberto).length;

    if (abrir) {
        if (consultoriosAbertos >= 3) {
            console.log("Ja ha pelo menos tres consultorios abertos.");
            return;
        }
        consultorio.aberto = true;
        console.log(`consultorio ${id} esta agora aberto.`);
    } else {
        if (!consultorio.aberto) {
            console.log(`consultorio ${id} ja está fechado.`);
            return;
        }
        
        redistribuirFilas(id);
        consultorio.aberto = false;
        console.log(`consultorio ${id} esta agora fechado.`);
    }
}

function redistribuirFilas(idFechado) {
    const consultorioFechado = consultorios[idFechado];

    for (const [id, consultorio] of Object.entries(consultorios)) {
        if (id !== idFechado && consultorio.aberto) {
            while (!consultorioFechado.prioritario.isEmpty()) {
                consultorio.prioritario.insert(
                    consultorioFechado.prioritario.extractMin().key,
                    {}
                );
            }

            while (!consultorioFechado.naoPrioritario.isEmpty()) {
                consultorio.naoPrioritario.insert(
                    consultorioFechado.naoPrioritario.extractMin().key,
                    {}
                );
            }

            console.log(`Filas do consultório ${idFechado} foram redistribuídas para o consultório ${id}.`);
            break;
        }
    }
}

function mostrarSituacao() {
    for (const [consultorio, filas] of Object.entries(consultorios)) {
        console.log(`  \n consultorio ${consultorio}:`);
        console.log(`  Status: ${filas.aberto ? 'Aberto' : 'Fechado'}`);
        console.log(`  prioritario: ${filas.prioritario.head ? filas.prioritario.head.key : 'Vazia'}`);
        console.log(`  Nao prioritario: ${filas.naoPrioritario.head ? filas.naoPrioritario.head.key : 'Vazia'}`);
    }
}

module.exports = {
    adicionarPaciente,
    atenderPaciente,
    abrirFecharConsultorio,
    mostrarSituacao
};
