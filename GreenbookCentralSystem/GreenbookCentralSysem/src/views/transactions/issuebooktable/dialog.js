import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import {
	Grid,
	Button,
	FormControl,
	TextField
} from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { sButtonColor, sButtonSize, sButtonVariant, sDateFormatMUIDatepicker, sDDMMYYYYRegex } from '../../../config/commonConfig';
import _ from "lodash/fp";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import Moment from "moment";


export const EditDialog = (props) => {

	Moment.locale("en");
	const [authorityData, setAuthoritData] = React.useState(props.selectData['authRegions']);
	const [madebData, setMadebData] = React.useState(props.selectData['madebTypes']);
	const [typeIssuedDataAll, setTypeIssuedDataAll] = React.useState(props.selectData['typeIssued']);

	const [formNumber, setFormNumber] = React.useState(props.editObj['sFormNumber']);
	const [id, setId] = React.useState(props.editObj['id']);
	const [madebType, setMadebType] = React.useState(props.editObj['nMadebTypeId']);
	const [authorityId, setAuthorityId] = React.useState(props.editObj['nAuthRegionId']);
	const [issuedDate, setIssuedDate] = React.useState(props.editObj.dtIssuedDate ? (props.editObj.dtIssuedDate).split('T')[0] : undefined);
	const [enteredDate, setEnteredDate] = React.useState(props.editObj.dtEntered ? (props.editObj.dtEntered).split('T')[0] : undefined);
	const [gbId, setGbId] = React.useState(parseInt(props.editObj['nGBId']));
	const [issuedOrNotId, setIssuedOrNotId] = React.useState(props.editObj['nTypeIssuedId']);
	const [printed, setPrinted] = React.useState(props.editObj['bPrinted']);
	const [remarks, setRemarks] = React.useState(props.editObj['sRemarks']);
	const editObj = {
		id: id,
		sFormNumber: formNumber,
		nMadebTypeId: madebType,
		nTypeIssuedId: issuedOrNotId,
		nGBId: gbId,
		//dtIssuedDate: issuedDate,
		dtIssuedDate: Moment(issuedDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(issuedDate).format('YYYY-MM-DD') : '',
		nAuthRegionId: authorityId,
		bPrinted: printed,
		sRemarks: remarks
	};

	let typeIssuedData = []
	typeIssuedDataAll.forEach(i => {
		//console.log(i);
		if (i.id === 2 || i.id === 3 || i.id === 4) {
			typeIssuedData.push(i);
		}
	});

	let valueAuthRegion = [];
	authorityData.forEach(element => {

		if (element.id === authorityId) {
			valueAuthRegion = element;
		}
	});

	let valueTypeIssued = [];
	typeIssuedData.forEach(element => {

		if (element.id === issuedOrNotId) {
			valueTypeIssued = element;
		}
	});
	let valueMadebType = [];
	madebData.forEach(element => {

		if (element.id === madebType) {
			valueMadebType = element;
		}
	});
	return (
		<>

			{
				<Dialog open={props.editModal} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Edit Issue Book Record</DialogTitle>
					<form>
						<DialogContent>
							<DialogContentText>
								<div>
									<Grid container spacing={3}>
										{/*<Grid item xs={12} sm={6}>
                                            <FormControl className={props.classes.formControl}>
                                                <TextField
                                                    id="date"
                                                    label="Issued Date"
                                                    type="date"
                                                    defaultValue={issuedDate}
                                                    className={props.classes.textField}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    onChange={(e) => { setIssuedDate(e.target.value) }}
                                                />
                                            </FormControl>
                                                </Grid>*/}
										<Grid item xs={12} sm={6}>
											<FormControl className={props.classes.formControl}>
												<MuiPickersUtilsProvider utils={DateFnsUtils}>
													<KeyboardDatePicker
placeholder="DD-MM-YYYY"
														variant="dialog"
														disabled
														//readOnly
														//   openTo="year"
														//   views={["year", "month", "date"]}
														margin="dense"
														id="id_dtIssuedDate"
														name="name_dtIssuedDate"
														label="Issued Date"
														format={sDateFormatMUIDatepicker}
														returnMoment={true}
														onChange={(date) => {
															setIssuedDate(date);
														}}
														value={issuedDate}
														KeyboardButtonProps={{
															"aria-label": "change date",
														}}
														fullWidth
														className={props.classes.dateField}
													/>
												</MuiPickersUtilsProvider>
											</FormControl>
										</Grid>
										<Grid item xs={12} sm={6}>
											<FormControl className={props.classes.formControl}>
												<Autocomplete
													openOnFocus
													disabled
													InputProps={{
														readOnly: true,
													}}
													clearOnEscape
													onChange={
														(e, value) => {
															if (value !== null) {
																console.log(value.id);
																setMadebType(value.id);
															}
															else {
																setMadebType(0);
															}
														}
													}
													value={valueMadebType}

													id="id_madebType"
													options={madebData}

													autoHighlight
													getOptionLabel={(option) => option.sMadebDisplayName}
													renderOption={(option) => (
														<React.Fragment>
															<span>{option.sMadebDisplayName}</span>
														</React.Fragment>
													)}
													renderInput={(params) => (
														<TextField
															{...params}
															label="Why"
															variant="standard"
															inputProps={{
																...params.inputProps,
																autoComplete: 'off', // disable autocomplete and autofill
															}}
														/>
													)}
												/>
											</FormControl>
										</Grid>
										<Grid item xs={12} sm={6}>
											<FormControl className={props.classes.formControl}>
												<Autocomplete
													openOnFocus
													disabled
													clearOnEscape
													onChange={
														(e, value) => {
															if (value !== null) {
																console.log(value.id);
																setAuthorityId(value.id);
															}
															else {
																setAuthorityId(0);
															}
														}
													}
													value={valueAuthRegion}

													id="id_nAuthorityId"
													options={authorityData}

													autoHighlight
													getOptionLabel={(option) => option.sAuthRegion}
													renderOption={(option) => (
														<React.Fragment>
															<span>{option.sAuthRegion}</span>
														</React.Fragment>
													)}
													renderInput={(params) => (
														<TextField
															{...params}
															label="Where"
															variant="standard"
															inputProps={{
																...params.inputProps,
																autoComplete: 'off', // disable autocomplete and autofill
															}}
														/>
													)}
												/>
											</FormControl>
										</Grid>
										<Grid item xs={12} sm={6}>
											<FormControl className={props.classes.formControl}>
												<TextField
													id="number"
													label="Form Number"
													type="number"
													InputProps={{
														readOnly: true,
													}}
													value={formNumber}
													onChange={(e) => { setFormNumber(e.target.value) }}

												/>
											</FormControl>
										</Grid>
										<Grid item xs={12} sm={6}>
											<FormControl className={props.classes.formControl}>
												<Autocomplete
													openOnFocus
													disabled
													clearOnEscape
													onChange={
														(e, value) => {
															if (value !== null) {
																console.log(value.id);
																setIssuedOrNotId(value.id);
															}
															else {
																setIssuedOrNotId(0);
															}
														}
													}
													value={valueTypeIssued}

													id="id_nIssuedOrNotId"
													options={typeIssuedData}
													/*  classes={{
																option: classes.option,
														}}
														className={classes.textField}*/
													autoHighlight
													getOptionLabel={(option) => option.sTypeIssued}
													renderOption={(option) => (
														<React.Fragment>
															<span>{option.sTypeIssued}</span>
														</React.Fragment>
													)}
													renderInput={(params) => (
														<TextField
															{...params}
															label="Issue Action"
															variant="standard"
															inputProps={{
																...params.inputProps,
																autoComplete: 'off', // disable autocomplete and autofill
															}}
														/>
													)}
												/>
											</FormControl>
										</Grid>
										<Grid item xs={12} sm={6}>
											<FormControl className={props.classes.formControl}>
												<TextField
													id="remarks"
													label="Remarks"
													multiline
													rows={4}
													InputProps={{
														readOnly: false,
													}}
													value={remarks}
													onChange={(e) => { setRemarks(e.target.value) }}

												/>
											</FormControl>
										</Grid>
									</Grid>
								</div>
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={() => props.editModalClose()}
								color={sButtonColor}
								variant={sButtonVariant}
								size={sButtonSize}
							>Cancel</Button>
							<Button
								onClick={() => props.editAPICall(editObj)}
								color={sButtonColor}
								variant={sButtonVariant}
								size={sButtonSize}
							>Save</Button>
						</DialogActions>
					</form>
				</Dialog>}
		</>
	);
}

export const SaveDialog = (props) => {
	const { register, handleSubmit, errors, setValue, formState } = useForm();
	//console.log(props.selectData);
	console.log("Props received", props);
	const [authorityData, setAuthoritData] = React.useState(props.selectData['authRegions']);
	const [madebData, setMadebData] = React.useState(props.selectData['madebTypes']);
	// const [typeIssuedData,setTypeIssuedData]= React.useState(props.selectData['typeIssued']);
	const [typeIssuedDataAll, setTypeIssuedDataAll] = React.useState(props.selectData['typeIssued']);
	const [formNumber, setFormNumber] = React.useState(props.saveObj['nFormNumber']);
	const [id, setId] = React.useState(props.saveObj['id']);
	const [madebType, setMadebType] = React.useState(props.saveObj['nMadebTypeID']);
	const [authorityId, setAuthorityId] = React.useState(props.saveObj['nAuthRegionID']);
  //const [receivedDate, setReceivedDate] = React.useState(props.saveObj.dtReceived ? (props.saveObj.dtReceived).split('T')[0] : undefined);
  const [receivedDate, setReceivedDate] = React.useState((madebType === 2 || madebType === 3) ? props.issuedDate : null);
	const [gbId, setGbId] = React.useState(parseInt(props.saveObj['sGBID']));
	const [issuedOrNotId, setIssuedOrNotId] = React.useState(2);

	const [printed, setPrinted] = React.useState(false);
	const [remarks, setRemarks] = React.useState('');

  const [dtIssuedDate, setIssuedDate] = React.useState(null);

	const saveObj = {

		nFormNumber: formNumber,
		nMadebTypeId: madebType,
		nTypeIssuedId: issuedOrNotId,
		nGBId: gbId,
		//dtIssuedDate: receivedDate,
		dtIssuedDate: Moment(receivedDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(receivedDate).format('YYYY-MM-DD') : '',
    nAuthRegionId: authorityId,
		bPrinted: printed,
		sRemarks: remarks

	}

  console.log("saveObj:", saveObj);

	const changeObj = {
		id: id,
		//dtIssuedDate: receivedDate,
		dtIssuedDate: Moment(receivedDate).format('YYYY-MM-DD') != 'Invalid date' ? Moment(receivedDate).format('YYYY-MM-DD') : '',
		nIssuedOrNotID: issuedOrNotId
	}
	let typeIssuedData = []
	typeIssuedDataAll.forEach(i => {
		//console.log(i);
		if (i.id === 2 || i.id === 3 || i.id === 4) {
			typeIssuedData.push(i);
		}
	});


	let valueAuthRegion = [];
	authorityData.forEach(element => {

		if (element.id === authorityId) {
			valueAuthRegion = element;
		}
	});

	let valueTypeIssued = [];
	typeIssuedData.forEach(element => {

		if (element.id === issuedOrNotId) {
			valueTypeIssued = element;
		}
	});
	let valueMadebType = [];
	madebData.forEach(element => {

		if (element.id === madebType) {
			valueMadebType = element;
		}
	});
	useEffect(() => {
    
		//  console.log(typeIssuedDataAll);
	}, []);

	const onSaveHandleSubmit = () => {
		props.saveAPICall(saveObj, changeObj)
	};

	return (
		<>
			<Dialog open={props.saveModal} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Save Issue Book</DialogTitle>
				<form onSubmit={handleSubmit(onSaveHandleSubmit)}>
					<DialogContent>
						<DialogContentText>
							<Grid container spacing={3}>
								<Grid item xs={12} sm={6}>
									<FormControl className={props.classes.formControl}>
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<KeyboardDatePicker
placeholder="DD-MM-YYYY"
												variant="dialog"
												margin="dense"
												id="id_dtIssueDate"
												name="name_dtIssueDate"
                        autoOk
                        autoFocus
												label={<>Issued Date<span style={{ color: "red" }}> *</span></>}
												format={sDateFormatMUIDatepicker}
												returnMoment={true}
												onChange={(date) => {
													if (date) {
														setReceivedDate(date);
														setValue('name_dtIssueDate', date, { shouldValidate: true });
													}
												}}
												//defaultValue={receivedDate}
                        value={receivedDate}
												KeyboardButtonProps={{
													"aria-label": "change date",
												}}
												fullWidth
												className={props.classes.dateField}
												inputRef={register({
													required: true,
													pattern:
													{
														value: new RegExp(sDDMMYYYYRegex),
														message: "Invalid Date"
													}
												})}
											/>
										</MuiPickersUtilsProvider>
										{_.get("name_dtIssueDate.type", errors) === "required" && (
											<span style={{ color: "red" }}>
												This field is required
											</span>
										)}
									</FormControl>
								</Grid>

								{/*<Grid item xs={12} sm={6}>
                                            <FormControl className={props.classes.formControl}>
                                                <TextField
                                                    id="date"
                                                    label={<>Issued Date<span style={{ color: "red" }}> *</span></>}
                                                    type="date"
                                                    defaultValue={receivedDate}
                                                    className={props.classes.textField}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    onChange={(e) => { setReceivedDate(e.target.value) }}
                                                />
                                            </FormControl>
                                                </Grid>*/}
								<Grid item xs={12} sm={6}>
									<FormControl className={props.classes.formControl}>
										<Autocomplete
											disabled
											openOnFocus
											clearOnEscape
											onChange={
												(e, value) => {
													if (value !== null) {
														console.log(value.id);
														setMadebType(value.id);
													}
													else {
														setMadebType(0);
													}
												}
											}
											value={valueMadebType}

											id="id_madebType"
											options={madebData}

											autoHighlight
											getOptionLabel={(option) => option.sMadebDisplayName}
											renderOption={(option) => (
												<React.Fragment>
													<span>{option.sMadebDisplayName}</span>
												</React.Fragment>
											)}
											renderInput={(params) => (
												<TextField
													{...params}
													label="Why"
													variant="standard"
													inputProps={{
														...params.inputProps,
														autoComplete: 'off', // disable autocomplete and autofill
													}}
												/>
											)}
										/>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={6}>
									<FormControl className={props.classes.formControl}>
										<Autocomplete
											disabled
											openOnFocus
											clearOnEscape
											onChange={
												(e, value) => {
													if (value !== null) {
														console.log(value.id);
														setAuthorityId(value.id);
													}
													else {
														setAuthorityId(0);
													}
												}
											}
											value={valueAuthRegion}
											id="id_nAuthorityId"
											options={authorityData}
											autoHighlight
											getOptionLabel={(option) => option.sAuthRegion}
											renderOption={(option) => (
												<React.Fragment>
													<span>{option.sAuthRegion}</span>
												</React.Fragment>
											)}
											renderInput={(params) => (
												<TextField
													{...params}
													label="Where"
													variant="standard"
													inputProps={{
														...params.inputProps,
														autoComplete: 'off', // disable autocomplete and autofill
													}}
												/>
											)}
										/>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={6}>
									<FormControl className={props.classes.formControl}>
										<TextField
											id="number"
											label="Form Number"
											type="number"
											InputProps={{
												readOnly: true,
											}}
											value={formNumber}
											onChange={(e) => { setFormNumber(e.target.value) }}

										/>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={6}>
									<FormControl className={props.classes.formControl}>
										<Autocomplete
                      disabled
											openOnFocus
											clearOnEscape
											onChange={
												(e, value) => {
													if (value !== null) {
														console.log(value.id);
														setIssuedOrNotId(value.id);
													}
													else {
														setIssuedOrNotId(0);
													}
												}
											}
											value={valueTypeIssued}

											id="id_nIssuedOrNotId"
											options={typeIssuedData}
											/*  classes={{
														option: classes.option,
												}}
												className={classes.textField}*/
											autoHighlight
											getOptionLabel={(option) => option.sTypeIssued}
											renderOption={(option) => (
												<React.Fragment>
													<span>{option.sTypeIssued}</span>
												</React.Fragment>
											)}
											renderInput={(params) => (
												<TextField
													{...params}
													label="Issue Action"
													variant="standard"
													inputProps={{
														...params.inputProps,
														autoComplete: 'off', // disable autocomplete and autofill
													}}
												/>
											)}
										/>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={6}>
									<FormControl className={props.classes.formControl}>
										<TextField
											id="remarks"
											label="Remarks"
											multiline
											rows={4}
											InputProps={{
												readOnly: false,
											}}
											value={remarks}
											onChange={(e) => { setRemarks(e.target.value) }}
										/>
									</FormControl>
								</Grid>
							</Grid>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => props.saveModalClose()}
							color={sButtonColor}
							variant={sButtonVariant}
							size={sButtonSize}
						>Cancel</Button>
						<Button
							disabled={formState.isSubmitting && formState.isValid}
							type={"submit"}
							//onClick={() => props.saveAPICall(saveObj, changeObj)}
							color={sButtonColor}
							variant={sButtonVariant}
							size={sButtonSize}
						>Save</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
}
