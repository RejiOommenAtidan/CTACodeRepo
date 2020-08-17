import axios from 'axios';

// ADD_USER
export const addUser = (user) => ({
  type: 'ADD_USER',
  user
});

export const startAddUser = (userData = {}) => {
  return (dispatch, getState) => {
    const {
      username = '',
      fullname = '',
      email = '',
      password = '',
      confirm_password = '',
      role = '',
      region = '',
      status = ''
    } = userData;
    // const user = { username, fullname, email, password,confirm_password,role,region,status };
    // return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
    //   dispatch(addExpense({
    //     id: ref.key,
    //     ...expense
    //   }));
    // });
    // var config = {
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    //     // 'Accept': 'application/json',
    //     // 'Content-Type': 'application/json',
    //   }
    // };
    return axios.post(`/Users/AddUser`,userData)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          var user = resp.data;
          dispatch(addUser({
            user
          }));
        }
      })
      .catch(error => {
        if (error.response) {
          //The request was made and the server responded 
          //with a status code that falls out of the range of 2xx OR in 4XX to 5XX range
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received 
          //`error.request` is an instance of XMLHttpRequest in the browser 
          //and an instance of http.ClientRequest in node.js
          console.warn(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', error.message);
        }
        console.log(error.config);
      })
      .then(release => {
        //always executed
        //console.log(release); => udefined
      });
  };
};

// // REMOVE_EXPENSE
// export const removeExpense = ({ id } = {}) => ({
//   type: 'REMOVE_EXPENSE',
//   id
// });

// export const startRemoveExpense = ({ id } = {}) => {
//   return (dispatch, getState) => {
//     const uid = getState().auth.uid;
//     return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
//       dispatch(removeExpense({ id }));
//     });
//   };
// };

// // EDIT_EXPENSE
// export const editExpense = (id, updates) => ({
//   type: 'EDIT_EXPENSE',
//   id,
//   updates
// });

// export const startEditExpense = (id, updates) => {
//   return (dispatch, getState) => {
//     const uid = getState().auth.uid;
//     return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
//       dispatch(editExpense(id, updates));
//     });
//   };
// };

// // SET_EXPENSES
// export const setExpenses = (expenses) => ({
//   type: 'SET_EXPENSES',
//   expenses
// });

// export const startSetExpenses = () => {
//   return (dispatch, getState) => {
//     const uid = getState().auth.uid;
//     return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
//       const expenses = [];

//       snapshot.forEach((childSnapshot) => {
//         expenses.push({
//           id: childSnapshot.key,
//           ...childSnapshot.val()
//         });
//       });

//       dispatch(setExpenses(expenses));
//     });
//   };
// };
