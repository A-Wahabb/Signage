import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import transScreen from '../assets/signage-trans.png';
import emptyScreen from '../assets/signage-empty.png';
import { BASE_SERVER, LOCAL_SERVER, PrimaryColor } from '../constants/Config';
import { Loading, Error, ZoomoutPreview } from './commonDumbs';
import ReactTooltip from "react-tooltip";
import Charts from './graph/bar-chart/charts.js';
import Legend from './graph/bar-chart/legend.js';
import ComplexDonut from './graph/donut/donut.js';
import ModalLocal from './modal-local';
import NewPlayerPg from './new-player/NewPlayerPg.js';
import Search from './search/SearchContainer.js';
import ContentSelectionContainer from './content-selection/ContentSelectionContainer.js';
import WebPageContainer from './webpage-content/WebPageContainer.js';
import PlaylistPg from '../pages/PlaylistPg.js';
import TemplatePg from '../pages/TemplatePg.js';
import SchedulesPg from '../pages/SchedulesPg.js';
import TemplateEditPg from './../pages/TemplateEditPg';
import PlayerDetailsPg from './player-details/PlayerDetailsPg.js';
import PlayerListTableView from './player-list-table/PlayerListTableView.js';
import ScreenPlaylistItems from './screen-playlist-items/ScreenPlaylistItemsContainer.js';
import PlaylistEditorPopup from './playlist-editor/PlaylistEditorPopup.js';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import Dropdown, {
  DropdownToggle,
  DropdownMenu,
  DropdownMenuWrapper,
  MenuItem,
  DropdownButton
} from '@trendmicro/react-dropdown';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


class UserHome extends Component {

  constructor() {
    super();

    this.state = {
      modalOpen: false,
      isNewPlayer: false,
      selectScreenStatus: 'Screens Recent',
      showDetailSlide: false,
      isScreenPlaylistStatus: false,
      isPlaylistSelection: false,
      isPlaylistEditor: false,
      editPlayListDetails: null,
      isContentSelection: false,
      isConfirmPublish: false,
      isEditTemplateView: false,
      selectedContentType: "",
      searchText: "",
      recentChangeCat: 'Recent Content',
      data: [[0, 0, 0, 0]],
      screensChartLbl: ['Total', 'Online', 'Offline', 'Inactive'],
      historyLbl: [],
      colors: ['#099b90', '#4c5050', '#56e4d7', '#cccccc'],
      verColors: ['#56e4d7', '#56e4d7', '#56e4d7', '#56e4d7', '#56e4d7', '#56e4d7', '#56e4d7', '#56e4d7', '#56e4d7', '#56e4d7'],
      vardata: [[-1, -1, -1, -1, -1, -1, -1, -1]]
    }
    this.previewApp = null;
    this.previewPlayer = null;
    this.selectApp = null;
    this.isInformed = false;
    this.selectedAppId = null;
    this.selectedPlayer = null;
    this.selectedPlayers = null;
    this.selectedPlayerId = null;
    this.selectedPlayerApp = null;
    this.closeModalPopup = this.closeModalPopup.bind(this);
    this.toggleSlide = this.toggleSlide.bind(this);
    this.toggleContentSelection = this.toggleContentSelection.bind(this);
    this.toggleNewPlayer = this.toggleNewPlayer.bind(this);
    this.setSelection = this.setSelection.bind(this);
    this.setPreviewPlayer = this.setPreviewPlayer.bind(this);
    this.setContentType = this.setContentType.bind(this);
    this.setEditTemplate = this.setEditTemplate.bind(this);
    this.togglePreview = this.togglePreview.bind(this);
    this.populateScreenStatusArray = this.populateScreenStatusArray.bind(this);
    this.populateScreensHistory = this.populateScreensHistory.bind(this);
    this.renderSummaryBoard = this.renderSummaryBoard.bind(this);
    this.showItemsDetail = this.showItemsDetail.bind(this);
    this.checkIfScreenPlaylistItems = this.checkIfScreenPlaylistItems.bind(this);
    this.getPlaylistDetails = this.getPlaylistDetails.bind(this);
    this.checkPlaylistEditDetails = this.checkPlaylistEditDetails.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.playGuideVideo = this.playGuideVideo.bind(this);
    this.publishNow = this.publishNow.bind(this);
  }

  componentWillMount() {

    if (window.sessionStorage.getItem('isNewPlayer') == "true") {
      window.sessionStorage.setItem('isNewPlayer', false);
    }
    this.populateScreenStatusArray();
    this.populateScreensHistory();
    console.log('--HOME--', this.props);

  }
  componentDidMount() {

    if (this.props.user && this.props.user.config && this.props.user.config.settings) {
      this.setTheme();
    }

  }

  componentDidUpdate(prevProps, prevState) {
    try {
      if (prevProps.posts.playersList.players.length !== this.props.posts.playersList.players.length) {
        this.populateScreenStatusArray();
      }
    } catch (err) {
      console.error('- user home did update---', err);
    }
    if (prevProps.posts.onlineStatus.logs.length !== this.props.posts.onlineStatus.logs.length) {
      this.populateScreensHistory();
    }

    this.checkPlaylistEditDetails(prevProps);
    this.checkIfScreenPlaylistItems(prevProps);


    if (this.state.isConfirmPublish &&
      (JSON.stringify(prevProps.playlists.newPlaylist.details) !==
        JSON.stringify(this.props.playlists.newPlaylist.details))) {
      this.confirmPublish();
    }


    if (this.props.user &&
      this.props.user.config &&
      this.props.user.config.settings &&
      ((JSON.stringify(this.props.user.config.settings) !== JSON.stringify(prevProps.user.config.settings)) ||
        this.props.user.config.settings.color_primary !== this.state.colors[0])
    ) {
      this.setTheme();
    }

  }

  componentWillUnmount() {
    if (window.frameInterval) {
      clearInterval(window.frameInterval);
    }
  }
  publishNow(app) {
    app.contentType = 'TEMPLATE';
    this.props.toggleRootModal("PUBLISH", app);
    this.props.rootModal('', '', false);

  }
  setTheme() {
    let sets = this.props.user.config.settings;
    let theme_colors = [sets.color_primary, sets.color_secondary, sets.color_tirnary, '#cccccc'];
    let verColors = new Array(11);
    verColors = verColors.join(sets.color_secondary + ',').split(',');
    this.setState({
      colors: theme_colors,
      verColors: verColors
    });
  }

  isSearchPlayer(player) {

    if (player.playerName.toLowerCase().indexOf(this.state.searchText.toLowerCase()) != -1 || player.screenNumber.toString().indexOf(this.state.searchText) != -1) {
      //console.log()
      return true;
    } else {
      return false;
    }

  }
  isSearchTemplate(template) {

    if (template.appName.toLowerCase().indexOf(this.state.searchText.toLowerCase()) != -1 || template.domain.toString().indexOf(this.state.searchText) != -1) {
      //console.log()
      return true;
    } else {
      return false;
    }

  }

  closeModalPopup() {
    if (this.state.isScreenPlaylistStatus || this.state.isPlaylistEditor) {
      this.props.resetPlaylist();
    }
    this.setState({
      modalOpen: false,
      isNewPlayer: false,
      isScreenPlaylistStatus: false,
      isPlaylistEditor: false,
      isContentSelection: false,
      selectedContentType: "",
      isEditTemplateView: false
    });
    this.selectApp = "";
    this.selectedAppId = null;
    this.previewApp = null;
    this.previewPlayer = null;

  }

  toggleContentSelection(player) {
    if (player) {
      this.selectedPlayer = player;
    }
    this.setState({
      isContentSelection: !this.state.isContentSelection
    });
  }

  togglePreview(evt) {
    evt && evt.stopPropagation();

    this.setState({
      modalOpen: !this.state.modalOpen
    });
    if (window.frameInterval) {
      clearInterval(window.frameInterval);
    }
    let _self = this;
    ZoomoutPreview(_self);
  }

  toggleNewPlayer() {
    this.setState({
      isNewPlayer: !this.state.isNewPlayer
    });
  }

  togglePlaylistSelection() {
    this.setState({
      isPlaylistSelection: !this.state.isPlaylistSelection
    });
  }

  showItemsDetail() {
    //console.log('Selected showitems', this.selectedPlayerApp);
    this.props.fetchPlaylist(this.selectedPlayerApp._id);

    if (this.props.playlists.playList.items.length > 0) {
      let itemsArr = this.props.playlists.playList.items.map(item => item._id);
      this.props.fetchPlayerItemsStatus(this.selectedPlayerId, itemsArr);
    }
    this.setState({
      isScreenPlaylistStatus: true,
      modalOpen: true
    });
  }

  checkIfScreenPlaylistItems(prevProps) {
    try {
      if (this.state.isScreenPlaylistStatus &&
        prevProps.playlists.playList.items.length !== this.props.playlists.playList.items.length) {
        //console.log('launching screen items details');
        let itemsArr = this.props.playlists.playList.items.map(item => item._id);
        this.props.fetchPlayerItemsStatus(this.selectedPlayerId, itemsArr);

      }
      //console.log('final items',this.props.playerItemsStatus.items);
      // if(this.state.isScreenPlaylistStatus && 
      //   prevProps.playlists.playList.items.length !== this.props.playlists.playList.items.length &&
      //   !this.state.modalOpen )
      //   {
      //     this.setState({

      //     });
      //   }
    }
    catch (e) {
      console.log('error playlist', e);
    }
  }

  informNewScreen = () => {

    confirmAlert({
      title: 'Tip!',
      message: "As you new to system, let's start with adding new screen?",               // Message dialog
      childrenElement: () => <div></div>,
      confirmLabel: "OK, LET's START",
      cancelLabel: "LATER",
      onConfirm: () => { this.isInformed = true; this.togglePreview(); this.toggleNewPlayer() },
      onCancel: () => { this.isInformed = true; },
    })
  }


  confirmPublish = () => {
    let content = Object.assign({}, this.props.playlists.newPlaylist.details);
    confirmAlert({
      title: 'Ready To Publish?',
      message: 'Do you want to continue editing or Ready to publish into screens?',
      childrenElement: () => <div></div>,
      confirmLabel: 'PUBLISH',
      cancelLabel: "EDIT MORE",
      onConfirm: () => {
        this.setState({ isConfirmPublish: false });
        this.closeModalPopup();
        this.props.toggleRootModal("PUBLISH", content);
        this.selectApp = null;
        this.selectedPlayers = null;
      },
      onCancel: () => { this.setState({ isConfirmPublish: false }); this.props.resetNewPlaylist() },
    });
  }

  renderPreviewWindow() {
    if (this.state.modalOpen && this.previewPlayer) {
      return LaunchPreview();
    }
  }

  getPlaylistDetails() {
    this.setState({
      editPlayListDetails: this.selectedPlayerApp,
      isPlaylistEditor: true
    });
    this.props.fetchPlaylist(this.selectedPlayerApp._id);
  }

  onSearchChange(e) {
    this.setState({
      searchText: e.target.value
    });
  }

  checkPlaylistEditDetails(prevProps) {
    if (this.state.isPlaylistEditor &&
      !this.state.modalOpen &&
      JSON.stringify(prevProps.playlists.playList.items) !== JSON.stringify(this.props.playlists.playList.items)) {
      let editPlayListDetails = Object.assign({}, this.state.editPlayListDetails);
      editPlayListDetails.items = this.props.playlists.playList.items;
      this.setState({
        editPlayListDetails: editPlayListDetails,
        modalOpen: true
      });

    }
  }
  savePlaylist(playListObj) {
    if (playListObj._id) {
      this.props.updatePlaylist(playListObj);
    } else {
      this.props.saveNewPlaylist(playListObj);
    }
    this.setState({
      isConfirmPublish: true
    });
  }

  publishToSelected() {
    console.log('--sendign publish--', this.selectApp);
    this.props.toggleRootModal("PUBLISH", this.selectApp);
    this.selectApp = null;
    this.selectedPlayers = null;
  }

  manageChecks(e, playerId) {
    e.preventDefault();
    if (e.target.tagName.toLowerCase() == 'span') {
      e.target.className = e.target.className == 'uncheck-box' ? 'checked-box' : 'uncheck-box';
      this.selectedPlayers.indexOf(playerId) != -1 ? this.selectedPlayers.splice(1, this.selectedPlayers.indexOf(playerId)) : this.selectedPlayers.push(playerId);
    }
    return true;
  }

  getModalContent() {
    if (this.previewApp) {
      let previewPath = BASE_SERVER + '/drft/' + this.previewApp.appLocation + '/index.html';
      let app = this.previewApp;
      if (app.orientation.toLowerCase() == 'landscape') {
        return (
          <iframe id='preview-frame' width='960px' height='540px' className="preview-content" src={previewPath} ></iframe>
        );
      } else {
        return (
          <iframe id='preview-frame' width='347px' height='540px' className="preview-content" src={previewPath} ></iframe>
        );
      }
    }
    else if (this.previewPlayer) {
      let playerApp = this.props.appsList.apps.filter(app => app._id == this.previewPlayer.appId)[0];
      let previewPath = BASE_SERVER + '/drft/' + playerApp.appLocation + '/index.html';
      return (
        <iframe id='preview-frame' width='960px' height='540px' className="preview-content" src={previewPath} ></iframe>
      );
    }
    else if (this.selectApp) {
      let players = this.props.posts.playersList.players.filter(player => player.appId !== this.selectApp._id);
      this.selectedPlayers = [];
      this.selectedPlayers = players.filter(player => { if (player.appId == this.selectApp._id) { return player._id; } });
      this.selectedPlayers = this.selectedPlayers.map(player => player._id);
      let contentType = this.selectApp.domain ? 'TEMPLATE' : 'PLAYLIST';
      return (
        <ul className='small-select-list'><h3>{'Select screens to assign template- [' + this.selectApp.appName + ']'}</h3>
          {players.map(player => <li onClick={(e) => this.manageChecks(e, player._id)}><span className={this.selectedPlayers.indexOf(player._id) != -1 ? 'checked-box' : 'uncheck-box'}></span><h4>{player.playerName}</h4></li>)}
          <li style={{ paddingLeft: '30%' }}><button disabled={players.length == 0 ? true : false} className="btn btn-primary " onClick={() => this.publishToSelected(contentType)} >
            PUBLISH ON SELECTED
          </button></li>
        </ul>
      )

    }
    else if (this.state.isNewPlayer) {
      return (<div><NewPlayerPg
        newPlayer={this.props.posts.newPlayer}
        toggleContentSelection={this.toggleContentSelection}
        closeModalPopup={this.closeModalPopup}
        toggleNewPlayer={this.toggleNewPlayer}
        themeColor={this.props.user.config.settings.color_primary}

      />

      </div>);

    } else if (this.state.isContentSelection) {

      return (<div><ContentSelectionContainer
        closeModalPopup={this.closeModalPopup}
        setContentType={this.setContentType}
        selectedPlayer={this.selectedPlayer}
        toggleContentSelection={this.toggleContentSelection}
        themeColor={this.state.colors.length > 0 ? this.state.colors[0] : "#000"}
      />

      </div>);

    }
    else if (this.state.selectedContentType == 'PLAYLIST') {
      return (<div><PlaylistPg
        playlists={this.props.playlists}
        user={this.props.user}
        common={this.props.common}
        publishToSreens={this.props.publishToSreens}
        playersList={this.props.posts.playersList}
        toggleRootModal={this.props.toggleRootModal}
        closeModalPopup={this.closeModalPopup}
        selectedPlayer={this.selectedPlayer}
      />

      </div>);

    }
    else if (this.state.selectedContentType == 'SCHEDULE') {
      return (<div><SchedulesPg
        schedules={this.props.schedules}
        playlists={this.props.playlists}
        user={this.props.user}
        common={this.props.common}
        publishToSreens={this.props.publishToSreens}
        playersList={this.props.posts.playersList}
        toggleRootModal={this.props.toggleRootModal}
        closeModalPopup={this.closeModalPopup}
        selectedPlayer={this.selectedPlayer}
        appsList={this.props.appsList}
      />

      </div>);

    }
    else if (this.state.selectedContentType == 'WEBPAGE') {
      return (<div><WebPageContainer
        publishToSreens={this.props.publishToSreens}
        closeModalPopup={this.closeModalPopup}
        selectedPlayer={this.selectedPlayer}
        themeColor={this.state.colors.length > 0 ? this.state.colors[0] : "#000"}
      />

      </div>);

    } else if (this.state.selectedContentType == 'TEMPLATE') {
      return (<div style={{ height: '100%' }}><TemplatePg
        publishToSreens={this.props.publishToSreens}
        closeModalPopup={this.closeModalPopup}
        selectedPlayer={this.selectedPlayer}
        user={this.props.user}
        common={this.props.common}
        playersList={this.props.posts.playersList}
        appsList={this.props.appsList}

      />

      </div>);

    }
    else if (this.state.isScreenPlaylistStatus) {
      console.log('launching details', this.props.playlists);
      return (
        <div>
          <ScreenPlaylistItems
            closeModalPopup={this.closeModalPopup}
            common={this.props.common}
            user={this.props.user}
            playList={this.props.playlists.allPlaylist.lists.filter((playlist) => playlist._id == this.selectedPlayerApp._id)}
            playListItems={this.props.playlists.playList.items}
            screenPlaylistItems={this.props.playerItemsStatus}
            playerDetails={this.props.posts.playersList.players.filter(player => player._id == this.selectedPlayerId)}

          />

        </div>);

    } else if (this.state.isPlaylistEditor) {

      return (<div><PlaylistEditorPopup
        closeModalPopup={this.togglePlaylistEditor}
        common={this.props.common}
        user={this.props.user}
        savePlaylist={this.savePlaylist}
        removePlaylistItems={this.props.removePlaylistItems}
        playListDetail={this.state.editPlayListDetails}
      /></div>);

    }
    else if (this.state.isEditTemplateView) {
      return (<TemplateEditPg
        user={this.props.user}
        common={this.props.common}
        closeModalPopup={this.closeModalPopup}
        playersList={this.props.posts.playersList}
        selectedAppId={this.selectedAppId}
      />);
    }
    else {
      return ("Template Not available for preview!!");
    }

  }

  populateScreenStatusArray() {
    if (this.props.posts && this.props.posts.playersList) {
      let players = JSON.parse(JSON.stringify(this.props.posts.playersList.players));
      let totalScreens = JSON.parse(JSON.stringify(players)).length;
      let onlineScreen = JSON.parse(JSON.stringify(players)).filter(player => player.powerStatus.toLowerCase() == 'online').length;
      let offlineScreen = JSON.parse(JSON.stringify(players)).filter(player => player.powerStatus.toLowerCase() == 'offline').length;
      let inactiveScreen = JSON.parse(JSON.stringify(players)).filter(player => player.powerStatus.toLowerCase() == 'inactive').length;

      let screensWithStatus = [totalScreens, onlineScreen, offlineScreen, inactiveScreen];
      this.setState({ data: [screensWithStatus] });
    }
  }

  populateScreensHistory() {
    if (!this.props.posts || !this.props.posts.onlineStatus) return;
    let logs = this.props.posts.onlineStatus.logs;
    let screensHistory = [[], [], [], [], [], [], [], [], [], []];
    if (logs.length == 0) return false;

    for (let i = 0; i < logs.length; i++) {
      let logDt = moment(logs[i].createdAt).format('MM/DD');
      switch (logDt) {
        case moment().format('MM/DD'): {
          screensHistory[0].indexOf(logs[i].mac) == -1 && screensHistory[0].push(logs[i].mac);
          break;
        }
        case moment().subtract(1, 'days').format('MM/DD'): {
          screensHistory[1].indexOf(logs[i].mac) == -1 && screensHistory[1].push(logs[i].mac);
          break;
        }
        case moment().subtract(2, 'days').format('MM/DD'): {
          screensHistory[2].indexOf(logs[i].mac) == -1 && screensHistory[2].push(logs[i].mac);
          break;
        }
        case moment().subtract(3, 'days').format('MM/DD'): {
          screensHistory[3].indexOf(logs[i].mac) == -1 && screensHistory[3].push(logs[i].mac);
          break;
        }
        case moment().subtract(4, 'days').format('MM/DD'): {
          screensHistory[4].indexOf(logs[i].mac) == -1 && screensHistory[4].push(logs[i].mac);
          break;
        }
        case moment().subtract(5, 'days').format('MM/DD'): {
          screensHistory[5].indexOf(logs[i].mac) == -1 && screensHistory[5].push(logs[i].mac);
          break;
        }
        case moment().subtract(6, 'days').format('MM/DD'): {
          screensHistory[6].indexOf(logs[i].mac) == -1 && screensHistory[6].push(logs[i].mac);
          break;
        }
        case moment().subtract(7, 'days').format('MM/DD'): {
          screensHistory[7].indexOf(logs[i].mac) == -1 && screensHistory[7].push(logs[i].mac);
          break;
        }
        case moment().subtract(8, 'days').format('MM/DD'): {
          screensHistory[8].indexOf(logs[i].mac) == -1 && screensHistory[8].push(logs[i].mac);
          break;
        }
        case moment().subtract(9, 'days').format('MM/DD'): {
          screensHistory[9].indexOf(logs[i].mac) == -1 && screensHistory[9].push(logs[i].mac);
          break;
        }

      }
    }

    console.log(screensHistory);
    let historyFinalData = [];
    historyFinalData = screensHistory.map(screens => screens.length);
    let historyLblDt = [];
    for (let i = 0; i < 10; i++) {
      historyLblDt.push(moment().subtract(i, 'days').format('DD'));
    }
    console.log(historyLblDt);
    console.log('final history', historyFinalData);
    this.setState({
      vardata: [historyFinalData],
      historyLbl: historyLblDt
    });

  }

  setEditTemplate(appId, domain, app) {
    if (appId && domain.indexOf('customs') !== -1) {
      let activePlayer = this.props.activePlayer && this.props.activePlayer.player ? this.props.activePlayer.player : {};

      let mediaList = Object.assign([], this.props.user.mymedia.mediaList);
      mediaList = mediaList.map(media => {
        if (media.description) {
          delete media.description;
        }
        return media;
      });
      sessionStorage.removeItem('playerDetail');
      sessionStorage.removeItem('playerList');
      sessionStorage.removeItem('userInfo');
      sessionStorage.removeItem('media');
      sessionStorage.removeItem('selectedAppId');
      sessionStorage.removeItem('BASE_SERVER');
      sessionStorage.removeItem('commonFolderId');
      sessionStorage.removeItem('appLoc');
      sessionStorage.removeItem('primaryColor');
      sessionStorage.removeItem('selectedAppName');

      sessionStorage.setItem('selectedAppId', appId);
      sessionStorage.setItem('playerDetail', JSON.stringify(activePlayer));
      sessionStorage.setItem('playerList', JSON.stringify(this.props.posts.playersList.players));
      sessionStorage.setItem('userInfo', JSON.stringify(this.props.user.user));
      sessionStorage.setItem('media', JSON.stringify(mediaList));
      sessionStorage.setItem('BASE_SERVER', BASE_SERVER);
      sessionStorage.setItem('commonFolderId', this.props.user.folders.folderList[0]._id);
      sessionStorage.setItem('primaryColor', PrimaryColor);
      sessionStorage.setItem('selectedAppName', app.appName);

      if (domain.indexOf('custom-editor') == -1) {

        let slideEditor = <iframe src={BASE_SERVER + '/builder'} width='100%' height='100%' />;
        this.props.rootModal(slideEditor, 'EXTRA-LARGE', true);
      } else {
        sessionStorage.setItem('appLoc', app.appLocation);
        let designEditor = <div style={{ width: '100%', height: '100%' }}><Link
          to="#"
          style={{ position: 'fixed', paddingLeft: '2px', right: '35px', top: '3px', background: this.props.user.config.settings.color_primary }}
          className="btn btn-primary btn-single"
          onClick={() => this.publishNow(app)}>
          <span className="glyphicon glyphicon-send"></span>{' PUBLISH'}
        </Link><iframe src={BASE_SERVER + '/design-editor'} width='100%' height='100%' /></div>;
        this.props.rootModal(designEditor, 'EXTRA-LARGE', true);

      }

      return true;
    }
    else if (appId) {
      let templateContent = <TemplateEditPg
        user={this.props.user}
        common={this.props.common}
        selectedAppId={appId}
        appsList={this.props.appsList}
        rootModal={this.props.rootModal}
        toggleRootModal={this.props.toggleRootModal}
      />;
      this.props.rootModal(templateContent, 'MEDIUM', true);

    }

    return false;
  }

  playGuideVideo() {
    let guidePath = BASE_SERVER + '/preview/help/client-quick-guide.mp4';
    let demoVideo = <div><video src={guidePath} width='100%' autoPlay loop controls /></div>;
    this.props.rootModal(demoVideo, 'MEDIUM', true);
  }

  defaultImageLoad(e) {
    e.target.src = BASE_SERVER + '/preview/player_thumb/signage.jpg';
  }

  gotoTemplateList(e) {
    this.props.changeConsole('TEMPLATE_LIST', 'USER_HOME');
  }

  renderSummaryBoard(players, user, apps) {
    console.log('colors---', this.state.colors);
    // style={{ display: 'inline-block', width: '100%' }}
    return (
      <div className='row p-4'>
        <div className="col-sm-12 col-md-6 col-lg-4 summary-wdgt">
          <div className="card bg-primary">
            <h4>Screens</h4>
            <section>
              <Charts
                data={this.state.data}
                labels={this.state.screensChartLbl}
                colors={this.state.colors}
                horizontal={true}
              />

              <Legend
                key={this.state.screensChartLbl}
                labels={this.state.screensChartLbl}
                colors={this.state.colors} />
            </section>
          </div></div>

        <div className="col-sm-12 col-md-6 col-lg-4 summary-wdgt">
          <div className="card bg-warning">
            <h4>Online Screens By Date</h4>
            <section>
              <Charts data={this.state.vardata}
                labels={this.state.historyLbl}
                colors={this.state.verColors} height={90} />
              <Legend
                labels={this.state.historyLbl}
                colors={this.state.colors}
              />
            </section>
          </div>
        </div>

        <div className="col-sm-12 col-md-6 col-lg-4 summary-wdgt">
          <div className="card bg-grn ">
            <h4>Storage Usage </h4>
            <section>
              <ComplexDonut
                size={120}
                radius={40}
                segments={[
                  {
                    color: this.state.colors[2],
                    value: parseInt(this.props.mediaUploadedSize) ? parseInt(this.props.mediaUploadedSize) : 1
                  },
                  {
                    color: this.state.colors[0],
                    value: 30
                  },
                  {
                    color: this.state.colors[1],
                    value: 50
                  }
                ]}
                thickness={40}
                startAngle={-110}
              />
              <Legend
                labels={['Library', 'Contents', 'Available']}
                colors={[this.state.colors[2], this.state.colors[0], this.state.colors[1]]}
              />
            </section>
          </div>
        </div>
      </div>
    );
  }



  getTemplateItem(app) {

    let appThumbnail = (app && app.thumb) ? BASE_SERVER + app.thumb.replace('app-thumbnail', '/thumb') : BASE_SERVER + '/thumb/' + app._id + '.png';
    app.contentType = app.domain ? 'TEMPLATE' : 'PLAYLIST';
    console.log('--app--', app);
    return (
      <li className="col-xs-12 col-sm-12 col-md-6 col-lg-4 list-group-item" key={app._id}>

        <div className="thumbnail summary upside-options" >
          <img src={appThumbnail} alt="242x200" onClick={(e) => (this.setEditTemplate(app._id, app.domain, app))} />



          <div className="caption center-btn">
            <label><span className={app.status == 'DRAFT' ? 'draft-icon' : ''}></span>{app.appName}
            </label>
            <span className='menu-dots'>
              <Dropdown autoOpen={true} arrowClassName='menu-dots-inner' className={'player-drop'}>
                <Dropdown.Toggle title="" />
                <Dropdown.MenuWrapper>
                  <Dropdown.Menu>
                    {!app.isTemplate && <MenuItem onClick={() => { this.props.copyTemplate(app._id) }} >
                      <span className="glyphicon glyphicon-duplicate" data-tip="Make duplicate" ></span><span>MAKE A COPY</span>
                    </MenuItem>}

                    {!app.isTemplate && <MenuItem onClick={(evt) => { this.previewApp = app; this.selectApp = null; this.togglePreview(evt) }}>
                      <span className="glyphicon glyphicon-eye-open " data-tip="Preview" ></span><span>PREVIEW HERE</span>
                    </MenuItem>}

                    {!app.isTemplate && <MenuItem onClick={(evt) => { this.selectApp = app; this.previewApp = null; this.publishToSelected() }}>
                      <span data-tip="Publish" className="glyphicon glyphicon-ok" ></span><span>PUBLISH TO SCREENS</span>
                    </MenuItem>}

                    <MenuItem onClick={(e) => (this.setEditTemplate(app._id, app.domain))}>
                      <span className="glyphicon glyphicon-pencil" data-tip="UPDATE TEMPLATE"  ></span><span>UPDATE TEMPLATE</span>
                    </MenuItem>
                  </Dropdown.Menu>
                </Dropdown.MenuWrapper>
              </Dropdown></span>
          </div>

        </div>
      </li>
    )
  }

  renderUserRunningApps(apps) {
    var runningApps = apps && apps.filter(app => !app.isTemplate && (app.status == "RUNNING" || app.status == "DRAFT") && this.isSearchTemplate(app)).map((app) => this.getTemplateItem(app));
    return runningApps;
  }

  setContentType(evt, type) {
    this.setState({
      selectedContentType: type
    });
  }

  setSelection(playerId, playerApp) {
    console.log('selected', playerApp);
    this.selectedPlayerApp = playerApp;
    this.selectedPlayerId = playerId;
  }

  setPreviewPlayer(player) {
    this.previewPlayer = player
  }

  toggleSlide() {
    console.log('toggle slide');
    this.setState({
      showDetailSlide: !this.state.showDetailSlide
    });

  }

  selectScreenStatus(selectedStatus) {
    this.setState({
      selectScreenStatus: selectedStatus
    });
  }

  selectRecentCat(selectedCat) {
    this.setState({
      recentChangeCat: selectedCat
    });
  }


  renderScreenStatusDD() {
    return (<span className='menu-arrow glyphicon p-4'>
      <Dropdown autoOpen={true} arrowClassName='' className={'player-drop'}>
        <Dropdown.Toggle title={this.state.selectScreenStatus} />
        <Dropdown.MenuWrapper>
          <Dropdown.Menu>

            <MenuItem onClick={(e) => this.selectScreenStatus('Screens Recent')}>
              <span>Recent</span>
            </MenuItem>

            <MenuItem onClick={(e) => this.selectScreenStatus('Screens Online')}>
              <span>Online</span>
            </MenuItem>

            <MenuItem onClick={(evt) => this.selectScreenStatus('Screens Offline')}>
              <span>Offline</span>
            </MenuItem>

            <MenuItem onClick={(evt) => this.selectScreenStatus('Screens Inactive')}>
              <span>Inactive</span>
            </MenuItem>
          </Dropdown.Menu>
        </Dropdown.MenuWrapper>
      </Dropdown></span>);
  }
  getModalClass() {
    if (this.previewApp || this.previewPlayer) {
      return 'modal-local modal-preview';
    } else if (this.state.isScreenPlaylistStatus) {
      return 'modal-local modal-default modal-large col-sm-12 col-lg-8 col-md-10';
    }
    else if (this.state.isPlaylistEditor ||
      this.state.selectedContentType == 'PLAYLIST' ||
      this.state.selectedContentType == 'TEMPLATE' ||
      this.state.selectedContentType == 'SCHEDULE' ||
      this.state.isEditTemplateView) {
      return 'modal-local modal-default modal-large col-sm-12 col-lg-10 col-md-10';
    }
    else {
      return 'modal-local modal-default ';
    }
  }

  render() {

    const { players, loading, error } = this.props.posts.playersList;
    const { user } = this.props.user;
    const { apps } = this.props.appsList;
    const { schedules } = this.props.schedules;
    const { allPlaylist } = this.props.playlists;
    let userApps = apps.filter(app => !app.isTemplate);
    let recentApps = apps.filter(app => !app.isTemplate).slice(0, 4);
    let playersListDashboard = [];

    if (this.state.selectScreenStatus.toUpperCase().indexOf('RECENT') !== -1) {
      playersListDashboard = Object.assign([], players);
    } else {
      playersListDashboard = players.filter(player => this.state.selectScreenStatus.toLowerCase().indexOf(player.powerStatus.toLowerCase()) !== -1);
    }
    if (this.state.searchText) {
      playersListDashboard = players.filter(player => this.isSearchPlayer(player));
    }
    if (playersListDashboard.length > 40) {
      playersListDashboard = playersListDashboard.slice(0, 40);
    }

    return (
      <div className='w-100'>
        {players.length > 0 && <div className="title-container">
          <h2 className="header-title">Dashboard</h2>
          <Search
            changeConsole={this.props.changeConsole}
            onSearchChange={this.onSearchChange}
          />

        </div>}

        <Loading isLoading={loading} />
        <Error error={error} />

        {players.length > 0 && <div>
          {this.renderSummaryBoard(players, user)}

          <div className={'section-holder'}>
            <h4>{this.renderScreenStatusDD()}</h4>

            <div style={{ display: 'inline-block', width: '100%', maxHeight: '400px', overflowY: 'scroll' }} className={' col-sm-12 col-md-12 col-lg-12'}>
              <PlayerListTableView
                players={playersListDashboard}
                user={user}
                userApps={apps}
                schedules={schedules}
                allPlaylist={allPlaylist}
                toggleSlide={this.toggleSlide}
                setSelection={this.setSelection}
                setPreviewPlayer={this.setPreviewPlayer}
                togglePreview={this.togglePreview}
                gotoEditApp={this.gotoEditApp}
                settings={this.props.user.config.settings}
                toggleContentSelection={this.toggleContentSelection}
              />
            </div>
          </div>

          <div className={'section-holder'}>
            <h4>{'Recent Content'}</h4>
            {<div style={{ display: 'inline-block', width: '100%' }} className={'dashboard-items-hodler'}>{this.renderUserRunningApps(recentApps)}</div>}
          </div>

        </div>}

        {(!players || players.length == 0) &&
          <div className="center-item dashboard-screen" >
            <img src={'./assets/signage-empty.png'} onError={(e) => defaultImageLoad(e)} alt="242x200" />
            <div className="caption center-item ">
              <button style={{ display: 'inline-block', marginTop: '3px', background: this.props.user.config.settings.color_primary }}
                className="btn btn-primary big-btn" onClick={() => { this.togglePreview(), this.toggleNewPlayer() }} >
                <span className="glyphicon glyphicon-plus inline-icon"></span>ADD NEW SCREEN
              </button>
            </div>

            <div>
              <label style={{ marginTop: '10px', padding: '10px', color: '#8c8b8b' }}>You look new to the system, welcome! let's start by clicking 'ADD NEW SCREEN' above or take a tour by clicking below.</label><button
                onClick={e => this.playGuideVideo()}
                style={{ marginTop: '0px', color: PrimaryColor }}
                className="btn-primary-link"
              > QUICK VIDEO GUIDE
              </button>
            </div>
          </div>

        }

        {this.state.showDetailSlide && <div onClick={(e) => this.toggleSlide()} className='full-overlay'></div>}
        <div className={this.state.showDetailSlide ? 'slide-right' : 'slide-close'}>
          {this.state.showDetailSlide &&
            <PlayerDetailsPg
              selectedPlayerId={this.selectedPlayerId}
              content={this.selectedPlayerApp}
              toggleSlide={this.toggleSlide}
              showItemsDetail={this.showItemsDetail}
              getPlaylistDetails={this.getPlaylistDetails}
              themeColor={this.props.user.config.settings.color_primary}
              latestPlayerVer={this.props.user.playerVersion}
              rootModal={this.props.rootModal}
              settings={this.props.user.config.settings}
            />
          }
        </div>

        <ModalLocal className={this.getModalClass()} isOpen={this.state.modalOpen} >
          {this.state.modalOpen ? this.getModalContent() : ''}

          <span className="glyphicon glyphicon-remove modal-remove-icon" onClick={(e) => this.closeModalPopup(e)} ></span></ModalLocal>



      </div>);
  }
}


export default UserHome;
