"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var debounce_1 = __importDefault(require("lodash/debounce"));
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var quill_1 = __importDefault(require("quill"));
var ra_core_1 = require("ra-core");
var FormHelperText_1 = __importDefault(require("@material-ui/core/FormHelperText"));
var FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
var styles_1 = require("@material-ui/core/styles");
var styles_2 = __importDefault(require("./styles"));
var RichTextInput = /** @class */ (function (_super) {
    __extends(RichTextInput, _super);
    function RichTextInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lastValueChange = null;
        _this.onTextChange = debounce_1.default(function () {
            var value = _this.editor.innerHTML === '<p><br></p>'
                ? ''
                : _this.editor.innerHTML;
            _this.lastValueChange = value;
            _this.props.input.onChange(value);
        }, 500);
        _this.updateDivRef = function (ref) {
            _this.divRef = ref;
        };
        return _this;
    }
    RichTextInput.prototype.componentDidMount = function () {
        var _a = this.props, value = _a.input.value, toolbar = _a.toolbar, options = _a.options;
        this.quill = new quill_1.default(this.divRef, __assign({ modules: { toolbar: toolbar, clipboard: { matchVisual: false } }, theme: 'snow' }, options));
        this.quill.setContents(this.quill.clipboard.convert(value));
        this.editor = this.divRef.querySelector('.ql-editor');
        this.quill.on('text-change', this.onTextChange);
    };
    RichTextInput.prototype.componentDidUpdate = function () {
        if (this.lastValueChange !== this.props.input.value) {
            var selection = this.quill.getSelection();
            this.quill.setContents(this.quill.clipboard.convert(this.props.input.value));
            if (selection && this.quill.hasFocus()) {
                this.quill.setSelection(selection);
            }
        }
    };
    RichTextInput.prototype.componentWillUnmount = function () {
        this.quill.off('text-change', this.onTextChange);
        this.onTextChange.cancel();
        this.quill = null;
    };
    RichTextInput.prototype.render = function () {
        var _a = this.props.meta, touched = _a.touched, error = _a.error, _b = _a.helperText, helperText = _b === void 0 ? false : _b;
        return (react_1.default.createElement(FormControl_1.default, { error: !!(touched && error), fullWidth: this.props.fullWidth, className: "ra-rich-text-input" },
            react_1.default.createElement("div", { "data-testid": "quill", ref: this.updateDivRef }),
            touched && error && (react_1.default.createElement(FormHelperText_1.default, { error: true, className: "ra-rich-text-input-error" }, error)),
            helperText && react_1.default.createElement(FormHelperText_1.default, null, helperText)));
    };
    RichTextInput.propTypes = {
        addLabel: prop_types_1.default.bool.isRequired,
        classes: prop_types_1.default.object,
        input: prop_types_1.default.object,
        label: prop_types_1.default.string,
        meta: prop_types_1.default.object,
        options: prop_types_1.default.object,
        source: prop_types_1.default.string,
        toolbar: prop_types_1.default.oneOfType([
            prop_types_1.default.array,
            prop_types_1.default.bool,
            prop_types_1.default.shape({
                container: prop_types_1.default.array,
                handlers: prop_types_1.default.object,
            }),
        ]),
        fullWidth: prop_types_1.default.bool,
    };
    RichTextInput.defaultProps = {
        addLabel: true,
        options: {},
        record: {},
        toolbar: true,
        fullWidth: true,
    };
    return RichTextInput;
}(react_1.Component));
exports.RichTextInput = RichTextInput;
var RichTextInputWithField = ra_core_1.addField(styles_1.withStyles(styles_2.default)(RichTextInput));
RichTextInputWithField.defaultProps = {
    addLabel: true,
    fullWidth: true,
};
exports.default = RichTextInputWithField;
