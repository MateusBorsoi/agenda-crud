'use client'

import { getActionsOptions } from "@/src/server/actions"
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const EditarAgendamento = ({ params }: { params: { id: number } }) => {
    const router = useRouter()

    const [dateTime, setDateTime] = useState<{
        data: string,
        hora: string,
        descricao: string
    }>({
        data: '',
        hora: '',
        descricao: ''
    })


    useEffect(() => {
        const getAsync = async () => {
            const response = await getActionsOptions({
                cache: 'no-store',
                method: 'GET',
                url: `/agendamento/${params.id}`
            })
            if (response?.status === 200) {
                setDateTime({
                    data: response.data.data,
                    descricao: response.data.descricao,
                    hora: response.data.hora
                })
                return
            }
            toast.error('Falha ao consultar agendamento')
        }
        getAsync()
    }, [])

    const handleSubmit = async () => {
        if (!dateTime.data || !dateTime.hora) {
            toast.error("É necessário informar a data e hora!")
            return
        }
        const response = await getActionsOptions({
            cache: 'no-store',
            method: 'PUT',
            body: JSON.stringify(dateTime),
            url: `/agendamento/${params.id}`
        })
        if (response?.status === 200) {
            toast.success('Agendamento alterado com sucesso!')
            router.push('/agendamentos')
            return
        }
        toast.error('Falha ao editar agendamento')
    }



    return (
        <Box sx={{
            width: '100%',
            height: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

        }}>
            <Card sx={{

                textAlign: 'center'
            }
            }>
                <Typography variant="h6" sx={{
                    mt: 1
                }}>
                    Editar agendamento
                </Typography>
                <Box sx={{
                    margin: 4
                }}>
                    <Grid container maxWidth={'lg'} spacing={2} >
                        <Grid item xs={12} md={12}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                defaultValue={dateTime.data}
                                label='Informe uma data' sx={{
                                    width: '100%'
                                }}
                                onChange={(event) => setDateTime({
                                    data: event.target.value,
                                    hora: dateTime.hora,
                                    descricao: dateTime.descricao
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                defaultValue={dateTime.hora}
                                label='Informe um horário' sx={{
                                    width: '100%'
                                }}
                                onChange={(event) => setDateTime({
                                    data: dateTime.data,
                                    hora: event.target.value,
                                    descricao: dateTime.descricao
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                defaultValue={dateTime.descricao}
                                multiline label='Descrição' sx={{
                                    width: '100%'
                                }}
                                onChange={(event) => setDateTime({
                                    data: dateTime.data,
                                    hora: dateTime.hora,
                                    descricao: event.target.value
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} sx={{
                            display: 'flex',
                            justifyContent: 'end'
                        }
                        }>
                            <Button onClick={() => router.push('/agendamentos')} sx={{
                                mr: 1
                            }} variant="outlined">Voltar</Button>
                            <Button onClick={handleSubmit} variant="contained">Editar</Button>
                        </Grid>

                    </Grid>
                </Box>
            </Card>
        </Box>
    )
}

export default EditarAgendamento