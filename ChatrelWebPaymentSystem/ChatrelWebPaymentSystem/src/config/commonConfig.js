import React, { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

//Local
export const sAPIBASEURL = "http://localhost:49700/api";

//QA
//export const sAPIBASEURL = "https://chatrel-webapi.azurewebsites.net/api";

//UAT
// export const sAPIBASEURL = "https://chatrel-webapp-uat.azurewebsites.net/";

export const sAdminEmail = "admin@CTA.com";
export const sSnackbarAddMessage = "Record added successfully";
export const sSnackbarUpdateMessage = "Record updated successfully";
export const sDateFormat = "DD-MM-YYYY";
export const sDateFormatMUIDatepicker = "dd-MM-yyyy";
export const aPageSizeArray = [5, 10, 15, 20, 30, 50, 70, 100];
export const nPageSize = 15;
export const oOptions = {
    // loadingType:"linear",
    // searchFieldAlignment:"left",
    // selection:true,
    // tableLayout: "auto",
    // padding: "dense",
    columnsButton: true,
    filtering: true,
    exportButton: true,
    exportAllData: true,
    headerStyle: {
        backgroundColor: '#3b3e66',
        color: '#FFF',
        fontSize: '15px',
        padding: '10px',
        border: '1px solid lightgrey'
    },
    pageSize: nPageSize,
    pageSizeOptions: aPageSizeArray,
    rowStyle: x => {

        if (x.tableData.id % 2) {
            return { backgroundColor: "#f2f2f2", padding: '0' }
        }
        else {
            return { padding: '0' }
        }

    }
};

export const oTableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} color={"primary"} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} color={"primary"} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} color={"primary"} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} color={"primary"} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} color={"primary"} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} color={"primary"} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} color={"primary"} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} color={"primary"} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} color={"primary"} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} color={"primary"} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} color={"primary"} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} color={"primary"} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} color={"primary"} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} color={"primary"} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} color={"primary"} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} color={"primary"} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} color={"primary"} ref={ref} />)
};


