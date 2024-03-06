'use client'


import { getActionsOptions } from "@/src/server/actions"
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"



const Agendar = () => {
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

    const handleSubmit = async () => {
        if (!dateTime.data || !dateTime.hora) {
            toast.error("É necessário informar a data e hora!")
            return
        }
        const response = await getActionsOptions({
            cache: 'no-store',
            method: 'POST',
            body: JSON.stringify(dateTime),
            url: '/agendar'
        })
        if (response?.status === 200) {
            toast.success('Agendamento efetuado com sucesso!')
            router.push('/agendamentos')
        }
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
                    Agendar horário
                </Typography>
                <Box sx={{
                    margin: 4
                }}>
                    <Grid container maxWidth={'lg'} spacing={2} >
                        <Grid item xs={12} md={12}>
                            <TextField label='Informe uma data' sx={{
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
                            <TextField label='Informe um horário' sx={{
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
                            <TextField multiline label='Descrição' sx={{
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
                            <Button onClick={handleSubmit} variant="contained">Agendar</Button>
                        </Grid>

                    </Grid>
                </Box>
            </Card>
        </Box>
    )
}

export default Agendar