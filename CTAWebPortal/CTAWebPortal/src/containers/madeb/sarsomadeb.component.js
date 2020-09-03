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
   
    {form:41234 , rdate:"21-09-2019" , region:"New York",  name:"Qwerty" ,fname:"Abcda", saney:"71",da:"RC", iad:"15-09-2019", ia:"Issued",returndate:"28-09-2019"},
    {form:41234 , rdate:"21-09-2019" , region:"New York",  name:"Qwerty" ,fname:"Abcda", saney:"71",da:"RC", iad:"15-09-2019", ia:"Issued",returndate:"28-09-2019"},
    {form:41234 , rdate:"21-09-2019" , region:"New York",  name:"Qwerty" ,fname:"Abcda", saney:"71",da:"RC", iad:"15-09-2019", ia:"Issued",returndate:"28-09-2019"},
    {form:41234 , rdate:"21-09-2019" , region:"New York",  name:"Qwerty" ,fname:"Abcda", saney:"71",da:"RC", iad:"15-09-2019", ia:"Issued",returndate:"28-09-2019"},
    {form:41234 , rdate:"21-09-2019" , region:"New York",  name:"Qwerty" ,fname:"Abcda", saney:"71",da:"RC", iad:"15-09-2019", ia:"Issued",returndate:"28-09-2019"}
];
const Abroad = () => {
  return (
    <div style={{paddingLeft:20}}>
            <Table aria-label="simple table" >
                <TableHead>
                <TableRow>
                    <TableCell padding="none">Form No</TableCell>
                    <TableCell padding="none" >Received Date</TableCell>
                    <TableCell  padding="none">Authority</TableCell>
                    <TableCell padding="none" >Name</TableCell>
                    <TableCell padding="none" >Father's Name</TableCell>
                    <TableCell padding="none">Saney Form No</TableCell>
                    <TableCell padding="none" >Document attached</TableCell>
                    <TableCell  padding="none">	Issue Action Date</TableCell>
                    <TableCell  padding="none">Issue Action</TableCell>
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
                    <TableCell padding="none">{row.fname}</TableCell>
                    <TableCell padding="none">{row.saney}</TableCell>
                    <TableCell padding="none" >{row.da}</TableCell>
                    <TableCell padding="none">{row.iad}</TableCell>
                    <TableCell padding="none">{row.ia}</TableCell>
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
