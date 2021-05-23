export const state = () => ({
  clusterList: [ ],
  requestList: [],
  userList: [],
  roomList: [],
  // - Minamom
  userId: 'minamom',
})

export const getters = {
  getRequestListByCluster: ({ requestList, userList }) => (clusterId) => {
    return requestList
      .filter(request => request.clusterId == clusterId)
      .map(filteredRequest => {
        const user = userList.filter(({ userId }) => userId === filteredRequest.groupLeaderId);
        return {
          ...filteredRequest,
          groupLeaderId: user.length > 0
            ? user[0].userId
            : '',
        }
      })
  },
  groupRoomByRequest: ({ roomList }) => {
    const groupedByRequest = {} 
    roomList.forEach(room => {
      if (room.requestId in groupedByRequest) {
        groupedByRequest[room.requestId].push(room)
      } else {
        groupedByRequest[room.requestId] = [ room ]
      }
    })

    console.log('group', groupedByRequest)
    return groupedByRequest
  }
}

export const mutations = {
  setClusterList(state, payload) {
    state.clusterList = payload;
  },
  setRequestList(state, payload) {
    state.requestList = payload;
  },
  setUserList(state, payload) {
    state.userList = payload;
  },
  setRoomList(state, payload) {
    state.roomList = payload;
  },
  addNewRequest (state, payload) {
    state.requestList.splice(0, 0, payload)
  },
  addNewCluster (state, payload) {
    state.clusterList.splice(0, 0, payload)
  },
  addNewMessage (state, payload) {
    state.roomList = [
      ...state.roomList,
      payload
    ]
  }
}

export const actions = {
  fetchUserList(context) {
    return new Promise((res, rej) => {
      const userRef = this.$fire.database.ref('User/')
      userRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        context.commit('setUserList', data);
        res();
        })
    })
  },
  fetchClusterList(context) {
    return new Promise((res, rej) => {
      const userRef = this.$fire.database.ref('Cluster/')
      userRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        context.commit('setClusterList', data);
        res();
      })
    })
  },
  fetchRequestList(context) {
    return new Promise((res, rej) => {
      const userRef = this.$fire.database.ref('Request/')
      userRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        context.commit('setRequestList', data);
        res();
      })
    })
  },
  fetchRoomList(context) {
    return new Promise((res, rej) => {
      const userRef = this.$fire.database.ref('RequestGroupRoom/')
      userRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        context.commit('setRoomList', data);
        res();
      })
    })
  }
}