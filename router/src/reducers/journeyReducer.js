const journeyReducer = (state =[],action) => {


    switch(action.type) {
      case 'SET_JOURNEYS': {
    
        return action.data
      }

      case 'DEL_JOURNEYS': {

        const state = []
        return state 
      }

    default:
      return state 
    }
}



export const setJourneys = (data) => {
    return {
        type: 'SET_JOURNEYS',
        data 
    }
}

export const delJourneys = () => {
  return {
    type: 'DEL_JOURNEYS'
  }
}

export default journeyReducer