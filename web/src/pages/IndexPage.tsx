import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
<<<<<<< HEAD
=======
// import { DataGrid } from '@mui/x-data-grid'
import {
  Grid,
  Box,
  List,
  ListItem,
  Divider,
  Typography,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  IconButton,
  Button,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { format, toDate } from 'date-fns'

>>>>>>> new
import Layout from '../components/Layout'
import { AuthContext } from '../contexts/AuthContext'
import { DataGrid } from '@mui/x-data-grid'
import ErrorAlert from '../components/ErrorAlert'
<<<<<<< HEAD
import { api } from '../services/api'
import { Grid } from '@mui/material'
import moment from 'moment'

const columns = [
  { field: 'id', headerName: 'ID', width: 300 },
  { field: 'description', headerName: 'Description', width: 300 },
  { field: 'expire_date', headerName: 'Expire Date', width: 200 },
  { field: 'value', headerName: 'Value', width: 100 },
]

export default function IndexPage() {
  const { signIn, user } = useContext(AuthContext)
  const history = useHistory()
  const [rows, setRows] = useState([])
=======
import BillDialog from '../components/BillDialog'
import DeleteBillDialog from '../components/DeleteBillDialog'

export default function IndexPage() {
  const { user, logout } = useContext(AuthContext)

  const history = useHistory()

>>>>>>> new
  const [bills, setBills] = useState([])
  const [error, setError] = useState(null)
  const [newBill, setNewBill] = useState(false)
  const [editBill, setEditBill] = useState(false)
  const [deleteBill, setDeleteBill] = useState(false)
  const [bill, setBill] = useState(null)

  useEffect(() => {
    if (!user) {
      history.push('/sign-in')
    }

    loadBills()
  }, [history, user])

  const loadBills = async () => {
    setError('')

    const response = await api(`/api/v1/bills`, 'GET')

    if (response.status === 200) {
      const bills = await response.json()
<<<<<<< HEAD
      const rows = bills.map((b) => {
        return {
          id: b.id,
          description: b.description,
          expire_date: moment(b.expire_date).format('DD/MM/YYYY'),
          value: b.value,
        }
      })
      setRows(rows)
=======
      console.log(bills)
>>>>>>> new
      setBills(bills)
    } else if (response.status === 401) {
      logout()
    } else {
      const error = await response.json()
      setError(error.message)
    }
  }

  return (
    <Layout title='Index'>
<<<<<<< HEAD
      <Grid width={'100%'}>
        <DataGrid
          style={{ marginTop: '15px' }}
          rows={rows}
          autoHeight
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
        />
      </Grid>
      <Grid width={'100%'}>
        {error && (
          <ErrorAlert error={error} handleClose={() => setError(null)} />
        )}
      </Grid>
=======
      {error && <ErrorAlert error={error} handleClose={() => setError(null)} />}
      <div>
        <Button
          onClick={() => setNewBill(true)}
          variant='contained'
          sx={{ display: 'inline-block', mt: 1, ml: 2 }}
        >
          New
        </Button>
      </div>
      {bills.length > 0 ? (
        <List sx={{ width: '100%' }}>
          {bills.map((bill) => {
            const date = format(new Date(bill.expire_date), 'dd/MM/yyyy')
            return (
              <ListItem
                secondaryAction={[
                  <IconButton>
                    <EditIcon
                      onClick={() => {
                        setEditBill(true)
                        setBill(bill)
                      }}
                    />
                  </IconButton>,
                  <IconButton>
                    <DeleteIcon
                      onClick={() => {
                        setDeleteBill(true)
                        setBill(bill)
                      }}
                    />
                  </IconButton>,
                ]}
              >
                <ListItemText
                  primary={`${date} - ${bill.value} `}
                  secondary={
                    <React.Fragment>{bill.description}</React.Fragment>
                  }
                />
              </ListItem>
            )
          })}
        </List>
      ) : (
        <Box sx={{ mt: 2 }}>No bills found, create a new now</Box>
      )}
      {newBill && (
        <BillDialog
          reload={() => loadBills()}
          open={newBill}
          handleClose={() => setNewBill(false)}
        />
      )}

      {editBill && (
        <BillDialog
          reload={() => loadBills()}
          open={editBill}
          bill={bill}
          edit={true}
          handleClose={() => setEditBill(false)}
        />
      )}

      {deleteBill && (
        <DeleteBillDialog
          reload={() => loadBills()}
          open={deleteBill}
          bill={bill}
          handleClose={() => setDeleteBill(false)}
        />
      )}
>>>>>>> new
    </Layout>
  )
}
