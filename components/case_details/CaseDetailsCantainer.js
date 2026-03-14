'use client'
import React, { useState } from 'react'
import { useCaseDetailsMenu } from '../../store'
import { motion } from "framer-motion";
import CaseHearings from './CaseHearings';
import CaseTimeline from './CaseTimeline';
import CaseSummery from './CaseSummery';
import CaseDocuments from './CaseDocuments';
import CaseTasks from './CaseTasks';
import CaseFinance from './CaseFinance';
export default function CaseDetailsCantainer() {
    const {caseDetailsMenu, setCaseDetailsMenu} = useCaseDetailsMenu()

    return (
      <div className='sm:flex justify-between gap-5'>
        <div className='sm:w-2/3 w-full'>
          <div className={`${caseDetailsMenu === 1?'block':'hidden'}`}>
                
            <div className='flex flex-col lg:flex-row justify-between gap-8'>
            <CaseTimeline />
            <CaseSummery/>
            </div>
            
          </div>
          <div className={`${caseDetailsMenu === 2?'block':'hidden'}`}>
            <CaseDocuments/>
          </div>
          <div className={`${caseDetailsMenu === 3?'block':'hidden'}`}>
            <CaseTasks/>
          </div>
          <div className={`${caseDetailsMenu === 4?'block':'hidden'}`}>
            <CaseFinance/>
          </div>
        </div>
        <div className='sm:w-1/3 w-full'>
          <CaseHearings />
        </div>
      </div>
    )
}
