import React from 'react';
import { Container, List, ItemList, ListCheck, ListTitle, ListInputText } from './styles'

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
                <List>
                    {this.state.guestsList.map(guest => {
                        return(
                        <ItemList key={guest.id}>
                            <ListCheck type="checkbox" name={`guest-${guest.id}`}/>
                            <ListTitle color={this.getStatusByCode(guest.status_code).color}>{guest.name}</ListTitle>
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