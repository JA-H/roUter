const wayPointsReducer = (state = [],action) => {


    switch(action.type) {
      case 'ADD':
        return action.data

      case 'REMOVE':
            

       default:
       return state 
    }
}

export default wayPointsReducer