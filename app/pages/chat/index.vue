<template>
  <div class="chat">
    <div class="chat__title">
      Chat
    </div>
    <div class="chat__list">
      <div
        v-for="(requestId, index) in Object.keys(groupedRoomsObj)"
        :key="index"
        class="chat__list__item"
        @click="openRoom(requestId)"
      >
        <div class="chat__list__item__left">
          <v-avatar size="48">
            <img :src="require(`@/assets/${getAvatarUserIdOfRoom(requestId)}.jpeg`)" alt="avatar">
          </v-avatar>
        </div>
        <div class="chat__list__item__right">
          <div>
            <span>{{ getUsernameByUserId(getAvatarUserIdOfRoom(requestId))}}</span>
            <img src="@/assets/icons/certified-badge.svg" alt="badge">
            <span>{{ getTimeOfRoom(requestId) }}</span>
          </div>
          <p>{{ getLatestMessageOfRoom(requestId) }}</p>
        </div>
      </div>
    </div>
     <!-- Right Modal For Chatroom -->
    <v-dialog
      v-model="chatroom"
      max-width="400px"
      height="100vh"
      hide-overlay
      :fullscreen="$vuetify.breakpoint.xsOnly"
      transition="slide"
    >
      <div class="chatroom">
        <div class="chatroom__header">
          <v-icon @click="closeRoom()">mdi-arrow-left</v-icon>
          <span>{{ chatObj.targetPersonName }}</span>
        </div>
        <div ref="chatroomContent" class="chatroom__content">
          <div
            v-for="(msg, index) in this.chatObj.chatList"
            :key="index"
            class="chatroom__content__message"
            :class="{ 'chatroom__content__message--reverse': msg.userId === loggedUserId }"
          >
            <div class="chatroom__content__message__left">
              <v-avatar size="32">
                <img :src="require(`@/assets/${msg.userId}.jpeg`)" alt="avatar">
              </v-avatar>
            </div>
            <div class="chatroom__content__message__right">
              <div class="chatroom__content__message__right__text">
                {{ msg.content }}
              </div>
              <div class="chatroom__content__message__right__date">
                {{ convertTimestamp(msg.createdAt) }}
              </div>
            </div>
          </div>
        </div>
        <div class="chatroom__bottom">
          <input type="text" v-model="chatMessage">
          <span>
            <v-icon @click="addNewMsg(chatObj.targetRequestId)">mdi-arrow-right-circle-outline</v-icon>
          </span>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      needScrollUpdate: false,
      chatroom: false,
      chatMessage: '',
      chatObj: {
        targetRequestId: '',
        targetPersonId: '',
        targetPersonName: '',
        chatList: []
      }
    }
  },
  computed: {
    loggedUserId() {
      return this.$store.state.userId;
    },
    userList() {
      return this.$store.state.userList;
    },
    roomList() {
      return this.$store.state.roomList;
    },
    groupedRoomsObj() {
      console.log(this.$store.getters.groupRoomByRequest)
      return this.$store.getters.groupRoomByRequest;
    }
  },
  methods: {
    getAvatarUserOfRoom(requestId) {
      const chats = this.groupedRoomsObj[requestId].filter(data => data.userId !== this.$store.state.userId);
      return chats[chats.length - 1]
    },
    getAvatarUserIdOfRoom(requestId) {
      const { userId } = this.getAvatarUserOfRoom(requestId)
      return userId
    },
    getTimeOfRoom(requestId) {
      const { createdAt } = this.getAvatarUserOfRoom(requestId)
      return this.convertTimestamp(createdAt)
    },
    getLatestMessageOfRoom(requestId) {
      const { content } = this.getAvatarUserOfRoom(requestId)
      return content
    },
    getUsernameByUserId(userId) {
      if (this.userList.length > 0) {
        return this.userList.filter(user => user.userId === userId)[0].userName
      } else {
        return ''
      }
    },
    convertTimestamp(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    },
    openRoom(requestId) {
      this.chatObj.targetRequestId = requestId;
      this.chatObj.targetPersonId = this.getAvatarUserOfRoom(requestId).userId;
      this.chatObj.targetPersonName = this.userList.filter(user => user.userId === this.chatObj.targetPersonId)[0].userName;
      this.chatObj.chatList = this.groupedRoomsObj[requestId];

      this.chatroom = true;
    },
    closeRoom() {
      this.chatroom = false;
    },
    addNewMsg(requestId) {
      const newMessageObj = {
        content: this.chatMessage,
        createdAt: Date.now(),
        requestId,
        userId: this.loggedUserId
      }
      this.$store.commit('addNewMessage', newMessageObj)
      this.chatObj.chatList = [
        ...this.chatObj.chatList,
        newMessageObj
      ]
      this.chatMessage = '';
      this.needScrollUpdate = true;
    },
    scrollChatToBottom() {
      const items = this.$refs.chatroomContent.querySelectorAll('.chatroom__content__message');
      const lastItem = items[items.length - 1];
      lastItem.scrollIntoView();
    }
  },
  updated () {
    if (this.needScrollUpdate) {
      this.scrollChatToBottom();
      this.needScrollUpdate = false;
    }
  },
  async created() {
    if (this.userList.length == 0 || this.roomList.length == 0) {
      await this.$store.dispatch('fetchRoomList');
      await this.$store.dispatch('fetchUserList');
    }

    if ('requestId' in this.$route.query) {
      this.openRoom(this.$route.query.requestId)
    }
  }
}
</script>

<style lang="scss">
.chat {
  &__title {
    padding: 16px;
    font-weight: bold;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: -0.2px;
    border-bottom: 1px solid #EEEEEE
  }
  &__list {
    &__item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 16px;
      &__left {
        margin-right: 8px;
      }
      &__right {
        & > div {
          display: flex;
          align-items: center;
        }
        & > p {
          max-width: 280px;
          overflow-x: hidden;
          text-overflow: ellipsis;
          white-space:nowrap;
        }
        & > div > span:first-child {
          font-weight: bold;
          font-size: 16px;
          line-height: 16px;
          letter-spacing: -0.2px;
        }
        & > div > img {
          width: 16px;
          height: 16px;
          margin-left: 2px;
          margin-right: 8px;
        }
      }
      &:last-child {
        border-bottom: 1px solid #EEEEEE;
      }
    }
  }
}
.chatroom {
  background: #FFFFFF;
  &__header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 56px;
    padding: 16px;
    border-bottom: 1px solid #EEEEEE;
    & > span {
      font-weight: bold;
      font-size: 16px;
      line-height: 16px;
      letter-spacing: -0.2px;
      margin-left: 4px;
    }
  }
  &__bottom {
    padding: 8px 18px;
    height: 48px;
    background: rgba(249, 249, 249, 0.94);
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > input {
      flex: 1;
      padding: 6px 15px;
      background: #FFFFFF;
      border: 1px solid #EEEEEE;
      box-sizing: border-box;
      border-radius: 99px;
      font-size: 12px;
      &:focus {
        outline: none;
      }
    }
    & > span {
      margin-left: 18px;
    }
  }
  &__content {
    padding: 16px;
    height: calc(100vh - 104px);
    overflow-y: scroll;
    &__message {
      display: flex;
      max-width: 217px;
      &__left {
        display: flex;
        align-items: flex-end;
        margin-right: 8px;
      }
      &__right {
        &__text {
          border: 1px solid #EEEEEE;
          border-radius: 16px 16px 16px 0px;
          padding: 5px 7px;
          font-size: 16px;
          line-height: 24px;
          letter-spacing: -0.2px;
        }
        &__date {
          font-size: 12px;
          line-height: 12px;
          mix-blend-mode: normal;
          opacity: 0.5;
          margin-top: 6px;
        }
      }
      &--reverse {
        max-width: 100%;
        flex-direction: row-reverse;
        .chatroom__content__message__left {
          margin-right: 0;
          margin-left: 8px;
        }
        .chatroom__content__message__right__text {
          background: #EEEEEE;
          border-radius: 16px 16px 0px 16px;
          max-width: 175px;
        }
        .chatroom__content__message__right__date {
          text-align: right;
        }
      }
      & + & {
        margin-top: 6px;
      }
    }
  }
}
</style>