import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Typography } from '@mui/material';
import { Agendamento } from '../types/agendamento';
import { getActionsOptions } from '../server/actions';
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function TabelaAgendamentos({ agendamentos }: { agendamentos: Agendamento[] }) {

    const [itemToDelete, setItemToDelete] = useState<number>(0)
    const [open, setOpen] = useState<boolean>(false)
    const router = useRouter()
    const handleClose = () => {
        setOpen(false)
        setItemToDelete(0)
    }


    const handleOpen = ({ id }: { id: number }) => {
        setItemToDelete(id)
        setOpen(true)
    }

    const removerAgendamento = async ({ id }: { id: number }) => {
        const response = await getActionsOptions({
            cache: 'no-store',
            method: 'DELETE',
            url: `/agendamento/${id}`
        })
        if (response?.status === 200) {
            toast.success('Agendamento removido com sucesso!')
            setOpen(false)
            window.location.reload()
            return
        }
        toast.error('Falha ao remover agendamento')
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Descricao</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Hora</TableCell>
                            <TableCell align='right' sx={{
                                pr: 10
                            }}>Ações</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {agendamentos?.map((agendamento: Agendamento) => {
                            return (
                                <TableRow
                                    key={agendamento.descricao}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        {agendamento.descricao}
                                    </TableCell>
                                    <TableCell>
                                        {agendamento.data}
                                    </TableCell>
                                    <TableCell>{agendamento.hora}</TableCell>
                                    <TableCell align='right'>

                                        <Button onClick={() => handleOpen({ id: agendamento.id })}>
                                            <DeleteOutlineIcon />
                                        </Button>
                                        <Button onClick={() => router.push(`/editar/${agendamento.id}`)}>
                                            <EditIcon />
                                        </Button>

                                    </TableCell>

                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                {agendamentos.length === 0 && <Typography sx={{ textAlign: 'center' }}>Nenhum agendamento encontrado</Typography>}
            </TableContainer>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Deseja realmente remover o agendamento ?
                </DialogTitle>

                <DialogActions>
                    <Button variant='outlined' onClick={handleClose}>Cancelar</Button>
                    <Button variant='contained' onClick={() => removerAgendamento({ id: itemToDelete })} autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>


        </>
    );
}
