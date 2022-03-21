import styled from 'styled-components';

export const Container = styled.main`
    background-color: #E7F1E6;
    width: 100%;
    height: 100vh;
    display: grid;
`

export const ListOrderArrow = styled.span`
    flex-basis: 3%;
    cursor: pointer;
`

export const ListOrderDragAndDrop = styled.span`
    flex-basis: 3%;
    cursor: n-resize;
`

export const ListInputText = styled.input``

export const ListAddButton = styled.button``

export const ListActionSelect = styled.select``

export const List = styled.ul`
    width: 50%;
    margin: 0 auto;
    border: 1px solid #000;
    text-align: center;
`

export const ItemList = styled.li`
    display:flex;
    align-items: center;
    justfy-content: center;
`

export const ListCheck = styled.input`
    flex-basis: 3%;
    flex:1
`

export const ListTitle = styled.span`
    flex-basis: 65%;
    text-align: left;
    color:${props => props.color};
`

export const ListActions = styled.div`
    flex-basis: 25%;
    display: flex;
    flex:1
`

export const ListActionButton = styled.button`

`

export const ListButtonSave = styled.button``