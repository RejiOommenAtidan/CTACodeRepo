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
    {form:41234 , rdate:"21-09-2019" , region:"New York",  name:"Qwerty" ,id:"Abcda", change:"71",da:"RC", receipt:"15-09-2019", status:"Issued",rejectdate:"28-09-2019",returndate:"28-09-2019"},
    {form:41234 , rdate:"21-09-2019" , region:"New York",  name:"Qwerty" ,id:"Abcda", change:"71",da:"RC", receipt:"15-09-2019", status:"Issued",rejectdate:"28-09-2019",returndate:"28-09-2019"},
    {form:41234 , rdate:"21-09-2019" , region:"New York",  name:"Qwerty" ,id:"Abcda", change:"71",da:"RC", receipt:"15-09-2019", status:"Issued",rejectdate:"28-09-2019",returndate:"28-09-2019"},
    {form:41234 , rdate:"21-09-2019" , region:"New York",  name:"Qwerty" ,id:"Abcda", change:"71",da:"RC", receipt:"15-09-2019", status:"Issued",rejectdate:"28-09-2019",returndate:"28-09-2019"},
    {form:41234 , rdate:"21-09-2019" , region:"New York",  name:"Qwerty" ,id:"Abcda", change:"71",da:"RC", receipt:"15-09-2019", status:"Issued",rejectdate:"28-09-2019",returndate:"28-09-2019"},
    {form:41234 , rdate:"21-09-2019" , region:"New York",  name:"Qwerty" ,id:"Abcda", change:"71",da:"RC", receipt:"15-09-2019", status:"Issued",rejectdate:"28-09-2019",returndate:"28-09-2019"}
];
const Abroad = () => {
  return (
    <div style={{paddingLeft:20}}>
            <Table aria-label="simple table" >
                <TableHead>
                <TableRow>
                    <TableCell padding="none">Form No</TableCell>
                    <TableCell padding="none" >Received Date</TableCell>
                    <TableCell  padding="none">Region</TableCell>
                    <TableCell padding="none" >Name</TableCell>
                    <TableCell padding="none" >IdentityID</TableCell>
                    <TableCell padding="none">Change Field</TableCell>
                    <TableCell padding="none" >Document attached</TableCell>
                    <TableCell  padding="none">	Receipt No</TableCell>
                    <TableCell  padding="none">Status</TableCell>
                    <TableCell padding="none" >Reject Date</TableCell>
                    <TableCell padding="none" >Return Date</TableCell>
                    <TableCell padding="none" >Email</TableCell>
                    <TableCell padding="none" >Edit</TableCell>
              
                </TableRow>
                </TableHead>
          {<TableBody>

                {rows.map((row) => (
                    <TableRow key={row.name}>
                    <TableCell padding="none" component="th" scope="row">
                        {row.form}
                    </TableCell>
                    <TableCell padding="none">{row.rdate}</TableCell>
                    <TableCell padding="none">{row.region}</TableCell>
                    <TableCell padding="none">{row.name}</TableCell>
                    <TableCell padding="none">{row.id}</TableCell>
                    <TableCell padding="none">{row.change}</TableCell>
                    <TableCell padding="none" >{row.da}</TableCell>
                    <TableCell padding="none">{row.receipt}</TableCell>
                    <TableCell padding="none">{row.status}</TableCell>
                    <TableCell padding="none">{row.rejectdate}</TableCell>
                    <TableCell padding="none">{row.returndate}</TableCell>
                    <TableCell padding="none">
                         <IconButton  aria-label="Email">
                            <EmailIcon />
                        </IconButton>
                    </TableCell>
                    <TableCell  padding="none">
                        <IconButton color="primary" aria-label="Delete">
                            <EditIcon />
                        </IconButton>
                    </TableCell>
                    
                    </TableRow>
                ))}
                </TableBody>}
            </Table>
         
             </div>
  );
};

export default Abroad;
