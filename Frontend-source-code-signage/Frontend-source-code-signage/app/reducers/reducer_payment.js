import {NEW_SUBSCRIPTION, NEW_SUBSCRIPTION_SUCCESS, NEW_SUBSCRIPTION_FAILURE,
	MAKE_PAYMENT, MAKE_PAYMENT_SUCCESS, MAKE_PAYMENT_FAILURE, RESET_PAYMENT,
	SUBSCRIPTION_PLANS,SUBSCRIPTION_PLANS_SUCCESS, SUBSCRIPTION_PLANS_FAILURE, RESET_SUBSCRIPTION_PLANS,
	GET_SUBSCRIPTION_BY_EMAIL,GET_SUBSCRIPTION_BY_EMAIL_SUCCESS,
	SUBSCRIPTIONS_LIST,SUBSCRIPTIONS_LIST_SUCCESS,SUBSCRIPTIONS_LIST_FAILURE,
	INVOICE_LIST,INVOICE_LIST_SUCCESS,INVOICE_LIST_FAILURE
} from '../actions/payment';

const INITIAL_STATE = {
              newPayment: {payment:null, error:null, loading: false},
              subscriptions: {plans:null, error:null, loading: false},
              userSubs:{plan:null, error:null, loading:false},
              invoices:{list:[],error:null, loading:false},
              allSubscriptions:{list:[], error:null, loading:false}
						};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
		case MAKE_PAYMENT:
			return { ...state, newPayment: {...state.newPayment, error: null, loading: true} };
		case MAKE_PAYMENT_SUCCESS:
			return { ...state, newPayment: {payment: action.payload, error:null, loading: false} };
		case MAKE_PAYMENT_FAILURE:
			error = action.payload || {message: action.payload.message};
			return { ...state, newPayment: {...state.payment, error: error, loading: false} };

			case SUBSCRIPTION_PLANS:
			return { ...state, subscriptions: {...state.plans, error: null, loading: true} };
		case SUBSCRIPTION_PLANS_SUCCESS:
			return { ...state, subscriptions: {plans: action.payload, error:null, loading: false} };
		case SUBSCRIPTION_PLANS_FAILURE:
			error = action.payload || {message: action.payload.message};
			return { ...state, subscriptions: {...state.plans, error: error, loading: false} };
		case RESET_SUBSCRIPTION_PLANS:
			error = action.payload || {message: action.payload.message};
			return { ...state, newPayment: {plans:null, error: error, loading: false} };

		case SUBSCRIPTIONS_LIST:
			return { ...state, allSubscriptions: {...state.list, error: null, loading: true} };
		case SUBSCRIPTIONS_LIST_SUCCESS:
			return { ...state, allSubscriptions: {list: action.payload, error:null, loading: false} };
		case SUBSCRIPTIONS_LIST_FAILURE:
			error = action.payload || {message: action.payload.message};
			return { ...state, allSubscriptions: {...state.list, error: error, loading: false} };

		case INVOICE_LIST:
			return { ...state, invoices: {...state.list, error: null, loading: true} };
		case INVOICE_LIST_SUCCESS:
			return { ...state, invoices: {list: action.payload, error:null, loading: false} };
		case INVOICE_LIST_FAILURE:
			error = action.payload || {message: action.payload.message};
			return { ...state, invoices: {...state.list, error: error, loading: false} };


	    case RESET_PAYMENT:
	    return { ...state, newPayment: {payment:null, error: null, loading: false} };

	    case GET_SUBSCRIPTION_BY_EMAIL:

	    return { ...state, userSubs: {...state.plan, error: null, loading: true} };

	    case GET_SUBSCRIPTION_BY_EMAIL_SUCCESS:

	    return { ...state, userSubs: {plan:action.payload, error: null, loading: false} };
  
  default:
    return state;
  }
}
