import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Demo from '../../components/demo.component';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
//import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EmailIcon from '@material-ui/icons/Email';
import IconButton from '@material-ui/core/IconButton';
const rows=[
    {form:23131 , type:"Sarso" , rdate:"12-07-2020" , region:"Delhi", gbno:"" , name:"Aayush" , saney:"21", receipt:"", status:"Approved",statusdate:"07-08-2020"},
    {form:43212 , type:"Narchoe" , rdate:"21-03-2020" , region:"Mumbai", gbno:"9865347" , name:"Malay" , saney:"", receipt:"46381", status:"Reject",statusdate:"06-04-2020"},
    {form:12324 , type:"Bhorlak" , rdate:"18-01-2019" , region:"Zurich", gbno:"4563217" , name:"Reji" , saney:"", receipt:"78954", status:"",statusdate:"17-03-2019"},
    {form:21345 , type:"Book Full" , rdate:"03-05-2017" , region:"Chicago", gbno:"7895412" , name:"Pankaj" , saney:"4", receipt:"", status:"Issued",statusdate:"21-06-2017"},
    {form:39213 , type:"Brief GB" , rdate:"13-08-2018" , region:"Dharamsala", gbno:"4578621" , name:"Abcdef" , saney:"31", receipt:"54316", status:"Issued",statusdate:"07-09-2018"},
    {form:41234 , type:"Abroad" , rdate:"21-09-2019" , region:"New York", gbno:"7895462" , name:"Qwerty" , saney:"71", receipt:"23241", status:"Issued",statusdate:"28-09-2019"}
];
const ListPage = () => {

  return (
    <div style={{paddingLeft:20}}>
    
     
       
            <Table aria-label="simple table" >
                <TableHead>
                <TableRow>
                    <TableCell padding="none">Form No</TableCell>
                    <TableCell padding="none">Type</TableCell>
                    <TableCell padding="none" >Request Date</TableCell>
                    <TableCell  padding="none">Region</TableCell>
                    <TableCell  padding="none">GB No</TableCell>
                    <TableCell padding="none" >Name</TableCell>
                    <TableCell padding="none">Saney Form No</TableCell>
                    
                    <TableCell padding="none" >Receipt No</TableCell>
                    <TableCell  padding="none">Status</TableCell>
                    <TableCell  padding="none">Status Date</TableCell>
                    <TableCell padding="none" >Edit</TableCell>
                    <TableCell padding="none" >Email</TableCell>
                   
              
                </TableRow>
                </TableHead>
          {<TableBody>
           
                {rows.map((row) => (
                    <TableRow key={row.name}>
                    <TableCell padding="none" component="th" scope="row">
                        {row.form}
                    </TableCell>
                    <TableCell padding="none">{row.type}</TableCell>
                    <TableCell padding="none">{row.rdate}</TableCell>
                    <TableCell padding="none">{row.region}</TableCell>
                    <TableCell padding="none">{row.gbno}</TableCell>
                    <TableCell padding="none">{row.name}</TableCell>
                    <TableCell padding="none" style={{alignItems:'center'}}>{row.saney}</TableCell>
                    <TableCell padding="none">{row.receipt}</TableCell>
                    <TableCell padding="none">{row.status}</TableCell>
                    <TableCell padding="none">{row.statusdate}</TableCell>
                    <TableCell  padding="none">
                        <IconButton color="primary" aria-label="Delete">
                            <EditIcon />
                        </IconButton>
                    </TableCell>
                    <TableCell padding="none">
                         <IconButton  aria-label="Email">
                            <EmailIcon />
                        </IconButton>
                    </TableCell>
                    
                    </TableRow>
                ))}
                </TableBody>}
            </Table>
         
             </div>
  );
};

export default ListPage;
