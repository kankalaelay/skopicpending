import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
// import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux'

import React, { useState, useEffect } from 'react';
import { Mention } from 'primereact/mention';
import * as feedactions from '../../store/actions/feedactions/feedActionCreator'

// import { CustomerService } from '../service/CustomerService';

const AutoCompleteTextField = () => {
    const usernameData = useSelector((state) => state.voteupReducer.usernameData)
    const dispatch = useDispatch();

    const [customers, setCustomers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    // const tagSuggestions = ['primereact', 'primefaces', 'primeng', 'primevue'];
    // const customerservice = new CustomerService();
   
    useEffect(() => {
        if (usernameData) {
            setCustomers(usernameData.userlist)

        }
        
        console.log(customers)
            
        
        // customerservice.getCustomersSmall().then(data => {
        //     data.forEach(d => d['nickname'] = `${d.name.replace(/\s+/g, '').toLowerCase()}_${d.id}`);
        //     setCustomers(data);
        // });
    }, [usernameData])

    const onSearch = (event) => {
        //in a real application, make a request to a remote url with the query and return suggestions, for demo we filter at client side
        setTimeout(() => {
            const query = event.query;
        dispatch(feedactions.fetchUserNames(`@${query}`));

            let suggestions;

            if (!query.trim().length) {
                suggestions = [...customers];
            }
            else {
                // console.log(customers)
                    suggestions = customers.filter((customer) => {
                    return customer.Username.toLowerCase().startsWith(query.toLowerCase());
                });            }
            setSuggestions(suggestions);
        }, 250);
    }


    const itemTemplate = (suggestion) => {
        const src = 'http://dev.skopic.com:9090/skopicimage/';

        return (      
            <div className="p-d-flex p-ai-center">
                <img alt={suggestion.Username} src={`${src}${suggestion.uimage}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width="32" style={{ verticalAlign: 'middle' }} />
                <span className="p-d-flex p-dir-col p-ml-2">
                {suggestion.Username}
                    {/* <small style={{ fontSize: '1rem', color: 'var(--text-secondary-color)' }}>@{suggestion.Username}</small> */}
                </span>
            </div>
        );
    }



    return (
        <div className="card">
            <Mention suggestions={suggestions} onSearch={onSearch} field="Username" placeholder="What important UPDATE do you want to share?" rows={5} cols={40}
                itemTemplate={itemTemplate} />
        </div>
    )
}

export default AutoCompleteTextField
// const rootElement = document.getElementById("root");
// ReactDOM.render(<MentionDemo />, rootElement);