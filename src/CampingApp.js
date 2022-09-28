import React from 'react'
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { CampingRoute } from './routes/CampingRoute'
import { store } from './store/store'
import './index.css'


export const CampingApp = () => {
    return (
        <div>
            <Provider store={store}>
            <BrowserRouter>
            
                <CampingRoute />

            </BrowserRouter>
            

            </Provider>
        </div>
    )
}
