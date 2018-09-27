import { store } from 'react-easy-state'

// store the central data and logic of the application in a global app store
// use 'appStore' instead of 'this' in the store methods to make them passable as callbacks
const appStore = store({
  rooms: [],
  userName: localStorage.getItem('userName') || 'anonymous',
  userColor: localStorage.getItem('userColor') || '',
  setUserName(name){
    appStore.userName = name;
    localStorage.setItem('userName',appStore.userName);
  }
})

export default appStore