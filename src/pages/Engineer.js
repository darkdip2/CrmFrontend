import MaterialTable from "@material-table/core"
import { useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import { fetchTickets, updateTicketApi } from "../api/ticket";
import { Card,Button, Modal } from "react-bootstrap";


function Engineer(){
    const [ticketDetails, setTicketDetails] = useState([]);
    const [message, setMessage] = useState("");
    const [currentSelectedTicket, setCurrentSelectedTicket] = useState({})
    const [updateTicketModal, setUpdateTicketModal] = useState(false)
    const navigate = useNavigate();
    const updateCurrentSelectedTicket = (data) => setCurrentSelectedTicket(data)
    const [Count,setCount]=useState({Open:0,Closed:0,InProgress:0,Pending:0})

    const columns = [
        {
            title: "ID",
            field: "_id"
        },
        {
            title: "TITLE",
            field: "title"
        },
        {
            title: "DESCRIPTION",
            field: "description"
        },
        {
            title: "ASSIGNEE",
            field: "assignee"
        },
        {
            title: "PRIORITY",
            field: "ticketPriority"
        },
        {
            title: "STATUS",
            field: "status"
        }
    ]

    useEffect(() => {

        fetchTicketData()

    }, [])

    //Wrapping the async fetchTickets API
    async function fetchTicketData()
    {
        await fetchTickets().then((res) => {
            let A=0,B=0,C=0,D=0,Resultt=[];
            for(let Ticket of res.data)
            {
                if(Ticket.assignee==localStorage.getItem("userId"))
                {
                    Resultt.push(Ticket);
                    if(Ticket.status=='OPEN')A++;
                    if(Ticket.status=='CLOSED')B++;
                    if(Ticket.status=='IN_PROGRESS')C++;
                    if(Ticket.status=='PENDING')D++;
                }
            }
            setCount({Open:A,Closed:B,InProgress:C,Pending:D})
            setTicketDetails(Resultt);
        }).catch(err => {
            console.log("Error occured during fetching all tickets " + JSON.stringify(err))
            setMessage(err.message)
        })
    }

    const logoutFn = () => {
        localStorage.clear();
        navigate("/");
    };


    const editTicket = (ticketDetail) => {

        const ticket = {
            _id: ticketDetail._id,
            title: ticketDetail.title,
            description: ticketDetail.description,
            assignee: ticketDetail.assignee,
            reporter: ticketDetail.reporter,
            priority: ticketDetail.ticketPriority,
            status: ticketDetail.status
        }

        setCurrentSelectedTicket(ticket)
        setUpdateTicketModal(true)
        console.log("Selected ticket details is " + JSON.stringify(currentSelectedTicket))
    }

    const onTicketUpdate = (e) => {
        if(e.target.name === "description")currentSelectedTicket.description = e.target.value
        updateCurrentSelectedTicket(Object.assign({}, currentSelectedTicket))
    }

    const updateTicket = (e) => {
        e.preventDefault()
        console.log(currentSelectedTicket);
        updateTicketApi(currentSelectedTicket._id, currentSelectedTicket)
        .then((res) => {
            setUpdateTicketModal(false)
            setMessage("Ticket updated successfully")
            fetchTicketData()
        }).catch((err) => {
            setMessage(err.message)
        })
    }

    return(
    <div className="bg-light vh-100">
{/*             <Sidebar /> */}
            <div className="container-fluid pt-5">
                <h3 className="text-center text-success">Welcome, {localStorage.getItem("name")}</h3>
            </div>
            <p className="text-center text-muted">Take a look at all your tickets below!</p>
            <div className='d-flex'>
            <Card bg='primary' key='open'text='light'style={{ width: '14rem' }}className="mb-2 px-5 mx-5">
          <Card.Body>
            <Card.Title>OPEN</Card.Title>
            <Card.Text>
              {Count.Open}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card bg='secondary' key='pending'text='light'style={{ width: '14rem' }}className="mb-2 px-5 mx-5">
          <Card.Body>
            <Card.Title>PENDING</Card.Title>
            <Card.Text>
              {Count.Pending}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card bg='success' key='inorogress'text='light'style={{ width: '14rem' }}className="mb-2 px-5 mx-5">
          <Card.Body>
            <Card.Title>IN_PROGRESS</Card.Title>
            <Card.Text>
              {Count.InProgress}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card bg='danger' key='closed'text='light'style={{ width: '14rem' }}className="mb-2 px-5 mx-5">
          <Card.Body>
            <Card.Title>CLOSED</Card.Title>
            <Card.Text>
              {Count.Closed}
            </Card.Text>
          </Card.Body>
        </Card>
        <Button variant="primary" onClick={logoutFn}>Logout</Button>
            </div>
            <div className="container-fluid p-5 p-3">
                <MaterialTable
                    onRowClick={(event, rowData) => editTicket(rowData)}
                    title="Tickets raised by you"
                    columns={columns}
                    data={ticketDetails}
                />
                {updateTicketModal ? (
                    <Modal
                        show={updateTicketModal}
                        centered
                        onHide={() => setUpdateTicketModal(false)}
                    >
                        <Modal.Header>Update ticket</Modal.Header>
                        <Modal.Body>
                            <form onSubmit={updateTicket}>
                                <h5 className="card-subtitle text-success lead">ID: {currentSelectedTicket._id}</h5>

                                <div className="input-group m-1">
                                    <label className="label label-md input-group-text">Title</label>
                                    <input className="form-control" type="text" name="title" value={currentSelectedTicket.title} disabled/>
                                </div>

                                <div className="input-group m-1">
                                    <label className="label label-md input-group-text">Assignee</label>
                                    <input type="text" className="form-control" name="assignee" value={currentSelectedTicket.assignee} disabled />
                                </div>

                                <div className="input-group m-1">
                                    <label className="label label-md input-group-text">Priority</label>
                                    <input type="text" className="form-control" name="ticketPriority" value={currentSelectedTicket.priority} disabled />
                                </div>

                                <div className="input-group m-1">
                                    <label className="label label-md input-group-text">Description</label>
                                    <textarea
                                        type="text"
                                        rows="3"
                                        name="description"
                                        value={currentSelectedTicket.description}
                                        onChange={onTicketUpdate}
                                    />
                                </div>

                                <div>
                                    <label>Status</label>
                                    <input type="text" className="form-control" name="status" value={currentSelectedTicket.status} disabled />
                                </div>

                                <div className="d-flex justify-content-end">
                                    <Button variant="secondary" className="m-1" onClick={() => setUpdateTicketModal(false)}>Cancel</Button>
                                    <Button variant="success" className="m-1" type="submit">Update</Button>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                ) : null}
            </div>
            </div>
            )
        }
export default Engineer
