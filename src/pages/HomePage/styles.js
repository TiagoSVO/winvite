import styled from 'styled-components';

export const Container = styled.main`
    background-color: #E7F1E6;
    width: 100%;
    height: 100vh;
    display: grid;
`

export const ListOrderArrow = styled.span`
    cursor: pointer;
`

export const ListOrderDragAndDrop = styled.span`
    cursor: n-resize;
`

export const ListInputText = styled.input``

export const ListAddButton = styled.button``

export const List = styled.ul`
    width: 50%;
    margin: 0 auto;
    border: 1px solid #000;
`

export const ItemList = styled.li`
    display:flex;
`

export const ListCheck = styled.input`
    flex:1
`

export const ListTitle = styled.span`
    flex:1;
    color:${props => props.color};
`

export const ListActions = styled.div`
    display: flex;
    flex:1
`

export const ListActionButton = styled.button`

`