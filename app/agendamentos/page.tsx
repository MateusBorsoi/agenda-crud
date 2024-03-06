'use client'

import TabelaAgendamentos from "@/src/components/TabelaAgendamentos"
import { getActionsOptions } from "@/src/server/actions"
import { AgendamentoState } from "@/src/types/agendamento"
import { Container, LinearProgress, Paper } from "@mui/material"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const Agendamentos = () => {

 
    const [listaAgendamentos, setListaAgendamentos] = useState<AgendamentoState>({
        agendamento: [],
        isLoading: true
    })

    useEffect(() => {
        const getAsync = async () => {
            const response = await getActionsOptions({
                method: 'GET',
                cache: 'no-store',
                url: '/agendamentos'
            })
            if (response?.status === 200) {
                setListaAgendamentos({
                    agendamento: response.data,
                    isLoading: false
                })
                return
            }
            toast.error('Falha ao consultar dados')
        }
        getAsync()
    }, [])

    return (
        <Container maxWidth='lg' sx={{
            marginTop: 4
        }}>
            <Paper>
                {listaAgendamentos.isLoading ? (<LinearProgress />) : (
                    <TabelaAgendamentos agendamentos={listaAgendamentos.agendamento} />
                )}
            </Paper>
        </Container>
    )
}

export default Agendamentos