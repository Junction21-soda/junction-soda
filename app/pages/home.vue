<template>
  <div class="home">
    <div class="home__top">
      <span v-if="defaultCluster !== null">
        {{ defaultCluster.clusterName }}
      </span>
      <span @click="toggleClusterPanel()">
        <v-icon>
          mdi-chevron-down
        </v-icon>
      </span>
      <div
        v-if="isClusterPanelOpen"
        class="home__top__dropdown"
      >
        <div
          v-for="(cluster, index) in clusterList"
          :key="index"
          class="home__top__dropdown__item"  
        >
          {{ cluster.clusterName }}
        </div>
        <div
          class="home__top__dropdown__item home__top__dropdown__item--last"
        >
          <span>추가</span>
          <v-icon>
            mdi-plus
          </v-icon>
        </div>
      </div>
    </div>
    <div class="home__list">
      <div
        v-for="(request, index) in requestList"
        :key="index"
        class="home__list__item"
        @click="onClickGroup(request)"
      >
        <div class="home__list__item__header">
          <div
            v-if="request.requestType == 0"
            class="home__list__item__header__chip home__list__item__header__chip--blue"
          >
            <span>Seeking For Passengers</span>
          </div>
          <div
            v-else
            class="home__list__item__header__chip home__list__item__header__chip--green"
          >
            <span>Seeking a Driver</span>
          </div>
          <div v-if="request.requestType == 0" class="home__list__item__header__state">
            <img src="@/assets/icons/person.svg" alt="person">
            <span class="home__list__item__header__state__label">
              <span>
                {{ request.curGroupMember }}
                 <span :style="{ color: '#A2A2A2' }">{{ `/ ${request.maxGroupMember}`}}</span>
              </span>
            </span>
          </div>
        </div>
        <div class="home__list__item__content">
          {{ request.groupName }}
        </div>
        <div class="home__list__item__bottom">
          <v-avatar
            size="20"
            color="teal"
          >
            <img
              :src="require(`@/assets/${request.groupLeaderId}.jpeg`)"
              alt="avatar"
            >
          </v-avatar>
          <span>{{ getUsernameById(request.groupLeaderId) }}</span>
          <img src="@/assets/icons/certified-badge.svg" alt="badge">
        </div>
      </div>
    </div>
    <!-- Bottom Sheet -->
    <v-bottom-sheet
      v-model="isBottomSheetOpen"
      hide-overlay
      width="400px"
    >
      <v-sheet
        class="home__bottomsheet"
      >
        <div class="home__bottomsheet__header">
          <span>Add an event</span>
          <v-icon @click="toggleBottomSheet()">mdi-close</v-icon>
        </div>
        <div class="home__bottomsheet__content">
          <div
            class="home__bottomsheet__content__item"
            :class="{ 'home__bottomsheet__content__item--selected': selectedRequestType == 0 }"
            @click="onSelectType(0)"
          >
            <v-icon
              :color="selectedRequestType == 0 ? 'primary' : ''"
            >
              mdi-check-circle
            </v-icon>
            <div class="home__bottomsheet__content__item__desc">
              <p>
                I am a rider
              </p>
              <p>
                Seek for anyone who needs a ride
              </p>
            </div>
            <div class="home__bottomsheet__content__item__coupon">
              <img src="@/assets/icons/coupon.svg" alt="coupon">
              <span>+1</span>
            </div>
          </div>
          <div
            class="home__bottomsheet__content__item"
            :class="{ 'home__bottomsheet__content__item--selected': selectedRequestType == 1 }"
            @click="onSelectType(1)"
          >
            <v-icon
              :color="selectedRequestType == 1 ? 'primary' : ''"
            >
              mdi-check-circle
            </v-icon>
            <div class="home__bottomsheet__content__item__desc">
              <p>
                I need a rider
              </p>
              <p>
                Find someone who can pick you up to share a ride
              </p>
            </div>
            <div class="home__bottomsheet__content__item__coupon">
              <img src="@/assets/icons/coupon.svg" alt="coupon">
              <span>-1</span>
            </div>
          </div>
        </div>
        <div class="home__bottomsheet__bottom">
          <v-btn
            block
            depressed
            :color="selectedRequestType != null ? 'primary' : ''"
            :disabled="selectedRequestType == null"
            @click="toggleEventDialog()"
          >
            Proceed
          </v-btn>
        </div>
      </v-sheet>
    </v-bottom-sheet>

    <!-- Right Modal For Group Detail -->
    <v-dialog
      v-model="detailDialog"
      max-width="400px"
      height="100vh"
      hide-overlay
      :fullscreen="$vuetify.breakpoint.xsOnly"
      transition="slide"
    >
      <div class="detailDialog">
        <div class="detailDialog__header">
          <v-icon @click="closeDetailDialog()">
            mdi-arrow-left
          </v-icon>
        </div>
        <div class="home__list__item">
          <div class="home__list__item__header">
            <div
              v-if="selectedRequest.requestType == 0"
              class="home__list__item__header__chip home__list__item__header__chip--blue"
            >
              <span>Seeking For Passengers</span>
            </div>
            <div
              v-else
              class="home__list__item__header__chip home__list__item__header__chip--green"
            >
              <span>Seeking a Driver</span>
            </div>
            <div v-if="selectedRequest.requestType == 0" class="home__list__item__header__state">
              <img src="@/assets/icons/person.svg" alt="person">
              <span class="home__list__item__header__state__label">
                {{ selectedRequest.curGroupMember }}
                <span :style="{ color: '#A2A2A2' }">{{ `/ ${selectedRequest.maxGroupMember}`}}</span>
              </span>
            </div>
          </div>
          <div class="home__list__item__content">
            {{ selectedRequest.groupName }}
          </div>
          <div class="home__list__item__bottom">
            <v-avatar
              size="20"
              color="teal"
            >
              <img
                :src="require(`@/assets/${selectedRequest.groupLeaderId == '' ? 'person-image' : selectedRequest.groupLeaderId}.jpeg`)"
                alt="John"
              >
            </v-avatar>
            <span>{{ getUsernameById(selectedRequest.groupLeaderId) }}</span>
            <img src="@/assets/icons/certified-badge.svg" alt="badge">
          </div>
        </div>
        <div class="detailDialog__desc">
          <p>
            {{ selectedRequest.groupDescription }}
          </p>
        </div>
        <div class="detailDialog__block">
          <p>Date</p>
          <p>
            {{ selectedRequest.date != undefined ? selectedRequest.date : "It's Flexible" }}
          </p>
        </div>
        <div class="detailDialog__block">
          <p>Time</p>
          <p>
            {{ selectedRequest.time != undefined ? selectedRequest.time : "AM 8:30" }}
          </p>
        </div>
        <div class="detailDialog__location">
          <p>Location</p>
          <div class="detailDialog__location__stepper">
            <div class="detailDialog__location__stepper__left">
              <div class="circle circle--blue" />
              <div class="vertical-line" />
              <div class="circle circle--green" />
            </div>
            <div class="detailDialog__location__stepper__right">
              <div class="detailDialog__location__stepper__right__item">
                {{ selectedRequest.startLocation != undefined ? selectedRequest.startLocation : "Main gate of Gunyoung castvill" }}
              </div>
              <div class="detailDialog__location__stepper__right__item">
                {{ selectedRequest.destLocation != undefined ? selectedRequest.destLocation : "Aruem School" }}
              </div>
            </div>
          </div>
        </div>
        <div class="detailDialog__btnContainer">
          <v-btn
            block
            depressed
            x-large
            color="#055AFF"
            class="detailDialog__btnContainer__btn"
            @click="navToChat(selectedRequest.requestId)"
          >
            Go to Chat
          </v-btn>
        </div>
      </div>
    </v-dialog>

    <!-- Right Modal For New Event -->
    <v-dialog
      v-model="eventDialog"
      max-width="400px"
      height="100vh"
      hide-overlay
      :fullscreen="$vuetify.breakpoint.xsOnly"
      transition="slide"
    >
      <div class="eventDialog">
        <div class="eventDialog__header">
          <v-icon @click="toggleEventDialog()">
            mdi-arrow-left
          </v-icon>
          <span class="eventDialog__header__title">
            I am a rider
          </span>
          <span class="eventDialog__header__btn">
            SUBMIT
          </span>
        </div>
        <div class="eventDialog__content">
          <div class="eventDialog__block">
            <v-text-field
              label="Title"
              single-line
              outlined
            ></v-text-field>
          </div>
          <div class="eventDialog__block">
            <p>Date</p>
            <v-text-field
              label="Set a Date"
              single-line
              outlined
            ></v-text-field>
          </div>
          <div class="eventDialog__block">
            <p>Time</p>
            <v-text-field
              label="Set a Time"
              single-line
              outlined
            ></v-text-field>
          </div>
          <div class="eventDialog__block">
            <p>Maximum Occupancy</p>
            <v-text-field
              label="Maximum occupancy of your ride"
              single-line
              outlined
            ></v-text-field>
          </div>
          <div class="eventDialog__location">
            <p>Location</p>
            <div class="eventDialog__location__stepper">
              <div class="eventDialog__location__stepper__left">
                <div class="circle circle--blue" />
                <div class="vertical-line" />
                <div class="circle circle--green" />
              </div>
              <div class="eventDialog__location__stepper__right">
                <div class="eventDialog__location__stepper__right__item">
                  <v-text-field
                    label="Departure"
                    single-line
                    outlined
                  ></v-text-field>
                </div>
                <div class="eventDialog__location__stepper__right__item">
                  <v-text-field
                    label="Destination"
                    single-line
                    outlined
                  ></v-text-field>
                </div>
              </div>
            </div>
          </div>
          <div class="eventDialog__block">
            <v-textarea
              label="Write something for your neighborhood who may join your ride."
              single-line
              outlined
              no-resize
            ></v-textarea>
          </div>
        </div>
      </div>
    </v-dialog>

    <!-- Fab Btn To Add Event -->
    <div class="add-event-btn" @click="toggleBottomSheet()">
      <v-icon color="white">
        mdi-plus
      </v-icon>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eventDialog:false,
      detailDialog: false,
      selectedRequest: {
        clusterId: "",
        curGroupMember: 0,
        groupDescription: "",
        groupLeaderId: "",
        groupName: "",
        maxGroupMember: 0,
        requestId: "",
        requestType: 0
      },
      selectedRequestType: null,
      newRequest: {
        groupDescription: "",
        groupLeaderId: "",
        groupName: "",
        maxGroupMember: 0,
        requestType: 0
      },
      isClusterPanelOpen: false,
      isBottomSheetOpen: false
    }
  },
  computed: {
    defaultCluster() {
      return this.$store.state.clusterList.length > 1
        ? this.clusterList[0]
        : {
          clusterId: null
        }
    },
    clusterList() {
      return this.$store.state.clusterList;
    },
    requestList() {
      return this.$store.getters.getRequestListByCluster(this.defaultCluster.clusterId)
    }
  },
  methods: {
    getClusterNameById(id) {
      const cluster = this.$store.state.clusterList.filter(({ clusterId }) => clusterId === id);
      return cluster.length > 0
        ? cluster[0].clusterName
        : ''
    },
    getUsernameById(id) {
      const user = this.$store.state.userList.filter(({ userId }) => userId === id);
      console.log(user);
      return user.length > 0
        ? this.$store.state.userList.filter(({ userId }) => userId === id)[0].userName
        : ''
    },
    toggleClusterPanel() {
      this.isClusterPanelOpen = !this.isClusterPanelOpen;
    },
    toggleBottomSheet() {
      this.isBottomSheetOpen = !this.isBottomSheetOpen;
    },
    onSelectType(type) {
      this.selectedRequestType = type;
    },
    onClickGroup(requestObj) {
      this.selectedRequest = requestObj;
      this.detailDialog = true;
    },
    toggleEventDialog(requestType = 0) {
      this.newRequest = {
        groupDescription: "",
        groupLeaderId: "",
        groupName: "",
        maxGroupMember: 0,
        requestType
      }
      this.eventDialog = !this.eventDialog;
    },
    closeDetailDialog() {
      this.detailDialog = false;
    },
    navToChat(requestId) {
      this.$router.push(`/chat?requestId=${requestId}`);
    }
  },
  async created() {
    await this.$store.dispatch('fetchUserList');
    await this.$store.dispatch('fetchClusterList');
    await this.$store.dispatch('fetchRequestList');
    await this.$store.dispatch('fetchRoomList');
  }
}
</script>

<style lang="scss">
.home {
  &__top {
    display: flex;
    align-items: center;
    position: relative;
    padding: 16px 16px;
    border-bottom: 1px solid #EEEEEE;
    & > span:first-child {
      font-weight: bold;
      font-size: 16px;
      line-height: 16px;
      text-align: center;
      letter-spacing: -0.2px;
    }
    &__dropdown {
      z-index: 2;
      top: 46px;
      margin-top: 4px;
      position: absolute;
      background: #FFFFFF;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
      border-radius: 8px;
      padding: 8px 0;
      &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 16px;
        &--last {
          border-top: 1px solid #EEEEEE;
        }
      }
    }
  }
  &__list {
    &__item {
      padding: 16px;
      &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__chip {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2px 4px;
          font-size: 12px;
          line-height: 16px;
          letter-spacing: -0.2px;
          color: #FFFFFF;
          border-radius: 4px;
          &--blue {
            background-color: #055AFF;
          }
          &--green {
            background-color: #27AE60;
          }
        }
        &__state {
          display: flex;
          justify-content: space-between;
          align-items: center;
          & > img {

            margin-right: 8px;
          }
        }
      }
      &__content {
        width: 340px;
        margin-top: 10px;
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: -0.2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-height: 18px;
      }
      &__bottom {
        margin-top: 8px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        & > span {
          margin-left: 4px;
          margin-right: 4px;
          color: #666666;
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          letter-spacing: -0.2px;
        }
      }
      border-bottom: 1px solid #EEEEEE;
    }
  }
  &__bottomsheet {
    border-radius: 12px 12px 0px 0px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #EEEEEE;
      padding: 16px;
      & > span {
        font-weight: bold;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: -0.2px;
      }
    }
    &__content {
      padding: 16px;
      &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 20px;
        border: 1px solid transparent;
        &--selected {
          background: rgba(5, 90, 255, 0.05);
          border: 1px solid #055AFF;
          /* box-sizing: border-box; */
          border-radius: 8px;
        }
        &__desc {
          width: 167px;
          & > p:first-child {
            font-weight: bold;
            font-size: 16px;
            line-height: 16px;
            letter-spacing: -0.2px;
          }
          & > p:last-child {
            margin-top: 8px;
            font-size: 14px;
            line-height: 16px;
            letter-spacing: -0.2px;
            color: #666666;
          }
        }
        &__coupon {
          width: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          & > img {
            width: 20px;
            height: 18px;
            margin-right: 6px;
          }
          & > span {
            font-size: 16px;
            line-height: 16px;
          }
        }
        & + & {
          margin-top: 16px;
        }
      }
    }
    &__bottom {
      padding: 16px;
    }
  }
}
.add-event-btn {
  position: absolute;
  right: 16px;
  bottom: 106px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color:#055AFF;
  display: flex;
  justify-content: center;
  align-content: center;
}
.detailDialog {
  position: relative;
  height: 100vh;
  overflow-y: scroll;
  background: #FFFFFF;
  &__header {
    padding: 16px;
    border-bottom: 1px solid #EEEEEE;
  }
  &__desc {
    padding: 24px 16px;
    border-bottom: 1px solid #EEEEEE;
    & > p {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.2px;
    }
  }
  &__block {
    padding: 24px 16px;
    border-bottom: 1px solid #EEEEEE;
    & > p:first-child {
      font-weight: bold;
      font-size: 16px;
      line-height: 16px;
      letter-spacing: -0.2px;
    }
    & > p:last-child {
      font-size: 16px;
      line-height: 16px;
      letter-spacing: -0.2px;
      margin-top: 16px;
    }
  }
  &__location {
    padding: 24px 16px;
    & > p:first-child {
      font-weight: bold;
      font-size: 16px;
      line-height: 16px;
      letter-spacing: -0.2px;
      margin-bottom: 9px;
    }
    &__stepper {
      display: flex;
      align-items: center;
      &__left {
        margin-right: 16px;
        display: flex;
        align-items: center;
        flex-direction: column;
        .circle {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          &--blue {
            background-color:#055AFF
          }
          &--green {
            background-color:#27AE60
          }
        }
        .vertical-line {
          margin: 4px 0;
          width: 0;
          height: 39px;
          border-left: 1px solid #C4C4C4;
        }
      }
      &__right {
        flex: 1;
        &__item {
          border: 1px solid #EEEEEE;
          border-radius: 8px;
          padding: 13px 14px;
          & + & {
            margin-top: 16px;
          }
        }
      }
    }
  }
  &__btnContainer {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 16px;
    &__btn {
      span {
        font-weight: bold;
        font-size: 16px;
        line-height: 32px;
        text-align: center;
        color: #FFFFFF;
      }
    }
  }
}
.v-input__slot {
  margin-bottom: none !important;
}
.eventDialog {
  position: relative;
  height: 100vh;
  overflow-y: scroll;
  background: #FFFFFF;
  &__header {
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #EEEEEE;
    &__title {
      font-weight: bold;
      font-size: 16px;
      line-height: 16px;
      text-align: center;
      letter-spacing: -0.2px;
    }
    &__btn {
      font-weight: bold;
      font-size: 16px;
      line-height: 16px;
      text-align: right;
      letter-spacing: -0.2px;
      color: #666666;
    }
  }
  &__content {
    height: calc(100vh - 56px);
    overflow-y: scroll;
  }
  &__block {
    padding: 24px 16px 0 16px;
    border-bottom: 1px solid #EEEEEE;
    & > p:first-child {
      font-weight: bold;
      font-size: 16px;
      line-height: 16px;
      letter-spacing: -0.2px;
      margin-bottom: 16px;
    }
  }
  &__location {
    padding: 24px 16px;
    border-bottom: 1px solid #EEEEEE;
    & > p:first-child {
      font-weight: bold;
      font-size: 16px;
      line-height: 16px;
      letter-spacing: -0.2px;
      margin-bottom: 16px;
    }
    &__stepper {
      display: flex;
      align-items: center;
      &__left {
        margin-right: 16px;
        display: flex;
        align-items: center;
        flex-direction: column;
        .circle {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          &--blue {
            background: #EEEEEE;
          }
          &--green {
            background: #EEEEEE;
          }
        }
        .vertical-line {
          margin: 4px 0;
          width: 0;
          height: 39px;
          border-left: 1px solid #C4C4C4;
        }
      }
      &__right {
        flex: 1;
        .v-text-field__details {
          display: none !important;
        }
        &__item {
          & + & {
            margin-top: 8px;
          }
        }
      }
    }
  }
}
</style>