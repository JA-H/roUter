const originReducer = (state ={},action) => {


    switch(action.type) {
      case 'ADD_ORIGIN': {
    
        return action.data
      }

    default:
      return state 
    }
}



export const addOrigin = (data) => {
    return {
        type: 'ADD_ORIGIN',
        data 
    }
}

export default originReducer