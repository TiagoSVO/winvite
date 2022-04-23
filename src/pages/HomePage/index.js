import React from 'react'
import { Container, List, ItemList, ListCheck, 
         ListTitle, ListInputText, ListAddButton, 
         ListActionButton, ListActions, ListOrderDragAndDrop,
         ListOrderArrow, ListActionSelect, ListButtonSave,
         Board, Score, ScoreTitle, ScoreCount } from './styles'
import TopMenu from '../GlobalComponents/TopMenu'
import  { v4 as uuidv4 } from 'uuid'
import { arrayMoveImmutable } from 'array-move'

import axios from 'axios';

const baseUrl = 'http://localhost:4444'

class FormControl extends React.Component {
    render() {
        return(
            <h2> Form Control </h2>
        )
    }
}

class StatusBoard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            statusBoard: []
        }
    }
    
    static defaultProps = {
        statusList: [],
        itemsList: []
    }

    fillStatusBoard() {
        const _this = this
        
        const statusBoard = _this.props.statusList.map(status => {
            return {
                ...status,
                score: _this.props.itemsList
                       .filter(item => item.status_code.toLowerCase() === status.code.toLowerCase()).length
            }
        })

        debugger

        this.setState({
            statusBoard: statusBoard
        })
    }

    componentDidUpdate(prevProps) {
        const equalItemsList = this.props.itemsList !== prevProps.itemsList
        const equalStatusList = this.props.statusList !== prevProps.statusList

        if(equalItemsList || equalStatusList) {
            this.fillStatusBoard() 
        }
    }

    render() {
        return(
            <Board>
                {this.state.statusBoard.map(status => {
                    return(
                        <Score key={status.id}>
                            <ScoreTitle>{status.title}</ScoreTitle> - <ScoreCount>{status.score}</ScoreCount>
                        </Score>
                    )
                })}
            </Board>
        )
    }
}


class GuestsList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            statusList: [],
            guestsList: [],
            inputText: '',
        }
    }

    onChangeSelectStatus(e, id){
        const currentList = this.state.guestsList
        const itemCurrentIndex = currentList.findIndex(item => item.id === id)
        const selectedCode = e.currentTarget.value
        const itemNewStatus = {...currentList[itemCurrentIndex], status_code: selectedCode}
        
        currentList[itemCurrentIndex] = itemNewStatus
        this.setState({
            guestsList: [...currentList]
        })
    }

    onClickItemArrowUp(e, id) {
        const currentList = this.state.guestsList
        const itemCurrentIndex = currentList.findIndex(item => item.id === id)
        if(itemCurrentIndex > 0) {
            const newList = arrayMoveImmutable(currentList, itemCurrentIndex, itemCurrentIndex-1)
            this.setState({ guestsList: [...newList]}, 
                            () => this.orderCurrentList())
        }
    }

    onClickItemArrowDown(e, id) {
        console.log('done!')
        const currentList = this.state.guestsList
        const itemCurrentIndex = currentList.findIndex(item => item.id === id)
        if(itemCurrentIndex < currentList.length -1) {
            const newList = arrayMoveImmutable(currentList, itemCurrentIndex, itemCurrentIndex+1)
            this.setState({ guestsList: [...newList]}, 
                            () => this.orderCurrentList())
        }
    }

    orderCurrentList() {
        const guestList = this.state.guestsList
        let orderNumber = 0
        const orderedList = guestList.map((item) => {
            orderNumber++
            return {...item, order: orderNumber}
        })
        this.setState({ guestsList: [...orderedList] })
    }

    onClickRemoveItemListButton(e, id) {
        const newList = this.state.guestsList.filter(item => item.id !== id)
        this.setState({
            guestsList: [...newList]
        }, () => this.orderCurrentList())
    }

    onEnterInputTodoAdd = (e) => {
        if(e.keyCode === 13 && this.state.inputText !== '') {
            this.addItemToTodoList()
            this.clearListInputText()
        } else if (e.keyCode === 27) {
            this.clearListInputText()
        }
    }

    addItemToTodoList() {
        const guestName = this.state.inputText
        const listGuest = this.state.guestsList
        const newGuest = {
            "id": uuidv4(),
            "order": listGuest.length + 1,
            "name": guestName,
            "isChild": false,
            "status_code": "L",
            "group_id": 1
        }
        this.setState({
            guestsList: [...this.state.guestsList, newGuest]
        })
    }

    onClickAddItemListButton(e) {
        if(this.state.inputText !== '') {
            this.addItemToTodoList()
            this.clearListInputText()
        }
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

    async onClickSaveList(e) {
        await this.saveList()
    }

    async saveList() {
        const userId = 1
        await axios({
            method: 'patch',
            url: `${baseUrl}/lists/${userId}`,
            data: {guests: [...this.state.guestsList]}
        })
    }

    render() {
        return(
            <>
                <StatusBoard itemsList={this.state.guestsList} statusList={this.state.statusList}/>
                <ListInputText type="text" value={this.state.inputText} onKeyDown={(e) => this.onEnterInputTodoAdd(e)} onChange={(e) => this.onChangeListInputText(e)}/>
                <ListAddButton onClick={(e) => this.onClickAddItemListButton(e)}>Add Guest</ListAddButton>
                <List>
                    {this.state.guestsList.map(guest => {
                        return(
                        <ItemList key={guest.id}>
                            <ListOrderArrow onClick={(e) => this.onClickItemArrowUp(e, guest.id)}>
                                &uarr;
                            </ListOrderArrow>
                            <ListOrderArrow onClick={(e) => this.onClickItemArrowDown(e, guest.id)}>
                                &darr;
                            </ListOrderArrow>
                            <ListOrderDragAndDrop>
                                &#10070;
                            </ListOrderDragAndDrop>
                            <ListCheck type="checkbox" name={`guest-${guest.id}`}/>
                            <ListTitle color={this.getStatusByCode(guest.status_code).color}>{guest.name}</ListTitle>
                            <ListActions>
                                <ListActionButton onClick={(e) => this.onClickRemoveItemListButton(e, guest.id)}>Excluir</ListActionButton>
                                <ListActionSelect value={guest.status_code} onChange={(e) => this.onChangeSelectStatus(e, guest.id)}>
                                    {this.state.statusList.map(status => {
                                        return(
                                            <option key={status.id} value={status.code}>{status.title}</option>                                            
                                        )
                                    })}
                                </ListActionSelect>
                            </ListActions>
                        </ItemList>)
                    })}
                </List>
                <ListButtonSave onClick={(e) => this.onClickSaveList(e)}>Save List</ListButtonSave>
            </>
        )
    }
}

const HomePage = () => {
    return(
        <Container>
            <TopMenu />
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