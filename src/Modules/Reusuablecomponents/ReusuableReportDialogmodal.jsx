import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import * as feedactions from '../../store/actions/feedactions/feedActionCreator'
import { useSelector, useDispatch } from 'react-redux'
import Checkbox from '@material-ui/core/Checkbox';
import { blue } from '@material-ui/core/colors';
import { Divider } from '@material-ui/core';
import sampledialogcancel from '../../Assets/images/Add.png'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import feedstyles from '../../Assets/css/home/feedpost.module.css'
import report from '../../Assets/images/report.svg'



const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});


function ReportDialog(props) {
    const [state, setState] = useState({
        OffensiveorInappropriate: false,
        Unrelated: false,
        duplicate: false,
        other: false,
    });
    const dispatch = useDispatch()

    const [isReason, setReason] = useState('')
    const [isReportParams, setReportParams] = useState('')

    const { onClose, open } = props;

    const handleClose = () => {
        onClose(false);
    };


    const onTextContent = (id) => {
        let reportpostid = `report${id}`
        let buttonid = `button${id}`

        setReason(document.getElementById(reportpostid).value)
        if (document.getElementById(reportpostid).value !== '') {

            document.getElementById(buttonid).disabled = false
            document.getElementById(buttonid).style.backgroundColor = "#127ADD"
        }
        else {
            document.getElementById(buttonid).disabled = true
            document.getElementById(buttonid).style.backgroundColor = "#60A2E0"
        }
    }

    const handleChange = (event, id) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        let reportother = `report${id}`
        var reportdata = document.getElementById(reportother).value;
        let buttonid = `button${id}`
        if (event.target.name === "other") {
            if (event.target.checked === true) {
                document.getElementById(reportother).style.display = "block"
            }
            else {
                document.getElementById(reportother).style.display = "none"

            }
        }



        if (event.target.name === "OffensiveorInappropriate" || event.target.name === "Unrelated" || event.target.name === "duplicate") {
            if (event.target.checked === true) {
                document.getElementById(buttonid).disabled = false
                document.getElementById(buttonid).style.backgroundColor = "#127ADD"
                setReason(event.target.name)

            }
            else {
                document.getElementById(buttonid).disabled = true
                document.getElementById(buttonid).style.backgroundColor = "#60A2E0"
            }
        }
    }

    const onReportSubmit = (id) => {
        setReportParams(`?messageid=${id}&reason=${isReason}&param=AskorSay`)
        console.log(isReportParams)
        dispatch(feedactions.fetchReportData(isReportParams))

    }


    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} >
            <div className={feedstyles.reportdialog}>
                {
                    (props.statusdata === "notAbused")
                        ?
                        <>
                            <div className={feedstyles.sampledialogcountandcancel}>
                                <p className={feedstyles.reportheading}><b>Report this post</b></p>
                                <a onClick={handleClose}><img src={sampledialogcancel} /></a>
                            </div>

                            <div>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.OffensiveorInappropriate}
                                            onChange={(e) => handleChange(e, props.id)}
                                            name="OffensiveorInappropriate"
                                            color="primary"
                                        />
                                    }
                                    label={<p className={feedstyles.reportoption}>Offensive or Inappropriate</p>}
                                    className={feedstyles.offensiveorinappropriate}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.Unrelated}
                                            onChange={(e) => handleChange(e, props.id)}
                                            name="Unrelated"
                                            color="primary"
                                        />
                                    }
                                    label={<p className={feedstyles.reportoption}>Unrelated</p>}
                                    className={feedstyles.unrelated}

                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.duplicate}
                                            onChange={(e) => handleChange(e, props.id)}
                                            name="duplicate"
                                            color="primary"
                                        />
                                    }
                                    label={<p className={feedstyles.reportoption}>Duplicate</p>}
                                    className={feedstyles.duplicate}

                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.other}
                                            onChange={(e) => handleChange(e, props.id)}
                                            name="other"
                                            color="primary"
                                        />
                                    }
                                    label={<p className={feedstyles.reportoption}>Other</p>}
                                    className={feedstyles.other}

                                />
                                <textarea className={feedstyles.reporttextarea} id={`report${props.id}`} onChange={(e) => onTextContent(props.id)} />
                                <div> <button className={feedstyles.reportsubmit} id={`button${props.id}`} onClick={() => onReportSubmit(props.id)}>Submit</button></div>

                            </div>
                        </>
                        :
                        <div className={feedstyles.sampledialogcountandcancel}>
                            <p> This post has already been flagged abusive</p>
                            <a onClick={handleClose}><img src={sampledialogcancel} /></a>
                        </div>


                }
            </div>

        </Dialog>
    );
}

ReportDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default function ReusuableReportDialogmodal(props) {
    const reportStatusData = useSelector((state) => state.followReducer.ReportStatus)

    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);



    const handleClickOpen = (id, param) => {
        let fetchreportparams = `?messageid=${id}&param=${param}`
        dispatch(feedactions.fetchReportStatus(fetchreportparams))
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);

    };

    return (
        <div>

            <a onClick={() => handleClickOpen(props.id, props.param)} key={props.id}>
                <img src={report} />
            Report
                        </a>
            {
                (reportStatusData)
                    ?
                    <ReportDialog open={open} onClose={handleClose} statusdata={reportStatusData} id={props.id} />
                    :
                    ''
            }
        </div>
    );
}
