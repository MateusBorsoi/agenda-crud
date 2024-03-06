export interface Agendamento {
    id: number,
    data: string,
    hora: string,
    descricao: string
}

export interface AgendamentoState {
    agendamento: Agendamento[]
    isLoading: boolean
}