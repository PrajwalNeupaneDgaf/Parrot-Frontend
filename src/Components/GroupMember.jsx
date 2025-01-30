import React, { useState } from 'react'
import GroupRequests from './GroupRequests'
import GroupMembers from './GroupMembers'

const GroupMember = ({data,trigger}) => {
  return (
    <div className='md:px-4 px-2'>
        <GroupRequests trigger={trigger} data={data?.Requests}/>
        <GroupMembers trigger={trigger} data={data?.Members}/>
    </div>
  )
}

export default GroupMember