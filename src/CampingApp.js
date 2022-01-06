import React from 'react'
import {Provider} from 'react-redux'

import { CampingRoute } from './routes/CampingRoute'
import { store } from './store/store'



export const CampingApp = () => {
    return (
        <div>
            <Provider store={store}>
                <CampingRoute />
            </Provider>
        </div>
    )
}
