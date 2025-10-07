const BASE_URL = "https://digital-ledger-backend.onrender.com/api/v1";

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

// TRANSACTION ENDPOINTS
export const transactionEndpoints = {
  GET_ALL_TRANSACTIONS_API: BASE_URL + "/transaction/showAllTransactions",
  CREATE_TRANSACTION_API: BASE_URL + "/transaction/createTransaction",
  DELETE_TRANSACTION_API: BASE_URL + "/transaction/deleteTransaction",
  UPDATE_TRANSACTION_API: BASE_URL + "/transaction/updateTransaction",
  FILTER_TRANSACTIONS_API: BASE_URL + "/transaction/filterTransaction",
  GET_MONTHLY_SUMMARY_API: BASE_URL + "/transaction/getMonthSummary",
  GET_PAGINATED_TRANSACTIONS_API: BASE_URL + "/transaction/getPage",
};

// CATEGORY ENDPOINTS
export const categoryEndpoints = {
  GET_ALL_CATEGORY_API: BASE_URL + "/category/getAllCategory",
  CREATE_CATEGORY_API: BASE_URL + "/category/createCategory",
};

// FRIEND ENDPOINTS
export const friendEndpoints = {
  SEND_REQUEST_API: BASE_URL + "/friends/sendFriendRequest",
  GET_ALL_FRIENDS_API: BASE_URL + "/friends/showAllFriends",
  GET_PENDING_REQUESTS_API: BASE_URL + "/friends/showAllPendingFriends",
  ACCEPT_REQUEST_API: BASE_URL + "/friends/acceptFriend",
  DECLINE_REQUEST_API: BASE_URL + "/friends/declineFriend",
  GET_ALL_CHATS_API : BASE_URL + "/messages",
};

// DEBT ENDPOINTS
export const debtEndpoints = {
  CREATE_DEBT_API: BASE_URL + "/debts/createDebt",
  SETTLE_DEBT_API: BASE_URL + "/debts/settleDebt",
  GET_DEBTS_API: BASE_URL + "/debts/showAllDebt",
  DELETE_DEBT_API: BASE_URL + "/debts/deleteDebt",
};

// SAVING ENDPOINTS
export const savingEndpoints = {
  CREATE_SAVING_GOAL_API: BASE_URL + "/savings/createSavings",
  GET_ALL_SAVINGS_API: BASE_URL + "/savings/showAllSavings",
  UPDATE_SAVING_GOAL_API: BASE_URL + "/savings/updateSavings",
  DELETE_SAVING_API: BASE_URL + "/savings/deleteSavings",
  ADD_TO_SAVING_API: BASE_URL + "/savings/addSavings",
  SUB_FROM_SAVING_API: BASE_URL + "/savings/subSavings",
};

// GROUP ENDPOINTS
export const groupEndpoints = {
  CREATE_GROUP_API: BASE_URL + "/group/createGroup",
  GET_USER_GROUPS_API: BASE_URL + "/group/showAllGroups",
  GET_GROUP_BY_ID_API: BASE_URL + "/group/showGroupsById",
  UPDATE_GROUP_API: BASE_URL + "/group/updateGroup",
  DELETE_GROUP_API: BASE_URL + "/group/deleteGroup",
};

// RECURRING BILLS ENDPOINTS
export const recurringBillsEndpoints = {
  GET_ALL_BILLS_API: BASE_URL + "/bills/showAllBills",
  CREATE_BILL_API: BASE_URL + "/bills/createBill",
  UPDATE_BILL_API: BASE_URL + "/bills/updateBill",
  DELETE_BILL_API: BASE_URL + "/bills/deleteBill",
  GET_BILL_BY_ID_API: BASE_URL + "/bills/getBillid",
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
};
