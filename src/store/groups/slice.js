import {createSlice} from '@reduxjs/toolkit'
import defaultData from '../../userList.json'


const group1 = defaultData.find(item => item.id === 'group-1')
const group2 = defaultData.find(item => item.id === 'group-2')
const group3 = defaultData.find(item => item.id === 'group-3')


const groupsSlice = createSlice({
    name: 'groups',
    initialState: {
        list: [group1, group2, group3],
        days: {}
    },
    reducers: {
        addDefaultGroup(state, action) {
            const {day, id} = action.payload
            const group = defaultData.find(item => item.id === id)
            const stateDay = state?.days?.[day]
            state.days = {...state.days, [day]: stateDay ? [...stateDay, group] : [group]}
        },
        changeStudent(state, action) {
            const {day, groupId, name} = action.payload
            const stateDay = state.days[day]

            state.days = {
                ...state.days, [day]: stateDay.map(group => {
                    if (group.id === groupId) {
                        const changedGroup = {...group,
                            students: group.students.map(student => student.name === name ? {
                                ...student,
                                chacked: !student.chacked
                            } : student)
                        }
                        return changedGroup
                    }
                    return group
                })
            }
        }
    },
})


export const {addDefaultGroup, changeStudent} = groupsSlice.actions

export const groups = groupsSlice.reducer
