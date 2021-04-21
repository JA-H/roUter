const destinationReducer = (state = {},action) => {


    switch(action.type) {
      case 'ADD_DEST':
          console.log('this is action data' + action.data)
          console.log(state)
        return action.data

       default:
       return state 
    }
}


export const addDestination = (data) => {
    return {
        type: 'ADD_DEST',
        data 
    }
}

export default destinationReducer