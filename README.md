# Sistema de Atendimento Hospitalar

Este projeto é um sistema de gerenciamento de atendimento hospitalar que utiliza Heaps Binomiais para gerenciar filas de pacientes e consultórios.

## Funcionalidades

- **Adicionar Paciente**: Adiciona um paciente à fila de um consultório específico, com base em sua prioridade.
- **Atender Paciente**: Realiza o atendimento de um paciente, removendo-o da fila.
- **Abrir/Fechar Consultório**: Abre ou fecha um consultório e redistribui as filas conforme necessário.
- **Exibir Situação Atual**: Mostra a situação atual dos consultórios e filas.
- **Gerar Arquivo de Histórico**: Registra todas as operações realizadas em um arquivo `.txt`.

## Formato do Arquivo de Histórico

O arquivo de histórico (`historico.txt`) deve registrar todas as operações realizadas no sistema. Abaixo estão as nomenclaturas e formatos utilizados:

### Inclusão de Paciente

- **Formato**: `INC [TIPO] [NUMERO] - [CONSULTORIO]`
- **Exemplo**: `INC N 89 - 2`
- **Descrição**: Registra a inclusão de um paciente na fila.
  - `INC` indica que é uma inclusão.
  - `[TIPO]` é o tipo de paciente (`P` para prioritário, `N` para não prioritário).
  - `[NUMERO]` é o número do paciente recebido na triagem.
  - `[CONSULTORIO]` é o número do consultório onde o paciente foi inserido.

### Atendimento de Paciente

- **Formato**: `ATD [NUMERO] - [CONSULTORIO]`
- **Exemplo**: `ATD 45 - 1`
- **Descrição**: Registra o atendimento de um paciente.
  - `ATD` indica que o paciente foi atendido.
  - `[NUMERO]` é o número do paciente que foi atendido.
  - `[CONSULTORIO]` é o número do consultório onde o atendimento foi realizado.

### Abertura de Consultório

- **Formato**: `ABR [CONSULTORIO]`
- **Exemplo**: `ABR 4`
- **Descrição**: Registra a abertura de um consultório.
  - `ABR` indica que o consultório foi aberto.
  - `[CONSULTORIO]` é o número do consultório que foi aberto.

### Fechamento de Consultório

- **Formato**: `FECH [CONSULTORIO]`
- **Exemplo**: `FECH 3`
- **Descrição**: Registra o fechamento de um consultório.
  - `FECH` indica que o consultório foi fechado.
  - `[CONSULTORIO]` é o número do consultório que foi fechado.

### Redistribuição de Filas

- **Formato**: `REDISTRIBUI [CONSULTORIO_FECHADO] PARA [CONSULTORIO_DESTINO]`
- **Exemplo**: `REDISTRIBUI 3 PARA 2`
- **Descrição**: Registra a redistribuição das filas de um consultório fechado para outro.
  - `REDISTRIBUI` indica que ocorreu a redistribuição.
  - `[CONSULTORIO_FECHADO]` é o número do consultório cujas filas foram redistribuídas.
  - `[CONSULTORIO_DESTINO]` é o número do consultório que recebeu as filas redistribuídas.

## Exemplos de Arquivo de Histórico

