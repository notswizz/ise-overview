const ContactsSection = ({ property }) => {
  console.log("Property and Contacts", property, property.contacts);

  // Filter contacts by category
  const alumniContacts = property.contacts?.filter(contact => contact.category === 'alumni') || [];
  const campusContacts = property.contacts?.filter(contact => contact.category === 'campus') || [];
  const mmrContacts = property.contacts?.filter(contact => contact.category === 'mmr') || [];
  const athleticsContacts = property.contacts?.filter(contact => contact.category === 'athletics') || [];

  const ContactCard = ({ contact }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-5 flex flex-col h-full">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-gray-900 font-medium">{contact.name}</h3>
          <p className="text-sm text-gray-500">{contact.position}</p>
        </div>
        
        {contact.category && (
          <span className={`
            px-2.5 py-1 text-xs rounded-full font-medium 
            ${contact.category === 'alumni' ? 'bg-purple-100 text-purple-700' : ''}
            ${contact.category === 'campus' ? 'bg-blue-100 text-blue-700' : ''}
            ${contact.category === 'mmr' ? 'bg-green-100 text-green-700' : ''}
            ${contact.category === 'athletics' ? 'bg-orange-100 text-orange-700' : ''}
          `}>
            {contact.category === 'mmr' ? 'MMR' : 
              contact.category.charAt(0).toUpperCase() + contact.category.slice(1)}
          </span>
        )}
      </div>
      
      <div className="flex-1 space-y-4">
        {contact.email && (
          <div className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-3 text-sm">
              <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                {contact.email}
              </a>
            </div>
          </div>
        )}
        
        {contact.phone && (
          <div className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="ml-3 text-sm">
              <a href={`tel:${contact.phone}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                {contact.phone}
              </a>
            </div>
          </div>
        )}
        
        {contact.notes && (
          <div className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-3 text-sm text-gray-700">
              {contact.notes}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const ContactsGroup = ({ title, contacts, icon, color }) => (
    <div className="mb-10">
      <div className="flex items-center mb-5">
        <div className={`p-2 rounded-lg bg-${color}-50 mr-3`}>
          <svg className={`h-5 w-5 text-${color}-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icon}
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <div className="ml-3 bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {contacts.length}
        </div>
      </div>

      {contacts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {contacts.map((contact, index) => (
            <ContactCard key={index} contact={contact} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center">
          <p className="text-gray-500 text-sm">No {title.toLowerCase()} contacts available</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
        <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Key Contacts
      </h2>

      {(!property.contacts || property.contacts.length === 0) ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No Contacts Available</h3>
          <p className="text-gray-500 max-w-sm mx-auto">There are currently no contacts specified for this property.</p>
        </div>
      ) : (
        <>
          <ContactsGroup 
            title="Alumni Relations" 
            contacts={alumniContacts} 
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />}
            color="purple"
          />
          
          <ContactsGroup 
            title="Campus Representatives" 
            contacts={campusContacts}
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />}
            color="blue"
          />
          
          <ContactsGroup 
            title="MMR Representatives" 
            contacts={mmrContacts}
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
            color="green"
          />
          
          <ContactsGroup 
            title="Athletics Representatives" 
            contacts={athleticsContacts}
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
            color="orange"
          />
        </>
      )}
    </div>
  );
};

export default ContactsSection; 