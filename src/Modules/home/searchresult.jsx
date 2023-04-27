import React from 'react'
import { useSelector } from 'react-redux'
import backwardarrow from '../../Assets/images/backwardarrow.svg'
import Post from '../home/post'
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from '../../Assets/css/home/searchresult.module.css'


const Searchresult = () => {
    const userSearchData = useSelector((state) => state.userReducer.userSearchData)
    return (
        <React.Fragment>
            {
                (userSearchData && Object.keys(userSearchData).length !== 0)
                    ?
                    (userSearchData.totalList > 0)
                        ?
                        <div className={styles.searchresult}>
                            <div>
                                <div className={styles.noofsearchresuts}>
                                    <a href="/home"><img src={backwardarrow} /></a>
                                    <p>{userSearchData.totalList} Results for <b>{userSearchData.searchText}</b></p>
                                </div>
                                <Post listdata={userSearchData.messageList} data={userSearchData} />
                            </div>
                        </div>
                        :
                        <div className={styles.searchresult}>
                            <div>
                                <div className={styles.noofsearchresuts}>
                                    <a href="/home"><img src={backwardarrow} /></a>
                                    <p>{userSearchData.totalList} Results for <b>{userSearchData.searchText}</b></p>
                                </div>
                                <p>No records found..</p>
                            </div>
                        </div>

                    :
                    <div className={styles.loadingspinner}>
                        <p>Loading</p>
                        <CircularProgress />
                    </div>

            }
        </React.Fragment>
    )

}
export default Searchresult