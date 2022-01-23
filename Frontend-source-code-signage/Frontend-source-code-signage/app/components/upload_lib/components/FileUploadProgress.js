'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  progressWrapper: {
    height: '10px',
    marginTop: '10px',
    width: '300px',
    float: 'left',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    WebkitBoxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)'
  },
  progressBar: {
    float: 'left',
    width: '0',
    height: '100%',
    fontSize: '12px',
    lineHeight: '20px',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#337ab7',
    WebkitBoxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
    boxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
    WebkitTransition: 'width .6s ease',
    Otransition: 'width .6s ease',
    transition: 'width .6s ease'
  },
  cancelButton: {
    marginTop: '5px',
    WebkitAppearance: 'none',
    padding: 0,
    cursor: 'pointer',
    background: '0 0',
    border: 0,
    float: 'left',
    fontSize: '21px',
    fontWeight: 700,
    lineHeight: 1,
    color: '#b7b6b2',
    textShadow: '0 1px 0 #fff',
    filter: 'alpha(opacity=20)',
    opacity: '.2'
  }
};

var FileUploadProgress = function (_React$Component) {
  _inherits(FileUploadProgress, _React$Component);

  function FileUploadProgress(props) {
    _classCallCheck(this, FileUploadProgress);

    var _this = _possibleConstructorReturn(this, (FileUploadProgress.__proto__ || Object.getPrototypeOf(FileUploadProgress)).call(this, props));

    _this.proxy = new _events.EventEmitter();
    _this.state = {
      progress: -1,
      hasError: false,
      isSubmitDisabled:true
    };
    return _this;
  }

function isSupportedFormat(mediaName){

    if (/\.(jpe?g|png|gif|bmp|tiff)$/i.test(mediaName)) {
      return true;
    } else if (/\.(mp4|wmo|3gp|ogg|webM|webm|WebM)$/i.test(mediaName)) {
      return true;
    }else if (/\.(mp3)$/i.test(mediaName)) {
      return true;
    } else {
      return false;
 
  }
      }
  _createClass(FileUploadProgress, [{
    key: 'cancelUpload',
    value: function cancelUpload() {
      this.proxy.emit('abort');
      this.setState({
        progress: -1,
        hasError: false
      });
    }
  },{
    key: 'onFileChanged',
    value: function onFileChanged(e) {

      //this.proxy.emit('abort');
      console.log('file uploading..',e.target.value);
      let isFile=e.target.value?true:false;
      let isFileSupported = isSupportedFormat(e.target.value);
      let hasError = false;
      if(!isFile){
        hasError= 'Please select file to upload!';
      }else if(!isFileSupported){
        hasError='Please select supported format!';
      }

      this.setState({
        progress:-2,
        isSubmitDisabled:!isFile || !isFileSupported,
        hasError: hasError
      },this.render);
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(e) {
      e.preventDefault();
      let toUploadMedia= e.target['media-upload'].value;
      console.log('upload file', toUploadMedia);
      let hasError = false;
      let hasFormatErr = false;
       if(!toUploadMedia){
        hasError= 'Please select file to upload!';
      }
       let isSupported= isSupportedFormat(toUploadMedia);
       console.log('is Supported',isSupported);
     
      if(!isSupported){
        hasFormatErr='Please select supported format!';
      }
      if(!toUploadMedia || !isSupported){

      this.setState({
        progress: 0,
        hasError: hasError || hasFormatErr
      });
          return false;
      }else{
      this.setState({
        progress: 0,
        hasError: false
      }, this._doUpload);
    }
    }
  }, {
    key: 'render',
    value: function render() {
      
      var isSubmitDisabled= this.state.isSubmitDisabled?true:false;

      var formElement = this.props.formRenderer(this.onSubmit.bind(this),this.onFileChanged.bind(this),isSubmitDisabled);
      var progessElement = this.props.progressRenderer(this.state.progress, this.state.hasError, this.cancelUpload.bind(this));

      return _react2.default.createElement(
        'div',
        null,
        formElement,
        progessElement
      );
    }
  }, {
    key: '_getFormData',
    value: function _getFormData() {
      if (this.props.formGetter) {
        return this.props.formGetter();
      }
      return new FormData(_reactDom2.default.findDOMNode(this.refs.form));
    }
  }, {
    key: '_doUpload',
    value: function _doUpload() {
      var _this2 = this;
      console.log('file upload', _this2.props);
      let fileTitle = document.getElementById('mediaTitle').value;
        console.log('filetitle',fileTitle);
      let tags=document.getElementById('tags');
      tags= tags? tags.value:"";
      var form = this._getFormData();
      form.append('folderId', this.props.folderId);
      form.append('userIds', this.props.userIds);
      form.append('title', fileTitle?fileTitle:"No Name");
      form.append('isPublic', this.props.isPublic);
      form.append('isFree', this.props.isFree);
      form.append('price', this.props.price);
      form.append('other_a', this.props.other_a);
      form.append('other_a', this.props.other_a);
      form.append('mediaDesc', this.props.mediaDesc);
      form.append('tags', tags);


      var req = new XMLHttpRequest();
      req.open('POST', this.props.url);
      req.setRequestHeader("Authorization", "Bearer "+sessionStorage.getItem('jwtToken'));
      req.addEventListener('load', function (e) {
        _this2.proxy.removeAllListeners(['abort']);
        var newState = { progress: 100 };
        if (req.status >= 200 && req.status <= 299) {
          _this2.setState(newState, function () {
            _this2.props.onLoad(e, req);
          });
        } else {
          newState.hasError = true;
          _this2.setState(newState, function () {
            _this2.props.onError(e, req);
          });
        }
      }, false);

      req.addEventListener('error', function (e) {
        _this2.setState({
          hasError: true
        }, function () {
          _this2.props.onError(e, req);
        });
      }, false);

      req.upload.addEventListener('progress', function (e) {
        var progress = 0;
        if (e.total !== 0) {
          progress = parseInt(e.loaded / e.total * 100, 10);
        }
        _this2.setState({
          progress: progress
        }, function () {
          _this2.props.onProgress(e, req, progress);
        });
      }, false);

      req.addEventListener('abort', function (e) {
        _this2.setState({
          progress: -1
        }, function () {
          _this2.props.onAbort(e, req);
        });
      }, false);

      this.proxy.once('abort', function () {
        req.abort();
      });

      this.props.beforeSend(req).send(this.props.formCustomizer(form),sessionStorage.getItem('jwtToken'));
    }
  }]);

  return FileUploadProgress;
}(_react2.default.Component);

FileUploadProgress.propTypes = {
  url: _propTypes2.default.string.isRequired,
  formGetter: _propTypes2.default.func,
  formRenderer: _propTypes2.default.func,
  progressRenderer: _propTypes2.default.func,
  formCustomizer: _propTypes2.default.func,
  beforeSend: _propTypes2.default.func,
  onProgress: _propTypes2.default.func,
  onLoad: _propTypes2.default.func,
  onError: _propTypes2.default.func,
  onAbort: _propTypes2.default.func,
  themecolor: _propTypes2.default.string
};

FileUploadProgress.defaultProps = {

  formRenderer: function formRenderer(onSubmit, onFileChanged,progess) {
    return _react2.default.createElement(
      'form',
      { className: '_react_fileupload_form_content',encType:'multipart/form-data', ref: 'form', method: 'post', onSubmit: onSubmit },
      _react2.default.createElement(
        'div',
         { className: 'upload-holder'},
        _react2.default.createElement('input', {className: 'fileupload_input', id:'media-upload', type: 'file', name: 'media-upload', onChange: onFileChanged  })
      ),
      _react2.default.createElement('input', {className:'btn btn-primary btn-single',style:{marginTop:'5px',display:'inline-block',backgroundColor:'#636767'}, type: 'submit', disabled: false , value: 'Upload' })
    );
  },

  progressRenderer: function progressRenderer(progress, hasError, cancelHandler) {
    if (hasError || progress > -1) {
      var barStyle = (0, _objectAssign2.default)({}, styles.progressBar);
      barStyle.width = progress + '%';

      var message = _react2.default.createElement(
        'span',
        { style: { color: '#fff' } },
        'Uploading ...'
      );
      if (hasError) {
        barStyle.backgroundColor = '#d9534f';
        message = _react2.default.createElement(
          'span',
          { style: { color: '#a94442' } },
          hasError.length>8?hasError:'Failed to upload ...'
        );
      }
      if (progress === 100 && !hasError) {
        message = _react2.default.createElement(
          'span',
          { style: { color: '#27dc1c' } },
          'Successfully uploaded'
        );
      }

      return _react2.default.createElement(
        'div',
        { className: '_react_fileupload_progress_content' },
        _react2.default.createElement(
          'div',
          { style: styles.progressWrapper },
          _react2.default.createElement('div', { className: '_react_fileupload_progress_bar', style: barStyle })
        ),
        _react2.default.createElement(
          'button',
          {
            className: '_react_fileupload_progress_cancel',
            style: styles.cancelButton,
            onClick: cancelHandler },
          _react2.default.createElement(
            'span',
            { style: { color: '#f73818',fontSize:"1.3em",padding:"0px 0px 5px 5px" } },
            '\xD7'
          )
        ),
        _react2.default.createElement(
          'div',
          { style: { clear: 'left' } },
          message
        )
      );
    }
    return '';
  },

  formCustomizer: function formCustomizer(form) {
    return form;
  },
  beforeSend: function beforeSend(request) {
    return request;
  },
  onProgress: function onProgress(e, request, progress) {

  },
  onLoad: function onLoad(e, request) {},
  onError: function onError(e, request) {},
  onAbort: function onAbort(e, request) {}
};

exports.default = FileUploadProgress;