export const TaskCreationJson = {
  types: [
    {
      Header: 'Medication Management',
      Background: 'client/assets/task-creation/big-bg-med.svg',
      Body: [
        { 'Drug Name': 'TextInputLine' },
        {
          'Drug Form': 'RadioGroup: Pills Liquid Shot'
        },
        { Diagnosis: 'TextInputLine' },
        { 'Prescribing Physician': 'TextInputLine' },
        { 'Care Instructions': 'TextInputParagraph' }
      ]
    },
    {
      Header: 'Physician Appointments',
      Body: [
        { 'Physician Name': 'TextInputLine' },
        { Address: '' },
        { 'Hospital Affiliation': 'TextInputLine' },
        { Speciality: 'TextInputLine' }
      ]
    },
    {
      Header: 'Grooming',
      Body: [
        { 'Grooming Type': 'RadioGroup: Bathing Toileting' },
        { 'Care Instructions': 'TextInputParagraph' }
      ]
    },
    {
      Header: 'Family Conversations',
      Body: [{ Topic: 'TextInputLine' }, { Notes: 'TextInputParagraph' }]
    },
    {
      Header: 'Shopping & Errands',
      Body: [{ Store: 'TextInputLine' }, { Instructions: 'TextInputParagraph' }]
    },
    {
      Header: 'Pay Bills',
      Body: [
        { 'Bill Receiver Name': 'TextInputLine' },
        { Address: '' },
        { 'Proxy Agent': 'TextInputLine' }
      ]
    },
    {
      Header: 'Diet',
      Body: [{ Instructions: 'TextInputParagraph' }]
    },
    {
      Header: 'Activities',
      Body: [{ Instructions: 'TextInputParagraph' }]
    },
    {
      Header: 'Health Insurance',
      Body: [
        { 'ID Number': 'TextInputLine' },
        { Provider: 'TextInputLine' },
        { 'Proxy Agent': 'TextInputLine' }
      ]
    },
    {
      Header: 'Other',
      Body: [
        { Purpose: 'TextInputLine' },
        { Address: '' },
        { Website: 'TextInputLine' },
        { Notes: 'TextInputParagraph' }
      ]
    }
  ]
};
