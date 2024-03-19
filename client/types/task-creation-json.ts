export const TaskCreationJson = {
  types: [
    {
      Header: 'Medication Management',
      Body: [
        { 'Drug Name': 'Line text input' },
        {
          'Drug Form': ['Pills', 'Liquid', 'Shot']
        },
        { Diagnosis: 'Line text input' },
        { 'Prescribing Physician': 'Line text input' },
        { 'Care Instructions': 'Paragraph text input' }
      ]
    },
    {
      Header: 'Physician Appointments',
      Body: [
        { 'Physician Name': 'Line text input' },
        { Address: '' },
        { 'Hospital Affiliation': 'Line text input' },
        { Speciality: 'Line text input' }
      ]
    },
    {
      Header: 'Grooming',
      Body: [
        { 'Grooming Type': ['Bathing', 'Toileting'] },
        { 'Care Instructions': 'Paragraph text input' }
      ]
    },
    {
      Header: 'Family Conversations',
      Body: [{ Topic: 'Line text input' }, { Notes: 'Paragraph text input' }]
    },
    {
      Header: 'Shopping & Errands',
      Body: [
        { Store: 'Line text input' },
        { Instructions: 'Paragraph text input' }
      ]
    },
    {
      Header: 'Pay Bills',
      Body: [
        { 'Bill Reveicer Name': 'Line text input' },
        { Address: '' },
        { 'Proxy Agent': 'Line text input' }
      ]
    },
    {
      Header: 'Diet',
      Body: {
        Instructions: 'Paragraph text input'
      }
    },
    {
      Header: 'Activities',
      Body: [{ Instructions: 'Paragraph text input' }]
    },
    {
      Header: 'Health Insurance',
      Body: [
        { 'ID Number': 'Line text input' },
        { Provider: 'Line text input' },
        { 'Proxy Agent': 'Line text input' }
      ]
    },
    {
      Header: 'Other',
      Body: [
        { Purpose: 'Line text input' },
        { Address: '' },
        { Website: 'Line text input' },
        { Notes: 'Paragraph text input' }
      ]
    }
  ]
};
