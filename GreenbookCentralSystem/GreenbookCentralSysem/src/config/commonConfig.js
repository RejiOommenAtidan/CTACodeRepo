export const aPageSizeArray = [10, 15, 20, 30, 50, 70, 100];
export const nPageSize = 15;
export const oOptions = {
    // loadingType:"linear",
    // searchFieldAlignment:"left",
    // selection:true,
    // tableLayout: "auto",
    // padding: "dense",
    columnsButton: true,
    filtering,
    exportButton: true,
    exportAllData: true,
    headerStyle: {
        backgroundColor: '#3b3e66',
        color: '#FFF',
        fontSize: '18px',
        paddingLeft: '5px',
        border: '1px solid lightgrey'
    },
    pageSize: nPageSize,
    pageSizeOptions: aPageSizeArray,
    rowStyle: x => {
        if (x.tableData.id % 2) {
            return { backgroundColor: "#f2f2f2" }
        }
    }
};


