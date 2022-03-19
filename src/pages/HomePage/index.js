import React from 'react'
import { Container, List, ItemList, ListCheck, ListTitle, ListInputText, ListAddButton, ListActionButton, ListActions } from './styles'
import  { v4 as uuidv4 } from 'uuid'

import axios from 'axios';

const baseUrl = 'http://localhost:4444'

class FormControl extends React.Component {
    render() {
        return(
            <h2> Form Control </h2>
        )
    }
}


class GuestsList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            statusList: [],
            guestsList: [],
            inputText: ''
        }
    }

    onClickRemoveItemListButton(e, id) {
        const newList = this.state.guestsList.filter(item => item.id !== id)
        this.setState({
            guestsList: [...newList]
        })
    }

    onClickAddItemListButton(e) {
        const guestName = this.state.inputText
        const listGuest = this.state.guestsList
        const newGuest = {
            "id": uuidv4(),
            "order": listGuest.length + 1,
            "name": guestName,
            "isChild": false,
            "status_code": "L"
        }
        this.setState({
            guestsList: [...this.state.guestsList, newGuest]
        })
        this.clearListInputText()
    }

    clearListInputText() {
        this.setState({
            inputText: ''
        })
    }

    onChangeListInputText(e) {
        this.setState({
            inputText: e.currentTarget.value
        })
    }

    async componentDidMount() {
        await this.getStatusList()
        await this.getGuestList()
    }

    async getStatusList() {
        const _this = this
        await axios({
            methos: 'get',
            url: `${baseUrl}/status`
        }).then(response => {
            _this.setState({ statusList: response.data })
        })
    }

    async getGuestList() {
        const _this = this
        const userId = 1
        await axios({
            method: "get",
            url: `${baseUrl}/lists/${userId}`
        }).then(response => {
            _this.setState( { guestsList: response.data.guests })
        })
    }

    getStatusByCode(code) {
        const statusIndex = this.state.statusList.findIndex(status => status.code.toLowerCase() === code.toLowerCase())
        return this.state.statusList[statusIndex]
    }

    render() {
        return(
            <>
                <ListInputText type="text" value={this.state.inputText} onChange={(e) => this.onChangeListInputText(e)}/>
                <ListAddButton onClick={(e) => this.onClickAddItemListButton(e)}>Add Guest</ListAddButton>
                <List>
                    {this.state.guestsList.map(guest => {
                        return(
                        <ItemList key={guest.id}>
                            &#10070;
                            <ListCheck type="checkbox" name={`guest-${guest.id}`}/>
                            <ListTitle color={this.getStatusByCode(guest.status_code).color}>{guest.name}</ListTitle>
                            <ListActions>
                                <ListActionButton onClick={(e) => this.onClickRemoveItemListButton(e, guest.id)}>Excluir</ListActionButton>
                            </ListActions>
                        </ItemList>)
                    })}
                </List>
            </>
        )
    }
}

const HomePage = () => {
    return(
        <Container>
            <h1> Wedding List </h1>
            <FormControl />
            <GuestsList />
            {/* ### FORM CONTROL - To add a guest #### */}
            {/* INPUT TEXT - To name*/}
            {/* CHECKBOX - To set if is child - Default: not checked */}
            {/* SELECT - To set the status - Default Code: 'L' */}
            {/* ### TABLE ### */}
            {/* thead tr and th - to header table */}
            {/* tbody tr and td - to body table */}
        </Container>
    )
}

export default HomePage;