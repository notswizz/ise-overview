const ContactsSection = ({ property }) => {
  console.log('ContactsSection rendering with property:', property);
  console.log('Contact fields:');
  console.log('- contacts:', property.contacts);
  
  // Initialize the new contacts array
  const contacts = property.contacts ?? [];
  
  // Group contacts by category - only use the unified contacts array
  const alumniContacts = contacts
    .filter(contact => contact.category === 'alumni')
    .map(contact => contact.name);
  
  const campusContacts = contacts
    .filter(contact => contact.category === 'campus')
    .map(contact => contact.name);
  
  const mmrContacts = contacts
    .filter(contact => contact.category === 'mmr')
    .map(contact => contact.name);
  
  const athleticsContacts = contacts
    .filter(contact => contact.category === 'athletics')
    .map(contact => contact.name);
  
  return (
    <>
      <div className="border-b-2 border-[#6ea8d8]">
        <div className="px-6 py-4 bg-gradient-to-r from-[#6ea8d8]/10 to-white">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <svg className="h-5 w-5 text-[#6ea8d8] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Contacts
          </h2>
        </div>
      </div>
      
      <div className="px-6 py-5 space-y-6">
        {/* Alumni Contacts */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="border-b border-[#6ea8d8]/50">
            <div className="px-4 py-3 bg-gradient-to-r from-[#6ea8d8]/5 to-white">
              <h3 className="text-md font-semibold text-gray-800 flex items-center">
                <svg className="h-4 w-4 text-[#6ea8d8] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Alumni Contacts
              </h3>
            </div>
          </div>
          <div className="px-4 py-3">
            {alumniContacts.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {alumniContacts.map((contact, index) => (
                  <li key={index} className="py-3 flex hover:bg-[#6ea8d8]/5 rounded-lg px-2 transition-colors">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#6ea8d8]/10 to-white border border-[#6ea8d8]/30 shadow-sm flex items-center justify-center">
                        <span className="text-[#6ea8d8] font-semibold">{contact.charAt(0)}</span>
                      </div>
                    </div>
                    <div className="flex-1 py-1 flex items-center">
                      <p className="text-sm font-medium text-gray-800">{contact}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="bg-[#6ea8d8]/5 p-4 rounded-lg border border-[#6ea8d8]/20 shadow-sm text-center">
                <p className="text-sm text-gray-500 italic">No alumni contacts specified</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Campus Contacts */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="border-b border-[#6ea8d8]/50">
            <div className="px-4 py-3 bg-gradient-to-r from-[#6ea8d8]/5 to-white">
              <h3 className="text-md font-semibold text-gray-800 flex items-center">
                <svg className="h-4 w-4 text-[#6ea8d8] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
                Campus Contacts
              </h3>
            </div>
          </div>
          <div className="px-4 py-3">
            {campusContacts.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {campusContacts.map((contact, index) => (
                  <li key={index} className="py-3 flex hover:bg-[#6ea8d8]/5 rounded-lg px-2 transition-colors">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#6ea8d8]/10 to-white border border-[#6ea8d8]/30 shadow-sm flex items-center justify-center">
                        <span className="text-[#6ea8d8] font-semibold">{contact.charAt(0)}</span>
                      </div>
                    </div>
                    <div className="flex-1 py-1 flex items-center">
                      <p className="text-sm font-medium text-gray-800">{contact}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="bg-[#6ea8d8]/5 p-4 rounded-lg border border-[#6ea8d8]/20 shadow-sm text-center">
                <p className="text-sm text-gray-500 italic">No campus contacts specified</p>
              </div>
            )}
          </div>
        </div>
        
        {/* MMR Contacts */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="border-b border-[#6ea8d8]/50">
            <div className="px-4 py-3 bg-gradient-to-r from-[#6ea8d8]/5 to-white">
              <h3 className="text-md font-semibold text-gray-800 flex items-center">
                <svg className="h-4 w-4 text-[#6ea8d8] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                MMR Contacts
              </h3>
            </div>
          </div>
          <div className="px-4 py-3">
            {mmrContacts.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {mmrContacts.map((contact, index) => (
                  <li key={index} className="py-3 flex hover:bg-[#6ea8d8]/5 rounded-lg px-2 transition-colors">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#6ea8d8]/10 to-white border border-[#6ea8d8]/30 shadow-sm flex items-center justify-center">
                        <span className="text-[#6ea8d8] font-semibold">{contact.charAt(0)}</span>
                      </div>
                    </div>
                    <div className="flex-1 py-1 flex items-center">
                      <p className="text-sm font-medium text-gray-800">{contact}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="bg-[#6ea8d8]/5 p-4 rounded-lg border border-[#6ea8d8]/20 shadow-sm text-center">
                <p className="text-sm text-gray-500 italic">No MMR contacts specified</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Athletics Contacts */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="border-b border-[#6ea8d8]/50">
            <div className="px-4 py-3 bg-gradient-to-r from-[#6ea8d8]/5 to-white">
              <h3 className="text-md font-semibold text-gray-800 flex items-center">
                <svg className="h-4 w-4 text-[#6ea8d8] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Athletics Contacts
              </h3>
            </div>
          </div>
          <div className="px-4 py-3">
            {athleticsContacts.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {athleticsContacts.map((contact, index) => (
                  <li key={index} className="py-3 flex hover:bg-[#6ea8d8]/5 rounded-lg px-2 transition-colors">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#6ea8d8]/10 to-white border border-[#6ea8d8]/30 shadow-sm flex items-center justify-center">
                        <span className="text-[#6ea8d8] font-semibold">{contact.charAt(0)}</span>
                      </div>
                    </div>
                    <div className="flex-1 py-1 flex items-center">
                      <p className="text-sm font-medium text-gray-800">{contact}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="bg-[#6ea8d8]/5 p-4 rounded-lg border border-[#6ea8d8]/20 shadow-sm text-center">
                <p className="text-sm text-gray-500 italic">No athletics contacts specified</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactsSection; 